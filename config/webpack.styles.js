/* eslint import/no-extraneous-dependencies: 0 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const GlobalFilter = [/node_modules/, /react-md/, /\.global.(scss|css)/];
const Test = /\.(scss|css)$/;
let DEBUG = false;


function StyleLoader() {
  return { loader: 'style-loader' };
}

function CSSLoader(CSSModules) {
  return {
    loader: 'css-loader',
    options: {
      modules: CSSModules,
      importLoaders: 2,
      sourceMap: DEBUG,
      localIdentName: '[name]--[local]--[hash:base64:8]',
      minimize: !DEBUG,
    },
  };
}

function PostCSSLoader() {
  return {
    loader: 'postcss-loader',
    options: {
      sourceMap: DEBUG ? 'inline' : '',
      plugins: [autoprefixer()],
    },
  };
}

function SassLoader() {
  return { loader: 'sass-loader' };
}

function PluginWrap(styleconfig) {
  const newStyleConfig = Object.assign({}, styleconfig);
  const newUse = newStyleConfig.use.slice();
  newUse.shift();
  newStyleConfig.use = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: newUse,
  });
  return newStyleConfig;
}

function PluginAppend(config) {
  const newConfig = Object.assign({}, config);
  newConfig.plugins.push(new ExtractTextPlugin('styles.css'));
  return newConfig;
}

function Styles(debug) {
  DEBUG = debug;
  let styleConfig = {
    module: {
      rules: [],
    },
    plugins: [],
  };
  const styleLoaders = [
    {
      test: Test,
      exclude: GlobalFilter,
      use: [
        StyleLoader(),
        CSSLoader(true),
        PostCSSLoader(),
        SassLoader(),
      ],
    },
    {
      test: Test,
      include: GlobalFilter,
      use: [
        StyleLoader(),
        CSSLoader(false),
        PostCSSLoader(),
        SassLoader(),
      ],
    },
  ];
  if (!DEBUG) {
    styleConfig.module.rules.push(PluginWrap(styleLoaders[0]), PluginWrap(styleLoaders[1]));
    styleConfig = PluginAppend(styleConfig);
  } else {
    styleConfig.module.rules.push(...styleLoaders);
  }
  return styleConfig;
}

module.exports = Styles;
