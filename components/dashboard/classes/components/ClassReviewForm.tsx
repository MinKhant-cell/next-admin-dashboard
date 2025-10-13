import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Separator from '@/components/auth-ui/Separator';

export function ClassReviewForm({ data }: any) {
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
        Review Your Information
      </h4>

      {/* === Personal Information === */}
      <section className="p-4">
        <h4 className="font-semibold text-gray-700 dark:text-zinc-200 mb-3">
          Class Information
        </h4>
        {renderRow('Name', data.name)}
        {/* {renderRow('Email', data.email)}
        {renderRow('Personal Email', data.personal_email)} */}
        {renderRow('Teacher', data.phone_number)}
        {renderRow('Start Date', data.start_date)}
        {renderRow('End Date', data.end_date)}
        {renderRow('Fees', data.fees +' '+data.currency)}
        {renderRow('Description', data.father_name)}
      </section>

      <Separator />

      {/* === Profile & Media === */}
      <section className="p-4">
        <h4 className="font-semibold text-gray-700 dark:text-zinc-200 mb-3">
          Media
        </h4>
        {renderRow('Photo URL', data.photo_url)}
      </section>
      <Separator />

      {/* === Settings & Access === */}
      <section className="p-4">
        <h4 className="font-semibold text-gray-700 dark:text-zinc-200 mb-3">
          Settings & Access
        </h4>
        {renderRow('Status', data.status)}
        {renderRow('Is Published', data.is_publish ? 'Yes' : 'No')}
      </section>
    </div>
  );
}
