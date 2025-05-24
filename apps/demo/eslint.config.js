import vueParser from 'vue-eslint-parser'

import tsParser from '@typescript-eslint/parser'
import pluginVue from 'eslint-plugin-vue'

import baseConfig from '../../eslint.config.js'

export default [
  ...baseConfig,
  ...pluginVue.configs['flat/recommended'],
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
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.vue'],
    languageOptions: {
      sourceType: 'module',
      globals: {
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
      },
    },
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [
            '^.*/eslint(\\.base)?\\.config\\.[cm]?js$',
            '^.*/tailwind\\.base',
            '^@libs',
            '^@apps/demo',
            '^@apps/demo-react',
          ],
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
]
