function MyselfManager() {
    this.shade = null;
    this.sysUtil = null;
    this.initParameter();
    this.initFunction();
}

MyselfManager.prototype.initParameter = function () {
    var that = this;
    this.shade = new Shade();
    this.sysUtil = new SysUtil();
    commonUtil.initParameter.call(this);

    this.SHARE_FOOTER = "myself-share-footer";
    this.QUESTIONS_FOOTER = "myself-questions-footer";
    this.SPIT_FOOTER = "myself-spit-footer";
    this.SHADE_INFO = "myself-shade-info";
    this.SHADE_GROUP = "myself-shade-group";
    this.SHADE_CONTEXT = "myself-shade-context";
    this.HEADER_LOGO /* 头部logo标签 */ = "myself-header-logo";
};

MyselfManager.prototype.initFunction = function () {
    var that = this;
    $(document).bind("click", that.onClickEle.bind(that));
};

MyselfManager.prototype.clickToClassName = function (eventObj, temp) {
    var that = this;
    switch (eventObj.className) {
        case that.SHARE_FOOTER:
            that.shade.showShade(that.COMMON_SHADE, {
                MainClass: '.' + that.SHADE_CONTEXT,
                width: "763px"
            });
            that.shade.pageShade(that.SHADE_GROUP, '<li><img class="product-share-liimg" src="images/taolun_03.png" alt="loading"><aside><h2>第一次做</h2><p>评论&nbsp;<em>010</em><br>人气&nbsp;<em>61229</em></p><h3>晴天小猪</h3></aside></li><li><img class="product-share-liimg" src="images/taolun_03.png" alt="loading"><aside><h2>第一次做</h2><p>评论&nbsp;<em>010</em><br>人气&nbsp;<em>61229</em></p><h3>晴天小猪</h3></aside></li><li><img class="product-share-liimg" src="images/taolun_03.png" alt="loading"><aside><h2>第一次做</h2><p>评论&nbsp;<em>010</em><br>人气&nbsp;<em>61229</em></p><h3>晴天小猪</h3></aside></li><li><img class="product-share-liimg" src="images/taolun_03.png" alt="loading"><aside><h2>第一次做</h2><p>评论&nbsp;<em>010</em><br>人气&nbsp;<em>61229</em></p><h3>晴天小猪</h3></aside></li><li><img class="product-share-liimg" src="images/taolun_03.png" alt="loading"><aside><h2>第一次做</h2><p>评论&nbsp;<em>010</em><br>人气&nbsp;<em>61229</em></p><h3>晴天小猪</h3></aside></li><li><img class="product-share-liimg" src="images/taolun_03.png" alt="loading"><aside><h2>第一次做</h2><p>评论&nbsp;<em>010</em><br>人气&nbsp;<em>61229</em></p><h3>晴天小猪</h3></aside></li><li><img class="product-share-liimg" src="images/taolun_03.png" alt="loading"><aside><h2>第一次做</h2><p>评论&nbsp;<em>010</em><br>人气&nbsp;<em>61229</em></p><h3>晴天小猪</h3></aside></li><li><img class="product-share-liimg" src="images/taolun_03.png" alt="loading"><aside><h2>第一次做</h2><p>评论&nbsp;<em>010</em><br>人气&nbsp;<em>61229</em></p><h3>晴天小猪</h3></aside></li><li><img class="product-share-liimg" src="images/taolun_03.png" alt="loading"><aside><h2>第一次做</h2><p>评论&nbsp;<em>010</em><br>人气&nbsp;<em>61229</em></p><h3>晴天小猪</h3></aside></li><li><img class="product-share-liimg" src="images/taolun_03.png" alt="loading"><aside><h2>第一次做</h2><p>评论&nbsp;<em>010</em><br>人气&nbsp;<em>61229</em></p><h3>晴天小猪</h3></aside></li>');
            $("." + that.SHADE_INFO).addClass("myself-shade-share");
            $('.' + that.HEADER_LOGO).css({'background-position': '-798px -56px'});
            temp = 1;
            break;
        case that.QUESTIONS_FOOTER:
            that.shade.showShade(that.COMMON_SHADE, {
                MainClass: '.' + that.SHADE_CONTEXT,
                width: "763px"
            });
            that.shade.pageShade(that.SHADE_GROUP, '<li><img src="images/taolun_02.png" alt="loading"><aside class="product-questions-aside"><h2><span>USER NAME</span>{问题}</h2><p>为什么我每次做的饭，都不入味?</p></aside><p>评论&nbsp;018<br>人气&nbsp;9128 </p></li><li><img src="images/taolun_02.png" alt="loading"><aside><h2><span>USER NAME</span>{问题}</h2><p>为什么我每次做的饭，都不入味?</p></aside><p>评论&nbsp;018<br>人气&nbsp;9128 </p></li><li><img src="images/taolun_02.png" alt="loading"><aside class="product-questions-aside"><h2><span>USER NAME</span>{问题}</h2><p>为什么我每次做的饭，都不入味?</p></aside><p>评论&nbsp;018<br>人气&nbsp;9128 </p></li><li><img src="images/taolun_02.png" alt="loading"><aside><h2><span>USER NAME</span>{问题}</h2><p>为什么我每次做的饭，都不入味?</p></aside><p>评论&nbsp;018<br>人气&nbsp;9128 </p></li><li><img src="images/taolun_02.png" alt="loading"><aside class="product-questions-aside"><h2><span>USER NAME</span>{问题}</h2><p>为什么我每次做的饭，都不入味?</p></aside><p>评论&nbsp;018<br>人气&nbsp;9128 </p></li><li><img src="images/taolun_02.png" alt="loading"><aside><h2><span>USER NAME</span>{问题}</h2><p>为什么我每次做的饭，都不入味?</p></aside><p>评论&nbsp;018<br>人气&nbsp;9128 </p></li><li><img src="images/taolun_02.png" alt="loading"><aside class="product-questions-aside"><h2><span>USER NAME</span>{问题}</h2><p>为什么我每次做的饭，都不入味?</p></aside><p>评论&nbsp;018<br>人气&nbsp;9128 </p></li><li><img src="images/taolun_02.png" alt="loading"><aside><h2><span>USER NAME</span>{问题}</h2><p>为什么我每次做的饭，都不入味?</p></aside><p>评论&nbsp;018<br>人气&nbsp;9128 </p></li><li><img src="images/taolun_02.png" alt="loading"><aside class="product-questions-aside"><h2><span>USER NAME</span>{问题}</h2><p>为什么我每次做的饭，都不入味?</p></aside><p>评论&nbsp;018<br>人气&nbsp;9128 </p></li><li><img src="images/taolun_02.png" alt="loading"><aside><h2><span>USER NAME</span>{问题}</h2><p>为什么我每次做的饭，都不入味?</p></aside><p>评论&nbsp;018<br>人气&nbsp;9128 </p></li>');
            $("." + that.SHADE_INFO).addClass("myself-shade-questions");
            $('.' + that.HEADER_LOGO).css({'background-position': '-798px -185px'});
            temp = 1;
            break;
        case that.SPIT_FOOTER:
            that.shade.showShade(that.COMMON_SHADE, {
                MainClass: '.' + that.SHADE_CONTEXT,
                width: "763px"
            });
            that.shade.pageShade(that.SHADE_GROUP,'<li><img src="images/taolun_02.png" alt="loading"><aside class="myself-spit-aside"><h2><span>USER NAME</span>{问题}<time>2014-10-22 18:04</time></h2><p>哈哈，我发现花椒放多了特别好吃，花椒特别好吃，好吃的要死。 </p></aside></li><li><img src="images/taolun_02.png" alt="loading"><aside class="myself-spit-aside"><h2><span>USER NAME</span>{问题}<time>2014-10-22 18:04</time></h2><p>哈哈，我发现花椒放多了特别好吃，花椒特别好吃，好吃的要死。 </p></aside></li>');
            //$("." + that.SHADE_INFO).addClass("myself-shade-questions");
            $('.' + that.HEADER_LOGO).css({'background-position': '-977px -9px'});
            temp = 1;
            break;
    }
    return temp;
};

MyselfManager.prototype.clickToParentClassName = function (eventObj, temp) {
    var that = this;
    switch (eventObj.parentClassName) {
        default :
            break;
    }
    return temp;
};

MyselfManager.prototype.clickToIf = function (eventObj, temp) {
    var that = this;

    if (!eventObj.className.indexOf(that.SHADE_CLOSE)) {
        that.shade.hideShade(that.COMMON_SHADE);
        $("." + that.SHADE_INFO)[ 0 ].className = that.SHADE_INFO;
        return;
    }
};

MyselfManager.prototype.initScrollFun = function () {
    var that = this;
};

/**
 * document 委托onClick
 * @param event
 */
MyselfManager.prototype.onClickEle = function (event) {
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
    var myselfmanager = new MyselfManager();
});