
'use client';

import useSWR from 'swr';
import { mutate } from 'swr';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api/client';
import { getCookie, setCookie, deleteCookie } from '@/utils/cookies';

// Types
interface AuthProfile {
  sub: number;
  username: string;
  iat: number;
  exp: number;
}

// Auth API Endpoints
export const AuthAPI = {
  login: (data: { email: string; password: string }) =>
    apiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),


  profile: () => apiClient('/dashboard/main'),
};

// Login Function
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

  
    mutate('/auth/profile');

    
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const returnUrl = params.get('returnUrl') || '/dashboard/main';
      window.location.href = returnUrl;
    }

    return result;
  } catch (error: any) {
    toast.error(error.message || 'Invalid credentials');
    throw error;
  }
};

// Logout 
export const logout = async () => {
  deleteCookie('token');
  toast.success('Logged out successfully');
  mutate('/auth/profile', null, { revalidate: false }); // Clear cache
  if (typeof window !== 'undefined') {
    window.location.href = '/signin';
  }
};

// Auth Hook for ProtectedRoutesss
export const useAuthProfile = () => {
  const token = typeof window !== 'undefined' ? getCookie('token') : null;

  const { data, error, isLoading, mutate } = useSWR<AuthProfile>(
    token ? '/auth/profile' : null,
    async (url: string) => {
      const res = await apiClient(url);
      return res.json();
    },
    {
      revalidateOnMount: true,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60_000,
      shouldRetryOnError: (err) => err?.message !== 'Unauthorized',
    }
  );

  return {
    user: data ?? null,
    isLoading,
    isError: !!error,
    mutate, 
  };
};