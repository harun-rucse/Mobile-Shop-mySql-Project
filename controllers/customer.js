const operation = require('../models/modelFactory');
const catchAsync = require('../utils/catchAsync');

exports.createCustomer = catchAsync(async (req, res, next) => {
  // Get input data
  const { userId, productId, quantity, discount, paid } = req.body;

  // insert data in the customer table
  let query = `SELECT retailerPrice, sellingPrice, countInStock FROM product WHERE productId = ${productId}`;
  let product = await operation.getSingleData(req.db, query);
  let totalPayable = Number(product.sellingPrice) * Number(quantity);

  // discount calculate
  if (discount) totalPayable = totalPayable - Number(discount);
  const due = Number(totalPayable) - Number(paid);
  const profit =
    Number(totalPayable) - Number(product.retailerPrice) * Number(quantity);

  const customerId = await operation.insertData('customer', req.db, {
    userId,
    productId,
    quantity,
    discount,
    totalPayable,
    paid,
    due,
    profit
  });

  // Reduce product countInStock when product is selling
  query = `UPDATE product SET ? WHERE productId = ${productId}`;
  const stock = (product.countInStock -= quantity);
  await operation.updateSingleData(req.db, query, {
    countInStock: stock
  });

  // Get created customer data from customer table
  query = `SELECT * FROM customer WHERE customerId = ${customerId}`;
  const newCustomer = await operation.getSingleData(req.db, query);

  // Get user info from user[base] table based on userId
  query = `SELECT name,phone,address FROM user WHERE userId = ${userId}`;
  const user = await operation.getSingleData(req.db, query);

  // Get product info from product table based on productId
  query = `SELECT productCode,productName,retailerPrice,sellingPrice,countInStock FROM product WHERE productId = ${newCustomer.productId}`;
  product = await operation.getSingleData(req.db, query);

  res.status(201).json({
    status: 'success',
    result: { ...newCustomer, user: user, product: product }
  });
});

exports.getAllCustomer = catchAsync(async (req, res, next) => {
  const customers = await operation.getAllData('customer', req.db);

  const dataPromise = customers.map(async (customer) => {
    // Get user info from user table based on userId
    let query = `SELECT name,phone,address FROM user WHERE userId = ${customer.userId}`;
    let user = await operation.getSingleData(req.db, query);

    // Get product info from product table based on productId
    query = `SELECT productCode,productName,retailerPrice,sellingPrice, countInStock FROM product WHERE productId = ${customer.productId}`;
    const product = await operation.getSingleData(req.db, query);

    return {
      ...customer,
      user: user,
      product: product
    };
  });
  const data = await Promise.all(dataPromise);

  res.status(200).render('customerList', {
    title: 'Customer List | Mobile Shop',
    customers: data
  });
});

exports.updateCustomer = catchAsync(async (req, res, next) => {
  const customerId = req.params.customerId;

  // Get customer data
  let query = `SELECT productId, quantity FROM customer WHERE customerId = ${customerId}`;
  const customer = await operation.getSingleData(req.db, query);

  // Get previous countInStock of product table
  const quantityDiff = Number(req.body.quantity) - Number(customer.quantity);

  // Update countInStock this product product tabel
  query = `SELECT productId, countInStock FROM product WHERE productId = ${customer.productId}`;
  const product = await operation.getSingleData(req.db, query);

  const stock = (product.countInStock -= quantityDiff);

  query = `UPDATE product SET ? WHERE productId = ${product.productId}`;
  await operation.updateSingleData(req.db, query, {
    countInStock: stock
  });

  query = `UPDATE customer SET ? WHERE customerId = ${customerId}`;
  await operation.updateSingleData(req.db, query, req.body);

  res.status(200).json({ status: 'success', message: 'Update success' });
});

exports.deleteCustomer = catchAsync(async (req, res, next) => {
  const customerId = req.params.customerId;
  const query = `DELETE FROM customer WHERE customerId = ${customerId}`;
  await operation.deleteSingleData(req.db, query);

  res.status(200).json({ status: 'success', message: 'Delete success' });
});

exports.createCustomerPage = catchAsync(async (req, res, next) => {
  let query = `SELECT * FROM user WHERE userType='customer'`;
  const customers = await operation.getData(req.db, query);

  query = `SELECT * FROM product WHERE countInStock != 0`;
  const products = await operation.getData(req.db, query);

  res.status(200).render('createCustomer', {
    title: 'Create customer | Mobile Shop',
    customers,
    products
  });
});

exports.editCustomerPage = catchAsync(async (req, res, next) => {
  const customerId = req.params.customerId;
  let query = `SELECT * FROM customer WHERE customerId = ${customerId}`;
  const customer = await operation.getSingleData(req.db, query);

  query = `SELECT name, phone, address FROM user WHERE userId = ${customer.userId}`;
  const user = await operation.getSingleData(req.db, query);

  query = `SELECT * FROM product WHERE productId = ${customer.productId}`;
  const product = await operation.getSingleData(req.db, query);

  res.status(200).render('editCustomer', {
    title: 'Edit customer | Mobile Shop',
    customer,
    user,
    product
  });
});
