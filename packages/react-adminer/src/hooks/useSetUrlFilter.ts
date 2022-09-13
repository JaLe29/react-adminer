import useStateParams from './useStateParams';

export default function useSetUrlFilter(): any {
	const [filterConfig, setFilter] = useStateParams<any>(
		undefined,
		'f',
		(v?: string) => {
			try {
				const parsed = JSON.parse(v ?? 'empty');
				return parsed;
			} catch {
				return {};
			}
		},
		(v: string) => JSON.stringify(v),
	);
	return [ filterConfig, setFilter ];
}
