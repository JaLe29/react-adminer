/* eslint-disable indent */
import { useState } from 'react';
import ReactIs from 'react-is';
import { Alert, Button, Divider, notification, Space, Table as TableAntd } from 'antd';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import { useSelect } from '../hooks/useSelect';
import { useReactAdminerContext } from '../hooks/useReactAdminerContext';
import type { TableConfig, TableField } from '../types';
import useStateParams from '../hooks/useStateParams';
import { useEntityConfig } from '../hooks/useEntityConfig';
import Pagination from './Pagination';
import Right from './Right';
import Box from './Box';
import TableFilter from './TableFIlter';
import { isPrimitiveFieldType, isRelationFieldType } from '../utils/config';
import { useCount } from '../hooks/useCount';
import { NEW_KEY } from '../const';
import CellEditInput from './CellEditInput';
import Highlighted from './Highlight';

const getHighlighted = (value: any, field: TableField, where: Record<string, any> | undefined): any => {
	if (!where?.[field.name]) {
		return value;
	}
	return <Highlighted text={value} highlight={where[field.name]} />;
	// name
	// console.log({ value, where: where[field.name], fieldName: field.name });
	// return value.replace(new RegExp(where[field.name], 'i'), (match: any) => `<mark>${match}</mark>`);
};

interface Props {
	entityName: string;
	filter?: boolean;
	entityConfig?: TableConfig | undefined;
}

export const List: React.FC<Props> = ({ entityConfig, entityName, filter = true }) => {
	const { paths, router } = useReactAdminerContext();
	const { config: globalConfig } = useReactAdminerContext();
	const config = useEntityConfig({ entityName, entityConfig });

	const [sort, setSort] = useState<Record<string, 'asc' | 'desc'> | undefined>(undefined);
	const [where, setWhere] = useState<Record<string, any> | undefined>();

	const [pageSize, setPageSize] = useStateParams(10, 'ps', v => +v);
	const [page, setPage] = useStateParams(0, 'p', v => +v);

	const [activeRecord, setActiveRecord] = useState<{ id: string; property: string } | undefined>();
	const { data, loading } = useSelect<any>(
		entityName,
		{
			offset: page * pageSize,
			limit: pageSize,
			// fields: config?.fields
			// 	.filter(c => isPrimitiveFieldType(c) && !c.virtual && c.hideInTable !== true)
			// 	.map(c => c.name),
			fields: config?.fields
				.filter(c => !c.virtual && c.hideInTable !== true)
				.map(c => {
					if (isRelationFieldType(c)) {
						const schema = globalConfig?.schema[c.name];
						return (
							schema?.fields
								.filter(s => isPrimitiveFieldType(s) && !s.virtual && s.hideInTable !== true)
								.map(s => `${c.name}.${s.name}`) ?? []
						);
					}
					return c.name;
				})
				.flat(),
			orderBy: sort,
			where,
		},
		!config,
	);

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
			if ((field as any).creatable === false) {
				notification.error({
					message: `${field.name} is forbidden to change the value`,
				});
			} else {
				setActiveRecord({ id: object.id, property: field.name });
			}
		}
	};

	const columns = config.fields
		.filter(f => f.hideInTable !== true)
		.map((f: TableField) => ({
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
								/>
							);
						}
						if (ReactIs.isValidElementType(v) || v === undefined || v === null || isPrimitiveFieldType(f)) {
							const result = v;
							// if (where) {
							// 	Object.keys(object).map(objectKey => {
							// 		Object.keys(where).map(filterKey => {
							// 			if (filterKey === objectKey && object[objectKey].includes(where[filterKey])) {
							// 				console.log(`${object[objectKey]} ${where[filterKey]}`);
							// 				// console.log(`${filterKey} ${objectKey}`);
							// 				// console.log(result);
							// 				result = v?.replace(
							// 					new RegExp(where[filterKey]),
							// 					(match: any) => `${match}X`,
							// 				);
							// 				return (
							// 					<div onClick={(e: any) => handleItemClick(e, f, object)}>{result}</div>
							// 				);
							// 			}
							// 		});
							// 		return <div onClick={(e: any) => handleItemClick(e, f, object)}>{result}</div>;
							// 	});
							// }
							return (
								<div onClick={(e: any) => handleItemClick(e, f, object)}>
									{getHighlighted(result, f, where)}
								</div>
							);
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
						{'Create '}
						{entityName}
					</Link>
				</Button>
			</Right>
			<br />
			{filter && (
				<>
					<TableFilter config={config} setWhere={setWhere} setPage={setPage} where={where} />
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
