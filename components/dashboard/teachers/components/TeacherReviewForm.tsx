import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Separator from '@/components/auth-ui/Separator';

export function TeacherReviewForm({ data }: any) {
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
          Personal Information
        </h4>
        {renderRow('Name', data.name)}
        {renderRow('Email', data.email)}
        {renderRow('Personal Email', data.personal_email)}
        {renderRow('Phone Number', data.phone_number)}
        {renderRow('Date of Birth', data.date_of_birth)}
        {renderRow('Gender', data.gender)}
        {renderRow('Address', data.address)}
        {renderRow('Country', data.country)}
      </section>

      <Separator />

      {/* === Professional Details === */}
      <section className="p-4">
        <h4 className="font-semibold text-gray-700 dark:text-zinc-200 mb-3">
          Professional Details
        </h4>
        {renderRow('Department', data.department_id)}
        {renderRow('Specialization', data.specialization)}
        {renderRow('Experience (Years)', data.experience_years)}
        {renderRow('Employee Code', data.employee_code)}
        {renderRow('Employee Type', data.employee_type)}
        {renderRow('Status', data.status)}
        {renderRow('Salary', data.salary_per_hour || data.salary)}
        {renderRow('Start Date', data.start_date)}
        {renderRow('End Date', data.end_date || 'N/A')}
      </section>

      <Separator />

      {/* === Profile & Media === */}
      <section className="p-4">
        <h5 className="font-semibold text-gray-700 dark:text-zinc-200 mb-3">
          Profile & Media
        </h5>
        {renderRow('Photo URL', data.photo_url)}
        <div className="mt-2">
          <p className="font-medium text-gray-700 dark:text-zinc-300">Bio</p>
          <p className="text-gray-600 dark:text-zinc-400 whitespace-pre-wrap border-t border-gray-200 dark:border-zinc-700 pt-2">
            {data.bio || '-'}
          </p>
        </div>
      </section>

      <Separator />

      {/* === Settings & Access === */}
      <section className="p-4">
        <h4 className="font-semibold text-gray-700 dark:text-zinc-200 mb-3">
          Settings & Access
        </h4>
        {renderRow('Is Published', data.is_publish ? 'Yes' : 'No')}
        {renderRow('Linked User ID', data.user_id)}
      </section>
    </div>
  );
}
