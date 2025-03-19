import { createStore } from 'zustand/index';
import type { TFiltersStore, TFiltersStoreData, TFiltersStoreState } from './types';
import { immer } from 'zustand/middleware/immer';
import { produce } from 'immer';
import { isAsyncFunction } from '../../utils/types';

export function storeCreator(): TFiltersStore {
  return createStore<TFiltersStoreData, [['zustand/immer', never]]>(
    immer((setState, getState) => ({
      initialFilters: {},
      isFiltersLoading: false,
      tmpFilters: {},
      appliedFilters: {},
      storage: null,

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

        if (isAsyncFunction(loader)) {
          loader()
            .then((response) => {
              setState(() => ({
                initialFilters: response,
                tmpFilters: response,
                appliedFilters: response,
              }));
            })
            .finally(() => {
              setState(() => ({
                isFiltersLoading: false,
              }));
            });
        } else {
          const data = loader();

          setState(() => ({
            initialFilters: data,
            tmpFilters: data,
            appliedFilters: data,
            isFiltersLoading: false,
          }));
        }
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
        setState((state) => {
          state.storage?.setValues(state.tmpFilters);

          return {
            appliedFilters: state.tmpFilters,
          };
        });
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

      /**
       * Storage
       */
      updateFromStorage: () => {
        const { storage } = getState();

        if (!storage) {
          return;
        }

        const { getValues } = storage;

        if (isAsyncFunction(getValues)) {
          getValues().then((values) => {
            setState(() => ({
              tmpFilters: values,
              appliedFilters: values,
            }));
          });
        } else {
          const newState = getValues();
          setState(() => ({
            tmpFilters: newState,
            appliedFilters: newState,
          }));
        }
      },
    })),
  );
}
