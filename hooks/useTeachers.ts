import useSWR from "swr";
import { mutate } from "swr";
import { fetcher } from "@/lib/api/client";

export function useTeachers(page = 1, limit = 10) {
  const { data, error, isLoading } = useSWR(
    `/employees?page=${page}&limit=${limit}`,
    fetcher
  );

//   async function createTeacher(Teacher: any) {
//     await TeacherAPI.create(Teacher);
//     mutate(`/teachers?page=${page}&limit=${limit}`); // refresh data
//   }

//   async function updateTeacher(id: number, Teacher: any) {
//      await TeacherAPI.update(id, Teacher);
//     mutate(`/teachers?page=${page}&limit=${limit}`);
//   }

//   async function deleteTeacher(id: number) {
//     const result = await TeacherAPI.remove(id);
//     mutate(`/teachers?page=${page}&limit=${limit}`);
//     return result;
//   }

  return {
    teachers: data,
    isLoading,
    isError: error,
    // createTeacher,
    // updateTeacher,
    // deleteTeacher,
  };
}

export const getStudentById = (id: string | number) => {
  const { data, error, isLoading } = useSWR(
    `/teachers/${id}`,
    fetcher
  );
  return {
    teacher: data ?? null,
    isLoading,
    isError: error,
  };
}

