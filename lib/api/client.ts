// lib/api/client.ts
import { getCookie } from "@/utils/cookies";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface ApiError extends Error {
  info?: any;
  status?: number;
}

let isRedirecting = false; 

export async function apiClient(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getCookie('token');
  const headers = new Headers();

  const isFormData = options.body instanceof FormData;
  
  if (!isFormData) {
    headers.set('Content-Type', 'application/json');
  }



  if (options.headers) {
    if (options.headers instanceof Headers) {
      options.headers.forEach((value, key) => headers.set(key, value));
    } else if (Array.isArray(options.headers)) {
      options.headers.forEach(([key, value]) => headers.set(key, String(value)));
    } else {
      Object.entries(options.headers).forEach(([key, value]) => {
        headers.set(key, String(value));
      });
    }
  }


  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  // Handle Unauthorized
  if (res.status === 401) {
    // Clear token only once
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Prevent multiple redirects
    if (!isRedirecting && typeof window !== 'undefined') {
      isRedirecting = true;
      console.warn('🔒 Session expired, redirecting to login');
      window.location.href = '/signin';
    }

    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    let errorInfo: any = { message: 'Unknown error' };
    try {
      errorInfo = await res.json();
    } catch {
    
    }

    const error: ApiError = new Error('API request failed') as ApiError;
    error.info = errorInfo;
    error.status = res.status;
    throw error;
  }

  return res; 
}

export const fetcher = async (url: string): Promise<any> => {
  try {
    const res = await apiClient(url);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    return await res.json();
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return null;
    }
    throw error; 
  }
};
