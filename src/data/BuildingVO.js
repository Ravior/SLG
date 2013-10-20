/**
 * User: zhoufei
 * Date: 13-6-19
 * Time: 上午11:42
 * Class: 建筑物数据VO
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.data.BuildingVO',
        parent:app.data.BaseVO
    },
    //INSTANCE MEMBERS
    {
        //建筑物id
        id:0,

        //建筑物级别
        level:1,

        //升级所需银币
        needMoney:0,

        //所需冷冻时间
        needTime:null
    }
)
