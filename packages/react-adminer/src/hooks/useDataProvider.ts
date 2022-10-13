import type { DataProvider } from 'types/types';
import { useReactAdminerContext } from './useReactAdminerContext';

export const useDataProvider = (): DataProvider => {
	const { dataProvider } = useReactAdminerContext();
	if (!dataProvider) {
		throw new Error('DataProvider is not defined!');
	}
	return dataProvider;
};
