
/************************ 用户在button以外的页面元素中按回车转换为按tab键************************/
function OnKeyDownDefault() {
    if (window.event.keyCode == 13 && window.event.ctrlKey == false && window.event.altKey == false) {
        if (window.event.srcElement.type != 'button' && window.event.srcElement.type != 'file' && window.event.srcElement.type != 'submit') {
            window.event.keyCode = 9;
        }
        else {
            return true;
        }
    }
}

/************************ 在隐藏控件中保存Select选中的Value ************************/
function SetHiddenValue(obj, hdnObj) {
    hdnObj.value = obj.options[obj.selectedIndex].value;
}

/************************ 在隐藏控件中保存Select选中的Text ************************/
function SetHiddenText(obj, hdnObj) {
    hdnObj.value = obj.options[obj.selectedIndex].text;
}

/************************ 在隐藏控件中保存Radio选中的Text,RadioList中每个Radio均调用此方法 ************************/
function SetRadioHiddenValue(checkedText, hdnObj) {
    hdnObj.value = checkedText;
}

/************************ 在隐藏控件中保存Select选中的Text ************************/
var oldValue = '';
function GetFocusValue(objControl) {
    oldValue = objControl.value;
}

/************************ 去掉原值检查新输入值的JS ************************/
function RemoveOldValue(objControl, checkValue) {
    var newValue = '';
    if (objControl.value.search(checkValue) == 0) {
        //当在原值基础上输入时,从开始处去掉原值部分,仅检查新输入内容
        newValue = objControl.value.substring(checkValue.length);
    }
    else {
        newValue = objControl.value;
    }
    return newValue;
}

/************************ 生成检查输入值是否重复的脚本函数 ************************/
function CheckRepate(infields, invals, inQuotes, strBackId) {
    var feildName = 'feildName=';
    var inputVal = 'values=';
    var haveQuotes = 'quotes=';
    var infieldsAry = infields.split(',');
    var invalsAry = invals.split(',');
    var inQuotesAry = inQuotes.split(',');
    for (var i = 0; i < infieldsAry.length; i++) {
        feildName = feildName + infieldsAry[i] + ',';
        inputVal = inputVal + escape(document.getElementById(invalsAry[i]).value) + ',';
        haveQuotes = haveQuotes + inQuotesAry[i] + ',';
    }
    feildName = feildName.substr(0, feildName.length - 1);
    inputVal = inputVal.substr(0, inputVal.length - 1);
    haveQuotes = haveQuotes.substr(0, haveQuotes.length - 1);
    var strData = feildName + '&' + inputVal + '&' + haveQuotes;
    var cbo = new CallBackObject(strBackId);
    cbo.DoCallBack('', strData);
}

/***************************从Cookie中取值****************************************/
function Get_Cookie(check_name) {
    var a_all_cookies = document.cookie.split(';');
    var a_temp_cookie = '';
    var cookie_name = '';
    var cookie_value = '';
    var b_cookie_found = false;
    var i = '';

    for (i = 0; i < a_all_cookies.length; i++) {
        a_temp_cookie = a_all_cookies[i].split('=');
        cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
        if (cookie_name == check_name) {
            b_cookie_found = true;
            if (a_temp_cookie.length > 1) {
                cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
            }
            return cookie_value;
            break;
        }
        a_temp_cookie = null;
        cookie_name = '';
    }
    if (!b_cookie_found) {
        return null;
    }
}

