import svgr from '@svgr/rollup'

export default {
  plugins: [svgr()],
  input: 'src/main.jsx',
  output: {
    file: 'bundle.js',
    format: 'cjs',
  },
}