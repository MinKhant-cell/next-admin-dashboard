import EditCoursePage from '@/components/dashboard/courses/edit';

export default async function Editcourse({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
 
  return (
    <EditCoursePage />
  );
}
