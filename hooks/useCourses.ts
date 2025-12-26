import useSWR from "swr";
import { mutate } from "swr";
import { StudentAPI } from "@/lib/api/student";
import { fetcher } from "@/lib/api/client";
import { CourseAPI } from "@/lib/api/course";



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
    course: data ?? null,
    isLoading,
    isError: error,
  };
}

export const createCourse = async(student: any) => {
  const result = await CourseAPI.create(student);
  mutate(`/courses`);
  return result;
}

export const updateCourse = async (id: string | number, course: any) => {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  const result = await CourseAPI.update(numericId, course);
  await mutate(`/courses`);
  return result;
};

export const deleteCourse = async(id: number) => {
  const result = await CourseAPI.remove(id);;
  return result;
}

