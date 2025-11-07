import CoursesList from '@/components/dashboard/courses';
import { redirect } from 'next/navigation';
import { getUserDetails, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

export default async function ClassPage() {
  return <CoursesList/>;
}
