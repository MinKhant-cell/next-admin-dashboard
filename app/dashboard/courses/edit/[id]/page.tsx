import { getUserDetails, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { FetchCourse } from '@/components/dashboard/courses/hooks/useCourses';
import EditCoursePage from '@/components/dashboard/courses/edit';
import { FetchTeachers } from '@/components/dashboard/teachers/hooks/useTeacher';
import { redirect } from 'next/navigation';

export default async function Editcourse({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createClient();
  const [user, userDetails, { data: course, error: fetchCourseError }] =
    await Promise.all([
      getUser(supabase),
      getUserDetails(supabase),
      FetchCourse(id)
    ]);
  const { data: teachers, error: fetchTeachersError } = await FetchTeachers();

  if (!user) {
    return redirect('/dashboard/signin');
  }
  return (
    <EditCoursePage
      teachers={teachers}
      course={course || null}
      user={user}
      userDetails={userDetails}
    />
  );
}
