/**
 * User: zhoufei
 * Date: 13-5-27
 * Time: 上午11:07
 * Class: 数据服务类（单例）
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.proxy.DataService'
    },
    //INSTANCE MEMBERS
    {
        facade:null,

        getService:function(url,parm,type,handler,target,hideLoading,error){
            var request;
            if(type=="get"){
                url+="?";
                if(parm){
                    var p="";
                    for(var t in parm) p+=t+"="+parm[t]+"&";
                    url+=p;
                }
                url+="r="+Date.now();
                url=this.appendUrlParm(url);
                request=Http.get(url)
            }
            else{
                url+="?r="+Date.now();
                url=this.appendUrlParm(url);
                request=Http.post(url,parm);
            }
            request.onData=ClassUtils.delegate(this,this.onComplete,handler,target);
        } ,

        appendUrlParm:function(url){
            //开发模式
            if(devModel){
                url+="&serverId="+app.GameData.serverId;
                url+="&uid="+app.GameData.uid;
            }
            else{
                url+="&serverId="+app.GameData.serverId;
            }
            return url;
        },

        onComplete:function(result,handler,target){
            var data;
            try {
                data = JSON.parse(result);
            } catch (e) {
                var str = result.split('\n');
                alert("error:"+str[0]);
                return;
            }
            //分发数据
            for (var p in data.result) {
                if (p != "main") {
                    var name;
                    name = app.proxy.ProxyManager.getInstance().getProxyName(p);
                    if (name != null) {
                        this.facade.retrieveProxy(name).onUpdate(data.result[p]);
                    }
                }
            }

            //可控错误的统一处理
            if(data.result['error']){
                var err = data.result['error'][0];
                err = err['msg'].split('\n')[0];
                app.view.Alert.show(err);
                if(target.onError!=null) target.onError(err);
                return;
            }

            //主数据
            if (handler != null) {
                //执行handler回调方法
                handler.call(target, data.result['main']);
            } else if (target.onComplete != null) {
                //执行缺省的回调方法
                target.onComplete.call(target, data.result['main']);
            }
        } ,

        /**
         * 数据通信错误统一处理函数
         * @param status
         * @param handler
         * @param target
         */
        onError:function (status, handler, target) {
            //统一处理流程
            console.log('网络连接中断，请重新刷新游戏！');
            //触发指定对象的错误事件
            if (target.onError) target.onError.call(target, status);
            if(this.error) {
                if (target.onComplete != null) {
                    //执行缺省的回调方法
                    target.onComplete.call(target, null);
                }
            }
        }
    },
    //STATIC MEMBERS
    {
        _instance:null,

        /**
         * 获取DataService单例
         * @returns {*}
         */
        getInstance:function () {
            var self = app.proxy.DataService;
            if (self._instance == null)self._instance = new app.proxy.DataService();
            return self._instance;
        }
    }
)
