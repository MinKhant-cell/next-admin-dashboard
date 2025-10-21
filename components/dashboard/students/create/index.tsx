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
import { StudentInformationForm } from '../components/StudentInformationForm';
import { StudentReviewForm } from '../components/StudentReviewForm';
import { CourseSettingsForm } from '../components/StudentSettingsForm';
import { User } from '@supabase/supabase-js';
import { useTeachers } from '@/hooks/useTeachers';
import Link from 'next/link';
import { LuArrowLeft } from 'react-icons/lu';
import { creatStudent } from '@/hooks/useStudents';
interface Props {
  user: User | null | undefined;
  userDetails: { [x: string]: any } | null | any;
}

type StudentType = {
  name: string;
  email: string;
  gender: string;
  date_of_birth: string;
  country: string;
};

export default function StudentCreatePage(props: Props) {
  const { user, userDetails } = props;
  const router = useRouter();
  const methods = useForm<StudentType>();
  const {
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors, isSubmitting }
  } = methods;

  const [step, setStep] = useState(1);
  const totalSteps = 2;
  const formData = watch();

  function getStepFields(step: number): (keyof StudentType)[] {
    switch (step) {
      case 1:
        return ['name', 'date_of_birth', 'email', 'gender'];
      default:
        return [];
    }
  }

  const nextStep = async () => {
    const valid = await trigger(getStepFields(step));
    if (valid) setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleCreate = async (student: StudentType) => {
    const { error, data, status, message } = await creatStudent(student);
    if (!error && !isSubmitting) {
      toast.success(message);
      reset();
      router.refresh();
      router.push('/dashboard/students');
    } else {
      console.log(error);
      toast.error(message);
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
        <div className="h-full w-full rounded-lg flex gap-5">
          <div>
            <Link href={'/dashboard/students'}>
              <Button
                className="hover:dark:bg-gray-800 hover:dark:text-white"
                variant="outline"
                size="sm"
              >
                <LuArrowLeft />
              </Button>
            </Link>
          </div>
          <Card className={'h-full w-1/2 p-5 sm:overflow-auto'}>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(handleCreate)}>
                <div className="mb-7">
                  <h1 className="text-gray-700 dark:text-zinc-200 font-bold text-lg">
                    Create New Student
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
                    {step === 1 && <StudentInformationForm errors={errors} />}
                    {step === 2 && <StudentReviewForm data={formData} />}
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-between pt-4">
                  {step > 1 && (
                    <Button
                      size="sm"
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                    >
                      Back
                    </Button>
                  )}
                  {step < totalSteps && (
                    <Button size="sm" type="button" onClick={nextStep}>
                      Next
                    </Button>
                  )}
                  {step === totalSteps && (
                    <Button
                      size="sm"
                      type="submit"
                      className="bg-green-600 text-white"
                    >
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
