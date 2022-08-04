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
				type: 'number',
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
