'use strict';

module.exports = {
	preset: 'jest-preset-angular',
	setupFilesAfterEnv: ['<rootDir>/tests/setupJest.ts'],
	moduleNameMapper: {
		'shared/(.*)': '<rootDir>src/app/shared/$1'
	},
	globals: {
		'ts-jest': {
			diagnostics: false
		}
	},
	coverageDirectory: '<rootDir>/coverage/sonarQube',
	testResultsProcessor: 'jest-sonar-reporter',
	collectCoverage: true,
	forceCoverageMatch: [
		'**/src/app/**/*.spec.ts'
	]
};