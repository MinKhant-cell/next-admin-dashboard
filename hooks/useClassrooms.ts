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

export const getClassroomById = (id: string | number) => {
  const { data, error, isLoading } = useSWR(
    `/classrooms/${id}`,
    fetcher
  );
  return {
    classroom: data ?? null,
    isLoading,
    isError: error,
  };
}

export const createClassroom = async(classroom: any) => {
  const result = await ClassroomAPI.create(classroom);
  mutate(`/classrooms`);
  return result;
}


export const updateClassroom = async (id: string | number, classroom: any) => {
  const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
  const result = await ClassroomAPI.update(numericId, classroom);
  await mutate(`/classrooms`);
  return result;
};


export const deleteClassroom = async(id: string | number) => {
  const result = await ClassroomAPI.remove(id);;
  return result;
}

