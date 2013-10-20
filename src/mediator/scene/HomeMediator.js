/**
 * User: zhoufei
 * Org: Efun
 * Date: 13-5-23
 * Time: 下午4:19
 * Class: 主场景Mediator
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.mediator.scene.HomeMediator',
        parent:puremvc.Mediator
    },
    //INSTANCE MEMBERS
    {
        /**@Override**/
        listNotificationInterests:function(){
            var _self=app.mediator.scene.HomeMediator;
            return [_self.SHOW,
                _self.CLOSE,
                //停止主场景渲染
                _self.STOP_RENDER,
                //恢复主场景渲染
                _self.RESUME_RENDER,
                //移动
                _self.MOVE,
                //添加建筑
                _self.ADD_BUILDING
            ];
        },

        /**@Override**/
        handleNotification:function(note){
            var _self=app.mediator.scene.HomeMediator;
            switch(note.getName()){
                case _self.SHOW:
                    //主场景view
                    this._init();
                    //主菜单条
                    break;
                //建筑信息发生改变
                case _self.CLOSE:
                    this.viewComponent.depose();
                    this.setViewComponent(null);
                    break;
                case _self.STOP_RENDER:
                    createjs.Ticker.setPaused(true);
                    break;
                case _self.RESUME_RENDER:
                    createjs.Ticker.setPaused(false);
                    break;
                case _self.MOVE:
                    if (this.viewComponent) {
                        var pos = note.getBody();
                        this.viewComponent.moveTo(pos.x, pos.y);
                    }
                    break;
                case _self.ADD_BUILDING:
                    this.addBuilding(note.getBody());
                    break;

            }
        },

        /** 初始化view
         *  @private
         */
        _init:function(){
            var view = app.view.scene.HomeSceneView;
            var data = this.facade.retrieveProxy(app.proxy.HomeProxy.NAME).getData();
            if(!this.viewComponent){
                this.setViewComponent(new view(data));
                this.viewComponent.addEventListener(view.SELECT_CONSTRUCT, this);
            }
        },



        //添加建筑
        addBuilding:function (data) {
            this.viewComponent.update(data);
        },

        /**
         * Handle the W3CComponent event
         * @param {Event} textChangedEvent
         * @return {void}
         */
        handleEvent:function (event) {
            switch (event.type) {
                case app.view.scene.HomeSceneView.SELECT_CONSTRUCT:
                    console.log(event.data);
                    //event.data为建筑id
                    this.sendNotification(app.mediator.building.LevelUpMediator.SHOW, event.data);
                    break;
            }

        }
    },
    //STATIC MEMBERS
    {
        /**
         * @static
         * @type {string}
         */
        NAME:'HomeMediator',

        SHOW:'Home_SHOW',

        CLOSE:'Home_Close',

        STOP_RENDER:'Home_Stop_Render',

        RESUME_RENDER:'Home_Resume_Render',

        MOVE:'Home_Move',

        ADD_BUILDING:'Home_Add_Building'
    }
)
