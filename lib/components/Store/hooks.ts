import { useContext } from 'react';
import { FiltersContext } from './FiltersContext';
import { useStore } from 'zustand';
import { TFiltersStoreData } from './types';

export function useFilters(): TFiltersStoreData;
export function useFilters<T>(selector: (store: TFiltersStoreData) => T): T;
export function useFilters<T extends keyof TFiltersStoreData>(key: T): TFiltersStoreData[T];
export function useFilters<T>(
  selector?: ((store: TFiltersStoreData) => T) | keyof TFiltersStoreData,
) {
  const store = useContext(FiltersContext);

  if (!store) {
    throw new Error('Missing filters store provider');
  }

  const _selector =
    selector &&
    (typeof selector === 'function' ? selector : (store: TFiltersStoreData) => store[selector]);

  return useStore(store, _selector as never);
}
