module.export = {
  //只有开启监听模式时，watchOptions才有意义
  //默认false，也就是不开启
  watch: true,
  wathcOptions: {
    //不监听的文件或者文件夹，支持正则匹配
    //默认为空
    ignored: /node_modules/,
    //监听到变化发生后会等300ms再去执行动作，防止文件更新太快
    //默认为300ms
    aggregateTimeout: 300,
    //判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的
    //默认每秒问1000次
    poll: 1000
  },
  devServer: {
    contentBase: path.join(__dirname, "src"),
    compress: true,
    port: 9000
  }
}
