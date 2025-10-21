import StudentEditPage from '@/components/dashboard/students/edit';
import { redirect } from 'next/navigation';
import { getUserDetails, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

export default async function StudentCreate({params}: {params: Promise<{id: string}>}) {
  const supabase = createClient();
  const {id} = await params;
  const [user, userDetails] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase)
  ]);

  if (!user) {
    return redirect('/dashboard/signin');
  }

  return <StudentEditPage id={id} user={user} userDetails={userDetails} />;
}
