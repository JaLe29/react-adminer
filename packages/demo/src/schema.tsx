import type { Schema } from 'react-adminer';
import { EditButton } from 'react-adminer';

export const SCHEMA: Schema = {
	car: {
		fields: [
			{
				name: 'id',
				nullable: false,
				type: 'string',
				sortable: true,
				creatable: false,
				editable: false,
				section: 'primarySection',
			},
			{
				name: 'make',
				nullable: false,
				type: 'string',
				sortable: true,
				creatable: true,
				editable: true,
				section: 'secondarySection',
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
				section: 'primarySection',
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
				name: 'userId',
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
				type: 'virtual',
				render: EditButton,
				virtual: true,
			},
		],
	},
	user: {
		fields: [
			{
				name: 'activationButton',
				virtual: true,
				type: 'virtual',
				// eslint-disable-next-line react/button-has-type
				render: ({ object }: any) => <button>{object.id}</button>,
			},
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
			},
			/* {
				name: 'email',
				nullable: false,
				type: 'string',
			}, */
			// Upraveno pro testovani
			{
				name: 'email',
				type: 'string',
				creatable: false,
				editable: false,
				section: 'primarySection',
			},
			{
				name: 'make',
				nullable: false,
				type: 'string',
				sortable: true,
				creatable: true,
				editable: true,
				section: 'secondarySection',
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
				section: 'primarySection',
			},
			{
				name: 'edit',
				type: 'virtual',
				render: EditButton,
				virtual: true,
				hideInForm: true,
			},
		],
	},
	provider: {
		fields: [
			{
				name: 'name',
				nullable: false,
				type: 'string',
				sortable: true,
				creatable: true,
				editable: true,
			},
			{
				name: 'userId',
				nullable: false,
				type: 'string',
				sortable: true,
				creatable: true,
				editable: true,
			},
			{
				name: 'user',
				nullable: true,
				type: 'string',
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
				name: 'cars',
				nullable: true,
				type: 'relation',
				relation: {
					type: 'many',
					entity: 'car',
				},
			},
			{
				name: 'creatorId',
				nullable: false,
				type: 'string',
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
};
