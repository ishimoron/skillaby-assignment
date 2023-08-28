module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react', 'react-hooks'],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-undef': 'error',
    'no-unused-vars': 'warn',
    'arrow-spacing': 'error',
    'prefer-const': 'error',
    'no-console': 'warn',

    // Правила для React
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 'off', // В зависимости от использования PropTypes

    // Правила для отступов и форматирования
    indent: ['error', 2], // Отступы 2 пробела
    'object-curly-spacing': ['error', 'always'], // Пробелы внутри фигурных скобок

    // Правила для деструктуризации
    'prefer-destructuring': ['error', { object: true, array: false }],
  },
};
