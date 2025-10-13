import {
  Controller,
  useController,
  useForm,
  useFormContext
} from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export function StudentPersonalForm({ errors }: any) {
  const { register, control, trigger } = useFormContext();
  const gender = useController({
    name: 'gender',
    control,
    rules: { required: 'Gender is required' }
  });
  const country = useController({
    name: 'country',
    control,
    rules: { required: 'Country is required' }
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
        <Label
          className="text-gray-600 dark:text-zinc-200"
          htmlFor="phone_number"
        >
          Phone Number
        </Label>
        <Input
          id="phone_number"
          {...register('phone_number', {
            required: 'Phone Number is required!',
            minLength: {
              value: 6,
              message: 'Phone Number must be at least 6 number!'
            }
          })}
        />
        {errors.phone_number && (
          <p className="text-red-500 text-xs">
            {String(errors.phone_number.message)}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label className="text-gray-600" htmlFor="date_of_birth">
          Date of Birth
        </Label>
        <Input
          id="date_of_birth"
          type="date"
          {...register('date_of_birth', {
            required: 'Date of Birth is required!'
          })}
        />
        {errors.date_of_birth && (
          <p className="text-red-500 text-xs">
            {String(errors.date_of_birth.message)}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <Label className="text-gray-600" htmlFor="date_of_birth">
          Gender
        </Label>
        <RadioGroup value={gender.field.value || ''} onValueChange={(val) => {
          gender.field.onChange(val);
          trigger("gender"); // optional, force re-validation when changed
        }}>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male" className="text-gray-600">
              Male
            </Label>
          </div>

          <div className="flex items-center gap-3">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female" className="text-gray-600">
              Female
            </Label>
          </div>
        </RadioGroup>
        {gender.fieldState.error && (
          <p className="text-red-500 text-xs">
            {String(gender.fieldState.error.message)}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <Label className="text-gray-600 dark:text-zinc-200" htmlFor="country">
          Country
        </Label>

        <Select
          value={country.field.value || ""}
          onValueChange={country.field.onChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a Country" className="text-gray-600 dark:text-zinc-300" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem className="text-gray-800 dark:text-zinc-200" value="myanmar">Myanmar</SelectItem>
              <SelectItem className="text-gray-800 dark:text-zinc-200" value="thailand">Thailand</SelectItem>
              <SelectItem className="text-gray-800 dark:text-zinc-200" value="singapore">Singapore</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.country && (
          <p className="text-red-500 text-xs">
            {String(errors.country.message)}
          </p>
        )}
      </div>
      <div className="grid gap-2">
        <Label className="text-gray-600" htmlFor="father_name">
          Father Name
        </Label>
        <Input
          id="father_name"
          {...register('father_name', {
            required: false
          })}
        />
        {errors.father_name && (
          <p className="text-red-500 text-xs">
            {String(errors.father_name.message)}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label className="text-gray-600" htmlFor="mother_name">
          Mother Name
        </Label>
        <Input
          id="mother_name"
          {...register('mother_name', {
            required: false
          })}
        />
        {errors.mother_name && (
          <p className="text-red-500 text-xs">
            {String(errors.mother_name.message)}
          </p>
        )}
      </div>
    </div>
  );
}
