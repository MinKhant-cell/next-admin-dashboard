import { apiClient } from "./client";

export const StudentAPI = {
  getAll: (page = 1, limit = 10) =>
    apiClient(`/students?page=${page}&limit=${limit}`),
  
  getById: (id: number) => apiClient(`/students/${id}`),
  
  
  create: async (data: any) =>
    apiClient("/students", {
      method: "POST",
      body: data,
    }), 
  
  update: async (id: number, data: any) =>
    apiClient(`/students/${id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),  
  }),
  
  remove: (id: number) =>
    apiClient(`/students/${id}`, {
    method: "DELETE",
  }),
};
