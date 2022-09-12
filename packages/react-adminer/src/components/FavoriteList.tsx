import { Alert, notification, Table as TableAntd } from 'antd';
import { useEffect, useState } from 'react';
import useStateParams from '../hooks/useStateParams';

interface Props {
	entityName: string | undefined;
}

const FavoriteList: React.FC<Props> = inputEntityName => {
	const [localStorageData, setLocalStorageData] = useState<undefined | any>(undefined);
	const [isEmpty, setIsEmpty] = useState<undefined | boolean>();

	useEffect(() => {
		const actualLocalStorage = localStorage.getItem('react-adminer');
		if (actualLocalStorage) {
			try {
				const storageObj = JSON.parse(actualLocalStorage);
				setLocalStorageData(storageObj);
				return;
			} catch {
				//
			}
		}

		setIsEmpty(true);
	}, []);

	// zahodit -> nacpat do localStorageData
	const finalObject = {
		favourites: [{ name: '', entity: '', payload: '' }],
	};
	const { entityName } = inputEntityName;

	// tohle hodit do komponenty - useSetUrlFilter
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

	// dat do use efektu na maunt
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

	return (
		<>
			{localStorageData && (
				<TableAntd
					dataSource={
						entityName !== undefined ? getDataOfEntity(localStorageData) : localStorageData.favourites
					}
					columns={columns}
				/>
			)}
			{isEmpty && <Alert message="No favourite filter is currently created" type="error" showIcon />}
		</>
	);
};

export default FavoriteList;
