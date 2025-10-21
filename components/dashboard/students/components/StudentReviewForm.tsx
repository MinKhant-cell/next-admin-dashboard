import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Separator from '@/components/auth-ui/Separator';

export function StudentReviewForm({ data }: any) {
  const { register } = useFormContext();
const renderRow = (label: string, value: any) => (
    <div className="grid grid-flow-col grid-cols-4 mb-1 text-xs">
      <span className=" col-span-2 text-gray-600 dark:text-zinc-300">{label}</span>
      <span className="col-span-2 text-gray-800 dark:text-zinc-400">{value || '-'}</span>
    </div>
  );
  return (
   <div className="">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-zinc-100">
        Student Information
      </h4>

      {/* === Personal Information === */}
      <p className='text-green-500'>
{
        JSON.stringify(data)
      }
      </p>
      
      <section className="p-4">
        {renderRow('Name', data.name)}
        {renderRow('Email', data.email)}
        {renderRow('Phone', data.phone)}
        {renderRow('Date of Birth', data.date_of_birth)}
        {renderRow('Gender', data.gender)}
        {renderRow('Country', data.country)}
      </section>
      <Separator />
    </div>
  );
}
