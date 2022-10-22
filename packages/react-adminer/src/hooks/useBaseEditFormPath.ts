import { useReactAdminerContext } from './useReactAdminerContext';

export const useBaseEditFormPath = (): string => {
	const { paths } = useReactAdminerContext();
	return paths?.editFormPath ?? '/entity/edit';
};
