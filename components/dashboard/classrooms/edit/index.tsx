/*eslint-disable*/
'use client';

import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { ImageUploadInput } from '@/components/ui-components/ImageUploadInput';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Spinner } from '@/components/ui/spinner';
import { getClassroomById, updateClassroom } from '@/hooks/useClassrooms';
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
  grade: z.string().optional().or(z.literal('')),
  description: z.string().optional().or(z.literal('')),
  image: z.any().optional() // ✅ Keep for UI, ignore in JSON
});

type FormData = z.infer<typeof formSchema>;

export default function ClassroomEditPage({ id }: { id: string }) {
  const { classroom, isError, isLoading } = getClassroomById(id);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      grade: '',
      description: '',
      image: null
    }
  });

  useEffect(() => {
    if (classroom) {
      form.reset({
        name: classroom.name || '',
        grade: classroom.grade || '',
        description: classroom.description || '',
        image: null
      });
    }
  }, [classroom, form]);

  async function onSubmit(data: FormData) {
    const updateData = {
      name: data.name,
      grade: data.grade || '',
      description: data.description || ''
    };
  
    console.log('📤 Sending JSON payload:', updateData);
  
    try {
      const response = await updateClassroom(id, updateData); 
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ API Error:', errorData);
        toast.error(errorData.message || 'Update failed');
        return;
      }
  
      const result = await response.json();
      console.log('✅ Update success:', result);
      toast.success('Classroom Updated Successfully 🎉');
      router.push('/dashboard/classrooms');
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
          title="Classroom"
          backHref="/dashboard/classrooms"
          breadcrumbPath={`/dashboard/classrooms/${id}`}
          breadcrumbName={classroom?.name}
          isLoading={isLoading || isError}
        >
          {!isLoading && !isError && classroom && (
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                {/* Name */}
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-gray-600 dark:text-zinc-200" htmlFor="name">
                        Name
                      </FieldLabel>
                      <Input {...field} id="name" placeholder="Enter Name" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Grade */}
                <Controller
                  name="grade"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-gray-600 dark:text-zinc-200" htmlFor="grade">
                        Grade
                      </FieldLabel>
                      <Input {...field} id="grade" placeholder="Enter Grade" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Description */}
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
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

               
                <Controller
                  name="image"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel className="text-gray-600 dark:text-zinc-200">
                        Profile Image (Optional)
                      </FieldLabel>
                      <ImageUploadInput 
                        value={field.value} 
                        onChange={field.onChange} 
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Image updates require separate endpoint
                      </p>
                    </Field>
                  )}
                />
              </FieldGroup>
              
              <div className="my-5">
                <Button 
                  type="submit" 
                  disabled={form.formState.isSubmitting || !classroom}
                >
                  {form.formState.isSubmitting && <Spinner />}
                  Update Classroom
                </Button>
              </div>
            </form>
          )}
        </ReusableEditCard>
      </div>
    </DashboardLayout>
  );
}
