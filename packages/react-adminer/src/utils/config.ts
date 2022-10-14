import type { Field, PrimitiveField, RelationField, Sort, TableConfig, TableField } from '../types/types';
import { PRIMITIVE_FIELDS } from '../config';

export const isCreatable = (f: Field): boolean =>
	(f as PrimitiveField).creatable === true ||
	(f as PrimitiveField).creatable === undefined ||
	(f as PrimitiveField).creatable === null;

export const hasEntityField = (fieldName: string, fields: Field[]): boolean => fields.some(f => f.name === fieldName);

export const isPrimitiveFieldType = (f: Field): boolean => PRIMITIVE_FIELDS.includes(f.type);

export const getRelationFields = (fields: Field[]): RelationField[] =>
	fields.filter(f => f.type === 'relation' && !(f as any).virtual) as RelationField[];

export const getPrimitiveFields = (fields: Field[]): PrimitiveField[] =>
	fields.filter(f => f.type !== 'relation' && !(f as any).virtual) as PrimitiveField[];

export const getVirtualFields = (fields: Field[]): Field[] => fields.filter(f => (f as any).virtual) as Field[];

export const isVirtualFieldType = (f: PrimitiveField): boolean => f.type === 'virtual';

export const getFieldByName = (config: TableConfig, name: string): Field | undefined =>
	config.fields.find(f => f.name === name);

export const isRelationFieldType = (f: Field): f is RelationField => !!(f as any).relation;

export const fixFormat = (
	config: TableConfig,
	value: any,
	propertyName: string,
	payload: { [x: string]: any },
): any => {
	if (getFieldByName(config, propertyName)?.type === 'number') {
		const valueAsNumber: number = parseInt(value);
		return { [propertyName]: valueAsNumber };
	}
	return payload;
};

export const jsonDeserializeParse = (v?: string): Sort => {
	try {
		const parsed = JSON.parse(v ?? 'empty');
		return parsed;
	} catch {
		return {};
	}
};

export const getSectionFields = (inputFields: PrimitiveField[], selectedSection?: string): PrimitiveField[] => {
	const selectedFields: PrimitiveField[] = inputFields.filter(
		(f: PrimitiveField & { editable?: boolean; section?: string }) => {
			if (selectedSection) {
				if (f.section !== selectedSection) {
					return undefined;
				}
			} else if (f.section) {
				return undefined;
			}
			return f;
		},
	);
	return selectedFields;
};

export const getAllSections = (primitiveFields: PrimitiveField[]): Array<string | undefined> => {
	const getSections = primitiveFields.map(
		(f: PrimitiveField & { editable?: boolean; section?: string }) => f.section,
	);
	return [...new Set(getSections)];
};

export const getColumnTitle = (f: TableField): string => (f.label ? f.label : f.name);

export const jsonSerializeParse = (v: string): string => JSON.stringify(v);
