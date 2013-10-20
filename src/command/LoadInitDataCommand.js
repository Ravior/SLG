/**
 * User: zhoufei
 * Date: 13-6-21
 * Time: 下午2:04
 * Class：加载初始化数据【init.json】命令
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.command.LoadInitDataCommand',
        parent:puremvc.AsyncCommand
    },
    //INSTANCE MEMBERS
    {
        /** @override */
        execute:function (note) {
            console.log("Execute LoadInitDataCommand");
            var proxy = this.facade.retrieveProxy(app.proxy.InitProxy.NAME);
            proxy.getInitInfo(ClassUtils.delegate(this, this.onComplete));
        },

        onComplete:function(data){
            console.log("游戏数据int.json请求完毕");
            this.facade.retrieveProxy(app.proxy.HomeProxy.NAME).init();
            this.commandComplete();
        }
    }
)
