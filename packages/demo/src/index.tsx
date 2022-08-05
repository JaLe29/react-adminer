import { BrowserRouter, useLocation, Link, Route, Routes, useNavigate } from 'react-router-dom';
import * as ReactDOMClient from 'react-dom/client';
import type { UpdateOptions, SelectOptions, CountOptions, TableConfig, Renders } from 'react-adminer';
import { ReactAdminerProvider, Edit, List } from 'react-adminer';
import { Querier, initQuerier } from '@apengine/querier';

import { useParams } from 'react-router';
import { useState } from 'react';
import { SCHEMA } from './schema';

const ROUTER = {
	functions: { useNavigate, useLocation },
	components: { Link },
};

initQuerier({
	// engineCase: 'snake',
	// host: 'http://localhost:4004',
	//
	engineCase: 'camel',
	host: 'https://apengine.mailhunt.cz',
	authorization: import.meta.env.VITE_API_TOKEN,
});

const container = document.getElementById('app')!;
const root = ReactDOMClient.createRoot(container);

const objectWithRelations = (object: Record<string, any>, entityConfig: TableConfig): Record<string, any> =>
	Object.keys(object).reduce((acc, v) => {
		const f = entityConfig.fields.find(e => e.name === v);
		if (!f) {
			return acc;
		}

		if (f.type === 'relation') {
			return {
				...acc,
				[`relation_set_${v}`]: object[v],
			};
		}

		return {
			...acc,
			[v]: object[v],
		};
	}, {});
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

const insert = async (
	entityName: string,
	object: Record<string, any>,
	entityConfig: TableConfig,
): Promise<string | number> => {
	const r = await Querier.insert<{ id: string | number }>(entityName, objectWithRelations(object, entityConfig));
	return r[0].id;
};

const update = async (
	entityName: string,
	object: Record<string, any>,
	entityConfig: TableConfig,
	options?: UpdateOptions,
): Promise<boolean> => {
	await Querier.update(entityName, objectWithRelations(object, entityConfig), { where: buildWhere(options?.where) });
	return true;
};

const RENDERS: Renders = {
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

const EntitySelection = (): any => {
	const [entityName, setEntityName] = useState<any>('raAdvertisement');
	return (
		<>
			<select
				onChange={v => {
					setEntityName(v.target.value);
				}}
			>
				<option value="state">
					state
				</option>
				<option value="raUser">raUser</option>
				<option value="raAdvertisement">raAdvertisement</option>
				<option value="raImage">raImage</option>
			</select>

			<input
				defaultValue={entityName}
				onChange={v => {
					setEntityName(v.target.value);
				}}
			/>
			<List entityName={entityName} />
		</>
	);
};

root.render(
	<div style={{ background: '#FAFAFA' }}>
		<BrowserRouter>
			<ReactAdminerProvider
				paths={{ editFormPath: '/edit' }}
				dataProvider={{ select, count, insert, update }}
				config={{ schema: SCHEMA }}
				renders={RENDERS}
				router={ROUTER}
			>
				<Routes>
					<Route
						path="/"
						element={
							<>
								<EntitySelection />
								{/* <hr />
								<List entityName="tag" /> */}
							</>
						}
					/>
					<Route path="/edit/:entityName/:id" element={<EditPage />} />
				</Routes>
			</ReactAdminerProvider>
		</BrowserRouter>
	</div>,
);
