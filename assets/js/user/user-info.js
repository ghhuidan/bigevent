$(function() {
    // 表单信息验证

    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            // value参数拿到输入昵称时的value值
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间！'
            }
        }
    })
    initUserinfo()
        // 获取用户信息，渲染到表单内
    function initUserinfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                form.val('formUserinfo', res.data)
                console.log(res.data);

            }
        })
    }


    // 重置按钮
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
            // 重新获取用户信息
        initUserinfo()

    })

    // 提交修改信息
    // 注意，是整个表单的提交事件监听，不是提交按钮
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('提交信息失败！')
                }
                layer.msg('提交成功！')
                    // 后台页面重新获取用户数据，并渲染头像和昵称
                window.parent.getuserInfo()
                    // 在子页面中调父页面中的函数，子在iframe中，window代表iframe页面，parent代表index页面
            }
        })
    })
})