function ProductManager() {
    this.sysUtil = null;

    this.initParameter();
    this.initFunction();
}

ProductManager.prototype.initParameter = function () {
    this.sysUtil = new SysUtil();

    /**
     * 初始化静态变量
     * @type {string|string}
     */
    this.FOOT_LI                /* 加入购物车下面的图片 */ = "product-foot-li";
    this.FOOT_SELECT            /* 购物车下选中的图片 */ = "product-foot-select";
    this.RIGHT_C1               /* 内容span未选中时 */ = "product-right-c1";
    this.RIGHT_C2               /* 内容span选中时 */ = "product-right-c2";
    this.RIGHT_D1               /* 讨论span选中时 */ = "product-right-d1";
    this.RIGHT_D2               /* 讨论span未选中时 */ = "product-right-d2";
    this.DISCUSS_COMMIT         /* 评论分享 */ = "product-discuss-commit";
    this.DISCUSS_CONTEXT        /* 菜品内容 */ = "product-discuss-context";
    this.COMMENT_LI             /* 首次显示LI */ = "product-comment-li";
    this.DISCUSS_COMMENT        /* 首次显示内容 */ = "product-discuss-comment";
    this.COMMENT_LI_SELECT      /* 首次评论选中类 */ = "product-comment-li-select";
    this.COMMENT_ISHARE         /* 首次input分享内容 */ = "product-comment-ishare";
    this.COMMENT_IQUEST         /* 首次input提问内容 */ = "product-comment-iquest";
    this.COMMENT_ISPIT          /* 首次input吐槽内容 */ = "product-comment-ispit";
    this.DISCUSS_SHARE1         /* 分享列表Class */ = "product-discuss-share1";
    this.SHARE_FOOTER           /* 首次显示分享查看全部分享列表Class */ = "product-share-footer";
    this.SHARE1_IMG             /* 分享列表点击图片Class */ = "product-share1-img";
    this.DETAILS_FOOTER         /* 分享详情返回上一页Class */ = "product-details-footer";
    this.SHARE1_FOOTER          /* 分享列表返回上一页Class */ = "product-share1-footer";
    this.SHARE_LIIMG            /* 首次分享图片Class */ = "product-share-liimg";
    this.DISCUSS_QUESTIONS      /* 提问列表Class */ = "product-discuss-questions";
    this.DISCUSS_QUESTION       /* 回答Class */ = "product-discuss-question";
    this.QUESTIONS_FOOTER       /* 提问查看全部Class */ = "product-questions-footer";
    this.QUESTIONS_FOOTER_UP    /* 提问查看返回评论Class */ = "product-questions-footer-up";
    this.QUESTIONS_ASIDE        /* 提问查看aside Class */ = "product-questions-aside";
    this.QUESTION_FOOTER        /* 提问回答返回提问列表aside Class */ = "product-question-footer";
    this.QUESTIONS_ASIDE        /* 首次显示提问li列表aside Class */ = "product-questions-aside";
    this.DISCUSS_SPITS          /* 吐槽列表 Class */ = "product-discuss-spits";
    this.SPITS_FOOTER           /* 吐槽返回评论 Class */ = "product-spits-footer";
    this.SPIT_FOOTER            /* 查看全部吐槽列表 Class */ = "product-spit-footer";
    this.SPIT_ASIDE             /* 评论吐槽列表Aside Class */ = "product-spit-aside";
    this.SPITS_ASIDE            /* 吐槽列表Aside Class */ = "product-spits-aside";
    this.DISCUSS_ONSPIT         /* 吐槽详情 Class */ = "product-discuss-onspit";
    this.ONSPIT_FOOTER          /* 吐槽详情返回上一层Footer Class */ = "product-onspit-footer";
    this.COMMENT_SI             /* 讨论头的发送*/ = "product-comment-si";
    this.COMMENT_IMG            /* 讨论图片发送*/ = "product-comment-img";
    this.SHARE1_DETAILS         /* 讨论列表 */= "product-share1-details";
    this.COMMIT_DETDIV          /* 我要分享内容 div */ = "product-commit-detdiv";
    this.QUESTIONS_DETAILS      /* 我要回答问题列表 div */ = "product-questions-details";
    this.QUESTION_DETAILS       /* 我要回答问题内容 div */ = "product-question-details";
    this.SPITS_DETAILS          /* 我要吐槽问题 div */ = "product-spits-details";
    this.ONSPIT_DETAILS         /* 我要吐槽问题内容 div */ = "product-onspit-details";
};

