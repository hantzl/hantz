// submitAjax(post方式提交)
function submitAjax(form, success, cache, alone) { 
    var cache = cache || true;
    var form = $(form);
    var url = form.attr('action');
    var data = form.serialize(); 
    ajax(url, data, success, cache, alone, false, 'post','json'); 
}
/*//调用实例 
$(function () { 
    $('#form-login').submit(function () { 
        submitAjax('#form-login');
        return false; 
    }); 
});*/
// ajax提交(post方式提交)
function post(url, data, success, cache, alone) { 
    ajax(url, data, success, cache, alone, false, 'post','json'); 
}
// ajax提交(get方式提交)
function get(url, success, cache, alone) { 
    ajax(url, {}, success, alone, false, 'get','json'); 
}
// jsonp跨域请求(get方式提交)
function jsonp(url, success, cache, alone) { 
    ajax(url, {}, success, cache, alone, false, 'get','jsonp'); 
}
/* ajax封装
* url 发送请求的地址
* data ajax请求参数
*success 请求成功后执行的方法
* cache 浏览器历史缓存 默认为false
* alone 独立提交（一次有效的提交）默认为false
* type 请求的方式 默认为get
* dataType 返回JSON数据 默认为JSON格式数据
*contentType 默认"application/x-www-form-urlencoded" 复杂json数据请用application/json
* async 异步请求 默认为true
*beforeSend 请求之前执行
*complete 请求完成执行
*error 请求失败执行
*/
function ajax(url, data, success, cache, alone, async, type, dataType, contentType, beforeSend, complete, error) {
    var type = type || 'post';//请求类型
    var dataType = dataType || 'json';//接收数据类型
    var contentType = contentType || "application/x-www-form-urlencoded";
    var async= async|| true;//异步请求
    var alone = alone || false;//独立提交（一次有效的提交）
    var cache = cache || false;//浏览器历史缓存
    var success = success || function(data) {
        /*console.log('请求成功');*/
        setTimeout(function() { 
            layer.msg(data.msg);//通过layer插件来进行提示信息
        },500);
        if(data.status){//服务器处理成功
            setTimeout(function() {
                if(data.url){
                    location.replace(data.url); 
                }else{
                    location.reload(true); 
                } 
            },1500); 
        }
        else{//服务器处理失败
            if(alone){//改变ajax提交状态
                ajaxStatus = true; 
            }
        } 
    };
    var beforeSend = beforeSend || function() {
        layer.msg('加载中', {//通过layer插件来进行提示正在加载 
            icon: 16,shade: 0.01
        },function(){
            //do something
        }); 
    };
    var complete = complete || function(data){
    
    };
    var error = error || function(data) {
        /*console.error('请求成功失败');*/
        /*data.status;//错误状态吗*/
        layer.closeAll('loading'); 
        setTimeout(function() {
            if(data.status == 404){
                layer.msg('请求失败，请求未找到'); 
            }
            else if(data.status == 503){
                layer.msg('请求失败，服务器内部错误'); 
            }
            else{
                layer.msg('请求失败,网络连接超时'); 
            }
            ajaxStatus = true; 
        },500); 
    };
    /*判断是否可以发送请求*/
    if(!ajaxStatus){
        return false; 
    } 
    ajaxStatus = false;//禁用ajax请求
    /*正常情况下1秒后可以再次多个异步请求，为true时只可以有一次有效请求（例如添加数据）*/
    if(!alone){
        setTimeout(function() {
            ajaxStatus = true; 
        },1000); 
    } 
    $.ajax({
        'url': url,
        'data': data,
        'type': type,
        'dataType': dataType,
        'contentType': contentType,
        'async': async,
        'success': success,
        'complete': complete,
        'error': error,
        'jsonpCallback': 'jsonp'+ (newDate()).valueOf().toString().substr(-4),
        'beforeSend':beforeSend, 
        complete:complete,
    });
}
