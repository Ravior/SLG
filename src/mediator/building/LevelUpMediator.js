/**
 * User: zhoufei
 * Date: 13-6-24
 * Time: 下午6:28
 * Class: 统一建筑弹出面板Mediator
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.mediator.building.LevelUpMediator',
        parent:puremvc.Mediator
    },
    //INSTANCE MEMBERS
    {
        /** @override */
        listNotificationInterests:function () {
            var self = app.mediator.building.LevelUpMediator;
            return [self.SHOW, self.CLOSE, app.proxy.LevelUpProxy.COMPLETE];
        },
        /** @override */
        handleNotification:function (note) {
                 var self = app.mediator.building.LevelUpMediator;
                 switch(note.getName()){
                     case self.SHOW:
                         //停止主场景渲染
                         this.sendNotification(app.mediator.scene.HomeMediator.STOP_RENDER);
                         this.showBuildDialog(note.getBody());
                         this.updateBuildInfo();
                         break;

                     case self.CLOSE:
                         this.closeBuildDialog();
                         break;
                     //升级完成
                     case app.proxy.LevelUpProxy.COMPLETE:
                         if(this.dialog != null){
                             //更新当面升级面板显示的信息
                             this.updateBuildInfo();
                         }
                 }
        },

        showBuildDialog:function (id) {
            if (this.dialog) {
                this.dialog.depose();
            }
            this.selectBuilding = id;
            //UI面板类
            this.dialog = new app.view.building.CommonBuildDialog();
            //建筑配置相关信息
            this.selectedBuildInfo =this.homeProxy.getBuildingInfo(id);
            this.dialog.setData(this.selectedBuildInfo);
            this.dialog.addEventListener(app.view.building.CommonBuildDialog.LEVEL_UP, this);
            this.dialog.addEventListener(app.view.building.CommonBuildDialog.CLOSE, this);
            this.dialog.addEventListener(app.view.building.CommonBuildDialog.OPERATE, this);

        },

        updateBuildInfo:function(){
            if(this.dialog){
                //建筑等级相关信息
                this.buildVo = this.levelUpProxy.getBuildInfo(this.selectBuilding);
                this.dialog.updateBuildInfo(this.buildVo);
                this.dialog.update();
            }
        },

        closeBuildDialog:function () {
            if (this.dialog) {
                this.sendNotification(app.mediator.scene.HomeMediator.RESUME_RENDER);
                this.dialog.depose();
                this.dialog = null;
            }
        },

        /** @override */
        onRegister:function () {
            this.levelUpProxy = this.facade.retrieveProxy(app.proxy.LevelUpProxy.NAME);
            this.homeProxy=this.facade.retrieveProxy(app.proxy.HomeProxy.NAME);
        },


        /**
         * @param {Event} textChangedEvent
         * @return {void}
         */
        handleEvent:function (event) {
            switch (event.type) {
                case app.view.building.CommonBuildDialog.LEVEL_UP:
                   this.sendNotification(app.command.CommandType.LEVEL_UP, this.selectBuilding);
                    break;
                case app.view.building.CommonBuildDialog.CLOSE:
                    //关闭建筑的公用对话框
                    this.closeBuildDialog();
                    break;
                case app.view.building.CommonBuildDialog.OPERATE:
                    switch (this.selectBuilding){
                        //万神殿
                        case app.data.HomeBuildingData.TEMPLE:
                            this.sendNotification(app.mediator.building.AltarMediator.SHOW);
                            break;
                        //科学院
                        case app.data.HomeBuildingData.SCIENCE:
                            this.sendNotification(app.mediator.building.ScienceMediator.SHOW);
                            break;
                        // 资源建筑
                        case app.data.HomeBuildingData.SILVER:
                        case app.data.HomeBuildingData.ENERGY:
                        case app.data.HomeBuildingData.CAN:
                            this.sendNotification(app.mediator.building.ResourceMediator.SHOW);
                            break;
                    }
            }
        }
    },
    //STATIC MEMBERS
    {
        /**
         * @static
         * @type {string}
         */
        NAME:'LevelUpMediator',

        SHOW:'LevelUpMediator_Show',

        CLOSE:'LevelUpMediator_Close'
    }
)
