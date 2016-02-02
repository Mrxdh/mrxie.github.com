/**
 * @constructor
 */
function Comment() {
    this.MCONS = null;
    this.sysUtil = null;
    this.targetEle = null;
    this.parameter = null;
    this.main_sp_Count = 0;
    this.homecateUser = null;

    this.initParameter();
    this.initFunction();
}

Comment.prototype.initParameter = function () {
    this.sysUtil = new SysUtil();
    this.viewUtil = new ViewUtil();
    this.homecateUser = new HomeCateUser();

    this.sysUtil.count.initParameter({
        "ul_count": 1,
        "bannerArr": {}
    });

    /**
     * 初始化静态变量
     * @type {string|string}
     */
    this.COMMENT_UL              /* 轮播UL */ = "myself-comment-ul";
    this.ONE_COMMONT             /* 轮播UL LI */ = "myself-one-commont";
    this.FOOTER_LEFT           /* 左按钮 */ = "myself-footer-left";
    this.FOOTER_RIGHT          /* 右按钮 */ = "myself-footer-right";

    //注册公共初始化参数
    commonUtil.initParameter.call(this);
};

Comment.prototype.initFunction = function () {
    var that = this;

    $(document).bind("click", that.onClickEle.bind(that));

    //给UL 第一个li添加到UL后
    that.viewUtil.beforeOneLI({
        li: "." + that.COMMENT_UL + " li",
        that: that,
        className: that.ONE_COMMONT,
        count: 3,
        liWidth: 260,
        initLeft: 0
    });
    that.viewUtil.appendOneLI({li: "." + that.COMMENT_UL + " li", that: that, className: that.ONE_COMMONT, count: 3});
};

Comment.prototype.onClickEle = function (event) {
    var eventObj = this.sysUtil.eventUtil.initEventParameter(event), count, that = this;

    switch (eventObj.id) {
        //case that.FOOTER_RIGHT:
        //    ++count;
        //    break;
        default :
            break;
    }
    if (count) {
        return;
    }
    count = that.clickIfClass.call(that, eventObj, count);
    if (count) {
        return;
    }
};

//事件委托判断Class
Comment.prototype.clickIfClass = function (eventObj, count) {
    var that = this;
    switch (eventObj.className) {
        case that.FOOTER_LEFT:
            that.viewUtil.moveLeftUl("." + that.COMMENT_UL, $("." + that.COMMENT_UL + " li").length, 0, that, 3, 260, "ul_count");
            ++count;
            break;
        case that.FOOTER_RIGHT:
            that.viewUtil.moveRightUl("." + that.COMMENT_UL, $("." + that.COMMENT_UL + " li").length, -260 * 3 + 0, that, 3, 260, "ul_count");
            ++count;
            break;

        //case that.SP_LEFT:
        //    that.viewUtil.moveLeftUl("." + that.GO_UL, $("." + that.GO_UL + " li").length, 135, that, 3, 252, "ul_count");
        //    ++count;
        //    break;
        //case that.SP_RIGHT:
        //    that.viewUtil.moveRightUl("." + that.GO_UL, $("." + that.GO_UL + " li").length, -252 * 3 + 135, that, 3, 252, "ul_count");
        //    ++count;

        default :
            break;
    }
    return count;
};

$(document).ready(function () {
    var comment = new Comment();
});