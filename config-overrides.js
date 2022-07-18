const {
  override,
  fixBabelImports,
  addWebpackExternals,
  addWebpackAlias,
  addLessLoader
} = require('customize-cra')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path')

// 写法一：
// module.exports = function override(config, env) {
//   return config
// }

// 写法二：
// module.exports = {
//   webpack: function (config, env) {
//     return config
//   }
// }


module.exports = override(
  addWebpackAlias({ //路径别名
    '@': path.resolve(__dirname, 'src'),
  }),

  // 对webpack的配置项进行配置
  (config, env) => {
    config.plugins = [

      ...config.plugins, // 默认插件

      // 新添加的插件
      new MonacoWebpackPlugin(),
    ]
    return config
  }
)