import { createStore } from 'zustand/index';
import type { TFiltersStore, TFiltersStoreState } from './types';
import { immer } from 'zustand/middleware/immer';
import { produce } from 'immer';

export function storeCreator() {
  return createStore<TFiltersStore, [['zustand/immer', never]]>(
    immer((setState) => ({
      initialFilters: {},
      appliedFilters: {},
      tmpFilters: {},
      isFiltersLoading: false,

      /**
       * Initial filters
       */
      startInitialFiltersLoading: () => {
        setState(() => ({
          isFiltersLoading: true,
        }));
      },
      stopInitialFiltersLoading: () => {
        setState(() => ({
          isFiltersLoading: false,
        }));
      },
      loadInitialFilters: async (loader) => {
        setState(() => ({
          isFiltersLoading: true,
        }));

        loader()
          .then((response) => {
            setState(() => ({
              initialFilters: response,
            }));
          })
          .finally(() => {
            setState(() => ({
              isFiltersLoading: false,
            }));
          });
      },

      /**
       * Temporary filters
       */
      setTmpFilter: (name, value) => {
        setState(
          produce<TFiltersStoreState>((state) => {
            state.tmpFilters[name] = value;
          }),
        );
      },
      setTmpFilters: (values) => {
        setState(() => ({
          tmpFilters: values,
        }));
      },

      /**
       * Both temporary and applied filters
       */
      setFilter: (name, value) => {
        setState(
          produce<TFiltersStoreState>((state) => {
            state.tmpFilters[name] = value;
            state.appliedFilters[name] = value;
          }),
        );
      },
      setFilters: (values) => {
        setState(() => ({
          tmpFilters: values,
          appliedFilters: values,
        }));
      },

      /**
       * Applying filters
       */
      applyFromTmp: () => {
        setState((state) => ({
          appliedFilters: state.tmpFilters,
        }));
      },

      /**
       * Resetting state
       */
      resetAllFilters: () => {
        setState(() => ({
          appliedFilters: {},
          tmpFilters: {},
          isFiltersLoading: false,
        }));
      },
      resetToInitial: () => {
        setState(({ initialFilters }) => ({
          tmpFilters: initialFilters,
          appliedFilters: initialFilters,
        }));
      },
      reset: () => {
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
