import { Button, Col, Collapse, Form, Input, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import useStateParams from '../hooks/useStateParams';
import type { TableConfig, TableFilterObj } from '../types';
import Box from './Box';
import Left from './Left';
import Modal from './Modal';
import Right from './Right';

const { Panel } = Collapse;

interface Props {
	setWhere: (s: any | undefined) => void;
	setPage: (n: number) => void;
	config: TableConfig;
	where: Record<string, any> | undefined;
}

const TableFilter: React.FC<Props> = ({ setWhere, setPage, config, where }): any => {
	const [form] = Form.useForm();
	const [filterConfig, setFilter] = useStateParams<any>(
		undefined,
		'f',
		(v?: string) => {
			try {
				const parsed = JSON.parse(v ?? 'empty');
				return parsed;
			} catch {
				return {};
			}
		},
		(v: string) => JSON.stringify(v),
	);

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [favoriteFilterName, setFavoriteFilterName] = useState('');
	const [showSuccessAlert, setshowSuccessAlert] = useState(false);
	const [showErrorAlert, setshowErrorAlert] = useState(false);

	useEffect(() => {
		if (!filterConfig) {
			return;
		}
		onFilterChange(filterConfig, false);
		form.setFieldsValue(filterConfig);
	}, [filterConfig]);

	const onFilterChange = (values: Record<string, any>, needSync = true): void => {
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

	const showModal = (): any => {
		setIsModalVisible(true);
		setshowSuccessAlert(false);
		setshowErrorAlert(false);
	};

	const saveFavoriteFilter = (): void => {
		if (favoriteFilterName) {
			localStorage.setItem(
				'react-adminer',
				`{"favourites": [{name: ${favoriteFilterName}, payload: ${JSON.stringify(where)}}]}`,
			);
			setshowSuccessAlert(true);
		} else {
			setshowErrorAlert(true);
		}
	};

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
								{/* <Form.Item name={c.name} label={capitalCase(c.name)}> */}
								<Form.Item name={c.name} label={c.name}>
									<c.component />
								</Form.Item>
							</Col>
						))}
					</Row>
					<Left>
						<Space>
							<Button type="primary" onClick={showModal}>
								Save Favorite
							</Button>
							<Modal
								title="Save your favorite fliter"
								isModalVisible={isModalVisible}
								setIsModalVisible={setIsModalVisible}
								okText="Save"
								showErrorAlert={showErrorAlert}
								showSuccessAlert={showSuccessAlert}
								content={
									<>
										<p>Name of new favourite filter</p>
										<Input
											placeholder="New filter name"
											type="text"
											onChange={e => setFavoriteFilterName(e.target.value)}
										/>
										<p>Filter details</p>
										<p>{JSON.stringify(filterConfig)}</p>
									</>
								}
								onOk={saveFavoriteFilter}
								okAlertText="Favorite filter saved"
							/>
						</Space>
					</Left>
					<Right>
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
					</Right>
					<Form.Item />
				</Form>
			</Panel>
		</Collapse>
	);
};

export default TableFilter;
