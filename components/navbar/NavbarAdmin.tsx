'use client';

/* eslint-disable */
import AdminNavbarLinks from './NavbarLinksAdmin';
import NavbarBreadcrumb from './NavbarBreadcrumb';
export default function AdminNavbar(props: {
  brandText: string;
  [x: string]: any;
}) {
  const { brandText } = props;

  return (
    <nav
      className={`fixed border right-3 top-3 z-[0] flex w-[calc(100vw_-_6%)] flex-row items-center justify-between rounded-lg bg-white/30 py-2 backdrop-blur-xl transition-all dark:bg-transparent md:right-[30px] md:top-4 md:w-[calc(100vw_-_8%)] md:p-2 lg:w-[calc(100vw_-_6%)] xl:top-[20px] xl:w-[calc(100vw_-_365px)] 2xl:w-[calc(100vw_-_380px)]`}
    >
      <div className="">
        <div className="h-6 md:mb-2 text-xs md:pt-1">
          <div>
          <NavbarBreadcrumb items={[]}/>
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
