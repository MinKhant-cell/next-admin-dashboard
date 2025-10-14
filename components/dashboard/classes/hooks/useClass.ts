export const dynamic = 'force-dynamic';
import { createClient } from '@supabase/supabase-js';

type Class = {
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

export const InsertClass = async (classData: Class) => {
  const { data, error } = await supabase.from('classes').insert([classData]);
  return { data, error };
};

export const FetchClasses = async () => {
  const { data, error } = await supabase
    .from('classes')
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

export const FetchClass = async (id) => {
  const { data, error } = await supabase
    .from('classes')
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


export const UpdateClass = async (id: string, classData: Class) => {
  const { data, error, status } = await supabase.from('classes').update(classData).eq('id',id);
  return { data, error, status };
};

export const DeleteClass = async (id: string) => {
  const { data, error, status } = await supabase.from('classes').delete().eq('id',id);
  return { data, error, status };
};
