/**
 * @constructor
 */
function MainManager() {
    this.MCONS = null;
    this.sysUtil = null;
    this.targetEle = null;
    this.parameter = null;
    this.main_sp_Count = 0;
    this.homecateUser = null;

    this.initParameter();
    this.initFunction();
}

MainManager.prototype.initParameter = function () {
    this.sysUtil = new SysUtil();
    this.viewUtil = new ViewUtil();
    this.homecateUser = new HomeCateUser();

    //注册公共初始化参数
    commonUtil.initParameter.call(this);

    /**
     * 初始化静态变量
     * @type {string|string}
     */
    this.GO_UL              /* 轮播UL */ = "main-go-ul";
    this.MAP_LEFT           /* 地方食左按钮 */ = "main-map-left";
    this.MAP_RIGHT          /* 地方食右按钮 */ = "main-map-right";
    this.PRODUCT_DBS_UL     /* 地方食UL */ = "main-product-dbs ul";
    this.PRODUCT_LI         /* 地方食UL li */ = "main-product-li";
    this.SP_LEFT            /* 食谱左按钮 */ = "main-sp-left";
    this.SP_RIGHT           /* 食谱右按钮 */ = "main-sp-right";
    this.CR2_ULT            /* 商品标题UL */ = "main-cr2-ultlt";
    this.HER_BG_IMG         /* 头图背景 */ = "main-her-bg img";
    this.HER_SEARCH_IMG     /* 今天我要吃什么 */ = "main-her-search img";
    this.CR1_SREAN_H2       /* 生 */ = "main-cr1-srean h2";
    this.CR1_SREAN_H3       /* 竹外桃花一两餐 */ = "main-cr1-srean h3";
    this.CR1_BG1_IMG        /* 第二个背景图 */ = "main-cr1-bg1 img";
    this.CR2_INFO_H2        /* 鲜 */ = "main-cr2-info h2";
    this.CR2_INFO_H3        /* 焦不落叶 */ = "main-cr2-info h3";
    this.CR2_BG2_IMG        /* 第三块背景图 */ = "main-cr2-bg2 img";
    this.CR2_MYEAT          /* 去哪吃按钮 */ = "main-cr2-myeat";
    this.SEARCH_INPUT_DIV   /* 我要吃input div */ = "main-search-input-div";

    /**
     * 初始化元素常量
     * @type {string|string}
     */
    this.E_CR1_SREANTOP  /* main-cr1初始高度 */ = $(".main-cr1-bg1").offset().top;
    this.E_BLK2_CNT1     /* main-cr1初始高度 */ = $(".main-blk2-cnt1").offset().top;
    this.E_CR2_INFO      /* main-cr1初始高度 */ = $(".main-cr2-info").offset().top;
    this.SEARCH_INPUT_DIV_TOP = $("#" + this.SEARCH_INPUT_DIV).offset().top;
};

MainManager.prototype.initFunction = function () {
    var that = this;
    $(window).bind('scroll', that.initScroll.bind(that));
    $(document).bind("click", that.onClickEle.bind(that));
    that.sysUtil.count.initParameter({
        "ul_count": 1,
        "map_count": 1,
        "bannerArr": {}
    });

    //初始化鼠标移动或者取消事件
    $("." + that.DOWN_UL_ALL + " li").mouseenter(that.onMouseUl.bind(that, "over")).mouseleave(that.onMouseUl.bind(that, "leave"));
    $("." + that.DOWN_UL).mouseenter(that.onMouseUlChild.bind(that, "over")).mouseleave(that.onMouseUlChild.bind(that, "leave"));

    //给UL 第一个li添加到UL后
    that.viewUtil.beforeOneLI({
        li: "." + that.GO_UL + " li",
        that: that,
        className: "",
        count: 3,
        liWidth: 252,
        initLeft: 135
    });
    that.viewUtil.appendOneLI({li: "." + that.GO_UL + " li", that: that, className: "", count: 3});
    that.viewUtil.beforeOneLI({
        li: "." + that.PRODUCT_LI,
        that: that,
        className: that.PRODUCT_LI,
        count: 1,
        liWidth: 1000,
        initLeft: 0
    });
    that.viewUtil.appendOneLI({
        li: "." + that.PRODUCT_LI,
        that: that,
        className: that.PRODUCT_LI,
        count: 1
    });

    //增加滚动条
    that.viewUtil.viewInitScroll($("." + that.DOWN_BOX));

    //注册公共初始化方法
    commonUtil.initFunction.call(that);
};

