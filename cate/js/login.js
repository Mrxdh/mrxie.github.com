/**
 * 用户页面管理类
 */
function LoginManager() {
    this.shade = null;
    this.sysUtil = null;
    this.initParameter();
    this.initFunction();
}

/**
 * 初始化参数
 * @return {[type]} [description]
 */
LoginManager.prototype.initParameter = function () {
    var that = this;
    this.shade = new Shade();
    this.sysUtil = new SysUtil();
    commonUtil.initParameter.call(this);
    commonUtil.initConfigParameter.call(this);
    commonUtil.initHtmlParameter.call(this);

    this.SELECT /*用户选中*/ = "user-select";
    this.OPTIONS_TAB = "user-options-tab";
    this.CONTEXT /* 容器内容 */ = "user-context";
    this.LOGIN_CLASS /* 登陆样式 */ = "user-login-input";
    this.REGISTER_CLASS /* 注册样式 */ = "user-register-input";
    this.FORGET_CLASS /* 忘记密码样式 */ = "user-forget-input";
};

/**
 * 初始化方法
 * @return {[type]} [null]
 */
LoginManager.prototype.initFunction = function () {
    var that = this;
    $(document).bind("click", that.onClickEle.bind(that));
};

LoginManager.prototype.clickToClassName = function (eventObj, temp) {
    var that = this;
    switch (eventObj.className) {
        //case that.OPTIONS_TAB:
        //    that.shade.showShade(that.COMMON_SHADE);
        //    that.shade.pageShade(that.SHADE_CONTEXT);
        //    temp=1;
        //    break;
    }
    return temp;
};

/**
 * 切换tab
 * @param eventObj
 */
LoginManager.prototype.tabOptions = function (eventObj) {
    var target = $(eventObj.target),
        data_main = target.attr("data-type");
    this.tabOption(data_main);
};

/**
 * 实际操作接口
 */
LoginManager.prototype.tabAssign = function (containerCls, container, html, type) {
    var that = this;
    $("." + that.SELECT).removeClass();
    container[ 0 ].className = that.CONTEXT;
    $("li[data-type|=" + type + "]").addClass(that.SELECT);
    container.addClass(containerCls);
    container.html(html);
};

/**
 * 用于处理登录的业务
 * @param  {[type]} option [description]
 * @return {[type]}        [description]
 */
LoginManager.prototype.login = function () {
    var that = this;

    $('#name').keydown(function (e) {
        var key = e.which;
        if (13 == key) {
            $('#password').focus();
            return false;
        }
        return true;
    });

    $('#password').keydown(function (e) {
        var key = e.which;
        if (13 == key) {
            $('#code').focus();
            return false;
        }
        return true;
    });

    $('#code').keydown(function (e) {
        var key = e.which;
        if (13 == key) {
            $('#btnSubmit').click();
            return false;
        }
        return true;
    });

    $('#autoSignIn').click(function () {
        if ($('#autoSignIn').is(':checked')) {
            $('#rememberID').prop('checked', true);
        }
    });

    $('#btnSubmit').click(function () {
        var ok = true;

        if (!check_user_id($('#name').val())) {
            $('#divUserName').addClass('has-error');
            $('#divUserNameHelp').fadeIn();
            ok = false;
        }
        if ("" == $('#password').val()) {
            $('#divPassword').addClass('has-error');
            $('#divPasswordHelp').fadeIn();
            ok = false;
        }
        if ("" == $('#code').val()) {
            $('#divCode').addClass('has-error');
            $('#divCodeHelp').fadeIn();
            ok = false;
        }

        if (ok) {
            $('#divFormAlert').hide();
            $('#btnSubmit').attr('disabled', true);
            $.post(
                base + '/account/signin/authorize',
                {
                    'name': $('#name').val(),
                    'password': $('#password').val(),
                    'code': $('#code').val(),
                    'rememberId': $('#rememberID').is(':checked'),
                    'autoLogin': $('#autoSignIn').is(':checked')
                },
                function (json) {
                    switch_auth_code();
                    $('#divFormAlert').show();
                    if (json.ok) {
                        show_alert(json.msg, 'alert-success');
                        window.setTimeout(function () {
                            window.location.href = base + '/';
                        }, 2000);
                    } else {
                        show_alert(json.msg, 'alert-danger');
                        $('#btnSubmit').removeAttr('disabled');
                    }
                },
                'json'
            );
        }
    });
};

/**
 * 操作接口
 * @param option
 */
