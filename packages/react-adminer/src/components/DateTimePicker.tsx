import { DatePicker as DatePickerAntd } from 'antd';
import moment from 'moment';
import type { EditPageComponent } from './EditPageComponents/EditPageComponentsTypes';

const DateTimePicker: React.FC<EditPageComponent> = ({ value, onChange, propertyName }) => (
	<DatePickerAntd
		value={moment(value, 'YYYY-MM-DD h:mm:ss')}
		placeholder={propertyName}
		showTime
		onChange={dateString => {
			onChange(dateString?.toDate());
		}}
		style={{ width: '100%' }}
	/>
);

export default DateTimePicker;
