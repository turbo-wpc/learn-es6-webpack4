const path = require("path")
const os = require("os")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const HappyPack = require("happypack")
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})
const webpack = require("webpack")

const ExtractTextPlugin = require('extract-text-webpack-plugin')//css单独打包插件

module.exports = {
  devtool: 'inline-source-map',//源代码映射：定位错误信息到源代码，而不是bundle文件，便于调试
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        //在入口文件中引入html文件，让html与入口文件产生依赖，并使用raw-loader对html文件进行处理，实现html热更新
        test: /\.(htm|html)$/,
        use: ['raw-loader']
      },
      {
        test: /\.less$/,
        // use: ExtractTextPlugin.extract({
        //   use: "happypack/loader?id=less"
        // })
        use: ["happypack/loader?id=less"]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name].[ext]"
            }
          }
        ]
      },
      {
        //图片小于8k，返回一个 DataURL
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: ["happypack/loader?id=js"]
      },
      {
        test: /\.tsx?$/,
        use: ["happypack/loader?id=ts"]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      TEST: true,
      Test_TRUE: JSON.stringify(true)
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "generate title",
      template: "./template/index.html"
    }),
    new HappyPack({
      id: "less",
      threadPool: happyThreadPool,
      loaders: ["style-loader","css-loader","less-loader"]
    }),
    new HappyPack({
      id: "js",
      threadPool: happyThreadPool,
      loaders: ['babel-loader?cacheDirectory']
    }),
    new HappyPack({
      id: "ts",
      threadPool: happyThreadPool,
      loaders: ['ts-loader']
    }),
    new ExtractTextPlugin('[name].css')
  ],
  //devServer：webpack-dev-server的配置属性
  //注：webpack打包和webpack-dev-server开启服务的区别——webpack输出真实的文件，而webpack-dev-server输出的文件只存在于内存中,不输出真实的文件
  devServer: {
    contentBase: path.join(__dirname, "dist"),  //指定服务器资源的根目录，如果不写入contentBase的值，那么contentBase默认是项目的根目录
    port: 8082, //指定开启服务端口号
    host: "127.0.0.1",  //设置服务器主机号
    overlay: true,  //在编译出错的时候，在浏览器页面上显示错误，默认是false，可设置为true
    stats: "errors-only", //控制编译的时候shell上的输出内容："errors-only"只打印错误、"minimal"、"normal"、"verbose"
    hot: true, //启用 webpack 的模块热替换特性
    open: true  //开启默认浏览器
  },
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.css'] //后缀名自动补全
  }
}