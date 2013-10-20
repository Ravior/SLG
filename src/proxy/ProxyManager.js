/**
 * User: zhoufei
 * Date: 13-5-30
 * Time: 下午2:52
 * Class:分发数据，触发proxy update方法的proxy集合
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.proxy.ProxyManager'
    },
    //INSTANCE MEMBERS
    {
        /**
         * 自动更新的proxy
         * 增加proxy.NAME，数据可自动更新
         * {id:'game', name:app.proxy.GameInfoProxy.NAME}
         */
        proxys:[
            {id:'levelUp',name:app.proxy.LevelUpProxy.NAME},
            {id:'user', name:app.proxy.UserInfoProxy.NAME}
        ],
        getProxyName:function(id){
            var n=this.proxys.length;
            for(var i = 0;i<n;i++){
                if(this.proxys[i].id == id){
                    return this.proxys[i].name;
                }
            }
            return null;
        }
    },
    //STATIC MEMBERS
    {
        _instance:null,

        getInstance:function(){
            var self = app.proxy.ProxyManager;
            if(self._instance == null) self._instance = new self();
            return self._instance;
        }
    }
)
