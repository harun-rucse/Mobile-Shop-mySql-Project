const express = require('express');
const customerController = require('../controllers/customer');
const productController = require('../controllers/product');
const supplierController = require('../controllers/supplier');
const userController = require('../controllers/user');
const authController = require('../controllers/auth');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/login', authController.login);

router.use(authController.isLoggedIn);

router.get('/users', userController.getAllUser);
router.get('/users/create', userController.createUserPage);
router.get('/users/edit/:userId', userController.editUserPage);

router.get('/products', productController.getAllProduct);
router.get('/products/create', productController.createProductPage);
router.get('/products/edit/:productId', productController.editProductPage);

router.get('/suppliers', supplierController.getAllSupplier);
router.get('/suppliers/create', supplierController.createSupplierPage);
router.get('/suppliers/edit/:supplierId', supplierController.editSupplierPage);

router.get('/customers', customerController.getAllCustomer);
router.get('/customers/create', customerController.createCustomerPage);
router.get('/customers/edit/:customerId', customerController.editCustomerPage);

router.get('/', adminController.dashboardPage);

module.exports = router;
