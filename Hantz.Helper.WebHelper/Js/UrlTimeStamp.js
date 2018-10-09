// 时间戳
function timestamp() {
    return 't=' + new Date().getTime() + '' + Math.floor(Math.random() * 9999 + 1000);
}
//在URL上设置时间戳
function setUrlStamp(url) {
    url = url.replace(/(^\s*)|(\s*$)/g, '');
    if (url.indexOf("t=") == -1) {
        if (url.indexOf("?") != -1) {
            url = url + "&" + timestamp();
        } else {
            url = url + "?" + timestamp();
        }
    }
    return url;
}
//在某片区域上给所有a标签设置时间戳
function setHrefStamp(area) {
    var target = $(area + " [href]");
    if (target.length == 0) return;
    target.each(function (index) {
        $(this).attr('href', setUrlStamp($(this).attr('href')));
    });
}
//将时间戳转换成日期格式：
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
}
//timestampToTime(1403058804);
//console.log(timestampToTime(1403058804));//2014-06-18 10:33:24

//将日期格式转换成时间戳：
var date = new Date('2014-04-23 18:55:49:123');
// 有三种方式获取
var time1 = date.getTime();//1398250549123
var time2 = date.valueOf();//1398250549123
var time3 = Date.parse(date);//1398250549000