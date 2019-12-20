export default {
  input: 'src/index.js',
  external: ['react'],
  output: {
    compact: true,
    file: 'dist/bundle.js',
    format: 'cjs'
  }
};
