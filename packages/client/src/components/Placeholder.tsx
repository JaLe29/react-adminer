import Alert from 'antd/lib/alert';

interface Props {
	relation?: boolean;
	propertyName: string;
}

const Placeholder: React.FC<Props> = ({ relation, propertyName }: Props) => (
	<Alert
		description={`Komponenta${relation ? ' (relace)' : ''} ${propertyName} není implementována`}
		type="info"
		showIcon
	/>
);

export default Placeholder;
