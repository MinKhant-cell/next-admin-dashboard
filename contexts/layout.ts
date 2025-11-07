import { createContext } from 'react';

interface OpenContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
type UserDetails = { [x: string]: any } | null;

export const OpenContext = createContext<OpenContextType>(undefined);
export const UserContext = createContext<any | undefined | null>(undefined);
export const UserDetailsContext = createContext<UserDetails | undefined | null>(
  undefined
);
