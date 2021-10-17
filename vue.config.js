'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

// 页面标题
const name = defaultSettings.title || 'su-sunday-vue'

// npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 8001 // dev port

// 所有配置项说明请参见 https://cli.vuejs.org/config/
module.exports = {
    /**
     * 如果计划在子路径下部署站点，则需要设置publicPath,
     * 例如GitHub Pages,如果您计划将站点部署到 https://foo.github.io/bar/,
     * 那么publicPath应该设置为 "/bar/".
     * 在大多数情况下请使用 '/'
     * 详情: https://cli.vuejs.org/config/#publicpath
     */
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        // 代理配置
        proxy: {
            // 这里的api 表示如果我们的请求地址有/api的时候,就出触发代理机制
            // localhost:8888/api/abc  => 代理给另一个服务器
            // 本地的前端  =》 本地的后端  =》 代理我们向另一个服务器发请求 （行得通）
            // 本地的前端  =》 另外一个服务器发请求 （跨域 行不通）
            [process.env.VUE_APP_BASE_API]: {
                target: 'http://localhost:20000', // 我们要代理的地址
                changeOrigin: true, // 是否跨域 需要设置此值为true 才可以让本地服务代理我们发出请求
                // 路径重写
                // 默认的路径：target+baseUrl+apiUrl
                // 如：www.baidu.com/api/login，如果后端接口就是该路径，就不用写 pathRewrite
                pathRewrite: {
                    // 重新路由  localhost:8888/api/login  => www.baidu.com/api/login
                    ['^' + process.env.VUE_APP_BASE_API]: '' // 假设我们想把 localhost:8888/api/login 变成www.baidu.com/login 就需要这么做
                }
            }
        }
    },
    configureWebpack: {
        // 在webpack的name字段中提供应用的标题，以便
        // 可以在index.html中访问它，写入正确的标题。
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack(config) {
        // 可以提高第一屏的速度，建议开启预加载
        config.plugin('preload').tap(() => [
            {
                rel: 'preload',
                // to ignore runtime.js
                fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
                include: 'initial'
            }
        ])

        // 当页面太多时，会导致太多无意义的请求
        config.plugins.delete('prefetch')

        // 设置svg-sprite-loader
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
    }
}
