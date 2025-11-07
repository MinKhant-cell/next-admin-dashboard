/*eslint-disable*/
'use client';

import MainChart from '@/components/dashboard/main/cards/MainChart';
import MainDashboardTable from '@/components/dashboard/main/cards/MainDashboardTable';
import DashboardLayout from '@/components/layout';
import tableDataUserReports from '@/variables/tableDataUserReports';
import { User } from '@supabase/supabase-js';


export default function Settings() {
  return (
    <DashboardLayout
      title="Subscription Page"
      description="Manage your subscriptions"
    >
      <div className="h-full w-full">
        <div className="mb-5 flex gap-5 flex-col xl:flex-row w-full">
          <MainChart />
        </div>
        {/* Conversion and talbes*/}
        <div className="h-full w-full rounded-lg ">
          <MainDashboardTable tableData={tableDataUserReports} />
        </div>
      </div>
    </DashboardLayout>
  );
}
