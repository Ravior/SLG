/**
 * User: zhoufei
 * Org: Efun
 * Date: 13-5-20
 * Time: 下午2:48
 * Class:注册Mediator
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.command.PrepViewCommand',
        parent:puremvc.SimpleCommand
    },
    //INSTANCE MEMBERS
    {
        /**@Override**/
        execute:function(note){
            console.log("PrepViewCommand execute!");
            //主场景
            this.facade.registerMediator(new app.mediator.scene.HomeMediator());
            //统一升级面板
            this.facade.registerMediator(new app.mediator.building.LevelUpMediator());

        }
    }
)
