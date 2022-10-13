/* eslint-disable no-console */
import { BrowserRouter, useLocation, Link, Route, Routes, useNavigate } from 'react-router-dom';
import * as ReactDOMClient from 'react-dom/client';
import type { ReactAdminerTableConfig, Renders } from 'react-adminer';
import { ReactAdminerProvider, Edit, List, FavoriteList } from 'react-adminer';
import { useParams } from 'react-router';
import { useState } from 'react';
import { count, insert, select, update } from './DataLoaders';
import { SCHEMA } from './schema';

const ROUTER = {
	functions: { useNavigate, useLocation },
	components: { Link },
};

const container = document.getElementById('app')!;
const root = ReactDOMClient.createRoot(container);

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

const TABLE_CONFIG: ReactAdminerTableConfig = {};

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
