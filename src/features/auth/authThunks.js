import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from '../../api/auth';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUser(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);