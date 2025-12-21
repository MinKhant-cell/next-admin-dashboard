/*eslint-disable*/
'use client';

import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea
} from '@/components/ui/input-group';
import LinkBackButton from '@/components/ui-components/LinkBackButton';
import { createClassroom } from '@/hooks/useClassrooms';

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
  grade: z
  .string()
  .min(1, "Grade must be at least 1 characters.")
  .max(100, "Grade must be at most 100 characters.")
  .optional(),
  image: z
  .instanceof(File)
  .nullable()
  .optional()
})

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
  
  async function onSubmit(subject: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("name", subject.name);
    formData.append("grade", subject.grade);
    formData.append("description", subject.description);
    
    if (subject.image instanceof File) {
      formData.append("image", subject.image);
    }
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    const {error, data, status} = await createClassroom(formData);
    if(!error){
      toast.success("Classroom Created Successfully 🎉");
      form.reset();
      router.push('/dashboard/classrooms')
    }else {
      toast.error("Classroom Created Fail 😢");
    }
  }
  
  return (
    <DashboardLayout>
    <div className="h-full w-full flex gap-5">
    <LinkBackButton href="/dashboard/classrooms" />
    <div className="h-full w-full">
    <Card className={'h-full w-1/2 p-5 sm:overflow-auto'}>
    <div className="mb-5">
    <h1 className="text-gray-700 dark:text-zinc-200 font-bold text-lg">
    Create Classroom
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
    name="grade"
    control={form.control}
    render={({ field, fieldState }) => (
      <Field data-invalid={fieldState.invalid}>
      <FieldLabel
      className="text-gray-600 dark:text-zinc-200"
      htmlFor="name"
      >
      Grade
      </FieldLabel>
      <Input
      {...field}
      id="grade"
      placeholder="Enter Grade"
      
      />
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
