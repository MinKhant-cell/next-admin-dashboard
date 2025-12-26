/*eslint-disable*/
'use client';

import DashboardLayout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { toast, Toaster } from 'sonner';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { ImageUploadInput } from '@/components/ui-components/ImageUploadInput';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Spinner } from '@/components/ui/spinner';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupTextarea } from '@/components/ui/input-group';
import { createStudent } from '@/hooks/useStudents';
import { ReusableCreateCard } from '@/components/ui-components/ReusableCreateCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters.").max(32, "Name must be at most 32 characters."),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  gender: z.enum(["MALE", "FEMALE"], { required_error: "Gender is required" }),
  date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD format"),
  description: z.string().min(10, "Description must be at least 10 characters.").max(100, "Description must be at most 100 characters.").optional(),
  image: z.instanceof(File).nullable().optional()
});

type FormData = z.infer<typeof formSchema>;

export default function StudentCreatePage() {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      gender: "" as any, 
      date_of_birth: '',
      description: '',
      image: null
    }
  });

  async function onSubmit(data: FormData) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('gender', data.gender);
    formData.append('date_of_birth', data.date_of_birth);
    formData.append('description', data.description || '');
  
    if (data.image instanceof File) {
      formData.append('image', data.image);
    }
  
    console.log('📤 Creating student with FormData');
  
    try {
      
      const response = await createStudent(formData);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Create error:', errorData);
        toast.error(errorData.message || 'Student creation failed');
        return;
      }
      
      const result = await response.json();
      console.log('✅ Create success:', result);
      toast.success('Student Created Successfully 🎉');
      form.reset();
      router.push('/dashboard/students');
      
    } catch (error) {
      console.error('❌ Create error:', error);
      toast.error('Student Creation Failed 😢');
    }
  }
  
  return (
    <DashboardLayout>
      <Toaster position="top-right" />
      <div className="w-full">
        <ReusableCreateCard
          title="Student"
          backHref="/dashboard/students"
        >
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Name Field */}
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

              {/* Email Field */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-gray-600 dark:text-zinc-200" htmlFor="email">
                      Email
                    </FieldLabel>
                    <Input 
                      {...field} 
                      id="email" 
                      type="email"
                      placeholder="Enter Email" 
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Gender Field */}
              <Controller
                name="gender"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-gray-600 dark:text-zinc-200" htmlFor="gender">
                      Gender
                    </FieldLabel>
                    <Select 
                      onValueChange={(value) => field.onChange(value as "MALE" | "FEMALE")}
                      value={field.value || ""}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent className="text-gray-600 dark:text-zinc-200">
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Date of Birth Field */}
              <Controller
                name="date_of_birth"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-gray-600 dark:text-zinc-200" htmlFor="date_of_birth">
                      Date of Birth
                    </FieldLabel>
                    <Input 
                      {...field} 
                      id="date_of_birth" 
                      type="date"
                      placeholder="YYYY-MM-DD" 
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Description Field */}
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

              {/* Image Field */}
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
