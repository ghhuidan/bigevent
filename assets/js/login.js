$(function() {
    // 为 a绑定点击事件
    $('#link-log').on('click', function() {
        $('.login').show()
        $('.reg').hide()
    })
    $('#link-reg').on('click', function() {
        $('.login').hide()
        $('.reg').show()
    })

    // 运用layui自定义表单验证规则
    var form = layui.form
    var layer = layui.layer
        //    通过 form的verify()方法自定义规则
    form.verify({
        // 自定义一个叫pwd的校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6~12位，且不能出现空格'],
        // 校验两次密码是否一致
        repwd: function(value) { //形参是确认密码input里面的值
            var pwd = $('.reg [name=password]').val() //获取到原密码input里面的值
            if (pwd !== value) {
                return '两次密码不一致'
            }

        }
    })

    // 监听注册提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
            //要求post提交的请求体是username和password，以键值对的形式
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录！')
                // 登录成功后，自动点击登录连接
            $('#link-log').click()
        })
    })

    // 登录事件
    $('#form_log').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                    // 将身份真正信息储存到本地
                localStorage.setItem('token', res.token)
                    // 登录成功之后，跳转到首页
                location.href = '/index.html'
            }
        })
    })
})