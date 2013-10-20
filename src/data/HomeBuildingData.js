/**
 * 主城配置数据
 * @class
 * @implements EventListener
 */
puremvc.define
    (
        // CLASS INFO
        {
            name:'app.data.HomeBuildingData'
        },

        // INSTANCE MEMBERS
        {
        },

        // STATIC MEMBERS
        {
            /** 建筑物id ***/
            //大厅
            HALL:1,
            //民居1
            FOLK_HOUSE:2,
            //市场
            MARKET:3,
            //枢密院
            STRATEGY:4,
            //校场
            DRILL_GROUND:5,
            //守城
            SMALL_GAME:6,
            //军团
            ARMYGROUP:7,
            //户部
            HuBu:8,

            //'0官职', '1属臣''2巡查''3兵器铺', '4粮食买卖', '5委派'6'科技', 7'阵法','8通商''9训练', '10招募', 11'征兵'12守城13军团'14征收', 15'收获', '16生产'17礼包18主线任务	19活跃奖励  20每日任务 21周活动
            //22征战23武将 24 装备25强化26阵型27地区28 资源  29成就	30排行	31帮助
            limit:[10, 25, 45, 2, 15, 35, 8, 8, 40, 1, 1, 15, 30, 10, 10, 15, 40, 2, 2, 15, 30, 35, 2, 2, 2, 2, 2, 10, 20, 10, 20, 2],

            //通商等级出现限制
            tradeLimit:[40],

            Building:[
                //主城
                {id:1,  x:470, y:50},
                //民居
                {id:2,  x:359, y:134},
                //市场
                {id:3, x:454, y:178},
                //策略府
                {id:4, x:276, y:60},
                //校场
                {id:5, x:333, y:281},
                //守城
                {id:6, x:158, y:283},
                //军团
                {id:7, x:174, y:189},
                //户部
                {id:8, x:562, y:224}
            ],

            Path:app.GameData.imageSrc + 'building/build'
        }
    );