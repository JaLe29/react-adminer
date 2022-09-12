import { Button, Input, notification } from 'antd';
import { useState } from 'react';
import Modal from './Modal';

interface Props {
	where: Record<string, any> | undefined;
	filterConfig: any;
	entityName: string;
}

const AddToFavoriteButton: React.FC<Props> = ({ where, filterConfig, entityName }) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [favoriteFilterName, setFavoriteFilterName] = useState('');

	const showModal = (): any => {
		setIsModalVisible(true);
	};

	const checkDuplicityFavouriteFilter = (
		actualLocalStorage: any,
		name: string,
		filter: Record<string, any> | undefined,
	): void => {
		const storageObj = JSON.parse(actualLocalStorage);
		let isDuplicated = false;
		storageObj.favourites.forEach((e: any, index: number) => {
			if (!isDuplicated) {
				if (e.name) {
					if (e.name === name) {
						isDuplicated = true;
						notification.error({
							message: `Filter with this name is already saved. Cannot save a filter with the same name!`,
						});
					}
				}
				if (e.payload) {
					if (JSON.stringify(e.payload) === JSON.stringify(filter)) {
						isDuplicated = true;
						notification.error({
							message: `Duplicate filter content was detected. This filter is already stored under the name:
							${storageObj.favourites[index].name}!`,
						});
						setIsModalVisible(false);
					}
				}
			}
		});
		if (!isDuplicated) {
			addNewFavoriteFilter(storageObj, name, filter);
		}
	};

	const addNewFavoriteFilter = (
		storageObj: any,
		filterName: string,
		filterPayload: Record<string, any> | undefined,
	): void => {
		storageObj.favourites.push({ name: filterName, entity: entityName, payload: filterPayload });
		localStorage.setItem('react-adminer', JSON.stringify(storageObj));
		notification.success({ message: 'New favourite filter has now been added' });
		setIsModalVisible(false);
	};

	const saveFavoriteFilter = (): void => {
		const actualLocalStorage = localStorage.getItem('react-adminer')!;
		if (actualLocalStorage) {
			if (favoriteFilterName) {
				checkDuplicityFavouriteFilter(actualLocalStorage, favoriteFilterName, where);
			} else {
				notification.error({
					message: 'No favourite filter name selected. Set name for your favorite filter.',
				});
			}
		} else {
			localStorage.setItem(
				'react-adminer',
				JSON.stringify({ favourites: [{ name: favoriteFilterName, entity: entityName, payload: where }] }),
			);
			notification.success({ message: 'Your first favourite filter has now been added' });
			setIsModalVisible(false);
		}
	};

	return (
		<>
			<Button type="primary" onClick={showModal}>
				Save Favorite Filter
			</Button>
			<Modal
				title="Save your favorite fliter"
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
				okText="Save"
				content={
					<>
						<p>Name of new favourite filter</p>
						<Input
							placeholder="New filter name"
							type="text"
							onChange={e => setFavoriteFilterName(e.target.value)}
						/>
						<p>Filter details</p>
						<p>{JSON.stringify(filterConfig)}</p>
					</>
				}
				onOk={saveFavoriteFilter}
			/>
		</>
	);
};

export default AddToFavoriteButton;
