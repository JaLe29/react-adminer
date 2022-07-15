export type TableFieldType = 'string' | 'number' | 'boolean' | 'Date' | 'any' | string; // todo

export type TableFilterObj = { name: string; component: any };

export type TableRowCustomRender = ({ value, object, entity }: { value: any; object: any; entity: string }) => any;

export type TableFilter = string | TableFilterObj;
export type TableField = Field & {
	sortable?: boolean;
	render?: TableRowCustomRender;
	virtual?: boolean;
};

export type EditFormField = Field & { editable?: boolean };

export interface PrimitiveField {
	name: string;
	type: TableFieldType;
	nullable?: boolean;
	creatable?: boolean;
}

export type RelationType = 'many' | 'one';

export interface RelationField {
	name: string;
	type: 'relation';
	nullable?: boolean;
	relation: {
		type: RelationType;
		entity: string;
	};
}

export type Field = PrimitiveField | RelationField;

export interface EditFormConfig {
	fields: EditFormField[];
}

export interface TableConfig {
	filter?: TableFilter[];
	fields: TableField[];
}

export interface FilterComponent<T> {
	onChange: (data: T) => void;
	value?: T;
	id: string;
}

export interface BaseConfig {
	fields: TableField[];
	// filter?: string[];
}

export type Schema = Record<string, BaseConfig>;
