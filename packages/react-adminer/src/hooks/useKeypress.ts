/* eslint-disable prettier/prettier */
import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useKeypress(key: any, action: any) {
	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		function onKeyup(e: any) {
			if (e.key === key) {
				action();
			}
		}
		window.addEventListener('keyup', onKeyup);
		return () => window.removeEventListener('keyup', onKeyup);
	}, []);
};
