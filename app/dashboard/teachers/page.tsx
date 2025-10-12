import TeacherList from '@/components/dashboard/teachers';
import { redirect } from 'next/navigation';
import { getUserDetails, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { FetchTeachers } from '@/components/dashboard/teachers/hooks/useTeacher';

export default async function Account() {
  const supabase = createClient();
  const [user, userDetails, {data: teachers,error: fetchTeacherError}] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase),
    FetchTeachers()
  ]);

  console.log(teachers)

  if (!user) {
    return redirect('/dashboard/signin');
  }

  if (fetchTeacherError) {
    console.log(fetchTeacherError)
  }

  return <TeacherList user={user} userDetails={userDetails} teachers={teachers}/>;
}
