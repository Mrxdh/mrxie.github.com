~function () {
    Function.prototype.before = function (fn) {
        var _self = this;
        return function () {
            fn.apply(this, arguments);
            _self.apply(this, arguments);
        };
    };

    Function.prototype.after = function (fn) {
        var _self = this;
        return function () {
            _self.apply(this, arguments);
            fn.apply(this, arguments);
        };
    };
}();

var static_url;
function Shade() {
    this.cfg = {
        height: "75%",
        content: "",
        width: "900px",
        MainClass: null
    }
}

Shade.prototype = {
    constructor: Shade,
    showShade: function (ele, cfg) {
        var CFG;
        $("body").css("overflow-y", "hidden");
        $("html").css("overflow-y", "hidden");
        if (ele) {
            $("." + ele).removeClass("noneEle");
        }
        if (cfg && cfg.MainClass) {
            CFG = $.extend(this.cfg, cfg);
            $(CFG.MainClass).css({
                width: CFG.width,
                height: CFG.height
            });
        }
    },
    hideShade: function (ele) {
        $("body").css("overflow-y", "initial");
        $("html").css("overflow-y", "initial");
        if (ele) {
            $("." + ele).addClass("noneEle");
        }
    },
    pageShade: function (main_ele, ele_str, fn) {
        if (ele_str) {
            $("." + main_ele).html(ele_str);
            fn && fn();
        }
    }
};

//滚动条工具类
function Scroll() {
    this._dc = document;
    this._wheelData = -1;
    this._scrollHeight = 0;
}

//创建滚动条
Scroll.prototype._createScroll = function (mainBox, scrollClass, outScrollClass) {
    var _scroll = this._dc.createElement('div')
        , _scrollBox = this._dc.createElement('div');
    _scrollBox.appendChild(_scroll);
    _scroll.className = scrollClass;
    _scrollBox.className = outScrollClass;
    mainBox.append(_scrollBox);
    return _scroll;
};

/* 设置滚动条 */
Scroll.prototype._setScroll = function (scrollDiv, mainBox, contentBox, contentHeight) {
    var _height = Math.ceil(mainBox.height())
        , _conHeight = (!!contentHeight) ? contentHeight : contentBox.height();
    //设置滚动条高度
    this._scrollHeight = parseInt(_height * (_height / _conHeight));
    if (this._scrollHeight >= _height) {
        scrollDiv.parentNode.style.display = "none";
    }
    scrollDiv.style.height = this._scrollHeight + "px";
};

/* 拖拽滚动条 */
Scroll.prototype._dragScroll = function (scrollDiv, mainBox, contentBox) {
    var mainHeight = mainBox.height(), that = this;
    scrollDiv.onmousedown = function (event) {
        var _this = this;
        var _scrollTop = scrollDiv.offsetTop;
        var e = event || window.event;
        var top = e.clientY;
        document.onmousemove = scrollGo;
        document.onmouseup = function (event) {
            this.onmousemove = null;
        };
        function scrollGo(event) {
            var e = event || window.event
                , _top = e.clientY
                , _t = _top - top + _scrollTop;
            if (_t > (mainHeight - scrollDiv.offsetHeight)) {
                _t = mainHeight - scrollDiv.offsetHeight;
            }
            if (_t <= 0) {
                _t = 0;
            }
            scrollDiv.style.top = _t + "px";
            contentBox.css("top", -_t * (contentBox.height() / mainBox.height()) + "px");
            that._wheelData = _t;
        }
    }
};

//鼠标滚动绑定
Scroll.prototype._mouseWheel = function (obj, handler) {
    var node = typeof obj == "string" ? $(obj) : obj;
    node.bind('mousewheel', function (event) {
        var data = -getWheelData(event);
        handler(data);
        if (document.all) {
            window.event.returnValue = false;
        } else {
            event.preventDefault();
        }
    });
    //兼容火狐
    node.bind('DOMMouseScroll', function (event) {
        var data = getWheelData(event);
        handler(data);
        event.preventDefault();
    });
    function getWheelData(event) {
        var e = event.originalEvent || window.event;
        return e.wheelDelta ? e.wheelDelta : e.detail * 40;
    }
};

