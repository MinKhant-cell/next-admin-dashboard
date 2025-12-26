import { apiClient } from "./client";

export const CourseAPI = {
  getAll: (page = 1, limit = 10) =>
    apiClient(`/courses?page=${page}&limit=${limit}`),

  getById: (id: number) => apiClient(`/courses/${id}`),

  create: (data: any) =>
    apiClient("/courses", {
      method: "POST",
      body: data,
    }),

  update: (id: string | number, data: any) =>
    apiClient(`/courses/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
    }),

  remove: (id: number) =>
    apiClient(`/courses/${id}`, {
      method: "DELETE",
    }),
};
