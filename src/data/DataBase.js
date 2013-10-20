/**
 * User: zhoufei
 * Date: 13-6-20
 * Time: 下午4:47
 * Class:  配置文件数据解析
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.data.DataBase'
    },
    //INSTANCE MEMBERS
    {
        data:null,
        //赋值
        setData:function (value) {
            this.data = value;
        },
        /**
         * 根据id获取建筑配置信息
         * @param id
         * @returns {*}
         */
        getBuildingConf:function(id){
            var buildingConf=this.data["SysConfBuilding"];
            for(var p in buildingConf) {
                if(buildingConf[p].id==id){
                    return buildingConf[p];
                }
            }
            return null;
        }
    },
    //STATIC MEMBERS
    {
        _instance:null,

        getInstance:function () {
            var self = app.data.DataBase;
            if (self._instance == null)self._instance = new self();
            return self._instance;
        }
    }
)
