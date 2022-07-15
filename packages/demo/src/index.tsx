import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import * as ReactDOMClient from 'react-dom/client';
import type { SelectOptions, CountOptions } from '@react-adminer/client';
import { ReactAdminerProvider, Edit, List } from '@react-adminer/client';
import { Querier, initQuerier } from '@apengine/querier';
import React from 'react';
import { useParams } from 'react-router';
import { SCHEMA } from './schema';

initQuerier({
	engineCase: 'camel',
	host: 'https://apengine.mailhunt.cz',
	authorization: import.meta.env.VITE_API_TOKEN,
});

const container = document.getElementById('app')!;
const root = ReactDOMClient.createRoot(container);

const buildWhere = (where?: Record<string, any>): any => {
	if (!where) {
		return undefined;
	}

	return Object.keys(where).reduce((acc, v) => ({ ...acc, [v]: { _eq: where[v] } }), {});
};

const select = async (entityName: string, options?: SelectOptions): Promise<any[]> => {
	const r = await Querier.select(entityName, {
		fields: options?.fields,
		limit: options?.limit,
		offset: options?.offset,
		orderBy: options?.orderBy,
		where: buildWhere(options?.where),
	});

	return r;
};

const count = async (entityName: string, options?: CountOptions): Promise<number> => {
	const r = await Querier.selectAggregate<{ count: number }>(`${entityName}Aggregate`, {
		fields: ['count'],
		where: buildWhere(options?.where),
	});

	return r.count;
};

const RENDERS: Record<string, Record<'table', Record<string, React.FC>>> = {
	state: {
		table: {
			alpha2code: ({ value }: any) => (
				<img
					width={50}
					src={`https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/${value}.svg`}
					alt={value}
				/>
			),
		},
	},
};

const EditPage: React.FC = () => {
	const { entityName, id } = useParams();

	const back = (
		<Link to="/">
			<button type="submit">BACK</button>
		</Link>
	);
	if (!entityName || !id) {
		return (
			<>
				{back}
				<br />
				No entityName or id
			</>
		);
	}
	return (
		<>
			{back}
			<Edit entityName={entityName} id={id} />
		</>
	);
};

root.render(
	<div style={{ background: '#FAFAFA' }}>
		<BrowserRouter>
			<ReactAdminerProvider
				paths={{ editFormPath: '/edit' }}
				dataProvider={{ select, count }}
				config={{ schema: SCHEMA }}
				renders={RENDERS}
			>
				<Routes>
					<Route path="/" element={<List entityName="state" />} />
					<Route path="/edit/:entityName/:id" element={<EditPage />} />
				</Routes>
			</ReactAdminerProvider>
		</BrowserRouter>
	</div>,
);
