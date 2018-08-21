import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

export default {
  input: 'index.js',
  output: {
    file: 'build/share-twice.js',
    format: 'cjs',
    name: 'share-twice'
  },
  plugins: [ uglify({}, minify) ]
};