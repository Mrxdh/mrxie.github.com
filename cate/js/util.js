var alertType=null;

function switch_auth_code(){
    $('#auth_code_img').attr('src', base+"/util/code?t="+new Date().getTime());
}
function get_size(size){
    size=parseInt(size);
    if(size>1024*1024*1024){
        return (parseFloat(size)/1024/1024/1024).toFixed(1)+'G';
    }else if(size>1024*1024){
        return (parseFloat(size)/1024/1024).toFixed(1)+'M';
    }else if(size>1024){
        return (parseFloat(size)/1024).toFixed(1)+'K';
    }else{
        return size+"byte";
    }
}
function check_email(email) {
    if(null==email)
        return false;
    return email.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/);
}
function check_mobile(mobile){
    if(null==mobile)
        return false;
    return mobile.match(/^1\d{10}$/);
}
function check_user_name(name) {
    if(null==name)
        return false;
    if(name.length<2||name.length>16)
        return false;
    return name.match(/^[A-Za-z][A-Za-z0-9]{1,15}$/);
}
function check_user_id(name){
    if(check_email(name))
        return true;
    else if(check_mobile(name))
        return true;
    else if(check_user_name(name))
        return true;
    else
        return false;
}
function display_address(ip, port){
    if(undefined==ip||null==ip||!is_number(ip))
        return '';

    ip=parseInt(ip);
    var buffer='';
    buffer+=(ip>>>24)+'.'+((ip&0x00FFFFFF)>>>16)+'.'+((ip&0x0000FFFF)>>>8)+'.'+(ip&0x000000FF);

    if(undefined!=port&&null!=port&&is_number(port))
        buffer+=':'+parseInt(port);
    return buffer;
}
var GLOBAL_INFO_MSG_TIMER=null;
var GLOBAL_TOP_ALERT_TIMER=null;

