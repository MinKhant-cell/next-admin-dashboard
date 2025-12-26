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
import {
  InputGroup,
  InputGroupTextarea
} from '@/components/ui/input-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ReusableCreateCard } from '@/components/ui-components/ReusableCreateCard';
import { createCourse } from '@/hooks/useCourses';

const formSchema = z
  .object({
    name: z.string().min(5).max(32),
    description: z.string().optional().or(z.literal("")),
    start_date: z.string(),
    end_date: z.string(),
    fees: z.coerce.number().min(2).max(1000000).optional(),
    currency: z.enum(['THB', 'USD']).optional(),
    image: z.instanceof(File).nullable().optional()
  })
  .refine(
    (data) => {
      if (!data.start_date || !data.end_date) return true;
      return data.end_date >= data.start_date;
    },
    {
      message: 'End date must be after start date',
      path: ['end_date']
    }
  );

export default function CourseCreatePage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      fees: 0,
      currency: 'THB',
      image: null
    }
  });
  
  async function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description || '');
    formData.append('start_date', data.start_date);
    formData.append('end_date', data.end_date);
    formData.append('fees', String(data.fees));
    formData.append('currency', data.currency || 'THB');
    
    if (data.image instanceof File) {
      formData.append('image', data.image);
    }
    
    console.log('📤 Creating course with FormData');
    
    try {
      
      const response = await createCourse(formData);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Create error:', errorData);
        toast.error(errorData.message || 'Course creation failed');
        return;
      }
      
      const result = await response.json();
      console.log('✅ Create success:', result);
      toast.success('Course Created Successfully 🎉');
      form.reset();
      router.push('/dashboard/courses');
      
    } catch (error) {
      console.error('❌ Create error:', error);
      toast.error('Course Creation Failed 😢');
    }
  }
  
  
  return (
    <DashboardLayout>
      <Toaster position="top-right" />
      <div className="w-full">
        <ReusableCreateCard
          title="Course"
          backHref="/dashboard/courses"
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
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="start_date"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-gray-600 dark:text-zinc-200" htmlFor="start_date">
                      Start Date
                    </FieldLabel>
                    <Input
                      {...field}
                      id="start_date"
                      type="date"
                      placeholder="Select start date"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="end_date"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-gray-600 dark:text-zinc-200" htmlFor="end_date">
                      End Date
                    </FieldLabel>
                    <Input
                      {...field}
                      id="end_date"
                      type="date"
                      placeholder="Select end date"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="fees"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-gray-600 dark:text-zinc-200" htmlFor="fees">
                      Fees
                    </FieldLabel>
                    <Input
                      {...field}
                      type="number"
                      id="fees"
                      placeholder="Enter Fees"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="currency"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-gray-600 dark:text-zinc-200" htmlFor="currency">
                      Currency
                    </FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="THB">THB</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <FieldLabel className="text-gray-600 dark:text-zinc-200" htmlFor="image">
                      Image Upload
                    </FieldLabel>
                    <ImageUploadInput
                      value={field.value}
                      onChange={field.onChange}
                    />
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
                disabled={form.formState.isSubmitting}
              >
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
