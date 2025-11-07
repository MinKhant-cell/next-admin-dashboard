import StudentsList from '@/components/dashboard/students';
import { redirect } from 'next/navigation';
import { getUserDetails, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { useStudents } from '@/hooks/useStudents';
export default async function Account() {
 

  return <StudentsList/>;
}
