function HelloWorldPlugin(options) {
  this.options = options
  // 使用 options 设置插件实例……
}

HelloWorldPlugin.prototype.apply = function (compiler) {
  console.log(this.options, 'options')
  compiler.plugin('done', function (compilation) {
    console.log('Hello World!');
  });
};

module.exports = HelloWorldPlugin;