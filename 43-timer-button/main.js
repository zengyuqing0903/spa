requirejs.config({
    'paths':{
        'jquery':'//apps.bdimg.com/libs/jquery/2.1.4/jquery.min'
    }
});
require(['jquery'],function($){
    $(function(){
        var $btnAdd = $('#add');

        $btnAdd.click(function(){
            require(['timer-button'],function(TimerButton){//单引号里文件名，扩展名省略；function小括号里是对象
                var tb = new TimerButton();
                tb.show({
                    num:6,
                    title:'同意',
                    onClick:function(){
                        alert('知道你会同意！');
                    }
                });
            });
        });
    });
});