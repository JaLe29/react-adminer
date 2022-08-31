import { useEffect } from 'react';

export default function useClickOutside(handleClickOutside: () => void, ref: React.RefObject<any>): void {
	useEffect(() => {
		const localHandleClickOutside = (e: any): void => {
			if (!ref.current?.contains(e.target)) {
				handleClickOutside();
			}
		};
		document.addEventListener('click', localHandleClickOutside, true);
		return () => document.removeEventListener('click', localHandleClickOutside);
	}, []);
}
