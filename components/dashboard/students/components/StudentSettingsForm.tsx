import { Controller, useController, useForm, useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
export function StudentSettingsForm({ errors }: any) {
 const { register, control, trigger } = useFormContext();
    const grade = useController({
      name: 'grade',
      control,
      rules: { required: 'Grade is required' }
    });
    const class_id = useController({
      name: 'class_id',
      control,
      rules: { required: 'Class is required' }
    });
    const status = useController({
      name: 'status',
      control,
      rules: { required: 'Status is required' }
    });
  
    const valid_classes = [
      {id: 1, name: 'Starter Formation'},
      {id: 2, name: 'Starter'},
    ]

    const grades = Array.from({ length: 10 }, (_, i) => (i + 1).toString());
// is_user, status, employee type
  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-2">
        <Label className="text-gray-600" htmlFor="grade">
          Grade
        </Label>
        <Select onValueChange={grade.field.onChange} value={grade.field.value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Grade" className="text-gray-600 dark:text-zinc-300" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {grades.map((g) => (
        <SelectItem
          key={g}
          className="text-gray-800 dark:text-zinc-200"
          value={'Grade '+g}
        >
          Grade {g}
        </SelectItem>
      ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        {errors.grade && (
          <p className="text-red-500 text-xs">
            {String(errors.grade.message)}
          </p>
        )}
      </div>
<div className="grid gap-2">
      <Label className="text-gray-600 dark:text-zinc-200" htmlFor="class_id">
        Class
      </Label>
      <Select onValueChange={class_id.field.onChange} value={class_id.field.value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Class" className="text-gray-600 dark:text-zinc-300" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
          {valid_classes.map((g) => (
        <SelectItem
          key={g.id}
          className="text-gray-800 dark:text-zinc-200"
          value={ String(g.id)}
        >
          {g.name}
        </SelectItem>
      ))}
              </SelectGroup>
            </SelectContent>
          </Select>
      {errors.class_id && (
        <p className="text-red-500 text-xs">{String(errors.class_id.message)}</p>
      )}
    </div>
    <div className="grid gap-2">
      <Label className="text-gray-600 dark:text-zinc-200" htmlFor="status">
        Status
      </Label>
      <Select onValueChange={status.field.onChange} value={status.field.value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Status" className="text-gray-600 dark:text-zinc-300" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
          <SelectItem className="text-gray-800 dark:text-zinc-200" value="active">Active</SelectItem>
          <SelectItem className="text-gray-800 dark:text-zinc-200" value="inactive">Inactive</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
      {errors.status && (
        <p className="text-red-500 text-xs">{String(errors.status.message)}</p>
      )}
    </div>


    
        <div className="grid gap-2">
         <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50 dark:has-[[aria-checked=true]]:border-green-900 dark:has-[[aria-checked=true]]:bg-green-950">
        <Checkbox
          id="toggle-2"
          className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
        />
        <div className="grid gap-1.5 font-normal">
          <p className="text-sm leading-none font-medium text-gray-800 dark:text-zinc-200">
            Enable User Access
          </p>
          <p className="text-muted-foreground text-xs text-gray-800 dark:text-zinc-200">
            You can enable or disable user access at any time.
          </p>
        </div>
      </Label>
        {errors.bio && (
          <p className="text-red-500 text-xs">{String(errors.bio.message)}</p>
        )}
      </div>
      <div className="grid gap-2">
         <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50 dark:has-[[aria-checked=true]]:border-green-900 dark:has-[[aria-checked=true]]:bg-green-950">
        <Checkbox
          id="toggle-2"
          className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
        />
        <div className="grid gap-1.5 font-normal">
          <p className="text-sm leading-none font-medium text-gray-800 dark:text-zinc-200">
            Enable Publish
          </p>
          <p className="text-muted-foreground text-xs text-gray-800 dark:text-zinc-200">
            You can enable or disable publish at any time.
          </p>
        </div>
      </Label>
        {errors.bio && (
          <p className="text-red-500 text-xs">{String(errors.bio.message)}</p>
        )}
      </div>
     
    </div>
  );
}
