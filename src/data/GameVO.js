/**
 * 游戏相关信息
 * @class
 */
puremvc.define
    (
        // CLASS INFO
        {
            name:'app.data.GameVO',
            parent:app.data.BaseVO
        },

        // INSTANCE MEMBERS 
        {
            //年代
            year:180,

            //季节(春1夏2秋3冬4)
            season:0,

            //购买军令花费
            warTokenCost:0,

            //系统当前时间
            time:0,

            //聊天系统公告
            notice:null
        }
    );