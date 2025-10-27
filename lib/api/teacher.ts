import { apiClient } from "./client";

export const TeacherAPI = {
  getAll: (page = 1, limit = 10) =>
    apiClient(`/employees?page=${page}&limit=${limit}`),

  getById: (id: number) => apiClient(`/employees/${id}`),

  create: (data: any) =>
    apiClient("/employees", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: number, data: any) =>
    apiClient(`/employees/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  remove: (id: number) =>
    apiClient(`/employees/${id}`, {
      method: "DELETE",
    }),
};
