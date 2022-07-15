import { Row, Spin, Button, Divider, notification, Alert } from 'antd';
import { useEffect, useState } from 'react';
// import { camelCase } from 'change-case';
// import { useNavigate } from 'react-router';
// import { useInsert, useSelect, useUpdate } from '@apengine/react-querier';
// import {
// 	getPrimitiveFields,
// 	// getRelationFields,
// 	isCreatable,
// 	isPrimitiveFieldType,
// 	isVirtualFieldType,
// } from '../../utils/config';
import type { Field, PrimitiveField } from 'types';
import { useSelect } from '../hooks/useSelect';
import { withTitle, WithCol } from './EditPageHelpers';
import { getPrimitiveFields, isCreatable, isPrimitiveFieldType, isVirtualFieldType } from '../utils/config';
import Placeholder from './Placeholder';
import Input from './EditPageComponents/Input';
import Box from './Box';
import BooleanSwitch from './EditPageComponents/BooleanSwitch';
// import type { EditFormConfig, Field, PrimitiveField } from pes/config';
import { slowMe } from '../utils/promise';
// import { NEW_KEY } from '../../const/app';
import { useEntityConfig } from '../hooks/useEntityConfig';
import { useReactAdminerContext } from '../hooks/useReactAdminerContext';
import { NEW_KEY } from '../const';
// import { getEditPageJoin } from '../../pages/EditPageUtils';

interface Props {
	// isRelation?: boolean;
	id: string | 'new';
	// config: EditFormConfig;
	entityName: string;
}

