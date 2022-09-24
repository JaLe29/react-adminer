<<<<<<< HEAD
interface Options {
=======
export interface Options {
>>>>>>> 29f84b992e98dd4616fb51b889e8d499cd00e5be
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
	select(entityName: string, options: Options = {}): any {
		const { where, limit, offset, fields, orderBy } = options;

		const entityPart = this.database[entityName] ?? [];
		let toSearchPart: any[] = entityPart;

		if (where?.id) {
			toSearchPart = [entityPart[where.id]];
		} else {
			toSearchPart = Object.keys(toSearchPart).map((key: any) => toSearchPart[key]);
		}

		let toResponse = toSearchPart.filter(v => {
			if (where) {
				return Object.keys(where).every(key => v[key] === where[key]);
			}
			return v;
		});

		if (fields) {
			toResponse = toResponse.map((loopObject: any): any =>
				fields.reduce((acc, v) => ({ ...acc, [v]: loopObject[v] }), {}),
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

	count(entityName: string, where: any): number {
		return this.select(entityName, where).length;
	}

	print(): void {
		// eslint-disable-next-line no-console
		console.log(JSON.stringify(this.database, null, 2));
	}
}
