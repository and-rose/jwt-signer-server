// @ts-check
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

const config = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
)
config.push({
  ignores: [
    '**/generated-test.*.ts',
    '**/webpack.config.js',
    '**/dist',
    '**/bin/',
  ],
})
export default config
