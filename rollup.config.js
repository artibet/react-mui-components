import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import terser from '@rollup/plugin-terser';
// import css from 'rollup-plugin-import-css'
import postcss from 'rollup-plugin-postcss'

export default [

  // hooks
  {
    input: "src/hooks/index.js",
    output: [
      {
        dir: './hooks',
        format: "esm",
        sourcemap: false
      },
    ],
    plugins: [
      // replace({
      //   "process.env.NODE_ENV": JSON.stringify(NODE_ENV)
      // }),
      peerDepsExternal(),
      resolve({
        extensions: ['.js', '.jsx'],

      }),
      babel({
        presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
        exclude: ["node_modules/**", "dist/**", "hooks/**"]
      }),
      commonjs(),
      terser(),
      postcss({
        extensions: ['.css']
      })
    ]
  },

  // utils
  {
    input: "src/utils/index.js",
    output: [
      {
        dir: './utils',
        format: "esm",
        sourcemap: false
      },
    ],
    plugins: [
      // replace({
      //   "process.env.NODE_ENV": JSON.stringify(NODE_ENV)
      // }),
      peerDepsExternal(),
      resolve({
        extensions: ['.js', '.jsx'],

      }),
      babel({
        presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
        exclude: ["node_modules/**", "dist/**", "hooks/**"]
      }),
      commonjs(),
      terser(),
      postcss({
        extensions: ['.css']
      })
    ]
  }
]