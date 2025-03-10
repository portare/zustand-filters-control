export type TFilterValue = unknown;
export type TFilterValues = Record<string | symbol | number, TFilterValue>;

export type TFiltersLoader = () => Promise<TFilterValues>;

export type TFiltersStoreState = {
  initialFilters: TFilterValues;
  appliedFilters: TFilterValues;
  tmpFilters: TFilterValues;
  isFiltersLoading: boolean;
};

export type TFiltersStoreActions = {
  startInitialFiltersLoading: () => void;
  stopInitialFiltersLoading: () => void;
  loadInitialFilters: (loader: TFiltersLoader) => Promise<void>;

  setTmpFilter: (name: string, value: TFilterValue) => void;
  setTmpFilters: (values: TFilterValues) => void;

  setFilter: (name: string, value: TFilterValue) => void;
  setFilters: (values: TFilterValues) => void;

  applyFromTmp: () => void;

  resetAllFilters: () => void;
  resetToInitial: () => void;
  reset: () => void;
};

export type TFiltersStore = TFiltersStoreState & TFiltersStoreActions;

export type TStoreProps = object;
