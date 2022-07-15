import { Input as InputAntd } from 'antd';
import type { EditPageComponent } from './EditPageComponentsTypes';

const Input: React.FC<EditPageComponent> = ({ disabled, value, onChange, propertyName }) => (
	<InputAntd disabled={disabled} placeholder={propertyName} value={value} onChange={e => onChange(e.target.value)} />
);

export default Input;
