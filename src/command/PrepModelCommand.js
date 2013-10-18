/**
 * User: zhoufei
 * Org: Efun
 * Date: 13-5-20
 * Time: 下午2:44
 * Class: 注册Proxy
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.command.PrepModelCommand',
        parent:puremvc.SimpleCommand
    },
    //INSTANCE MEMBERS
    {
        /**@Override**/
        execute:function(note){
            console.log("PrepModelCommand execute!");
        }
    }
)
