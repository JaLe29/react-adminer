import type { Field, PrimitiveField, RelationField, TableConfig } from '../types';
import { PRIMITIVE_FIELDS } from '../config';

export const isCreatable = (f: Field): boolean =>
	(f as PrimitiveField).creatable === true ||
	(f as PrimitiveField).creatable === undefined ||
	(f as PrimitiveField).creatable === null;

export const isPrimitiveFieldType = (f: Field): boolean => PRIMITIVE_FIELDS.includes(f.type);

export const getRelationFields = (fields: Field[]): RelationField[] =>
	fields.filter(f => f.type === 'relation' && !(f as any).virtual) as RelationField[];

export const getPrimitiveFields = (fields: Field[]): PrimitiveField[] =>
	fields.filter(f => f.type !== 'relation' && !(f as any).virtual) as PrimitiveField[];

export const isVirtualFieldType = (f: PrimitiveField): boolean => f.type === 'virtual';

export const getFieldByName = (config: TableConfig, name: string): Field | undefined =>
	config.fields.find(f => f.name === name);
