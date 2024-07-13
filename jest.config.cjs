module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    transformIgnorePatterns: [],
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/test/mocks/styleMock.js',
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest'
    },
}