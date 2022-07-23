/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import { Button, Input, notification, Space } from 'antd';
import { slowMe } from '../utils/promise';
import { useReactAdminerContext } from '../hooks/useReactAdminerContext';


interface Props {
	value: any;
	entityName: string;
	config: any;
	id: string;
	propertyName: string;
}

const CellEditInput: React.FC<Props> = ({ propertyName, value:initValue, entityName, config, id }: Props) => {
	const { dataProvider } = useReactAdminerContext();
	const [isSaving, setSaving] = useState(false);
<<<<<<< HEAD
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
=======
	const [value, setValue] = useState<any>({});
>>>>>>> 8073ba5d78c6976b222e05f34a968edc1509ad76

	const onSave = async (): Promise<void> => {
		setSaving(true);
		const payload = { [propertyName]: value };
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
<<<<<<< HEAD
				<Input type="text" defaultValue={value} onChange={v => {
					setState(v.target.value);
					console.log(state);
=======
				<Input type="text" defaultValue={initValue} onChange={v => {
					setValue(v.target.value);
>>>>>>> 8073ba5d78c6976b222e05f34a968edc1509ad76
				}}/>
				<Button type="primary" onClick={onSave} loading={isSaving} >
					{isSaving ? 'Saving...' : 'Save'}
				</Button>
			</Space>
		</>
	);
};

export default CellEditInput;