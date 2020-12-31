/*返回顶部功能函数封装*/

//当页面加载完成
$(function(){
    //把函数挂在window上暴露出去
     window.gotoTop =function(options){
        var $gotoTopHtml= $(`<div class="backToTop"><img src="${options.imgUrl}"></div>`);

        //写样式定位
        $gotoTopHtml.css({
            width: '30px',
            height: '50px',
            position: 'fixed',
            bottom: '100px',
            left:'610px',
            marginLeft: '50%',
            /*默认隐藏*/
            display: 'none',
        });

        //返回顶部js代码
        $(document).scroll(function(){
            var topDistance=$('html,body').scrollTop();
            if(topDistance>500){
                $('.backToTop').fadeIn();
            }else{
                $('.backToTop').fadeOut();
            }
        })
        $('body').on('click','.backToTop',function(){
            $('html,body').animate({
                scrollTop:0
            },300)
        })
        //追加到页面尾部
       $('body').append($gotoTopHtml)
    }
    //准备结构
    
})