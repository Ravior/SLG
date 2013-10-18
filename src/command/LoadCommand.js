/**
 * User: zhoufei
 * Org: Efun
 * Date: 13-5-23
 * Time: 下午4:00
 * Class: 公用加载命令
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.command.LoadCommand',
        parent:puremvc.SimpleCommand
    },
    //INSTANCE MEMBERS
    {
        /** @override
         *  @param note  {value:"加载的内容数组", hide:true, callback:回调方法, descript:'描述文字'}
         */
        execute:function (note) {
            console.log("LoadCommand execute");
            var me = this;
            var param = note.getBody();
            var loader = new Loader();
            var p = {};
            loader.addEventListener("loaded", function(e){
                if(e.data.descript) p.text = e.data.descript;
                p.loaded = loader.getLoaded();
                p.total=loader.getTotal();
                console.log(p.loaded+"/"+ p.total);
            });
            loader.addEventListener("complete", function(){
                var gameResource=app.GameData.GameResource;
                if(!gameResource){
                    app.GameData.GameResource=loader;
                }
                else{
                    app.GameData.GameResource.appendResource(loader);
                }
                p = loader.getLoaded() + "/" + loader.getTotal();
                //执行回调方法
                if(typeof(param.callback) == 'function'){
                    param.callback();
                }else if(typeof(param.callback) == 'string'){
                    me.sendNotification(param.callback);
                }
            });
            for(var i = 0;i<param.value.length;i++){
                loader.addSource(param.value[i]);
            }
            loader.load();
        }
    }
)
