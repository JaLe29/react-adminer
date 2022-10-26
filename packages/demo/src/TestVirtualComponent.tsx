import { useState } from 'react';

const TestVirtualComponent: React.FC = () => {
	const [state, setState] = useState(0);

	return (
		<div onClick={() => setState(i => i + 1)}>
			TestVirtualComponent
			{state}
		</div>
	);
};

export default TestVirtualComponent;
