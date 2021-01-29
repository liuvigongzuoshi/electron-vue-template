/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require("webpack")
const path = require("path")

const defaultSettings = require("./src/config")

const isProduction = process.env.NODE_ENV === "production"
const siteName = defaultSettings.SITE_NAME
const resolve = dir => path.join(__dirname, ".", dir)

module.exports = {
  publicPath: isProduction ? "./" : "/",
  devServer: {
    port: 8180,
    open: false
  },
  productionSourceMap: process.env.NODE_ENV !== "production",
  // pages: {
  //   index: {
  //     entry: "src/renderer/main.ts",
  //     filename: "index.html",
  //     title: siteName,
  //     chunks: ["chunk-vendors", "chunk-common", "index"]
  //   },
  //   background: {
  //     entry: "src/background/index.ts",
  //     filename: "background.html",
  //     chunks: ["background"]
  //   }
  // },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "~@/renderer/themes/variables.less";`
        },
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = siteName
      return args
    })

    // 添加别名
    config.resolve.alias.set("@", resolve("src")).set("@renderer", resolve("src/renderer"))

    config.module
      .rule("svg")
      .exclude.add(resolve("src/renderer/assets/icons/svg"))
      .end()

    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/renderer/assets/icons/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })

    // config.module
    //   .rule('worker')
    //   .test(/\.worker.js$/)
    //   .use('worker')
    //   .loader('worker-loader')
    //   .options({
    //     inline: 'fallback'
    //   })

    // SplitChunksPlugin https://webpack.js.org/plugins/split-chunks-plugin/
    // const splitOptions = config.optimization.get("splitChunks")
    // config.optimization.splitChunks(
    //   Object.assign({}, splitOptions, {
    //     // （缺省值5）按需加载时的最大并行请求数
    //     maxAsyncRequests: 5,
    //     // （默认值3）入口点上的最大并行请求数
    //     maxInitialRequests: 3,
    //     // （默认值：1）分割前共享模块的最小块数
    //     minChunks: 1,
    //     // （默认值：30000）块的最小大小
    //     minSize: 30000,
    //     // webpack 将使用块的起源和名称来生成名称: `vendors~main.js`,如项目与"~"冲突，则可通过此值修改，Eg: '-'
    //     automaticNameDelimiter: "~",
    //     // cacheGroups is an object where keys are the cache group names.
    //     name: true,
    //     cacheGroups: {
    //       default: false,
    //       components: {
    //         name: "chunk-components",
    //         test: resolve("src/renderer/components"),
    //         minChunks: 2,
    //         priority: 4,
    //         reuseExistingChunk: true
    //       }
    //     }
    //   })
    // )
  },
  configureWebpack: config => {
    const entry = { app: resolve("src/renderer/main.ts") }
    const externals = {}
    return {
      entry,
      externals: externals
    }
  },
  // Vue CLI Plugin Electron Builder
  // https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/configuration.html#table-of-contents
  pluginOptions: {
    electronBuilder: {
      preload: "src/renderer/preload.ts",
      chainWebpackMainProcess(config) {
        config.entry("child-process").add(resolve("src/main/child-process.ts"))
      },
      mainProcessFile: "src/main/index.ts",
      rendererProcessFile: "src/renderer/main.ts"
      // nodeIntegration: true,
      // mainProcessWatch: [],
      // https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/820
      // externals: []
    }
  }
}
