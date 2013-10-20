/**
 * User: zhoufei
 * Org: Efun
 * Date: 13-5-24
 * Time: 下午4:09
 * Class:view公用类
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.view.ViewUtils'
    },
    //INSTANCE MEMBERS
    {
    },
    //STATIC MEMBERS
    {
        /**
         * 创建遮罩层
         * @param color :背景色
         * @param alpha：遮罩层透明度
         */
        createMask:function(color, alpha){
            color=color||'#000';
            alpha=alpha||0;
            var shape=new createjs.Shape();
            shape.graphics.beginFill(color).rect(0,0,app.GameData.bottomCanvas.width,app.GameData.bottomCanvas.height);
            shape.alpha=alpha;
            //阻止遮罩层下层被点击
            shape.onPress = function () { };
            return shape;
        },
        //创建UI conextBox
        createContentBox:function(width,height){
            var contentBg=new createjs.Container();
            var contentBox_style=new createjs.Graphics().beginFill('#705137').setStrokeStyle(1,'round').beginStroke('#000').drawRect(0,0,width,height);
            var contentBox=new createjs.Shape(contentBox_style);

            var content_style=new createjs.Graphics().beginFill('#150e04').setStrokeStyle(1,'round').beginStroke('#000').drawRect(2,2,width-4,height-4);
            var content=new createjs.Shape(content_style);

            contentBg.addChild(contentBox,content);
            return contentBg;
        }
    }
)
