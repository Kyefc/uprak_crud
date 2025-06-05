import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Login User dan langsung fetch user info
export const LoginUser = createAsyncThunk("user/LoginUser", async (user, thunkAPI) => {
  try {
    await axios.post(
      "http://localhost:5000/login",
      {
        email: user.email,
        password: user.password,
      },
      { withCredentials: true }
    );

    // Setelah login, ambil data user
    const response = await axios.get("http://localhost:5000/me", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
});

// Ambil user yang sedang login (untuk refresh session)
export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:5000/me", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
});

// Logout user
export const LogOut = createAsyncThunk("user/LogOut", async () => {
  await axios.delete("http://localhost:5000/logout", {
    withCredentials: true,
  });
});

// Slice Redux
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // GetMe
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Logout
    builder.addCase(LogOut.fulfilled, (state) => {
      state.user = null;
      state.isSuccess = false;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
