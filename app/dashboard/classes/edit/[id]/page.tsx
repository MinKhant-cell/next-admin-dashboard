import ClassesList from '@/components/dashboard/classes';
import { redirect } from 'next/navigation';
import { getUserDetails, getUser } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';
import { FetchClass } from '@/components/dashboard/classes/hooks/useClass';
import EditClassPage from '@/components/dashboard/classes/edit';

export default async function EditClass({
  params,
}: {
  params: Promise<{ id: string }>
}) {

    const { id } = await params;
  const supabase = createClient();
  const [user, userDetails, {data: classData,error: fetchClassError}] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase),
    FetchClass(id)
  ]);

  console.log(classData)

  if (!user) {
    return redirect('/dashboard/signin');
  }
  return <EditClassPage classValues={classData || null } user={user} userDetails={userDetails} />;
}
