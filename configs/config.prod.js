module.exports = {
    cdnFiles: {
        css: [],
        js: ['https://fundwxshareapi.1234567.com.cn/static/jweixin-1.0.0.js']
    },
    defineConfig: {
        // 用于在definePlugin时传入进去，设置到全局变量中。值要用JSOn.stringify处理
        version: JSON.stringify('1.0.0')
    }
};
