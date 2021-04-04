const operation = require('../models/modelFactory');
const catchAsync = require('../utils/catchAsync');

exports.createProduct = catchAsync(async (req, res, next) => {
  // Get input data
  const { productCode, productName, retailerPrice, sellingPrice } = req.body;

  // insert data in the customer table
  const productId = await operation.insertData('product', req.db, {
    productCode,
    productName,
    retailerPrice,
    sellingPrice,
    countInStock: 0
  });

  const query = `SELECT * FROM product WHERE productId = ${productId}`;
  const newProduct = await operation.getSingleData(req.db, query);

  res.status(201).json({
    status: 'success',
    result: newProduct
  });
});

exports.getAllProduct = catchAsync(async (req, res, next) => {
  const products = await operation.getAllData('product', req.db);

  res
    .status(200)
    .render('productList', { title: 'Product list | Mobile Shop', products });
});

exports.getSingleProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.productId;
  const query = `SELECT * FROM product WHERE productId = ${productId}`;
  const product = await operation.getSingleData(req.db, query);

  res.status(200).json({
    status: 'success',
    result: product
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.productId;
  const query = `UPDATE product SET ? WHERE productId = ${productId}`;
  await operation.updateSingleData(req.db, query, req.body);

  res.status(200).json({ status: 'success', message: 'Update success' });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.productId;
  const query = `DELETE FROM product WHERE productId = ${productId}`;
  await operation.deleteSingleData(req.db, query);

  res.status(200).json({ status: 'success', message: 'Delete success' });
});

exports.createProductPage = (req, res, next) => {
  res
    .status(200)
    .render('createProduct', { title: 'Create product | Mobile Shop' });
};

exports.editProductPage = catchAsync(async (req, res, next) => {
  const productId = req.params.productId;
  const query = `SELECT * FROM product WHERE productId = ${productId}`;
  const product = await operation.getSingleData(req.db, query);

  res
    .status(200)
    .render('editProduct', { title: 'Edit product | Mobile Shop', product });
});
