import StudentEditPage from '@/components/dashboard/students/edit';
import { redirect } from 'next/navigation';
import { getUserDetails, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

export default async function StudentCreate({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
 

  return <StudentEditPage id={id} />;
}
