/*eslint-disable*/
'use client';

import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import React, { useState } from 'react';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ImageUploadInput } from '@/components/ui-components/ImageUploadInput';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Spinner } from "@/components/ui/spinner"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field';

import LinkBackButton from '@/components/ui-components/LinkBackButton';
import { createTeacher } from '@/hooks/useTeachers';

const formSchema = z.object({
  name: z
    .string()
    .min(5, "Name must be at least 5 characters.")
    .max(32, "Name must be at most 32 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters.")
    .max(100, "Description must be at most 100 characters.")
    .optional(),

  email: z
    .string()
    .email("Invalid email address."),

  phone: z
    .string()
    .regex(/^[0-9]{10,15}$/, "Phone must be 10–15 digits."),

  image: z
    .instanceof(File)
    .nullable()
    .optional()
})

export default function TeacherCreatePage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      image: null
    }
  });

  async function onSubmit(subject: z.infer<typeof formSchema>) {
      const formData = new FormData();
      formData.append("name", subject.name);
      formData.append("email", subject.email);
      formData.append("phone", subject.phone);

      if (subject.image instanceof File) {
        formData.append("image", subject.image);
      }
    const {error, data, status} = await createTeacher(formData);
        if(!error){
          toast.success("Teacher Created Successfully 🎉");
          form.reset();
          router.push('/dashboard/teachers');
        }else {
          toast.error("Teacher Created Failed 😢");
        }
  }

  return (
    <DashboardLayout
      title="Subscription Page"
      description="Manage your subscriptions"
    >
      <div className="h-full w-full flex gap-5">
        <LinkBackButton href="/dashboard/teachers" />
        <div className="h-full w-full">
          <Card className={'h-full w-1/2 p-5 sm:overflow-auto'}>
          <div className="mb-5">
<h1 className="text-gray-700 dark:text-zinc-200 font-bold text-lg">
            Create Teacher
          </h1>
          </div>
          
            <form id="subject-create-form" onSubmit={form.handleSubmit(onSubmit)}>
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
                      <Input
                        {...field}
                        id="name"
                        placeholder="Enter Name"

                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="text-gray-600 dark:text-zinc-200"
                        htmlFor="email"
                      >
                        Email
                      </FieldLabel>
                      <Input
                        {...field}
                        id="email"
                        placeholder="Enter Email"

                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="phone"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        className="text-gray-600 dark:text-zinc-200"
                        htmlFor="phone"
                      >
                        Phone
                      </FieldLabel>
                      <Input
                        {...field}
                        id="phone"
                        placeholder="Enter Phone"

                      />
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
