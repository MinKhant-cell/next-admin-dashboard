import StudentDetailsPage from '@/components/dashboard/students/details';
export default async function StudentDetails({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <StudentDetailsPage id={id} />;
}
