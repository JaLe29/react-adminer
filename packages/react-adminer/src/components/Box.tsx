type Generic = {
	display?: string;
	alignItems?: string;
	justifyContent?: string;
	className?: string;
	flexDirection?: string;
	width?: string | number;
	style?: any;
};

type Props = {
	p?: number;
	children: React.ReactElement | React.ReactElement[] | any;
	onClick?: () => void;
} & Generic;

const Box: React.FC<Props> = ({
	className,
	display,
	alignItems,
	justifyContent,
	p,
	children,
	width,
	flexDirection,
	onClick,
	style = {},
}) => (
	<div
		style={{
			padding: p,
			display,
			alignItems,
			justifyContent,
			flexDirection,
			width,
			...style,
		}}
		className={className}
		onClick={onClick}
	>
		{children}
	</div>
);
export default Box;
