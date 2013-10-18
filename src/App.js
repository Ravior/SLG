/**
 * User: zhoufei
 * Date: 13-5-20
 * Time: 上午11:39
 * Class: 游戏全局配置参数
 */
window.app={
    GameData:{
        /** 服务器地址 */
        url:'data/',

        /***玩家服务器组号***/
        serverId:1,

        /***玩家uid编号****/
        uid:1,

        /** 图片root */
        imageSrc:'images/',

        /***游戏场景宽度**/
        gameWidth:480,

        /***游戏场景高度**/
        gameHeight:268,

        /** 底层Canvas*/
        bottomCanvas:null,

        /** 中间层Canvas*/
        middleCanvas:null,

        /**顶层Canvas*/
        topCanvas:null,

        /** 底层stage */
        bottomStage:null,

        /**中间层stage**/
        middleStage:null,

        /**顶层stage**/
        topStage:null,

        /** 游戏资源(加载后缓存的资源) */
        GameResource:null,

        /**游戏字体设置**/
        canvasText:null

    },
    getServiceURL:function(){
        if(location.href.indexOf("http://localhost") >= 0 ||  location.href.indexOf("http://172.16.50.16/") >= 0){
            return DEBUG_URL;
        }else{
            return app.GameData.url;
        }
    }
}
