export const dynamic = 'force-dynamic';
import { createClient } from '@supabase/supabase-js';

type Course = {
  name: string;
  start_date: string;
  end_date: string;
  description?: string;
  fees: string;
  currency: string;
  status: string;
  teacher_id?: string;
  is_publish?: boolean;
  photo_url?: string;
  duration?: string;
};

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const InsertCourse = async (courseData: Course) => {
  const { data, error } = await supabase.from('courses').insert([courseData]);
  return { data, error };
};

export const FetchCourses = async () => {
  const { data, error } = await supabase
    .from('courses')
    .select(
      `
    id,
    name,
    teacher_id,
    start_date, end_date, status, fees, currency,
    created_at,
    teachers (
      id,
      name
    )
  `
    )
    .order('created_at', { ascending: false });
  return { data, error };
};

export const FetchCourse = async (id) => {
  const { data, error } = await supabase
    .from('courses')
    .select(
      `
    *,
    teachers (
      id,
      name
    )
  `
    )
    .eq('id', id)
    .single();
  return { data, error };
};


export const UpdateCourse = async (id: string, courseData: Course) => {
  const { data, error, status } = await supabase.from('courses').update(courseData).eq('id',id);
  return { data, error, status };
};

export const DeleteCourse = async (id: string) => {
  const { data, error, status } = await supabase.from('courses').delete().eq('id',id);
  return { data, error, status };
};
