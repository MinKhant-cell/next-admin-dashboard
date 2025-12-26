'use client';
import { createContext, useContext } from 'react';

const BreadcrumbDataContext = createContext<{ name?: string }>({});

export const BreadcrumbProvider = ({ children, value }: any) => (
  <BreadcrumbDataContext.Provider value={value}>{children}</BreadcrumbDataContext.Provider>
);

export const useBreadcrumb = () => useContext(BreadcrumbDataContext);
