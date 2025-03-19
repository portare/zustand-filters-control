import type { PropsWithChildren } from 'react';

export type TFilterValue = unknown;
export type TFilterValues = Record<string | symbol | number, TFilterValue>;

export type TFiltersLoader = (() => Promise<TFilterValues>) | (() => TFilterValues);

export type TStorage = {
  setValues: ((values: TFilterValues) => Promise<void>) | ((values: TFilterValues) => void);
  getValues: (() => Promise<TFilterValues>) | (() => TFilterValues);
};

export type TFiltersStoreState = {
  initialFilters: TFilterValues;
  isFiltersLoading: boolean;
  tmpFilters: TFilterValues;
  appliedFilters: TFilterValues;

  storage: TStorage | null;
};

export type TFiltersStoreActions = {
  startInitialFiltersLoading: () => void;
  stopInitialFiltersLoading: () => void;
  loadInitialFilters: (loader: TFiltersLoader) => Promise<void>;

  setTmpFilter: (name: string, value: TFilterValue) => void;
  // TODO add merge option
  setTmpFilters: (values: TFilterValues) => void;

  setFilter: (name: string, value: TFilterValue) => void;
  setFilters: (values: TFilterValues) => void;

  applyFromTmp: () => void;

  resetAllFilters: () => void;
  resetToInitial: () => void;
  reset: () => void;

  updateFromStorage: () => void;
};

export type TFiltersStore = TFiltersStoreState & TFiltersStoreActions;

export type TStoreProps = PropsWithChildren<object>;