LoginManager.prototype.tabOption = function (option) {
    var that = this,
        data_main = option,
        container = $("." + that.CONTEXT),
        html;
    switch (data_main) {
        case "login":
            if (container.hasClass(that.LOGIN_CLASS)) {
                return;
            } else {
                html =
                    '<div class="user-input">' +
                    '<div class="user-input-user">' +
                    '<input type="text" id="name" name="name" placeholder="用户ID/邮箱/手机号"/>' +
                    '<span id="divUserNameHelp" class="help-block">请输入您的用户ID、Email或手机号码。</span>' +
                    '</div>' +
                    '<div class="user-input-password">' +
                    '<input type="password" id="password" name="password" placeholder="请输入您的密码"/>' +
                    '<span id="divPasswordHelp" class="help-block">请输入您的用户密码。</span>' +
                    '</div>' +
                    '<div class="user-input-code">' +
                    '<div class="user-input-box">' +
                    '<input type="text" id="code" name="code" placeholder="请输入验证码"/>' +
                    that.auth_code +
                    '</div>' +
                    '<span id="divCodeHelp" class="help-block">请输入图片中的验证码。</span>' +
                    '</div>' +
                    '</div>' +
                    '<div class="user-checkbox"><input type="checkbox" checked=checked id="rememberID" name="rememberID"> 记住密码<input type="checkbox" id="autoSignIn" name="autoSignIn"> 自动登录</div>' +
                    '<div class="user-option">' +
                    '<ul>' +
                    '<li><h2 id="btnSubmit">登陆</h2></li>' +
                    '<li><h2 id="divFormAlert" class="error-prompt"></h2></li>' +
                    '</ul>' +
                    '</div>';
                this.tabAssign(that.LOGIN_CLASS, container, html, data_main);
                this.login();
            }
            break;
        case "register":
            if (container.hasClass(that.REGISTER_CLASS)) {
                return;
            } else {
                html =
                    '<div class="user-input">' +
                    '<input type="text" placeholder="用户名"/>' +
                    '<input type="text" placeholder="密码"/>' +
                    '<input type="text" placeholder="再次输入密码"/>' +
                    '</div>' +
                    '<div class="user-checkbox">' +
                    '<input type="checkbox" checked /> 我已阅读并同意《嘉瑶用户注册协议》' +
                    '</div>' +
                    '<div class="user-option">' +
                    '<ul>' +
                    '<li>' +
                    '<h2>注册</h2>' +
                    '</li>' +
                    '</ul>' +
                    '</div>';
                this.tabAssign(that.REGISTER_CLASS, container, html, data_main);
            }
            break;
        case "forget":
            if (container.hasClass(that.FORGET_CLASS)) {
                return;
            } else {
                html =
                    '<div class="user-input">' +
                    '<input type="text" placeholder="账号"/>' +
                    '<input type="text" placeholder="输入图中验证码"/>' +
                    '<input type="text" placeholder="输入新密码"/>' +
                    '<input type="text" placeholder="再次输入新密码"/>' +
                    '</div>' +
                    '<div class="user-option">' +
                    '<ul>' +
                    '<li>' +
                    '<h2>保存新密码</h2>' +
                    '</li>' +
                    '</ul>' +
                    '</div>';
                this.tabAssign(that.FORGET_CLASS, container, html, data_main);
            }
            break;
        default:
            throw new Error("请选择您的操作！");
    }
};

/**
 * 监听父类点击
 * @param  {[Object]} eventObj [事件监听初始化参数字典]
 * @param  {[int]} temp     [临时变量]
 * @return {[int]}          [是否被调用临时变量]
 */
LoginManager.prototype.clickToParentClassName = function (eventObj, temp) {
    var that = this;
    switch (eventObj.parentClassName) {
        case this.OPTIONS_TAB:
            this.tabOptions(eventObj);
            ++temp;
            break;
        default:
            break;
    }
    return temp;
};

LoginManager.prototype.clickToIf = function (eventObj, temp) {
    var that = this;
};

LoginManager.prototype.initScrollFun = function () {
    var that = this;
};

/**
 * document 委托onClick
 * @param event
 */
LoginManager.prototype.onClickEle = function (event) {
    var that = this,
        eventObj = that.sysUtil.eventUtil.initEventParameter(event),
        temp = -1;

    temp = that.clickToClassName.call(that, eventObj, temp);
    if (temp === 1) {
        return;
    }

    temp = that.clickToParentClassName.call(that, eventObj, temp);
    if (temp === 1) {
        return;
    }

    that.clickToIf.call(that, eventObj);
};

$(function () {
    var login_manager = new LoginManager();
});
