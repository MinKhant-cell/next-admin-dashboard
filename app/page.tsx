import { redirect } from 'next/navigation';

export default async function Dashboard() {
  // const supabase = createClient();
  // const [user] = await Promise.all([getUser(supabase)]);

  // if (!user) {
  //   return redirect('/dashboard/signin');
  // } else {
  //   redirect('/dashboard/main');
  // }


  redirect('/dashboard/main');
}
