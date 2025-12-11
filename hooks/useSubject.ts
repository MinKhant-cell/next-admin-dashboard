import useSWR from "swr";
import { mutate } from "swr";
import { fetcher } from "@/lib/api/client";
import { TeacherAPI } from "@/lib/api/teacher";
import { SubjectAPI } from "@/lib/api/subject";


export const getSubjects = (page = 1, limit = 10, filter) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (filter.search) params.append('search', filter.search);
  const queryString = params.toString();
  const { data, error, isLoading } = useSWR(
     `/subjects?${queryString}`,
    fetcher
  );

  return {
    subjects: data ?? [],
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

export const getSubjectById = (id: string | number) => {
  const { data, error, isLoading } = useSWR(
    `/subjects/${id}`,
    fetcher
  );
  return {
    subject: data ?? null,
    isLoading,
    isError: error,
  };
}

export const creatSubject = async(subject: any) => {
  const result = await SubjectAPI.create(subject);
  mutate(`/subjects`);
  return result;
}

export const updateSubject = async(id: number, subject: any) => {
  const result = await SubjectAPI.update(id,subject);
  mutate(`/subjects/${id}`);
  return result;
}

export const deleteSubject = async(id: number) => {
  const result = await SubjectAPI.remove(id);;
  return result;
}

