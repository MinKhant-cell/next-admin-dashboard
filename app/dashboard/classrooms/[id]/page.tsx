import ClassroomDetailsPage from "@/components/dashboard/classrooms/details";


export default async function ClassroomsCreate({
  params
}: {
  params: Promise<{ id: string }>;
}) 
{
  const { id } = await params;
  return <ClassroomDetailsPage id={id} />;
}
