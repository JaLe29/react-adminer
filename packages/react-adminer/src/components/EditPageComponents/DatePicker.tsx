import { DatePicker as DatePickerAntd } from 'antd';
import moment from 'moment';
import type { EditPageComponent } from './EditPageComponentsTypes';

const DatePicker: React.FC<EditPageComponent> = ({ value, onChange, propertyName }) => (
	<DatePickerAntd
		value={value ? moment(value, 'YYYY-MM-DD') : null}
		placeholder={propertyName}
		onChange={dateString => {
			onChange(dateString?.toDate());
		}}
		style={{ width: '100%' }}
	/>
);

export default DatePicker;
