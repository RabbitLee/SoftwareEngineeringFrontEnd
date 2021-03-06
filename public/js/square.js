/**
 * Created by zhaoangyouyou on 11/01/2017.
 */
var voteFlag  = 0;
var isVote = 0
$(function () {
    $.ajax({
        url: "/square/showRouteInPage",
        datatype: 'json',
        type: "post",
        data: {
            page: 1
        },
        success: function (data) {
            if (data != null) {
                $.each(data.list, function (index, item) { //遍历返回的json
                    $("#data_table").append(

                        '<tbody>' +
                        '<tr>' +
                        '<td>' + item.creator + '</td>' +
                        '<td>' + item.date[0] + '</td>' +
                        '<td>' + item.date[1] + '</td>' +
                        '<td>' + item.city + '</td>' +
                        '<td>' + item.spot[0] + '</td>' +
                        '<td>' + item.spot[1] + '</td>' +
                        '<td>' +
                        '<button class="btn-view" onclick="ViewRoute(\''+item.routeID+'\');">查看</button>' +
                        '</td>' +
                        '</tr>' +
                        '</tbody>' +
                        '</table>'

                    );

                });

                var pageCount = data.pageCount; //取到pageCount的值(把返回数据转成object类型)
                var currentPage = data.CurrentPage; //得到urrentPage

                var options = {
                    bootstrapMajorVersion: 2, //版本
                    currentPage: currentPage, //当前页数
                    totalPages: pageCount, //总页数
                    itemTexts: function (type, page, current) {
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "末页";
                            case "page":
                                return page;
                        }
                    },

                    //点击事件，用于通过Ajax来刷新整个list列表
                    onPageClicked: function (event, originalEvent, type, page) {
                        $.ajax({
                            url: "/square/showRouteInPage",
                            type: "post",
                            data: {
                                "page": page
                            },
                            success: function (data) {
                                // var data={"list":[{"routeId":"1","creator":"zaaaayy","date":["2017/01/02","2017/01/10"],"city":"上海","spot":["start_spot","end_spot"]},
                                //     {"routeId":"2","creator":"yoyoyo","date":["2017/01/02","2017/01/10"],"city":"上海","spot":["start_spot","end_spot"]}],"pageCount":10,"CurrentPage":"1"};

                                if (data != null) {
                                    $("#data_table tbody").remove();
                                    $.each(data.list, function (index, item) { //遍历返回的json
                                        $("#data_table").append(
                                            '<tbody>' +
                                            '<tr>' +
                                            '<td>' + item.creator + '</td>' +
                                            '<td>' + item.date[0] + '</td>' +
                                            '<td>' + item.date[1] + '</td>' +
                                            '<td>' + item.city + '</td>' +
                                            '<td>' + item.spot[0] + '</td>' +
                                            '<td>' + item.spot[1] + '</td>' +
                                            '<td>' +
                                            '<button class="btn-view" onclick="ViewRoute(\''+item.routeID+'\');">查看</button>' +
                                            '</td>' +
                                            '</tr>' +
                                            '</tbody>' +
                                            '</table>'
                                        );
                                    });
                                }
                            },
                            error: function () {
                            }
                        });
                    }
                };
                $('#page').bootstrapPaginator(options);
            }
        },
        error: function ()
        {
            // var data={"list":[{"routeId":"1","creator":"zayy","date":["2017/01/02","2017/01/10"],"city":"上海","spot":["start_spot","end_spot"]},
            //     {"routeId":"2","creator":"zayy","date":["2017/01/02","2017/01/10"],"city":"上海","spot":["start_spot","end_spot"]}],"pageCount":10,"CurrentPage":"1"};


        }
    });
})

//展示某一次路线

//创建显示路线的地图
var RouteMap = new AMap.Map("RouteContainer", {
    resizeEnable: true,
    // center: [116.397428, 39.90923],//地图中心点
    zoom: 13 //地图显示的缩放级别
});

var myRoute;
var RouteColor = ['#d0104c','#ffbb33','#ff8800','#f596aa','#1c2331','#5e35b1','#fff']
var cur_color = '#d0104c';

