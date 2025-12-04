import CreateCoursePage from '@/components/dashboard/courses/create';
import { redirect } from 'next/navigation';
import { getUserDetails, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { FetchTeachers } from '@/components/dashboard/teachers/hooks/useTeacher';

export default async function CourseCreatePage() {
  
  const { data: teachers, error: fetchTeachersError } = await FetchTeachers();

  // if (!user) {
  //   return redirect('/dashboard/signin');
  // }

  return (
    <CreateCoursePage
      teachers={teachers}
    />
  );
}
