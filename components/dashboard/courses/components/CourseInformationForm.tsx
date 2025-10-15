import { useController, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export function CourseInformationForm({ errors, teachers }: any) {
  const { register, control, trigger } = useFormContext();
  const teacher_id = useController({
    name: 'teacher_id',
    control,
    rules: { required: 'Teacher is required' }
  });
  const currency = useController({
    name: 'currency',
    control,
    rules: { required: 'Currency is required' }
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-2">
        <Label className="text-gray-600 dark:text-zinc-200" htmlFor="email">
          Name
        </Label>
        <Input
          id="name"
          {...register('name', {
            required: 'Name is required!',
            minLength: {
              value: 1,
              message: 'Name must be at least 1 characters!'
            }
          })}
        />
        {errors.name && (
          <p className="text-red-500 text-xs">{String(errors.name.message)}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label className="text-gray-600" htmlFor="teacher_id">
          Assign Teacher
        </Label>
        <Select
          onValueChange={teacher_id.field.onChange}
          value={teacher_id.field.value}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder="Select a Teacher"
              className="text-gray-600 dark:text-zinc-300"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {teachers.map((teacher) => (
                <SelectItem
                  key={teacher.id}
                  className="text-gray-800 dark:text-zinc-200"
                  value={String(teacher.id)}
                >
                  {teacher.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.teacher_id && (
          <p className="text-red-500 text-xs">
            {String(errors.teacher_id.message)}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label className="text-gray-600" htmlFor="start_date">
          Start Date
        </Label>
        <Input
          id="start_date"
          type="date"
          {...register('start_date', {
            required: 'Start Date is required!'
          })}
        />
        {errors.start_date && (
          <p className="text-red-500 text-xs">
            {String(errors.start_date.message)}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label className="text-gray-600" htmlFor="date_of_birth">
          End Date
        </Label>
        <Input
          id="end_date"
          type="date"
          {...register('end_date', {
            required: false
          })}
        />
      </div>

      <div className="grid gap-2">
        <Label className="text-gray-600" htmlFor="fees">
          Fees
        </Label>
        <Input
          id="fees"
          type="number"
          {...register('fees', {
            required: false
          })}
        />
        {errors.fees && (
          <p className="text-red-500 text-xs">{String(errors.fees.message)}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label className="text-gray-600" htmlFor="currency">
          Currency
        </Label>
        <Select
          onValueChange={currency.field.onChange}
          value={currency.field.value}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder="Select a Teacher"
              className="text-gray-600 dark:text-zinc-300"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                className="text-gray-800 dark:text-zinc-200"
                value="MMK"
              >
                MMK
              </SelectItem>
              <SelectItem
                className="text-gray-800 dark:text-zinc-200"
                value="THB"
              >
                THB
              </SelectItem>
              <SelectItem
                className="text-gray-800 dark:text-zinc-200"
                value="USD"
              >
                USD
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.currency && (
          <p className="text-red-500 text-xs">
            {String(errors.currency.message)}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label
          className="text-gray-600 dark:text-zinc-200"
          htmlFor="description"
        >
          Description
        </Label>
        <Textarea
          id="description"
          rows={7}
          {...register('description', {
            required: false,
            minLength: {
              value: 5,
              message: 'Description must be at least 5 characters!'
            }
          })}
        />
        {errors.description && (
          <p className="text-red-500 text-xs">
            {String(errors.description.message)}
          </p>
        )}
      </div>
    </div>
  );
}
