import ClassCreatePage from '@/components/dashboard/classes/create';
import { redirect } from 'next/navigation';
import { getUserDetails, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { FetchTeachers } from '@/components/dashboard/teachers/hooks/useTeacher';

export default async function Account() {
  const supabase = createClient();
  const [user, userDetails] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase)
  ]);
  const {data: teachers,error: fetchTeachersError} = await FetchTeachers()
  if (!user) {
    return redirect('/dashboard/signin');
  }

  return <ClassCreatePage user={user} teachers={teachers} userDetails={userDetails} />;
}
