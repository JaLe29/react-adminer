import { useEffect, useState } from 'react';
import { useReactAdminerContext } from './useReactAdminerContext';

import type { SelectOptions } from '../types/data-provider';

export const useSelect = <T>(
	entityName: string,
	options: SelectOptions,
	skip?: boolean,
): { data: T[] | undefined; loading: boolean; refetch: () => Promise<T[]> } => {
	const { dataProvider } = useReactAdminerContext();

	const [data, setData] = useState<T[] | undefined>();
	const [loading, setLoading] = useState(true);

	const fetch = async (): Promise<T[]> => {
		setLoading(true);
		const response = await dataProvider!.select<T>(entityName, options);
		setData(response);
		setLoading(false);
		return response;
	};

	useEffect(() => {
		if (skip) {
			return;
		}
		// eslint-disable-next-line no-console
		fetch().catch(console.error);
	}, [entityName, JSON.stringify(options), skip]);

	return { data, loading, refetch: fetch };
};
