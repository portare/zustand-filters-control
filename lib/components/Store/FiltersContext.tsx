import { createContext } from 'react';
import { storeCreator } from './storeCreator';

export type TFiltersStoreContext = ReturnType<typeof storeCreator>;

export const FiltersContext = createContext<TFiltersStoreContext | null>(null);
