import type { Schema } from 'react-adminer';
import { EditButton } from 'react-adminer';

export const SCHEMA: Schema = {
	provider: {
		fields: [
			{
				name: 'name',
				nullable: false,
				type: 'string',
			},
			{
				name: 'shortDescription',
				nullable: false,
				type: 'string',
			},
			{
				name: 'description',
				nullable: false,
				type: 'string',
			},
			{
				name: 'url',
				nullable: false,
				type: 'string',
			},
			// {
			// 	name: 'state',
			// 	nullable: true,
			// 	type: 'relation',
			// 	relation: {
			// 		type: 'one',
			// 		entity: 'state',
			// 	},
			// },
			{
				name: 'stateId',
				nullable: true,
				type: 'string',
			},
			{
				name: 'visible',
				nullable: false,
				type: 'boolean',
			},
			{
				name: 'image',
				nullable: true,
				type: 'string',
			},
			{
				name: 'screenshot',
				nullable: true,
				type: 'string',
			},
			// {
			// 	name: 'fromPatterns',
			// 	nullable: false,
			// 	type: 'relation',
			// 	relation: {
			// 		type: 'many',
			// 		entity: 'string',
			// 	},
			// },
			// {
			// 	name: 'categories',
			// 	nullable: false,
			// 	type: 'relation',
			// 	relation: {
			// 		type: 'many',
			// 		entity: 'category',
			// 	},
			// },
			// {
			// 	name: 'tools',
			// 	nullable: false,
			// 	type: 'relation',
			// 	relation: {
			// 		type: 'many',
			// 		entity: 'tool',
			// 	},
			// },
			{
				name: 'labels',
				nullable: false,
				type: 'relation',
				relation: {
					type: 'many',
					entity: 'label',
				},
			},
			{
				name: 'admin_verified',
				nullable: false,
				type: 'boolean',
			},
			// {
			// 	name: 'mailhuntEmail',
			// 	nullable: false,
			// 	type: 'relation',
			// 	relation: {
			// 		type: 'one',
			// 		entity: 'mailhunt-email',
			// 	},
			// },
			{
				name: 'mailhuntEmailId',
				nullable: true,
				type: 'string',
			},
			{
				name: 'creator',
				nullable: false,
				type: 'relation',
				relation: {
					type: 'one',
					entity: 'user',
				},
			},
			{
				name: 'creatorId',
				nullable: false,
				type: 'string',
			},
			{
				name: 'type',
				nullable: false,
				type: 'ProviderType',
			},
			// {
			// 	name: 'specialists',
			// 	nullable: false,
			// 	type: 'relation',
			// 	relation: {
			// 		type: 'many',
			// 		entity: 'specialist',
			// 	},
			// },
			{
				name: 'id',
				nullable: false,
				type: 'string',
			},
			{
				name: 'createdAt',
				nullable: false,
				type: 'string',
			},
		],
	},
	label: {
		fields: [
			{
				name: 'title',
				nullable: false,
				type: 'string',
			},
			{
				name: 'color',
				nullable: false,
				type: 'string',
			},
			{
				name: 'slug',
				nullable: false,
				type: 'string',
			},
			{
				name: 'providers',
				nullable: false,
				type: 'relation',
				relation: {
					type: 'many',
					entity: 'provider',
				},
			},
			{
				name: 'id',
				nullable: false,
				type: 'string',
			},
			{
				name: 'createdAt',
				nullable: false,
				type: 'string',
			},
		],
	},
	state: {
		fields: [
			{
				name: 'id',
				nullable: false,
				type: 'string',
				sortable: true,
				creatable: false,
			},
			{
				name: 'edit',
				type: 'button',
				render: EditButton,
				virtual: true,
			},
			{
				name: 'name',
				nullable: false,
				type: 'string',
			},
			{
				name: 'alpha2code',
				nullable: false,
				type: 'string',
			},
			{
				name: 'visible',
				nullable: false,
				type: 'boolean',
			},
			{
				name: 'createdAt',
				nullable: false,
				type: 'string',
				creatable: false,
			},
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
