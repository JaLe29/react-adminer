import type { UpdateOptions, SelectOptions, CountOptions, TableConfig } from 'react-adminer';
import { Database } from './Database';
import { SCHEMA } from './schema';

const db = new Database();

export const select = (entityName: string, options?: SelectOptions): Promise<any[]> =>
	db.select(entityName, options, SCHEMA) as Promise<any[]>;

export const count = (entityName: string, options?: CountOptions): Promise<number> =>
	db.count(entityName, options?.where, SCHEMA) as unknown as Promise<number>;

export const insert = (entityName: string, object: Record<string, any>): Promise<string | number> =>
	db.insert(entityName, object) as any;

export const update = (
	entityName: string,
	object: Record<string, any>,
	entityConfig: TableConfig,
	options?: UpdateOptions,
): Promise<boolean> => {
	db.update(entityName, object, entityConfig, options);
	return Promise.resolve(true);
};
