module.exports = {
  publicPath: '',
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'src/pages/index/main.js',
      chunks: ['chunk-common', 'chunk-index-vendors', 'index'],
    },
    live: {
      entry: 'src/pages/live/main.js',
      chunks: ['chunk-common', 'chunk-live-vendors', 'live'],
    },
    translate: {
        entry: 'src/pages/translate/main.js',
        chunks: ['chunk-common', 'chunk-translate-vendors', 'translate'],
    }
  },
  chainWebpack: config => {
    const pageKeys = Object.keys(module.exports.pages);
    config.optimization.splitChunks({
      cacheGroups: {
        ...pageKeys.map(key => ({
          name: `chunk-${key}-vendors`,
          priority: -10,
          chunks: chunk => chunk.name === key,
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
        })),
        common: {
          name: 'chunk-common',
          priority: 0,
          chunks: 'initial',
          minChunks: 2,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    });
  },
  devServer: {
    proxy: {
      '/translate': {
        target: 'https://api-free.deepl.com/v2/translate',
        changeOrigin: true,
        pathRewrite: {
          '^/translate': '',
        },
      },
    },
  },
};
