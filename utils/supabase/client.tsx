import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Create a single supabase client for the frontend
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// API base URL for our server functions
export const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-011f0f30`;

// Helper function to make authenticated API calls
export async function apiCall(endpoint: string, options: RequestInit = {}) {
  try {
    // Get current session token
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token || publicAnonKey;
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API call to ${endpoint} failed:`, error);
    throw error;
  }
}

// Authentication helper functions
export const auth = {
  async signUp(email: string, password: string, userData: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          email,
          password,
          ...userData
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      return data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  },

  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  async getProfile() {
    try {
      return await apiCall('/auth/profile');
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  async updateProfile(updates: any) {
    try {
      return await apiCall('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }
};

// Journal helper functions
export const journal = {
  async getPosts(filters: any = {}) {
    try {
      const params = new URLSearchParams(filters).toString();
      return await apiCall(`/journal/posts${params ? `?${params}` : ''}`);
    } catch (error) {
      console.error('Get journal posts error:', error);
      throw error;
    }
  },

  async createPost(postData: any) {
    try {
      return await apiCall('/journal/posts', {
        method: 'POST',
        body: JSON.stringify(postData),
      });
    } catch (error) {
      console.error('Create journal post error:', error);
      throw error;
    }
  },

  async likePost(postId: string) {
    try {
      return await apiCall(`/journal/posts/${postId}/like`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Like post error:', error);
      throw error;
    }
  }
};

// Marketplace helper functions
export const marketplace = {
  async getServices(filters: any = {}) {
    try {
      const params = new URLSearchParams(filters).toString();
      return await apiCall(`/marketplace/services${params ? `?${params}` : ''}`);
    } catch (error) {
      console.error('Get marketplace services error:', error);
      throw error;
    }
  },

  async createService(serviceData: any) {
    try {
      return await apiCall('/marketplace/services', {
        method: 'POST',
        body: JSON.stringify(serviceData),
      });
    } catch (error) {
      console.error('Create service error:', error);
      throw error;
    }
  }
};

// Help system helper functions
export const help = {
  async getQuestions(filters: any = {}) {
    try {
      const params = new URLSearchParams(filters).toString();
      return await apiCall(`/help/questions${params ? `?${params}` : ''}`);
    } catch (error) {
      console.error('Get help questions error:', error);
      throw error;
    }
  },

  async createQuestion(questionData: any) {
    try {
      return await apiCall('/help/questions', {
        method: 'POST',
        body: JSON.stringify(questionData),
      });
    } catch (error) {
      console.error('Create question error:', error);
      throw error;
    }
  },

  async addResponse(questionId: string, response: string) {
    try {
      return await apiCall(`/help/questions/${questionId}/responses`, {
        method: 'POST',
        body: JSON.stringify({ response }),
      });
    } catch (error) {
      console.error('Add response error:', error);
      throw error;
    }
  }
};

// Alerts helper functions
export const alerts = {
  async getAlerts(filters: any = {}) {
    try {
      const params = new URLSearchParams(filters).toString();
      return await apiCall(`/alerts${params ? `?${params}` : ''}`);
    } catch (error) {
      console.error('Get alerts error:', error);
      throw error;
    }
  },

  async createAlert(alertData: any) {
    try {
      return await apiCall('/alerts', {
        method: 'POST',
        body: JSON.stringify(alertData),
      });
    } catch (error) {
      console.error('Create alert error:', error);
      throw error;
    }
  }
};