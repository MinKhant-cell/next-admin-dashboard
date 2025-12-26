
'use client';

import { apiClient } from '@/lib/api/client';
import { mutate } from 'swr';
import { toast } from 'sonner';
import { setCookie } from '@/utils/cookies';

export const AuthAPI = {
  login: (data: { email: string; password: string }) =>
    apiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

export const login = async (email: string, password: string) => {
  const loginData = { email: email.trim(), password: password.trim() };

  try {
    const response = await AuthAPI.login(loginData);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Login failed');
    }

    const result = await response.json();

    const token = result?.access_token || result?.accessToken || result?.token;

    if (!token) {
      throw new Error('Login failed - no token received');
    }

   
    setCookie('token', token, 7);

    
    toast.success('Welcome back!');

  
    mutate('/dashboard/main');

   
    if (typeof window !== 'undefined') {
      window.location.href = '/dashboard/main';
    }

    return result;
  } catch (error: any) {
    toast.error(error.message || 'Invalid credentials');
    throw error; 
  }
};