//鼠标滚轮滚动，滚动条滚动
Scroll.prototype._wheelChange = function (scrollDiv, mainBox, contentBox) {
    var node = typeof mainBox == "string" ? $(mainBox) : mainBox;
    var flag = 0, rate = 0, wheelFlag = 0, wheelData;
    if (node) {
        this._mouseWheel(node, (function (data) {
            var mainOuterH = mainBox.outerHeight()
                , mainInnerH = Math.ceil(mainBox.innerHeight());
            wheelData = this._wheelData;
            wheelFlag += data;
            if (wheelData >= 0) {
                flag = wheelData;
                scrollDiv.style.top = flag + "px";
                wheelFlag = wheelData * 12;
                this._wheelData = -1;
            } else {
                flag = wheelFlag / 12;
            }
            if (flag <= 0) {
                flag = 0;
                wheelFlag = 0;
            }
            if (flag >= (mainOuterH - scrollDiv.offsetHeight)) {
                flag = (mainInnerH - scrollDiv.offsetHeight);
                wheelFlag = (mainInnerH - scrollDiv.offsetHeight) * 12;
            }
            scrollDiv.style.top = flag + "px";
            if (this._scrollHeight < mainInnerH) {
                contentBox.css("top", -flag * (contentBox.outerHeight() / mainOuterH) + "px");
            }
        }).bind(this));
    }
};

Scroll.prototype._clickScroll = function (scrollDiv, mainBox, contentBox) {
    var p = scrollDiv.parentNode;
    p.onclick = function (event) {
        var e = event || window.event;
        var t = e.target || e.srcElement;
        var sTop = document.documentElement.scrollTop > 0 ? document.documentElement.scrollTop : document.body.scrollTop;
        var top = mainBox.offset().top;
        var _top = e.clientY + sTop - top - scrollDiv.offsetHeight / 2;
        if (_top <= 0) {
            _top = 0;
        }
        if (_top >= (mainBox.innerHeight() - scrollDiv.offsetHeight)) {
            _top = mainBox.innerHeight() - scrollDiv.offsetHeight;
        }
        if (t != scrollDiv) {
            scrollDiv.style.top = _top + "px";
            contentBox.css("top", -_top * (contentBox.height() / mainBox.outerHeight()) + "px");
            this._wheelData = _top;
        }
    }
};

/* 添加滚动条 */
Scroll.prototype.addScroll = function (box, content, scrollClass, outScrollClass, contentHeight) {
    var mainBox = box
        , contentBox = content
        , scrollDiv = this._createScroll(mainBox, scrollClass, outScrollClass);
    this._setScroll(scrollDiv, mainBox, contentBox, contentHeight);
    this._dragScroll(scrollDiv, mainBox, contentBox);
    this._wheelChange(scrollDiv, mainBox, contentBox);
    return this;
};

//业务工具类  切换UL 用户首页的2个切换效果
function ViewUtil() {
}

