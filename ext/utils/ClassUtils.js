/**
 * User: zhoufei
 * Date: 13-5-22
 * Time: 下午5:37
 * Class:基本组件，实现js类继承，作用域代理等功能
 */
(function(window){
    var ClassUtils={
        version:1.0
    };

    /**
     *类的继承
     */
    var emptyClass=function(){};
    ClassUtils['extends']=function(childClass,parentClass){
          emptyClass.prototype=parentClass.prototype;
          childClass['super']=parentClass.prototype;
          childClass.prototype=new emptyClass();
          childClass.prototype.constructor=childClass;
    }

    /**
     * 委托
     * @param self  要执行func函数的作用域
     * @param func
     * @returns {Function}
     */
    ClassUtils['delegate']=function(self,func){
        if(arguments.length>2){
            var args=Array.prototype.slice.call(arguments,2);
            return function(){
                var newArgs=[];
                for(var i=0;i<arguments.length;i++){
                    newArgs.push(arguments[i]);
                }
                newArgs=newArgs.concat(args);
                return func.apply(self,newArgs);
            }
        }
        else{
            return function(){ return func.apply(self,arguments);}
        }
    }
    window.ClassUtils=ClassUtils;
}(window))

