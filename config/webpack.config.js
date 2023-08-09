const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = function (env) {
  const minimize = Boolean(env && env.hasOwnProperty('minimize'))

  return {
    mode: 'production',
    entry: {
      index: path.join(__dirname, "../src/CustomBpmnViewer.js"),
    },
    output: {
      path: path.join(__dirname, "../dist/"),
      filename: "index.js",
      libraryTarget: 'umd', // 采用通用模块定义
      libraryExport: 'default', // 兼容 ES6 的模块系统、CommonJS 和 AMD 模块规范
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: 'raw-loader'
          //  loader: [MiniCssExtractPlugin.loader,'css-loader?modules'],
        },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "main.min.css" // 提取后的css的文件名
      })
    ],
    externals: { // 定义外部依赖，避免把react和react-dom打包进去
      react: {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      },
      "react-dom": {
        root: "ReactDOM",
        commonjs2: "react-dom",
        commonjs: "react-dom",
        amd: "react-dom"
      }
    },
  }
};