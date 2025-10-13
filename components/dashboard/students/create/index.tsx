/*eslint-disable*/
'use client';

import MainChart from '@/components/dashboard/main/cards/MainChart';
import TeacherTable from '@/components/dashboard/teachers/components/TeacherTable';
import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import tableDataUserReports from '@/variables/tableDataUserReports';
import { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { LuCircleFadingPlus, LuChevronLeft } from 'react-icons/lu';
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { InsertStudent } from '../hooks/useStudent';
import { StudentPersonalForm } from '../components/StudentPersonalForm';
import { StudentProfileForm } from '../components/StudentProfileForm';
import { StudentReviewForm } from '../components/StudentReviewForm';
import { StudentSettingsForm  } from '../components/StudentSettingsForm';


interface Props {
  user: User | null | undefined;
  userDetails: { [x: string]: any } | null | any;
}

type StudentFormValues = {
  name: string;
  email?: string;
  personal_email?: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  country: string;
  start_date?: string;
  end_date?: string;
  photo_url?: string;
  bio?: string;
  status: string;
};

export default function Page(props: Props) {
  const { user, userDetails } = props;
  const router = useRouter();
  const methods = useForm<StudentFormValues>({
    defaultValues: {
      name: '',
      end_date: null,
      phone_number: '',
      date_of_birth: '',
    }
  });
  const {
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors, isSubmitting }
  } = methods;

  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const formData = watch();

 

  function getStepFields(step: number) {
    switch (step) {
      case 1:
        return ['name','date_of_birth','country','phone_number','gender'];
      case 2:
        return ['start_date'];
      case 3:
        return ['bio'];
        case 4:
        return ['status','grade','class_id'];
      default:
        return [];
    }
  }

  const nextStep = async () => {
    const valid = await trigger(getStepFields(step));
    console.log(valid)
    if (valid) setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleCreate = async (student: StudentFormValues) => {
    console.log(student)
    const {error, data, status} = await InsertStudent(student);

    if(!error){
      toast.success("Student created successfully 🎉");
      reset()
      router.refresh();
      router.push('/dashboard/students')
    }else {
      console.log(error);
      toast.error("Something went wrong 😢");
    }
    
  };

  return (
    <DashboardLayout
      user={user}
      userDetails={userDetails}
      title="Subscription Page"
      description="Manage your subscriptions"
    >
      <Link href={'/dashboard/students'}>
        <Button variant="outline" size="sm">
          <LuChevronLeft />
        </Button>
      </Link>
      <Toaster position="top-right"/>
      <div className="h-full w-full">
        <div className="h-full w-full rounded-lg ">
          <Card className={'h-full w-1/2 p-5 sm:overflow-auto'}>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(handleCreate)}>
                <div className="mb-7">
                  <h1 className="text-gray-700 dark:text-zinc-200 font-bold text-lg">
                    Create Student
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
                    {step === 1 && <StudentPersonalForm errors={errors} />}
                    {step === 2 && <StudentProfileForm errors={errors} />}
                    {step === 3 && <StudentSettingsForm errors={errors} />}
                    {step === 4 && <StudentReviewForm data={formData} />}
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
