/**
 * Created by zhaoangyouyou on 30/12/2016.
 */
// 创建地图
var map = new AMap.Map("mapContainer", {
    resizeEnable: true,
    // center: [121.5105710000, 31.2889600000],//地图中心点
    zoom: 13 //地图显示的缩放级别
});
var addSpotList = [];//添加的景点数组

function getSpot(city) {
    var spotArr;
    $.ajax({
        url: 'http://rabbitlee.me/getAllSpots',
        data: city,
        type: 'post',
        async: false, //同步
        dataType: 'json',
        success: function (data) {
            spotArr = data;
        },
        error: function () {
            alert("获取景点数据失败！");
        }
    });
    return spotArr;
}

//marker button click
function markerClick(value, id, level) {
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
        newSpot.onclick = function () {
            spots.removeChild(newSpot);
            removeByValue(addSpotList, id);
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

function changeSpot(city_value){


    if(city_value!="")
    {
        // var spotArr = getSpot(city_value);
        var spotArr = [{"names": "五角场", "id":"a", "visit_time":"60","coordinate":[121.507891, 31.28795],"levle":"0"},
            {"names": "复旦", "id":"b", "visit_time":"30","coordinate":[121.5109710000, 31.2889600000],"levle":"1"}];//test

        var lnglats = [],
            spotName = [],
            visitTime = [],
            spotId = [],
            spotLevel = [];
        $.each(spotArr, function(i,val){
            lnglats.push(val.coordinate);
            spotName.push(val.names);
            visitTime.push(val.visit_time);
            spotId.push(val.id);
            spotLevel.push(val.levle);
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
            if(spotLevel[i]=="1"){
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

            marker.content = '<h3 style="text-align: center">'+spotName[i]+'</h3>' +
                "<div onclick=\"markerClick(\'"+spotName[i]+"\',\'"+spotId[i]+"\',\'"+spotLevel[i]+"\')\" class='marker-button' >添加</div>";
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
}
