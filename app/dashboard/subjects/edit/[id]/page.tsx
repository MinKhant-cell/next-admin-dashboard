import SubjectEditPage from "@/components/dashboard/subjects/edit";

export default async function SubjectsEdit({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
  return <SubjectEditPage id={id}/>;
}
