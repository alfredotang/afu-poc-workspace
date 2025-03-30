import vueParser from 'vue-eslint-parser'

import eslint from '@eslint/js'
import nx from '@nx/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import perfectionist from 'eslint-plugin-perfectionist'
import prettierPlugin from 'eslint-plugin-prettier/recommended'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  eslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    ignores: [
      'node_modules',
      'dist',
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
      '.nx',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.vue'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.{ts,tsx,vue,js,jsx}'],
    plugins: {
      perfectionist,
      unicorn: eslintPluginUnicorn,
    },
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        computed: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        defineProps: 'readonly',
        defineSlots: 'readonly',
        definePage: 'readonly',
        onMounted: 'readonly',
        onUnmounted: 'readonly',
        reactive: 'readonly',
        ref: 'readonly',
        shallowReactive: 'readonly',
        shallowRef: 'readonly',
        toRef: 'readonly',
        toRefs: 'readonly',
        watch: 'readonly',
        watchEffect: 'readonly',
        expect: 'readonly',
        test: 'readonly',
      },
      parser: tsParser,
    },
    settings: {
      'import/ignore': ['node_modules'],
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          caughtErrors: 'none',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          args: 'all',
          vars: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      'import/no-unresolved': 'off',
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          ignoreCase: true,
          specialCharacters: 'keep',
          internalPattern: ['^@/.+', '^~/.+'],
          partitionByComment: false,
          partitionByNewLine: false,
          newlinesBetween: 'always',
          maxLineLength: undefined,
          groups: [
            'node',
            'vite',
            'vue',
            'type',
            'primevue',
            'i18next',
            ['builtin', 'external'],
            'internal-type',
            'internal',
            ['sibling-type', 'index-type'],
            ['sibling', 'index'],
            'parent-type',
            'parent',
            'object',
            'unknown',
          ],
          customGroups: {
            type: {
              node: ['^node:.+'],
              vue: ['^vue$', '^vue-.+', '^pinia$'],
              primevue: ['^primevue$', '^primevue/.+', '^@primevue/.+'],
              i18next: ['^i18next$', '^i18next-.+'],
              vite: ['^vite', '^@vite'],
            },
            value: {
              node: ['^node:.+'],
              vue: ['^vue$', '^vue-.+', '^pinia$'],
              primevue: ['^primevue$', '^primevue/.+', '^@primevue/.+'],
              i18next: ['^i18next$', '^i18next-.+'],
              vite: ['^vite', '^@vite'],
            },
          },
          environment: 'node',
        },
      ],
      'perfectionist/sort-exports': 'error',
      'unicorn/prefer-node-protocol': 'error',
    },
  },
  {
    files: ['**/*.vue'],
    plugins: { vue: pluginVue },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue'],
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    processor: pluginVue.processors['.vue'],
    rules: {
      'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],
      'vue/attribute-hyphenation': 'off',
      'vue/multi-word-component-names': 'off',
    },
  },
  prettierPlugin, // must at last line
]
