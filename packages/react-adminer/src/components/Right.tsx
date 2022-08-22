import Box from './Box';

interface Props {
	children: React.ReactElement | React.ReactElement[] | any;
}
const Right: React.FC<Props> = ({ children }) => (
	<Box justifyContent="flex-end" display="flex">
		{children}
	</Box>
);

export default Right;
