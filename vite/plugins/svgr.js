import * as fs from "fs"
import * as resolve from "resolve"

export default function viteSvgrPlugin(options) {
  const { defaultExport = "url" } = options || {}

  return {
    name: "vite-plugin-svgr",
    async transform(code, id) {
      // 转换逻辑: svg -> Vue 组件

      // 1. 根据 id 入参过滤出 svg 资源
      if (!id.endsWith('.svg')) {
        return code
      }
      const svgTransform = import("@svgr/core").transform
      // 解析 esbuild 的路径，后续转译 vue 会用到，我么这里直接拿 vite 中的 esbuild 即可
      const esbuildPackagePath = resolve.sync('esbuild', { basedir: require.sync('vite') })
      console.log("esbuildPackagePath:", esbuildPackagePath)
      const esbuild = import(esbuildPackagePath)
      // 2. 读取 svg 文件内容
      const svg = await fs.promises.readFile(id, 'utf-8')
      // 3. 利用 @svgr/core 将 svg 转换为 Vue 组件代码
      const svgrResult = await svgTransform(
        svg,
        {},
        { componentName: "VueComponent" }
      )
      // 4. 处理默认导出为 url 的情况
      let componentCode = svgrResult
      if (defaultExport === 'url') {
        // 加上 Vite 默认的 `export default 资源路径`
        componentCode += code
        componentCode = svgrResult.replace('export default VueComponent', 'export { VueComponent }')
      }
      // 5. 将组件的 vue 代码转译为浏览器可运行的代码
      const result = await esbuild.transform(componentCode, {
        loader: 'vue'
      })
      return {
        code: result.code,
        map: null
      }
    }
  }
}