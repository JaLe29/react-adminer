import { set } from '../utils/object';
import type { Field, Renders, TableConfig, TableField } from '../types';
import { BooleanRender } from './Renders/BooleanRender';

const withBasicRender = (f: TableField[]): TableField[] =>
	f.map(field => {
		if (field.type === 'boolean' && !field.render) {
			const copy = JSON.parse(JSON.stringify(field));
			set(copy, 'render', BooleanRender);
			return copy;
		}
		return field;
	});

export const getSchema = (entityName: string, entitySchema: any, renders?: Renders): TableConfig => {
	const tableFields = withBasicRender(entitySchema.fields);

	return {
		fields: tableFields.map(field => {
			const r = renders?.[entityName]?.table?.[field.name] ?? renders?._global?.table?.[field.name];
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
