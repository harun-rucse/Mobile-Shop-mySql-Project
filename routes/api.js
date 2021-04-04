const express = require('express');
const customerController = require('../controllers/customer');
const productController = require('../controllers/product');
const supplierController = require('../controllers/supplier');
const userController = require('../controllers/user');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/login', authController.postLogin);

router.use(authController.protect);

router.post('/users', userController.createUser);
router
  .route('/users/:userId')
  .get(userController.getSingleUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.post('/products', productController.createProduct);
router
  .route('/products/:productId')
  .get(productController.getSingleProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

router.post('/suppliers', supplierController.createSupplier);
router
  .route('/suppliers/:supplierId')
  .patch(supplierController.updateSupplier)
  .delete(supplierController.deleteSupplier);

router.post('/customers', customerController.createCustomer);
router
  .route('/customers/:customerId')
  .patch(customerController.updateCustomer)
  .delete(customerController.deleteCustomer);

router.get('/logout', authController.logout);

module.exports = router;
