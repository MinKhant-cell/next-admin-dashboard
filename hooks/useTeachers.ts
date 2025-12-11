import useSWR from "swr";
import { mutate } from "swr";
import { fetcher } from "@/lib/api/client";
import { TeacherAPI } from "@/lib/api/teacher";


export const getTeachers = (page = 1, limit = 10, filter) => {

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (filter.email) params.append('email', filter.email);
  if (filter.gender) params.append('gender', filter.gender);
  if (filter.date_of_birth) params.append('date_of_birth', filter.date_of_birth);
  if (filter.search) params.append('search', filter.search);
  const queryString = params.toString();
  const { data, error, isLoading } = useSWR(
     `/teachers?${queryString}`,
    fetcher
  );

  return {
    teachers: data ?? [],
    isLoading,
    isError: error,
  };
}

export const getAllTeachers = () => {
  const { data, error, isLoading } = useSWR(
     `/employees`,
    fetcher
  );
  return {
    teachers: data ?? [],
    isLoading,
    isError: error,
  };
}

export const getTeacherById = (id: string | number) => {
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

export const createTeacher = async(teacher: any) => {
  const result = await TeacherAPI.create(teacher);
  mutate(`/teachers`);
  return result;
}

export const updateTeacher = async(id: string | number, student: any) => {
  const result = await TeacherAPI.update(id,student);
  mutate(`/teachers/${id}`);
  return result;
}

export const deletTeacher = async(id: string | number) => {
  const result = await TeacherAPI.remove(id);;
  return result;
}

