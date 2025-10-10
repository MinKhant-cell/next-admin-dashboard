/*eslint-disable*/
'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { LuCircleFadingPlus } from 'react-icons/lu';
import { InsertDepartment } from '../hooks/departments';
interface DepartmentForm {
  name: string;
  description: string;
}

export default function CreateDepartmentSheet() {
  const { register, handleSubmit, reset, formState: {errors, isSubmitting} } = useForm<DepartmentForm>();
  const createDepartment = async (createData: DepartmentForm) => {
    console.log(createData);
    const {result} = await InsertDepartment(createData)
    console.log(result)
    reset()
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <LuCircleFadingPlus className="mr-1" /> New Department
        </Button>
      </SheetTrigger>
      <SheetContent className="px-0 min-h-screen">
       
          <SheetHeader className="px-3">
            <SheetTitle className="mb-1">Create a New Department</SheetTitle>
            <SheetDescription>
              All transactions are secure and encrypted
            </SheetDescription>
          </SheetHeader>
             <Separator className="mb-5" />
         
        <form onSubmit={handleSubmit(createDepartment)}>
          <div className="grid h-full flex-1 auto-rows-min gap-5 px-3">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register('name', { required: "Name is required", minLength: {value: 2, message: "Name must be at least 2 characters!"} })} />
              {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" {...register('description', { required: false})} rows={5} />
            </div>
          </div>
          <Separator />
          <SheetFooter className="px-3">
            <SheetClose asChild>
              <Button size="sm" variant="outline">
                Cancel
              </Button>
            </SheetClose>
            <Button size="sm" type="submit">
              Save
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
    
  );
}
