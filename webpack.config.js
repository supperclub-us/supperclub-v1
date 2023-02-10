const Dotenv = require('dotenv-webpack')
module.exports = {
  entry: ["mapbox-gl/dist/mapbox-gl.css", './client/index.js'],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
  },
  context: __dirname,
  devtool: 'source-map',
  // this allows .env to happen
  plugins: [ new Dotenv({
    path: '.env', // or '.env.local', '.env.[mode]', etc.
    }) ],
  module: {
    rules: [
      {
        // this allows css styling loader
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