ViewUtil.prototype = {
    destroy_window: function () {
        new Window().clearAllWindow();
    },
    window_alert_time: function (text, time) {
        new Window().alert({
            time: time,
            height: 50,
            window: 600,
            content: '<div class="window-time"><img src="' + static_url + '/image/loader.gif" alt="loading..." /><span>' + text + '</span>' + '</div>',
            hasMask: true,
            hasTitle: false,
            isHeightWidth: true,
            hasBtn: false
        });
    },
    update_hint: function (text, ConfirmBtn, CancelBtn) {
        new Window().confirm({
            width: 600,
            height: 100,
            hasMask: true,//是否启用遮罩层
            hasCloseBtn: true,
            content: '<div class="window-hint">' +
            text +
            '</div>',
            title: "是否确认操作",
            isHeightWidth: true,
            handlerConfirmText: "确认",
            handlerCfCancelBtn: CancelBtn,
            handlerConfirmBtn: ConfirmBtn
        });
    },
    login_window: function (ConfirmBtn, CancelBtn) {
        new Window().confirm({
            width: 600,
            height: "auto",
            hasMask: true,//是否启用遮罩层
            hasCloseBtn: true,
            content: '<div class="window-login default-input-ul text-center">' +
            '<ul>' +
            '<li>' +
            '<h2>账号</h2>' +
            '<input type="text" id="fAuthorizeToolID" class="default-input" placeholder="用户ID/手机号/Email" />' +
            '</li>' +
            '<li>' +
            '<h2>密码</h2>' +
            '<input type="text" id="fAuthorizeToolPassword" class="default-input" placeholder="请输入您的密码" />' +
            '</li>' +
            '</ul>' +
            '<div class="window-ul-coupon-code">' +
            '<ul>' +
            '<li>' +
            '<h2>验证码</h2>' +
            '<input type="text" id="fCouponAuth" class="default-input" placeholder="请输入下图中的验证码" />' +
            '</li>' +
            '<li>' +
            '<img src="#" alt="loading" /><a>点不清楚?换一张!</a>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>',
            title: "账户登录",
            isHeightWidth: true,
            handlerConfirmText: "登陆",
            handlerCfCancelBtn: CancelBtn || null,
            handlerConfirmBtn: ConfirmBtn || null
        });
    },
    viewInitScroll: function (box) {
        var scroll = box
            , scrollObj = []
            , scrollChild = null
            , scrollLength = scroll.length;
        while (scrollLength--) {
            scrollChild = $(scroll[ scrollLength ]);
            scrollObj.push(new Scroll().addScroll(scrollChild, scrollChild.children(), "scrollContext", "scroll1"));
            scrollChild.parent().addClass("noneEle");
        }
        return scrollObj;
    },
    down_ul_mouse_over: function (type, event, arr) {
        var eventObj = this.sysUtil.eventUtil.initEventParameter(event), that = this;
        var targetUl = $(eventObj.target);

        if ($(eventObj.ppClass).hasClass(arr[ 0 ])) {
            targetUl = $(eventObj.ppClass).parent();
        } else if (targetUl.hasClass(arr[ 1 ])) {
            targetUl = targetUl.parent().parent();
        } else if (targetUl.hasClass(arr[ 0 ])) {
            targetUl = targetUl.parent();
        }

        targetUl.stop();
        if (type === "over") {
            targetUl.animate({"opacity": 1}, {
                queue: false
            });
        } else {
            targetUl.animate({"opacity": 0}, {
                duration: 300, queue: false, complete: function () {
                    $(this).addClass("noneEle");
                }
            });
        }
    },
    down_ul_mouse_move: function (type, event, arr) {
        var eventObj = this.sysUtil.eventUtil.initEventParameter(event), that = this;
        if (eventObj.parentClassName.indexOf(arr[ 0 ]) !== -1) {
            var targetUl = $(eventObj.target.childNodes[ 1 ]);
            if (type === "over") {
                targetUl.stop();
                targetUl.removeClass("noneEle").animate({"opacity": 1}, {
                    duration: 300,
                    queue: false
                });
            } else if (type === "leave") {
                targetUl.animate({"opacity": 0}, {
                    duration: 300, queue: false, complete: function () {
                        $(this).addClass("noneEle")
                    }
                });
            }
        }
    },
    appendOneLI: function (obj) {
        var jqLi = $(obj.li)
            , that = obj.that
            , className = obj.className
            , count = (!!obj.count) ? obj.count : 0;
        $(jqLi.parent()).append((function (that) {
            var readyLoadEle = "";
            jqLi.each(function (index, value) {
                if (index >= count && index < count * 2) {
                    readyLoadEle += "<li " + ((null !== className && "" !== className) ? "class='" + className + "'" : '') + ">" + $(value).html() + "</li>";
                }
            });
            return readyLoadEle;
        })(that));
    },
    beforeOneLI: function (obj) {
        var jqLi = $(obj.li)
            , liCount = jqLi.length
            , count = (!!obj.count) ? obj.count : 0
            , that = obj.that
            , className = obj.className
            , initLeft = obj.initLeft
            , liWidth = obj.liWidth;
        jqLi.first().before((function (that) {
            var readyLoadEle = "";
            //将最后一个或者几个EL取出
            jqLi.each(function (index, value) {
                if (index > liCount - count - 1) {
                    readyLoadEle += "<li " + ((null !== className && "" !== className) ? "class='" + className + "'" : '') + ">" + $(value).html() + "</li>";
                }
            });
            return readyLoadEle;
        })(that));
        this.moveUlOne($(jqLi.parent()), count, liWidth, initLeft);
    },
    moveUlOne: function (ul, count, liWidth, initLeft) {
        ul.css("left", -liWidth * count + initLeft + "px");
    },
    /**
     * 点击右按钮模拟
     * @param ul 主box
     * @param li_length li length
     * @param initLeft 舒适化向左的距离
     * @param that 代理this
     * @param groupCount 分组数量
     * @param liWidth li 的宽度
     */
    moveRightUl: function (ul, li_length, initLeft, that, groupCount, liWidth, type) {
        var length = li_length
            , initLeft = initLeft
            , left = initLeft
            , countUtil = that.sysUtil.count
            , getCount = countUtil.getCount(type);
        if (getCount * groupCount !== length - groupCount * 2) {
            left += -liWidth * groupCount * getCount;
            $(ul).animate({"left": left + "px"}, {duration: "1000", queue: false});
            countUtil.addCount(type);
        } else {
            left += -liWidth * groupCount * getCount;
            $(ul).animate({"left": left + "px"}, {
                duration: "1000", queue: false, complete: function () {
                    $(ul).css("left", initLeft + "px");
                }.bind(this)
            });
            countUtil.clearCount(type);
        }
    },
    /**
     * 点击左按钮模拟
     * @param ul 主box
     * @param li_length li length
     * @param initLeft 舒适化向左的距离
     * @param that 代理this
     * @param groupCount 分组数量
     * @param liWidth li 的宽度
     */
    moveLeftUl: function (ul, li_length, initLeft, that, groupCount, liWidth, type) {
        var length = li_length
            , initLeft = initLeft
            , left = initLeft
            , countUtil = that.sysUtil.count
            , getCount = countUtil.getCount(type);
        if (getCount * groupCount != groupCount) {
            left += -liWidth * groupCount * (getCount - 1);
            $(ul).animate({"left": left + "px"}, {duration: "1000", queue: false});
            countUtil.subtractCount(type);
        } else {
            left += liWidth * groupCount * (getCount - 1);
            getCount = ((length - (groupCount * 2)) / groupCount);
            $(ul).animate({"left": left + "px"}, {
                duration: "1000", queue: false, complete: function () {
                    $(ul).css("left", initLeft - getCount * liWidth * groupCount + "px");
                }.bind(this)
            });
            countUtil.setCount(type, getCount);
        }
    }
};


