/**
 * User: zhoufei
 * Date: 13-5-20
 * Time: 下午2:38
 * Class: 注册Command类，将Notification与Command联系起来
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.command.PrepControllerCommand',
        parent:puremvc.SimpleCommand
    },
    //INSTANCE MEMBERS
    {
        /**@Override**/
        execute:function(note){
            console.log("PrepControllerCommand execute!");
            this.facade.registerCommand(app.command.CommandType.LOAD, app.command.LoadCommand);
            this.facade.registerCommand(app.command.CommandType.GO_SCENE, app.command.GoSceneCommand);
            this.facade.registerCommand(app.command.CommandType.LEVEL_UP, app.command.LevelUpCommand);
            this.facade.registerCommand(app.command.CommandType.GO_SCENE, app.command.GoSceneCommand);
        }
    }
)