ProductManager.prototype.initFunction = function () {
    var that=this;
    $(document).bind("click", that.onClickEle.bind(that));

    $("#" + that.COMMENT_ISPIT).hide();
    $("#" + that.COMMENT_IQUEST).hide();

    that.initHide();
    that.initScrollFun();
    $("." + that.DISCUSS_CONTEXT).show();
};

ProductManager.prototype.initScrollFun=function(){
    var that=this
        ,share1=$("."+that.SHARE1_DETAILS)
        ,share_context=$("."+that.COMMIT_DETDIV)
        ,questions_details=$("."+that.QUESTIONS_DETAILS)
        ,question_details=$("."+that.QUESTION_DETAILS)
        ,spits_details=$("."+that.SPITS_DETAILS)
        ,onspit_details=$("."+that.ONSPIT_DETAILS)
        ,question_details_children=question_details.children().children()
        ,question_details_height=question_details_children.length*1
        question_details_children.each(function(index,value){
            question_details_height+=$(this).outerHeight(true);
        });
    new Scroll().addScroll(share1, share1.children(), "scrollContext1", "scroll2",share1.children().children().length*106);
    new Scroll().addScroll(spits_details, spits_details.children(), "scrollContext1", "scroll2",spits_details.children().children().length*84);
    new Scroll().addScroll(share_context, share_context.children(), "scrollContext1", "scroll2",263+(share_context.children().children().length-1)*96);
    new Scroll().addScroll(onspit_details, onspit_details.children(), "scrollContext1", "scroll2",123+(onspit_details.children().children().length-1)*106);
    new Scroll().addScroll(questions_details, questions_details.children(), "scrollContext1", "scroll2",questions_details.children().children().length*84);
    new Scroll().addScroll(question_details, question_details.children(), "scrollContext1", "scroll2",question_details_height);
};

ProductManager.prototype.onMouseClickFootUl = function (event) {
    var eventObj = this.sysUtil.eventUtil.initEventParameter(event);
};

ProductManager.prototype.initHide = function () {
    var that=this;
    $("." + that.DISCUSS_COMMIT).hide();
    $("." + that.DISCUSS_CONTEXT).hide();
    $("." + that.DISCUSS_COMMENT).hide();
    $("." + that.DISCUSS_SHARE1).hide();
    $("." + that.DISCUSS_QUESTIONS).hide();
    $("." + that.DISCUSS_QUESTION).hide();
    $("." + that.DISCUSS_SPITS).hide();
    $("." + that.DISCUSS_ONSPIT).hide();
    $("." + that.COMMENT_SI).hide();
};