/***
 * @description 系统工具类，后期会更新和维护，EventUtil 事件工具类  CatchJqEle 缓存Jquery对象 Util 乱七八糟有用的工具集合
 */
function SysUtil() {
}

SysUtil.prototype = {
    eventUtil: {
        getEvent: function (event) {
            return event ? event : window.event;
        },
        getTarget: function (event) {
            return event.target || event.setEle;
        },
        preventDefault: function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },
        toEle: function (event) {
            return event.relatedTarget || event.toEle;
        },
        parentClass: function (target) {
            return (target.parentNode instanceof Node) ? target.parentNode : null;
        },
        initEventParameter: function (event) {
            var obj = {};
            obj.event = this.getEvent(event);
            obj.target = this.getTarget(event);
            obj.toEle = this.toEle(event);
            obj.id = obj.target.id;
            obj.className = obj.target.className;
            obj.parentClass = this.parentClass(obj.target);
            obj.parentClassName = this.parentClass(obj.target).className;
            obj.ppClass = this.parentClass(this.parentClass(obj.target));
            obj.toClassParentName = (obj.toEle) ? this.parentClass(obj.target).className : null;
            return obj;
        }
    },
    nullContent: Object.create(null),
    getData: {},
    count: (function () {
        var parameter = {}, name;
        return {
            addCount: function (type) {
                parameter[ type ] = parameter[ type ] + 1;
            },
            clearCount: function (type) {
                parameter[ type ] = 1;
            },
            subtractCount: function (type) {
                parameter[ type ] = parameter[ type ] - 1;
            },
            setCount: function (type, num) {
                parameter[ type ] = num;
            },
            getCount: function (type) {
                return parameter[ type ];
            },
            initParameter: function (object) {
                parameter = object;
            }
        }
    })()
};

/**
 * 模拟调用
 new Window().confirm({
        hasMask:true,//是否启用遮罩层
        hasCloseBtn:true,
        callback:function(){
            $('#nihaosd').click(function(){
                new Window().confirm({
                    hasMask:true,//是否启用遮罩层
                    hasCloseBtn:true,
                    content:"我是内容君asdasfasdfasdfasdfasdf",
                    title: "gfgfdsgfd",
                    handlerCloseBtn:function(){
                        alert("我是右上角取消");
                    },
                    handlerCfCancelBtn:function(){
                        alert("我是右下角取消");
                    },
                    handlerConfirmBtn:function(){
                        alert("我是右下角确定");
                    }
                });
            });
        },
        content:"我是内容君<h3 id='nihaosd'>nihaosdasd</h3>",
        title: "我是系统标题军",
        handlerCloseBtn:function(){
            alert("我是右上角取消");
        },
        handlerCfCancelBtn:function(){
            alert("我是右下角取消");
        },
        handlerConfirmBtn:function(){
            alert("我是右下角确定");
        }
    });
 * @constructor
 */
function Window() {
    this.cfg = {
        title: "系统提示",
        width: 500,
        height: 300,
        content: "",
        hasBtn: true,
        minWidth: 500,
        minHeight: 50,
        hasMask: false,
        hasTitle: true,
        defaultClose:true,
        hasCloseBtn: false,
        handlerConfirmBtn: null,
        handlerCfCancelBtn: null,
        handlerConfirmText: null,
        handlerAlertText: null,
        handlerCloseText: null,
        handlerCloseBtn: null,
        callback: null,
        isHeightWidth: false
    };
    this.winType = null;
    this.boundingBox = null;
    this._body_jq = null;
}

