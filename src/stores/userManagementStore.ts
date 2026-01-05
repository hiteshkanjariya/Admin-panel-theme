import { create } from 'zustand';
import { User, UserRole } from './authStore';

export interface ManagedUser extends User {
  status: 'active' | 'inactive' | 'pending';
  lastLogin?: string;
}

interface UserManagementState {
  users: ManagedUser[];
  isLoading: boolean;
  fetchUsers: () => Promise<void>;
  addUser: (user: Omit<ManagedUser, 'id' | 'createdAt'>) => Promise<{ success: boolean; error?: string }>;
  updateUser: (id: string, updates: Partial<ManagedUser>) => Promise<{ success: boolean; error?: string }>;
  deleteUser: (id: string) => Promise<{ success: boolean; error?: string }>;
}

const initialUsers: ManagedUser[] = [
  {
    id: '1',
    email: 'admin@demo.com',
    name: 'Admin User',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01',
    lastLogin: '2024-12-25',
  },
  {
    id: '2',
    email: 'manager@demo.com',
    name: 'Sarah Johnson',
    role: 'manager',
    status: 'active',
    createdAt: '2024-01-15',
    lastLogin: '2024-12-24',
  },
  {
    id: '3',
    email: 'user@demo.com',
    name: 'Michael Chen',
    role: 'user',
    status: 'active',
    createdAt: '2024-02-01',
    lastLogin: '2024-12-23',
  },
  {
    id: '4',
    email: 'emily.davis@demo.com',
    name: 'Emily Davis',
    role: 'user',
    status: 'pending',
    createdAt: '2024-11-20',
  },
  {
    id: '5',
    email: 'james.wilson@demo.com',
    name: 'James Wilson',
    role: 'manager',
    status: 'inactive',
    createdAt: '2024-03-10',
    lastLogin: '2024-10-15',
  },
  {
    id: '6',
    email: 'olivia.brown@demo.com',
    name: 'Olivia Brown',
    role: 'user',
    status: 'active',
    createdAt: '2024-05-22',
    lastLogin: '2024-12-20',
  },
  {
    id: '7',
    email: 'daniel.garcia@demo.com',
    name: 'Daniel Garcia',
    role: 'user',
    status: 'active',
    createdAt: '2024-06-15',
    lastLogin: '2024-12-22',
  },
  {
    id: '8',
    email: 'sophia.martinez@demo.com',
    name: 'Sophia Martinez',
    role: 'manager',
    status: 'active',
    createdAt: '2024-04-08',
    lastLogin: '2024-12-24',
  },
];

export const useUserManagementStore = create<UserManagementState>((set, get) => ({
  users: [],
  isLoading: false,
  fetchUsers: async () => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 500));
    set({ users: initialUsers, isLoading: false });
  },
  addUser: async (userData) => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 500));

    const existingUser = get().users.find(
      (u) => u.email.toLowerCase() === userData.email.toLowerCase()
    );
    if (existingUser) {
      set({ isLoading: false });
      return { success: false, error: 'Email already exists' };
    }

    const newUser: ManagedUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };

    set((state) => ({
      users: [...state.users, newUser],
      isLoading: false,
    }));
    return { success: true };
  },
  updateUser: async (id, updates) => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 500));

    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updates } : user
      ),
      isLoading: false,
    }));
    return { success: true };
  },
  deleteUser: async (id) => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 500));

    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
      isLoading: false,
    }));
    return { success: true };
  },
}));
