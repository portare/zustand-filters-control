import { createContext } from 'react';
import type { TFiltersStore } from './types';

export const FiltersContext = createContext<TFiltersStore | null>(null);
