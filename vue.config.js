const CompressionPlugin = require('compression-webpack-plugin');
const buildConfig = require('./configs/index');

const isBuild = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'testing';

// 常用库使用cdn资源,进行配置
// const externals = {
//   vue: "Vue",
//   "vue-router": "VueRouter",
//   vuex: "Vuex",
//   axios: "axios"
// };

const { cdnFiles, defineConfig } = buildConfig; // 获取配置信息
module.exports = {
    // 项目部署的基础路径 默认/
    // 放在子目录时使用./或者加你的域名
    publicPath: process.env.CDN_PATH || process.env.BASE_URL,
    chainWebpack: config => {
        // 对vue-cli内部的 webpack 配置进行更细粒度的修改。
        // 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
        config.plugin('html').tap(args => {
            const arg = args[0];
            arg.cdn = cdnFiles;
            return [arg];
        });

        // 将config.defineConfig的值注入到全局变量的process.env中
        config.plugin('define').tap(args => {
            const arg = args[0];
            Object.assign(arg['process.env'], defineConfig);
            return [arg];
        });

        if (isBuild) {
            // 编译项目时配置:生产和测试环境,webpack mode=production
            // 1.去除js注释,默认已经去除js注释
            // 2.html注释,默认去除
            // 3.去除console.log
            config.optimization.minimizer('terser').tap(args => {
                Object.assign(args[0].terserOptions.compress, {
                    // drop_console: true,
                    drop_debugger: true,
                    pure_funcs: ['console.log'] // 去除console.log,其他console保留
                });
                return args;
            });
            // 4.开启gzip压缩
            const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
            config.plugin('compress-webpack-plugin').use(CompressionPlugin, [
                {
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                }
            ]);
        }
    },
    css: {
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        // 启用 CSS modules for all css / pre-processor files.
        requireModuleExtension: false,
        loaderOptions: {
            sass: {
                prependData:
                    '@import "~@/assets/styles/_mixins.scss"; @import "~@/assets/styles/_variables.scss";' // 全局引入sass变量和mixin
            }
        }
    },
    lintOnSave: true, // default false
    // 打包时不生成.map文件
    productionSourceMap: false,
    devServer: {
        disableHostCheck: true,
        open: true, // 启动服务后是否打开浏览器
        port: 8088, // 服务端口
        https: false,
        hotOnly: false
        // 设置代理，用来解决本地开发跨域问题，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
        // proxy: {
        //   "/": {
        //     target: 'https://easy-mock.com',
        //     changeOrigin: true
        //   }
        // }
    }
};
