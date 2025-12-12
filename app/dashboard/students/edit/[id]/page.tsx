import StudentEditPage from '@/components/dashboard/students/edit';

export default async function StudentCreate({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
 

  return <StudentEditPage id={id} />;
}
