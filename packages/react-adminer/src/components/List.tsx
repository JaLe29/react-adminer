import { useState } from 'react';
// import { useEntityConfig } from 'hooks/useEntityConfig';

/* eslint-disable prettier/prettier */
import * as ReactIs from 'react-is';
import { Alert, Button, Divider, Space, Table as TableAntd } from 'antd';
// import { capitalCase } from 'change-case';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
// import useUrlQuery from 'hooks/useUrlQuery';
import { useSelect } from '../hooks/useSelect';
import { useReactAdminerContext } from '../hooks/useReactAdminerContext';
import type { TableField } from '../types';
import useStateParams from '../hooks/useStateParams';
// import { useSelect, useSelectAggregate } from '@apengine/react-querier';
import { useEntityConfig } from '../hooks/useEntityConfig';
// import {  isPrimitiveFieldType } from '../utils/config';
// import type { TableConfig, TableField } from '../types/config';
import Pagination from './Pagination';
import Right from './Right';
import Box from './Box';
import TableFilter from './TableFIlter';
import { isPrimitiveFieldType } from '../utils/config';
import { useCount } from '../hooks/useCount';
import { NEW_KEY } from '../const';

interface Props {
	entityName: string;
	filter?:boolean;
}


export const List: React.FC<Props> = ({ entityName ,filter=true}) => {
	const { paths, router } = useReactAdminerContext();
	const config = useEntityConfig({ entityName });

	const [sort, setSort] = useState<Record<string, 'asc' | 'desc'> | undefined>(undefined);
	const [where, setWhere] = useState<Record<string, any> | undefined>();

	const [pageSize, setPageSize] = useStateParams(10, 'ps', (v)=>+v);
	const [page, setPage] = useStateParams(0, 'p', (v)=>+v);


	const { data, loading } = useSelect<any>(entityName, {
		offset: page * pageSize,
		limit: pageSize,
		fields: config?.fields.filter(c => isPrimitiveFieldType(c) && !c.virtual).map(c => c.name),
		orderBy: sort,
		where,
	}, !config);

	const { data: dataCount, loading: loadingCount } = useCount(entityName, { where }, !config);

	if (!config) {
		return <div>CONFIG NOT FOUND!</div>;
	}

	const onPaginationChange = (p: number, ps: number): void => {
		if (ps !== pageSize) {
			setPage(0);
			setPageSize(ps);
		} else {
			setPage(p);
			setPageSize(ps);
		}
	};


	const columns = config.fields.map((f: TableField) => ({
		// name: capitalCase(f.name),
		name: f.name,
		title: (
			<Box display="flex" justifyContent="space-between">
				{/* <Box>{capitalCase(f.name)}</Box> */}
				<Box>{f.name}</Box>
				{f.sortable && (
					<Box>
						<Space>
							<Button
								icon={<SortAscendingOutlined />}
								type={sort?.key === f.name && sort.order === 'asc' ? 'primary' : undefined}
								onClick={() => setSort({ [f.name]: 'asc' })}
							/>
							<Button
								icon={<SortDescendingOutlined />}
								type={sort?.key === f.name && sort.order === 'desc' ? 'primary' : undefined}
								onClick={() => setSort({ [f.name]: 'desc' })}
							/>
						</Space>
					</Box>
				)}
			</Box>
		),
		dataIndex: f.name,
		render: f.render
			? (v: any, object: any) => f.render?.({ value: v, object, entity: entityName })
			: (v: any) => {
				if (ReactIs.isValidElementType(v) || v === undefined || v === null) {
					return v;
				}
				return <Alert message="Invalid element" type="error" showIcon />;
			  },
	}));
	const Link = router?.components.Link;
	return (
		<>
			<Right>
				<Button>
					<Link to={`${paths?.editFormPath ?? '/entity/edit'}/${entityName}/${NEW_KEY}`}>
						Create
						{entityName}
					</Link>
				</Button>
			</Right>
			<br />
			{
				filter && (
					<>
						<TableFilter config={config} setWhere={setWhere} setPage={setPage} />
						<Divider />
					</>
				)
			}
			<TableAntd
				rowKey="id"
				footer={() => (
					<Right>
						<Pagination
							page={page}
							pageSize={pageSize}
							totalItems={dataCount}
							loading={loadingCount}
							onChange={onPaginationChange}
						/>
					</Right>
				)}
				loading={loading}
				dataSource={data}
				columns={columns}
				pagination={false}
			/>
		</>
	);
};
