import { useEffect, useState } from 'react';
import { useReactAdminerContext } from './useReactAdminerContext';

const useStateParams = <T>(
	initialState: T,
	paramsName: string,
	deserialize: (state: string) => T,
	serialize: (state: T) => string = (state: T): string => `${state}`,
): [T, (state: T) => void] => {
	const { router } = useReactAdminerContext();
	const navigate = router?.functions?.useNavigate();
	const { search, pathname } = router?.functions?.useLocation();

	const existingValue = new URLSearchParams(search).get(paramsName);
	const [state, setState] = useState<T>(existingValue ? deserialize(existingValue) : initialState);

	useEffect(() => {
		// Updates state when user navigates backwards or forwards in browser history
		if (existingValue && deserialize(existingValue) !== state) {
			setState(deserialize(existingValue));
		}
	}, [existingValue]);

	const onChange = (s: T): void => {
		setState(s);
		const searchParams = new URLSearchParams(window.location.search);
		searchParams.set(paramsName, serialize(s));
		navigate({ pathname, search: searchParams.toString() });
	};

	return [state, onChange];
};

export default useStateParams;
