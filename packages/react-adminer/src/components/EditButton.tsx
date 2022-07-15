import { Button } from 'antd';
import { useReactAdminerContext } from '../hooks/useReactAdminerContext';

interface Props {
	value: any;
	object: any;
	entity: string;
}

const EditButton: React.FC<Props> = ({ entity, object: { id } }) => {
	const { paths, router } = useReactAdminerContext();

	const Link = router?.components.Link;
	return (
		<Button>
			<Link to={`${paths?.editFormPath ?? '/entity/edit'}/${entity}/${id}`}>Edit</Link>
		</Button>
	);
};

export default EditButton;
