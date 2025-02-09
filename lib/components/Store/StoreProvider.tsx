import type { TStoreProps } from './types';
import { storeCreator } from './storeCreator';
import { createContext, type PropsWithChildren, useRef } from 'react';

type TFiltersStoreContext = ReturnType<typeof storeCreator>;

export const FiltersContext = createContext<TFiltersStoreContext | null>(null);

export const FiltersProvider = ({ children }: PropsWithChildren<TStoreProps>) => {
  const storeRef = useRef<TFiltersStoreContext>();

  if (!storeRef.current) {
    storeRef.current = storeCreator();
  }

  return <FiltersContext.Provider value={storeRef.current}>{children}</FiltersContext.Provider>;
};
