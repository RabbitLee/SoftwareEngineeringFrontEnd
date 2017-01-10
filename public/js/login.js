/**
 * Created by zhaoangyouyou on 26/12/2016.
 */

/*woc 不能用jquery验证为什么？？？？？好多bug为什么*/
function check() {
    var password = document.getElementById("password").value;
    var name = document.getElementById("username").value;
    document.getElementById("passwordinfo").innerHTML = "";
    document.getElementById("usernameinfo").innerHTML = "";

    if(name == "") {
        document.getElementById("usernameinfo").innerHTML = "用户名不能为空";
        $("#usernameinfo").css({"color":"red","font-size":"80%"});
        return false;
    }
    if(password == "") {
        document.getElementById("passwordinfo").innerHTML = "密码不能为空";
        $("#passwordinfo").css({"color":"red","font-size":"80%"});
        return false;
    }


    $.ajax({
        url: '/login/isUserValid',
        data: {
            "name": name,
            "password": password,
        },
        type: 'post',
        async: false, //同步
        dataType: 'json',
        success: function (data) {
            isValid = data.isValid;
        },
        error: function () {
            alert("连接服务器验证失败！");
        }
    });
    if(!isValid){
        document.getElementById("signIninfo").innerHTML = "用户名与密码不匹配";
        $("#signIninfo").css({"color":"red","font-size":"80%"});
        return isValid;
    }

}

function signUpCheck() {

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

    //验证手机号或邮箱是否已存在
    var isValid = false;
    $.ajax({
        url: '/register/isUserValid',
        data: {
            "name": name,
            "email": email,
            "telephone": telephone,
            "password": password,
        },
        type: 'post',
        async: false, //同步
        dataType: 'json',
        success: function (data) {
            isValid = data.isValid;
        },
        error: function () {
            alert("连接服务器验证失败！");
        }
    });
    if(!isValid){
        return isValid;
    }
}
function checkEmail() {  //校验Email
    var email= document.getElementById("emailsignup").value;
    document.getElementById("emailinfo").innerHTML = "";
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

}

function checkPassword() {  //校验密码
    var password = document.getElementById("passwordsignup").value;
    document.getElementById("passwordSignup-info").innerHTML = "";
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
}

function checkRepassword() { //校验重新输入的密码
    var repassword = document.getElementById("passwordsignup_confirm").value;
    document.getElementById("repasswordinfo").innerHTML = "";
    var password = document.getElementById("passwordsignup").value;
    if(repassword != password) {
        document.getElementById("repasswordinfo").innerHTML = "两次输入的密码不一致";
        $("#repasswordinfo").css({"color":"red","font-size":"80%"});
        return false;
    }
}

function checkName() {  //校验姓名
    var name = document.getElementById("usernamesignup").value;
    document.getElementById("usernameSignup-info").innerHTML = "";
    if(name == "") {
        document.getElementById("usernameSignup-info").innerHTML = "用户名不能为空";
        $("#usernameSignup-info").css({"color":"red","font-size":"80%"});
        return false;
    }

}
function Agencycheck(){
    var password = document.getElementById("password").value;
    var name = document.getElementById("username").value;
    document.getElementById("passwordinfo").innerHTML = "";
    document.getElementById("usernameinfo").innerHTML = "";

    if(name == "") {
        document.getElementById("usernameinfo").innerHTML = "用户名不能为空";
        $("#usernameinfo").css({"color":"red","font-size":"80%"});
        return false;
    }
    if(password == "") {
        document.getElementById("passwordinfo").innerHTML = "密码不能为空";
        $("#passwordinfo").css({"color":"red","font-size":"80%"});
        return false;
    }


    $.ajax({
        url: '/AgencyLogin/isUserValid',
        data: {
            "name": name,
            "password": password,
        },
        type: 'post',
        async: false, //同步
        dataType: 'json',
        success: function (data) {
            isValid = data.isValid;

        },
        error: function () {
            alert("连接服务器验证失败！");

        }
    });
    if(!isValid){
        document.getElementById("signIninfo").innerHTML = "用户名与密码不匹配";
        $("#signIninfo").css({"color":"red","font-size":"80%"});
        return isValid;
    }
}