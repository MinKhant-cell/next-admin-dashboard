import { toDateTime } from '@/utils/helpers';
import { stripe } from '@/utils/stripe/config';
import { createClient } from "@supabase/supabase-js";

type Department = {
  name: string;
  description: string;
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const InsertDepartment = async (department: Department) => {
  return await supabase
  .from('departments')
  .insert([
    department
  ]).select();
};

export {
  InsertDepartment
};
