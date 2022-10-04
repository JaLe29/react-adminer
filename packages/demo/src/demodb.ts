/* eslint-disable no-console */
import type { Schema, TableConfig, UpdateOptions } from 'react-adminer';

export interface Options {
	where?: Record<string, any>;
	limit?: number;
	offset?: number;
	fields?: string[] | undefined;
	orderBy?: Record<string, 'asc' | 'desc'>;
}

export class Db {
	database: any = {};

	insert(entityName: string, data: any): void {
		if (!this.database[entityName]) {
			this.database[entityName] = {};
		}
		const id = data.id ?? (Math.random() + 1).toString(36).substring(7);
		this.database[entityName][id] = { id, ...data };
	}

	delete(entityName: string, id: string): void {
		delete this.database[entityName][id];
	}

	// podle vice propert
	select(entityName: string, options: Options = {}, schema: Schema): any {
		const entitySchema = schema[entityName];

		const { where, limit, offset, fields, orderBy } = options;

		const pureFields = fields?.filter(f => {
			const tmpParts = f.split('.');
			return tmpParts.length === 1;
		});

		const relationFields = fields?.filter(f => {
			const tmpParts = f.split('.');
			return tmpParts.length > 1;
		});
		const relationMap: Record<string, string[]> = {};
		relationFields?.forEach(f => {
			const tmpParts = f.split('.');
			const rootKey = tmpParts.shift() as string;
			if (!relationMap[rootKey]) {
				relationMap[rootKey] = [];
			}
			relationMap[rootKey].push(tmpParts.join('.'));
		});

		console.log(entitySchema);
		Object.keys(relationMap).forEach(k => {
			console.log(this.select(k, { fields: relationMap[k] }, schema[k] as any));
		});

		const entityPart = this.database[entityName] ?? [];
		let toSearchPart: any[] = entityPart;

		if (where?.id) {
			toSearchPart = [entityPart[where.id]];
		} else {
			toSearchPart = Object.keys(toSearchPart).map((key: any) => toSearchPart[key]);
		}

		let toResponse = toSearchPart.filter(v => {
			if (where && v) {
				return Object.keys(where).every(key => v[key] === where[key]);
			}
			return v;
		});

		if (pureFields) {
			toResponse = toResponse.map((loopObject: any): any =>
				pureFields.reduce((acc, v) => ({ ...acc, [v]: loopObject[v] }), {}),
			);
			return toResponse;
		}

		if (orderBy) {
			Object.keys(orderBy).forEach((keyOrderBy: string) => {
				if (orderBy[keyOrderBy] === 'asc') {
					toResponse = toResponse.sort((a, b) => a[keyOrderBy].localeCompare(b[keyOrderBy]));
				}
				if (orderBy[keyOrderBy] === 'desc') {
					toResponse = toResponse.sort((a, b) => b[keyOrderBy].localeCompare(a[keyOrderBy]));
				}
			});
		}

		if (offset) {
			toResponse = toResponse.slice(offset);
		}

		if (limit) {
			toResponse = toResponse.slice(0, limit);
		}

		return toResponse;
	}

	count(entityName: string, where: any, schema: Schema): number {
		return this.select(entityName, where, schema).length;
	}

	objectWithRelations = (object: Record<string, any>, entityConfig: TableConfig): Record<string, any> =>
		Object.keys(object).reduce((acc, v) => {
			const f = entityConfig.fields.find(e => e.name === v);
			if (!f) {
				return acc;
			}

			if (f.type === 'relation') {
				// console.log(object);
				return {
					...acc,
					[`relation_set_${v}`]: object[v],
				};
			}

			return {
				...acc,
				[v]: object[v],
			};
		}, {});

	update(entityName: string, object: Record<string, any>, entityConfig: TableConfig, options?: UpdateOptions): any {
		const where = options?.where;
		let toUpdate: unknown[] | undefined;
		if (where?.id) {
			toUpdate = [this.database[entityName][where.id]];
		} else if (!where) {
			toUpdate = Object.values(this.database[entityName]);
		} else {
			toUpdate = Object.values(this.database[entityName]).filter((v: any) => {
				if (where) {
					return Object.keys(where).every(key => v[key] === where[key]);
				}
				return v;
			});
		}
		toUpdate!.forEach(item => {
			Object.entries(object).forEach(([key, value]) => {
				// eslint-disable-next-line no-param-reassign
				(item as any)[key] = value;
			});
		});
		// console.log(this.objectWithRelations(object, entityConfig));
		return this.objectWithRelations(object, entityConfig);
	}

	print(): void {
		// eslint-disable-next-line no-console
		console.log(JSON.stringify(this.database, null, 2));
	}
}
