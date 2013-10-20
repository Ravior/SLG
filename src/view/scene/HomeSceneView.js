/**
 * User: zhoufei
 * Date: 13-5-29
 * Time: 下午4:08
 * Class: 主场景ViewComponent
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.view.scene.HomeSceneView',
        parent:EventDispatcher,

        /**
         * @Constructor ：构造函数
         * var data = this.facade.retrieveProxy(app.proxy.HomeProxy.NAME).getData();
        *  this.setViewComponent(new view(data));
         * @param data
         */
        constructor:function(data){
            EventDispatcher.call(this);
            this.init(data);
        }
    },
    //INSTANCE MEMBERS
    {
        init:function(data){
            this.data=data;
            var topStage=app.GameData.topStage;
            this.scene=new createjs.Container();
            var bg=new createjs.Bitmap(app.GameData.GameResource.getContent("homeBg"));

            this.w = bg.image.width;
            this.h = bg.image.height;

            this.scene.addChild(bg);

            this._builds = [];
            var len = this.data.length;
            for (var i = 0; i < len; i++) {
                this._builds[i] = this._createHouse(app.GameData.GameResource.getContent(this.data[i]['id']), this.data[i]);
            }



            topStage.addChild(this.scene);

            var me = this;
            var render = function(left, bottom, zoom) {
                me.scene.x = -left;
                me.scene.y = -bottom;
                topStage.update();
            };

            this.scrollView = new app.view.base.ScrollView(render, app.GameData.bottomCanvas.width, app.GameData.bottomCanvas.height, this.w, this.h);
            topStage.update();

        },
        /**
         * 创建动画
         * @param app.GameData.GameResource ：资源加载器
         * @param name ：资源名
         * @param x：Y坐标
         * @param y：Y坐标
         * @param imgs
         * @returns {BitmapAnimation}
         * @private
         */
        _createMovie:function(name, x, y){
            var bmpData =window.uieffect[name];
            x = x || 0;
            y = y || 0;
            bmpData.images = [app.GameData.GameResource.getContent(name)];
            var movie = new createjs.BitmapAnimation(new createjs.SpriteSheet(bmpData));
            movie.x = x;
            movie.y = y;
            movie.gotoAndPlay(0);
            return movie;
        },

        /**
         * 创建建筑
         * @param image：建筑图片
         * @param d ：建筑信息
         * @returns {createjs.Container}
         * @private
         */
        _createHouse:function(image, d){
            var house = new createjs.Container();
            var bmp = new createjs.Bitmap(image);
            house.addChild(bmp);
            house.bid = d.id;

            var x = d['x'];
            var y = d['y'];
            var id = d['id'];

            var me = this;
            house.x = x;
            house.y = y;
            var selectHouse=function(e){
                me.dispatchEvent({type:app.view.scene.HomeSceneView.SELECT_CONSTRUCT, target:this, data:id});
            }
            house.addEventListener("click",selectHouse);

            house.visible = d.visible;

            var tip = this._createTip(d.name);
            tip.x = bmp.image.width * 0.5;
            tip.y = bmp.image.height * 0.5 - 25;
            house.addChild(tip);
            house.tip = tip;

            this.scene.addChild(house);
            return house;
        },

        _createTip:function(text){
            var title = new createjs.Text(text);
            title.color = '#FFFFFF';
            title.font = '12px';
            title.textBaseline = 'top';
            title.textAlign = 'center';

            var shape = new createjs.Bitmap(app.GameData.GameResource.getContent('lvbg'));
            shape.x = -shape.image.width * 0.5;
            shape.y = -2;

            var tip = new createjs.Container();
            tip.addChild(shape);
            tip.addChild(title);
            tip.title = title;
            return tip;
        },

        //移动界面至（x,y)
        moveTo:function(x, y){
            this.scrollView.scroller.scrollTo(x, y, false, 1);
        },

        //添加建筑
        update:function(data){
            if (data) {
                for (var i = 0; i < this.scene.children.length; i++) {
                    if (this.scene.children[i].bid != null && this.scene.children[i].bid == data.id) {
                        //显示新的建筑
                        this.scene.children[i].visible = data.visible;
                    }
                }
                app.GameData.topStage.update();
            }
        }
    },
    //STATIC MEMBERS
    {
        /**
         * @static
         * @type {string}
         */
        SELECT_CONSTRUCT:'selectConstruct'
    }
)
