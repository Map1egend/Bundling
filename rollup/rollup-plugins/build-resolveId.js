import { entries } from "lodash"

function resolve1(options) {
  // 打印 entries 配置
  console.log("resolve1", "options", options)
  
  return {
    name: "build-resolveId",
    resolveId(importee, importer, resolveOptions) {
      console.log("build-resoveId: importee", importee)
      console.log("build-resoveId: importer", importer)
      console.log("build-resoveId: resolveOptions", resolveOptions)

      return null
    }
  }
}

export default resolve1