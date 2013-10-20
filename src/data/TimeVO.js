/**
 * User: zhoufei
 * Date: 13-6-8
 * Time: 下午1:35
 * Class:时间转化器
 */
puremvc.define
(
    // CLASS INFO
    {
        name:'app.data.TimeVO',

        /** @constructor */
        constructor:function (time) {
            if(time >= 0) this.setTime(time);
        }
    },

    // INSTANCE MEMBERS
    {
        /**
         * 服务器的倒计时间数值 ,秒数
         * @private
         * @type {Number}
         */
        _timeCount: 0,

        /**
         * 本地日期对象，毫秒（倒计时到期时间）
         * @private
         * @type {Number}
         */
        _time: 0,

        /**
         * 设置倒计时时间
         */
        setTime:function(t){
            this._timeCount = t;
            this._time = Date.now() + this._timeCount * 1000;
        },

        /**
         * 取得倒计时时间
         */
        getTime:function(){
            var n = this._time - Date.now();
            if(n < 0) n = 0;
            return n;
        },


        /**
         * method
         * @param {string}
         * @return {void}
         */
        toString:function () {
            return app.data.TimeVO.formatTime(this.getTime());
        }
    },

    {
        //格式化毫秒数  12:22:22
        formatTime:function(ms){
            var ss = 1000;
            var mi = ss * 60;
            var hh = mi * 60;

            var hour = Math.floor(ms / hh);
            var minute = Math.floor((ms - hour * hh) / mi);
            var second = Math.floor((ms - hour * hh - minute * mi) / ss);

            var strHour = hour < 10 ? "0" + hour : "" + hour;
            var strMinute = minute < 10 ? "0" + minute : "" + minute;
            var strSecond = second < 10 ? "0" + second : "" + second;

            return strHour + ":" + strMinute + ":" + strSecond;
        },


        formatTime2:function(ms){
            if (ms) {
                var ss = 1000;
                var mi = ss * 60;
                var hh = mi * 60;
                var dd = hh * 24;

                var day = Math.floor(ms / dd);
                var hour = Math.floor((ms - day * dd) / hh);
                var minute = Math.floor((ms - day * dd - hour * hh) / mi);
                var second = Math.floor((ms - day * dd - hour * hh - minute * mi) / ss);

                var strDay = "" + day;
                var strHour = "" + hour;
                var strMinute = "" + minute;
                var strSecond = "" + second;

                return strDay + "天" + strHour + "小时" + strMinute + "分" + strSecond + "秒";
            } else {
                return null;
            }
        }


    }
);
