import ClassesList from '@/components/dashboard/classes';
import { redirect } from 'next/navigation';
import { getUserDetails, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { FetchClasses } from '@/components/dashboard/classes/hooks/useClass';

export default async function Account() {
  const supabase = createClient();
  const [user, userDetails, {data: classes,error: fetchClassesError}] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase),
    FetchClasses()
  ]);

  if (!user) {
    return redirect('/dashboard/signin');
  }

  return <ClassesList classes={classes || []} user={user} userDetails={userDetails} />;
}
