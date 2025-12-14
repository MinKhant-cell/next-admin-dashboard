'use client';

/* eslint-disable */
import AdminNavbarLinks from './NavbarLinksAdmin';
import NavbarBreadcrumb from './NavbarBreadcrumb';
export default function AdminNavbar(props: {
  brandText: string;
  [x: string]: any;
  collapsed?: boolean;
  sidebarWidth: any;
}) {
  const { sidebarWidth, brandText, collapsed } = props;

  return (
    <nav
      className={`w-full fixed border right-0 top-0 z-1 flex flex-row items-center justify-between rounded-none bg-white  py-2 transition-all dark:bg-transparent md:p-2 `}
    >
      <div className="">
        <div className="h-6 md:mb-2 text-xs md:pt-1">
          <div>
          <NavbarBreadcrumb items={[{name: 'Dashboard', href: '/'}]}/>
          </div>

          {/* <a
            className="hidden text-xs font-normal text-zinc-950 hover:underline dark:text-white dark:hover:text-white md:inline"
            href=""
          >
            Pages
            <span className="mx-1 text-xs text-zinc-950 hover:text-zinc-950 dark:text-white">
              {' '}
              /{' '}
            </span>
          </a>
          <NavLink
            className="text-xs font-normal capitalize text-zinc-950 hover:underline dark:text-white dark:hover:text-white"
            href="#"
          >
            {brandText}
          </NavLink> */}
        </div>
      </div>
      <div className="w-[154px] min-w-max md:ml-auto md:w-[unset]">
        <AdminNavbarLinks />
      </div>
    </nav>
  );
}
