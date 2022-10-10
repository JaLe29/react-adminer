import { Spin, Button, Divider, notification, Alert } from 'antd';
import { useEffect, useState } from 'react';
import type { Field, PrimitiveField, TableConfig } from 'types';
import { EyeOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useSelect } from '../hooks/useSelect';
import { withTitle, WithCol } from './EditPageHelpers';
import {
	getPrimitiveFields,
	getRelationFields,
	getVirtualFields,
	isCreatable,
	isVirtualFieldType,
} from '../utils/config';
import Box from './Box';
import { slowMe } from '../utils/promise';
import { useEntityConfig } from '../hooks/useEntityConfig';
import { useReactAdminerContext } from '../hooks/useReactAdminerContext';
import { NEW_KEY } from '../const';
import Selector from './Selector';
import SectionBox from './SectionBox';

interface Props {
	id: string | 'new';
	entityName: string;
	entityConfig?: TableConfig | undefined;
}

const DATE_FORMATS: Record<string, string | undefined> = {
	datetime: 'YYYY-MM-DD hh:mm:ss',
	date: 'YYYY-MM-DD',
};

const EditChild: React.FC<Props> = ({ entityConfig, entityName, id }) => {
	const { config: appConfig, renders } = useReactAdminerContext();
	const { paths, dataProvider } = useReactAdminerContext();
	const config = useEntityConfig({ entityName, entityConfig });
	const { router } = useReactAdminerContext();

	const navigate = router?.functions?.useNavigate();
	const [original, setOriginal] = useState<any>({});
	const [state, setState] = useState<any>({});
	const [isSaving, setSaving] = useState(false);
	const [errorNullable, setErrorNullable] = useState<Record<string, boolean>>({});
	const isNewForm = id === NEW_KEY;

	// const targetEntityFields = config?.fields
	// 	.filter(f => /*! isVirtualFieldType(f) && */ isPrimitiveFieldType(f))
	// 	.map(f => f.name);
	const fields = config?.fields ?? [];

	const relations = getRelationFields(fields);
	const firstLevelFieldsRelationsFields = relations.map(r => {
		const relation = relations.find(re => re.relation.entity === r.relation.entity);
		const primitiveFields = getPrimitiveFields(appConfig?.schema[relation?.relation.entity ?? '']?.fields ?? []);
		return primitiveFields.map(pf => `${r.name}.${pf.name}`);
	});
	const primitiveFields = getPrimitiveFields(fields);
	const virtualFields = getVirtualFields(fields);
	// console.log({ firstLevelFieldsRelationsFields });
	const {
		data: d,
		loading,
		refetch,
	} = useSelect<any>(
		entityName,
		{
			offset: 0,
			limit: 1,
			fields: [...primitiveFields.map(f => f.name), ...firstLevelFieldsRelationsFields.flat()],
			where: { id: id ?? 'error' },
		},
		!config,
	);

	const data = d?.[0];

	const getPayload = (): any => {
		const createTableBooleanFields = fields.filter(field => field.type === 'boolean' && !field.nullable);
		const payload: Record<string, any> = Object.keys(state).reduce((acc, v) => {
			if (state[v] !== original[v]) {
				return {
					...acc,
					[v]: state[v],
				};
			}
			return acc;
		}, {});
		createTableBooleanFields.forEach(f => {
			if (!payload[f.name]) {
				payload[f.name] = false;
			}
		});
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
					const newId = await dataProvider?.insert(entityName, payload, config!);
					notification.success({ message: `${entityName} has been created...` });
					navigate(`${paths?.editFormPath ?? '/entity/edit'}/${entityName}/${newId}`);
				} catch {
					notification.error({ message: `Error` });
				}
				return;
			}
			try {
				await dataProvider?.update(entityName, payload, config!, { where: { id } });
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

	// if (error) {
	// 	return (
	// 		<Box>
	// 			An error occured
	// 			{JSON.stringify(error, null, 2)}
	// 		</Box>
	// 	);
	// }

	const targetPrimitiveFields = primitiveFields.filter((f: PrimitiveField & { editable?: boolean }) => {
		const canCreate = !(isNewForm && !isCreatable(f));
		// const isDisabled = f.editable === false;

		if (isVirtualFieldType(f) || !canCreate) {
			return false;
		}

		return true;
	});

	const isErrorNullable = Object.keys(errorNullable).length > 0;
	const hasChanges = Object.keys(getPayload()).length >= (targetPrimitiveFields.length === 0 ? 0 : 1);
	const Link = router?.components.Link;

	const getValidDateValue = (f: Field, editable: boolean | undefined): string | null => {
		if (state[f.name] && editable && DATE_FORMATS[f.type]) {
			return moment().format(DATE_FORMATS[f.type]);
		}
		return null;
	};

	return (
		<>
			<Box>
				{isNewForm && (
					<Box p={5}>
						<Alert message="You are creating new entity" type="info" showIcon />
					</Box>
				)}
				<SectionBox
					primitiveFields={primitiveFields}
					isNewForm={isNewForm}
					onChange={onChange}
					getValidDateValue={getValidDateValue}
					state={state}
					selectedSection="primarySection"
				/>
				<Divider />
				<SectionBox
					primitiveFields={primitiveFields}
					isNewForm={isNewForm}
					onChange={onChange}
					getValidDateValue={getValidDateValue}
					state={state}
					selectedSection="secondarySection"
				/>
				<Divider />
				<SectionBox
					primitiveFields={primitiveFields}
					isNewForm={isNewForm}
					onChange={onChange}
					getValidDateValue={getValidDateValue}
					state={state}
				/>
				<Divider />
				{relations.map(f => (
					<WithCol key={f.name}>
						{withTitle(
							f.label ?? f.name,
							f.nullable,
							<Box display="flex">
								<Selector
									entityName={f.relation.entity}
									type={f.relation.type}
									onChange={v => {
										onChange(f, v);
									}}
									value={state[f.name]}
								/>
								<Link to={`${paths?.editFormPath ?? '/entity/edit'}/${f.relation.entity}/${1}`}>
									<Button icon={<EyeOutlined />} />
								</Link>
							</Box>,
						)}
					</WithCol>
				))}
				{isErrorNullable && (
					<div>
						<Alert
							message={`Missing values: ${Object.keys(errorNullable).join(', ')}`}
							type="error"
							showIcon
						/>
					</div>
				)}
				<Button type="primary" onClick={onSave} loading={isSaving} disabled={!hasChanges || isErrorNullable}>
					{getConfirmBtnText()}
				</Button>
			</Box>
		</>
	);
};

// eslint-disable-next-line react/destructuring-assignment
export const Edit: React.FC<Props> = props => <EditChild key={props.entityName} {...props} />;
