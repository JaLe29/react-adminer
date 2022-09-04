import Box from './Box';

interface Props {
	children: React.ReactElement | React.ReactElement[] | any;
}
const LineSpaceBetween: React.FC<Props> = ({ children }) => (
	<Box display="flex" justifyContent="space-between" alignItems="center">
		{children}
	</Box>
);

export default LineSpaceBetween;
