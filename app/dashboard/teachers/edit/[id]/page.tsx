import TeacherEditPage from '@/components/dashboard/teachers/edit';
import { redirect } from 'next/navigation';
import { getUserDetails, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

export default async function StudentCreate({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;

  return <TeacherEditPage id={id} />;
}
