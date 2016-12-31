/**
 * Created by zhaoangyouyou on 28/12/2016.
 */



$(document).ready(function() {

    var tabContent = $('.tabs-vertical');

    var tabs = tabContent.find('ul a'),
        content = tabContent.find('.tabs-content-placeholder > section');

    showRoute();


    tabs.on('click', function (e) {
        e.preventDefault();

        // Get the data-index attribute, and show the matching content div

        var index = $(this).data('index');

        tabs.removeClass('tab-active');
        content.removeClass('tab-content-active');

        $(this).addClass('tab-active');
        content.eq(index).addClass('tab-content-active'); //获取点击的tab的jquey元素


    });

    /*初始化个人信息*/
    document.getElementById("usernamesignup").value = "zayy";

    document.getElementById("passwordsignup").value = "1234";

    document.getElementById("emailsignup").value = "8070@qq.com";

    document.getElementById("telesignup").value = "1234";

    /*初始个人中心*/



});
function settingCheck() {

    var name = document.getElementById("usernamesignup").value;
    document.getElementById("usernameSignup-info").innerHTML = "";
    var password = document.getElementById("passwordsignup").value;
    document.getElementById("passwordSignup-info").innerHTML = "";
    var repassword = document.getElementById("passwordsignup_confirm").value;
    document.getElementById("repasswordinfo").innerHTML = "";
    var email= document.getElementById("emailsignup").value;
    document.getElementById("emailinfo").innerHTML = "";
    var telephone = document.getElementById("telesignup").value;
    document.getElementById("teleinfo").innerHTML = "";

    if(name == "") {
        document.getElementById("usernameSignup-info").innerHTML = "用户名不能为空";
        $("#usernameSignup-info").css({"color":"red","font-size":"80%"});
        return false;
    }
    if(email == "") {
        document.getElementById("emailinfo").innerHTML = "邮箱不能为空";
        $("#emailinfo").css({"color":"red","font-size":"80%"});
        return false;
    }
    if(email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        document.getElementById("emailinfo").innerHTML = "请输入有效邮箱";
        $("#emailinfo").css({"color":"red","font-size":"80%"});
        return false;
    }
    if(telephone == "" || telephone.length != 11 || isNaN(telephone)) {
        document.getElementById("teleinfo").innerHTML = "请输入有效手机号码";
        $("#teleinfo").css({"color":"red","font-size":"80%"});
        return false;
    }
    if(password == "") {
        document.getElementById("passwordSignup-info").innerHTML = "密码不能为空";
        $("#passwordSignup-info").css({"color":"red","font-size":"80%"});
        return false;
    }
    if(password.length < 6) {
        document.getElementById("passwordSignup-info").innerHTML = "密码长度必须大于或者等于6";
        $("#passwordSignup-info").css({"color":"red","font-size":"80%"});
        return false;
    }

    if(repassword != password) {
        document.getElementById("repasswordinfo").innerHTML = "两次输入的密码不一致";
        $("#repasswordinfo").css({"color":"red","font-size":"80%"});
        return false;
    }
}

function showRoute(){
    var new_h1 = document.createElement("h1");
    new_h1.innerHTML = "我创建的所有路线";
    document.getElementById("getRoute").appendChild(new_h1);

    var getRoute = false //获取路线

    if(getRoute){

    }
    else {
        var new_div = document.createElement("div");
        new_div.setAttribute("class","emptyRoute");
        document.getElementById("getRoute").appendChild(new_div);
    }

}