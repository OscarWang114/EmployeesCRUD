const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: {
    bundle: './src/App.jsx'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'static/js'),
  },
  //target: 'node',
  //externals: [nodeExternals()],
  module:{
    loaders:[
      {
        test:/\.jsx$/,
        loader: 'babel-loader',
        //exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
