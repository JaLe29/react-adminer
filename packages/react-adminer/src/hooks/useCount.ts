import { useEffect, useState } from 'react';
import { useReactAdminerContext } from './useReactAdminerContext';
import type { CountOptions } from '../types/data-provider';

export const useCount = (
	entityName: string,
	options?: CountOptions,
	skip?: boolean,
): { data: number | undefined; loading: boolean; refetch: () => Promise<number> } => {
	const { dataProvider } = useReactAdminerContext();

	const [data, setData] = useState<number>();
	const [loading, setLoading] = useState(true);

	const fetch = async (): Promise<number> => {
		setLoading(true);
		const response = await dataProvider!.count(entityName, options);
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
