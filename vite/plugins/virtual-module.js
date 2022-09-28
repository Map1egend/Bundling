// 虚拟模块加载

// 虚拟模块名称
const virtualFibModuleId = 'virtual:fib'
// Vite 中约定对于虚拟模块，解析后的路径需要加上`\0`前缀
const resolvedFibVirtualModuleId = '\0' + virtualFibModuleId

// 通过虚拟模块读取内存中的变量
const virtualEnvModuleId = "virtual:env"
const resolvedEnvVirtualModuledId = '\0' + virtualEnvModuleId

export default function virtualFibModulePlugin() {
  // 通过虚拟模块读取内存中的变量
  let config = null

  return {
    name: "vite-plugin-virtual-fib-module",
    // 通过虚拟模块读取内存中的变量
    configResolved(c) {
      config = c
    },
    resolveId(id) {
      if(id === virtualFibModuleId) {
        return resolvedFibVirtualModuleId
      }
      // 通过虚拟模块读取内存中的变量
      if (id === virtualEnvModuleId) {
        return resolvedEnvVirtualModuledId
      }
    },
    load(id) {
      // 加载虚拟模块
      if (id === resolvedFibVirtualModuleId) {
        return `export default function fib(n) { return n <= 1 ? n : fib(n - 1) + fib(n - 2); }`
      }
      // 通过虚拟模块读取内存中的变量
      if (id === resolvedEnvVirtualModuledId) {
        return `export default ${JSON.stringify(config.env)}`
      }
    }
  }
}