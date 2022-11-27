import { Modal as ModalAntd } from 'antd';

interface Props {
	title: string;
	setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	isModalVisible: boolean;
	okText: string;
	content: any;
	onOk: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void | undefined;
}

const Modal: React.FC<Props> = ({ title, setIsModalVisible, isModalVisible, okText, content, onOk }) => (
	<ModalAntd
		title={title}
		open={isModalVisible}
		onOk={onOk}
		onCancel={() => {
			setIsModalVisible(false);
		}}
		okText={okText}
		cancelText="Cancel"
	>
		{content}
	</ModalAntd>
);

export default Modal;
