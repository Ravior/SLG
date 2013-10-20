/**
 * User: zhoufei
 * Date: 13-5-23
 * Time: 下午4:20
 * Class: 显示场景（场景转换）命令
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.command.GoSceneCommand',
        parent:puremvc.SimpleCommand
    },
    //INSTANCE MEMBERS
    { /** @override */
    execute:function (note) {
        var list = [];
        var mediator = note.getBody();
        var data;
        var descript = "加载资源文件…";
        var proxy;
        this.typeName = null;
        switch(mediator){
            //主场景
            case app.mediator.scene.HomeMediator:
                break;
        }

        if(list.length > 0){
            var handler = ClassUtils.delegate(this, this.onComplete, mediator, data);
            //{value:"加载的内容数组", hide:true, callback:回调方法, descript:'描述文字'}
            this.sendNotification(app.command.CommandType.LOAD, {value:list, callback:handler, descript:descript});
        }else{
            this.onComplete(mediator, data);
        }
    },

        onComplete:function(mediator, data){
            var prevMediator = this.facade.retrieveProxy(app.proxy.GameInfoProxy.NAME).sceneMediator;
            if(prevMediator != null){
                //清除前一场景内容
                this.sendNotification(prevMediator.CLOSE);
                //记录前一场景
                this.facade.retrieveProxy(app.proxy.GameInfoProxy.NAME).prevMediator = prevMediator;
            }

            //记录当前场景名称
            this.facade.retrieveProxy(app.proxy.GameInfoProxy.NAME).sceneMediator = mediator;

            this.sendNotification(mediator.SHOW, data);
        }
    }
)
