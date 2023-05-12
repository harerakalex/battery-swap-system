const path = require('path');
const isBuild = process.argv.includes('build')
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = [
  getConfig('src/BatterySwapSystem.js', 'BatterySwapSystem', withDevServer()),
];

function getConfig(entry, libraryName, extraConfig = {}) {
  return {
    mode: isBuild ? 'production' : 'development',
    entry: __dirname + '/' + entry,
    devtool: 'source-map',
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/dist/', // to make webpack-dev-server happy
      filename: libraryName + '.js',
      library: {
        name: libraryName,
        type: 'umd',
        umdNamedDefine: true,
        export: 'default',
      },
      module: false,
      globalObject: 'this',
    },
    module: {
      rules: [
        {
          test: /(\.js)$/,
          loader: 'babel-loader',
          exclude: /(node_modules)/
        },
        {
          test: /(\.js)$/,
          exclude: /(node_modules)/
        },
      ]
    },
    resolve: {
      modules: [path.resolve('./src')],
      extensions: ['.json', '.js']
    },
    ...extraConfig,
    plugins: [
      new ESLintPlugin(),
      ...(extraConfig.plugins || [])
    ],
    stats: {
      children: true,
    }
  };
}

function withDevServer() {
  return {
    devServer: {
      server: 'https',
      historyApiFallback: {
        rewrites: [
          { from: '/', to: '/examples/' },
        ]
      },
      static: {
        directory: __dirname,
      },
      port: 3000,
    },
  };
}
