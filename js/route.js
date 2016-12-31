var select_prov=document.getElementById('province');
var select_city=document.getElementById('city');

$(function() {
    // var provinceArr = getProvice();
    var provinceArr =  {"provinces": ["北京","上海"]}; //test
    $.each(provinceArr.provinces, function(i,val){
        select_prov.options.add(new Option(val,val));
    });

});

function changeCity(prov_value){  //选中省份的时候触发城市

    if(prov_value!="")
    {
        select_city.options.length=0;
        select_city.options.add(new Option("请选择城市",""));

        // var cityArr = getCity(prov_value);
        var cityArr = {"cities": ["五角场","同济大学"]};//test

        select_city.disabled = false;
        $.each(cityArr.cities, function(i,val){
            select_city.options.add(new Option(val,val));
        });
    }
    else{
        select_city.options.length=0;
        select_city.options.add(new Option("请选择城市",""));
        select_city.disabled = true;
    }

}

function getProvice() {
    var provinceArr;
    $.ajax({
        url: 'http://rabbitlee.me/getAllProvinces',
        data: null,
        type: 'post',
        async: false, //同步
        dataType: 'json',
        success: function (data) {
            provinceArr = data;
        },
        error: function () {
            alert("获取省份数据失败！");
        }
    });
    return provinceArr;
}
function getCity(province) {
    var cityArr;
    $.ajax({
        url: 'http://rabbitlee.me/getAllCities',
        data: province,
        type: 'post',
        async: false, //同步
        dataType: 'json',
        success: function (data) {
            cityArr = data;
        },
        error: function () {
            alert("获取城市数据失败！");
        }
    });
    return cityArr;
}