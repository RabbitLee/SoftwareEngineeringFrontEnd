/**
 * Created by zhaoangyouyou on 30/12/2016.
 */
// 创建地图
var map = new AMap.Map("mapContainer", {
    resizeEnable: true,
    // center: [121.5105710000, 31.2889600000],//地图中心点
    zoom: 13 //地图显示的缩放级别
});
//创建显示路线的地图
var RouteMap = new AMap.Map("RouteContainer", {
    resizeEnable: true,
    // center: [116.397428, 39.90923],//地图中心点
    zoom: 13 //地图显示的缩放级别
});

var myRoute;
var RouteColor = ['#d0104c','#ffbb33','#ff8800','#f596aa','#1c2331','#5e35b1','#fff']
var cur_color = '#d0104c';
var isLogin;
function getSpot(city) {
    var spotArr;
    $.ajax({
        url: '/selectSpots/getAllSpots',
        data: {
            cityName: city
        },
        type: 'post',
        async: false, //同步
        dataType: 'json',
        success: function (data) {
            spotArr = data.spots;
        },
        error: function () {
            alert("获取景点数据失败！");
        }
    });
    return spotArr;
}

//marker button click
function markerClick(value, id, time, level) {
    var flag = false;
    $.each(addSpotList, function(i,val){
        if(val == id){
            flag = true;
        }

    });
    if(!flag) {
        var spots = document.getElementById("selectd-spots");
        var newSpot = document.createElement("div");
        if (level == 1) {
            newSpot.setAttribute("class", "newSpotRed");
        }
        else {
            newSpot.setAttribute("class", "newSpotBlue");
        }
        newSpot.innerHTML = value;
        newSpot.onmouseover = function (){
            newSpot.innerHTML = "移除";
            this.style.opacity = 0.8;
        }
        newSpot.onmouseout = function () {
            newSpot.innerHTML = value;
            this.style.opacity = 1;
        }
        spots.appendChild(newSpot);
        addSpotList.push(id);
        duration += time;

        newSpot.onclick = function () {
            spots.removeChild(newSpot);
            removeByValue(addSpotList, id);
            duration -= time;
        }

    }
    else {
        alert("该景点已经在您的旅行计划中了：）");
    }

}
//删除数组元素
function removeByValue(arr, val) {
    for(var i=0; i<arr.length; i++) {
        if(arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
}

function changeSpot(city_value){ //更改城市时触发的函数，生成新的坐标点
    map.clearMap();
    if(addSpotList.length > 0)
    {
        if(confirm("每次只能选择一个城市哦~确定要重新选择并清空已选景点吗:）"))
        {
            var spots = document.getElementById("selectd-spots");
            addSpotList.splice(0,addSpotList.length);//清空数组
            for(var i = spots.childNodes.length - 1; i >= 0; i--) {
                spots.removeChild(spots.childNodes[i]);
            }
            map.clearMap();

        }
        else{
            select_city.value = CacheCity;
            return;
        }
    }

    if(city_value!="")
    {
        var spotArr = getSpot(city_value);

        // var spotArr = [{"names": "五角场", "id":"a", "visit_time":60,"coordinate":[121.507891, 31.28795],"levle":0},
        //     {"names": "复旦", "id":"b", "visit_time":30,"coordinate":[121.5109710000, 31.2889600000],"levle":1}];//test

        var lnglats = [],
            spotName = [],
            visitTime = [],
            spotId = [],
            spotLevel = [];

        $.each(spotArr, function(i,val){
            lnglats.push(val.coordinate[0]);
            spotName.push(val.name);
            visitTime.push(val.visit_time);
            spotId.push(val.spotid);
            spotLevel.push(val.level);

        });
        // var lnglats=[//也可以使用LngLat对象
        //     [121.507891, 31.28795], [121.5109710000, 31.2889600000]
        // ];
        var iconBlue = new AMap.Icon({
            image: 'images/mapIconBLue.png',
            size: new AMap.Size(48, 48),  //图标大小
            imageSize: new AMap.Size(48,48)
        });
        var iconRed = new AMap.Icon({
            image: 'images/mapIconRed.png',
            size: new AMap.Size(48, 48),  //图标大小
            imageSize: new AMap.Size(48,48)
        });
        var icon;
        for(var i = 0, marker; i < lnglats.length; i++){
            if(spotLevel[i]==1){
                icon = iconRed;
            }
            else{
                icon = iconBlue;
            }

            marker = new AMap.Marker({
                position:lnglats[i],
                map:map,
                icon: icon,
            });
            marker.setLabel({
                offset: new AMap.Pixel(10, -25),
                content: spotName[i],
            });
            var str_time;
            if(parseInt(visitTime[i]/60) == 0 ){
                str_time = visitTime[i]+"分钟";
            }
            else{
                if((visitTime[i]%60) == 0)
                {
                    str_time = parseInt(visitTime[i]/60)+"小时";
                }
                else {
                    str_time = parseInt(visitTime[i]/60)+"小时"+visitTime[i]%60+"分钟";
                }

            }

            marker.content = '<h3 style="text-align: center">'+spotName[i]+'</h3>' +
                '<h4 style="text-align: center">推荐游玩时间：'+str_time+'</h4> '+
                "<div onclick=\"markerClick(\'"+spotName[i]+"\',\'"+spotId[i]+"\',\'"+visitTime[i]+"\',\'"+spotLevel[i]+"\')\" class='marker-button' >添加</div>";
            //给Marker绑定单击事件
            marker.on('click', markerClick);
        }
        map.setFitView();

// 设置标记点点击后触发事件
        var infoWindow = new AMap.InfoWindow();
        function markerClick(e){
            infoWindow.setContent(e.target.content);
            infoWindow.open(map, e.target.getPosition());
        }
    }

    else{
    }
// 创建多个标记点

    CacheCity = city_value;
}

function postPlan() {
    console.log(123234324);
    var dpd1 = document.getElementById("dpd1").value;
    var dpd2 = document.getElementById("dpd2").value;
    if(dpd1 == ""||dpd2 == "" ){
        alert("提交失败，请选择出行日期");

        return false;
    }
    if(addSpotList.length <=0 ){
        alert("提交失败，请选择景点");
        return false;
    }

    $.ajax({
        url: '/login/whetherLogin',
        data: null,
        type: 'post',
        async: false, //同步
        dataType: 'json',
        success: function (data) {
           isLogin = data.name;
        },
    });
    if(isLogin == null){
        alert("请先登录,才能提交");
        return false;
    }

    console.log([dpd1, dpd2]);
    console.log(addSpotList);
     $.ajax({
        url: '/selectSpots/submitSelectedSpots',
        data: {
            data: JSON.stringify({
                date: [dpd1,dpd2],
                spots_id: addSpotList
            })
        },
        type: 'post',
        async: false, //同步
        dataType: 'json',
        success: function (data) {
            myRoute = data;
            console.log(data);
        },
        error: function () {
            alert("上传景点数据失败！");
            //test
//test 显示路线
        }
    });

    $(".content").hide();

    $("#RouteContent").show();
    console.log(myRoute);
    // myRoute ={"spots_id": [["1", "2"],["2","3"]],
    //     "time": [[[8, 9], [10, 11]],[[7,8],[12,13]]],
    //     "name": [["黄浦区", "同济大学"],["同济大学", "五角场"]],
    //     "coordinate": [[[121.47519,31.228833],[121.506357,31.282086]],[[121.506357,31.282086],[121.514222,31.302853]]]};
    var colorID = 0;

    var insertDate = "旅行日期: "+dpd1+" ~ "+dpd2;
    var insertCity = "目的城市: "+CacheCity;
    document.getElementById("dateLabel").innerHTML = insertDate;
    document.getElementById("cityLabel").innerHTML = insertCity;
    for(var i = 0; i < myRoute.coordinate.length; i++){
        //每天
        var newRouteLabel = document.createElement("div");
        newRouteLabel.setAttribute("class","newRouteLabel");
        var day = i + 1;
        var insertRoute = "第"+day+"天: ";
        cur_color = RouteColor[colorID];
        for(var j = 0; j < myRoute.coordinate[i].length-1; j++){
            //每段路线
            //载入路线
            loadTransfer(myRoute.coordinate[i][j], myRoute.coordinate[i][j+1]);

            //每个景点的marker
            marker = new AMap.Marker({
                position:myRoute.coordinate[i][j],
                map:RouteMap,
            });
            marker.setLabel({
                offset: new AMap.Pixel(10, -25),
                content: myRoute.name[i][j],
            });
            marker.content = '<h3 style="text-align: center">'+ myRoute.name[i][j]+'</h3>' +
                '<h4 style="text-align: center">推荐开始游玩时间：'+myRoute.time[i][j][0]+'点, 结束游玩时间：'+myRoute.time[i][j][1]+'点</h4> ';
            //给Marker绑定单击事件
            marker.on('click', RouteMarkerClick);

            insertRoute += myRoute.name[i][j]+' --> ';
            if( j == myRoute.coordinate[i].length-2 ){
                marker = new AMap.Marker({
                    position:myRoute.coordinate[i][j+1],
                    map:RouteMap,
                });
                marker.setLabel({
                    offset: new AMap.Pixel(10, -25),
                    content: myRoute.name[i][j+1],
                });
                marker.content = '<h3 style="text-align: center">'+myRoute.name[i][j+1]+'</h3>' +
                    '<h4 style="text-align: center">推荐开始游玩时间:'+myRoute.time[i][j+1][0]+'点 , 结束游玩时间:'+myRoute.time[i][j+1][1]+'点</h4>';
                //给Marker绑定单击事件
                marker.on('click', RouteMarkerClick);

                insertRoute += myRoute.name[i][j+1];
            }

        }
        colorID++;

        newRouteLabel.innerHTML = insertRoute;
        document.getElementById("routeLabel").appendChild(newRouteLabel);
        //= =我能说什么呢
        if(colorID >= 7){
            colorID = 0;
        }
    }
    RouteMap.setFitView();
    var infoWindow = new AMap.InfoWindow();
    function RouteMarkerClick(e){
        infoWindow.setContent(e.target.content);
        infoWindow.open(RouteMap, e.target.getPosition());
    }

    window.location.href = "#head-bar";
    return false;


}

/*
 * 调用公交换乘服务
 */
function loadTransfer(start,destination) {

    AMap.service(["AMap.Transfer"], function() {
        var transOptions = {
            map: RouteMap,
            // city: CacheCity,
            city: CacheCity,
            //公交城市
            //cityd:'乌鲁木齐',
            hideMarkers: true,
            outlineColor: cur_color,
            policy: AMap.TransferPolicy.LEAST_TIME, //乘车策略
            // showTraffic: true,

        };
        //构造公交换乘类
        var trans = new AMap.Transfer(transOptions);
        //根据起、终点坐标查询公交换乘路线
        //trans.search([{keyword:'人民广场'},{keyword:'同济大学（地铁站）'}], function(status, result){
        //trans.search([{keyword:'五角场(地铁站)'},{keyword:'同济大学（地铁站）'}], function(status, result){
        trans.search(start,destination,function(status, result){
            //trans.search([121.51487,31.299297],[121.506357,31.282086],function(status, result){
        });
    });
}

function reChoose() {
    $("#RouteContent").hide();
    $(".content").show();
    window.location.href = "#head-bar";
}
//
// AMap.service(["AMap.Transfer"], function() {
//     var transOptions = {
//         map: RouteMap,
//         city: '上海市',                           //公交城市
//         //cityd:'乌鲁木齐',
//         hideMarkers: true,
//         outlineColor: 'yellow',
//         policy: AMap.TransferPolicy.LEAST_TIME //乘车策略
//
//     };
//     //构造公交换乘类
//     var trans = new AMap.Transfer(transOptions);
//     //根据起、终点坐标查询公交换乘路线
//     //trans.search([{keyword:'同济大学（地铁站）'},{keyword:'迪士尼'}], function(status, result){
//     //trans.search([{keyword:'江湾体育场(地铁站)'},{keyword:'同济大学（地铁站）'}], function(status, result){
//     trans.search([121.506357,31.282086],[121.674272,31.164291],function(status, result){
//         //trans.search([121.514222,31.302853],[121.506357,31.282086],function(status, result){
//     });
// });
function confirmRoute() {
    var dpd1 = document.getElementById("dpd1").value;
    var dpd2 = document.getElementById("dpd2").value;
    console.log(JSON.stringify({
            shared: $("input[name='shared']:checked").val(),
            spots_id: addSpotList,
            date: [dpd1,dpd2],
            time: myRoute.time,
        }));

    $.ajax({
        url: '/selectSpots/confirmSelectedSpots',
        data: {
            data: JSON.stringify({
                shared: $("input[name='shared']:checked").val(),
                spots_id: addSpotList,
                date: [dpd1,dpd2],
                time: myRoute.time,
            })
        },
        type: 'post',
        async: false, //同步
        dataType: 'json',
        success: function (data) {
            window.location.href="/personInfo";
        },
        error: function () {
            alert("确认景点数据失败！");
            //test
//test 显示路线
        }
    });

}