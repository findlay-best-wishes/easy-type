import typescript from '@rollup/plugin-typescript'
// @ts-ignore
import clear from 'rollup-plugin-clear'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
// import nodeGlobal from 'rollup-plugin-node-globals'

export default {
  input: './src/index.ts',
  output: [
    {
      format: 'cjs',
      file: 'dist/index.js'
    },
  ],
  plugins: [
    clear({
      targets: ['dist']
    }),
    nodeResolve(),
    commonjs(),
    json(),
    typescript(),
    // nodeGlobal()
  ]
}