/**
 * User: zhoufei
 * Date: 13-10-17
 * Time: 下午7:49
 * Dec:全局Facade
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.GameFacade',
        parent:puremvc.Facade
    },
    //INSTANCE MEMBERS
    {
        startup:function(){
            if(!this.initialized){
                this.initialized=true;
                console.log("GameFacade StartUp");
                //DataService单例类facade属性值
                //app.proxy.DataService.getInstance().facade = this;
                this.registerCommand(app.command.CommandType.START_UP,app.command.StartUpCommand);
                this.sendNotification(app.command.CommandType.START_UP);
            }
        }
    },
    //STATIC MEMBERS
    {
        /**
         * Retrieve an instance of  ApplicationFacade, If one has not yet been instantiated,one will be created for you
         * @static
         * @param {string} multitonkey
         * @returns  ApplicationFacade
         */
        getInstance:function(multitonkey){
            var instanceMap=puremvc.Facade.instanceMap;
            //read from the instanceMap
            instance=instanceMap[multitonkey];
            //if there is an instance,return it
            if(instance){
                return instance;
            }
            //otherwise create a new instance and create it on Facade.instanceMap
            return instanceMap[multitonkey]=new app.GameFacade(multitonkey);
        },

        /**
         * @static
         * @type {string}
         */
        NAME:'GameFacade'
    }
)
