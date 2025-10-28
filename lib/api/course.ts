import { apiClient } from "./client";

export const StudentAPI = {
  getAll: (page = 1, limit = 10) =>
    apiClient(`/courses?page=${page}&limit=${limit}`),

  getById: (id: number) => apiClient(`/courses/${id}`),

  create: (data: any) =>
    apiClient("/courses", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: number, data: any) =>
    apiClient(`/courses/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  remove: (id: number) =>
    apiClient(`/courses/${id}`, {
      method: "DELETE",
    }),
};
