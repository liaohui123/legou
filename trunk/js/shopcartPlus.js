/*购物车JS文件
 */
$(function(){
    //把三个类型的input分别获取
    var $theadInput=$('thead input[type=checkbox]');  //表头中的全选
    var $tbodyInputs=$('tbody input[type=checkbox]'); //表格中的选择框
    var $totalPriceInput=$('.totalPrice input[type=checkbox]');
    /*全选 */
    //表头全选
    $theadInput.change(function(){
        var checkState=$(this).prop('checked');
        $tbodyInputs.prop('checked',checkState);
        $totalPriceInput.prop('checked',checkState);

        allTotal();
    });

   //计算总价的全选
   $totalPriceInput.change(function(){
       var checkState=$(this).prop('checked');
       $theadInput.prop('checked',checkState);
       $tbodyInputs.prop('checked',checkState);

       allTotal();
   })

   /*表格中的选择框反过来影响两个全选框 */
   $tbodyInputs.change(function(){
       var flag=true;
       $tbodyInputs.each(function(index,input){
           var checkState=$(this).prop('checked');
           if(checkState===false){
               flag=false;
           }

       })
       $theadInput.prop('checked',flag);
       $totalPriceInput.prop('checked',flag);

       allTotal();
   })

   /*加法功能*/
   $('.add').click(function(){
       var count=parseInt($(this).next().val());
       count++;
       $(this).next().val(count);

       //小计
       subTotal($(this),count);

       allTotal();
   })

   /*减法功能*/
   $('.reduce').click(function(){
    var count=parseInt($(this).prev().val());
    count--;
    count=count<1?1:count;
    $(this).prev().val(count);

     //小计
     subTotal($(this),count);

     allTotal();
}) 

/*封装一个小计功能 加减时需要调用*/
function subTotal(dom,count){
    //找到单价
    var singlePrice=parseFloat(dom.closest('tr').find('.price').text());
    var subTotalPrice=singlePrice*count;
    dom.closest('tr').find('.subprice').text(subTotalPrice.toFixed(2));
}

/*总计功能实现 （头部全选 尾部全选 表格选择框 加减 删除）*/
function allTotal(){
    var allPrice=0;
    var selectedCount=0;
    $('tbody input[type=checkbox]').each(function(){
        var checkState=$(this).prop('checked');
        if(checkState){
            allPrice+=parseFloat($(this).closest('tr').find('.subprice').text());
            selectedCount++;
        }
    })
     //渲染
     $('.total').text(allPrice.toFixed(2));
     $('.count').text(selectedCount);
}

/*关于下面的删除功能 模拟 */
//删除
$('.del').click(function(){
    $(this).closest('tr').remove()
    getGoodsCount();  //重新计算商品数量
    allTotal();  //重新计算价格
})

//删除选中
$('.deleteChecked').click(function(){
    $('tbody input[type=checkbox]').each(function(){
        var checkState=$(this).prop('checked');
        if(checkState){
            $(this).closest('tr').remove();
        }
    }) 
    getGoodsCount();  //重新计算商品数量
    allTotal();  //重新计算价格
})

//封装一个获取全部商品的函数
function getGoodsCount(){
    //获取数量
    var goodsCount=$('table tbody tr').length;
    $('.goodsCount').text(goodsCount);
}
getGoodsCount();  //页面加载调用一次

})
