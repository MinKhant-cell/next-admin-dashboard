import useSWR from "swr";
import { mutate } from "swr";
import { ClassroomAPI } from "@/lib/api/classroom";
import { fetcher } from "@/lib/api/client";

export const getAllClassrooms = () => {
  const { data, error, isLoading } = useSWR(
     `/classrooms`,
    fetcher
  );
  return {
    classrooms: data ?? [],
    isLoading,
    isError: error,
  };
}

export const getClassrooms = (page = 1, limit = 10, filter) => {

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (filter.search) params.append('search', filter.search);
  const queryString = params.toString();
  const { data, error, isLoading } = useSWR(
     `/classrooms?${queryString}`,
    fetcher
  );
  return {
    classrooms: data ?? [],
    isLoading,
    isError: error,
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
  const result = await ClassroomAPI.create(student);
  mutate(`/students`);
  return result;
}

export const updateStudent = async(id: number, student: any) => {
  const result = await ClassroomAPI.update(id,student);
  mutate(`/students`);
  return result;
}

export const deleteStudent = async(id: number) => {
  const result = await ClassroomAPI.remove(id);;
  return result;
}

