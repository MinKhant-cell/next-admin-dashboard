/*eslint-disable*/
'use client';

import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { ImageUploadInput } from '@/components/ui-components/ImageUploadInput';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Spinner } from '@/components/ui/spinner';
import { getStudentById, updateStudent } from '@/hooks/useStudents';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field';
import { InputGroup, InputGroupTextarea } from '@/components/ui/input-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import LinkBackButton from '@/components/ui-components/LinkBackButton';
import { BreadCrumbs } from '@/components/ui-components/BreadCrumbs';

const formSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters.").max(32, "Name must be at most 32 characters."),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  gender: z.enum(["MALE", "FEMALE"] as const, { required_error: "Gender is required" }),
  date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD format"),
  // description: z.string().min(10, "Description must be at least 10 characters.").max(100, "Description must be at most 100 characters.").optional(),
  image: z.instanceof(File).nullable().optional()
});

type FormData = z.infer<typeof formSchema>;

export default function StudentEditPage({ id }: { id: string }) {
  const { student, isError, isLoading } = getStudentById(id);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      gender: undefined as any,
      date_of_birth: '',
      // description: '',
      image: null
    }
  });

  
  useEffect(() => {
    if (student) {
      const dob = student.date_of_birth 
        ? student.date_of_birth.split('T')[0]  
        : '';
      
      form.reset({
        name: student.name || '',
        email: student.email || '',
        gender: student.gender || undefined,
        date_of_birth: dob,
        // description: student.description || '',
        image: null
      });
    }
  }, [student, form]);

  
  async function onSubmit(data: FormData) {
    const updateData = {
      name: data.name,
      email: data.email,
      gender: data.gender!,
      date_of_birth: data.date_of_birth ? `${data.date_of_birth}T00:00:00.000Z` : '',
      //description: data.description || ''
    };
  
    console.log('📤 Sending update payload:', updateData);
  
    try {
      
      const response = await updateStudent(id, updateData);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Update error:', errorData);
        toast.error(errorData.message || 'Update failed');
        return;
      }
      
      const result = await response.json();
      console.log('✅ Update success:', result);
      toast.success('Student Updated Successfully 🎉');
      router.push('/dashboard/students');
      
    } catch (error) {
      console.error('❌ Update error:', error);
      toast.error('Update Failed 😢');
    }
  }
  

  return (
    <DashboardLayout>
      <Toaster position="top-right" />
      <div className="h-full w-full flex flex-col gap-5">
        <div className="w-full">
          <Card className="h-[80vh] w-full p-5 sm:overflow-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <div className="flex items-center gap-4">
                <LinkBackButton href="/dashboard/students" />
                <h1 className="text-gray-700 dark:text-zinc-200 font-bold text-xl">
                  Edit Student
                </h1>
              </div>
              <div className="flex-shrink-0">
                <BreadCrumbs />
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Spinner />
              </div>
            ) : isError ? (
              <div className="text-center py-8 text-red-500">
                Failed to load student data
              </div>
            ) : (
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

                  {/* Gender */}
                  <Controller
                    name="gender"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-gray-600 dark:text-zinc-200" htmlFor="gender">
                          Gender
                        </FieldLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          value={field.value || ""}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent className="text-gray-800 dark:text-zinc-100">
                          <SelectItem value="MALE" className="text-gray-900 dark:text-zinc-100">MALE</SelectItem>
                          <SelectItem value="FEMALE" className="text-gray-900 dark:text-zinc-100">FEMALE</SelectItem>
                        </SelectContent>
                        </Select>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />

                  {/* Date of Birth */}
                  <Controller
                    name="date_of_birth"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-gray-600 dark:text-zinc-200" htmlFor="date_of_birth">
                          Date of Birth
                        </FieldLabel>
                        <Input 
                          {...field} 
                          id="date_of_birth" 
                          type="date"
                          placeholder="YYYY-MM-DD" 
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />

                  {/* Description */}
                  {/* <Controller
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
                  /> */}

                  {/* Image - Optional for updates */}
                  <Controller
                    name="image"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-gray-600 dark:text-zinc-200" htmlFor="image">
                          Image Upload
                        </FieldLabel>
                        <ImageUploadInput value={field.value} onChange={field.onChange} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                </FieldGroup>
                <div className="my-5">
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting && <Spinner />}
                    Update Student
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
