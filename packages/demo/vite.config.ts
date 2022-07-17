/* eslint-disable no-var */
/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import { resolve } from 'path';

var SRC_DIR = resolve(__dirname, 'src');

export default (): any => ({
	server: {
		port: 3006,
	},
	plugins: [react(), checker({ typescript: true })],
	resolve: {
		alias: {
			components: resolve(SRC_DIR, 'components'),
			const: resolve(SRC_DIR, 'const'),
			context: resolve(SRC_DIR, 'context'),
			contexts: resolve(SRC_DIR, 'contexts'),
			core: resolve(SRC_DIR, 'core'),
			hooks: resolve(SRC_DIR, 'hooks'),
			interfaces: resolve(SRC_DIR, 'interfaces'),
			layouts: resolve(SRC_DIR, 'layouts'),
			theme: resolve(SRC_DIR, 'theme'),
			types: resolve(SRC_DIR, 'types'),
			utils: resolve(SRC_DIR, 'utils'),
			pages: resolve(SRC_DIR, 'pages'),
		},
	},
});
