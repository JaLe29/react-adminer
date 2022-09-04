import { Modal as ModalAntd } from 'antd';

interface Props {
	title: string;
	setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	isModalVisible: boolean;
	okText: string;
	content: any;
	onOk: any;
}

const Modal: React.FC<Props> = ({ title, setIsModalVisible, isModalVisible, okText, content, onOk }) => {
	const handleOk = (): void => {
		setIsModalVisible(false);
	};
	const handleCancel = (): void => {
		setIsModalVisible(false);
	};

	return (
		<>
			<ModalAntd
				title={title}
				visible={isModalVisible}
				onOk={() => {
					handleOk();
					onOk();
				}}
				onCancel={handleCancel}
				okText={okText}
				cancelText="Cancel"
			>
				{content}
			</ModalAntd>
		</>
	);
};

export default Modal;
