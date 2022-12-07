const path = require('path')
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './app.js',
  target: 'node',
  mode: 'development',
  externals: [nodeExternals()],
  externalsPresets: {
      node: true
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-object-rest-spread'],
          },
        },
      },
    ],
  },
}
