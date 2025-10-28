import CoursesList from '@/components/dashboard/courses';
import { redirect } from 'next/navigation';
import { getUserDetails, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

export default async function ClassPage() {
  const supabase = createClient();
  const [user, userDetails, ] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase),
  ]);


  if (!user) {
    return redirect('/dashboard/signin');
  }

  return <CoursesList user={user} userDetails={userDetails} />;
}
