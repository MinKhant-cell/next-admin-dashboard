/*eslint-disable*/
'use client';

import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import React, { useState } from 'react';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { ImageUploadInput } from '@/components/ui-components/ImageUploadInput';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Spinner } from "@/components/ui/spinner"
import { createSubject } from '@/hooks/useSubject';
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
import { ReusableCreateCard } from '@/components/ui-components/ReusableCreateCard';

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
  image: z
    .instanceof(File)
    .nullable()
    .optional()
})

export default function SubjectsCreatePage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      image: null
    }
  });

  async function onSubmit(subject: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("name", subject.name);
    formData.append("description", subject.description);
  
    if (subject.image instanceof File) {
      formData.append("image", subject.image);
    }
  
    console.log('📤 Creating subject with FormData');
  
    try {
      
      const response = await createSubject(formData);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Create error:', errorData);
        toast.error(errorData.message || 'Subject creation failed');
        return;
      }
      
      const result = await response.json();
      console.log('✅ Create success:', result);
      toast.success("Subject Created Successfully 🎉");
      form.reset();
      router.push('/dashboard/subjects');
      
    } catch (error) {
      console.error('❌ Create error:', error);
      toast.error("Subject Creation Failed 😢");
    }
  }
  

  return (
    <DashboardLayout>
      <Toaster position="top-right" />
      <div className="w-full">
        <ReusableCreateCard
          title="Subject"
          backHref="/dashboard/subjects"
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
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>
            <div className="my-5">
              <Button type="submit" disabled={form.formState.isSubmitting}>
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
