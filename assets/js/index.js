$(function() {
    getuserInfo()
        // 退出登录
    var layer = layui.layer
    $('#logOut').on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            // 退出本地存储的token
            localStorage.removeItem('token')
                // 返回登录页面
            location.href = '/login.html'
                // 关闭confirm询问框（自带的）
            layer.close(index);
        });
    })
})

// 获取用户基本信息
function getuserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',

        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用渲染用户名的函数
            renderAvatar(res.data)
        },


    })
}

// 渲染用户名的函数
function renderAvatar(user) {
    // 选取名字时用 或 规定优先级
    var uname = user.nickname || user.username
    $('.welcome').html('欢迎&nbsp;&nbsp;' + uname)
    if (user.user_pic !== null) {
        // 为img添加src属性，并赋值
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
            // uname[0]截取名字的首字母，把name看成一个数组
        var first = uname[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }


}