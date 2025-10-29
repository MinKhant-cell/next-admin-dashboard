import { redirect } from 'next/navigation';
import { getUserDetails, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { FetchCourse } from '@/components/dashboard/courses/hooks/useCourses';
import CourseDetailsPage from '@/components/dashboard/courses/details';

export default async function EditClass({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createClient();
  const [user, userDetails] =
    await Promise.all([
      getUser(supabase),
      getUserDetails(supabase),
    ]);

  if (!user) {
    return redirect('/dashboard/signin');
  }

  return (
    <CourseDetailsPage id={id} user={user} userDetails={userDetails} />
  );
}
