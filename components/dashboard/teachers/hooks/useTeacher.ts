import { createClient } from "@supabase/supabase-js";

type Teacher = {
  name: string;
  email: string;
  personal_email: string;
  phone_number: string;
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const InsertTeacher = async (teacher: Teacher) => {
  return await supabase
  .from('teachers')
  .insert([
    teacher
  ]).select();
};

const FetchTeachers = async () => {
  let { data, error } = await supabase
  .from('teachers')
  .select('*')
  return {
    data, error
  }
};

export {
  InsertTeacher,
  FetchTeachers
};
