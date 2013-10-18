/**
 * User: zhoufei
 * Org: Efun
 * Date: 13-5-22
 * Time: 下午3:51
 * Class:
 */
puremvc.define(
    //CLASS INFO
    {
        name:'puremvc.AsyncMacroCommand',
        parent:puremvc.MacroCommand,

        /**
         * @Constructor
         */
        constructor:function(){
            puremvc.MacroCommand.call(this);
        }
    },
    //INSTANCE MEMBERS
    {
        subCommands:null,

        /**@Override**/
        initializeMacroCommand:function () {
        },

        /**@Override**/
        addSubCommand:function(func){
            this.subCommands.push(func);
        },

        commandComplete:function(){
        },

        execute:function (note) {
            this.note = note;
            this.nextCommand();
        },

        nextCommand:function(){
            if(this.subCommands.length>0){
                var classRef=this.subCommands.shift();
                var commandInstance=new classRef();
                commandInstance.macroCommand=this;
                commandInstance.initializeNotifier(this.multitonKey);
                commandInstance.execute(this.note);
            }
            else{
                this.commandComplete();
            }

        }
    }
)
