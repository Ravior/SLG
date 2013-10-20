/**
 * User: zhoufei
 * Org: Efun
 * Date: 13-6-21
 * Time: 下午2:06
 * Class:加载初始化数据Proxy
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.proxy.InitProxy',
        parent:app.proxy.BaseDataProxy
    },
    //INSTANCE MEMBERS
    {
        /**
         * 取得初始化信息
         * @param {Object}
         * @return {void}
         */
        getInitInfo:function (handler) {
            this.completeHanlder = handler;
            this.getService(app.getServiceURL() + "init.json");
        },

        /**
         * override
         * @param data
         */
        onComplete:function (data) {
            if (this.completeHanlder) {
                this.completeHanlder();
                this.completeHanlder = null;
            } else {
                this.sendNotification(app.proxy.LevelUpProxy.COMPLETE, data);
            }
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
        NAME:'InitProxy'
    }
)
