/**
 * User: zhoufei
 * Date: 13-5-29
 * Time: 下午3:30
 * Class: 加载主场景资源文件及公用资源文件
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.command.LoadCacheCommand',
        parent:puremvc.AsyncCommand
    },
    //INSTANCE MEMBERS
    {
        /** @override */
        execute:function (note) {
            console.log('LoadCacheCommand execute');

            var list = [
                //建筑名称背景图
                {id:'lvbg', src:app.GameData.imageSrc+'ui/lvbg.png'},
                //UI
                {id:'dlg_title',src:app.GameData.imageSrc+'ui/dlg_title.png'},
                {id:'tab_close',src:app.GameData.imageSrc+'ui/tab_close.png'},
                {id:'popupbg',src:app.GameData.imageSrc+'ui/popupbg.png'},
                {id:'btnbg_12',src:app.GameData.imageSrc+'ui/btnbg_12.png'},
                {id:'btnbg_01',src:app.GameData.imageSrc+'ui/btnbg_01.png'},
                {id:'tabbg_01',src:app.GameData.imageSrc+'ui/tabbg_01.png'},
                {id:'tabbg_02',src:app.GameData.imageSrc+'ui/tabbg_02.png'}

            ];
            var proxy = this.facade.retrieveProxy(app.proxy.HomeProxy.NAME);
            console.log(proxy.getData());
            list = list.concat(proxy.getData(), proxy.getHomeMapInfo());
            console.log('LoadCacheCommand start');

            var handler = ClassUtils.delegate(this, this.onComplete);
            //{value:"加载的内容数组", hide:true, callback:回调方法, descript:'描述文字'}
            this.sendNotification(app.command.CommandType.LOAD, {value:list, callback:handler, descript:Language.LoadCacheCommand.lang_1});
        },

        onComplete:function(loader){
            console.log('LoadCacheCommand complete');

            this.commandComplete();
        }
    }
)
