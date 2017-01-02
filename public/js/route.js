var select_prov=document.getElementById('province');
var select_city=document.getElementById('city');
var addSpotList = [];//添加的景点数组
var CacheProv = "";
var CacheCity = "";
var duration = 0;
$(function() {
    // var provinceArr = getProvice();
    var provinceArr =  {"provinces": ["北京","上海"]}; //test
    $.each(provinceArr.provinces, function(i,val){
        select_prov.options.add(new Option(val,val));
    });

});

function changeCity(prov_value){  //选中省份的时候触发城市

    //改变省份的时候判定并清空已选景点
    if(addSpotList.length > 0)
    {
        if(confirm("每次只能选择一个城市哦~确定要重新选择并清空已选景点吗:）"))
        {
            var spots = document.getElementById("selectd-spots");
            addSpotList.splice(0,addSpotList.length);//清空数组
            for(var i = spots.childNodes.length - 1; i >= 0; i--) {
                spots.removeChild(spots.childNodes[i]);
            }
            duration = 0;

        }
        else{
            select_prov.value = CacheProv;
            return;
        }
    }

    if(prov_value!="")
    {
        select_city.options.length=0;
        select_city.options.add(new Option("请选择城市",""));
        select_city.options[0].disabled = true;
        // var cityArr = getCity(prov_value);
        var cityArr = {"cities": ["北京市","上海市"]};//test

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
    CacheProv = prov_value;

}

function getProvice() {
    var provinceArr;
    $.ajax({
        url: '/getAllProvinces',
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
        url: '/getAllCities',
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

