const path = require('path');
var prod = process.env.NODE_ENV === 'production';
var debug = process.env.NODE_ENV === 'debug';

// 【config】配置Less自动添加浏览器前缀-1  需要安装less-plugin-autoprefix
const LessPluginAutoPrefix = require('less-plugin-autoprefix')

module.exports = {
  wpyExt: '.wpy',
  eslint: true,
  cliLogs: !prod,
  build: {
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
    aliasFields: ['wepy', 'weapp'],
    modules: ['node_modules']
  },
  compilers: {
    less: {
      compress: prod,
      // 【config】配置Less自动添加浏览器前缀-2
      plugins: [new LessPluginAutoPrefix({browsers: ['Android >= 2.3', 'Chrome > 20', 'iOS >= 6']})]
    },
    /*sass: {
      outputStyle: 'compressed'
    },*/
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-class-properties',
        'transform-decorators-legacy',
        'transform-object-rest-spread',
        'transform-export-extensions',
      ]
    }
  },
  plugins: {
  },
  appConfig: {
    noPromiseAPI: ['createSelectorQuery'],
    // 【config】配置启动地址
    rootURL: prod ? '线上地址' : debug ? 'mock地址' : '本地测试地址'
  }
}

if (prod) {

  // 压缩sass
  // module.exports.compilers['sass'] = {outputStyle: 'compressed'}

  // 压缩js
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {
        compress: {
          // 打包后自动去除所有log debugger
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    }
  }
}
