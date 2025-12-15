import CourseEditPage from '@/components/dashboard/courses/edit';

export default async function CourseEdit({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <CourseEditPage id={id}/>
  );
}
