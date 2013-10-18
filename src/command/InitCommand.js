/**
 * User: zhoufei
 * Date: 13-5-20
 * Time: 下午2:54
 * Class: 初始化命令
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.command.InitCommand',
        parent:puremvc.AsyncMacroCommand
    },
    //INSTANCE MEMBERS
    {
        /**@Override**/
        initializeMacroCommand:function(){
            console.log("InitCommand execute!");
            //初始化ViewPorter
            this.addSubCommand(app.command.ViewPorterCommand);
            //加载配置文件
            this.addSubCommand(app.command.LoadDataBaseCommand);
            //请求init.json
            this.addSubCommand(app.command.LoadInitDataCommand);
            //加载主场景资源文件
            this.addSubCommand(app.command.LoadCacheCommand);
        },

        /**@Override**/
        commandComplete:function(){
            console.log("InitCommand completed!");
            //进入主场景
            this.sendNotification(app.command.CommandType.GO_SCENE, app.mediator.scene.HomeMediator);
        }
    }
)
