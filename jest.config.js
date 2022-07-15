module.exports = {
	projects: ['<rootDir>/packages/*/jest.config.js', '<rootDir>/tests/jest.config.js'],
	coverageDirectory: '<rootDir>/jest-coverage/',
	collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
	cacheDirectory: '<rootDir>/.cache/jest',
};
