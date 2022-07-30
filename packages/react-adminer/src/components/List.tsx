/* eslint-disable indent */
import { useEffect, useState } from 'react';
import * as ReactIs from 'react-is';
import { Alert, Button, Divider, notification, Space, Table as TableAntd } from 'antd';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import { useSelect } from '../hooks/useSelect';
import { useReactAdminerContext } from '../hooks/useReactAdminerContext';
import type { PrimitiveField, TableField } from '../types';
import useStateParams from '../hooks/useStateParams';
import { useEntityConfig } from '../hooks/useEntityConfig';
import Pagination from './Pagination';
import Right from './Right';
import Box from './Box';
import TableFilter from './TableFIlter';
import { getPrimitiveFields, isPrimitiveFieldType, isVirtualFieldType } from '../utils/config';
import { useCount } from '../hooks/useCount';
import { NEW_KEY } from '../const';
import CellEditInput from './CellEditInput';

interface Props {
	entityName: string;
	filter?: boolean;
}

export const List: React.FC<Props> = ({ entityName, filter = true }) => {
	const { paths, router } = useReactAdminerContext();
	const config = useEntityConfig({ entityName });

	const [sort, setSort] = useState<Record<string, 'asc' | 'desc'> | undefined>(undefined);
	const [where, setWhere] = useState<Record<string, any> | undefined>();

	const [pageSize, setPageSize] = useStateParams(10, 'ps', v => +v);
	const [page, setPage] = useStateParams(0, 'p', v => +v);

	const [activeRecord, setActiveRecord] = useState<{ id: string; property: string } | undefined>();

	const fields = config?.fields ?? [];
	const primitiveFields = getPrimitiveFields(fields);
	const targetPrimitiveFields = primitiveFields.filter((f: PrimitiveField & { editable?: boolean }) => {
		if (isVirtualFieldType(f)) {
			return false;
		}
		return true;
	});

	const { data, loading } = useSelect<any>(
		entityName,
		{
			offset: page * pageSize,
			limit: pageSize,
			fields: config?.fields.filter(c => isPrimitiveFieldType(c) && !c.virtual).map(c => c.name),
			orderBy: sort,
			where,
		},
		!config,
	);

	useEffect(() => {
		if (data) {
			setState(data);
			setOriginal(data);
		}
	}, [data]);

	const [state, setState] = useState<any>({});
	const [original, setOriginal] = useState<any>({});

	const getPayload = (): any => {
		const payload = Object.keys(state).reduce((acc, v) => {
			if (state[v] !== original[v]) {
				return {
					...acc,
					[v]: state[v],
				};
			}
			return acc;
		}, {});
		return payload;
	};

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

	const handleItemClick = (e: any, field: TableField, object: any): void => {
		if (e?.detail === 2) {
			console.log(field);
			if ((field as any).creatable === false) {
				notification.error({
					message: `${field.name} is forbidden to change the value`,
				});
			} else {
				setActiveRecord({ id: object.id, property: field.name });
			}
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
			? (v: any, object: any) => {
					if (object.id === activeRecord?.id && activeRecord?.property === f.name) {
						return (
							<CellEditInput
								setActiveRecord={setActiveRecord}
								propertyName={f.name}
								value={v}
								entityName={entityName}
								config={config}
								id={activeRecord.id}
								field={f}
							/>
						);
					}
					return (
						<div onClick={(e: any) => handleItemClick(e, f, object)}>
							{f.render?.({ value: v, object, entity: entityName })}
						</div>
					);
			  }
			: (v: any, object: any) => {
					if (object.id === activeRecord?.id && activeRecord?.property === f.name) {
						return (
							<CellEditInput
								setActiveRecord={setActiveRecord}
								propertyName={f.name}
								value={v}
								entityName={entityName}
								config={config}
								id={activeRecord.id}
								field={f}
							/>
						);
					}
					if (ReactIs.isValidElementType(v) || v === undefined || v === null) {
						return <div onClick={(e: any) => handleItemClick(e, f, object)}>{v}</div>;
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
			{filter && (
				<>
					<TableFilter config={config} setWhere={setWhere} setPage={setPage} />
					<Divider />
				</>
			)}
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
