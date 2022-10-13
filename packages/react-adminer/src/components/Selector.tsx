/* eslint-disable indent */
import { Select } from 'antd';
import React from 'react';
import ReactIs from 'react-is';
import { useEntityConfig } from '../hooks/useEntityConfig';
import { isPrimitiveFieldType } from '../utils/config';
import { useSelect } from '../hooks/useSelect';
import type { RelationType } from '../types/types';
import Box from './Box';

const { Option } = Select;

interface Props {
	value: any;
	entityName: string;
	type: RelationType;
	onChange: (v: any) => void;
}

const Selector: React.FC<Props> = ({ value, onChange, entityName, type }) => {
	const config = useEntityConfig({ entityName });
	const { data, loading } = useSelect<any>(
		entityName,
		{
			fields: config?.fields.filter(c => isPrimitiveFieldType(c) && !c.virtual).map(c => c.name),
		},
		!config,
	);

	const isMany = type === 'many' ? 'multiple' : undefined;

	const resolveId = (v?: any): string | undefined => {
		if (!v) {
			return undefined;
		}
		if (v.id) {
			return v.id;
		}
		return v;
	};

	const toValue = (v: any): React.ReactElement => (
		<Box>
			{Object.keys(v).map(k => {
				if (ReactIs.isValidElementType(v[k])) {
					return (
						<Box key={k}>
							<b>{k}</b>
							{': '}
							{v[k]}
						</Box>
					);
				}
				return null;
			})}
		</Box>
	);

	return (
		<>
			<Select
				style={{ width: '100%' }}
				mode={isMany}
				loading={loading}
				onChange={v => onChange(v)}
				value={isMany ? value?.map(resolveId) : resolveId(value)}
			>
				{data?.map((d: any) => (
					<Option value={d.id} key={d.id}>
						{toValue(d)}
					</Option>
				))}
			</Select>
		</>
	);
};

export default Selector;
