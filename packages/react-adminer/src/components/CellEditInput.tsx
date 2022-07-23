/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import { Button, Input, notification, Space } from 'antd';
import { getPrimitiveFields, getRelationFields } from '../utils/config';
import { useSelect } from '../hooks/useSelect';
import { slowMe } from '../utils/promise';
import { useReactAdminerContext } from '../hooks/useReactAdminerContext';


interface Props {
	value: any;
	entityName: string;
	config: any;
	id: string;
}

const CellEditInput: React.FC<Props> = ({ value, entityName,config,id }: Props) => {
	const { paths, dataProvider } = useReactAdminerContext();
	const { config: appConfig } = useReactAdminerContext();
	const [isSaving, setSaving] = useState(false);
	const [original, setOriginal] = useState<any>({});
	const [state, setState] = useState<any>({});
	const fields = config?.fields ?? [];
	const relations = getRelationFields(fields);
	const firstLevelFieldsRelationsFields = relations.map(r => {
		const relation = relations.find(re => re.relation.entity === r.relation.entity);
		const primitiveFields = getPrimitiveFields(appConfig?.schema[relation?.relation.entity ?? '']?.fields ?? []);
		// console.log({ primitiveFields });
		return primitiveFields.map(pf => `${r.name}.${pf.name}`);
	});
	const primitiveFields = getPrimitiveFields(fields);
	const { data: d} = useSelect<any>(
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

	useEffect(() => {
		if (data) {
			setState(data);
			setOriginal(data);
		}
	}, [data]);

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

	const onSave = async (): Promise<void> => {
		setSaving(true);
		const payload = getPayload();
		const fn = async (): Promise<void> => {
			try {
				await dataProvider?.update(entityName, payload, config!, { where: { id } });
				notification.success({ message: `${entityName ?? 'error'} has been changed...` });
			} catch {
				notification.error({ message: `Error` });
			}
		};
		await slowMe(1000, fn);
		setSaving(false);
	};

	return (
		<>
			<Space>
				<Input type="text" defaultValue={value} onChange={v => {
					setState(v.target.value);
					console.log(state);
				}}/>
				<Button type="primary" onClick={onSave} loading={isSaving} >
					{isSaving ? 'Saving...' : 'Save'}
				</Button>
			</Space>
		</>
	);
};

export default CellEditInput;