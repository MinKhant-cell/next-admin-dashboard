'use client';

import { Card } from '@/components/ui/card';

function DashboardWidget({title, description = null, value, icon = null}: any) {
  return (
    <Card className={'border-zinc-200 p-6 dark:border-zinc-800 w-full'}>
      <div>
        <h1 className="text-gray-600">{title}</h1>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
          {value}
        </h2>
      </div>
    </Card>
  );
}

export default DashboardWidget;
