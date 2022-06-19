module.exports = {
    runtimeCompiler: true,
    chainWebpack: config => {
        config.module.rules.delete('eslint');
    },
    configureWebpack: {
        devtool: 'source-map'
    }
}