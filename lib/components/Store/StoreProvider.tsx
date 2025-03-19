import type { TStoreProps } from './types';
import { storeCreator } from './storeCreator';
import { memo, useRef } from 'react';
import { FiltersContext, type TFiltersStoreContext } from './FiltersContext';

// TODO add way to pass your store as in antd/Form
export const FiltersProvider = memo(({ children }: TStoreProps) => {
  const storeRef = useRef<TFiltersStoreContext>();

  if (!storeRef.current) {
    storeRef.current = storeCreator();
  }

  return <FiltersContext.Provider value={storeRef.current}>{children}</FiltersContext.Provider>;
});
