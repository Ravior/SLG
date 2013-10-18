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
        }
    }
)