function ViewRoute(routeId) {
    var isLogin = null;
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
        return;
    }
    // if( duration < )
    //
    // )
    clearLastScene();
    // console.log(routeId);
    $.ajax({
        url: '/square/getSelectedRoute',
        data: {
            "detailRouteID": routeId,
        },
        type: 'post',
        async: false, //同步
        dataType: 'json',
        success: function (data) {
            myRoute = data;
            // console.log(myRoute);
            $(".content").hide();

            $("#RouteContent").show();
            // myRoute ={
            //     "routeId":"33",
            //     "creator": "zayy",
            //     "participants": [["lyc", "旅行社1"], ["hzw", "旅行社2"],["zayy","旅行社1"]],
            //     "city":"上海",
            //     "myVote": "agency1", //当前用户投票的旅行社
            //     "agency": [{"agencyName": "agency1", "fare": 100, "poll": 1}, {"agencyName": "agency2", "fare": 200, "poll": 2}],
            //     "spots_id": [["1", "2"],["2","3"]],
            //     "date": ["2016/01/01", "2017/12/20"],
            //     "time": [[[8, 9], [10, 11]],[[7,8],[12,13]]],
            //     "spotsName": [["黄浦区", "同济大学"],["同济大学", "五角场"]],
            //     "coordinate": [[[121.47519,31.228833],[121.506357,31.282086]],[[121.506357,31.282086],[121.514222,31.302853]]]};

            var colorID = 0;

            //文字说明
            var insertDate = "旅行日期: "+myRoute.date[0]+" ~ "+myRoute.date[1];
            var insertCity = "目的城市: "+myRoute.city;
            var insertCreator = "创建者: "+myRoute.creator;
            document.getElementById("creatorLabel").innerHTML = insertCreator;
            document.getElementById("dateLabel").innerHTML = insertDate;
            document.getElementById("cityLabel").innerHTML = insertCity;

            $("#othersLabel").append(
                "所有参与者: (总共"+myRoute.participants.length+"人)"
            );
            $.each(myRoute.participants, function (index, item) { //遍历返回的json
                $("#othersLabel").append(
                    ", "+item[0]
                );

            });
            //旅行社投票
            $.each(myRoute.agency, function (index, item) { //遍历返回的json
                // console.log(item);
                $("#agencyLabel").append(
                    '<label><input name="vote" type="radio" value="'+item.agencyID+'">'+item.agencyID+' 出价: '+item.fare+'RMB (累计'+item.poll+'票）</label>'
                );
            });
            if(myRoute.myVote != "False") {

                isVote = 1;
                for(var j=0; j< document.getElementsByName("vote").length;j++)
                {

                    if(document.getElementsByName("vote")[j].value == myRoute.myVote)
                    {

                        document.getElementsByName("vote")[j].checked = true;
                    }
                }
            }

            //判断能不能投票加入
            let username = null;
            $.ajax({
                url: '/login/whetherLogin',
                data: null,
                type: 'post',
                async: false,
                dataType: 'json',
                success: function (data) {
                    username = data.name;
                }
            });

            $.each(myRoute.participants, function (index, item) { //遍历返回的json
                if(item[0]==username){
                    voteFlag = 1;
                }

            });

            if(voteFlag == 1) {
                $("#joinRoute").attr("disabled", true);
                $("#joinRoute").attr("class", "HavingjoinRoute");
                $("#joinRoute").empty();
                $("#joinRoute").append("已加入");

            }
            else{
                $("#joinRoute").attr("disabled", false);
                $("#joinRoute").attr("class", "joinRoute");
                $("#joinRoute").empty();
                $("#joinRoute").append("加入");
            }
            if(myRoute.paymentState == "已支付"){
                $("#voteFor").attr("disabled", true);
                $("#voteFor").empty();
                $("#voteFor").append("已支付");
            }
            RouteMap.clearMap();
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
                        content: myRoute.spotsName[i][j],
                    });
                    marker.content = '<h3 style="text-align: center">'+ myRoute.spotsName[i][j]+'</h3>' +
                        '<h4 style="text-align: center">推荐开始游玩时间：'+myRoute.time[i][j][0]+'点, 结束游玩时间：'+myRoute.time[i][j][1]+'点</h4> ';
                    //给Marker绑定单击事件
                    marker.on('click', RouteMarkerClick);

                    insertRoute += myRoute.spotsName[i][j]+' --> ';
                    if( j == myRoute.coordinate[i].length-2 ){
                        marker = new AMap.Marker({
                            position:myRoute.coordinate[i][j+1],
                            map:RouteMap,
                        });
                        marker.setLabel({
                            offset: new AMap.Pixel(10, -25),
                            content: myRoute.spotsName[i][j+1],
                        });
                        marker.content = '<h3 style="text-align: center">'+myRoute.spotsName[i][j+1]+'</h3>' +
                            '<h4 style="text-align: center">推荐开始游玩时间:'+myRoute.time[i][j+1][0]+'点 , 结束游玩时间:'+myRoute.time[i][j+1][1]+'点</h4>';
                        //给Marker绑定单击事件
                        marker.on('click', RouteMarkerClick);

                        insertRoute += myRoute.spotsName[i][j+1];
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

        },
        error: function () {
            alert("查看失败！");
        }
    });
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
            city: myRoute.city,
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

function joinRoute() {
    // console.log(myRoute.routeID);
    $.ajax({
        url: '/square/joinRoute',
        data: {
            //user:
            detailRouteID: myRoute.routeID
        },
        type: 'post',
        async: false, //同步
        dataType: 'json',
        success: function (data) {
            console.log(data);
            ViewRoute(myRoute.routeID);
        },
        error: function () {
            alert("加入失败！");
            ViewRoute(myRoute.routeID);
        }
    });
}
function voteFor() {


    if(!voteFlag){
        document.getElementById("voteinfo").innerHTML = "请先加入路线，才可投票";
        $("#voteinfo").css({"color":"red","font-size":"80%"});
        return;
    }
    else{
        if(isVote){
            if(confirm("你已经投过票了，确定要重新投票吗:）"))
            {
                $.ajax({
                    url: '/square/voteRoute',
                    data: {
                        //user:
                        voteFor: $("input[name='vote']:checked").val(),
                        detailRouteID: myRoute.routeID
                    },
                    type: 'post',
                    async: false, //同步
                    dataType: 'json',
                    success: function (data) {
                        ViewRoute(myRoute.routeID);
                    },
                    error: function () {
                        alert("投票失败！");
                        ViewRoute(myRoute.routeID);
                    }
                });
            }
        }
        else {
            $.ajax({
                url: '/square/voteRoute',
                data: {
                    //user:
                    voteFor: $("input[name='vote']:checked").val(),
                    detailRouteID: myRoute.routeID
                },
                type: 'post',
                async: false, //同步
                dataType: 'json',
                success: function (data) {
                    ViewRoute(myRoute.routeID);
                },
                error: function () {
                    alert("投票失败！");
                    ViewRoute(myRoute.routeID);
                }
            });
        }


    }
}

function clearLastScene() {
    $("#dateLabel").empty();
    $("#cityLabel").empty();
    $("#creatorLabel").empty();
    $("#othersLabel").empty();
    $("#routeLabel").empty();
    $('#agencyLabel').empty();
}


function backAll() {
    $("#RouteContent").hide();
    $(".content").show();
    window.location.href = "#head-bar";
}