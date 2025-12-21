import { apiClient } from "./client";

export const ClassroomAPI = {
  getAll: (page = 1, limit = 10) =>
    apiClient(`/classrooms?page=${page}&limit=${limit}`),

  getById: (id: number) => apiClient(`/classrooms/${id}`),

  // create: (data: any) =>
  //   apiClient("/classrooms", {
  //     method: "POST",
  //     body: data,
  //   }),

    create: async (data: any) => {
      // PROOF LOG - BE MUST SEE THIS
      console.log(' FE sending FormData:');
      for (let [key, value] of data.entries()) {
        console.log(`${key}:`, value);
      }
      
      const result = await apiClient("/classrooms", {
        method: "POST",
        body: data,
      });
      
      console.log(' BE returned:', result);
      return result;
    },
      

  update: (id: string | number, data: any) =>
    apiClient(`/classrooms/${id}`, {
      method: "PATCH",
      body: data,
    }),

  remove: (id: string | number) =>
    apiClient(`/classrooms/${id}`, {
      method: "DELETE",
    }),
};
