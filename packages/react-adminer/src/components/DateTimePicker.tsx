import { DatePicker as DatePickerAntd } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import type { EditPageComponent } from './EditPageComponents/EditPageComponentsTypes';

const DateTimePicker: React.FC<EditPageComponent> = ({ value, onChange, propertyName }) => {
	console.log(value);
	return (
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
};

export default DateTimePicker;
