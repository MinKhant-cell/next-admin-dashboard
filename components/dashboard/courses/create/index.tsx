/*eslint-disable*/
'use client';

import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ImageUploadInput } from '@/components/ui-components/ImageUploadInput';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Spinner } from '@/components/ui/spinner';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea
} from '@/components/ui/input-group';
import LinkBackButton from '@/components/ui-components/LinkBackButton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { createCourse } from '@/hooks/useCourses';

const formSchema = z
  .object({
    name: z
      .string()
      .min(5, 'Name must be at least 5 characters.')
      .max(32, 'Name must be at most 32 characters.'),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters.')
      .max(100, 'Description must be at most 100 characters.')
      .optional()
      .or(z.literal("")),
    start_date: z
      .string(),
    end_date: z
      .string(),
    fees: z
      .coerce
      .number()
      .min(2, 'Fee must be at least 2 digits.')
      .max(1000000, 'Fee must be at most 1000000 digits.')
      .optional(),
    currency: z
      .enum(['THB', 'USD'], {
        required_error: 'Currency is required.'
      })
      .optional(),
    image: z.instanceof(File).nullable().optional()
  })
  .refine(
    (data) => {
      if (!data.start_date || !data.end_date) return true;

      return data.end_date >= data.start_date;
    },
    {
      message: 'End date must be after start date',
      path: ['end_date'] // attach error to end_date field
    }
  );

export default function CourseCreatePage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
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

  async function onSubmit(course: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append('name', course.name);
    formData.append('description', course.description);
    formData.append('start_date', course.start_date);
    formData.append('end_date', course.end_date);
    formData.append('fees', String(course.fees));
    formData.append('currency', course.currency);

    if (course.image instanceof File) {
      formData.append('image', course.image);
    }
    const { error, data, status } = await createCourse(formData);
    if (!error) {
      toast.success('Course Created Successfully 🎉');
      form.reset();
      router.push('/dashboard/courses');
    } else {
      toast.error('Course Created Fail 😢');
    }
  }

  return (
    <DashboardLayout>
      <div className="h-full w-full flex gap-5">
        <LinkBackButton href="/dashboard/courses" />
        <div className="h-full w-full">
          <Card className={'h-full w-1/2 p-5 sm:overflow-auto'}>
            <div className="mb-5">
              <h1 className="text-gray-700 dark:text-zinc-200 font-bold text-lg">
                Create Course
              </h1>
            </div>

            <form
              id="subject-create-form"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FieldGroup>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="text-gray-600 dark:text-zinc-200"
                        htmlFor="name"
                      >
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
                      <FieldLabel
                        className="text-gray-600 dark:text-zinc-200"
                        htmlFor="description"
                      >
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
                  name="start_date"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="text-gray-600 dark:text-zinc-200"
                        htmlFor="start_date"
                      >
                        Start Date
                      </FieldLabel>
                      <Input
                        {...field}
                        id="start_date"
                        type="date"
                        placeholder="Select start date"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="end_date"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="text-gray-600 dark:text-zinc-200"
                        htmlFor="end_date"
                      >
                        End Date
                      </FieldLabel>
                      <Input
                        {...field}
                        id="end_date"
                        type="date"
                        placeholder="Select end date"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="fees"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="text-gray-600 dark:text-zinc-200"
                        htmlFor="fees"
                      >
                        Fees
                      </FieldLabel>
                      <Input
                        {...field}
                        type="number"
                        id="fees"
                        placeholder="Enter Fees"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="currency"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="text-gray-600 dark:text-zinc-200"
                        htmlFor="currency"
                      >
                        Currency
                      </FieldLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>

                        <SelectContent className="text-gray-600">
                          <SelectItem value="THB">THB</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                        </SelectContent>
                      </Select>

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
                      <FieldLabel
                        className="text-gray-600 dark:text-zinc-200"
                        htmlFor="image"
                      >
                        Image Upload
                      </FieldLabel>
                      <ImageUploadInput
                        value={field.value}
                        onChange={field.onChange}
                      />

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
                  form="subject-create-form"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting && <Spinner />}
                  Create
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
