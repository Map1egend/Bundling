const rollup = require("rollup")

// 常用的 inputOptions
/**
 * @type { import("rollup").InputOptions }
 */
 const inputOptions = {
  input: "./src/index.js",
  // external: [],
  // plugins: []
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

const watcher = rollup.watch({
  // 和 rollup 配置文件中的属性基本一致，只不过多了 `watch` 配置
  input: inputOptions,
  output: outputOptionsList,
  watch: {
    exclude: ["node_modules/**"],
    include: ["src/**"]
  }
})

process.on("exit", () => {
  watcher.close()
})

watcher.on("restart", () => {
  console.log("重新构建...")
})

watcher.on("change", (id) => {
  console.log("发生变动的模块id: ", id)
})

watcher.on("event", (event) => {
  switch (event.code) {
    case 'START':
        console.info('Rebuilding...');
        break;
    case 'BUNDLE_START':
        console.info('Bundling...');
        break;
    case 'BUNDLE_END':
        console.info('Bundled!');
        break;
    case 'END':
        console.info('Done!');
        break;
    case 'ERROR':
    case 'FATAL':
        console.error("Rollup error: ", event);
  }
})