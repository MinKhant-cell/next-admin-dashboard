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

  return (
    <CourseDetailsPage id={id} />
  );
}
