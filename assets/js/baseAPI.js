// 每次调用get，post，ajax 之前，都会调用这个函数。
// 可以拿到我们提供给ajax的配置对象
// 导入时，只能放到jquery后面，自己写的js文件前面
$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
        // options.url就是自己写的逻辑js中的url具体路径

    // headers统一配置
    // 先看看路径里有没有/my 字符
    if (options.url.indexOf(/my/) !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 防止无权限访问后台页面
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }

})