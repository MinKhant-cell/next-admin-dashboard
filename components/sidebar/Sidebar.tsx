'use client';

import { Button } from '../ui/button';
import {
  renderThumb,
  renderTrack,
  renderView
} from '@/components/scrollbar/Scrollbar';
import Links from '@/components/sidebar/components/Links';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import React, { PropsWithChildren, useContext, useState, forwardRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { HiX } from 'react-icons/hi';
import { HiMiniBuildingLibrary } from 'react-icons/hi2';
import { HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';

// const supabase = createClient();

export interface SidebarProps extends PropsWithChildren {
  routes: any;
  [x: string]: any;
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(function Sidebar(
  props,
  ref
)
{

  const router = useRouter();
  const { routes, collapsed, setCollapsed } = props;


  
  // SIDEBAR
  return (
    <div
    ref={ref}
      className={`lg:!z-99 !z-[99] min-h-full transition-all md:!z-[99] xl:!z-0 
    ${props.variant === 'auth' ? 'xl:hidden' : 'xl:block'}
    ${props.open ? '' : '-translate-x-[120%] xl:translate-x-[unset]'}
    ${collapsed ? 'w-[80px]' : 'w-[300px]'}
  `}
    >
      <Card
        className={`h-full w-full overflow-hidden rounded-none border-0 border-r border-zinc-200 pe-0 dark:border-zinc-800 sm:my-0 sm:mr-0 md:m-0 md:mr-0`}
      >
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}
          universal={true}
        >
          <div className="flex h-full flex-col justify-between">
            <div>
              <span
                className="absolute top-4 block cursor-pointer text-zinc-200 dark:text-white/40 xl:hidden"
                onClick={() => props.setOpen(false)}
              >
                <HiX />
              </span>
              <div className={`mt-8 relative flex items-center justify-center`}>
                <div className="me-2 flex h-[40px] w-[40px] items-center justify-center rounded-md bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
                  <HiMiniBuildingLibrary className="h-5 w-5" />
                </div>
               {!collapsed && (
    <h5 className="text-xl font-bold text-zinc-950 dark:text-white">
      {process.env.NEXT_PUBLIC_APP_NAME || 'Dashboard'}
    </h5>
  )}
                <div className="absolute right-0 bottom-0">
  <Button
    variant="ghost"
    size="icon"
    onClick={() => setCollapsed(!collapsed)}
  >
    {collapsed ? (
      <HiOutlineArrowRightOnRectangle className="h-5 w-5" />
    ) : (
      <HiX className="h-5 w-5" />
    )}
  </Button>
</div>
              </div>
              <div className="mb-8 mt-8 h-px bg-zinc-200 dark:bg-white/10" />
              {/* Nav item */}
              <ul>
                <Links routes={routes} collapsed={collapsed}/>
              </ul>
            </div>
            
          </div>
        </Scrollbars>
      </Card>
    </div>
  );
}
)

// PROPS

export default Sidebar;
