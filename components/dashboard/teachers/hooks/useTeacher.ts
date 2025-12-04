export const dynamic = 'force-dynamic';
import { createClient } from '@supabase/supabase-js';

type Teacher = {
  name: string;
  email: string;
  personal_email: string;
  phone_number: string;
}



export const InsertTeacher = async (teacherData: Teacher) => {
  const { data, error } = await supabase.from('teachers').insert([teacherData]);
  return { data, error };
};

export const FetchTeachers = async () => {
  const { data, error } = await supabase
    .from('teachers')
    .select(
      `*`
    )
    .order('created_at', { ascending: false });
  return { data, error };
};

export const FetchTeacher = async (id) => {
  const { data, error } = await supabase
    .from('teachers')
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


export const UpdateTeacher = async (id: string, TeacherData: Teacher) => {
  const { data, error, status } = await supabase.from('Teachers').update(TeacherData).eq('id',id);
  return { data, error, status };
};

export const DeleteTeacher = async (id: string) => {
  const { data, error, status } = await supabase.from('Teachers').delete().eq('id',id);
  return { data, error, status };
};

