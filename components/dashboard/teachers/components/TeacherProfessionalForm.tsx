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

export function TeacherProfessionalForm({ errors }: any) {
  const { register, control, trigger } = useFormContext();
    const department_id = useController({
      name: 'department_id',
      control,
      rules: { required: 'Department is required' }
    });
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-2">
      <Label className="text-gray-600 dark:text-zinc-200" htmlFor="department_id">
        Department
      </Label>

      <Select 
      value={department_id.field.value || ""}
          onValueChange={department_id.field.onChange}
      >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Department" className="text-gray-600 dark:text-zinc-300" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem className="text-gray-800 dark:text-zinc-200" value="1">
                  English
                </SelectItem>
                <SelectItem className="text-gray-800 dark:text-zinc-200" value="2">
                  Maths
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

      {errors.department_id && (
        <p className="text-red-500 text-xs">{String(errors.department_id.message)}</p>
      )}
    </div>
      <div className="grid gap-2">
        <Label className="text-gray-600 dark:text-zinc-200" htmlFor="specialization">
          Specialization
        </Label>
        <Input
          id="specialization"
          {...register('specialization', {
            required: 'Specialization is required!',
            minLength: {
              value: 5,
              message: 'Specialization must be at least 5 characters!'
            }
          })}
        />
        {errors.specialization && (
          <p className="text-red-500 text-xs">{String(errors.specialization.message)}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label className="text-gray-600 dark:text-zinc-200" htmlFor="experience_years">
          Experience Years
        </Label>
        <Input
            type="number"
          id="experience_years"
          {...register('experience_years', {
            required: 'Experience Years is required!',
            minLength: {
              value: 1,
              message: 'Experience Years must be at least 1 numeric!'
            }
          })}
        />
        {errors.experience_years && (
          <p className="text-red-500 text-xs">
            {String(errors.experience_years.message)}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <Label
          className="text-gray-600 dark:text-zinc-200"
          htmlFor="salary_per_hour"
        >
          Salary Per Hour
        </Label>
        <Input
          id="salary_per_hour"
          type="number"
          {...register('salary_per_hour', {
            required: 'Salary Per Hour is required!',
            minLength: {
              value: 1,
              message: 'Salary Per Hour must be at least 1 numeric!'
            }
          })}
        />
        {errors.salary_per_hour && (
          <p className="text-red-500 text-xs">
            {String(errors.salary_per_hour.message)}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label className="text-gray-600" htmlFor="start_date">
          Start Date
        </Label>
        <Input id="start_date" type="date" 
        {...register('start_date', {
        
            required: 'Start Date is required!',
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
        <Input id="end_date" type="date" 
        {...register('end_date', {
            required: false,
          })}
        />
      </div>
    </div>
  );
}
