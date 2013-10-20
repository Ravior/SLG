/**
 * 游戏基本信息Proxy【当前游戏场景名称，季节......】
 *@author zhoufei
 * @author Copyright(c) 2012-2013 Cn5r, Inc., Some rights reserved.
 * @class GameInfoProxy
 * @extends app.proxy.BaseDataProxy
 * @time 2012-3-9 10:00
 */
puremvc.define
    (
        // CLASS INFO
        {
            name:'app.proxy.GameInfoProxy',
            parent:app.proxy.BaseDataProxy
        },

        // INSTANCE MEMBERS
        {
            //当前场景名称
            sceneMediatorName:"",

            /**
             * 游戏服务器信息更新
             * override
             * @param data
             */
            onUpdate:function(data){
               // var proxy = this.facade.retrieveProxy(app.proxy.ChatProxy.NAME);
                for (var i = 0; i < data.length; i++) {
                    this.setData(data[i]);
//                    if (data[i].time != null) {
//                        proxy.time = data[i].time;
//                    }
                }
               // this.sendNotification(app.proxy.GameInfoProxy.CHANGED);
            },

            /**
             * override
             * @param d
             */
            setData:function(d){
                if(!this.data){
                    this.data = new app.data.GameVO();
                }
                //更新信息
                if(d['year']) this.data['year'] = d['year'];
                if(d['season']) this.data['season'] = d['season'];
                if(d['warTokenCost']) this.data['warTokenCost'] = d['warTokenCost'];
                if(d['time']) this.data['time'] = d['time'];
                if(d['notice']) this.data['notice'] = d['notice'];
            },

            getSeasonDesc:function(){
                var desc = ['现在是#年春季，春季军令恢复+1。',
                            '现在是#年夏季，最大可征收的次数+3',
                            '现在是#年秋季，农田产量增加20%',
                            '现在是#年冬季，禁止任何形式的玩家对战'];

                return desc[this.data['season']-1].replace('#', this.data['year']);
            }
        },

        // CLASS MEMBERS	
        {
            /**
             * The proxy's name.
             *
             * @static
             * @type {string}
             */
            NAME:'GameInfoProxy',

            /**
             * All notification
             */
            CHANGED: 'GameInfoProxy_Changed'

        }
    );