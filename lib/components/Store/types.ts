export type TFilterValues = Record<string | symbol | number, unknown>;

export type TFiltersStoreState = {
  initialFilters: TFilterValues;
  appliedFilters: TFilterValues;
  tmpFilters: TFilterValues;
  isFiltersLoading: boolean;
};
export type TFiltersStoreActions = {
  resetAllFilters: () => void;
  /*
  * setTmpFilter
  * setTmpFilters
  *
  * applyFromTmp
  *
  * setFilter
  * setFilters
  *
  * resetToInitial
  * reset
  *
  *
  * STAFF actions
  *
  * startInitialFiltersLoading
  * stopInitialFiltersLoading
  *
  * setInitialFilters
  *
  * */
};

export type TFiltersStore = TFiltersStoreState & TFiltersStoreActions;

export type TStoreProps = object;
