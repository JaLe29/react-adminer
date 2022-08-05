import { InputNumber as InputAntd } from 'antd';
import type { EditPageComponent } from './EditPageComponentsTypes';

const InputNumber: React.FC<EditPageComponent> = ({ disabled, value, onChange, propertyName }) => (
	<InputAntd
		disabled={disabled}
		placeholder={propertyName}
		value={value}
		onChange={e => onChange(e.target.value)}
		style={{ width: '100%' }}
	/>
);

export default InputNumber;
