import type { Schema } from 'react-adminer';
import { EditButton } from 'react-adminer';

export const SCHEMA: Schema = {
	state: {
		fields: [
			{
				name: 'id',
				nullable: false,
				type: 'string',
				sortable: true,
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
			},
		],
	},
};
