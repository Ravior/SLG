/**
 * User: zhoufei
 * Date: 13-10-17
 * Time: 下午3:12
 * Dec:Http通信类
 */

(function(){
    var Http={};
    /**
     * @param method Get/Post
     * @param url
     * @param data
     * @returns {XMLHttpRequest}
     */
    Http.ajax=function(method,url,data){
        var data=data || null;
        var request=new XMLHttpRequest();
        request.onreadystatechange=function(){
            /*
             readyState
             0 为初始化——open函数还没调用。
             1 正在加载——open函数已调用，但send函数没有调用。
             2 已加载  ——send函数已调用。
             3 正在交互——服务器正在发送响应。
             4 完成    ——服务器完成发送响应。
             status
             404:“Not Found”
             403:“Forbidden”
             500:“Internal Server Error”
             200:“OK”这个最常用
             304:“Not Modified”   opera浏览器有时返回304
             */
            if(request.readyState==4){
                if(request.status==200||request.status==304){
                    if(request.onData) request.onData(request.responseText);
                }
                else{
                    if(request.onError) request.onError(request.status);
                }
            }
        }
        request.open(method,url,true);
        if (data instanceof Object) {
            data = JSON.stringify(data);
            request.setRequestHeader('Content-Type', 'application/json');
        }
        request.send(data);
        return request;
    };

    /**
     * Send data via  GET  Request
     * @param url
     * @returns {XMLHttpRequest}
     */
    Http.get=function(url){
        return Http.ajax('get',url);
    };

    /**
     * Send data via POST Request
     * @param url
     * @param data
     * @returns {XMLHttpRequest}
     */
    Http.post=function(url,data){
        return Http.ajax('post',url,data);
    };
    window.Http=Http;
})()


