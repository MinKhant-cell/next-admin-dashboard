import SubjectDetailsPage from "@/components/dashboard/subjects/details";

export default async function SubjectsCreate({
  params
}: {
  params: Promise<{ id: string }>;
}) 
{
  const { id } = await params;
  return <SubjectDetailsPage id={id} />;
}
