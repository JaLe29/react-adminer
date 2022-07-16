export const set = (o: any, path: string, v: any): void => {
	const pathParts = path.split('.');

	let iterator = o;
	pathParts.forEach((p, i) => {
		if (!iterator[p]) {
			iterator[p] = {};
		}
		if (i === pathParts.length - 1) {
			iterator[p] = v;
		}
		iterator = iterator[p];
	});
};
