/* eslint-disable no-var */
/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react';
import path from 'path';

export default (): any => ({
	plugins: [react()],
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'MyLib',
			formats: ['umd'],
			// fileName: format => `react-querier.${format}.js`,
			fileName: () => `index.js`,
		},
		rollupOptions: {
			// make sure to externalize deps that shouldn't be bundled
			// into your library
			external: ['react'],
			output: {
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					react: 'React',
				},
			},
		},
	},
});
