import type { Schema } from 'react-adminer';
import { EditButton } from 'react-adminer';

export const SCHEMA: Schema = {
	// raAdvertisement: {
	// 	fields: [
	// 		{
	// 			name: 'id',
	// 			nullable: false,
	// 			creatable: false,
	// 			editable: false,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'created',
	// 			nullable: false,
	// 			creatable: false,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'ra_user_id',
	// 			nullable: true,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'user',
	// 			nullable: false,
	// 			type: 'relation',
	// 			relation: {
	// 				type: 'one',
	// 				entity: 'raUser',
	// 			},
	// 		},
	// 		{
	// 			name: 'title',
	// 			nullable: false,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'text',
	// 			nullable: false,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'cost',
	// 			nullable: false,
	// 			type: 'number',
	// 		},
	// 		{
	// 			name: 'images',
	// 			nullable: false,
	// 			type: 'relation',
	// 			relation: {
	// 				type: 'many',
	// 				entity: 'raImage',
	// 			},
	// 		},
	// 	],
	// },
	// raImage: {
	// 	fields: [
	// 		{
	// 			name: 'id',
	// 			nullable: false,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'created',
	// 			nullable: false,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'title',
	// 			nullable: false,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'url',
	// 			nullable: false,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'advertisementId',
	// 			nullable: true,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'advertisement',
	// 			nullable: false,
	// 			type: 'relation',
	// 			relation: {
	// 				type: 'one',
	// 				entity: 'raAdvertisement',
	// 			},
	// 		},
	// 	],
	// },
	// raUser: {
	// 	fields: [
	// 		{
	// 			name: 'id',
	// 			nullable: false,
	// 			creatable: false,
	// 			editable: false,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'created',
	// 			creatable: false,
	// 			nullable: false,
	// 			type: 'datetime',
	// 		},
	// 		{
	// 			name: 'name',
	// 			nullable: false,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'lastname',
	// 			nullable: false,
	// 			type: 'string',
	// 		},
	// 		/* {
	// 			name: 'email',
	// 			nullable: false,
	// 			type: 'string',
	// 		}, */
	// 		// Upraveno pro testovani
	// 		{
	// 			name: 'email',
	// 			type: 'datetime',
	// 			creatable: false,
	// 			editable: true,
	// 		},
	// 		{
	// 			name: 'advertisements',
	// 			nullable: false,
	// 			type: 'relation',
	// 			relation: {
	// 				type: 'many',
	// 				entity: 'raAdvertisement',
	// 			},
	// 		},
	// 		{
	// 			name: 'edit',
	// 			type: 'button',
	// 			render: EditButton,
	// 			virtual: true,
	// 		},
	// 	],
	// },
	// provider: {
	// 	fields: [
	// 		{
	// 			name: 'name',
	// 			nullable: false,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'shortDescription',
	// 			nullable: false,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'description',
	// 			nullable: false,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'url',
	// 			nullable: false,
	// 			type: 'string',
	// 		},
	// 		// {
	// 		// 	name: 'state',
	// 		// 	nullable: true,
	// 		// 	type: 'relation',
	// 		// 	relation: {
	// 		// 		type: 'one',
	// 		// 		entity: 'state',
	// 		// 	},
	// 		// },
	// 		{
	// 			name: 'stateId',
	// 			nullable: true,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'visible',
	// 			nullable: false,
	// 			type: 'boolean',
	// 		},
	// 		{
	// 			name: 'image',
	// 			nullable: true,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'screenshot',
	// 			nullable: true,
	// 			type: 'string',
	// 		},
	// 		// {
	// 		// 	name: 'fromPatterns',
	// 		// 	nullable: false,
	// 		// 	type: 'relation',
	// 		// 	relation: {
	// 		// 		type: 'many',
	// 		// 		entity: 'string',
	// 		// 	},
	// 		// },
	// 		// {
	// 		// 	name: 'categories',
	// 		// 	nullable: false,
	// 		// 	type: 'relation',
	// 		// 	relation: {
	// 		// 		type: 'many',
	// 		// 		entity: 'category',
	// 		// 	},
	// 		// },
	// 		// {
	// 		// 	name: 'tools',
	// 		// 	nullable: false,
	// 		// 	type: 'relation',
	// 		// 	relation: {
	// 		// 		type: 'many',
	// 		// 		entity: 'tool',
	// 		// 	},
	// 		// },
	// 		{
	// 			name: 'labels',
	// 			nullable: false,
	// 			type: 'relation',
	// 			relation: {
	// 				type: 'many',
	// 				entity: 'label',
	// 			},
	// 		},
	// 		{
	// 			name: 'admin_verified',
	// 			nullable: false,
	// 			type: 'boolean',
	// 		},
	// 		// {
	// 		// 	name: 'mailhuntEmail',
	// 		// 	nullable: false,
	// 		// 	type: 'relation',
	// 		// 	relation: {
	// 		// 		type: 'one',
	// 		// 		entity: 'mailhunt-email',
	// 		// 	},
	// 		// },
	// 		{
	// 			name: 'mailhuntEmailId',
	// 			nullable: true,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'creator',
	// 			nullable: false,
	// 			type: 'relation',
	// 			relation: {
	// 				type: 'one',
	// 				entity: 'user',
	// 			},
	// 		},
	// 		{
	// 			name: 'creatorId',
	// 			nullable: false,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'type',
	// 			nullable: false,
	// 			type: 'ProviderType',
	// 		},
	// 		// {
	// 		// 	name: 'specialists',
	// 		// 	nullable: false,
	// 		// 	type: 'relation',
	// 		// 	relation: {
	// 		// 		type: 'many',
	// 		// 		entity: 'specialist',
	// 		// 	},
	// 		// },
	// 		{
	// 			name: 'id',
	// 			nullable: false,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'createdAt',
	// 			nullable: false,
	// 			type: 'string',
	// 		},
	// 	],
	// },
	// label: {
	// 	fields: [
	// 		{
	// 			name: 'title',
	// 			nullable: false,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'color',
	// 			nullable: false,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'slug',
	// 			nullable: false,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'providers',
	// 			nullable: false,
	// 			type: 'relation',
	// 			relation: {
	// 				type: 'many',
	// 				entity: 'provider',
	// 			},
	// 		},
	// 		{
	// 			name: 'id',
	// 			nullable: false,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'createdAt',
	// 			nullable: false,
	// 			type: 'string',
	// 		},
	// 	],
	// },
	// state: {
	// 	fields: [
	// 		{
	// 			name: 'id',
	// 			nullable: false,
	// 			type: 'string',
	// 			sortable: true,
	// 			creatable: false,
	// 		},
	// 		{
	// 			name: 'edit',
	// 			type: 'button',
	// 			render: EditButton,
	// 			virtual: true,
	// 		},
	// 		{
	// 			name: 'name',
	// 			nullable: false,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'alpha2code',
	// 			nullable: false,
	// 			type: 'string',
	// 		},
	// 		{
	// 			name: 'visible',
	// 			nullable: false,
	// 			type: 'boolean',
	// 		},
	// 		{
	// 			name: 'createdAt',
	// 			nullable: false,
	// 			type: 'string',
	// 			creatable: false,
	// 		},
	// 		{
	// 			name: 'edit',
	// 			type: 'button',
	// 			render: EditButton,
	// 			virtual: true,
	// 		},
	// 	],
	// },
	car: {
		fields: [
			{
				name: 'id',
				nullable: false,
				type: 'string',
				sortable: true,
				creatable: false,
				editable: false,
			},
			{
				name: 'make',
				nullable: false,
				type: 'string',
				sortable: true,
				creatable: true,
				editable: true,
			},
			{
				name: 'model',
				nullable: false,
				type: 'string',
				sortable: true,
				creatable: true,
				editable: true,
			},
			{
				name: 'year',
				nullable: false,
				type: 'number',
				sortable: true,
				creatable: true,
				editable: true,
			},
			{
				name: 'color',
				nullable: false,
				type: 'string',
				sortable: true,
				creatable: true,
				editable: true,
			},
			{
				name: 'user',
				nullable: true,
				type: 'relation',
				relation: {
					type: 'one',
					entity: 'user',
				},
			},
			{
				name: 'edit',
				type: 'button',
				render: EditButton,
				virtual: true,
			},
		],
	},
	user: {
		fields: [
			{
				name: 'id',
				nullable: false,
				type: 'string',
				sortable: true,
				creatable: false,
				editable: false,
			},
			{
				name: 'created',
				sortable: false,
				creatable: false,
				type: 'datetime',
			},
			{
				name: 'name',
				nullable: false,
				type: 'string',
				sortable: true,
				creatable: true,
				editable: true,
			},
			{
				name: 'lastname',
				nullable: false,
				type: 'string',
				sortable: true,
				creatable: true,
				editable: true,
			},
			{
				name: 'email',
				nullable: false,
				type: 'string',
				sortable: true,
				creatable: true,
				editable: true,
			},
			{
				name: 'car',
				nullable: true,
				type: 'relation',
				relation: {
					type: 'many',
					entity: 'car',
				},
			},
			{
				name: 'edit',
				type: 'button',
				render: EditButton,
				virtual: true,
			},
		],
	},
};
