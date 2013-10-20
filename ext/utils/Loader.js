/**
 * User: zhoufei
 * Date: 13-5-22
 * Time: 下午4:32
 * Class: 资源加载类
 */
(function(window){
    var Loader=function(source){
        Loader['super'].constructor.call(this);
        this._loadHandler = ClassUtils.delegate(this, this._loadHandler);
        this.clear();
        this._addSource(source);
    };
    ClassUtils.extends(Loader,EventDispatcher);

    /**
     * 初始化
     */
    Loader.prototype.clear=function (){
        this.isLoading=false;
        //当前正在加载的资源索引
        this._index=-1;
        //已经加载的资源数
        this._loaded=0;
        this._resources = {};
        this._loaders = [];
    };

    /**
     * 开始顺序加载资源
     * @param source  要加载的资源，可以是一个单独的资源或者多个资源的数组
     * source: [{id:'building_tip', src:app.GameData.imageSrc+'ui/lvbg.png'}]
     */
    Loader.prototype.load=function(source){
        this._addSource(source);
        if(!this.isLoading) this._loadNext();
    };

    Loader.prototype.addSource = function (source) {
        if (!this.isLoading) this._addSource(source);
    };

    Loader.prototype._loadNext=function(){
           var me=this;
           this._index++;
           if(this._index>=this._source.length){
               this.dispatchEvent({type:"complete", target:this, data:this._resources});
               this._index=-1;
               this._source=[];
               this.isLoading=false;
               return;
           }
           var src=this._source[this._index].src;
           if(src.indexOf('.jpg')>=0||src.indexOf('.png')>=0||src.indexOf('.gif')>=0){
               if (app.GameData.GameResource == null || app.GameData.GameResource._resources[this._source[this._index].id] == null) {
                   var img = new Image();
                   img.onload =function(){
                       var evt={};
                       evt.target=img;
                       me._loadHandler(evt);
                   };
                   img.src = src;
                   this.isLoading=true;
               } else {
                   console.log("发现已存在资源:" + src + ", 跳过该文件加载");
                   this._loadNext();
               }
           }
           else if(src.indexOf('.json')>=0||src.indexOf(".zb") >= 0){
//               if(isXc) src="file://"+src;
               var ldr = Http.get(src);
               ldr.onData = function (data) {
                   var evt = {};
                   try {
                       if (src.indexOf(".json") >= 0||src.indexOf(".zb") >= 0) {
//                       if (src.indexOf(".json") >= 0&&!isXc) {
                           evt.target = JSON.parse(data);
                       } else {
                           evt.target = data;
                       }
                   } catch (e) {
                       console.log("parse json error!");
                   }
                   me._loadHandler(evt);
               };
               ldr.onError = function (status) {
                   me._loadHandler({});
               }
           }
    };

    /**
     * 加载处理器。
     * @private
     */
    Loader.prototype._loadHandler = function (e) {
        this._loaded++;
        var data = this._source[this._index];
        data.content = e.target;
        var id = data.id || data.src;
        this._resources[id] = data;
        this.dispatchEvent({type:"loaded", target:this, data:data});
        this._loadNext();
    };




    /**
     * 添加加载资源
     * @param source
     * @private
     */
    Loader.prototype._addSource=function(source){
        if(!source) return;
        source=(source instanceof Array)?source:[source];
        if(!this._source) this._source=source;
        else this._source=this._source.concat(source);

    };

    /**
     * 返回已加载资源的数目。
     */
    Loader.prototype.getLoaded = function () {
        return this._loaded;
    };

    /**
     * 返回所有资源的总数。
     */
    Loader.prototype.getTotal = function () {
        return this._source.length;
    };

    /**
     * 合并一个loader到主loader中
     * @param loader
     */
    Loader.prototype.appendResource = function (loader) {
        if (!(loader instanceof Loader)) throw new Error('只能合并Loader');
        for (var p in loader._resources) {
            this._resources[p] = loader._resources[p];
        }
    };

    /**
     * 根据id返回指定的资源
     */
    Loader.prototype.getContent = function (id) {
        var data = this.getData(id);
        return data ? data.content : null;
    };

    /**
     * 根据id返回指定的数据
     */
    Loader.prototype.getData = function (id) {
        for (var p in this._resources) {
            if (this._resources[p].id == id) return this._resources[p];
        }
        for (var i = 0; i < this._loaders.length; i++) {
            for (var t in this._loaders[i]._resources) {
                if (this._loaders[i]._resources[t].id == id) return this._loaders[i]._resources[t];
            }
        }
        return null;
    };

    window.Loader=Loader;
})(window);