function append_msg_mask(msg){
    var info=$('#divGlobalInfoMsg');
    var mask=$('<div id="divGlobalInfoMask"></div>');

    if(0==info.length||0==mask.length){
        return;
    }

    info.append(msg);

    mask.css('width', $(window).width()+'px');
    mask.css('height', $(window).height()+'px');
    info.css('left', ((($(window).width()-info.width())/2)-60)+'px');
    info.css('top', ((($(window).height()-info.height())/2)-80)+'px');
}
function display_error_mask(msg){
    display_msg_mask(msg, {'time': 2000, 'loader': 0});
}
function display_msg_mask(msg, option){
    if(null!=GLOBAL_INFO_MSG_TIMER){
        window.clearInterval(GLOBAL_INFO_MSG_TIMER);
        GLOBAL_INFO_MSG_TIMER=null;
    }

    var mask=$('#divGlobalInfoMask');
    var info=$('#divGlobalInfoMsg');
    var loader=true,time=null;

    if(0==mask.length){
        mask=$('<div id="divGlobalInfoMask"></div>');
        $('body').append(mask);
    }
    if(0==info.length){
        info=$('<div id="divGlobalInfoMsg"></div>');
        $('body').append(info);
    }

    if(undefined!=option&&null!=option){
        if(undefined!=option.time&&null!=option.time&&is_number(option.time))
            time=parseInt(option.time);
        if(undefined!=option.loader&&null!=option.loader&&(is_number(option.loader)||0==option.loader)){
            if(0==parseInt(option.loader))
                loader=false;
            else
                loader=true;

        }
    }

    info.html((loader?'<img src="'+static_url+'/image/loader.gif"/>  ':'')+msg);
    mask.css('width', $(window).width()+'px');
    mask.css('height', $(window).height()+'px');
    info.css('left', Math.max(0,((($(window).width()-info.width())/2)-60))+'px');
    info.css('top', Math.max(0, ((($(window).height()-info.height())/2)-80))+'px');

    mask.show();
    info.show();

    if(null!=time&&is_number(time)){
        GLOBAL_INFO_MSG_TIMER=window.setInterval(close_msg_mask, parseInt(time));
    }
}
function close_msg_mask(){
    $('#divGlobalInfoMsg').fadeOut();
    $('#divGlobalInfoMask').fadeOut();
}
function display_top_alert(msg, option){
    if(null!=GLOBAL_TOP_ALERT_TIMER){
        window.clearInterval(GLOBAL_TOP_ALERT_TIMER);
        GLOBAL_TOP_ALERT_TIMER=null;
    }

    var time=null;
    if(undefined!=option&&null!=option){
        if(undefined!=option.time&&null!=option.time&&is_number(option.time))
            time=parseInt(option.time);
    }

    var div=$('#divGlobalTopAlert');
    if(0==div.length){
        div=$('<div id="divGlobalTopAlert"></div>');
        div.css('width', $(window).width()+'px');
        $('body').append(div);
    }

    div.html(msg);
    div.show();

    if(null!=time&&is_number(time)){
        GLOBAL_TOP_ALERT_TIMER=window.setInterval(close_top_alert, parseInt(time));
    }
}
function close_top_alert(){
    $('#divGlobalTopAlert').fadeOut();
}
function hide_top_alert(){
    $('#divGlobalTopAlert').hide();
}
function close_modal(){
    var modal=$('#divModal');
    if(null==modal||undefined==modal)
        return;
    modal.modal('hide');
}
function show_modal(title, html, func){
    var modal=$('#divModal');
    if(null==modal||undefined==modal)
        return;
    modal.find('#bModalSubmit').unbind();
    modal.find('.modal-title').html(title);
    modal.find('.modal-body').html(html);

    if(null==func||undefined==func){
        modal.find('#bModalCancel').html('关闭');
        modal.find('#bModalSubmit').hide();
    }else{
        modal.find('#bModalCancel').html('取消');
        modal.find('#bModalSubmit').show();
        modal.find('#bModalSubmit').click(function(){
            func();
        });
        modal.find('#bModalSubmit').removeAttr('disabled');
    }
    modal.modal();
    modal.find('#bModalCancel').removeAttr('disabled');

}
function get_modal_button(){
    var modal=$('#divModal');
    if(null==modal||undefined==modal)
        return null;
    return modal.find('#bModalSubmit');
}
function get_modal_body(){
    var modal=$('#divModal');
    if(null==modal||undefined==modal)
        return null;
    return modal.find('.modal-body');
}
function show_alert(msg, type){
    var divAlert=$('#divAlert');
    if(null==divAlert)
        return;
    var alertMsg=divAlert.find('#alertMsg');
    if(null==alertMsg)
        return;
    if(null!=alertType)
        divAlert.removeClass(alertType);
    if(null==type){
        alertType=null;
    }else{
        alertType=type;
        divAlert.addClass(type);
    }
    alertMsg.html(msg);
    divAlert.fadeIn();
}
function close_alert(){
    var divAlert=$('#divAlert');
    if(null==divAlert)
        return;
    divAlert.fadeOut();
}
function is_number(n){
    if(null==n||n=="")
        return false;
    return !isNaN(n);
}
Date.prototype.displayInterval=function(){
    var t=parseInt((new Date().getTime()-this.getTime())/1000);
    if(t<60)
        return t+'秒前';
    else if(t<3600)
        return parseInt(t/60)+'分钟前';
    else if(t<86400)
        return parseInt(t/3600)+'小时前';
    else if(t<86400*2)
        return '昨天';
    else if(t<86400*3)
        return '前天';
    else
        return this.displayShort();
};
Date.prototype.displayYearMonth=function(sep){
    var ret;
    if(undefined==sep||null==sep)
        sep='-';

    ret=this.getFullYear()+sep;
    if(this.getMonth()<9)
        ret+='0';
    ret+=(1+this.getMonth())

    return ret;
};
Date.prototype.displaySingleDate=function(){
    var ret='';
    if(this.getDate()<10)
        ret+='0';
    ret+=this.getDate();

    return ret;
};
Date.prototype.displayDate=function(sep){
    if(undefined==sep||null==sep)
        sep='-';
    return this.displayYearMonth(sep)+sep+this.displaySingleDate();
};
Date.prototype.displayTime=function(){
    var ret;
    ret='';
    if(this.getHours()<10)
        ret+='0';
    ret+=this.getHours()+':';
    if(this.getMinutes()<10)
        ret+='0';
    ret+=this.getMinutes()+':';
    if(this.getSeconds()<10)
        ret+='0';
    ret+=this.getSeconds();
    return ret;
};
Date.prototype.display=function(){
    return this.displayDate()+' '+this.displayTime();
};
Date.prototype.displayShortDate=function(){
    var now=new Date();
    var year=this.getFullYear();
    var month=this.getMonth()+1;
    var date=this.getDate();
    if(month<10)
        month='0'+month;
    if(date<10)
        date='0'+date;
    if(now.getFullYear()!=this.getFullYear())
        return year+'-'+month;
    else
        return month+'-'+date;
};
Date.prototype.displayShort=function(){
    var now=new Date();
    var year=this.getFullYear();
    var month=this.getMonth()+1;
    var date=this.getDate();
    var hour=this.getHours();
    var minute=this.getMinutes();

    if(month<10)
        month='0'+month;
    if(date<10)
        date='0'+date;
    if(hour<10)
        hour='0'+hour;
    if(minute<10)
        minute='0'+minute;
    if(now.getFullYear()!=this.getFullYear())
        return year+'-'+month;
    else if(now.getMonth()!=this.getMonth()||now.getDate()!=this.getDate())
        return month+'-'+date;
    else
        return hour+':'+minute;
};
Date.prototype.displayShortDateInfo=function(){
    return '<abbr title="'+this.displayDate()+'">'+this.displayShortDate()+'</abbr>';
};
Date.prototype.displayShortInfo=function(){
    return '<abbr title="'+this.display()+'">'+this.displayShort()+'</abbr>';
};
Date.prototype.displayDay=function(){
    switch(this.getDay()){
        case 0: return '星期日';
        case 1: return '星期一';
        case 2: return '星期二';
        case 3: return '星期三';
        case 4: return '星期四';
        case 5: return '星期五';
        case 6: return '星期六';
    }
};
Date.prototype.isSameDay=function(time){
    if(null==time)
        return false;
    return (this.getFullYear()==time.getFullYear()&&this.getMonth()==time.getMonth()&&this.getDate()==time.getDate());
};
String.prototype.startWith=function(s){
    if(!s)return false;
    if(this.length<s.length)
        return false;
    return this.substring(0, s.length).toLowerCase()==s.toLowerCase();
};
String.prototype.endWith=function(s){
    if(!s)return false;
    if(this.length<s.length)
        return false;
    return this.substring(this.length-s.length, this.length).toLowerCase()==s.toLowerCase();
};
function HashMap(){
    this.container=new Object();
}
HashMap.prototype.get=function (key){
    return this.container[key];
};
HashMap.prototype.put=function (key, value) {
    this.container[key]=value;
};
HashMap.prototype.remove=function (key) {
    delete this.container[key];
};
HashMap.prototype.contain=function (key) {
    return (null==this.get(key))?false:true;
};
HashMap.prototype.clear=function(){
    for(var key in this.container){
        this.remove(key);
    }
};
HashMap.prototype.list=function(){
    var list=[];
    for(var key in this.container){
        list.push(this.get(key));
    }
    return list;
};
HashMap.prototype.keys=function(){
    var list=[];
    for(var key in this.container){
        list.push(key);
    }
    return list;
};
function Pager(total, size, page){
    this.total=total;
    this.size=size;
    this.page=page;
    this.all=0;

    this.prefix=null;
    this.suffix=null;
    this.range=5;

    this.init();
}
Pager.prototype.parse=function(json) {
    this.total=json.total;
    this.size=json.size;
    this.page=json.page;

    if(json.prefix!=undefined)
        this.prefix=json.prefix;
    if(json.suffix!=undefined)
        this.suffix=json.suffix;

    this.init();

    return this;
};
Pager.prototype.getStart=function(){
    return (this.page-1)*this.size;
};
Pager.prototype.getIndex=function(p){
    return this.getStart()+p;
};
Pager.prototype.init=function(){
    this.size=parseInt(this.size);
    this.total=parseInt(this.total);
    this.page=parseInt(this.page);

    if(this.size<=0)
        this.size=10;
    if(this.total<=0){
        this.all=1;
        this.page=1;
    }else{
        this.all=parseInt((this.total-1)/this.size+1);
        if(this.page<1||this.page>this.all)
            this.page=1;
    }
};
Pager.prototype.url=function(page){
    return ""+this.prefix+page+this.suffix;
};
Pager.prototype.link=function(page, name){
    if(name==null)
        name=page;
    return '<li><a href="'+this.url(page)+'">'+name+'</a></li>';
};
Pager.prototype.show=function(page, name){
    if(name==null)
        name=page;
    return '<li class="active"><a href="javascript:void(0);">'+name+'</a></li>';
};
Pager.prototype.display=function(){
    return this.print();
};
Pager.prototype.print=function(divId){
    var html='';
    var start, end, i;

    if(this.page<=this.range)
        start=1;
    else
        start=this.page-this.range;

    if(this.page+this.range>=this.all)
        end=this.all;
    else
        end=this.page+this.range;


    html+='<ul class="pagination">';
    if(start!=1)
        html+=this.link(1, '首页');
    else
        html+='<li class="disabled"><span>首页</span></li>';
    if(this.page>1)
        html+=this.link(this.page-1, '上页');
    else
        html+='<li class="disabled"><span>上页</span></li>';

    for(i=start;i<=end;i++){
        if(i==this.page)
            html+=this.show(i);
        else
            html+=this.link(i);
    }

    if(this.page<this.all)
        html+=this.link(this.page+1, '下页');
    else
        html+='<li class="disabled"><span>下页</span></li>';

    if(this.all!=end)
        html+=this.link(this.all, '末页');
    else
        html+='<li class="disabled"><span>末页</span></li>';

    html+='</ul>';

    if(null==divId)
        return html;
    else
        $('#'+divId).html(html);
};

