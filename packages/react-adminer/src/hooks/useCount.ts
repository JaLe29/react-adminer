import { useEffect, useState } from 'react';
import type { CountOptions } from '../types/types';
import { useDataProvider } from './useDataProvider';

export const useCount = (
	entityName: string,
	options?: CountOptions,
	skip?: boolean,
): { data: number | undefined; loading: boolean; refetch: () => Promise<number> } => {
	const dataProvider = useDataProvider();
	const [data, setData] = useState<number>();
	const [loading, setLoading] = useState(true);

	const fetch = async (): Promise<number> => {
		setLoading(true);
		const response = await dataProvider.count(entityName, options);
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
