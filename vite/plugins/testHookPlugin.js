export default function testHookPlugin() {
  /**
   * @type { import("vite").ConfigEnv }
   */
  return {
    name: "test-hooks-plugin",
    // vite 独有钩子
    config(config) {
      console.log("congfig")
    },
    // vite 独有钩子
    configResolved(){
      console.log("configResolved")
    },
    // 通用钩子
    options(opts) {
      console.log("options")
      return opts
    },
    // vite 独有钩子
    configureServer(server) {
      console.log("configureServe")
      setTimeout(() => {
        // 手动退出进程
        process.kill(process.pid, 'SIGTERM')
      }, 3000)
    },
    // 通用钩子
    buildStart() {
      console.log("buildStart")
    },
    // 通用钩子
    buildEnd() {
      console.log("buildEnd")
    },
    // 通用钩子
    closeBundle() {
      console.log("closeBundle")
    }
  }
}