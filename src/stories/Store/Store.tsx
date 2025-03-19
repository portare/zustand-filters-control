import { FiltersProvider, type TStoreProps } from '../../../lib/main';

type TStoreProviderProps = TStoreProps;

/**
 * Core filters store provider
 */
export const StoreProvider = ({ children }: TStoreProviderProps) => {
  return <FiltersProvider>{children}</FiltersProvider>;
};
