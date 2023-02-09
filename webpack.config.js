const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: ["mapbox-gl/dist/mapbox-gl.css", './client/index.js'],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
  },
  context: __dirname,
  devtool: 'source-map',
  plugins: [ new Dotenv({
    path: '.env', // or '.env.local', '.env.[mode]', etc.
    }) ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
};
