import { Input as InputAntd } from 'antd';
import type { EditPageComponent } from './EditPageComponentsTypes';

const InputNumber: React.FC<EditPageComponent> = ({ disabled, value, onChange, propertyName }) => (
	<InputAntd
		disabled={disabled}
		placeholder={propertyName}
		value={value}
		onChange={e => onChange(parseInt(e.target.value))}
	/>
);

export default InputNumber;
