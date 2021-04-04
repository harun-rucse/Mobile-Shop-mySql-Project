import {
  login,
  logout,
  getUserInfo,
  getProductInfo,
  createUser,
  createProduct,
  createSupplier,
  createCustomer,
  deleteUser,
  deleteProduct,
  deleteCustomer,
  deleteSupplier,
  editUser,
  editProduct,
  editSupplier,
  editCustomer
} from './api';
import deletePopup from './deletePopup';

const loginForm = document.getElementById('login_form');
const logoutBtn = document.getElementById('logout_btn');

const supplierCreateForm = document.getElementById('supplier_create_form');
const customerCreateForm = document.getElementById('customer_create_form');
const supplierEditForm = document.getElementById('supplier_edit_form');
const customerEditForm = document.getElementById('customer_edit_form');

const userForm = document.getElementById('user_create_form');
const productForm = document.getElementById('product_create_form');
const supplierForm = document.getElementById('supplier_create_form');
const customerForm = document.getElementById('customer_create_form');

const userEdit = document.getElementById('user_edit_form');
const productEdit = document.getElementById('product_edit_form');
const supplierEdit = document.getElementById('supplier_edit_form');
const customerEdit = document.getElementById('customer_edit_form');

const userDeleteBtns = document.querySelectorAll('#user_delete_btn');
const productDeleteBtns = document.querySelectorAll('#product_delete_btn');
const customerDeleteBtns = document.querySelectorAll('#customer_delete_btn');
const supplierDeleteBtns = document.querySelectorAll('#supplier_delete_btn');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    login(phone, password);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    logout();
  });
}

if (supplierCreateForm) {
  const userSelector = document.getElementById('userId');
  const productSelector = document.getElementById('productId');
  const name = document.getElementById('name');
  const phone = document.getElementById('phone');
  const address = document.getElementById('address');
  const productCode = document.getElementById('productCode');
  const productName = document.getElementById('productName');
  const countInStock = document.getElementById('countInStock');
  const quantity = document.getElementById('quantity');
  const retailerPrice = document.getElementById('retailerPrice');
  const sellingPrice = document.getElementById('sellingPrice');
  const totalPayable = document.getElementById('totalPayable');

  userSelector.addEventListener('click', async () => {
    const userId = userSelector.options[userSelector.selectedIndex].value;

    const user = await getUserInfo(userId);
    name.value = user.name;
    phone.value = user.phone;
    address.value = user.address;
  });

  productSelector.addEventListener('click', async () => {
    const productId =
      productSelector.options[productSelector.selectedIndex].value;

    const product = await getProductInfo(productId);
    productCode.value = product.productCode;
    productName.value = product.productName;
    countInStock.value = product.countInStock;
    retailerPrice.value = product.retailerPrice;
    sellingPrice.value = product.sellingPrice;
  });

  quantity.addEventListener('change', async (e) => {
    const productId =
      productSelector.options[productSelector.selectedIndex].value;
    const product = await getProductInfo(productId);
    totalPayable.value = product.retailerPrice * Number(e.target.value);
  });
}

if (customerCreateForm) {
  const userSelector = document.getElementById('userId');
  const productSelector = document.getElementById('productId');
  const name = document.getElementById('name');
  const phone = document.getElementById('phone');
  const address = document.getElementById('address');
  const productCode = document.getElementById('productCode');
  const productName = document.getElementById('productName');
  const countInStock = document.getElementById('countInStock');
  const retailerPrice = document.getElementById('retailerPrice');
  const sellingPrice = document.getElementById('sellingPrice');
  const totalPayable = document.getElementById('totalPayable');
  const quantity = document.getElementById('quantity');
  const discount = document.getElementById('discount');

  userSelector.addEventListener('click', async () => {
    const userId = userSelector.options[userSelector.selectedIndex].value;

    const user = await getUserInfo(userId);
    name.value = user.name;
    phone.value = user.phone;
    address.value = user.address;
  });

  productSelector.addEventListener('click', async () => {
    const productId =
      productSelector.options[productSelector.selectedIndex].value;

    const product = await getProductInfo(productId);
    productCode.value = product.productCode;
    productName.value = product.productName;
    countInStock.value = product.countInStock;
    retailerPrice.value = product.retailerPrice;
    sellingPrice.value = product.sellingPrice;
  });

  quantity.addEventListener('change', async (e) => {
    const productId =
      productSelector.options[productSelector.selectedIndex].value;

    const product = await getProductInfo(productId);

    totalPayable.value = product.sellingPrice * e.target.value;
  });

  discount.addEventListener('change', async (e) => {
    const productId =
      productSelector.options[productSelector.selectedIndex].value;

    const product = await getProductInfo(productId);

    totalPayable.value =
      product.sellingPrice * quantity.value - Number(e.target.value);
  });
}

// User create handler
if (userForm) {
  userForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const userType = document.getElementById('userType').value;

    createUser({ name, phone, address, userType });
  });
}

