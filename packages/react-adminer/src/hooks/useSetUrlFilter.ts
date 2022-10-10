import { jsonDeserializeParse, jsonSerializeParse } from '../utils/config';
import useStateParams from './useStateParams';

export default function useSetUrlFilter(): any {
	const [filterConfig, setFilter] = useStateParams<any>(undefined, 'f', jsonDeserializeParse, jsonSerializeParse);
	return [filterConfig, setFilter];
}
