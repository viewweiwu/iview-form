'use strict'
const webpack = require('webpack')
const config = require('./webpack.base.conf')
// 修改入口文件
config.entry = {
  'iview-form': './src/index.js'
}
// 修改输出目录
config.output = {
  filename: './lib/[name].js',
  library: 'iview-form',
  libraryTarget: 'umd'
}
// 配置externals选项
config.externals = {
  vue: {
    root: 'Vue',
    commonjs: 'vue',
    commonjs2: 'vue',
    amd: 'vue'
  }
}
// 配置plugins选项
config.plugins = [
  new webpack.DefinePlugin({
    'process.env': require('../config/prod.env')
  })
]
// 删除devtool配置
delete config.devtool

module.exports = config