// Product create handler
if (productForm) {
  productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const productCode = document.getElementById('productCode').value;
    const productName = document.getElementById('productName').value;
    const retailerPrice = document.getElementById('retailerPrice').value;
    const sellingPrice = document.getElementById('sellingPrice').value;

    createProduct({
      productCode,
      productName,
      retailerPrice,
      sellingPrice
    });
  });
}

// Supplier create handler
if (supplierForm) {
  supplierForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userSelector = document.getElementById('userId');
    const productSelector = document.getElementById('productId');

    const userId = userSelector.options[userSelector.selectedIndex].value;
    const productId =
      productSelector.options[productSelector.selectedIndex].value;
    const paid = document.getElementById('paid').value;
    const quantity = document.getElementById('quantity').value;

    createSupplier({
      userId,
      productId,
      quantity,
      paid
    });
  });
}

// Customer create handler
if (customerForm) {
  customerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userSelector = document.getElementById('userId');
    const productSelector = document.getElementById('productId');

    const userId = userSelector.options[userSelector.selectedIndex].value;
    const productId =
      productSelector.options[productSelector.selectedIndex].value;
    const quantity = document.getElementById('quantity').value;
    const discount = document.getElementById('discount').value;
    const paid = document.getElementById('paid').value;

    createCustomer({
      userId,
      productId,
      quantity,
      discount,
      paid
    });
  });
}

if (supplierEditForm) {
  const paid = document.getElementById('paid');
  const totalPayable = document.getElementById('totalPayable');
  const due = document.getElementById('due');
  const quantity = document.getElementById('quantity');
  const retailerPrice = document.getElementById('retailerPrice');

  paid.addEventListener('change', (e) => {
    due.value = Number(totalPayable.value) - Number(e.target.value);
  });

  quantity.addEventListener('change', (e) => {
    totalPayable.value = Number(retailerPrice.value) * Number(e.target.value);
    due.value = Number(totalPayable.value) - Number(paid.value);
  });
}

if (customerEditForm) {
  const sellingPrice = document.getElementById('sellingPrice').value;
  const quantity = document.getElementById('quantity');
  const discount = document.getElementById('discount');
  const totalPayable = document.getElementById('totalPayable');
  const paid = document.getElementById('paid');
  const due = document.getElementById('due');

  quantity.addEventListener('change', (e) => {
    totalPayable.value =
      Number(sellingPrice) * Number(e.target.value) - Number(discount.value);
    due.value = Number(totalPayable.value) - Number(paid.value);
  });

  discount.addEventListener('change', (e) => {
    totalPayable.value =
      Number(sellingPrice) * Number(quantity.value) - Number(e.target.value);
    due.value = Number(totalPayable.value) - Number(paid.value);
  });
}

// User edit handler
if (userEdit) {
  userEdit.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const userId = document.getElementById('user_id').dataset.id;
    document.getElementById('user_id').textContent = 'Updating...';

    editUser({ name, phone, address }, userId);
  });
}

// Product edit handler
if (productEdit) {
  productEdit.addEventListener('submit', (e) => {
    e.preventDefault();

    const productCode = document.getElementById('productCode').value;
    const productName = document.getElementById('productName').value;
    const retailerPrice = document.getElementById('retailerPrice').value;
    const sellingPrice = document.getElementById('sellingPrice').value;
    const userId = document.getElementById('product_id').dataset.id;
    document.getElementById('product_id').textContent = 'Updating...';

    editProduct(
      { productCode, productName, retailerPrice, sellingPrice },
      userId
    );
  });
}

// Supplier edit handler
if (supplierEdit) {
  supplierEdit.addEventListener('submit', (e) => {
    e.preventDefault();

    const quantity = document.getElementById('quantity').value;
    const totalPayable = document.getElementById('totalPayable').value;
    const paid = document.getElementById('paid').value;
    const due = document.getElementById('due').value;
    const supplierId = document.getElementById('supplier_id').dataset.id;
    document.getElementById('supplier_id').textContent = 'Updating...';

    editSupplier({ quantity, totalPayable, paid, due }, supplierId);
  });
}

// Customer edit handler
if (customerEdit) {
  customerEdit.addEventListener('submit', (e) => {
    e.preventDefault();

    const quantity = document.getElementById('quantity').value;
    const discount = document.getElementById('discount').value;
    const totalPayable = document.getElementById('totalPayable').value;
    const paid = document.getElementById('paid').value;
    const retailerPrice = document.getElementById('retailerPrice').value;
    const due = Number(totalPayable) - Number(paid);
    const profit =
      Number(totalPayable) - Number(retailerPrice) * Number(quantity);

    const customerId = document.getElementById('customer_id').dataset.id;
    document.getElementById('customer_id').textContent = 'Updating...';

    editCustomer(
      { quantity, discount, totalPayable, paid, due, profit },
      customerId
    );
  });
}

// User Delete Handler
deletePopup(userDeleteBtns, deleteUser);

// Product Delete Handler
deletePopup(productDeleteBtns, deleteProduct);

// Customer Delete Handler
deletePopup(customerDeleteBtns, deleteCustomer);

// Supplier Delete Handler
deletePopup(supplierDeleteBtns, deleteSupplier);
