import { DatePicker as DatePickerAntd } from 'antd';
import dayjs from 'dayjs';
import type { EditPageComponent } from './EditPageComponentsTypes';

const DateTimePicker: React.FC<EditPageComponent> = ({ value, onChange }) => (
	<DatePickerAntd
		value={value ? dayjs(value) : null}
		showTime
		onChange={dateString => {
			onChange(dateString?.toJSON());
		}}
		style={{ width: '100%' }}
	/>
);

export default DateTimePicker;
