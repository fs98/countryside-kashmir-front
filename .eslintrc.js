module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
    browser: true,
    es6: true,
    commonjs: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
  },
  plugins: ['react', '@next/eslint-plugin-next', 'prettier', 'eslint-plugin-import'],
  rules: {
    'import/prefer-default-export': 0,
    'no-console': 'warn',
    'no-nested-ternary': 0,
    'no-underscore-dangle': 0,
    'no-unused-expressions': ['error', { allowTernary: true }],
    'no-unused-vars': 'error',
    camelcase: 0,
    'react/self-closing-comp': 1,
    'react/jsx-filename-extension': [1, { extensions: ['.js', 'jsx', '.tsx'] }],
    'react/prop-types': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-no-comment-textnodes': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-array-index-key': 0,
    'react/no-unescaped-entities': 0,
    'react/require-default-props': 0,
    'react/react-in-jsx-scope': 0,
    'linebreak-style': ['error', 'unix'],
    'prettier/prettier': ['error', { endOfLine: 'auto' }, { usePrettierrc: true }],
    'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@next/*',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
          },
          {
            pattern: '*',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  globals: {
    JSX: true,
  },
  settings: {
    react: {
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // It will default to "latest" and warn if missing, and to "detect" in the future
    },
  },
};
