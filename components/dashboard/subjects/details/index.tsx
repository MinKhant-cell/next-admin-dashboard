/*eslint-disable*/
'use client';

import DashboardLayout from '@/components/layout';

import { toast, Toaster } from 'sonner';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getSubjectById } from '@/hooks/useSubject';
import LinkBackButton from '@/components/ui-components/LinkBackButton';
import { Separator } from '@/components/ui/separator';
interface Props {
  id: string | number;
}

export default function SubjectDetailsPage(props: Props) {
  const { id } = props;
  const { subject, isLoading, isError } = getSubjectById(id);
  const statusColors: Record<string, string> = {
    UPCOMING:
      'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100',
    ACTIVE:
      'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100',
    ONGOING:
      'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-100',
    FULL: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-100',
    COMPLETED:
      'bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900 dark:text-indigo-100',
    PAUSED:
      'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100',
    INACTIVE:
      'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100'
  };

  const renderRow = (label: string, value: any) => (
    <div className="grid grid-flow-col grid-cols-4 mb-3 text-xs">
      <span className=" col-span-2 text-gray-600 dark:text-zinc-400">
        {label}
      </span>
      {label == 'Status' ? (
        <div>
          <Badge
            variant="outline"
            className={`${statusColors[value]} capitalize font-medium`}
          >
            {value || '-'}
          </Badge>
        </div>
      ) : (
        <span className="col-span-2 font-medium text-gray-900 dark:text-zinc-200">
          {value || '-'}
        </span>
      )}
    </div>
  );
  return (
    <DashboardLayout
      title="Subscription Page"
      description="Manage your subscriptions"
    >
      <Toaster position="top-right" />
      <div className="flex gap-5">
        <LinkBackButton href="/dashboard/subjects" />
        
        <div className="w-full">
          <Card className={'py-3 w-full sm:overflow-auto mb-5'}>
            <div className="px-5">
              <h1 className="text-gray-700 dark:text-gray-300 font-medium text-lg">
                Subject Information
              </h1>
            </div>
            <Separator />

            <div className="px-5">
              {isLoading ? (
                <p>Loading ...</p>
              ) : (
                <div>
                  {/* <p className="text-green-500">
                  {JSON.stringify(subject)}
                </p> */}
                  {renderRow('Name', subject.name)}
                  {renderRow('Description', subject.description)}
                  {renderRow('Image', subject.image_url)}
                  {renderRow('Created At', subject.created_at)}

                  {/* {renderRow('Name', course.name)}
                  {renderRow('Start Date', course.start_date)}
                  {renderRow('End Date', course.end_date)}
                  {renderRow('Duration', course.duration)}
                  {renderRow('Fees', course.fees + ' ' + course.currency)}
                  {renderRow('Status', course.status)}
                  {renderRow('Description', course.description)}
                  {renderRow('Publish', course.is_publish ? 'Yes' : 'No')}
                  {renderRow('Created At', course.created_at)} */}
                </div>
              )}
            </div>
          </Card>
          
        </div>
      </div>
      <div></div>
    </DashboardLayout>
  );
}
