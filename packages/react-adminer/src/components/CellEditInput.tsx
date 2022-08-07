import React, { useState } from 'react';
import { Button, Input, notification, Space } from 'antd';
import type { TableConfig } from 'types';
import { getFieldByName } from '../utils/config';
import { useDataProvider } from '../hooks/useDataProvider';
import { slowMe } from '../utils/promise';
import useKeypress from '../hooks/useKeypress';

interface Props {
	value: any;
	entityName: string;
	config: TableConfig;
	id: string;
	propertyName: string;
	setActiveRecord: (v: any) => void;
}

const CellEditInput: React.FC<Props> = ({
	setActiveRecord,
	propertyName,
	value: initValue,
	entityName,
	config,
	id,
}: Props) => {
	const [isSaving, setSaving] = useState(false);
	const [value, setValue] = useState<any>(initValue);

	useKeypress('Escape', () => {
		setActiveRecord(undefined);
	});

	const dataProvider = useDataProvider();

	const onSave = async (): Promise<void> => {
		setSaving(true);
		const payload = { [propertyName]: value };
		const fn = async (): Promise<void> => {
			try {
				if (typeof initValue === 'number') {
					const valueAsNumber: number = parseInt(value);
					const payloadAsNuber = { [propertyName]: valueAsNumber };
					await dataProvider.update(entityName, payloadAsNuber, config, { where: { id } });
				} else {
					await dataProvider.update(entityName, payload, config, { where: { id } });
				}
				notification.success({ message: `${entityName ?? 'error'} has been changed...` });
			} catch {
				notification.error({ message: `Error` });
			}
		};
		await slowMe(1000, fn);
		setSaving(false);
		setActiveRecord(undefined);
	};

	const fieldConfig = getFieldByName(config, propertyName);
	const isSaveDisabled = value === initValue || (fieldConfig?.nullable === false && value.length === 0);

	return (
		<Space>
			<Input
				type="text"
				defaultValue={initValue}
				onKeyDown={event => {
					if (event.key === 'Enter' && !isSaveDisabled) {
						onSave();
						event.preventDefault();
						event.stopPropagation();
					}
				}}
				onChange={v => {
					setValue(v.target.value);
				}}
			/>
			<Button type="primary" onClick={onSave} loading={isSaving} disabled={isSaveDisabled}>
				{isSaving ? 'Saving...' : 'Save'}
			</Button>
		</Space>
	);
};

export default CellEditInput;
