module.exports = () => ({
  name: "esbuild:http",
  setup(build) {
    let https = require("https")
    let http = require("http")

    // 1、拦截 CDN 请求，自定义 esbuild 如何进行路径解析
    // 多个 onResolve
    // 顺序执行，若返回中有 path 则不往后匹配
    // 若都未配置 path 则 esbuild 将默认解析相对于当前模块的解析目录的路径
    build.onResolve({ filter: /^https?:\/\// }, args => ({
      path: args.path,
      namespace: "http-url"
    }))

    build.onResolve({ filter: /.*/, namespace: "http-url" }, (args) => ({
      // 重写路径
      path: new URL(args.path, args.importer).toString(),
      namespace: "http-url"
    }))

    // 2、通过 fetch 请求加载 CDN 资源
    build.onLoad({ filter: /.*/, namespace: "http-url" }, async (args) => {
      let contents = await new Promise((resolve, reject) => {
        function fetch(url) {
          console.log(`Downloading: ${url}`)
          let lib = url.startsWith("https") ? https : http
          let req = lib
            .get(url, (res) => {
              if ([301, 302, 307].includes(res.statusCode)) {
                // 重定向
                fetch(new URL(res.headers.location, url).toString())
                req.abort()
              } else if (res.statusCode === 200) {
                // 响应成功
                let chunks = []
                res.on("data", (chunk) => chunks.push(chunk))
                res.on("end", () => resolve(Buffer.concat(chunks)))
              } else {
                reject(
                  new Error(`GET ${url} failed: status ${res.statusCode}`)
                )
              }
            })
            .on("error", reject)
        }
        fetch(args.path)
      })
      return { contents }
    })
  }
})