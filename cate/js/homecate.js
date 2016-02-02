function HomeCateUser() {

}

HomeCateUser.prototype = {
    userLogin: function () {
        $("." + this.FLEX_LR).hide();
        $("#" + this.FLEX_LEAVE).show();
        $("." + this.FLEX_OPERATE).show();
        $("." + this.FLEX_INFOUSER).show();
    },
    userLeave: function () {
        $("." + this.FLEX_LR).show();
        $("#" + this.FLEX_LEAVE).hide();
        $("." + this.FLEX_OPERATE).hide();
        $("." + this.FLEX_INFOUSER).hide();
    }
};

var commonUtil = (function () {
    return {
        getNowTime: new Date().getTime(),
        initConfigParameter: function () {
            this.base = 'http://www.aicanzhuo.cn';
            this.static_url = 'http://static.homecate.com';
            this.image_url = 'http://file.homecate.com';
        },
        initParameter: function () {
            /**
             * 初始化静态变量
             * @type {string|string}
             */
            this.FLEX                   /* 右侧工具栏元素 */ = "common-flex";
            this.FLEX_USER              /* 右侧工具栏左侧图片标题元素 */ = "common-flex-user";
            this.FLEX_INFOUSER          /* 用户名信息 */ = "common-flex-infouser";
            this.FLEX_OPERATE           /* 用户选择 */ = "common-flex-operate";
            this.FLEX_TO_SHOPPING       /* 购物 */ = "common-flex-to-shopping";
            this.FLEX_LR                /* 登录注册父节点 */ = "common-flex-lr";
            this.FLEX_LRLOGIN           /* 登录 */ = "common-flex-lrlogin";
            this.FLEX_LRSTER            /* 注册 */ = "common-flex-lrster";
            this.FLEX_LEAVE             /* 注销 */ = "common-flex-leave";
            this.COMMON_SHADE           /* 遮罩层 */ = "common-shade";
            this.SHADE_CLOSE            /* 关闭遮罩窗口 */ = "common-shade-close";
            this.DOWN_UL                /* 商品标题子UL */ = "common-down-ul";
            this.DOWN_BOX               /* 商品标题子UL */ = "common-down-box";
            this.DOWN_UL_ALL            /* 商品标题子UL */ = "common-down-ul-all";
            this.DOWN_UL_CHILD          /* 商品标题子UL */ = "common-down-ul-child";
        },
        initHtmlParameter: function () {
            this.auth_code =
                '<span>' +
                '<a href="javascript:void(0);" onclick="switch_auth_code();"><img id="auth_code_img" src="' + this.base + '/util/code?t=' + commonUtil.getNowTime + '" alt="loading..." /></a>' +
                '<a href="javascript:void(0);" onclick="switch_auth_code();">&nbsp;换一张?</a>' +
                '</span>';
        },
        initFunction: function () {
            $("#" + this.FLEX_LEAVE).hide();
            $("." + this.FLEX_OPERATE).hide();
            $("." + this.FLEX_INFOUSER).hide();

            $("." + this.FLEX_USER).hover((function () {
                $("." + this.FLEX).css("right", "0px");
            }).bind(this), (function () {
                $("." + this.FLEX).css("right", "-71px");
            }).bind(this));
        },
        initAnimationFrame: function () {
            window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        },
        commonClick: function (eventObj, count) {
            switch (eventObj.id) {
                case this.FLEX_LRLOGIN:
                    this.homecateUser.userLogin.bind(this)();
                    ++count;
                    break;
                case this.FLEX_LRSTER:
                    ++count;
                    break;
                case this.FLEX_LEAVE:
                    this.homecateUser.userLeave.bind(this)();
                    ++count;
                    break;
                default:
                    break;
            }
            return count;
        }
    };
})();

$(function(){
    var homecate=new HomeCateUser();
    commonUtil.initParameter.call(homecate);
    commonUtil.initFunction.call(homecate);
});