import { apiClient } from "./client";

export const TeacherAPI = {
  getAll: (page = 1, limit = 10) =>
    apiClient(`/employees?page=${page}&limit=${limit}`),

  getById: (id: string | number) => apiClient(`/employees/${id}`),

  create: (data: any) =>
    apiClient("/teachers", {
      method: "POST",
      body: data,
    }),

  update: (id: string | number, data: any) =>
    apiClient(`/teachers/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),  
    }),

  remove: (id: string | number) =>
    apiClient(`/teachers/${id}`, {
      method: "DELETE",
    }),
};
