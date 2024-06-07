import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/app/(.*)$": "<rootDir>/src/app/$1",
    "^@/assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@/prisma/(.*)$": "<rootDir>/src/prisma/$1",
    "^@/types/(.*)$": "<rootDir>/src/types/$1",
    "^@/actions/(.*)$": "<rootDir>/src/actions/$1",
    "^@/lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@prisma/client$": "<rootDir>/node_modules/@prisma/client",
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
};

export default createJestConfig(config);
