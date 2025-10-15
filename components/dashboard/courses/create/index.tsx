/*eslint-disable*/
'use client';

import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
import { InsertCourse } from '../hooks/useCourses';
import { CourseInformationForm } from '../components/CourseInformationForm';
import { CourseReviewForm } from '../components/CourseReviewForm';
import { CourseSettingsForm } from '../components/CourseSettingsForm';
import { User } from '@supabase/supabase-js';

interface Props {
  user: User | null | undefined;
  userDetails: { [x: string]: any } | null | any;
  teachers: null | any;
}

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

export default function Page(props: Props) {
  const { user, userDetails, teachers } = props;
  const router = useRouter();
  const methods = useForm<CourseType>();
  const {
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors, isSubmitting }
  } = methods;

  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const formData = watch();

  function getStepFields(step: number): (keyof CourseType)[] {
    switch (step) {
      case 1:
        return ['name','teacher_id','start_date','end_date','fees'];
      case 2:
        return ['status'];
      default:
        return [];
    }
  }

  const nextStep = async () => {
    const valid = await trigger(getStepFields(step));
    if (valid) setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleCreate = async (course: CourseType) => {
    const { error, data } = await InsertCourse(course);
    if (!error) {
      toast.success('Course created successfully 🎉');
      reset();
      router.refresh();
      router.push('/dashboard/courses');
    } else {
      console.log(error);
      toast.error('Something went wrong 😢');
    }
  };

  return (
    <DashboardLayout
      user={user}
      userDetails={userDetails}
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
                    Create Course
                  </h1>
                  <div className="text-sm font-medium text-gray-600 mb-1">
                    Step {step} of {totalSteps}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(step / totalSteps) * 100}%` }}
                    />
                  </div>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step === 1 && (
                      <CourseInformationForm
                        teachers={teachers}
                        errors={errors}
                      />
                    )}
                    {step === 2 && <CourseSettingsForm errors={errors} />}
                    {step === 3 && <CourseReviewForm data={formData} />}
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-between pt-4">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                  )}
                  {step < totalSteps && (
                    <Button type="button" onClick={nextStep}>
                      Next
                    </Button>
                  )}
                  {step === totalSteps && (
                    <Button type="submit" className="bg-green-600 text-white">
                      Submit
                    </Button>
                  )}
                </div>
              </form>
            </FormProvider>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