function get_base_date_option(){
    return {
        'changeMonth':true,
        'changeYear':true,
        'dayNames':['日','一','二','三','四','五','六'],
        'dayNamesMin':['日','一','二','三','四','五','六'],
        'dayNamesShort':['日','一','二','三','四','五','六'],
        'monthNames':['一','二','三','四','五','六','七','八','九','十','十一','十二'],
        'monthNamesShort':['一','二','三','四','五','六','七','八','九','十','十一','十二']
    };
}
function get_date_option(){
    var option=get_base_date_option();
    option['dateFormat']='yy-mm-dd';
    return option;
}
function get_date_time_option(){
    var option=get_base_date_option();
    option['dateFormat']='yy-mm-dd hh:ii:ss';
    return option;
}
function html_format(text){
    if(!text||""==text)
        return "";
    return '<p>'+text
            .replace(/\r\n/g,"HOMECATE_BR_TOKCEN")
            .replace(/\n/g,"HOMECATE_BR_TOKCEN")
            .replace(/\r/g,"HOMECATE_BR_TOKCEN")
            .encodeHtml()
            .replace(/HOMECATE_BR_TOKCEN/g, "</p><p>")+'</p>';
}

js = {lang:{}};
js.lang.String = function(){
    this.REGX_HTML_ENCODE = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g;
    this.REGX_HTML_DECODE = /&\w+;|&#(\d+);/g;
    this.REGX_TRIM = /(^\s*)|(\s*$)/g;
    this.HTML_DECODE = {
        "&lt;" : "<",
        "&gt;" : ">",
        "&amp;" : "&",
        "&nbsp;": " ",
        "&quot;": "\"",
        "&copy;": ""
        // Add more
    };
    this.encodeHtml = function(s){
        s = (s != undefined) ? s : this.toString();
        return (typeof s != "string") ? s :
            s.replace(this.REGX_HTML_ENCODE,
                function($0){
                    var c = $0.charCodeAt(0), r = ["&#"];
                    c = (c == 0x20) ? 0xA0 : c;
                    r.push(c); r.push(";");
                    return r.join("");
                });
    };
    this.decodeHtml = function(s){
        var HTML_DECODE = this.HTML_DECODE;
        s = (s != undefined) ? s : this.toString();
        return (typeof s != "string") ? s :
            s.replace(this.REGX_HTML_DECODE,
                function($0, $1){
                    var c = HTML_DECODE[$0];
                    if(c == undefined){
                        // Maybe is Entity Number
                        if(!isNaN($1)){
                            c = String.fromCharCode(($1 == 160) ? 32:$1);
                        }else{
                            c = $0;
                        }
                    }
                    return c;
                });
    };
    this.trim = function(s){
        s = (s != undefined) ? s : this.toString();
        return (typeof s != "string") ? s :
            s.replace(this.REGX_TRIM, "");
    };
    this.hashCode = function(){
        var hash = this.__hash__, _char;
        if(hash == undefined || hash == 0){
            hash = 0;
            for (var i = 0, len=this.length; i < len; i++) {
                _char = this.charCodeAt(i);
                hash = 31*hash + _char;
                hash = hash & hash; // Convert to 32bit integer
            }
            hash = hash & 0x7fffffff;
        }
        this.__hash__ = hash;
        return this.__hash__;
    };
};
js.lang.String.call(String.prototype);

if (!Array.prototype.shuffle) {
    Array.prototype.shuffle = function() {
        for(var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
        return this;
    };
}
