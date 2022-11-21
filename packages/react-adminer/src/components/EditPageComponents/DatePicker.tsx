import { DatePicker as DatePickerAntd } from 'antd';
import dayjs from 'dayjs';
import type { EditPageComponent } from './EditPageComponentsTypes';

const DatePicker: React.FC<EditPageComponent> = ({ value, onChange, propertyName }) => (
	<DatePickerAntd
		value={value ? dayjs(value, 'YYYY-MM-DD') : null}
		placeholder={propertyName}
		onChange={dateString => {
			onChange(dateString?.toDate());
		}}
		style={{ width: '100%' }}
	/>
);

export default DatePicker;
