import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

const reactRecommended = pluginReact.configs.flat.recommended;
const reactConfig = {
  ...reactRecommended,
  files: ["**/*.{jsx,tsx}"],
  languageOptions: {
    ...(reactRecommended.languageOptions ?? {}),
    globals: {
      ...globals.browser,
      ...(reactRecommended.languageOptions?.globals ?? {}),
    },
  },
  settings: {
    ...(reactRecommended.settings ?? {}),
    react: {
      ...(reactRecommended.settings?.react ?? {}),
      version: "detect",
    },
  },
};

export default defineConfig([
  {
    ignores: ["dist", "build"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactConfig,
]);
