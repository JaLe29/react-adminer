import { Alert, Table as TableAntd } from 'antd';
import { useEffect, useState } from 'react';
import useSetUrlFilter from '../hooks/useSetUrlFilter';

interface Props {
	entityName: string | undefined;
}

const FavoriteList: React.FC<Props> = inputEntityName => {
	const [localStorageData, setLocalStorageData] = useState<undefined | any>(undefined);
	const [isEmpty, setIsEmpty] = useState<undefined | boolean>();
	const { entityName } = inputEntityName;
	const finalObjContent = { favourites: [{}] };

	useEffect((): void => {
		const actualLocalStorage = localStorage.getItem('react-adminer');
		if (actualLocalStorage) {
			try {
				const storageObj = JSON.parse(actualLocalStorage);
				if (!entityName) {
					setLocalStorageData(storageObj);
					return;
				}
				storageObj.favourites.filter((e: any) => {
					if (e.entity === entityName) {
						finalObjContent.favourites.push({ name: e.name, entity: e.entity, payload: e.payload });
					}
				});
				if (Object.keys(finalObjContent.favourites).length > 1) {
					finalObjContent.favourites.shift();
					setLocalStorageData(finalObjContent);
				} else {
					// setLocalStorageData(undefined);
					setIsEmpty(true);
				}
				return;
			} catch {
				//
			}
		}
		setIsEmpty(true);
	}, []);

	const [filterConfig, setFilter] = useSetUrlFilter();

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

	return (
		<>
			{localStorageData && <TableAntd dataSource={localStorageData.favourites} columns={columns} />}
			{isEmpty && <Alert message="No favourite filter is currently created" type="error" showIcon />}
		</>
	);
};

export default FavoriteList;
