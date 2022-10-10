/* eslint-disable no-console */
import { BrowserRouter, useLocation, Link, Route, Routes, useNavigate } from 'react-router-dom';
import * as ReactDOMClient from 'react-dom/client';
import type {
	UpdateOptions,
	SelectOptions,
	CountOptions,
	TableConfig,
	ReactAdminerTableConfig,
	Renders,
} from 'react-adminer';
import { ReactAdminerProvider, Edit, List, FavoriteList } from 'react-adminer';
import { Querier, initQuerier } from '@apengine/querier';

import { useParams } from 'react-router';
import { useState } from 'react';
import { MOCK_CARS, MOCK_USERS } from './demodb_data';
import { Db } from './demodb';
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
	host: 'https://dev-apengine.mailhunt.cz',
	authorization: import.meta.env.VITE_API_TOKEN,
});

const container = document.getElementById('app')!;
const root = ReactDOMClient.createRoot(container);

const db = new Db();
MOCK_CARS.forEach(c => db.insert('car', c));
MOCK_USERS.forEach(c => db.insert('user', c));
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
/*
const buildWhere = (where?: Record<string, any>): any => {
	if (!where) {
		return undefined;
	}

	return Object.keys(where).reduce((acc, v) => ({ ...acc, [v]: { _like: `%${where[v]}%` } }), {});
};
*/
const select = (entityName: string, options?: SelectOptions): Promise<any[]> =>
	db.select(entityName, options, SCHEMA) as Promise<any[]>;

const count = (entityName: string, options?: CountOptions): Promise<number> =>
	db.count(entityName, options?.where, SCHEMA) as unknown as Promise<number>;

const insert = (entityName: string, object: Record<string, any>): Promise<string | number> =>
	db.insert(entityName, object) as any;

const update = (
	entityName: string,
	object: Record<string, any>,
	entityConfig: TableConfig,
	options?: UpdateOptions,
): Promise<boolean> => {
	db.update(entityName, object, entityConfig, options);
	return Promise.resolve(true);
};
/*
const insert = async (
	entityName: string,
	object: Record<string, any>,
	entityConfig: TableConfig,
): Promise<string | number> => {
	const r = await Querier.insert<{ id: string | number }>(entityName, objectWithRelations(object, entityConfig));
	return r[0].id;
};
*/
/*
const update = async (
	entityName: string,
	object: Record<string, any>,
	entityConfig: TableConfig,
	options?: UpdateOptions,
): Promise<boolean> => {
	await Querier.update(entityName, objectWithRelations(object, entityConfig), { where: buildWhere(options?.where) });
	return true;
};
*/
const RENDERS: Renders = {
	// _global: {
	// table: {
	// 	createdAt: ({ value }: any) => <div>{`Date: ${value}`}</div>,
	// 	created: ({ value }: any) => <div>{`Date: ${value}`}</div>,
	// },
	// },
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
	user: {
		table: {
			cars: (props: any) => <div>{props.object.cars.map((c: { id: string }) => c.id)}</div>,
		},
	},
	car: {
		table: {
			user: (props: any) => <div>{props.object.user?.lastname}</div>,
		},
	},
};

const TABLE_CONFIG: ReactAdminerTableConfig = {
	// _global: {
	// defaultSort: { created: 'desc' },
	// },
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
	const [entityName, setEntityName] = useState<any>('car');
	return (
		<>
			<select
				onChange={v => {
					setEntityName(v.target.value);
				}}
			>
				<option value="car">car</option>
				<option value="user">user</option>
			</select>

			{/* <input
				defaultValue={entityName}
				onChange={v => {
					setEntityName(v.target.value);
				}}
			/> */}
			<div key={entityName}>
				<List entityName={entityName} />
				<FavoriteList entityName={entityName} />
			</div>
		</>
	);
};

root.render(
	<div style={{ background: '#FAFAFA' }}>
		<BrowserRouter>
			<ReactAdminerProvider
				paths={{ editFormPath: '/edit' }}
				dataProvider={{ select, count, insert, update }}
				config={{ schema: SCHEMA, table: TABLE_CONFIG }}
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
