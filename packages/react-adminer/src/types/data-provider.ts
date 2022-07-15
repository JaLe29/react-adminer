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
