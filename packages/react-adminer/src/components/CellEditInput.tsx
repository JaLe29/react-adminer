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
	const [value, setValue] = useState<any>({});

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
				<Input type="text" defaultValue={initValue} onChange={v => {
					setValue(v.target.value);
				}}/>
				<Button type="primary" onClick={onSave} loading={isSaving} >
					{isSaving ? 'Saving...' : 'Save'}
				</Button>
			</Space>
		</>
	);
};

export default CellEditInput;