import StudentDetailsPage from '@/components/dashboard/students/details';
import { redirect } from 'next/navigation';
import { getUserDetails, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { useStudents } from '@/hooks/useStudents';
export default async function StudentDetails({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createClient();
  const [user, userDetails] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase)
  ]);

  if (!user) {
    return redirect('/dashboard/signin');
  }

  return <StudentDetailsPage id={id} user={user} userDetails={userDetails} />;
}
