export default {
    displayName: 'functions-integration-tests',
    preset: '../../jest.preset.js',
    testEnvironment: 'node',
    transform: {
        '^.+\\.[tj]s$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js'],
    coverageDirectory: '../../coverage/apps/functions-integration-tests',
    setupFilesAfterEnv: ['./src/setup.ts'],
};
