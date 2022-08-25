import { DatePicker as DatePickerAntd } from 'antd';
import moment from 'moment';
import type { EditPageComponent } from './EditPageComponents/EditPageComponentsTypes';

const DatePicker: React.FC<EditPageComponent> = ({ value, onChange, propertyName }) => (
	<DatePickerAntd
		value={moment(value, 'YYYY-MM-DD')}
		placeholder={propertyName}
		onChange={dateString => {
			onChange(dateString?.toDate());
		}}
		style={{ width: '100%' }}
	/>
);

export default DatePicker;
