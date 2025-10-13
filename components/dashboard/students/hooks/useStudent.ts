import { createClient } from "@supabase/supabase-js";

type Student = {
  name: string;
  email?: string;
  personal_email?: string;
  phone_number?: string;
  date_of_birth?: string;
  gender?: string;
  father_name?: string;
  mother_name?: string;
  country?: string;
  grade?: string;
  class_id?: string;
  photo_url?: string;
  bio?: string;
  status: string;
};

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 🟩 Insert a new student
export const InsertStudent = async (student: Student) => {
  const { data, error } = await supabase
    .from("students")
    .insert([student]);
  return { data, error };
};

// 🟦 Fetch all students
export const FetchStudents = async () => {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: false });
  return { data, error };
};
