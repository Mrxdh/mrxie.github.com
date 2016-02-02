$("#address").click(function () {
    var win = new Window();
    win.confirm({
        y: 50,
        width: 600,
        height: "auto",
        hasMask: true,//是否启用遮罩层
        hasCloseBtn: true,
        content: '<ul class="window-order-address">' +
        '<li>' +
        '<span><small>*</small>收件人</span><input class="default-input" type="text" placeholder="请输入收件人姓名" />' +
        '</li>' +
        '<li>' +
        '<span><small>*</small>详细地址</span><input class="default-input" type="text" placeholder="请输入详细地址" />' +
        '</li>' +
        '<li>' +
        '<span><small>*</small>手机号</span><input class="default-input" type="number" placeholder="请输入联系手机号码" />' +
        '</li>' +
        '<li>' +
        '<span>邮箱</span><input type="text" class="default-input" placeholder="请输入通知邮件接收Email" />' +
        '</li>' +
        '<li>' +
        '<span>电话</span><input type="text" class="default-input" placeholder="请输入其他联系方式" />' +
        '</li>' +
        '</ul>',
        title: "新建收货地址",
        isHeightWidth: true,
        handlerConfirmText: "保存",
        handlerCfCancelBtn: function () {
            alert("我是右下角取消");
        },
        handlerConfirmBtn: function () {
            alert("我是右下角确定");
        }
    });
});

//提示
var view = new ViewUtil();

var win = new Window();

//view.login_window();
win.confirm({
    width: 600,
    height: "auto",
    hasMask: true,//是否启用遮罩层
    hasCloseBtn: true,
    content: '<div class="window-product-order">' +
    '<div class="window-product-img">' +
    '<a>' +
    '<img src="http://file.homecate.com/product/11/7c/117cb42857a9ae9be5d45b1542403ef4.png" title="辣子鸡" alt="辣子鸡" class="window-product-image">' +
    '</a>' +
    '</div>' +
    '<div class="window-product-info">' +
    '<ul>' +
    '<li class="window-product-name">辣子鸡</li>' +
    '<li class="window-product-desc">嘿！来份炸鸡啤酒</li>' +
    '<li class="window-product-price">嘿！来份炸鸡啤酒</li>' +
    '<li class="window-pro-count">' +
    '<h3>购买数量：</h3>' +
    '<div class="window-product-count">' +
    '<span class="window-count-left"></span>' +
    '<input type="text" value="1">' +
    '<span class="window-count-right"></span>' +
    '</div>' +
    '</li>' +
    '<li class="window-product-desc">最大订购数量 9 件</li>' +
    '</ul>' +
    '</div>' +
    '</div>',
    title: "加入购物车",
    isHeightWidth: true,
    handlerConfirmText: "提交",
    handlerCfCancelBtn: function () {
        alert("我是右下角取消");
    },
    handlerConfirmBtn: function () {
        view.destroy_window();
    }
});

