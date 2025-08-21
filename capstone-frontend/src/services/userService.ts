import { api } from './api.js';

export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  avatar?: string;
  createdAt: string;
}

export interface UpdateUserData {
  name?: string;
  avatar?: string;
}

export const userService = {
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await api.get('/users');
      return response.data.users || [];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  },

  async getUserById(id: string): Promise<User | null> {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data.user || null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  },

  async updateUser(id: string, userData: UpdateUserData): Promise<User | null> {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data.user || null;
    } catch (error) {
      console.error('Error updating user:', error);
      return null;
    }
  },

  async deleteUser(id: string): Promise<boolean> {
    try {
      await api.delete(`/users/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  },
};
