const { defineConfig } = require('@vue/cli-service')

const baseUrl = process.env.GATEWAY_URL

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    plugins: [
      require('unplugin-vue-components/webpack')({
        /* options */
      }),
      require('unplugin-auto-import/webpack')({
        /* options */
      }),
    ],
  },

  devServer: {
    open: true,
    port: 7070,
    proxy: {
      '/auth': {
        target: `${baseUrl}/auth`,
        changeOrigin: true,
        secure: false
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: ['*.less']
    }
  }
})
