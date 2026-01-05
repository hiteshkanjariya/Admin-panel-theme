import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'admin' | 'manager' | 'user';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Mock users for demo
const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@demo.com': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@demo.com',
      name: 'Admin User',
      role: 'admin',
      createdAt: '2024-01-01',
    },
  },
  'manager@demo.com': {
    password: 'manager123',
    user: {
      id: '2',
      email: 'manager@demo.com',
      name: 'Manager User',
      role: 'manager',
      createdAt: '2024-01-15',
    },
  },
  'user@demo.com': {
    password: 'user123',
    user: {
      id: '3',
      email: 'user@demo.com',
      name: 'Regular User',
      role: 'user',
      createdAt: '2024-02-01',
    },
  },
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockUser = mockUsers[email.toLowerCase()];
      if (mockUser && mockUser.password === password) {
        const token = `jwt_${Date.now()}_${Math.random().toString(36)}`;
        return { user: mockUser.user, token };
      }
      return rejectWithValue('Invalid email or password');
    } catch (error) {
      return rejectWithValue('An error occurred during login');
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password, name }: { email: string; password: string; name: string }, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (mockUsers[email.toLowerCase()]) {
        return rejectWithValue('Email already registered');
      }

      if (password.length < 6) {
        return rejectWithValue('Password must be at least 6 characters');
      }

      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role: 'user',
        createdAt: new Date().toISOString().split('T')[0],
      };

      const token = `jwt_${Date.now()}_${Math.random().toString(36)}`;
      return { user: newUser, token };
    } catch (error) {
      return rejectWithValue('An error occurred during sign up');
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (mockUsers[email.toLowerCase()]) {
        return true;
      }
      return rejectWithValue('No account found with this email');
    } catch (error) {
      return rejectWithValue('An error occurred');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
