// api 方式调用
const rollup = require("rollup")
const util = require("util")

// 常用的 inputOptions
/**
 * @type { import("rollup").InputOptions }
 */
const inputOptions = {
  input: "./src/index.js",
  external: [],
  plugins: []
}

// 常用的 outputOptions
/**
 * @type { import("rollup").OutputOptions }
 */
const outputOptionsList = [
  {
    dir: "dist/es",
    entryFileNames: `[name].[hash].js`,
    chunkFileNames: `chunk-[hash].js`,
    assetFileNames: `assets/[name]-[hash][extname]`,
    format: "es",
    sourcemap: false,
    globals: {
      lodash: '_'
    }
  }
]

async function build() {
  let bundle
  let buildFailed = false
  try {
    // 1. 调用rollup.rollup 生成 bundle 对象
    bundle = await rollup.rollup(inputOptions)
    for (const outputOptions of outputOptionsList) {
      // 2. 拿到 bundle 对象，根据每一份输出配置，调用 generate 和 write 方法分别生成和写入
      const { output } = await bundle.generate(outputOptions)
      await bundle.write(outputOptions)
    }
  } catch (error) {
    buildFailed = true
    console.error(error)
  }

  if (bundle) {
    // 最后调用 bundle.close 方法结束打包
    await bundle.close()
  }
  process.exit(buildFailed ? 1 : 0)
}

async function runBuild() {
  const bundle = await rollup.rollup({
    input: ["./src/index.js"]
  })
  console.log(util.inspect(bundle))
}

// build()
runBuild()