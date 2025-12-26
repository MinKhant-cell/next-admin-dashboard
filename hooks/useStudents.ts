import useSWR, { mutate } from "swr";
import { StudentAPI } from "@/lib/api/student";
import { fetcher } from "@/lib/api/client";

export function useStudents(page = 1, limit = 10) {
  const { data, error, isLoading } = useSWR(
    `/students?page=${page}&limit=${limit}`,
    fetcher
  );

  async function createStudent(student: any) {
    const result = await StudentAPI.create(student);
    mutate(`/students?page=${page}&limit=${limit}`);
    return result;
  }

  async function updateStudent(id: number | string, student: any) {
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    const result = await StudentAPI.update(numericId, student);
    mutate(`/students?page=${page}&limit=${limit}`);
    return result;
  }

  async function deleteStudent(id: number | string) {
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
    const result = await StudentAPI.remove(numericId);
    mutate(`/students?page=${page}&limit=${limit}`);
    return result;
  }

  return {
    students: data ?? [],
    isLoading,
    isError: !!error,
    createStudent,
    updateStudent,
    deleteStudent,
  };
}

export const getAllStudents = () => {
  const { data, error, isLoading } = useSWR(`/students`, fetcher);
  console.log("student data",data)
  return {
    students: data ?? [],
    isLoading,
    isError: !!error,
  };
};

export const getStudents = (page = 1, limit = 10, filter = {}) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  // if (filter.email) params.append('email', filter.email);
  // if (filter.gender) params.append('gender', filter.gender);
  // if (filter.date_of_birth) params.append('date_of_birth', filter.date_of_birth);
  // if (filter.search) params.append('search', filter.search);

  const { data, error, isLoading } = useSWR(`/students?${params.toString()}`, fetcher);

  return {
    students: data ?? [],
    isLoading,
    isError: !!error,
  };
};

export const getStudentById = (id: string | number) => {
  const { data, error, isLoading } = useSWR(`/students/${id}`, fetcher);
  return {
    student: data ?? null,
    isLoading,
    isError: !!error,
  };
};

export const createStudent = async (student: any) => {
  const result = await StudentAPI.create(student);
  await mutate(`/students`);
  return result;
};

export const updateStudent = async (id: string | number, student: any) => {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  const result = await StudentAPI.update(numericId, student);
  await mutate(`/students`);
  return result;
};

export const deleteStudent = async (id: string | number) => {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  const result = await StudentAPI.remove(numericId);
  await mutate(`/students`);
  return result;
};
