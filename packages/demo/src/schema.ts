import type { Schema } from 'react-adminer';
import { EditButton } from 'react-adminer';

export const SCHEMA: any = {
	apengine_validator: {
		fields: [
			{ name: 'id', type: 'string', sortable: true, creatable: false, editable: false },
			{ name: 'created', type: 'string', sortable: true, creatable: false, editable: false },
			{ name: 'name', type: 'string', sortable: true, creatable: true, editable: true },
			{ name: 'body', type: 'string', sortable: true, creatable: true, editable: true },
			{ name: 'system', type: 'string', sortable: true, creatable: true, editable: true, nullable: true },
			{ name: 'edit', type: 'button', virtual: true },
		],
	},
	apengine_req_logger: {
		fields: [
			{ name: 'id', type: 'string', sortable: true, creatable: false, editable: false },
			{ name: 'created', type: 'string', sortable: true, creatable: false, editable: false },
			{ name: 'operation', type: 'string', sortable: true, creatable: true, editable: true },
			{ name: 'entityId', type: 'string', sortable: true, creatable: true, editable: true, nullable: true },
			{ name: 'entities', type: 'relation', relation: { type: 'one', entity: 'apengine_entity' } },
			{ name: 'edit', type: 'button', virtual: true },
		],
	},
	test: {
		fields: [
			{ name: 'id', type: 'string', sortable: true, creatable: false, editable: false },
			{ name: 'created', type: 'string', sortable: true, creatable: false, editable: false },
			{ name: 'b', type: 'string', sortable: true, creatable: true, editable: true },
			{ name: 'edit', type: 'button', virtual: true },
		],
	},
	apengine_token: {
		fields: [
			{ name: 'id', type: 'string', sortable: true, creatable: false, editable: false },
			{ name: 'created', type: 'string', sortable: true, creatable: false, editable: false },
			{ name: 'token', type: 'string', sortable: true, creatable: true, editable: true },
			{ name: 'name', type: 'string', sortable: true, creatable: true, editable: true },
			{ name: 'exp', type: 'string', sortable: true, creatable: true, editable: true },
			{ name: 'edit', type: 'button', virtual: true },
		],
	},
	apengine_logger: {
		fields: [
			{ name: 'id', type: 'string', sortable: true, creatable: false, editable: false },
			{ name: 'created', type: 'string', sortable: true, creatable: false, editable: false },
			{ name: 'message', type: 'string', sortable: true, creatable: true, editable: true },
			{ name: 'edit', type: 'button', virtual: true },
		],
	},
	apengine_action: {
		fields: [
			{ name: 'id', nullable: false, type: 'string', sortable: true, creatable: false },
			{ name: 'url', nullable: false, type: 'string', creatable: true },
			{ name: 'before_insert', type: 'boolean', nullable: true, hideInTable: true },
			{ name: 'after_insert', type: 'boolean', nullable: true, hideInTable: true },
			{ name: 'before_update', type: 'boolean', nullable: true, hideInTable: true },
			{ name: 'after_update', type: 'boolean', nullable: true, hideInTable: true },
			{ name: 'before_delete', type: 'boolean', nullable: true, hideInTable: true },
			{ name: 'after_delete', type: 'boolean', nullable: true, hideInTable: true },
			{ name: 'after_select', type: 'boolean', nullable: true, hideInTable: true },
			{ name: 'edit', type: 'button', virtual: true },
			{
				name: 'entities',
				type: 'relation',
				relation: { type: 'many', entity: 'apengine_entity' },
				hideInTable: true,
			},
			{
				name: 'edit',
				type: 'button',
				render: EditButton,
				virtual: true,
			},
		],
	},
	apengine_storage: {
		fields: [
			{ name: 'id', type: 'string', sortable: true, creatable: false, editable: false },
			{ name: 'created', type: 'string', sortable: true, creatable: false, editable: false },
			{ name: 'keyName', type: 'string', sortable: true, creatable: true, editable: true },
			{ name: 'type', type: 'string', sortable: true, creatable: true, editable: true },
			{ name: 'prefix', type: 'string', sortable: true, creatable: true, editable: true, nullable: true },
			{ name: 'edit', type: 'button', virtual: true },
		],
	},
	apengine_entity: {
		fields: [
			{ name: 'id', type: 'string', sortable: true, creatable: false, editable: false },
			{ name: 'created', type: 'string', sortable: true, creatable: false, editable: false },
			{ name: 'storageId', type: 'string', sortable: true, creatable: true, editable: true },
			{ name: 'name', type: 'string', sortable: true, creatable: true, editable: true },
			{ name: 'dbName', type: 'string', sortable: true, creatable: true, editable: true, nullable: true },
			{ name: 'fields', type: 'string', sortable: true, creatable: true, editable: true },
			{ name: 'actions', type: 'relation', relation: { type: 'many', entity: 'apengine_action' } },
			{ name: 'requests', type: 'relation', relation: { type: 'many', entity: 'apengine_req_logger' } },
			{ name: 'edit', type: 'button', virtual: true },
		],
	},
};

