import ClassesList from '@/components/dashboard/classes';
import { redirect } from 'next/navigation';
import { getUserDetails, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { FetchClasses } from '@/components/dashboard/classes/hooks/useClass';
import { FetchTeachers } from '@/components/dashboard/teachers/hooks/useTeacher';

export default async function ClassPage() {
  const supabase = createClient();
  const [user, userDetails, ] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase),
  ]);

  const {data: classes,error: fetchClassesError} = await FetchClasses()

  console.log("claseerer")
  console.log(classes)
  if (!user) {
    return redirect('/dashboard/signin');
  }

  return <ClassesList classes={classes || []} user={user} userDetails={userDetails} />;
}
