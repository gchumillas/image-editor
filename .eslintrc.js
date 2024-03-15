module.exports = {
  'ignorePatterns': ['*.config.js'],
  'settings': {
    'react': {
      'version': 'detect'
    }
  },
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'standard',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:consistent-default-export-name/fixed',
    'plugin:storybook/recommended'
  ],
  'overrides': [
    {
      'files': ['**/*.stories.*', '*.ts', '*.tsx']
    }
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': ['react', '@typescript-eslint', 'import'],
  rules: {
    'eol-last': 'off',
    'eqeqeq': 'off',
    'quotes': ["error", "single"],
    'semi': ["error", "never"],
    'no-unused-vars': 'off',
    'func-style': ['error', 'expression'],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        'argsIgnorePattern': '^_',
        'destructuredArrayIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
        'ignoreRestSiblings': true
      }
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'consistent-default-export-name/default-export-match-filename': 'error',
    'consistent-default-export-name/default-import-match-filename': ['error', { ignorePaths: ['**/*.module.css'] }]
  },
}
