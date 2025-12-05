/*eslint-disable*/
'use client';

import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ImageUploadInput } from '@/components/uploads/ImageUploadInput';

type CourseType = {
  name: string;
  start_date: string;
  end_date: string;
  description?: string;
  fees: string;
  currency: string;
  status: string;
  teacher_id?: string;
  is_publish?: boolean;
  photo_url?: string;
  duration?: string;
};

type SubjectType = {
  name: string;
  description: string;
  is_publish?: boolean;
  photo_url?: string;
};

export default function SubjectsCreatePage() {
  const router = useRouter();
  const methods = useForm<SubjectType>();
  const {
    handleSubmit,
    reset,
    watch,
    trigger,
    register,
    formState: { errors, isSubmitting }
  } = methods;

  const formData = watch();

  const handleCreate = async (course) => {
    // const { error, data } = await InsertCourse(course);
    // if (!error) {
    //   toast.success('Course created successfully 🎉');
    //   reset();
    //   router.refresh();
    //   router.push('/dashboard/courses');
    // } else {
    //   console.log(error);
    //   toast.error('Something went wrong 😢');
    // }
  };

  return (
    <DashboardLayout
      title="Subscription Page"
      description="Manage your subscriptions"
    >
      <Toaster position="top-right" />
      <div className="h-full w-full">
        <div className="h-full w-full rounded-lg ">
          <Card className={'h-full w-1/2 p-5 sm:overflow-auto'}>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(handleCreate)}>
                <div className="mb-7">
                  <h1 className="text-gray-700 dark:text-zinc-200 font-bold text-lg">
                    Create New Subject
                  </h1>
                </div>

                <div className="flex flex-col gap-5 mb-7">
                  <div className="grid gap-2">
                    <Label
                      className="text-gray-600 dark:text-zinc-200"
                      htmlFor="email"
                    >
                      Name
                    </Label>
                    <Input
                      id="name"
                      {...register('name', {
                        required: 'Name is required!',
                        minLength: {
                          value: 3,
                          message: 'Name must be at least 3 characters!'
                        }
                      })}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs">
                        {String(errors.name.message)}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label
                      className="text-gray-600 dark:text-zinc-200"
                      htmlFor="email"
                    >
                      Description
                    </Label>
                    <Input
                      id="description"
                      {...register('description', {
                        required: 'Description is required!',
                        minLength: {
                          value: 10,
                          message: 'Description must be at least 10 characters!'
                        }
                      })}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-xs">
                        {String(errors.description.message)}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label
                      className="text-gray-600 dark:text-zinc-200"
                      htmlFor="email"
                    >
                      Upload Image
                    </Label>
                    <ImageUploadInput onChange={() => console.log('changed')} />
                    {errors.description && (
                      <p className="text-red-500 text-xs">
                        {String(errors.description.message)}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Button
                  >
                    Create
                  </Button>
                </div>
              </form>
            </FormProvider>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