// export const SCHEMA = {
// 	user: {
// 		fields: [
// 			{ name: 'id', type: 'string', sortable: true, creatable: false, editable: false },
// 			{ name: 'created', type: 'string', sortable: true, creatable: false, editable: false },
// 			{ name: 'tags', type: 'relation', relation: { type: 'many', entity: 'tag' } },
// 			{ name: 'edit', type: 'button', virtual: true },
// 			{
// 				name: 'edit',
// 				type: 'button',
// 				render: EditButton,
// 				virtual: true,
// 			},
// 		],
// 	},
// 	apengine_validator: {
// 		fields: [
// 			{ name: 'id', type: 'string', sortable: true, creatable: false, editable: false },
// 			{ name: 'created', type: 'string', sortable: true, creatable: false, editable: false },
// 			{ name: 'name', type: 'string', sortable: true, creatable: true, editable: true },
// 			{ name: 'body', type: 'string', sortable: true, creatable: true, editable: true },
// 			{ name: 'system', type: 'string', sortable: true, creatable: true, editable: true, nullable: true },
// 			{ name: 'edit', type: 'button', virtual: true },
// 		],
// 	},
// 	apengine_token: {
// 		fields: [
// 			{ name: 'id', type: 'string', sortable: true, creatable: false, editable: false },
// 			{ name: 'created', type: 'string', sortable: true, creatable: false, editable: false },
// 			{ name: 'token', type: 'string', sortable: true, creatable: true, editable: true },
// 			{ name: 'name', type: 'string', sortable: true, creatable: true, editable: true },
// 			{ name: 'exp', type: 'string', sortable: true, creatable: true, editable: true },
// 			{ name: 'edit', type: 'button', virtual: true },
// 		],
// 	},
// 	tag: {
// 		fields: [
// 			{ name: 'id', type: 'string', sortable: true, creatable: false, editable: false },
// 			{ name: 'created', type: 'string', sortable: true, creatable: false, editable: false },
// 			{ name: 'color', type: 'string', sortable: true, creatable: true, editable: true },
// 			{ name: 'userId', type: 'string', sortable: true, creatable: true, editable: true, nullable: true },
// 			{ name: 'user', type: 'relation', relation: { type: 'one', entity: 'user' } },
// 			{ name: 'edit', type: 'button', virtual: true },
// 			{
// 				name: 'edit',
// 				type: 'button',
// 				render: EditButton,
// 				virtual: true,
// 			},
// 		],
// 	},
// 	apengine_action: {
// 		fields: [
// 			{ name: 'id', type: 'string', sortable: true, creatable: false, editable: false },
// 			{ name: 'created', type: 'string', sortable: true, creatable: false, editable: false },
// 			{ name: 'name', type: 'string', sortable: true, creatable: true, editable: true },
// 			{ name: 'url', type: 'string', sortable: true, creatable: true, editable: true },
// 			{ name: 'before_insert', type: 'string', sortable: true, creatable: true, editable: true, nullable: true },
// 			{ name: 'after_insert', type: 'string', sortable: true, creatable: true, editable: true, nullable: true },
// 			{ name: 'before_update', type: 'string', sortable: true, creatable: true, editable: true, nullable: true },
// 			{ name: 'after_update', type: 'string', sortable: true, creatable: true, editable: true, nullable: true },
// 			{ name: 'before_delete', type: 'string', sortable: true, creatable: true, editable: true, nullable: true },
// 			{ name: 'after_delete', type: 'string', sortable: true, creatable: true, editable: true, nullable: true },
// 			{ name: 'after_select', type: 'string', sortable: true, creatable: true, editable: true, nullable: true },
// 			{ name: 'entities', type: 'relation', relation: { type: 'many', entity: 'apengine_entity' } },
// 			{ name: 'edit', type: 'button', virtual: true },
// 		],
// 	},
// 	apengine_logger: {
// 		fields: [
// 			{ name: 'id', type: 'string', sortable: true, creatable: false, editable: false },
// 			{ name: 'created', type: 'string', sortable: true, creatable: false, editable: false },
// 			{ name: 'message', type: 'string', sortable: true, creatable: true, editable: true },
// 			{ name: 'edit', type: 'button', virtual: true },
// 		],
// 	},
// 	apengine_storage: {
// 		fields: [
// 			{ name: 'id', type: 'string', sortable: true, creatable: false, editable: false },
// 			{ name: 'created', type: 'string', sortable: true, creatable: false, editable: false },
// 			{ name: 'keyName', type: 'string', sortable: true, creatable: true, editable: true },
// 			{ name: 'type', type: 'string', sortable: true, creatable: true, editable: true },
// 			{ name: 'prefix', type: 'string', sortable: true, creatable: true, editable: true, nullable: true },
// 			{ name: 'edit', type: 'button', virtual: true },
// 		],
// 	},
// 	apengine_entity: {
// 		fields: [
// 			{ name: 'id', type: 'string', sortable: true, creatable: false, editable: false },
// 			{ name: 'created', type: 'string', sortable: true, creatable: false, editable: false },
// 			{ name: 'storageId', type: 'string', sortable: true, creatable: true, editable: true },
// 			{ name: 'name', type: 'string', sortable: true, creatable: true, editable: true },
// 			{ name: 'dbName', type: 'string', sortable: true, creatable: true, editable: true, nullable: true },
// 			{ name: 'fields', type: 'string', sortable: true, creatable: true, editable: true },
// 			{ name: 'actions', type: 'relation', relation: { type: 'many', entity: 'apengine_action' } },
// 			{ name: 'edit', type: 'button', virtual: true },
// 		],
// 	},
// };
