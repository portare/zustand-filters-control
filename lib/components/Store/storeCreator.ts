import { createStore } from 'zustand/index';
import type { TFiltersStore } from './types';
import { immer } from 'zustand/middleware/immer';

export function storeCreator() {
  return createStore<TFiltersStore, [['zustand/immer', never]]>(
    immer((setState) => ({
      initialFilters: {},
      appliedFilters: {},
      tmpFilters: {},
      isFiltersLoading: false,
      resetAllFilters: () => {
        setState(() => ({
          initialFilters: {},
          appliedFilters: {},
          tmpFilters: {},
          isFiltersLoading: false,
        }));
      },
    })),
  );
}
