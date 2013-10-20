/**
 * User: zhoufei
 * Date: 13-6-21
 * Time: 下午2:26
 * Class:建筑物升级
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.proxy.LevelUpProxy',
        parent:app.proxy.BaseDataProxy
    },
    //INSTANCE MEMBERS
    {
        //是否第一次执行setData()，加载完init.json会触发update(),不会发送建筑升级产生的新建筑数据增加的通知;
        first:true,

        /**
         * 升级
         * @param {in} n:建筑物id
         * @param {function} handler:回到函数
         * @return {void}
         */
        levelUp:function (n, handler) {
            this.complteHandler = handler;
            var param = {id:n};
            this.getService(app.getServiceURL() + "increaseBuilding.json", param, 'post');

        },

        /**
         * override
         * @param data：升级的建筑物数据
         */
        onComplete:function (data) {
            this.setData([data]);
            if (this.complteHandler) {
                this.complteHandler();
                this.complteHandler = null;
            }
            this.sendNotification(app.proxy.LevelUpProxy.COMPLETE, data);
        },

        /**
         * override
         * @param data
         */
        onUpdate:function (data) {
            this.setData(data);
        },

        /**
         * override
         * @param d
         */
        setData:function (d) {
            if (!this.data) {
                this.data = [];
            }
            //是否添加新的建筑数据,true为添加新的建筑数据，false为更新建筑数据
            var flag=true;
            var n = this.data.length;
            for (var i = 0; i < d.length; i++) {
                for (var j = 0; j < n; j++) {
                    if (d[i]['id'] == this.data[j]['id']) {
                        //更新
                        flag = false;
                        this.data[j].update(d[i]);
                        break;
                    }
                }
                //this.data中没有的数据则为新增的建筑数据
                if (flag) {
                    //追加
                    var vo = new app.data.BuildingVO();
                    vo.update(d[i]);
                    this.data.push(vo);
                    //建筑升级产生的新建筑数据增加
                    if (!this.first) {
                      //将HomeProxy中visible为false的建筑修改为true
                      var buildData = this.homeProxy.addBuilding(vo.id);
                      //修改主场景建筑显示界面，添加一个显示的建筑
                      this.sendNotification(app.mediator.scene.HomeMediator.ADD_BUILDING, buildData);
                    }
                }
            }
            if (this.first) {
                this.first = false;
            }
        },

        /**
         * 取建筑升级信息
         * @param   id
         * @return  BuildingVO
         */
        getBuildInfo:function (id) {
            var len = this.data.length;
            for (var i = 0; i < len; i++) {
                if (this.data[i]['id'] == id) {
                    return this.data[i];
                }
            }
            return null;
        },

        /**
         * 建筑是否开放
         * @param id:建筑id
         * @returns {boolean}
         */
        isBuildingOpen:function (id) {
            //建筑开放等级
            var openLevel=app.data.DataBase.getInstance().getBuildInfo(id)["openLevel"];
            //玩家等级
            var userLevel=this.userPorxy.data["level"];
            return openLevel>=userLevel;
        },

        /**
         * @Override
         */
        onRegister:function(){
            this.homeProxy= this.facade.retrieveProxy(app.proxy.HomeProxy.NAME);
            this.userPorxy=this.facade.retrieveProxy(app.proxy.UserInfoProxy.NAME);
        }
    },
    //STATIC MEMBERS
    {
        /**
         * The proxy's name.
         *
         * @static
         * @type {string}
         */
        NAME:'LevelUpProxy',

        /**
         * All notification
         * 建筑升级，发送了的建筑信息改变通知
         */
        COMPLETE:'LevelUp_Complete'
    }
)
