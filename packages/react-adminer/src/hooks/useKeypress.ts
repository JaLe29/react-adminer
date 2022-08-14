import { useEffect } from 'react';

export default function useKeypress(key: any, action: any): void {
	useEffect(() => {
		function onKeyup(e: any): void {
			if (e.key === key) {
				action();
			}
		}
		window.addEventListener('keyup', onKeyup);
		return () => window.removeEventListener('keyup', onKeyup);
	}, []);
}
