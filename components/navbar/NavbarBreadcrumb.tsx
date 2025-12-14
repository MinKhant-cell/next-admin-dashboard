"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItemType {
  href?: string;
  name: string;
}

interface DynamicBreadcrumbProps {
  items: BreadcrumbItemType[];
}

export default function DynamicBreadcrumb({ items }: DynamicBreadcrumbProps) {
  if (!items || items.length === 0) return null;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <span key={index} className="flex items-center">
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-xs text-gray-500">
                    {item.name}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link className="text-xs" href={item.href || "#"}>
                      {item.name}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
