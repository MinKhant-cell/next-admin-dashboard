import useSWR from "swr";
import { mutate } from "swr";
import { StudentAPI } from "@/lib/api/student";
import { fetcher } from "@/lib/api/client";

export function useStudents(page = 1, limit = 10) {
  const { data, error, isLoading } = useSWR(
    `/students`,
    fetcher
  );

  async function createStudent(student: any) {
    await StudentAPI.create(student);
    mutate(`/students?page=${page}&limit=${limit}`); // refresh data
  }

  async function updateStudent(id: number, student: any) {
     await StudentAPI.update(id, student);
    mutate(`/students?page=${page}&limit=${limit}`);
  }

  async function deleteStudent(id: number) {
    const result = await StudentAPI.remove(id);
    mutate(`/students?page=${page}&limit=${limit}`);
    return result;
  }

  return {
    students: data,
    isLoading,
    isError: error,
    createStudent,
    updateStudent,
    deleteStudent,
  };
}

export const getStudentById = (id: string | number) => {
  const { data, error, isLoading } = useSWR(
    `/students/${id}`,
    fetcher
  );
  return {
    student: data ?? null,
    isLoading,
    isError: error,
  };
}

export const creatStudent = async(student: any) => {
  const result = await StudentAPI.create(student);
  mutate(`/students`);
  return result;
}

export const updateStudent = async(id: number, student: any) => {
  const result = await StudentAPI.update(id,student);
  mutate(`/students`);
  return result;
}


