import { apiClient } from "./client";

export const StudentAPI = {
  getAll: (page = 1, limit = 10) =>
    apiClient(`/students?page=${page}&limit=${limit}`),

  getById: (id: number) => apiClient(`/students/${id}`),

  create: (data: any) =>
    apiClient("/students", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: number, data: any) =>
    apiClient(`/students/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  remove: (id: number) =>
    apiClient(`/students/${id}`, {
      method: "DELETE",
    }),
};
