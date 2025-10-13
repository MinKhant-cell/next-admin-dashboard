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
export function ClassSettingsForm({ errors }: any) {
 const { register, control, trigger } = useFormContext();
   
    
    const status = useController({
      name: 'status',
      control,
      rules: { required: 'Status is required' }
    });
  
    

    const grades = Array.from({ length: 10 }, (_, i) => (i + 1).toString());
// is_user, status, employee type
  return (
    <div className="flex flex-col gap-5 min-h-auto">
      
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
          <SelectItem className="text-gray-800 dark:text-zinc-200" value="Upcoming">Upcoming</SelectItem>
          <SelectItem className="text-gray-800 dark:text-zinc-200" value="Ongoing">Ongoing</SelectItem>
          <SelectItem className="text-gray-800 dark:text-zinc-200" value="Canceled">Canceled</SelectItem>
          <SelectItem className="text-gray-800 dark:text-zinc-200" value="Paused">Paused</SelectItem>
          <SelectItem className="text-gray-800 dark:text-zinc-200" value="Completed">Completed</SelectItem>
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
