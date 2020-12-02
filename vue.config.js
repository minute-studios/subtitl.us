module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  configureWebpack: {
    resolve: { symlinks: false },
    node: {
      __dirname: true
    },
    plugins: [
    ],
    output: {
      globalObject: 'this'
    },
    module: {
    }
  },
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        prependData: "@import '@/styles/_variables.sass';"
      }
    }
  }
}
