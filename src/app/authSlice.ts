import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

interface TestData {
  message: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  error: string | null;
  loading: boolean;
  testData: TestData | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// Define an async thunk to handle user login
export const loginUser = createAsyncThunk<
  { status: number; message: string; body: { token: string } },
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.post<{
      status: number;
      message: string;
      body: { token: string };
    }>("http://localhost:3001/api/v1/user/login", payload);
    // Store the token in localStorage
    localStorage.setItem("token", response.data.body.token);

    dispatch(setTestData({ message: "Login successful" }));
    return response.data;
  } catch (error) {
    dispatch(setError("An unexpected error occurred"));
    return rejectWithValue("An unexpected error occurred");
  }
});

// Create a slice to manage authentication state
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null as User | null,
    token: null as string | null,
    error: null as string | null,
    loading: false,
    testData: null as TestData | null,
  } as AuthState,
  reducers: {
    setTestData: (state, action: PayloadAction<TestData>) => {
      state.testData = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state: AuthState) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      loginUser.fulfilled,
      (
        state: AuthState,
        action: PayloadAction<{
          status: number;
          message: string;
          body: { token: string };
        }>,
      ) => {
        state.loading = false;
        state.token = action.payload.body.token;
      },
    );   
  },
});

// Export the slice and actions
export const { reducer: authReducer, actions: authActions } = authSlice;
export const { setTestData, setUser, setError } = authActions;
