import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea"
export function TeacherProfileForm({ errors }: any) {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-2">
        <Label className="text-gray-600 dark:text-zinc-200" htmlFor="bio">
          Bio
        </Label>
        <Textarea id="bio" rows={10}
          {...register('bio', {
            required: false,
            minLength: {
              value: 5,
              message: 'Bio must be at least 5 characters!'
            }
          })} />
        {errors.bio && (
          <p className="text-red-500 text-xs">{String(errors.bio.message)}</p>
        )}
      </div>
     
    </div>
  );
}