export const Edit: React.FC<Props> = ({ entityName, id }) => {
	const { paths, dataProvider } = useReactAdminerContext();
	const config = useEntityConfig({ entityName });
	const { router } = useReactAdminerContext();
	// const insertNewEntity = useInsert(entityName ?? 'error');
	// const updateEntity = useUpdate(entityName ?? 'error');

	const navigate = router?.functions?.useNavigate();
	const [original, setOriginal] = useState<any>({});
	const [state, setState] = useState<any>({});
	const [isSaving, setSaving] = useState(false);
	const [errorNullable, setErrorNullable] = useState<Record<string, boolean>>({});
	const isNewForm = id === NEW_KEY;
	/*
	const { data, error, loading } = useQueryQuerier<any & { id: string }>({
		state: {
			type: 'One',
			entityType: entity as EntityType,
			fields: config.fields.filter(f => !isVirtualFieldType(f) && isPrimitiveFieldType(f)).map(f => f.name),
			where: [{ id: { _in: [id ?? 'error'] } }],
			join: getEditPageJoin(config),
		},
		option: { skip: isNewForm },
	});
*/
	// const { data: d, loading } = useSelect<{ id: string }>(entity, {
	// 	offset: 0,
	// 	limit: 1,
	// 	fields: config.fields.filter(f => !isVirtualFieldType(f) && isPrimitiveFieldType(f)).map(f => f.name),
	// 	where: { id: { _eq: id ?? 'error' } },
	// });

	const { data: d, loading } = useSelect<any>(
		entityName,
		{
			offset: 0,
			limit: 1,
			fields: config?.fields
				.filter(f => /*! isVirtualFieldType(f) && */ isPrimitiveFieldType(f))
				.map(f => f.name),
			// orderBy: sort,
			where: { id: id ?? 'error' },
		},
		!config,
	);

	const data = d?.[0];

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

	const getConfirmBtnText = (): string => {
		if (isNewForm) {
			return 'Create new ';
		}

		return isSaving ? 'Saving...' : 'Save';
	};

	const onSave = async (): Promise<void> => {
		setSaving(true);
		const payload = getPayload();

		const fn = async (): Promise<void> => {
			if (isNewForm) {
				try {
					// const [{ id: newId }] = (await insertNewEntity(payload)) as any;
					const newId = await dataProvider?.insert(entityName, payload);
					notification.success({ message: `${entityName} has been created...` });
					navigate(`${paths?.editFormPath ?? '/entity/edit'}/${entityName}/${newId}`);
				} catch {
					notification.error({ message: `Error` });
				}
				return;
			}
			try {
				await dataProvider?.update(entityName, payload, { where: { id } });
				notification.success({ message: `${entityName ?? 'error'} has been saved...` });
			} catch {
				notification.error({ message: `Error` });
			}
		};
		await slowMe(1000, fn);
		setSaving(false);
	};

	const onChange = (field: Field, value: any): void => {
		setState({ ...state, [field.name]: value });
		if (!field.nullable && value === '') {
			setErrorNullable({ ...errorNullable, [field.name]: true });
		} else if (errorNullable[field.name]) {
			const cpy = { ...errorNullable };
			delete cpy[field.name];
			setErrorNullable(cpy);
		}
	};

	useEffect(() => {
		if (data) {
			setState(data);
			setOriginal(data);
		}
	}, [data]);

	const hasChanges = Object.keys(getPayload()).length >= 1;

	if (loading) {
		return (
			<Box>
				<Spin />
			</Box>
		);
	}

	if (!config) {
		return <Box>neni config</Box>;
	}

	// const relations = getRelationFields(config.fields);
	const primitiveFields = getPrimitiveFields(config.fields);

	// if (error) {
	// 	return (
	// 		<Box>
	// 			An error occured
	// 			{JSON.stringify(error, null, 2)}
	// 		</Box>
	// 	);
	// }

	const isErrorNullable = Object.keys(errorNullable).length > 0;
	return (
		<Box>
			{isNewForm && (
				<Box p={5}>
					<Alert message="You are creating new entity" type="info" showIcon />
				</Box>
			)}
			<Row gutter={[12, 12]}>
				{primitiveFields.map((f: PrimitiveField & { editable?: boolean }) => {
					const canCreate = !(isNewForm && !isCreatable(f));
					const isDisabled = f.editable === false;

					if (isVirtualFieldType(f) || !canCreate) {
						return null;
					}

					if (f.type === 'string') {
						return (
							<WithCol key={f.name}>
								{withTitle(
									f.name,
									f.nullable,
									<Input
										disabled={isDisabled}
										value={state[f.name]}
										propertyName={f.name}
										onChange={v => {
											onChange(f, v);
										}}
									/>,
								)}
							</WithCol>
						);
					}

					if (f.type === 'number') {
						return (
							<WithCol key={f.name}>
								{withTitle(f.name, f.nullable, <Placeholder propertyName={f.name} />)}
							</WithCol>
						);
					}

					if (f.type === 'boolean') {
						return (
							<WithCol key={f.name}>
								{withTitle(
									f.name,
									f.nullable,
									<BooleanSwitch
										disabled={isDisabled}
										value={state[f.name]}
										onChange={v => {
											onChange(f, v);
										}}
										propertyName={f.name}
									/>,
								)}
							</WithCol>
						);
					}

					return (
						<WithCol key={f.name}>
							{withTitle(f.name, f.nullable, <Placeholder propertyName={f.name} />)}
						</WithCol>
					);
				})}
				{/* <Divider />
				{relations.map(f => (
					<WithCol key={f.name}>
						{withTitle(f.name, f.nullable, <Selector entity={f.relation.entity} type={f.relation.type} />)}
					</WithCol>
				))} */}
			</Row>
			<Divider />
			{/* {isRelation && (
				<Link to={`/entity/edit/${entity}/${data.id}`}>
					<Button type="primary"> Open relation detail</Button>
				</Link>
			)} */}
			{isErrorNullable && (
				<div>
					<Alert message={`Missing values: ${Object.keys(errorNullable).join(', ')}`} type="error" showIcon />
				</div>
			)}
			<Button type="primary" onClick={onSave} loading={isSaving} disabled={!hasChanges || isErrorNullable}>
				{getConfirmBtnText()}
			</Button>
		</Box>
	);
};
