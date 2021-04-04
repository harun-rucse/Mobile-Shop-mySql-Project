import axios from 'axios';
import toastr from 'toastr';

export const login = async (phone, password) => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: '/api/login',
      data: { phone, password }
    });

    if (data.status === 'success') {
      // Show success alert
      toastr.success('Login successful');

      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }
  } catch (err) {
    toastr.error(err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: '/api/logout'
    });

    if (data.status === 'success') {
      // Show success alert
      toastr.success('Logout successful');

      window.setTimeout(() => {
        location.assign('/login');
      }, 100);
    }
  } catch (err) {
    toastr.error(err.response.data.message);
  }
};

export const getUserInfo = async (userId) => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `/api/users/${userId}`
    });

    if (data.status === 'success') {
      return data.result;
    }
  } catch (err) {
    toastr.error(err.response.data.message);
  }
};

export const getProductInfo = async (productId) => {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `/api/products/${productId}`
    });

    if (data.status === 'success') {
      return data.result;
    }
  } catch (err) {
    toastr.error(err.response.data.message);
  }
};

export const createUser = async (userData) => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: '/api/users',
      data: userData
    });

    if (data.status === 'success') {
      // Show success alert
      toastr.success('User create successful');

      window.setTimeout(() => {
        location.assign('/users');
      }, 500);
    }
  } catch (err) {
    toastr.error(err.response.data.message);
  }
};

export const createProduct = async (productData) => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: '/api/products',
      data: productData
    });

    if (data.status === 'success') {
      // Show success alert
      toastr.success('Product create successful');

      window.setTimeout(() => {
        location.assign('/products');
      }, 500);
    }
  } catch (err) {
    toastr.error(err.response.data.message);
  }
};

export const createSupplier = async (supplierData) => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: '/api/suppliers',
      data: supplierData
    });

    if (data.status === 'success') {
      // Show success alert
      toastr.success('Supplier create successful');

      window.setTimeout(() => {
        location.assign('/suppliers');
      }, 500);
    }
  } catch (err) {
    toastr.error(err.response.data.message);
  }
};

export const createCustomer = async (customerData) => {
  try {
    const { data } = await axios({
      method: 'POST',
      url: '/api/customers',
      data: customerData
    });

    if (data.status === 'success') {
      // Show success alert
      toastr.success('Customer create successful');

      window.setTimeout(() => {
        location.assign('/customers');
      }, 500);
    }
  } catch (err) {
    toastr.error(err.response.data.message);
  }
};

export const deleteUser = async (userId) => {
  try {
    const { data } = await axios({
      method: 'DELETE',
      url: `/api/users/${userId}`
    });

    if (data.status === 'success') {
      // Show success alert
      toastr.success('User delete successful');

      window.setTimeout(() => {
        location.assign('/users');
      }, 100);
    }
  } catch (err) {
    toastr.error(err.response.data.message);
  }
};

export const deleteProduct = async (productId) => {
  try {
    const { data } = await axios({
      method: 'DELETE',
      url: `/api/products/${productId}`
    });

    if (data.status === 'success') {
      // Show success alert
      toastr.success('Product delete successful');

      window.setTimeout(() => {
        location.assign('/products');
      }, 100);
    }
  } catch (err) {
    toastr.error(err.response.data.message);
  }
};

export const deleteCustomer = async (customerId) => {
  try {
    const { data } = await axios({
      method: 'DELETE',
      url: `/api/customers/${customerId}`
    });

    if (data.status === 'success') {
      // Show success alert
      toastr.success('Customer delete successful');

      window.setTimeout(() => {
        location.assign('/customers');
      }, 100);
    }
  } catch (err) {
    toastr.error(err.response.data.message);
  }
};

export const deleteSupplier = async (supplierId) => {
  try {
    const { data } = await axios({
      method: 'DELETE',
      url: `/api/suppliers/${supplierId}`
    });

    if (data.status === 'success') {
      // Show success alert
      toastr.success('Supplier delete successful');

      window.setTimeout(() => {
        location.assign('/suppliers');
      }, 100);
    }
  } catch (err) {
    toastr.error(err.response.data.message);
  }
};

export const editUser = async (userData, userId) => {
  try {
    const { data } = await axios({
      method: 'PATCH',
      url: `/api/users/${userId}`,
      data: userData
    });

    if (data.status === 'success') {
      // Show success alert
      toastr.success('User update successful');

      window.setTimeout(() => {
        location.assign('/users');
      }, 500);
    }
  } catch (err) {
    toastr.error(err.response.data.message);
  }
};

export const editProduct = async (productData, productId) => {
  try {
    const { data } = await axios({
      method: 'PATCH',
      url: `/api/products/${productId}`,
      data: productData
    });

    if (data.status === 'success') {
      // Show success alert
      toastr.success('Product update successful');

      window.setTimeout(() => {
        location.assign('/products');
      }, 500);
    }
  } catch (err) {
    toastr.error(err.response.data.message);
  }
};

export const editSupplier = async (supplierData, supplierId) => {
  try {
    const { data } = await axios({
      method: 'PATCH',
      url: `/api/suppliers/${supplierId}`,
      data: supplierData
    });

    if (data.status === 'success') {
      // Show success alert
      toastr.success('Supplier update successful');

      window.setTimeout(() => {
        location.assign('/suppliers');
      }, 500);
    }
  } catch (err) {
    toastr.error(err.response.data.message);
  }
};

export const editCustomer = async (customerData, customerId) => {
  try {
    const { data } = await axios({
      method: 'PATCH',
      url: `/api/customers/${customerId}`,
      data: customerData
    });

    if (data.status === 'success') {
      // Show success alert
      toastr.success('Customer update successful');

      window.setTimeout(() => {
        location.assign('/customers');
      }, 500);
    }
  } catch (err) {
    toastr.error(err.response.data.message);
  }
};
