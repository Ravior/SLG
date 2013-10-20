/**
 * @class
 * @implements EventListener
 */
puremvc.define
    (
        // CLASS INFO
        {
            name:'app.proxy.UserInfoProxy',
            parent:app.proxy.BaseDataProxy
        },

        // INSTANCE MEMBERS 
        {
            /**
             * 个人信息更新
             * override
             * @param data
             */
            onUpdate:function(data){
                for(var i = 0;i<data.length;i++)
                    this.setData(data[i]);
                this.sendNotification(app.proxy.UserInfoProxy.CHANGED);
            },

            /**
             * override
             * @param d
             */
            setData:function(d){
                if(!this.data){
                    this.data = new app.data.UserVO();
                }
                //更新个人信息
                this.data.update(d);
            },

            /**
             * 选择国家
             * @param counrtyId
             */
            selectCountry:function(counrtyId, complete){
                var selectComplete = function(){
                    if(complete)complete();
                };
                this.getService(app.getServiceURL() + 'chooseCountry.json', {cid:counrtyId}, "post", selectComplete);
            },

            /**
             * 购买军令
             */
            buyWarToken:function(handler){
                this.getService(app.getServiceURL() + 'buyWarToken.json', null, "post", handler);
            }
        },

        // STATIC MEMBERS	
        {
            /**
             * @static
             * @type {string}
             */
            NAME: 'UserInfoProxy',

            CHANGED:'UserInfoProxy_Changed'
        }
    );