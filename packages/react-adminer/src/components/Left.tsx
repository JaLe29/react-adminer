import Box from './Box';

interface Props {
	children: React.ReactElement | React.ReactElement[] | any;
}
const Left: React.FC<Props> = ({ children }) => (
	<Box justifyContent="flex-start" display="flex">
		{children}
	</Box>
);

export default Left;
