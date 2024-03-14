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
  'plugins': ['react', '@typescript-eslint', 'no-relative-import-paths', 'import'],
  'rules': {
    'no-unused-vars': 'off',
    'eqeqeq': 'off',
    'indent': 'off',
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'no-trailing-spaces': 'error',
    'jsx-quotes': ['error', 'prefer-double'],
    'quote-props': ['error', 'consistent'],
    'arrow-parens': ['error', 'always'],
    'object-property-newline': 'off',
    'eol-last': 'off',
    'no-tabs': 'error',
    'multiline-ternary': 'off',
    'func-style': ['error', 'expression'],
    'no-use-before-define': 'off',
    'no-restricted-imports': ['error', { patterns: ['src/pages/*'] }],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-curly-newline': 'error',
    'react/jsx-curly-spacing': 'error',
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-no-constructed-context-values': 'error',
    'react/jsx-props-no-multi-spaces': 'error',
    'react/jsx-tag-spacing': 'error',
    'react/jsx-wrap-multilines': ['error', { return: 'parens-new-line', logical: 'parens-new-line' }],
    'react/jsx-closing-bracket-location': 'error',
    'react/jsx-max-props-per-line': ['error', { 'maximum': 1, 'when': 'multiline' }],
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-child-element-spacing': 'error',
    'react/jsx-curly-brace-presence': 'error',
    'react/jsx-first-prop-new-line': 'error',
    'react/jsx-fragments': 'error',
    'react/jsx-no-bind': ['error', { allowArrowFunctions: true }],
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-pascal-case': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': [
      'error',
      { 'additionalHooks': '(useAsync|useAsyncFn|useValidator|usePageLoader|useRequestLoader)' }
    ],
    // TODO: consider adding the following rules and correct files
    // 'react/jsx-one-expression-per-line': 'error',
    // 'react/jsx-no-leaked-render': 'error',
    // 'react/jsx-no-literals': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        'argsIgnorePattern': '^_',
        'destructuredArrayIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
        'ignoreRestSiblings': true
      }
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'variable',
        'format': ['camelCase', 'PascalCase', 'UPPER_CASE']
      },
      {
        'selector': 'function',
        'format': ['camelCase', 'PascalCase']
      },
      {
        'selector': 'typeLike',
        'format': ['PascalCase']
      }
    ],
    '@typescript-eslint/no-use-before-define': ['error', { 'variables': false }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'consistent-default-export-name/default-export-match-filename': 'error',
    'consistent-default-export-name/default-import-match-filename': 'error'
  }
}
