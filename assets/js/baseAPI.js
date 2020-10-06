// 每次调用get，post，ajax 之前，都会调用这个函数。
// 可以拿到我们提供给ajax的配置对象
// 导入时，只能放到jquery后面，自己写的js文件前面
$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
        // options.url就是自己写的逻辑js中的url具体路径
})