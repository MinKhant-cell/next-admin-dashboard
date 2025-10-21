/*eslint-disable*/
'use client';

import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User } from '@supabase/supabase-js';
import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
import { UpdateCourse } from '../hooks/useCourses';
import { StudentInformationForm } from '../components/StudentInformationForm';
import { StudentReviewForm } from '../components/StudentReviewForm';
import { CourseSettingsForm } from '../components/StudentSettingsForm';
import { getStudentById, updateStudent } from '@/hooks/useStudents';
import dayjs from 'dayjs';
interface Props {
  user: User | null | undefined;
  userDetails: { [x: string]: any } | null | any;
  id: string | number;
}

type StudentType = {
  name: string;
  email: string;
  gender: string;
  date_of_birth: string;
};

export default function Page(props: Props) {
  const { user, userDetails, id } = props;
  const { student, isLoading, isError } = getStudentById(id);
  const router = useRouter();

  const methods = useForm<StudentType>();
  const {
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors, isSubmitting }
  } = methods;

  useEffect(() => {
    if (student) {
      reset({
        name: student.name,
        email: student.email,
        gender: student.gender,
        date_of_birth: dayjs(student.date_of_birth).format("YYYY-MM-DD")
      });
    }
  }, [student, reset]);

  const [step, setStep] = useState(1);
  const totalSteps = 2;
  const formData = watch();

  function getStepFields(step: number): (keyof StudentType)[] {
    switch (step) {
      case 1:
        return ['name', 'email', 'gender', 'date_of_birth'];
      default:
        return [];
    }
  }

  const nextStep = async () => {
    const valid = await trigger(getStepFields(step));
    if (valid) setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleUpdate = async (student: StudentType) => {
    const res = await updateStudent(+id, student);
    console.log(res);
    // const { error, data, status, message } = await updateStudent(+id, student);
    // if (!error && !isSubmitting) {
    //   toast.success(message);
    //   reset();
    //   router.refresh();
    //   router.push('/dashboard/students');
    // } else {
    //   console.log(error);
    //   toast.error(message);
    // }
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
              <form onSubmit={handleSubmit(handleUpdate)}>
                <div className="mb-7">
                  <h1 className="text-gray-700 dark:text-zinc-200 font-bold text-lg">
                    Edit Course
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
                      Update
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
