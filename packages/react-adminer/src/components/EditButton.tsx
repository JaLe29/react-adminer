import { Button } from 'antd';
import { useBaseEditFormPath } from '../hooks/useBaseEditFormPath';
import { useReactAdminerContext } from '../hooks/useReactAdminerContext';

interface Props {
	value: any;
	object: any;
	entity: string;
}

const EditButton: React.FC<Props> = ({ entity, object: { id } }) => {
	const { router } = useReactAdminerContext();
	const baseEditFormPath = useBaseEditFormPath();

	const Link = router?.components.Link;
	return (
		<Button>
			<Link to={`${baseEditFormPath}/${entity}/${id}`}>Edit</Link>
		</Button>
	);
};

export default EditButton;
