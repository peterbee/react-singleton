const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.join(__dirname, './src')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              'transform-runtime',
              'transform-class-properties'
            ],
            presets: ['react', 'env']
          }
        }
      }
    ]
  }
};