ProductManager.prototype.clickToClassName = function (eventObj, temp) {
    var that=this;
    switch (eventObj.className) {
        case that.RIGHT_C1:
            $("." + that.RIGHT_C1).addClass(that.RIGHT_C2);
            $("." + that.RIGHT_D1).addClass(that.RIGHT_D2);
            $("." + that.RIGHT_C1).removeClass(that.RIGHT_C1);
            $("." + that.RIGHT_D1).removeClass(that.RIGHT_D1);
            that.initHide();
            $("." + that.DISCUSS_CONTEXT).show();
            temp = 1;
            break;
        case that.RIGHT_D2:
            $("." + that.RIGHT_C2).addClass(that.RIGHT_C1);
            $("." + that.RIGHT_D2).addClass(that.RIGHT_D1);
            $("." + that.RIGHT_C2).removeClass(that.RIGHT_C2);
            $("." + that.RIGHT_D2).removeClass(that.RIGHT_D2);
            that.initHide();
            $("." + that.DISCUSS_COMMENT).show();
            temp = 1;
            break;
        case that.SHARE_FOOTER:
            that.initHide();
            $("." + that.DISCUSS_SHARE1).show();
            temp = 1;
            break;
        case that.SHARE1_IMG:
            that.initHide();
            $("." + that.DISCUSS_COMMIT).show();
            temp = 1;
            break;
        case this.DETAILS_FOOTER:
            that.initHide();
            $("." + that.DISCUSS_SHARE1).show();
            temp = 1;
            break;
        case that.SHARE1_FOOTER:
            that.initHide();
            $("." + that.DISCUSS_COMMENT).show();
            temp = 1;
            break;
        case this.SHARE_LIIMG:
            that.initHide();
            $("." + that.DISCUSS_COMMIT).show();
            temp = 1;
            break;
        case that.QUESTIONS_FOOTER:
            that.initHide();
            $("." + that.DISCUSS_QUESTIONS).show();
            temp = 1;
            break;
        case that.QUESTIONS_FOOTER_UP:
            that.initHide();
            $("." + that.DISCUSS_COMMENT).show();
            temp = 1;
            break;
        case that.QUESTIONS_ASIDE:
            that.initHide();
            $("." + that.DISCUSS_QUESTION).show();
            temp = 1;
            break;
        case that.QUESTION_FOOTER:
            that.initHide();
            $("." + that.DISCUSS_QUESTIONS).show();
            temp = 1;
            break;
        case that.SPITS_FOOTER:
            that.initHide();
            $("." + that.DISCUSS_COMMENT).show();
            temp = 1;
            break;
        case that.SPIT_FOOTER:
            that.initHide();
            $("." + that.DISCUSS_SPITS).show();
            temp = 1;
            break;
        case that.ONSPIT_FOOTER:
            that.initHide();
            $("." + that.DISCUSS_SPITS).show();
            temp = 1;
            break;
        default :
            break;
    }
    return temp;
};

ProductManager.prototype.clickToParentClassName = function (eventObj, temp) {
    var that=this;
    switch (eventObj.parentClassName) {
        case that.QUESTIONS_ASIDE:
            that.initHide();
            $("." + that.DISCUSS_QUESTION).show();
            temp = 1;
            break;
        case that.SPIT_ASIDE:
            that.initHide();
            $("." + that.DISCUSS_ONSPIT).show();
            temp = 1;
            break;
        case that.SPITS_ASIDE:
            that.initHide();
            $("." + that.DISCUSS_ONSPIT).show();
            temp = 1;
            break;
        default :
            break;
    }
    return temp;
};

ProductManager.prototype.clickToId = function (eventObj, temp) {
    switch (eventObj.id) {
        case 1:
        default :
            break;
    }
};

ProductManager.prototype.clickToIf = function (eventObj) {
    var that=this;
    if (!eventObj.parentClassName.indexOf(that.FOOT_LI)) {
        $("." + that.FOOT_SELECT).removeClass(that.FOOT_SELECT);
        $(eventObj.parentClass).addClass(that.FOOT_SELECT);
        return;
    } else if (!eventObj.className.indexOf(that.COMMENT_LI)) {
        $("." + that.COMMENT_LI_SELECT).removeClass(that.COMMENT_LI_SELECT);
        $(eventObj.target).addClass(that.COMMENT_LI_SELECT);
        $("#" + that.COMMENT_ISHARE).hide();
        $("#" + that.COMMENT_IQUEST).hide();
        $("#" + that.COMMENT_ISPIT).hide();
        $("." + that.COMMENT_SI).hide();
        $("." + that.COMMENT_IMG).hide();
        switch (eventObj.target.innerHTML) {
            case "我要提问":
                $("." + that.COMMENT_SI).show();
                $("#" + that.COMMENT_IQUEST).show();
                break;
            case "我要分享":
                $("." + that.COMMENT_IMG).show();
                $("#" + that.COMMENT_ISHARE).show();
                break;
            case "我要吐槽":
                $("." + that.COMMENT_SI).show();
                $("#" + that.COMMENT_ISPIT).show();
                break;
            default :
                break;
        }
        return;
    }
};

/**
 * document 委托onClick
 * @param event
 */
ProductManager.prototype.onClickEle = function (event) {
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

    temp = that.clickToId.call(that, eventObj, temp);
    if (temp === 1) {
        return;
    }

    that.clickToIf.call(that, eventObj);
};

$(document).ready(function () {
    var product = product || null
        , product = new ProductManager();
});
