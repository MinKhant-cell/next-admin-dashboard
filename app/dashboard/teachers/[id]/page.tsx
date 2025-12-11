import TeacherDetailsPage from '@/components/dashboard/teachers/details';
export default async function TeacherDetails({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TeacherDetailsPage id={id} />;
}
