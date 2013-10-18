/**
 * User: zhoufei
 * Date: 13-6-20
 * Time: 下午4:36
 * Class: 配置文件加载命令
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.command.LoadDataBaseCommand',
        parent:puremvc.AsyncCommand
    },
    //INSTANCE MEMBERS
    {
        /** @override */
        execute:function (note) {
            var preDataList=[{id:'homeData', src:'data/home.json?v='+window.version} ];
            console.log("Execute LoadDataBaseCommand!");
            //{value:"加载的内容数组", hide:true, callback:回调方法}
            var obj = {value:preDataList, callback:ClassUtils.delegate(this, this.onComplete), descript:Language.LoadDataBaseCommand.lang_1};
            this.sendNotification(app.command.CommandType.LOAD, obj);
        },

        onComplete:function(){
            console.log("配置文件加载完毕!");
            var p = app.GameData.GameResource.getContent("homeData");
            app.data.DataBase.getInstance().setData(p);
            this.commandComplete();
        }
    }
)
