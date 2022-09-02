import { Modal as ModalAntd, notification } from 'antd';

interface Props {
	title: string;
	setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	isModalVisible: boolean;
	okText: string;
	content: any;
	onOk: any;
	okAlertText: string;
	showSuccessAlert: boolean;
	showErrorAlert: boolean;
}

const Modal: React.FC<Props> = ({
	title,
	setIsModalVisible,
	isModalVisible,
	okText,
	content,
	onOk,
	okAlertText,
	showSuccessAlert,
	showErrorAlert,
}) => {
	const handleOk = (): void => {
		setIsModalVisible(false);
	};
	if (showSuccessAlert) {
		notification.success({ message: okAlertText });
	}
	if (showErrorAlert) {
		notification.error({ message: 'Error' });
	}

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
