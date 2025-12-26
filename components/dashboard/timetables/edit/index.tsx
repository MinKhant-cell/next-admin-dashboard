/*eslint-disable*/
'use client';

import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { toast, Toaster } from 'sonner';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { ImageUploadInput } from '@/components/ui-components/ImageUploadInput';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Spinner } from '@/components/ui/spinner';
import { getSubjectById, updateSubject } from '@/hooks/useSubject';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field';
import { InputGroup, InputGroupTextarea } from '@/components/ui/input-group';
import { ReusableEditCard } from '@/components/ui-components/ReusableEditCard';

const formSchema = z.object({
  name: z.string().min(5, 'Name must be at least 5 characters.').max(32, 'Name must be at most 32 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.').max(100, 'Description must be at least 100 characters.').optional(),
  image: z.instanceof(File).nullable().optional()
});

export default function SubjectEditPage({ id }: any) {
  const { subject, isError, isLoading } = getSubjectById(id);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      image: null
    }
  });

  useEffect(() => {
    if (subject) {
      form.reset({
        name: subject.name,
        description: subject.description
      });
    }
  }, [subject, form.reset]);

  async function onSubmit(subject: z.infer<typeof formSchema>) {
    console.log('📤 Updating subject:', subject);
    
    try {
      const response = await updateSubject(id, subject);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Update error:', errorData);
        toast.error(errorData.message || 'Update failed');
        return;
      }
      
      console.log('✅ Update success');
      toast.success('Subject Updated Successfully 🎉');
      form.reset();
      router.push('/dashboard/subjects');
    } catch (error) {
      console.error('❌ Update error:', error);
      toast.error('Update Failed 😢');
    }
  }
  

  return (
    <DashboardLayout>
      <Toaster position="top-right" />
      <div className="w-full">
        <ReusableEditCard
          title="Timetable"
          backHref="/dashboard/timetables"
          breadcrumbPath={`/dashboard/timetables/${id}`}
          breadcrumbName={subject?.name}
          isLoading={isLoading || isError}
        >
          {!isLoading && !isError && (
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
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && <Spinner />}
                  Update
                </Button>
              </div>
            </form>
          )}
        </ReusableEditCard>
      </div>
    </DashboardLayout>
  );
}
