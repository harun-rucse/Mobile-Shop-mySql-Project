const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const operation = require('../models/modelFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.login = (req, res) => {
  res.status(200).render('login');
};

exports.postLogin = catchAsync(async (req, res, next) => {
  // Get phone and password
  const { phone, password } = req.body;

  if (!phone || !password) {
    return next(new AppError('Phone and password is required', 400));
  }

  // Get data form admin database based on phone
  const query = `SELECT phone, password FROM admin WHERE phone = ${phone}`;
  const admin = await operation.getSingleData(req.db, query);

  if (!admin || !admin.password === password) {
    return next(new AppError('Incorrect phone or password', 401));
  }

  // Send token to the client
  const token = jwt.sign({ id: admin.phone }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  // set token as a cookie
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
  });

  res.status(200).json({ status: 'success', token });
});

exports.logout = (req, res, next) => {
  res.cookie('jwt', 'loggoutcookie', {
    expires: new Date(Date.now() + 10),
    httpOnly: true
  });

  res.status(200).json({ status: 'success' });
};

// Check if admin is authenticated or not
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(new AppError('You are not logged in. Please login!', 401));
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const query = `SELECT * FROM admin WHERE phone = ${decoded.id}`;
  const currentUser = await operation.getSingleData(req.db, query);
  if (!currentUser) {
    return next(new AppError('The admin is no longer exists!', 401));
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.authUser = currentUser;

  next();
});

//Only for renderd webpage
exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const query = `SELECT * FROM admin WHERE phone = ${decoded.id}`;
      const currentUser = await operation.getSingleData(req.db, query);
      if (!currentUser) {
        return res.render('login');
      }

      // THERE IS A LOGGED IN ADMIN
      req.user = currentUser;
      res.locals.authUser = currentUser;
      return next();
    } catch (err) {
      return res.render('login');
    }
  } else {
    res.render('login');
  }
};
