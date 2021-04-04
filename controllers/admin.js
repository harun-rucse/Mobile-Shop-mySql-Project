const operation = require('../models/modelFactory');
const catchAsync = require('../utils/catchAsync');

exports.dashboardPage = catchAsync(async (req, res, next) => {
  let query = `SELECT COUNT(*) AS nProduct FROM product`;
  const { nProduct } = await operation.getSingleData(req.db, query);

  query = `SELECT COUNT(*) AS nSupplier FROM user WHERE userType='supplier'`;
  const { nSupplier } = await operation.getSingleData(req.db, query);

  query = `SELECT COUNT(*) AS nCustomer FROM user WHERE userType='customer'`;
  const { nCustomer } = await operation.getSingleData(req.db, query);

  query = `SELECT COUNT(*) AS nOutStockProduct FROM product WHERE countInStock = 0`;
  const { nOutStockProduct } = await operation.getSingleData(req.db, query);

  query = `SELECT SUM(totalPayable) AS nTodaysSell FROM customer WHERE DATE(createdAt)=CURDATE()`;
  const { nTodaysSell } = await operation.getSingleData(req.db, query);

  query = `SELECT SUM(profit) AS nTodaysProfit FROM customer WHERE DATE(createdAt)=CURDATE()`;
  const { nTodaysProfit } = await operation.getSingleData(req.db, query);

  query = `SELECT SUM(due) AS nSupplierDue FROM supplier`;
  const { nSupplierDue } = await operation.getSingleData(req.db, query);

  query = `SELECT SUM(due) AS nCustomerDue FROM customer`;
  const { nCustomerDue } = await operation.getSingleData(req.db, query);

  query = `SELECT SUM(totalPayable) AS nSell FROM customer`;
  const { nSell } = await operation.getSingleData(req.db, query);

  query = `SELECT SUM(profit) AS nRevenue FROM customer`;
  const { nRevenue } = await operation.getSingleData(req.db, query);

  res.status(200).render('dashboard', {
    title: 'Dashboard | Mobile Shop',
    nProduct,
    nSupplier,
    nCustomer,
    nOutStockProduct,
    nTodaysSell: nTodaysSell | 0,
    nTodaysProfit: nTodaysProfit | 0,
    nSupplierDue,
    nCustomerDue,
    nSell,
    nRevenue
  });
});
