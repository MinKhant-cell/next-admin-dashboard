/*eslint-disable*/
'use client';

import MainChart from '@/components/dashboard/main/cards/MainChart';
import MainDashboardTable from '@/components/dashboard/main/cards/MainDashboardTable';
import DashboardLayout from '@/components/layout';
import tableDataUserReports from '@/variables/tableDataUserReports';
import { User } from '@supabase/supabase-js';
import TeacherStautsOverviewChart from './cards/TeacherStautsOverviewChart';
import DashboardWidget from './cards/DashboardWidget';
import FeeCollectionChart from './cards/FeeCollectionChart';
import AdmissionOverviewChart from './cards/AdmissionOverviewChart';
import CourseOverviewChart from './cards/CourseOverviewChart';

export default function Settings() {
  return (
    <DashboardLayout
      title="Subscription Page"
      description="Manage your subscriptions"
    >
      <div className="h-full w-full">
        <div className="flex gap-5 justify-between mb-5">
          <DashboardWidget title="Total Revenue" value="$45,231" />
          <DashboardWidget title="Total Expense" value="$12,231" />
          <DashboardWidget title="Total Teachers" value="20" />
          <DashboardWidget title="Total Students" value="150" />
        </div>
        <div className="flex gap-5 justify-between mb-5">
          <TeacherStautsOverviewChart />
          <CourseOverviewChart />
          <TeacherStautsOverviewChart />

        </div>
        <div className="flex gap-5">
          <FeeCollectionChart/>
          <AdmissionOverviewChart/>
        </div>
      </div>
    </DashboardLayout>
  );
}
