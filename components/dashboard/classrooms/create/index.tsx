/*eslint-disable*/
'use client';

import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { toast, Toaster } from 'sonner';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { ImageUploadInput } from '@/components/ui-components/ImageUploadInput';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Spinner } from "@/components/ui/spinner"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field';
import {
  InputGroup,
  InputGroupTextarea
} from '@/components/ui/input-group';
import { ReusableCreateCard } from '@/components/ui-components/ReusableCreateCard';
import { createClassroom } from '@/hooks/useClassrooms';

const formSchema = z.object({
  name: z.string().min(5).max(32),
  description: z.string().optional(),
  grade: z.string().optional(),
  image: z.instanceof(File).nullable().optional()
});

export default function ClassroomCreatePage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      grade: '',
      description: '',
      image: null
    }
  });
  
  async function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("grade", data.grade || '');
    formData.append("description", data.description || '');
    
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }
    
    console.log('📤 Creating classroom with FormData');
    
    try {
  
      const response = await createClassroom(formData);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Create error:', errorData);
        toast.error(errorData.message || 'Classroom creation failed');
        return;
      }
      
      const result = await response.json();
      console.log('✅ Create success:', result);
      toast.success("Classroom Created Successfully 🎉");
      form.reset();
      router.push('/dashboard/classrooms');
      
    } catch (error) {
      console.error('❌ Create error:', error);
      toast.error("Classroom Creation Failed 😢");
    }
  }
  
  
  return (
    <DashboardLayout>
      <Toaster position="top-right" />
      <div className="w-full">
        <ReusableCreateCard
          title="Classroom"
          backHref="/dashboard/classrooms"
        >
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-gray-600 dark:text-zinc-200" htmlFor="name">
                      Name
                    </FieldLabel>
                    <Input {...field} id="name" placeholder="Enter Name" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="grade"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-gray-600 dark:text-zinc-200" htmlFor="grade">
                      Grade
                    </FieldLabel>
                    <Input {...field} id="grade" placeholder="Enter Grade" />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-gray-600 dark:text-zinc-200" htmlFor="description">
                      Description
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="description"
                        placeholder="Enter Description"
                        rows={3}
                        className="min-h-24 resize-none"
                      />
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-gray-600 dark:text-zinc-200" htmlFor="image">
                      Image Upload
                    </FieldLabel>
                    <ImageUploadInput value={field.value} onChange={field.onChange} />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <div className="my-5">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && <Spinner />}
                Create
              </Button>
            </div>
          </form>
        </ReusableCreateCard>
      </div>
    </DashboardLayout>
  );
}
