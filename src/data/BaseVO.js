/**
 * User: zhoufei
 * Org: Efun
 * Date: 13-6-19
 * Time: 上午11:37
 * Class: VO父类
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.data.BaseVO'
    },
    //INSTANCE MEMBERS
    {
        /**
         * 快速更新VO数据
         * @param data
         */
        update:function(data){
            for(var p in data){
                if(data[p]!=null){
                    this[p]=data[p];
                }
            }
        }
    }
)
