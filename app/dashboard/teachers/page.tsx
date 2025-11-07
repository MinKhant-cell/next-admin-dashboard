import TeacherList from '@/components/dashboard/teachers';
import { redirect } from 'next/navigation';
import { getUserDetails, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { FetchTeachers } from '@/components/dashboard/teachers/hooks/useTeacher';

export default async function Account() {
 

  return <TeacherList />;
}
