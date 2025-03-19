import type { TFiltersStore, TStoreProps } from './types';
import { storeCreator } from './storeCreator';
import { memo, useRef } from 'react';
import { FiltersContext } from './FiltersContext';

export const FiltersProvider = memo(({ children, store, externalStorage = null }: TStoreProps) => {
  const storeRef = useRef<TFiltersStore>();

  if (!storeRef.current) {
    if (store) {
      storeRef.current = store;
    } else {
      storeRef.current = storeCreator({
        externalStorage,
      });
    }
  }

  return <FiltersContext.Provider value={storeRef.current}>{children}</FiltersContext.Provider>;
});
