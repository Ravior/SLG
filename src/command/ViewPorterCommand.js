/**
 * User: zhoufei
 * Org: Efun
 * Date: 13-5-20
 * Time: 下午4:27
 * Class: ViewPorter管理
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.command.ViewPorterCommand',
        parent:puremvc.AsyncCommand
    },
    //INSTANCE MEMBERS
    {
        oriLock:null,

        execute:function(note){
            console.log("ViewPorterCommand execute!");
            //初始化UI
            this.init();
            this.commandComplete();
        },
        init:function(){
            app.GameData.bottomCanvas=this._createCanvas();
            app.GameData.middleCanvas=this._createCanvas();
            app.GameData.topCanvas=this._createCanvas();
            app.GameData.bottomStage = new createjs.Stage(app.GameData.bottomCanvas);
            app.GameData.middleStage=new  createjs.Stage(app.GameData.middleCanvas);
            app.GameData.topStage=new  createjs.Stage(app.GameData.topCanvas);
            //给stage添加touch支持
            if (createjs.Touch.isSupported()) {
                createjs.Touch.enable(app.GameData.topStage);
            }
            //设置字体
            this.setGameFont();
            if(!isXc){
                var vp = $("viewporter");
                var fg=document.createDocumentFragment();
                fg.appendChild(app.GameData.bottomCanvas);
                fg.appendChild(app.GameData.middleCanvas);;
                fg.appendChild(app.GameData.topCanvas);
                vp.appendChild(fg);

                //旋转方向时出现的提示
                this.oriLock = $("oriLock");

                //viewporter尺寸改变事件监听
                window.addEventListener('resize', this);
                //设置Canvas大小
                this.setGame(window.innerWidth >= window.innerHeight);
            }


        },
        _createCanvas:function(){
            var _canvas=  isXc?new Canvas():document.createElement("canvas");
            return _canvas;
        },

        handleEvent:function(e){
            switch(e.type){
                case 'resize':
                    this.setGame(window.innerWidth >= window.innerHeight);
                    break;
            }
        },

        setGame:function (isLandspace) {
            if (isLandspace) {
                var _bottomCanvas = app.GameData.bottomCanvas;
                var _middlerCanvas=app.GameData.middleCanvas;
                var _topCanvas=app.GameData.topCanvas;
                var _width=app.GameData.gameWidth;
                var _height=app.GameData.gameHeight;

                //canvas最大宽度为app.GameData.gameWidth;
                var w=Math.min(window.innerWidth,_width);

                var h = Math.ceil(_height/_width * w);

                _bottomCanvas.width=_middlerCanvas.width=_topCanvas.width=w;
                _bottomCanvas.height=_middlerCanvas.height=_topCanvas.height=h;

                setTimeout(function(){window.scrollTo(0, 0);},50);


            }
            this.oriLock.style["display"] = isLandspace ? "none" : "block";

        },

        //设置游戏字体
        setGameFont:function(){
            app.GameData.canvasText=new CreateText();
            app.GameData.canvasText.config({
                fontFamily: "Arial",
                fontSize: "20px",
                fontWeight: "normal",
                fontColor: "#FFF",
                lineHeight: "18",
                isXc:window.isXc
            });
        }
    }
)
