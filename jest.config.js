module.exports = {
  roots: ["<rootDir>/test"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
    },
  },
  moduleNameMapper: {
    "^#/(.+)": "<rootDir>/$1",
  },
  coverageReporters: ["html", "cobertura"],
};