//滑动到子UL 移出和移入
MainManager.prototype.onMouseUlChild = function (type, event) {
    //调用业务工具类
    this.viewUtil.down_ul_mouse_over.call(this, type, event, [ this.DOWN_BOX, this.DOWN_UL_CHILD ]);
};

//滑动到父UL 移出和移入
MainManager.prototype.onMouseUl = function (type, event) {
    //调用业务工具类
    this.viewUtil.down_ul_mouse_move.call(this, type, event, [ this.DOWN_UL_ALL ]);
};

MainManager.prototype.onClickEle = function (event) {
    var eventObj = this.sysUtil.eventUtil.initEventParameter(event), count, that = this;

    switch (eventObj.id) {
        case that.SP_LEFT:
            that.viewUtil.moveLeftUl("." + that.GO_UL, $("." + that.GO_UL + " li").length, 135, that, 3, 252, "ul_count");
            ++count;
            break;
        case that.SP_RIGHT:
            that.viewUtil.moveRightUl("." + that.GO_UL, $("." + that.GO_UL + " li").length, -252 * 3 + 135, that, 3, 252, "ul_count");
            ++count;
            break;
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
    count = commonUtil.commonClick.call(that, eventObj, count);
    if (count) {
        return;
    }
};

//事件委托判断Class
MainManager.prototype.clickIfClass = function (eventObj, count) {
    var that = this;
    switch (eventObj.className) {
        case that.CR2_MYEAT:
            var ele = $("." + that.CR2_ULT)[ 0 ].childNodes
                , length = ele.length
                , newArray = []
                , i = 0;
            while (length--) {
                if (ele[ length ].nodeType === 1) {
                    newArray[ i++ ] = ele[ length ].childNodes[ 0 ].nodeValue.trim();
                }
                else {
                    continue;
                }

            }
            //存储 去哪吃集合
            that.sysUtil.getData.gotToEatArray = newArray.reverse();
            alert(that.sysUtil.getData.gotToEatArray);
        case that.MAP_LEFT:
            that.viewUtil.moveLeftUl("." + that.PRODUCT_DBS_UL, $("." + that.PRODUCT_LI).length, 0, that, 1, 1000, "map_count");
            ++count;
            break;
        case that.MAP_RIGHT:
            that.viewUtil.moveRightUl("." + that.PRODUCT_DBS_UL, $("." + that.PRODUCT_LI).length, -1000, that, 1, 1000, "map_count");
            ++count;
            break;
        default :
            break;
    }
    if (count) {
        return count;
    }
    if ($(eventObj.parentClass).hasClass(that.DOWN_UL_CHILD)) {
        var target = $(eventObj.target)
            , text = target.text()
            , parentEle = that.sysUtil.eventUtil.parentClass(that.sysUtil.eventUtil.parentClass(eventObj.ppClass));
        parentEle.childNodes[ 0 ].nodeValue = text;
        ++count;
    }
    return count;
};

MainManager.prototype.initScroll = function () {

    var that = this
        , scrolled = $(window).scrollTop()
        , main_cr2_info = scrolled - that.E_CR2_INFO
        , main_blk2_cnt1 = scrolled - that.E_BLK2_CNT1
        , main_cr1_sreantop = scrolled - that.E_CR1_SREANTOP
        , search_inputtop = scrolled - that.SEARCH_INPUT_DIV_TOP;
    $("." + that.HER_BG_IMG).css("top", (0 - (scrolled * 0.2)) + 'px');
    $("." + that.HER_SEARCH_IMG).css("top", (-90 - (scrolled * 0.2)) + 'px');
    if (scrolled > 375) {
        $("#" + that.SEARCH_INPUT_DIV).css("top", (45 + search_inputtop * 1.7) + 'px');
    } else {
        $("#" + that.SEARCH_INPUT_DIV).css("top", 45 + 'px');
    }
    $("." + that.CR2_BG2_IMG).css("top", (main_cr2_info * 0.2) + 'px');
    $("." + that.CR2_INFO_H2).css("top", (-main_cr2_info * 0.2) + 'px');
    $("." + that.CR2_INFO_H3).css("top", (-main_cr2_info * 0.3) + 'px');
    $("." + that.CR1_BG1_IMG).css("top", (main_cr1_sreantop * 0.2) + 'px');
    $("." + that.CR1_SREAN_H2).css("top", (-main_cr1_sreantop * 0.2) + 'px');
    $("." + that.CR1_SREAN_H3).css("top", (-main_cr1_sreantop * 0.3) + 'px');
};

//MainManager.prototype
$(document).ready(function () {
    var mainManager = new MainManager();
});