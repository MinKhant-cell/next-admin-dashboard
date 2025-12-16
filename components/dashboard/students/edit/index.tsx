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
import { getSubjectById, updateSubject } from '@/hooks/useSubject';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field';
import { InputGroup, InputGroupTextarea } from '@/components/ui/input-group';
import LinkBackButton from '@/components/ui-components/LinkBackButton';

const formSchema = z.object({
  name: z
    .string()
    .min(5, 'Name must be at least 5 characters.')
    .max(32, 'Name must be at most 32 characters.'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters.')
    .max(100, 'Description must be at most 100 characters.')
    .optional(),
  image: z.instanceof(File).nullable().optional()
});

export default function StudentEditPage({ id }: any) {
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
    const { error, data, status } = await updateSubject(id, subject);
    if (!error) {
      toast.success('Subject Updated Successfully 🎉');
      form.reset();
      router.push('/dashboard/subjects');
    } else {
      toast.error('Something went wrong 😢');
    }
  }

  return (
    <DashboardLayout>
      <div className="h-full w-full flex gap-5">
        <LinkBackButton href="/dashboard/subjects" />

        <div className="h-full w-full rounded-lg ">
          <Card className={'h-full w-1/2 p-5 sm:overflow-auto'}>
            <div className="mb-5">
              <h1 className="text-gray-700 dark:text-zinc-200 font-bold text-lg">
                Edit Student
              </h1>
            </div>

            {isLoading && <Spinner />}

            {!isLoading && !isError && (
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
                  Update
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
