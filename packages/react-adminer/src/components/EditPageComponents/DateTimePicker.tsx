import { DatePicker as DatePickerAntd } from 'antd';
import moment from 'moment';
import type { EditPageComponent } from './EditPageComponentsTypes';

const DateTimePicker: React.FC<EditPageComponent> = ({ value, onChange }) => (
	<DatePickerAntd
		value={value ? moment(value) : undefined}
		showTime
		onChange={dateString => {
			onChange(dateString?.toJSON());
		}}
		style={{ width: '100%' }}
	/>
);

export default DateTimePicker;
