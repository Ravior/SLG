/**
 * User: zhoufei
 * Date: 13-6-24
 * Time: 下午3:50
 * Class:用户信息
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.data.UserVO',
        parent:app.data.BaseVO
    },
    //INSTANCE MEMBERS
    {
        //人物ID
        roleId:0,

        //武将id
        heroId:0,

        //姓名
        name:'',

        //银币
        silverCoin:0,

        //最大银币上限
        maxSilverCoin:0,

        //金币
        goldCoin:0,

        //粮食
        grain:0,

        //粮食上限
        maxGrain:0,

        //战功
        feat:0,

        //兵力
        troop:0,

        //最大兵力
        maxTroop:0,

        //威望
        prestige:0,

        //VIP等级
        vip:0,

        //军令数量
        warToken:0,

        //军令上限
        maxWarToken:0,

        //军团战免费令数量
        //armyToken:0,

        //占矿免费令数量
        //mineToken:0,

        //占田免费令数量
        //fieldToken:0,

        //征服免费令数量
        //conquerToken:0,

        //攻击敌国免费令数量
        //attackToken:0,

        //刷副本免费令数量
        //stageToken:0,

        //所处城市id
        cityId:0,

        //国家(1中立 2,3,4三个国家, -1表示当前处在选择三个国家的状态)
        country:1,

        //所在的军团id
        armyGroup:0,

        //强攻所需金币
        forceGolden:0,

        //掠夺冷却队列
        stealIndicate:null ,

        //是否还能购买军令   true可买，false不可买
        canBuyWarToken:true,
        //是否显示挑战
        hasChallenge:false,
        //是否显示世界
        hasWorld:false
    }
)
