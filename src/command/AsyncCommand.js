/**
 * User: zhoufei
 * Org: Efun
 * Date: 13-5-22
 * Time: 下午3:59
 * Class:
 */
puremvc.define(
    //CLASS INFO
    {
        name:'puremvc.AsyncCommand',
        parent:puremvc.SimpleCommand
    },
    //INSTANCE MEMBERS
    {
        macroCommand:null,

        commandComplete:function(){
                this.macroCommand.nextCommand();
        }
    }
)
