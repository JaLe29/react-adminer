interface Props {
	paths: { editFormPath?: string | undefined; listPath?: string | undefined } | undefined;
}

export const useBaseEditFormPath = ({ paths }: Props): string => paths?.editFormPath ?? '/entity/edit';
