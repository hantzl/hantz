//判断是否是一个数组
function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}
//isArray([1, 2, 3]) //true

//判断是否是一个函数(三种)
function isFunction(fn) {
    return Object.prototype.toString.call(fn) === '[object Function]';
    return fn.constructor == Function;
    return fn instanceof Function;
    return typeof (fn) == Function;
}

//数组去重，只考虑数组中元素为数字或者字符串
function newarr(arr) {
    var arrs = [];
    for (var i = 0; i < arr.length; i++) {
        if (arrs.indexOf(arr[i]) == -1) {
            arrs.push(arr[i])
        }
    }
    return arrs;
}

//动态去重
var arr = [1, 2,
3, 4];
function add() {
    var newarr = [];
    $('.addEle').click(() => {
        var rnd = Math.ceil(Math.random() *
        10);
        newarr.push(rnd)
        for (var i = 0; i < newarr.length; i++) {
            if (arr.indexOf(newarr[i]) == -1) {
                arr.push(newarr[i])
                arr.sort(function (a, b) {
                    return b - a
                    //降序
                });
            }
        }
        console.log(arr)//[1,2,3,4,5,6,7,8,9]
    })
}

//获取一个对象里面第一次元素的数量
function getObjectLength(obj) {
    var i = 0;
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            i++;
        }
    }
    console.log(i);
}
//var obj = {name:'kob',age:20};
//getObjectLength(obj) //2

//获取元素相对于浏览器窗口的位置，返回一个{x,y}对象
function getPosition(element) {
    var offsety =
    0;
    offsety += element.offsetTop;
    var offsetx =
    0;
    offsetx += element.offsetLeft;
    if (element.offsetParent !=
    null) {
        getPosition(element.offsetParent);
    }
    return { Left: offsetx, Top: offsety };
}

//判断某个字母在字符串中出现的次数
var str = 'To be, or not to be, that is the question.';
var count = 0;
var pos = str.indexOf('e');
while (pos !== -1) {
    count++;
    pos = str.indexOf('e', pos +
    1);
}
//console.log(count) //4

//计算出数组中出现次数最多的元素
var arrayObj = [1, 1,
2, 3,
3, 3, 4,
5, 5];
var tepm = '', count = 0;
var newarr =
new Array();
for (var i = 0; i < arrayObj.length; i++) {
    if (arrayObj[i] != -1) {
        temp = arrayObj[i];
    }
    for (var j = 0; j < arrayObj.length; j++) {
        if (temp == arrayObj[j]) {
            count++;
            arrayObj[j] = -1;
        }
    }
    newarr.push(temp + ":" + count);
    count = 0;
}
for (var i = 0; i < newarr.length; i++) {
    console.log(newarr[i]);
}


//数组filter（搜索功能）
var fruits = ['apple', 'banana',
'grapes', 'mango',
'orange'];
function filterItems(query) {
    return fruits.filter(function (el) {
        return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
    })
}
//console.log(filterItems('ap')); 
// ['apple', 'grapes']

//copy 对象（第一种）
//第一种
var cloneObj = function (obj) {
    var newObj = {};
    if (obj instanceof Array) {
        newObj = [];
    }
    for (var key in obj) {
        var val = obj[key];
        newObj[key] = typeof val ===
        'object' ? cloneObj(val) : val;
    }
    return newObj;
};
//第二种
function clone(origin, target) {
    var target = target || {};
    for (var prop in origin) {
        target[prop] = origin[prop];
    }
    return target;
}


//深度克隆
var newObj = {};
function deepClone(origin, target) {
    var target = target || {},
    toStr = Object.prototype.toString,
    arrStr = "[object Array]";
    for (var prop in origin) {
        if (origin.hasOwnProperty(prop)) {
            if (origin[prop] !=
            "null" && typeof (origin[prop]) ==
            'object') {//判断原型链
                target[prop] = (toStr.call(origin[prop]) == arrStr) ? [] : {}//判断obj的key是否是数组
                deepClone(origin[prop], target[prop]);//递归的方式
            } else {
                target[prop] = origin[prop];
            }
        }
    }
    return target
}
//deepClone(obj, newObj);
//console.log(newObj)

//求数组最大值和最小值
Array.prototype.max =
function () {
    return Math.max.apply({}, this)
}

Array.prototype.min = function () {
    return Math.min.apply({}, this)
}
//console.log([1,5,2].max())

//json数组去重
function UniquePay(paylist) {
    var payArr = [paylist[0]];
    for (var i = 1; i < paylist.length; i++) {
        var payItem = paylist[i];
        var repeat =
        false;
        for (var j = 0; j < payArr.length; j++) {
            if (payItem.name == payArr[j].name) {
                repeat = true;
                break;
            }
        }
        if (!repeat) {
            payArr.push(payItem);
        }
    }
    return payArr;
}

//对比两个数组，取出交集
Array.intersect = function () {
    var result =
    new Array();
    var obj = {};
    for (var i = 0; i <
    arguments.length; i++) {
        for (var j = 0; j <
        arguments[i].length; j++) {
            var str = arguments[i][j];
            if (!obj[str]) {
                obj[str] = 1;
            }
            else {
                obj[str]++;
                if (obj[str] ==
                arguments.length) {
                    result.push(str);
                }
            }//end else
        }//end for j
    }//end for i
    return result;
}
//console.log(Array.intersect(["1","2","3"], ["2","3","4", "5", "6"]))

//数组和对象比较。取出对象的key和数组元素相同的
var arr = ['F00006', 'F00007', 'F00008'];
var obj = { 'F00006': [{ 'id': 21 }], 'F00007': [{ 'id': 11 }] }
var newobj = {};
for (var item in obj) {
    if (arr.includes(item)) {
        newobj[item] = obj[item]
    }
}
//console.log(newObj)

//删除数组中某个元素
//第一种 
Array.prototype.remove =
function (val) {
    var index = this.indexOf(val);
    if (index != 0) {
        this.splice(index, 1)
    }
}
//[1,3,4].remove(3)
//第二种
function remove(arr, indx) {
    for (var i = 0; i < arr.length; i++) {
        var index = arr.indexOf(arr[i]);
        if (indx == index) {
            arr.splice(index, 1)
        }
    }
    return arr
}

//判断数组是否包含某个元素
Array.prototype.contains = function (val) {
    for (var i = 0; i <
    this.length; i++) {
        if (this[i] == val) {
            return true;
        }
    }
    return false;
};
//[1, 2,3,4].contains(2)//true

