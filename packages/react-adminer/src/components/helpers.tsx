import { set } from '../utils/object';
import type { BaseConfig, Field, TableConfig, TableField, TableRowCustomRender } from '../types';
import { BooleanRender } from './Renders/BooleanRender';
// import { DateRender } from './Renders/DateRender';
import EditButton from './EditButton';
import type { Renders } from '../types/renders';
// import { ALLOWED_ENTITIES } from './config';
// import { SCHEMA } from './schema';

const TABLE_FIELDS: Record<string, string[]> = {
	user: ['email'],
	'item-note': ['user'],
};

const withBasicRender = (f: TableField[]): TableField[] =>
	f.map(field => {
		if (field.type === 'boolean' && !field.render) {
			const copy = JSON.parse(JSON.stringify(field));
			set(copy, 'render', BooleanRender);
			return copy;
		}
		return field;
	});

// const DEFAULT_LAST_FIELDS: TableField[] = [
// 	{
// 		name: 'edit',
// 		type: 'button',
// 		render: EditButton,
// 		virtual: true,
// 	},
// ];

const withSortable = (sortableFileds: string[], fields: Field[]): TableField[] =>
	fields.map(f => {
		if (sortableFileds.includes(f.name)) {
			return {
				...f,
				sortable: true,
			};
		}
		return f;
	});

const withTableFields = (entityName: string, fields: TableField[]): TableField[] => {
	if (!TABLE_FIELDS[entityName]) {
		return fields;
	}
	return fields.filter(f => TABLE_FIELDS[entityName].includes(f.name));
};

const removeDuplicatedFields = (a: Field[], b: Field[]): Field[] =>
	a.filter(field => !b.some(df => df.name === field.name));

export const getSchema = (entityName: string, entitySchema: any, renders?: Renders): TableConfig => {
	const tableFields = withBasicRender(entitySchema.fields);

	return {
		fields: tableFields.map(field => {
			const r = renders?.[entityName]?.table?.[field.name];
			if (r) {
				return {
					...field,
					render: r,
				};
			}

			return field;
		}),
		filter: tableFields.filter((ss: Field) => ss.type === 'string').map((f: Field) => f.name),
	};
};
