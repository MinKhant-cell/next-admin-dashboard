import DepartmentsList from '@/components/dashboard/departments';
import { redirect } from 'next/navigation';
import { getUserDetails, getUser, getDepartments } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/server';

export default async function Account() {
  const supabase = createClient();
  const [user, userDetails, departments] = await Promise.all([
    getUser(supabase),
    getUserDetails(supabase),
    getDepartments(supabase),
  ]);

  if (!user) {
    return redirect('/dashboard/signin');
  }

  return <DepartmentsList user={user} userDetails={userDetails} departments={departments}/>;
}
