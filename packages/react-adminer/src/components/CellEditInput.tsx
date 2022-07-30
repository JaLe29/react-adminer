import React, { useState } from 'react';
import { Button, Input, notification, Space } from 'antd';
import type { TableConfig, TableField } from 'types';
import { useDataProvider } from '../hooks/useDataProvider';
import { slowMe } from '../utils/promise';
import useKeypress from '../hooks/useKeypress';

interface Props {
	value: any;
	entityName: string;
	config: TableConfig | undefined;
	id: string;
	propertyName: string;
	setActiveRecord: (v: any) => void;
	field: TableField;
}

const CellEditInput: React.FC<Props> = ({
	setActiveRecord,
	propertyName,
	value: initValue,
	entityName,
	config,
	id,
	field,
}: Props) => {
	const [isSaving, setSaving] = useState(false);
	const [value, setValue] = useState<any>({});

	useKeypress('Escape', () => {
		setActiveRecord(undefined);
	});
	const [hasChanges, setHasChanges] = useState(false);
	const dataProvider = useDataProvider();

	const onSave = async (): Promise<void> => {
		setSaving(true);
		const payload = { [propertyName]: value };
		const fn = async (): Promise<void> => {
			try {
				await dataProvider.update(entityName, payload, config!, { where: { id } });
				notification.success({ message: `${entityName ?? 'error'} has been changed...` });
			} catch {
				notification.error({ message: `Error` });
			}
		};
		await slowMe(1000, fn);
		setSaving(false);
		setActiveRecord(undefined);
	};

	const checkAllowNullable = (): boolean => {
		if (value.length === 0 && !field.nullable) {
			return false;
		}
		return true;
	};

	const onChange = (v: any): void => {
		if (v === initValue) {
			setHasChanges(false);
		} else {
			setHasChanges(true);
		}
	};

	console.log(value);
	return (
		<Space>
			<Input
				type="text"
				defaultValue={initValue}
				onKeyDown={event => {
					if (event.key === 'Enter') {
						if (hasChanges && checkAllowNullable()) {
							onSave();
						} else {
							notification.error({ message: `Error` });
						}
						event.preventDefault();
						event.stopPropagation();
					}
				}}
				onChange={v => {
					setValue(v.target.value);
					onChange(v.target.value);
				}}
			/>
			<Button type="primary" onClick={onSave} loading={isSaving} disabled={!hasChanges || !checkAllowNullable()}>
				{isSaving ? 'Saving...' : 'Save'}
			</Button>
		</Space>
	);
};

export default CellEditInput;
