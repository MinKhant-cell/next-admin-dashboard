import CourseDetailsPage from '@/components/dashboard/courses/details';

export default async function EditClass({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <CourseDetailsPage id={id} />
  );
}
