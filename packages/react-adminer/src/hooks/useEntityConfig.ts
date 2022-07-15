import { getSchema } from '../components/helpers';
import type { TableConfig } from '../types';
import { useReactAdminerContext } from './useReactAdminerContext';

interface Props {
	entityName: string;
}

export const useEntityConfig = ({ entityName }: Props): TableConfig | undefined => {
	const { config, renders } = useReactAdminerContext();

	if (!config?.schema[entityName]) {
		return undefined;
	}
	return getSchema(entityName, config?.schema[entityName], renders);
};