Window.prototype = {
    constructor: Window,
    windowArr: [],
    initFun: function () {
        this._body_jq = $("body");
    },
    renderUI: function () {
        var that = this
            , footerContent = ''
            , trueText = ''
            , falseText = '';

        switch (that.cfg.winType) {
            case "confirm":
                falseText = that.cfg.handlerCloseText;
                trueText = that.cfg.handlerConfirmText;
                footerContent = "<input type='button' class='window_confirmBtn' value='" + ((undefined != trueText && null != trueText) ? trueText : '确定') + "' /><input type='button' class='window_cancelBtn' value='" + ((undefined != falseText && null != falseText) ? falseText : '取消') + "' />";
                break;
            case "alert":
                trueText = that.cfg.handlerAlertText;
                footerContent = "<input type='button' class='window_confirmBtn' value='" + ((undefined != trueText && null != trueText) ? trueText : '确定') + "' />";
                break;
            default :
                break;
        }

        that.boundingBox = $(
            '<div class="window_boundingBox">' +
            '<div class="window_body">' + that.cfg.content + '</div>' +
            '</div>'
        );

        that.boundingBox.prepend("<header><h2><span></span></h2></header>" + ((that.cfg.hasTitle) ? "<h2 class='window_title'>" + that.cfg.title + "</h2>" : ""));

        if (that.cfg.hasBtn) {
            that.boundingBox.append("<footer class='window_footer'>" + footerContent + "</footer>");
        }

        if (that.cfg.hasMask) {
            that._mask = $('<div class="window_mask"></div>');
            that._mask.appendTo(this._body_jq);
        }

        if (that.cfg.hasCloseBtn) {
            var closeBtn = $('<span class="window_closeBtn">X</span>');
            that.boundingBox.append(closeBtn);
        }
        that.boundingBox.appendTo(document.body);

        if (that.cfg.time) {
            setTimeout(that.destroy.bind(that), this.cfg.time);
        }
        that.cfg.callback && that.cfg.callback();
    },
    destroy: function () {
        this._mask && this._mask.remove();
        this.boundingBox.off();
        this.boundingBox.remove();
    },
    bindUI: function () {
        var that = this;
        that.boundingBox.delegate(".window_confirmBtn", "click", function () {
            that.cfg.handlerConfirmBtn && that.cfg.handlerConfirmBtn();
            that.cfg.defaultClose&&that.destroy();
        }).delegate(".window_closeBtn", "click", function () {
            that.cfg.handlerCloseBtn && that.cfg.handlerCloseBtn();
            that.destroy();
        }).delegate(".window_cancelBtn", "click", function () {
            that.cfg.handlerCfCancelBtn && that.cfg.handlerCfCancelBtn();
            that.destroy();
        });
        that._mask && that._mask.bind("click", function () {
            that.cfg.handlerCloseBtn && that.cfg.handlerCloseBtn();
            that.destroy();
        });
    },
    syncUI: function () {
        var that = this;
        if (that.cfg.isHeightWidth) {
            that.boundingBox.css({
                width: that.cfg.width + "px",
                height: ((typeof that.cfg.height === "string") ? '"' + that.cfg.height + '"' : (that.cfg.height + "px"))
            });
        }

        that.boundingBox.css({
            'min-width': that.cfg.minWidth + "px",
            'min-height': that.cfg.minHeight + "px",
            left: (that.cfg.x || (window.innerWidth - that.cfg.width) / 2) + "px",
            top: (that.cfg.y || (window.innerHeight - $(".window_boundingBox").height()) / 2) + "px"
        });
    },
    confirm: function (cfg) {
        $.extend(this.cfg, cfg, {winType: 'confirm'});
        this.initFun();
        this.renderUI();
        this.bindUI();
        this.syncUI();
        this.endLoad();
    },
    alert: function (cfg) {
        $.extend(this.cfg, cfg, {winType: 'alert'});
        this.initFun();
        this.renderUI();
        this.bindUI();
        this.syncUI();
        this.endLoad();
    },
    prompt: function () {

    },
    endLoad: function () {
        this.windowArr.push(this);
    },
    clearAllWindow: function () {
        var length = this.windowArr.length;
        while (length--) {
            this.windowArr[ length ].destroy();
        }
    }
};