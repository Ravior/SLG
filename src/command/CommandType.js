/**
 * User: zhoufei
 * Date: 13-10-17
 * Time: 下午7:52
 * Dec:所有命令类型集合
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.command.CommandType'
    },
    //INSTANCE MEMBERS
    {
    },
    //STATIC MEMBERS
    {
        //游戏启动，触发StartUpCommand
        START_UP:'START_UP',

        //资源加载,触发LoadCommand
        LOAD:'Load',

        //场景切换,触发GoSceneCommand
        GO_SCENE: 'CommandType_GOScene',

        //升级命令,触发LevelUpCommand
        LEVEL_UP:'CommandType_LevelUp',

        //消除冷却时间
        CLEAR_INDICATE_TIME:'ClearIndicateTimeCommand'
    }
)

