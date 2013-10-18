/**
 * User: zhoufei
 * Date: 13-5-21
 * Time: 上午9:51
 * Class:通用函数
 */
//为数组添加indexOf方法
if(!('indexOf' in Array)){
    Array.prototype.indexOf = function(item){
        for(var i = 0;i<this.length;i++){
            if(this[i] == item){
                return i;
            }
        }
        return -1;
    }
}

//封装document.getElementById(id)
function $(id){
    return document.getElementById(id);
}

/**
 * 填充字符串
 * @param n
 * @param bit  添加位数
 * @param space 填充字符串用的字符
 * @returns {*}
 */
function toFix(n , bit,space) {
    if(!bit)bit = 1;
    var str = n.toString();
    var b = bit - str.length;
    space=space?space:"0";
    while(b > 0) {
        str = space + str;
        b--;
    }
    return str;
}

/**
 * 剪切字符串
 * @param n
 * @param start
 * @param length
 * @returns {string}
 */
function toSlice(n,start,length){
    var str= n.toString();
    return str.substr(start,length);
}

//克隆对象
function cloneObj(o){
    var obj = {};
    for(var p in o){
        obj[p] = o[p];
    }
    return obj;
}


//对数组进行排序
Array.DESC = 1;
Array.ASC = 0;

function sortOn(array, prop, type)
{
    var props = prop.split('.');
    type = type || Array.ASC;
    var func = function (a, b) {
        var ta = a[props[0]];
        var tb = b[props[0]];
        for (var i = 1; i < props.length; i++) {
            ta = ta[props[i]];
            tb = tb[props[i]];
        }
        if (ta < tb) {
            return type == Array.ASC ? -1 : 1;
        } else if (ta > tb) {
            return type == Array.ASC ? 1 : -1;
        } else {
            return 0;
        }
    };
    array.sort(func);
}

function getColorByQualityId(id){
    return["#FFFFFF","#222345","#CDFCDW","#WDFVKC"][id-1]
}

function createButton(image,text){
    var container=new createjs.Container();
    var btnBg=new createjs.Bitmap(app.GameData.GameResource.getContent(image));
    var btnText=new createjs.Text(text, "bold 24px Arial", "#FFF");
    btnText.x=(btnBg.image.width-btnText.getMeasuredWidth())/2;
    btnText.y=(btnBg.image.height-btnText.getMeasuredHeight())/2;
    container.addChild(btnBg,btnText);
    container.width = btnBg.image.width;
    container.height = btnBg.image.height;
    return container;
}

