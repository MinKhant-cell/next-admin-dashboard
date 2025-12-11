import { apiClient } from "./client";

export const SubjectAPI = {
  getAll: (page = 1, limit = 10) =>
    apiClient(`/subjects?page=${page}&limit=${limit}`),

  getById: (id: number) => apiClient(`/subjects/${id}`),

  create: (data: any) =>
    apiClient("/subjects", {
      method: "POST",
      body: data,
    }),

  update: (id: number, data: any) =>
    apiClient(`/subjects/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    }),

  remove: (id: number) =>
    apiClient(`/subjects/${id}`, {
      method: "DELETE",
    }),
};
