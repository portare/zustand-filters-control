import type { TStoreProps } from './types';
import { storeCreator } from './storeCreator';
import { memo, type PropsWithChildren, useRef } from 'react';
import { FiltersContext, type TFiltersStoreContext } from './FiltersContext';

export const FiltersProvider = memo(({ children }: PropsWithChildren<TStoreProps>) => {
  const storeRef = useRef<TFiltersStoreContext>();

  if (!storeRef.current) {
    storeRef.current = storeCreator();
  }

  return <FiltersContext.Provider value={storeRef.current}>{children}</FiltersContext.Provider>;
});
