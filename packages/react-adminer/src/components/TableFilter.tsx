import { Button, Col, Collapse, Form, Row, Space } from 'antd';
import { useEffect } from 'react';
import { getColumnTitle, getFieldByName, jsonDeserializeParse, jsonSerializeParse } from '../utils/config';
import useStateParams from '../hooks/useStateParams';
import type { TableConfig, TableFilterObj } from '../types/types';
import AddToFavoriteButton from './AddToFavoriteButton';
import Box from './Box';
import LineSpaceBetween from './LineSpaceBetween';
import Input from './EditPageComponents/Input';
import DatePicker from './EditPageComponents/DatePicker';
import InputNumber from './EditPageComponents/InputNumber';

const { Panel } = Collapse;

interface Props {
	setWhere: (s: any | undefined) => void;
	setPage: (n: number) => void;
	config: TableConfig;
	where: Record<string, any> | undefined;
	entityName: string;
}

const TableFilter: React.FC<Props> = ({ setWhere, setPage, config, where, entityName }): any => {
	const [form] = Form.useForm();
	const [filterConfig, setFilter] = useStateParams<any>(undefined, 'f', jsonDeserializeParse, jsonSerializeParse);

	useEffect(() => {
		if (!filterConfig) {
			return;
		}
		onFilterChange(filterConfig, false);
		form.setFieldsValue(filterConfig);
	}, [filterConfig]);

	const onFilterChange = (values: Record<string, any>, needSync = true): void => {
		console.log({ values });
		const keys = Object.keys(values);
		let finalWhere;
		if (keys.length > 0) {
			finalWhere = keys.reduce((acc, v) => {
				const target = values[v];
				if (target && target?.length > 0) {
					return {
						...acc,
						[v]: target,
					};
				}
				return acc;
			}, {});
		}
		setWhere(finalWhere);
		setPage(0);
		if (needSync) {
			setFilter(finalWhere);
		}
	};

	const handleKeyUp = (e: any): void => {
		// Enter
		if (e.keyCode === 13) {
			form.submit();
		}
	};

	const onlyStringConfigs: TableFilterObj[] =
		config.filter?.map(tf => {
			if (typeof tf === 'string') {
				const field = config.fields.find(c => c.name === tf);
				if (!field) {
					throw new Error(`Config ${tf} was not found!`);
				}
				switch (field.type) {
					case 'string': {
						console.log('string');
						return { name: field.name, component: Input };
					}
					case 'number': {
						console.log('number');
						return { name: field.name, component: InputNumber };
					}
					case 'date': {
						console.log('date');
						return { name: field.name, component: DatePicker };
					}
					case 'datetime': {
						console.log('datetime');
						return { name: field.name, component: DatePicker };
					}
				}
				return { name: field.name, component: Input };
			}

			const field = config.fields.find(c => c.name === tf.name);
			if (!field) {
				throw new Error(`Config ${tf} was not found!`);
			}

			if (tf.component) {
				return { name: field.name, component: tf.component };
			}

			return { name: field.name, component: <Box>COMPONENT ERROR</Box> };
		}) ?? [];

	if (onlyStringConfigs.length === 0) {
		return null;
	}

	const activeFiltersLen = Object.keys(filterConfig ?? {}).filter(v => filterConfig[v]?.length > 0).length;
	return (
		<Collapse>
			<Panel
				header={
					<Box>
						{activeFiltersLen > 0 ? <Box>{`Filter (${activeFiltersLen} Active filters)`}</Box> : 'Filter'}
					</Box>
				}
				key="1"
			>
				<Form form={form} layout="vertical" onFinish={v => onFilterChange(v)} onKeyUp={handleKeyUp}>
					<Row gutter={16}>
						{onlyStringConfigs.map(c => (
							<Col key={c.name} span={12}>
								<h2>
									<Form.Item
										name={c.name}
										label={getColumnTitle(getFieldByName(config, c.name))}
										style={{ height: '0px' }}
									/>
								</h2>
								<Form.Item name={c.name}>
									<c.component />
								</Form.Item>
							</Col>
						))}
					</Row>
					<LineSpaceBetween>
						<AddToFavoriteButton where={where} filterConfig={filterConfig} entityName={entityName} />
						<Space>
							<Button
								onClick={() => {
									form.resetFields();
									setWhere(undefined);
									setFilter({});
								}}
							>
								Reset
							</Button>
							<Button onClick={form.submit} type="primary">
								Submit
							</Button>
						</Space>
					</LineSpaceBetween>
					<Form.Item />
				</Form>
			</Panel>
		</Collapse>
	);
};

export default TableFilter;
