module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['ember', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  env: {
    browser: true,
  },
  rules: {
    'prefer-const': 'off',
    // Use the default `ban-types` rule *except* for allowing `object`, which is
    // used throughout. We may switch to using `Record<PropertyKey, unknown>` on
    // a future (breaking) release, but this choice allows us to preserve the
    // current types while landing a robust linting config in general.
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          object: false,
        },
      },
    ],
  },
  overrides: [
    // JS files where TS rules don't make sense
    {
      files: ['addon/**/*.js', 'tests/**/*.js'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
    // tests
    {
      files: ['tests/**/*-test.ts'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
    // node files
    {
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'tests/dummy/config/**/*.js',
      ],
      excludedFiles: [
        'addon/**',
        'addon-test-support/**',
        'app/**',
        'tests/dummy/app/**',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['node'],
      rules: Object.assign(
        {},
        require('eslint-plugin-node').configs.recommended.rules,
        {
          // add your custom rules and overrides for node files here
          '@typescript-eslint/no-var-requires': 'off',
        }
      ),
    },
  ],
};
