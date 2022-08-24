import { DatePicker as DatePickerAntd } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import type { EditPageComponent } from './EditPageComponents/EditPageComponentsTypes';

const DatePicker: React.FC<EditPageComponent> = ({ value, onChange, propertyName }) => (
	<DatePickerAntd
		value={moment(value, 'YYYY-MM-DD')}
		placeholder={propertyName}
		onChange={dateString => {
			onChange(dateString);
		}}
		style={{ width: '100%' }}
	/>
);

export default DatePicker;
