function ShoppingManager() {
    this.shade= null;
    this.sysUtil = null;
    this.initParameter();
    this.initFunction();
}

ShoppingManager.prototype.initParameter = function () {
    var that=this;
    this.shade = new Shade();
    this.sysUtil = new SysUtil();
    commonUtil.initParameter.call(this);
    this.PRO_NAME = "shopping-pro-name";
    this.SHADE_CONTEXT = /* 遮罩层内容 */"shopping-shade-context";
};
//common-close
ShoppingManager.prototype.initFunction = function () {
    var that=this;

    $(document).bind("click", that.onClickEle.bind(that));
};

ShoppingManager.prototype.clickToClassName = function (eventObj, temp) {
    var that = this;
    switch (eventObj.className) {
        case that.PRO_NAME:
            that.shade.showShade(that.COMMON_SHADE);
            that.shade.pageShade(that.SHADE_CONTEXT);
            temp=1;
            break;
    }
    return temp;
};

ShoppingManager.prototype.clickToParentClassName = function (eventObj, temp) {
    var that = this;
    switch (eventObj.parentClassName) {
        default :
            break;
    }
    return temp;
};

ShoppingManager.prototype.clickToIf = function (eventObj, temp) {
    var that = this;

    if (!eventObj.className.indexOf(that.SHADE_CLOSE)) {
        that.shade.hideShade(that.COMMON_SHADE);
        return;
    }
};

ShoppingManager.prototype.initScrollFun=function(){
    var that=this;
};

/**
 * document 委托onClick
 * @param event
 */
ShoppingManager.prototype.onClickEle = function (event) {
    var that=this
        ,eventObj = that.sysUtil.eventUtil.initEventParameter(event)
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

$(function(){
    var shoppingManager=new ShoppingManager();
});