/******************保存值到Cookie中**************************/
function Set_Cookie(name, value, expires, path, domain, secure) {
    var today = new Date();
    today.setTime(today.getTime());
    if (expires) {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date(today.getTime() + (expires));
    document.cookie = name + "=" + escape(value) +
		((expires) ? ";expires=" + expires_date.toGMTString() : "") + //expires.toGMTString()
		((path) ? ";path=" + path : "") +
		((domain) ? ";domain=" + domain : "") +
		((secure) ? ";secure" : "");
}

/********************删除Cookie*******************************/
function Delete_Cookie(name, path, domain) {
    if (Get_Cookie(name)) document.cookie = name + "=" +
			((path) ? ";path=" + path : "") +
			((domain) ? ";domain=" + domain : "") +
			";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

/********************去掉字符串两边空格***************************/
//功能：去掉字符串两边空格
//返回：true ---- 包含此不合法字符  false ---- 不包含
function TrimString(str) {
    var i, j;
    if (str == "") return "";
    for (i = 0; i < str.length; i++)
        if (str.charAt(i) != ' ') break;
    if (i >= str.length) return "";

    for (j = str.length - 1; j >= 0; j--)
        if (str.charAt(j) != ' ') break;

    return str.substring(i, j + 1);
}

/********************去前空白符***************************/
function Ltrim(str) {
    return str.replace(/^\s+/, "");
}

/********************除去后空白符***************************/
function Rtrim(str) {
    return str.replace(/\s+$/, "");
}

/********************除去前后空白符***************************/
function Trim(str) {
    return Ltrim(Rtrim(str));
}

/********************判断日期是否有效***************************/
function isValidDate(value, userFormat) {
    // Set default format if format is not provided
    userFormat = userFormat || 'mm/dd/yyyy';
    // Find custom delimiter by excluding
    // month, day and year characters
    var delimiter = /[^mdy]/.exec(userFormat)[0];
    // Create an array with month, day and year
    // so we know the format order by index
    var theFormat = userFormat.split(delimiter);
    // Create array from user date
    var theDate = value.split(delimiter);
    function isDate(date, format) {
        var m, d, y, i = 0, len = format.length, f;
        for (i; i < len; i++) {
            f = format[i];
            if (/m/.test(f)) m = date[i];
            if (/d/.test(f)) d = date[i];
            if (/y/.test(f)) y = date[i];
        }
        return (
        m > 0 && m < 13 &&
        y && y.length === 4 &&
        d > 0 &&
        // Check if it's a valid day of the month
        d <= (new Date(y, m, 0)).getDate()
        );
    }
    return isDate(theDate, theFormat);
} 
/*使用方法：
下面这个调用返回false，因为11月份没有31天
isValidDate('dd-mm-yyyy', '31/11/2012') */

/********************获取一组元素的最大宽度或高度***************************/
//对于需要进行动态排版的开发人员非常有用。
var getMaxHeight = function ($elms) {
    var maxHeight = 0;
    $elms.each(function () {
        // In some cases you may want to use outerHeight() instead
        var height = $(this).height();
        if (height > maxHeight) {
            maxHeight = height;
        }
    });
    return maxHeight;
}; 
/*使用方法：
$(elements).height( getMaxHeight($(elements)) ); */

/********************高亮文本***************************/
//有很多JQuery的第三方库可以实现高亮文本的功能，但我更喜欢用下面这一小段JavaScript代码来实现这个功能，它非常短小，而且可以根据我的需要去进行灵活的修改，而且可以自己定义高亮的样式。下面这两个函数可以帮助你创建自己的文本高亮插件。
function highlight(text, words, tag) {
    // Default tag if no tag is provided
    tag = tag || 'span';
    var i, len = words.length, re;
    for (i = 0; i < len; i++) {
        // Global regex to highlight all matches
        re = new RegExp(words[i], 'g');
        if (re.test(text)) {
            text = text.replace(re, '<'+ tag +' class="highlight">$&</'+ tag +'>');
        }
    }
    return text;
} 

/********************取消高亮***************************/
function unhighlight(text, tag) {
    // Default tag if no tag is provided
    tag = tag || 'span';
    var re = new RegExp('(<'+ tag +'.+?>|<\/'+ tag +'>)', 'g');
    return text.replace(re, '');
} 
/*使用方法：
$('p').html( highlight(
$('p').html(), // the text
['foo', 'bar', 'baz', 'hello world'], // list of words or phrases to highlight
'strong' // custom tag
)); */

/********************文字动效***************************/
//有时你会希望给你的一段文字增加动效，让其中的每个字都动起来。你可以使用下面这段jQuery插件代码来达到这个效果。当然你需要结合一个CSS3 transition样式来达到更好的效果。
$.fn.animateText = function(delay, klass) {
    var text = this.text();
    var letters = text.split('');
    return this.each(function(){
        var $this = $(this);
        $this.html(text.replace(/./g, '<span class="letter">$&</span>'));
        $this.find('span.letter').each(function(i, el){
            setTimeout(function(){ $(el).addClass(klass); }, delay * i);
        });
    });
}; 
/*使用方法：
$('p').animateText(15, 'foo'); */

/********************逐个隐藏元素***************************/ 
//下面这个jQuery插件可以根据你设置的步长（间隔时间）来逐个隐藏一组元素。在列表元素的重新加载中使用，可以达到很好的效果。
$.fn.fadeAll = function (ops) {
    var o = $.extend({
        delay: 500, // delay between elements
        speed: 500, // animation speed
        ease: 'swing' // other require easing plugin
    }, ops);
    var $el = this;
    for (var i=0, d=0, l=$el.length; i<l; i++, d+=o.delay) {
        $el.eq(i).delay(d).fadeIn(o.speed, o.ease);
    }
    return $el;
} 
/*使用方法：
$(elements).fadeAll({ delay: 300, speed: 300 }); */

/********************限制文本字数***************************/ 
//下面这端脚本允许你根据给定的字符长度截取文本，如果文本被截取，那么它的后面会自动带上省略号。
function excerpt(str, nwords) {
    var words = str.split(' ');
    words.splice(nwords, words.length-1);
    return words.join(' ') +
    (words.length !== str.split(' ').length ? '…' : '');
} 

/********************判断相应式布局中当前适配度***************************/ 
//目前很多设计已经采用了响应式布局来适配网站或应用在不同设备上的显示。你经常需要在代码中判断当前处于哪一个屏幕适配度下。
function isBreakPoint(bp) {
    // The breakpoints that you set in your css
    var bps = [320, 480, 768, 1024];
    var w = $(window).width();
    var min, max;
    for (var i = 0, l = bps.length; i < l; i++) {
        if (bps[i] === bp) {
            min = bps[i-1] || 0;
            max = bps[i];
            break;
        }
    }
    return w > min && w <= max;
} 
/*使用方法：
if ( isBreakPoint(320) ) {
    // breakpoint at 320 or less
}
if ( isBreakPoint(480) ) {
    // breakpoint between 320 and 480
}
… */

/********************全局计数***************************/  
//在一些游戏或广告场景中，你需要记录用户在当前页面上点击某一个按钮的次数，这时你可以使用jQuery的.data()函数来处理：
$(element).data('counter', 0) .click(function() {// begin counter at zero
    var counter = $(this).data('counter'); // get
    $(this).data('counter', counter + 1); // set
    // do something else...
}); 

/********************嵌入优酷视频***************************/   
function embedYouku(link, ops) {
    var o = $.extend({
        width: 480,
        height: 320,
        params: ''
    }, ops);
    var id = /\?v\=(\w+)/.exec(link)[1];
    return '<embed allowFullScreen="true" id="embedid" quality="high" width="'+o.width+'" height="'+o.height+'" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" src="'+id+'?'+o.ops+'"';
} 
/*使用方法：
embedYouku(
'http://static.youku.com/v/swf/qplayer.swf', 
{'winType=adshow&VideoIDS=XMTE3NzQ0NTky&isAutoPlay=false&isShowRelatedVideo=false'}
); */

/********************创建动态菜单或下拉列表***************************/  
//在很多场景中，我们都需要动态地创建菜单、下拉列表或列表项。下面是一段最基础的代码实现上面的功能，你可以根据实际需要进行相应的扩展。
function makeMenu(items, tags) {
tags = tags || ['ul', 'li']; // default tags
var parent = tags[0];
var child = tags[1];
var item, value = '';
for (var i = 0, l = items.length; i < l; i++) {
item = items[i];
// Separate item and value if value is present
if (/:/.test(item)) {
item = items[i].split(':')[0];
value = items[i].split(':')[1];
}
// Wrap the item in tag
items[i] = '<'+ child +' '+
(value && 'value="'+value+'"') +'>'+ // add value if present
item +'</'+ child +'>';
}
return '<'+ parent +'>'+ items.join('') +'</'+ parent +'>';
} 
/*使用方法：
// Dropdown select month
makeMenu(
['January:JAN', 'February:FEB', 'March:MAR'], // item:value
['select', 'option']
);
// List of groceries
makeMenu(
['Carrots', 'Lettuce', 'Tomatos', 'Milk'],
['ol', 'li']
); */

/********************身份证号码加密***************************/
function EncryptIDCard(idCard)
{
    return idCard.replace(/(\d{4})\d*([0-9a-zA-Z]{4})/, "$1******$2");
    //idCard = '420119188404098978X';结果：4201******978X 
}

/********************获取本地时间并显示***************************/
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day 
        "h+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds() //millisecond 
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}
/*使用方法：
<p id="jnkc"></p> 
<script>setInterval("jnkc.innerHTML=new Date().toLocaleString()+' 星期'+'日一二三四五六'.charAt(new Date().getDay());", 1000); </script>
*/

/********************将form元素序列号为json***************************/
function SerializeObject(obj) {
    var data = {};
    var t = $(obj).serializeArray();
    $.each(t, function () {
        data[this.name] = this.value;
    });
    return data;
}

/********************获取依据时间的随机ID***************************/
function GetMassegeid() {
    return new Date().format('yyyyMMdd') + "_" + parseInt(Math.random() * 10000) + "_" + parseInt(Math.random() * 100);
}