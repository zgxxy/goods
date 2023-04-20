const path = require('path')
const URL = require('./public/proxyUrl')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const port = process.env.port || process.env.npm_config_port || 8080 // dev port

module.exports = {
  publicPath: "./",      // 公共路径(必须有的)
  outputDir: "goods",     // 输出文件目录
  assetsDir: "./static", // 静态资源存放的文件夹(相对于ouputDir) 一般都是static目录，不然默认的会是assets
  runtimeCompiler: false,// 我用的only，打包后小些
  productionSourceMap: true, // 在生产环境会生产.map文件 设置false可以减小dist文件大小，加速构建
  devServer: {
    open: true,  // npm run serve后自动打开页面
    // host: 'localhost',
    port: port, // 开发服务器运行端口号
    overlay: {
      warnings: false,
      errors: true
    }, // 热更新,
    proxy: {
      // '/api': {
        [URL.ProxyUrl]: {
        // target: '127.0.0.1',
        target: `${URL.backUrl}`,
        changeOrigin: true,
      },
    },
  },
  chainWebpack(config){
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

      config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  },
  configureWebpack: {
    name: 'goods',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
  },
}