//win.confirm({
//    width: 600,
//    height: "auto",
//    hasMask: true,//是否启用遮罩层
//    hasCloseBtn: true,
//    content: '<div class="window-ul-invoice"><ul>' +
//    '<li>' +
//    '<input type="radio" name="order-invoice-type" checked /><span>不开具发票</span>' +
//    '</li>' +
//    '<li>' +
//    '<input type="radio" name="order-invoice-type" /><span>定额发票</span>' +
//    '</li>' +
//    '<li>' +
//    '<input type="radio" name="order-invoice-type" /><span>普通发票</span>' +
//    '</li>' +
//    '<li>' +
//    '<input type="radio" name="order-invoice-type" /><span>增值税发票</span>' +
//    '</li>' +
//    '</ul>' +
//    '<div class="window-ul-invoice-type">' +
//    '<h2>类型和抬头</h2>' +
//    '<h3><input type="radio" checked name="order-invoice-new-type" /><span>使用新信息</span></h3>' +
//    '<ul>' +
//    '<li>' +
//    '<h2>发票抬头</h2>' +
//    '<input type="text" />' +
//    '</li>' +
//    '<li>' +
//    '<h2>发票内容</h2>' +
//    '<select>' +
//    '<option selected value ="0">明细</option>' +
//    '<option value ="1">食品</option>' +
//    '</select>' +
//    '</li>' +
//    '</ul>' +
//    '</div>' +
//    '</div>',
//    title: "修改发票信息",
//    isHeightWidth: true,
//    handlerConfirmText: "提交",
//    handlerCfCancelBtn: function () {
//        alert("我是右下角取消");
//    },
//    handlerConfirmBtn: function () {
//        view.destroy_window();
//    }
//});
$("#setInvoice").click(function () {
    var win = new Window();
    win.confirm({
        width: 600,
        height: "auto",
        hasMask: true,//是否启用遮罩层
        hasCloseBtn: true,
        content: '<div class="window-ul-invoice"><ul>' +
        '<li>' +
        '<input type="radio" name="order-invoice-type" checked /><span>不开具发票</span>' +
        '</li>' +
        '<li>' +
        '<input type="radio" name="order-invoice-type" /><span>定额发票</span>' +
        '</li>' +
        '<li>' +
        '<input type="radio" name="order-invoice-type" /><span>普通发票</span>' +
        '</li>' +
        '<li>' +
        '<input type="radio" name="order-invoice-type" /><span>增值税发票</span>' +
        '</li>' +
        '</ul>' +
        '<div class="window-ul-invoice-type">' +
        '<h2>类型和抬头</h2>' +
        '<h3><input type="radio" checked name="order-invoice-new-type" /><span>使用新信息</span></h3>' +
        '<ul>' +
        '<li>' +
        '<h2>发票抬头</h2>' +
        '<input type="text" />' +
        '</li>' +
        '<li>' +
        '<h2>发票内容</h2>' +
        '<select>' +
        '<option selected value ="0">明细</option>' +
        '<option value ="1">食品</option>' +
        '</select>' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '</div>',
        title: "修改发票信息",
        isHeightWidth: true,
        handlerConfirmText: "提交",
        handlerCfCancelBtn: function () {
            alert("我是右下角取消");
        },
        handlerConfirmBtn: function () {
            alert("我是右下角确定");
        }
    });
});

$("#bindCoupons").click(function () {
    var win = new Window();
    win.confirm({
        width: 600,
        height: "auto",
        hasMask: true,//是否启用遮罩层
        hasCloseBtn: true,
        content: '<div class="window-ul-coupon">' +
        '<div class="window-ul-coupon-type">' +
        '<h2>类型</h2>' +
        '<ul>' +
        '<li>' +
        '<input type="radio" checked name="coupon-code-type" />' +
        '我收到的优惠券<span class="text-danger">号码</span>+<span>密码</span>组合' +
        '</li>' +
        '<li>' +
        '<input type="radio" name="coupon-code-type" />' +
        '我收到的是<span class="text-danger">14或12</span>位识别码' +
        '</li>' +
        '</ul>' +
        '</div>' +
        '<div class="window-ul-coupon-photo">' +
            '<ul>' +
                '<li>' +
                    '<h2>号码</h2>' +
                    '<input type="text" id="fCouponCode" class="default-input" placeholder="请输入8位优惠券号码" />' +
                '</li>' +
                '<li>' +
                    '<h2>密码</h2>' +
                    '<input type="text" id="fCouponSecret" class="default-input" placeholder="请输入6位优惠券密码" />' +
                '</li>' +
                '<li>' +
                    '<h2>验证码</h2>' +
                    '<input type="text" id="fCouponAuth" class="default-input" placeholder="请输入下图中的验证码" />' +
                '</li>' +
            '</ul>' +
        '</div>' +
        '<div class="window-ul-coupon-num">' +
            '<ul>' +
                '<li>' +
                    '<h2>识别码</h2>' +
                    '<input type="text" id="fCouponKey" class="default-input" placeholder="请输入14或12位优惠券识别码" />' +
                '</li>' +
            '</ul>' +
        '</div>' +
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
        title: "请输入您收到的优惠券信息以验证",
        isHeightWidth: true,
        handlerConfirmText: "提交",
        handlerCfCancelBtn: function () {
            alert("我是右下角取消");
        },
        handlerConfirmBtn: function () {
            alert("我是右下角确定");
        }
    });
});
