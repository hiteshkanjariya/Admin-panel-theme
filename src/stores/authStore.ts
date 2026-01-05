import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
}

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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email, password) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const mockUser = mockUsers[email.toLowerCase()];
        if (mockUser && mockUser.password === password) {
          const token = `jwt_${Date.now()}_${Math.random().toString(36)}`;
          set({
            user: mockUser.user,
            token,
            isAuthenticated: true,
          });
          return { success: true };
        }
        return { success: false, error: 'Invalid email or password' };
      },
      signUp: async (email, password, name) => {
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (mockUsers[email.toLowerCase()]) {
          return { success: false, error: 'Email already registered' };
        }

        if (password.length < 6) {
          return { success: false, error: 'Password must be at least 6 characters' };
        }

        const newUser: User = {
          id: Date.now().toString(),
          email,
          name,
          role: 'user',
          createdAt: new Date().toISOString().split('T')[0],
        };

        const token = `jwt_${Date.now()}_${Math.random().toString(36)}`;
        set({
          user: newUser,
          token,
          isAuthenticated: true,
        });
        return { success: true };
      },
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
      forgotPassword: async (email) => {
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (mockUsers[email.toLowerCase()]) {
          return { success: true };
        }
        return { success: false, error: 'No account found with this email' };
      },
    }),
    {
      name: 'admin-auth',
    }
  )
);
