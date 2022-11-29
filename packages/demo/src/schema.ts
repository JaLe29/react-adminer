import type { Schema } from 'react-adminer';
import { EditButton } from 'react-adminer';
import TestVirtualComponent from './TestVirtualComponent';

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
				label: 'MAKE',
				nullable: false,
				type: 'string',
				sortable: true,
				creatable: true,
				editable: true,
				section: 'secondarySection',
				helper: 'Výrobce vozu',
			},
			{
				name: 'model',
				nullable: false,
				type: 'string',
				sortable: true,
				creatable: true,
				editable: true,
				helper: 'Model vozu',
			},
			{
				name: 'year',
				nullable: false,
				type: 'number',
				sortable: true,
				creatable: true,
				editable: true,
				helper: 'Rok výroby vozu',
			},
			{
				name: 'color',
				label: 'COLOR',
				nullable: false,
				type: 'string',
				sortable: true,
				creatable: true,
				editable: true,
				helper: 'Barva laku vozu',
				grid: 8,
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
				name: 'createdDatetime',
				nullable: true,
				type: 'datetime',
				sortable: true,
				creatable: true,
				editable: true,
			},
			{
				name: 'createdDate',
				nullable: true,
				type: 'date',
				sortable: true,
				creatable: true,
				editable: true,
			},
			{
				name: 'serialNumber',
				nullable: true,
				type: 'number',
				sortable: true,
				creatable: true,
				editable: true,
				grid: 24,
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
			{
				name: 'test',
				type: 'virtual',
				render: TestVirtualComponent,
				virtual: true,
				hideInForm: false,
				// hideInTable: true,
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
				name: 'cars',
				nullable: true,
				type: 'relation',
				relation: {
					type: 'many',
					entity: 'car',
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
};
