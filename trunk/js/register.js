//注册功能模块
$(function(){
   //调用
  $('#registerForm').validate({
    //验证规则  
    rules:{
        //用户名
        username:{
           required:true,
           rangelength:[3,6]  
        },
        password:{
            required:true,
            isPassword:true
        },
        checkPassword:{
            required:true,
            equalTo:"#password"

        },
        tel:{
            required:true,
            isTel:true 
        }

       

      },
      //提示信息
      messages:{
          //用户名
        username:{
            required:'用户名不能为空',
            rangelength:'长度在三到六位' 
         },
         //密码
         password:{
            required:'密码不能为空',
            isPassword:"输入5-10个以字母开头，可带数字、‘_’、‘.’的字符串"
        },
        checkPassword:{
            required:'请再次输入密码',
            equalTo:'两次密码不一致'
        },
        tel:{
            required:'电话不能为空',
            isTel:'电话号码格式不正确'
        }

      }
  }) 
  //密码正则验证
  jQuery.validator.addMethod("isPassword",function(value,element){
      var pwdReg=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,9}$/;
      return this.optional(element)||(pwdReg.test(value));
  });
//电话正则验证
jQuery.validator.addMethod("isTel",function(value,element){
    var telReg=/^[1]+[3,8，5,7]+\d{9}$/;
    return this.optional(element)||(telReg.test(value));
});
})