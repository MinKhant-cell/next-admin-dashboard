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
import { getCourseById, updateCourse } from '@/hooks/useCourses';
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
import { ReusableEditCard } from '@/components/ui-components/ReusableEditCard';

const formSchema = z
  .object({
    name: z.string().min(5, 'Name must be at least 5 characters.').max(32, 'Name must be at most 32 characters.'),
    description: z.string().optional().or(z.literal('')),
    start_date: z.string(),
    end_date: z.string(),
    fees: z.coerce.number().min(2).max(1000000).optional(),
    currency: z.enum(['THB', 'USD']).optional(),
    image: z.any().optional() // ✅ Keep for UI, ignore in JSON
  })
  .refine(
    (data) => {
      if (!data.start_date || !data.end_date) return true;
      return data.end_date >= data.start_date;
    },
    {
      message: 'End date must be after start date',
      path: ['end_date']
    }
  );

type FormData = z.infer<typeof formSchema>;

const toDateInputValue = (value?: string | Date | null) => {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString().split('T')[0];
};

export default function CourseEditPage({ id }: { id: string }) {
  const { course, isError, isLoading } = getCourseById(id);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      fees: 0,
      currency: 'THB',
      image: null
    }
  });

  useEffect(() => {
    if (course) {
      form.reset({
        name: course.name || '',
        description: course.description || '',
        start_date: toDateInputValue(course.start_date),
        end_date: toDateInputValue(course.end_date),
        fees: course.fees || 0,
        currency: course.currency || 'THB',
        image: null
      });
    }
  }, [course, form]);

  
  async function onSubmit(data: FormData) {
    const updateData = {
      name: data.name,
      description: data.description || '',
      startDate: data.start_date ? `${data.start_date}T00:00:00.000Z` : '',
      endDate: data.end_date ? `${data.end_date}T00:00:00.000Z` : '',
      fees: Number(data.fees),  // ✅ Ensure number
      currency: data.currency || 'THB'
    };
  
    console.log('📤 FIXED payload:', updateData);

    try {
      const response = await updateCourse(id, updateData);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ API Error:', errorData);
        toast.error(errorData.message || 'Course Update Failed 😢');
        return;
      }

      const result = await response.json();
      console.log('✅ Update success:', result);
      toast.success('Course Updated Successfully 🎉');
      router.push('/dashboard/courses');
    } catch (error) {
      console.error('❌ Update error:', error);
      toast.error('Course Update Failed 😢');
    }
  }

  return (
    <DashboardLayout>
      <Toaster position="top-right" />
      <div className="w-full">
        <ReusableEditCard
          title="Course"
          backHref="/dashboard/courses"
          breadcrumbPath={`/dashboard/courses/${id}`}
          breadcrumbName={course?.name}
          isLoading={isLoading || isError}
        >
          {!isLoading && !isError && course && (
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

                {/* Start Date */}
                <Controller
                  name="start_date"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-gray-600 dark:text-zinc-200" htmlFor="start_date">
                        Start Date
                      </FieldLabel>
                      <Input {...field} id="start_date" type="date" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* End Date */}
                <Controller
                  name="end_date"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-gray-600 dark:text-zinc-200" htmlFor="end_date">
                        End Date
                      </FieldLabel>
                      <Input {...field} id="end_date" type="date" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Fees */}
                <Controller
                  name="fees"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-gray-600 dark:text-zinc-200" htmlFor="fees">
                        Fees
                      </FieldLabel>
                      <Input
                        {...field}
                        type="number"
                        id="fees"
                        placeholder="Enter Fees"
                        min="2"
                        max="1000000"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Currency */}
                <Controller
                  name="currency"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-gray-600 dark:text-zinc-200" htmlFor="currency">
                        Currency
                      </FieldLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="THB">THB</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Image - UI only */}
                <Controller
                  name="image"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel className="text-gray-600 dark:text-zinc-200">
                        Profile Image (Optional)
                      </FieldLabel>
                      <ImageUploadInput value={field.value} onChange={field.onChange} />
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
                  disabled={form.formState.isSubmitting || !course}
                >
                  {form.formState.isSubmitting && <Spinner />}
                  Update Course
                </Button>
              </div>
            </form>
          )}
        </ReusableEditCard>
      </div>
    </DashboardLayout>
  );
}
