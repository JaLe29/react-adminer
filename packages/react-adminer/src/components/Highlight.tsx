/* eslint-disable react/no-array-index-key */

const escapeRegExp = (str: string): string => str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');

interface Props {
	text: string;
	highlight: string;
}

const Highlighted: React.FC<Props> = ({ text, highlight }) => {
	if (!highlight.trim()) {
		return <span>{text}</span>;
	}
	const patt = new RegExp(`(${escapeRegExp(highlight)})`, 'i');
	const parts = String(text).split(patt);

	if (highlight) {
		return (
			<>
				{parts.map((part, index) =>
					patt.test(part) ? (
						<mark style={{ padding: 0, backgroundColor: '#f5ff00' }} key={index}>
							{part}
						</mark>
					) : (
						part
					),
				)}
			</>
		);
	}
	return <>{text}</>;
};

export default Highlighted;
