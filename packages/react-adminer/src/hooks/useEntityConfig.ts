import { getSchema } from '../components/helpers';
import type { TableConfig } from '../types';
import { useReactAdminerContext } from './useReactAdminerContext';

interface Props {
	entityName: string;
	entityConfig?: TableConfig | undefined;
}

export const useEntityConfig = ({ entityName, entityConfig }: Props): TableConfig | undefined => {
	const { config, renders } = useReactAdminerContext();

	if (entityConfig) {
		return entityConfig;
	}

	if (!config?.schema[entityName]) {
		return undefined;
	}
	return getSchema(entityName, config?.schema[entityName], renders);
};
