import { useContext } from 'react';
import { FiltersContext } from './FiltersContext';
import { useStore } from 'zustand';
import { TFiltersStore } from './types';

export function useFilters(): TFiltersStore;
export function useFilters<T>(selector: (store: TFiltersStore) => T): T;
export function useFilters<T extends keyof TFiltersStore>(key: T): TFiltersStore[T];
export function useFilters<T>(selector?: ((store: TFiltersStore) => T) | keyof TFiltersStore) {
  const store = useContext(FiltersContext);

  if (!store) {
    throw new Error('Missing filters store provider');
  }

  const _selector =
    selector &&
    (typeof selector === 'function' ? selector : (store: TFiltersStore) => store[selector]);

  return useStore(store, _selector as never);
}
