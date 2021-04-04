const operation = require('../models/modelFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createUser = catchAsync(async (req, res, next) => {
  // Get input data
  const { name, phone, address, userType } = req.body;

  // Check user is already exists
  let query = `SELECT userId FROM user WHERE phone=${phone}`;
  const existsUser = await operation.getSingleData(req.db, query);

  if (existsUser) {
    return next(new AppError('Phone number already exists!', 400));
  }

  // insert data in the user[base] table
  const userId = await operation.insertData('user', req.db, {
    name,
    phone,
    address,
    userType
  });

  // Get user info from user[base] table based on userId
  query = `SELECT name,phone,address FROM user WHERE userId = ${userId}`;
  const newUser = await operation.getSingleData(req.db, query);

  res.status(201).json({
    status: 'success',
    result: newUser
  });
});

exports.getAllUser = catchAsync(async (req, res, next) => {
  const users = await operation.getAllData('user', req.db);

  res
    .status(200)
    .render('userList', { title: 'User list | Mobile Shop', users });
});

exports.getSingleUser = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const query = `SELECT * FROM user WHERE userId = ${userId}`;
  const user = await operation.getSingleData(req.db, query);

  res.status(200).json({
    status: 'success',
    result: user
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const query = `UPDATE user SET ? WHERE userId = ${userId}`;
  await operation.updateSingleData(req.db, query, req.body);

  res.status(200).json({ status: 'success', message: 'Update success' });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const query = `DELETE FROM user WHERE userId = ${userId}`;
  await operation.deleteSingleData(req.db, query);

  res.status(200).json({ status: 'success', message: 'Delete success' });
});

exports.createUserPage = (req, res) => {
  res.status(200).render('createUser', { title: 'Create user | Mobile Shop' });
};

exports.editUserPage = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const query = `SELECT * FROM user WHERE userId = ${userId}`;
  const user = await operation.getSingleData(req.db, query);

  res
    .status(200)
    .render('editUser', { title: 'Edit user | Mobile Shop', user });
});
