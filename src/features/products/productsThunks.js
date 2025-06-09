import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../../api/products';

export const fetchProductsList = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const products = await fetchProducts();
      return products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/addProduct',
  async (product, { rejectWithValue }) => {
    try {
      const newProduct = await addProduct(product);
      return newProduct;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editProduct = createAsyncThunk(
  'products/updateProduct',
  async (product, { rejectWithValue }) => {
    try {
      const updatedProduct = await updateProduct(product);
      return updatedProduct;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await deleteProduct(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);