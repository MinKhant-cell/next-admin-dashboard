import CoursesList from '@/components/dashboard/courses';
import { redirect } from 'next/navigation';
import { getUserDetails, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { FetchCourses } from '@/components/dashboard/courses/hooks/useCourses';

export default async function ClassPage() {
  const supabase = createClient();
  const [user, userDetails, ] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase),
  ]);

  const { data: courses, error: fetchClassesError } = await FetchCourses();

  if (!user) {
    return redirect('/dashboard/signin');
  }

  return <CoursesList courses={ courses || [] } user={user} userDetails={userDetails} />;
}
