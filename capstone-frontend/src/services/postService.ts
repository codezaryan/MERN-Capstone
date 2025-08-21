import { api } from './api.js';

export interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  image?: string;
}

export interface CreatePostData {
  title: string;
  content: string;
  tags?: string[];
  image?: string;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
  tags?: string[];
  image?: string;
}

export const postService = {
  async getAllPosts(): Promise<Post[]> {
    try {
      const response = await api.get('/posts');
      return response.data.posts || [];
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  },

  async getPostById(id: string): Promise<Post | null> {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data.post || null;
    } catch (error) {
      console.error('Error fetching post:', error);
      return null;
    }
  },

  async createPost(postData: CreatePostData): Promise<Post | null> {
    try {
      const response = await api.post('/posts', postData);
      return response.data.post || null;
    } catch (error) {
      console.error('Error creating post:', error);
      return null;
    }
  },

  async updatePost(id: string, postData: UpdatePostData): Promise<Post | null> {
    try {
      const response = await api.put(`/posts/${id}`, postData);
      return response.data.post || null;
    } catch (error) {
      console.error('Error updating post:', error);
      return null;
    }
  },

  async deletePost(id: string): Promise<boolean> {
    try {
      await api.delete(`/posts/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting post:', error);
      return false;
    }
  },
};
