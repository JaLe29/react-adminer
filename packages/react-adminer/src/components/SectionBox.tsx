import { Alert, Card, Row, Typography } from 'antd';
import type { Field, PrimitiveField } from 'types/types';
import { isCreatable, isVirtualFieldType } from '../utils/config';
import DatePicker from './EditPageComponents/DatePicker';
import DateTimePicker from './EditPageComponents/DateTimePicker';
import BooleanSwitch from './EditPageComponents/BooleanSwitch';
import Input from './EditPageComponents/Input';
import InputNumber from './EditPageComponents/InputNumber';
import { WithCol, withTitle } from './EditPageHelpers';
import Placeholder from './Placeholder';
import Box from './Box';

const { Title } = Typography;

interface Props {
	name?: string;
	fields: PrimitiveField[];
	isNewForm: boolean;
	onChange: (field: Field, value: any) => void;
	getValidDateValue: (f: Field, editable: boolean | undefined) => string | null;
	state: any;
}

const sectionHasCreateableFields = (sectionFields: PrimitiveField[]): boolean =>
	sectionFields.some(f => f.creatable === true);

const SectionBox: React.FC<Props> = ({
	name,
	fields: sectionFields,
	isNewForm,
	onChange,
	getValidDateValue,
	state,
}) => (
	<Card>
		{name && <Title level={2}>{name}</Title>}
		<Row gutter={[12, 12]}>
			{sectionFields.map((f: PrimitiveField & { editable?: boolean; section?: string }) => {
				const canCreate = !(isNewForm && !isCreatable(f));
				const isDisabled = f.editable === false;
				if (isVirtualFieldType(f) || !canCreate) {
					return null;
				}

				if (f.type === 'string') {
					return (
						<WithCol key={f.name} sm={f.grid}>
							{withTitle(
								f.label ?? f.name,
								f.nullable,
								<Input
									disabled={isDisabled}
									value={state[f.name]}
									propertyName={f.name}
									onChange={v => {
										onChange(f, v);
									}}
								/>,
							)}
						</WithCol>
					);
				}

				if (f.type === 'number') {
					return (
						<WithCol key={f.name} sm={f.grid}>
							{withTitle(
								f.label ?? f.name,
								f.nullable,
								<InputNumber
									disabled={isDisabled}
									value={state[f.name]}
									propertyName={f.name}
									onChange={v => {
										onChange(f, v);
									}}
								/>,
							)}
						</WithCol>
					);
				}

				if (f.type === 'boolean') {
					return (
						<WithCol key={f.name} sm={f.grid}>
							{withTitle(
								f.label ?? f.name,
								f.nullable,
								<BooleanSwitch
									disabled={isDisabled}
									value={state[f.name]}
									onChange={v => {
										onChange(f, v);
									}}
									propertyName={f.name}
								/>,
							)}
						</WithCol>
					);
				}

				if (f.type === 'date') {
					return (
						<WithCol key={f.name} sm={f.grid}>
							{withTitle(
								f.label ?? f.name,
								f.nullable,
								<DatePicker
									disabled={isDisabled}
									value={getValidDateValue(f, f.editable)}
									onChange={v => {
										onChange(f, v);
									}}
									propertyName={f.name}
								/>,
							)}
						</WithCol>
					);
				}

				if (f.type === 'datetime') {
					return (
						<WithCol key={f.name} sm={f.grid}>
							{withTitle(
								f.label ?? f.name,
								f.nullable,
								<DateTimePicker
									disabled={isDisabled}
									value={getValidDateValue(f, f.editable)}
									onChange={v => {
										onChange(f, v);
									}}
									propertyName={f.name}
								/>,
							)}
						</WithCol>
					);
				}

				return (
					<WithCol key={f.name} sm={f.grid}>
						{withTitle(f.label ?? f.name, f.nullable, <Placeholder propertyName={f.name} />)}
					</WithCol>
				);
			})}
		</Row>
		{!sectionHasCreateableFields(sectionFields) && (
			<Box p={5}>
				<Alert message="There are no fields to fill in this section." type="error" showIcon />
			</Box>
		)}
	</Card>
);

export default SectionBox;
