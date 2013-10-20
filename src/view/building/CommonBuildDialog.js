/**
 * User: zhoufei
 * Date: 13-6-25
 * Time: 上午11:15
 * Class: 点击建筑物后出现的小面板，包括升级及各部分的功能按钮
 */
puremvc.define(
    //CLASS INFO
    {
        name:'app.view.building.CommonBuildDialog',
        parent:app.view.base.BaseUIForm,
        /** @constructor */
        constructor:function () {
            var view=this.drawUI();
            app.view.base.BaseUIForm.call(this, view, true);
        }
    },
    //INSTANCE MEMBERS
    {
        drawUI:function(){
            this.scene=new createjs.Container();
            //设置view的长宽
            this.scene.width=app.GameData.gameWidth;
            this.scene.height=app.GameData.gameHeight;

            var me=this;
            var res= app.GameData.GameResource;


            var title=new createjs.Container();
            //建筑名背景图片
            var dlg_title=new createjs.Bitmap(res.getContent('dlg_title'));
            //建筑名称
            this.dlg_name=new createjs.Text("title");
            this.dlg_name.font="12px";
            this.dlg_name.color="#eaca67";
            //设置锚点
            this.dlg_name.textBaseline = 'middle';
            this.dlg_name.textAlign = 'center';
            //设置文字阴影
            this.dlg_name.shadow=new createjs.Shadow("#000000", 1, 1, 1);
            this.dlg_name.x=dlg_title.image.width/2;
            this.dlg_name.y=dlg_title.image.height/2;
            title.addChild(dlg_title,this.dlg_name);

            //底部大背景图
            var popupbg=new createjs.Bitmap(res.getContent('popupbg'));
            popupbg.x=0;
            popupbg.y=33;

            var contentBg_1=app.view.ViewUtils.createContentBox(178,198);
            contentBg_1.x=21;
            contentBg_1.y=49;


            //窗口关闭按钮
            var close = function (e) {
                me.dispatchEvent({type:app.view.building.CommonBuildDialog.CLOSE});
            };
            var closeBtn = new createjs.Bitmap(res.getContent('tab_close'));
            closeBtn.addEventListener("click", close);
            closeBtn.x=this.scene.width-closeBtn.image.width;

            //建筑图片
            this.buildImg=new createjs.Bitmap();

            //花费银币
            var moneyLabelPre=new createjs.Text(Language.CommonBuildDialog.lang_1, "12px Arial", "#dfd9c2");
            moneyLabelPre.x=35;
            moneyLabelPre.y=180;
            this.moneyLabel=new createjs.Text("", "12px Arial", "#dfd9c2");
            this.moneyLabel.x=95;
            this.moneyLabel.y=180;
            var timeLabelPre=new createjs.Text(Language.CommonBuildDialog.lang_2, "12px Arial", "#dfd9c2");
            timeLabelPre.x=35;
            timeLabelPre.y=198;
            this.timeLabel=new createjs.Text("", "12px Arial", "#00fdfb");
            this.timeLabel.x=95;
            this.timeLabel.y=198;

            this.scene.addChild(title,popupbg,closeBtn,contentBg_1,this.buildImg,moneyLabelPre,timeLabelPre);
            this.scene.addChild(this.moneyLabel,this.timeLabel);
            return this.scene;
        },

        updateBuildInfo:function (vo) {
            console.log(this.data);
            console.log(vo);
            var me=this;

            this.dlg_name.text=this.data.name;
            this.buildImg.image=app.GameData.GameResource.getContent(this.data["id"]);
            var n=this.buildImg.image.width>166? 166/this.buildImg.image.width:1;
            this.buildImg.scaleX=this.buildImg.scaleY=n;

            this.buildImg.x=31+(166 - this.buildImg.image.width*n) * 0.5;
            this.buildImg.y=61+(90-this.buildImg.image.height*n)*0.5;

            this.moneyLabel.text=vo.needMoney;
            this.timeLabel.text=app.data.TimeVO.formatTime(vo['needTime'] * 1000);

        }


    },
    //STATIC MEMBERS
    {
        //升级
        LEVEL_UP:'Build_LevelUp',

        //关闭面板
        CLOSE:'Build_Close',

        //按钮操作
        OPERATE:'Build_Operate'
    }
)
