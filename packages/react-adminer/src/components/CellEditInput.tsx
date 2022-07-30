import React, { useState } from 'react';
import { Button, Input, notification, Space } from 'antd';
import type { Field, TableConfig, TableField } from 'types';
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
	isErrorNullable: boolean;
	field: TableField;
	setState: (v: any) => void;
	state: any;
	errorNullable: Record<string, boolean>;
	setErrorNullable: (v: Record<string, boolean>) => void;
}

const CellEditInput: React.FC<Props> = ({
	setActiveRecord,
	propertyName,
	value: initValue,
	entityName,
	config,
	id,
	field,
	setState,
	state,
	errorNullable,
	setErrorNullable,
}: Props) => {
	const [isSaving, setSaving] = useState(false);
	const [value, setValue] = useState<any>({});

	useKeypress('Escape', () => {
		setActiveRecord(undefined);
	});

	const [hasChanges, setHasChanges] = useState(false);
	const isErrorNullable = Object.keys(errorNullable).length > 0;
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

	const onChange = (f: Field, v: any): void => {
		setState({ ...state, [f.name]: v });
		if (!f.nullable && v === '') {
			setErrorNullable({ ...errorNullable, [f.name]: true });
		} else if (errorNullable[f.name]) {
			const cpy = { ...errorNullable };
			delete cpy[f.name];
			setErrorNullable(cpy);
		}
		if (v === initValue) {
			setHasChanges(false);
		} else {
			setHasChanges(true);
		}
	};

	return (
		<Space>
			<Input
				type="text"
				defaultValue={initValue}
				onKeyDown={event => {
					if (event.key === 'Enter') {
						if (hasChanges && !isErrorNullable) {
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
					onChange(field, v.target.value);
				}}
			/>
			<Button type="primary" onClick={onSave} loading={isSaving} disabled={!hasChanges || isErrorNullable}>
				{isSaving ? 'Saving...' : 'Save'}
			</Button>
		</Space>
	);
};

export default CellEditInput;
