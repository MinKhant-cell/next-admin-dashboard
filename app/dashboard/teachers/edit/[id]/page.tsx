import TeacherEditPage from '@/components/dashboard/teachers/edit';

export default async function StudentCreate({params}: {params: Promise<{id: string}>}) {
  const {id} = await params;

  return <TeacherEditPage id={id} />;
}
