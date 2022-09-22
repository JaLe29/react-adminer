import type { CountOptions, SelectOptions, UpdateOptions } from 'types/data-provider';

export type TableFieldType = 'string' | 'number' | 'boolean' | 'Date' | 'any' | string; // todo

export type TableFilterObj = { name: string; component: any };

export type TableRowCustomRender = ({ value, object, entity }: { value: any; object: any; entity: string }) => any;

export type TableFilter = string | TableFilterObj;
export type TableField = Field & {
	hideInTable?: boolean;
	sortable?: boolean;
	render?: TableRowCustomRender;
	virtual?: boolean;
};

export interface PrimitiveField {
	editable?: boolean;
	name: string;
	label?: string;
	type: TableFieldType;
	nullable?: boolean;
	creatable?: boolean;
}

export type RelationType = 'many' | 'one';

export interface RelationField {
	name: string;
	label?: string;
	type: 'relation';
	nullable?: boolean;
	relation: {
		type: RelationType;
		entity: string;
	};
}

export type Field = PrimitiveField | RelationField;

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
}

export type Schema = Record<string, BaseConfig>;

export interface DataProvider {
	select: <T>(entityName: string, options?: SelectOptions) => Promise<T[]>;
	count: (entityName: string, options?: CountOptions) => Promise<number>;
	insert: (EntityName: string, object: Record<string, any>, entityConfig: TableConfig) => Promise<string | number>;
	update: (
		entityName: string,
		object: Record<string, any>,
		entityConfig: TableConfig,
		options?: UpdateOptions,
	) => Promise<boolean>;
}
