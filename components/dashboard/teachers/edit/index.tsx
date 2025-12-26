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
import { getTeacherById, updateTeacher } from '@/hooks/useTeachers';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field';
import { ReusableEditCard } from '@/components/ui-components/ReusableEditCard';

const formSchema = z.object({
  name: z.string().min(5, 'Name must be at least 5 characters.').max(32, 'Name must be at most 32 characters.'),
  email: z.string().email('Invalid email address.'),
  phone: z.string().regex(/^[0-9]{10,15}$/, 'Phone must be 10–15 digits.'),
  image: z.any().optional() 
});

type FormData = z.infer<typeof formSchema>;

export default function TeacherEditPage({ id }: { id: string }) {
  const { teacher, isError, isLoading } = getTeacherById(id);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      image: null
    }
  });

  useEffect(() => {
    if (teacher) {
      form.reset({
        name: teacher.name || '',
        email: teacher.email || '',
        phone: teacher.phone || '',
        image: null
      });
    }
  }, [teacher, form]);

  async function onSubmit(data: FormData) {
    const updateData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
    };
  
    console.log('📤 Sending JSON payload:', updateData);
  
    try {
      
      const response = await updateTeacher(id, updateData);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Update error:', errorData);
        toast.error(errorData.message || 'Update failed');
        return;
      }
      
      console.log('✅ Update success');
      toast.success('Teacher Updated Successfully 🎉');
      router.push('/dashboard/teachers');
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
          title="Teacher"
          backHref="/dashboard/teachers"
          breadcrumbPath={`/dashboard/teachers/${id}`}
          breadcrumbName={teacher?.name}
          isLoading={isLoading || isError}
        >
          {!isLoading && !isError && teacher && (
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
                      <Input 
                        {...field} 
                        id="name" 
                        placeholder="Enter Name" 
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Email */}
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-gray-600 dark:text-zinc-200" htmlFor="email">
                        Email
                      </FieldLabel>
                      <Input 
                        {...field} 
                        id="email" 
                        type="email" 
                        placeholder="Enter Email" 
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Phone */}
                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-gray-600 dark:text-zinc-200" htmlFor="phone">
                        Phone
                      </FieldLabel>
                      <Input 
                        {...field} 
                        id="phone" 
                        placeholder="Enter Phone" 
                      />
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
                        Image updates require separate upload endpoint
                      </p>
                    </Field>
                  )}
                />
              </FieldGroup>
              
              <div className="my-5">
                <Button 
                  type="submit" 
                  disabled={form.formState.isSubmitting || !teacher}
                >
                  {form.formState.isSubmitting && <Spinner />}
                  Update Teacher
                </Button>
              </div>
            </form>
          )}
        </ReusableEditCard>
      </div>
    </DashboardLayout>
  );
}
