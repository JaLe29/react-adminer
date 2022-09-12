import { notification, Table as TableAntd } from 'antd';
import useStateParams from '../hooks/useStateParams';

interface Props {
	entityName: string | undefined;
}

const FavoriteList: React.FC<Props> = inputEntityName => {
	const finalObject = {
		favourites: [{ name: '', entity: '', payload: '' }],
	};
	const { entityName } = inputEntityName;

	const [filterConfig, setFilter] = useStateParams<any>(
		undefined,
		'f',
		(v?: string) => {
			try {
				const parsed = JSON.parse(v ?? 'empty');
				return parsed;
			} catch {
				return {};
			}
		},
		(v: string) => JSON.stringify(v),
	);

	const columns = [
		{
			title: 'Favorite filter name',
			dataIndex: 'name',
			key: 'name',
			render: (text: any, record: any) => (
				<div style={{ cursor: 'pointer', color: '#1890FF' }} onClick={() => setFilter(record.payload)}>
					{text}
				</div>
			),
		},
		{
			title: 'Entity',
			dataIndex: 'entity',
			key: 'entity',
		},
	];

	const getDataOfEntity = (storageObj: any): any => {
		storageObj.favourites.filter((e: any) => {
			if (e.entity === entityName) {
				finalObject.favourites.push({ name: e.name, entity: e.entity, payload: e.payload });
			}
			return true;
		});
		finalObject.favourites.shift();
		if (finalObject.favourites[0]) {
			return finalObject.favourites;
		}
		return notification.error({
			message: `No favourite filter is currently created for entity: ${inputEntityName}`,
		});
	};

	const actualLocalStorage = localStorage.getItem('react-adminer')!;
	const storageObj = JSON.parse(actualLocalStorage);
	return (
		<>
			{storageObj ? (
				<TableAntd
					dataSource={entityName !== undefined ? getDataOfEntity(storageObj) : storageObj.favourites}
					columns={columns}
				/>
			) : (
				notification.error({ message: 'No favourite filter is currently created' })
			)}
		</>
	);
};

export default FavoriteList;
