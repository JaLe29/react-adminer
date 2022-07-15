import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useReactAdminerContext } from '../hooks/useReactAdminerContext';

interface Props {
	value: any;
	object: any;
	entity: string;
}

const EditButton: React.FC<Props> = ({ entity, object: { id } }) => {
	const { paths } = useReactAdminerContext();
	return (
		<Button>
			<Link to={`${paths?.editFormPath ?? '/entity/edit'}/${entity}/${id}`}>Edit</Link>
		</Button>
	);
};

export default EditButton;
