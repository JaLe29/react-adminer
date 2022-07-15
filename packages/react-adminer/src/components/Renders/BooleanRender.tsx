import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

interface Props {
	value: boolean;
	object: any;
	entity: string;
}

export const BooleanRender: React.FC<Props> = ({ value }) => (
	<Tooltip placement="top" title={`${value}`}>
		{value === true ? <CheckOutlined /> : <CloseOutlined />}
	</Tooltip>
);
