function ToEatManager() {
    this.sysUtil = null;
    this.initParameter();
    this.initFunction();
}

ToEatManager.prototype.initParameter = function () {
    var that = this;
    this.sysUtil = new SysUtil();
    this.viewUtil = new ViewUtil();
    commonUtil.initParameter.call(this);
};
//common-close
ToEatManager.prototype.initFunction = function () {
    var that = this;

    $(document).bind("click", that.onClickEle.bind(that));

    //初始化鼠标移动或者取消事件
    $("." + that.DOWN_UL_ALL + " li").mouseenter(that.onMouseUl.bind(that, "over")).mouseleave(that.onMouseUl.bind(that, "leave"));
    $("." + that.DOWN_UL).mouseenter(that.onMouseUlChild.bind(that, "over")).mouseleave(that.onMouseUlChild.bind(that, "leave"));

    //增加滚动条
    that.viewUtil.viewInitScroll($("." + that.DOWN_BOX));
};

//滑动到子UL 移出和移入
ToEatManager.prototype.onMouseUlChild = function (type, event) {
    //调用业务工具类
    this.viewUtil.down_ul_mouse_over.call(this,type,event,[this.DOWN_BOX,this.DOWN_UL_CHILD]);
};

//滑动到父UL 移出和移入
ToEatManager.prototype.onMouseUl = function (type, event) {
    //调用业务工具类
    this.viewUtil.down_ul_mouse_move.call(this,type,event,[this.DOWN_UL_ALL]);
};

ToEatManager.prototype.clickToClassName = function (eventObj, temp) {
    var that = this;
    switch (eventObj.className) {
        case that.PRO_NAME:
            temp = 1;
            break;
    }
    return temp;
};

ToEatManager.prototype.clickToParentClassName = function (eventObj, temp) {
    var that = this;
    switch (eventObj.parentClassName) {
        default :
            break;
    }
    return temp;
};

ToEatManager.prototype.clickToIf = function (eventObj, temp) {
    var that = this;

};

ToEatManager.prototype.initScrollFun = function () {
    var that = this;
};

/**
 * document 委托onClick
 * @param event
 */
ToEatManager.prototype.onClickEle = function (event) {
    var that = this
        , eventObj = that.sysUtil.eventUtil.initEventParameter(event)
        , temp = -1;

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
    var shoppingManager = new ToEatManager();
});