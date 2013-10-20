/**
 * User: zhoufei
 * Date: 13-5-27
 * Time: 上午11:05
 * Class:  Proxy基础类，大部分数据请求Proxy继承与该类
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.proxy.BaseDataProxy',
        parent:puremvc.Proxy,

        constructor:function () {
            puremvc.Proxy.call(this);
            this.dataService = app.proxy.DataService.getInstance();
        }

    },
    //INSTANCE MEMBERS
    {
        getService:function (url, param, type, handler, hideLoading, error) {
            this.dataService.getService(url, param, type, handler, this, hideLoading, error);
        },
        /**
         * 请求完成事件,请覆盖
         */
        onComplete:function (data) {
        },


        /**
         * 错误处理，如果不需要单独做错误处理，可去掉
         * @param status
         */
        onError:function (status) {
        },

        /**
         * 注册的数据更新
         * @param data
         */
        onUpdate:function (data) {
            this.setData(data);
        }
    },
    //STATIC MEMBERS
    {
        NAME:'BaseDataProxy'
    }
)
