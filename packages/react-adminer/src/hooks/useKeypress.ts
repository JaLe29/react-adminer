import { useEffect } from 'react';

export default function useKeypress(key: string, action: any): void {
	useEffect(() => {
		const onKeyUp = (e: { key: string } & unknown): void => {
			if (e.key === key) {
				action();
			}
		};
		window.addEventListener('keyup', onKeyUp);
		return () => window.removeEventListener('keyup', onKeyUp);
	}, []);
}
