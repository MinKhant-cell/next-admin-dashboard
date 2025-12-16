import ClassroomEditPage from '@/components/dashboard/classrooms/edit';

export default async function ClassroomEdit({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <ClassroomEditPage id={id}/>
  );
}
