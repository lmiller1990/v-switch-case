const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')

const commonConfig = {
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      { 
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/,
        options: {
          babelrc: false
        }
      }
    ]
  },
  optimization: {
    minimize: true
  }
}


module.exports = [
  // browser
  merge(commonConfig, {
    entry: path.resolve(__dirname, 'plugin.js'),
    output: {
      filename: 'v-switch.min.js',
      libraryTarget: 'window',
      library: 'VSwitch'
    }
  }),

  // node
  merge(commonConfig, {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
      libraryTarget: 'commonjs2',
      filename: 'v-switch.js'
    }
  })
]
