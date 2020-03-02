module.exports = {
    plugins: {
        autoprefixer: {},
        'postcss-px2rem-exclude': {
            remUnit: 75,
            exclude: /node_modules/i // 忽略node_modules目录下的文件
        },
        cssnano: {}
    }
};
