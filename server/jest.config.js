module.exports = {
    testEnvironment: 'node',
    collectCoverageFrom: [
        'src/**/*.js',
        '!src/app.js',
    ],
    coverageDirectory: 'coverage',
    testMatch: ['**/tests/**/*.test.js'],
    setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.js'],
    testTimeout: 10000,
};