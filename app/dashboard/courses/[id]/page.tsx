import ClassesList from '@/components/dashboard/classes';
import { redirect } from 'next/navigation';
import { getUserDetails, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { FetchClasses } from '@/components/dashboard/classes/hooks/useClass';

export default async function EditClass({
  params,
}: {
  params: Promise<{ id: string }>
}) {

    const { id } = await params;
  const supabase = createClient();
  const [user, userDetails, {data: classes,error: fetchClassesError}] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase),
    FetchClasses()
  ]);

  if (!user) {
    return redirect('/dashboard/signin');
  }

  return id;
}
