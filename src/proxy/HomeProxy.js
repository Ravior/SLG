/**
 * User: zhoufei
 * Date: 13-6-20
 * Time: 下午7:06
 * Class: 主场景proxy
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.proxy.HomeProxy',
        parent:app.proxy.BaseDataProxy
    },
    //INSTANCE MEMBERS
    {
        /**
         * 加载完init.json初始化数据 【LoadInitDataCommand执行完】
         */
        init:function(){
            //主场景建筑配置数据（HomeBuildingData.js）
            var data = app.data.HomeBuildingData;
            var arr = data.Building;
            var re = [];
            var o;
            //建筑数据
            var proxy = this.facade.retrieveProxy(app.proxy.LevelUpProxy.NAME);
            //显示在主场景中的建筑物数目
            var len = arr.length;
            for(var i = 0; i < len; i++){
                o = cloneObj(arr[i]);
                o['name']=Language.HomeBuildingData[i].name;
                o['src'] = data.Path+toFix(arr[i]['id'], 2) + '.png';
                o['visible'] = (proxy.getBuildInfo(arr[i]['id']) != null);
                o['descript']=Language.HomeBuildingData[i].descript;
                re.push(o);
            }
            this.setData(re);
        },

        /**
         * 根据id得到建筑物数据
         * @param id    建筑物的id
         * @return      建筑物的信息(配置信息)
         * {
         *     id:1010,
         *     name:''主城堡'，
         *     x:100,
         *     y:100,
         *     src:"imgaes/build_1.jpg",
         *     visible:true,
         *     descript:'建筑描述' ,
         *      buttons:[]
         * }
         */
        getBuildingInfo:function(id){
            var len = this.data.length;
            for (var i = 0; i < len; i++) {
                if (this.data[i]['id'] == id) {
                    return this.data[i];
                }
            }
            return null;
        },

        /**
         * 建筑升级显示新的建筑，会把之前设置为visible=false的建筑数据修改为visible=true
         * @param id :建筑id
         * @returns {*}
         */
        addBuilding:function(id){
            var len = this.data.length;
            var _data=app.data.HomeBuildingData;
            for (var i = 0; i < len; i++) {
                if (this.data[i]['id'] == id) {
                    this.data[i]['visible'] = true;
                    return this.data[i];
                }
            }
            return null;
        },

        /**
         * 获得主场景背景图
         */
        getHomeMapInfo:function(){
            return {id:'homeBg', src:app.GameData.imageSrc + 'scene/home.gif'};
        }


    },
    //STATIC MEMBERS
    {
        /**
         * The proxy's name.
         *
         * @static
         * @type {string}
         */
        NAME:'HomeProxy'
    }
)
