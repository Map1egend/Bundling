import path from "path"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"

// 测试 plugins
import resolveId from "./rollup-plugins/build-resolveId"

// 以下注释是为了能够使用 VSCode 的类型提示
/**
 * @type { import('rollup').RollupOptions }
 */
const buildOptions = {
  input: ["src/index.js", "src/util.js"],
  // input: {
  //   indexjs: "src/index.js",
  //   utils: "src/util.js"
  // },
  output: {
    // 产物输出目录
    dir: path.resolve(__dirname, 'dist'),
    // 以下三个配置项都可以使用这些占位符
    // 1. [name]: 去除文件后缀名的文件名
    // 2. [hash]: 根据文件名和文件内容生成的 hash 值
    // 3. [format]: 产物模块格式，如 es、cjs
    // 4. [extname]: 产物后缀名（带`.`）
    // 入口模块的输出文件名
    entryFileNames: `[name].js`,
    // 非入口模块(如动态 import)的输出文件名
    chunkFileNames: 'chunk-[hash].js',
    // 静态资源文件输出文件名
    assetFileNames: 'assets/[name]-[hash][extname]',
    // 产物输出格式，包括`amd`、`cjs`、`es`、`iife`, `umd`、`system`
    format: 'cjs',
    // 是否生成 sourcemap 文件
    sourcemap: true,
    // 如果打包出 iife/umd 格式，需要对外暴露出一个全局变量，通过 name 配置变量名
    name: 'myBundle',
    // 全局变量声明
    globals: {
      // 项目中可以直接加用`$`代替`jquery`
      jquery: '$'
    }
  },
  /* output: [
    {
      // 产物输出目录
      dir: "dist/es",
      // 产物格式
      format: "esm"
    },
    {
      dir: "dist/cjs",
      format: "cjs"
    }
  ] */
  external: ['react', 'react-dom'],
  // 通过 plugins 参数添加插件
  plugins: [
    // resolve(),
    // commonjs(),
    resolveId({
      entries: [
        { find: 'module-a', replacement: './module-a.js' },
        { name: "我们去抓水母吧", origin: "御前带猫不带刀" }
      ]
    })
  ]
}

export default buildOptions