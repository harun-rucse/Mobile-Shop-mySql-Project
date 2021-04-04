const operation = require('../models/modelFactory');
const catchAsync = require('../utils/catchAsync');

exports.createSupplier = catchAsync(async (req, res, next) => {
  // Get input data
  const { userId, productId, quantity, paid } = req.body;

  // insert data in the supplier table
  let query = `SELECT retailerPrice,countInStock FROM product WHERE productId = ${productId}`;
  let product = await operation.getSingleData(req.db, query);
  const totalPayable = Number(product.retailerPrice) * Number(quantity);
  const due = Number(totalPayable) - Number(paid);

  const supplierId = await operation.insertData('supplier', req.db, {
    userId,
    productId,
    quantity,
    totalPayable,
    paid,
    due
  });

  // Increase product countInStock
  query = `UPDATE product SET ? WHERE productId = ${productId}`;
  const stock = (product.countInStock += Number(quantity));
  await operation.updateSingleData(req.db, query, {
    countInStock: stock
  });

  // Get created supplier data from supplier table
  query = `SELECT * FROM supplier WHERE supplierId = ${supplierId}`;
  const newSupplier = await operation.getSingleData(req.db, query);

  // Get user info from user[base] table based on userId
  query = `SELECT name,phone,address FROM user WHERE userId = ${userId}`;
  const user = await operation.getSingleData(req.db, query);

  // Get product info from product table based on productId
  query = `SELECT productCode,productName,retailerPrice,sellingPrice,countInStock FROM product WHERE productId = ${productId}`;
  product = await operation.getSingleData(req.db, query);

  res.status(201).json({
    status: 'success',
    result: {
      ...newSupplier,
      user: user,
      product: product
    }
  });
});

exports.getAllSupplier = catchAsync(async (req, res, next) => {
  const suppliers = await operation.getAllData('supplier', req.db);

  const dataPromise = suppliers.map(async (supplier) => {
    // Get user info from user[base] table based on userId
    let query = `SELECT name,phone,address FROM user WHERE userId = ${supplier.userId}`;
    const user = await operation.getSingleData(req.db, query);

    // Get product info from product table based on productId
    query = `SELECT productCode,productName,retailerPrice,sellingPrice,countInStock FROM product WHERE productId = ${supplier.productId}`;
    const product = await operation.getSingleData(req.db, query);

    return {
      ...supplier,
      user: user,
      product: product
    };
  });
  const data = await Promise.all(dataPromise);

  res.status(200).render('supplierList', {
    title: 'Supplier List | Mobile Shop',
    suppliers: data
  });
});

exports.updateSupplier = catchAsync(async (req, res, next) => {
  const supplierId = req.params.supplierId;
  const query = `UPDATE supplier SET ? WHERE supplierId = ${supplierId}`;
  await operation.updateSingleData(req.db, query, req.body);

  res.status(200).json({ status: 'success', message: 'Update success' });
});

exports.deleteSupplier = catchAsync(async (req, res, next) => {
  const supplierId = req.params.supplierId;
  const query = `DELETE FROM supplier WHERE supplierId = ${supplierId}`;
  await operation.deleteSingleData(req.db, query);

  res.status(200).json({ status: 'success', message: 'Delete success' });
});

exports.createSupplierPage = catchAsync(async (req, res, next) => {
  const query = `SELECT * FROM user WHERE userType='supplier'`;
  const suppliers = await operation.getData(req.db, query);
  const products = await operation.getAllData('product', req.db);

  res.status(200).render('createSupplier', {
    title: 'Create supplier | Mobile Shop',
    suppliers,
    products
  });
});

exports.editSupplierPage = catchAsync(async (req, res) => {
  const supplierId = req.params.supplierId;
  let query = `SELECT * FROM supplier WHERE supplierId = ${supplierId}`;
  const supplier = await operation.getSingleData(req.db, query);

  query = `SELECT name, phone, address FROM user WHERE userId = ${supplier.userId}`;
  const user = await operation.getSingleData(req.db, query);

  query = `SELECT * FROM product WHERE productId = ${supplier.productId}`;
  const product = await operation.getSingleData(req.db, query);

  res.status(200).render('editSupplier', {
    title: 'Edit supplier | Mobile Shop',
    supplier,
    user,
    product
  });
});
