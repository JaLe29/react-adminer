export type EntityName = string;

export type EntityPropertyName = string;

export type EntityGlobalName = '_global';

export type TableFieldType = 'string' | 'number' | 'boolean' | 'date' | 'datetime' | 'virtual';

export type TableFilterObj = { name: string; component: any };

export type CustomRenderParamsType<T = any> = {
	value: any;
	object: T;
	entity: string;
	refetch: () => Promise<void | T[] | T>;
};

export type TableRowCustomRender = ({ value, object, entity, refetch }: CustomRenderParamsType) => any;

export type TableFilter = string | TableFilterObj;
export type TableField = Field & {
	hideInTable?: boolean;
	hideInForm?: boolean;
	sortable?: boolean;
	render?: TableRowCustomRender;
	virtual?: boolean;
	section?: string;
	helper?: string;
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
	select: <T>(entityName: EntityName, options?: SelectOptions) => Promise<T[]>;
	count: (entityName: EntityName, options?: CountOptions) => Promise<number>;
	insert: (
		entityName: EntityName,
		object: Record<string, any>,
		entityConfig: TableConfig,
	) => Promise<string | number>;
	update: (
		entityName: EntityName,
		object: Record<string, any>,
		entityConfig: TableConfig,
		options?: UpdateOptions,
	) => Promise<boolean>;
}

export type Sort = Record<EntityPropertyName, 'asc' | 'desc'>;

export type ReactAdminerTableConfig = Record<EntityName | EntityGlobalName, { defaultSort?: Sort }>;

export interface ReactAdminerConfig {
	schema: Schema;
	table?: ReactAdminerTableConfig;
}

export type Renders = Record<
	EntityName | EntityGlobalName,
	Partial<Record<'table' | 'form', Record<EntityPropertyName, React.FC<CustomRenderParamsType>>>>
>;

export interface SelectOptions {
	fields?: string[];
	orderBy?: Record<string, 'asc' | 'desc'>;
	limit?: number;
	offset?: number;
	where?: Record<string, any>;
}

export interface CountOptions {
	where?: Record<string, any>;
}

export interface UpdateOptions {
	where?: Record<string, any>;
}
