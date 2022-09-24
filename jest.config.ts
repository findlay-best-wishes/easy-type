import type {Config} from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './',
  testMatch: ["<rootDir>/__tests__/*.spec.ts"]
}

export default config