import { QuestionCircleOutlined } from '@ant-design/icons';
import { Popover } from 'antd';

interface Props {
	helpText: string;
}
const HelperIcon: React.FC<Props> = ({ helpText }) => (
	<Popover content={helpText}>
		<QuestionCircleOutlined style={{ fontSize: '10px', paddingLeft: '2px', opacity: '0.5', cursor: 'help' }} />
	</Popover>
);

export default HelperIcon;
