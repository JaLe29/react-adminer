import { Switch as SwitchAntd } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import React from 'react';
import type { EditPageComponent } from './EditPageComponentsTypes';

const BooleanSwitch: React.FC<EditPageComponent> = ({ disabled, value, onChange }) => (
	<SwitchAntd
		disabled={disabled}
		checked={value}
		onChange={checked => onChange(checked)}
		checkedChildren={<CheckOutlined />}
		unCheckedChildren={<CloseOutlined />}
	/>
);

export default BooleanSwitch;
