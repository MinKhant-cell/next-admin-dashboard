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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field';
import { ReusableCreateCard } from '@/components/ui-components/ReusableCreateCard';
import { createTeacher } from '@/hooks/useTeachers';

const formSchema = z.object({
  name: z.string().min(5, "Name must be at least 5 characters.").max(32, "Name must be at most 32 characters."),
  description: z.string().min(10, "Description must be at least 10 characters.").max(100, "Description must be at most 100 characters.").optional(),
  email: z.string().email("Invalid email address."),
  phone: z.string().regex(/^[0-9]{10,15}$/, "Phone must be 10–15 digits."),
  image: z.instanceof(File).nullable().optional()
});

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

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
  
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }
    
    console.log('📤 Creating teacher with FormData');
  
    try {
      const response = await createTeacher(formData);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Create error:', errorData);
        toast.error(errorData.message || 'Teacher creation failed');
        return;
      }
      
      const result = await response.json();
      console.log('✅ Create success:', result);
      toast.success("Teacher Created Successfully 🎉");
      form.reset();
      router.push('/dashboard/teachers');
      
    } catch (error) {
      console.error('❌ Create error:', error);
      toast.error("Teacher Creation Failed 😢");
    }
  }
  

  return (
    <DashboardLayout>
      <Toaster position="top-right" />
      <div className="w-full">
        <ReusableCreateCard
          title="Teacher"
          backHref="/dashboard/teachers"
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
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-gray-600 dark:text-zinc-200" htmlFor="email">
                      Email
                    </FieldLabel>
                    <Input {...field} id="email" placeholder="Enter Email" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-gray-600 dark:text-zinc-200" htmlFor="phone">
                      Phone
                    </FieldLabel>
                    <Input {...field} id="phone" placeholder="Enter Phone" />
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
