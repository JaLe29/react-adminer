interface Options {
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
	select(entityName: string, options: Options): any {
		const { where, limit, offset, fields, orderBy } = options;

		const entityPart = this.database[entityName] ?? [];
		let toSearchPart: any[] = entityPart;

		if (where?.id) {
			toSearchPart = [entityPart[where.id]];
		} else {
			toSearchPart = Object.keys(toSearchPart).map((key: any) => toSearchPart[key]);
		}

		const toResponse = toSearchPart.filter(v => {
			if (where) {
				return Object.keys(where).every(key => v[key] === where[key]);
			}
			return null; //
		});

		if (fields) {
			Object.keys(toResponse).map((p: any) => {
				const keys = Object.keys(toResponse[p]);
				keys.forEach(key => {
					if (!fields.includes(key)) {
						delete toResponse[p][key];
					}
				});
				return toResponse;
			});
			return toResponse;
		}

		if (orderBy) {
			Object.keys(orderBy).map((keyOrderBy: any) => {
				if (orderBy[keyOrderBy] === 'asc') {
					return toResponse.sort((a, b) => a[keyOrderBy].localeCompare(b[keyOrderBy]));
				}
				if (orderBy[keyOrderBy] === 'desc') {
					return toResponse.sort((a, b) => b[keyOrderBy].localeCompare(a[keyOrderBy]));
				}
				return null;
			});
		}

		if (limit) {
			return toResponse.slice(0, limit);
		}

		if (offset) {
			return toResponse.slice(offset);
		}

		console.log(toResponse);
		return toResponse;
	}

	count(entityName: string, where: any): number {
		return this.select(entityName, where).length;
	}

	print(): void {
		console.log(JSON.stringify(this.database, null, 2));
	}
}
