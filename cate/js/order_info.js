/**
 * Created by xiedonghao on 15/6/16.
 */
var win = new Window();

//view.login_window();
win.confirm({
    width: 600,
    hasMask: true,
    height: "auto",
    hasCloseBtn: true,
    content: '<div class="window-load-raise">' +
    '<ul class="default-text-ul small-font">' +
    '<li>' +
    '<h2>商品名称</h2><span>辣子鸡</span>' +
    '</li>' +
    '<li>' +
        '<h2 class="text-danger vertical-top">图片</h2><div>' +
        '<div id="divUploads"><ul class="user-files"></ul></div>' +
        '<div><button class="btn btn-success btn-sm" onclick="upload_image();" id="bUpload"><span class="glyphicon glyphicon-picture"></span> 上传图片</button></div>' +
        '</div>' +
    '</li>' +
    '<li>' +
    '<h2 class="text-danger vertical-top">评分</h2><div><p><select id="fCommentScore"><option value="5">5</option><option value="4">4</option><option value="3">3</option><option value="2">2</option><option value="1">1</option></select> 分</p>' +
    '<p class="help-block">分值越高表示越满意，分值越低表示越不满意</p>' +
    '</div>' +
    '</li>' +
    '<li>' +
    '<h2 class="text-danger vertical-top">短评</h2>' +
    '<textarea cols="40" rows="5" id="fCommentContent" class="form-control"></textarea>' +
    '</li>' +
    '</ul>' +
    '</div>',
    title: "评价订单",
    isHeightWidth: true,
    handlerConfirmText: "提交",
    handlerCfCancelBtn: function () {
        alert("我是右下角取消");
    },
    handlerConfirmBtn: function () {
        //view.destroy_window();
    }
});