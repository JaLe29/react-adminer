import { useContext } from 'react';
import type { ReactAdminerContextValue } from '../contexts/ReactAdminerContext';
import { ReactAdminerContext } from '../contexts/ReactAdminerContext';

export const useReactAdminerContext = (): ReactAdminerContextValue => useContext(ReactAdminerContext);
