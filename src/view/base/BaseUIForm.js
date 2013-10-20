/**
 * User: zhoufei
 * Date: 13-5-24
 * Time: 下午3:36
 * Class: 基于Canvas渲染的ui基类, 位于app.GameData.topStage内部
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.view.base.BaseUIForm',
        parent:EventDispatcher,
        /**
         * @Constructor
         */
        constructor:function(view, model,alpha){
            EventDispatcher.call(this);
            this._init(view,model,alpha);
        }
    },
    //INSTANCE MEMBERS
    {
        view:null,

        _init:function(view,model,alpha){
            if(!view) return;
            this.stage=app.GameData.topStage;
            this.container=new createjs.Container();

            //是否创建遮罩层
            if(model){
                //默认透明度为1
                if(alpha == null) alpha = 1.0;
                this.mask=app.view.ViewUtils.createMask('#000',alpha);
                this.container.addChild(this.mask);
            };

            this.view=view;
            this.view.x=(app.GameData.bottomCanvas.width-this.view.width)/2;
            this.view.y=(app.GameData.bottomCanvas.height-this.view.height)/2;
            this._scaleView(this.view);
            this.container.addChild(this.view);
            this.stage.addChild(this.container);
            this.stage.update();
        },

        _scaleView:function(view){
            //原始最大宽高
            var w = app.GameData.gameWidth, h = app.GameData.gameHeight;

            //view的实际宽高
            var div_w = view.width;
            var div_h = view.height;

            var pw = app.GameData.bottomCanvas.width;
            var ph = app.GameData.bottomCanvas.height;

            var n = pw/w;

            var dh = h * n;
            var ox, oy;
            if(dh > ph){
                n = ph/h;
                ox = div_w < w ? (w * n - div_w * n) * 0.5 : 0;
                oy = (ph - div_h * n) * 0.5;
            }else{
                ox = (pw - div_w * n) * 0.5;
                oy = div_h < h ? (h * n - div_h * n) * 0.5 : 0;

            }
            view.scaleX=n;
            view.scaleY=n;
            view.x = ox;
            view.y = oy;
        },


        /**
         * 为view赋值，需override使用
         * @param data
         */
        setData:function(data){
            this.data = data;
        },

        depose:function(){
            this.removeAllEventListeners();
            this.stage.removeChild(this.container);
            this.view=null;
            this.container=null;
            this.stage.update();
        },

        setPosition:function(x,y){
            this.container.x=x;
            this.container.y=y;
        },

        setVisible:function(b){
             this.container.visible=b;
        },

        update:function(){
            app.GameData.topStage.update();
        }
    }
)
