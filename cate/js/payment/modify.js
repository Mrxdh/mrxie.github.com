/**
 * Created by xiedonghao on 15/6/16.
 */
var win = new Window();

//view.login_window();
win.confirm({
    width: 600,
    hasBtn: false,
    hasMask: true,
    height: "auto",
    hasCloseBtn: true,
    content: '<ul class="list-unstyled text-center"><li class="margin-bt-middle"><a class="btn btn-warning btn-lg" href="https://www.aicanzhuo.cn/payment/modify?type=1&amp;hash=f457db498b58965394fd63227c9c0b6a&amp;paymentId=dabbc52a9829f343fe75e6c7475d7308">网上银行</a><div class="placeholders"></div></li><li><a class="btn btn-warning btn-lg" href="https://www.aicanzhuo.cn/payment/modify?type=1&amp;hash=f457db498b58965394fd63227c9c0b6a&amp;paymentId=bffe28c8b7fe87d04870fc1d626296bd">微信支付</a><div class="placeholders"></div></li></ul>',
    title: "请选择支付方式",
    isHeightWidth: true,
    handlerConfirmText: "提交",
    handlerCfCancelBtn: function () {
        alert("我是右下角取消");
    },
    handlerConfirmBtn: function () {
        //view.destroy_window();
    }
});