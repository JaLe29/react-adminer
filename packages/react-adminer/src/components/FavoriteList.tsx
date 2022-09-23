import { DeleteOutlined } from '@ant-design/icons';
import { Alert, Popconfirm, Table as TableAntd } from 'antd';
import { useEffect, useReducer, useState } from 'react';
import { useReactAdminerContext } from '../hooks/useReactAdminerContext';
import LineSpaceBetween from './LineSpaceBetween';

interface Props {
	entityName?: string;
}

const FavoriteList: React.FC<Props> = inputEntityName => {
	const { paths, router } = useReactAdminerContext();
	const navigate = router?.functions?.useNavigate();

	const [localStorageData, setLocalStorageData] = useState<undefined | any>(undefined);
	const [isEmpty, setIsEmpty] = useState<undefined | boolean>();
	const { entityName } = inputEntityName;
	const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

	useEffect((): void => {
		const actualLocalStorage = localStorage.getItem('react-adminer');
		if (actualLocalStorage) {
			try {
				const finalObjContent: { favourites: { name: string; entity: string; payload: string }[] } = {
					favourites: [],
				};
				const storageObj = JSON.parse(actualLocalStorage);
				storageObj.favourites.forEach((e: any): void => {
					if (e.entity === entityName || !entityName) {
						finalObjContent.favourites.push({ name: e.name, entity: e.entity, payload: e.payload });
					}
				});
				if (Object.keys(finalObjContent.favourites).length > 0) {
					setLocalStorageData(finalObjContent);
				} else {
					setIsEmpty(true);
					setLocalStorageData(undefined);
				}
				return;
			} catch {
				//
			}
		}
		setIsEmpty(true);
	}, [reducerValue]);

	const deleteFavoriteFilter = (record: Record<string, string>): void => {
		const favourites = localStorageData.favourites.filter((i: any) => i.name !== record.name);
		localStorage.setItem('react-adminer', JSON.stringify({ favourites }));
		setLocalStorageData(favourites);
		forceUpdate();
	};

	const columns = [
		{
			title: 'Favorite filter name',
			dataIndex: 'name',
			key: 'name',
			render: (text: any, record: any) => (
				<LineSpaceBetween>
					<div
						style={{ cursor: 'pointer', color: '#1890FF' }}
						onClick={() => {
							navigate(`${paths?.listPath ?? ''}/${record.entity}?f=${JSON.stringify(record.payload)}`);
						}}
					>
						{text}
					</div>
					<div>
						<Popconfirm
							title="Really want to remove this favorite filter?"
							onConfirm={() => deleteFavoriteFilter(record)}
							okText="Yes"
							cancelText="No"
						>
							<DeleteOutlined />
						</Popconfirm>
					</div>
				</LineSpaceBetween>
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
