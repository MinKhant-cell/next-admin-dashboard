import useSWR from "swr";
import { mutate } from "swr";
import { StudentAPI } from "@/lib/api/student";
import { fetcher } from "@/lib/api/client";



export const getCourses = (page = 1, limit = 10, filter) => {

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (filter.search) params.append('search', filter.search);
  const queryString = params.toString();
  const { data, error, isLoading } = useSWR(
     `/courses?${queryString}`,
    fetcher
  );

  return {
    courses: data ?? [],
    isLoading,
    isError: error,
  };
}

export const getCourseById = (id: string | number) => {
  const { data, error, isLoading } = useSWR(
    `/courses/${id}`,
    fetcher
  );
  return {
    student: data ?? null,
    isLoading,
    isError: error,
  };
}

export const creatCourse = async(student: any) => {
  const result = await StudentAPI.create(student);
  mutate(`/courses`);
  return result;
}

export const updateCourse = async(id: number, student: any) => {
  const result = await StudentAPI.update(id,student);
  mutate(`/courses`);
  return result;
}

export const deleteCourse = async(id: number) => {
  const result = await StudentAPI.remove(id);;
  return result;
}

