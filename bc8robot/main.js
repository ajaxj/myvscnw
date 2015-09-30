global.$ = $;
var log4js = require("log4js");
log4js.configure('log4js_config.json', {});
var logger = log4js.getLogger('dev');

var ejs = require("ejs");
var EventProxy = require("eventproxy");
var fs = require("fs");
var request = require("request");
var cheerio = require('cheerio');

var mongoose = require('mongoose');
mongoose.connect('mongodb://test:test@localhost/bc8');//；连接数据库
var CaixiModel = require("./models").Caixi;
var CookModel = require("./models").Cook;
var CaixiProxy = require("./proxy").CaixiProxy;
// var nwGui = require("nw.gui");

// require('nw.gui').Window.get().showDevTools();

var initMenu = function(){
	// try {
	// 	var nativeMenuBar = new nwGui.Menu({type:'menubar'});
	// 	if (process.platform == "darwin") {
    //   		nativeMenuBar.createMacBuiltin && nativeMenuBar.createMacBuiltin("FileExplorer");
    // 	}
    // 	nwGui.Window.get().menu = nativeMenuBar;
	// } catch (error) {
	// 	log4js.error(error);
	// }	
};


var btn1_click = function(){
	CaixiModel.find({},null,null,function(err,docs){
		if(err){
			logger.error(err);
		}else{
			var str = [
				"<tbody>",
                "<% caixilist.forEach(function(caixi){%>",
                "<tr>",
            "<td><%- caixi.name %></td>",
            "<td><%- caixi.en %></td>",
            "<td><a onclick=deleteCaixi('<%- caixi.id%>')>Del</a></td></tr>",
        	"<% }) %>",
            "</tbody>"].join('\n');
			var ejs_view = ejs.compile(str);
			$('#table1').html(ejs_view({'caixilist':docs}));
		}
	});

};

var btn2_click = function(){
	$('#table1').empty();
};

var deleteCaixi = function(id){
	
	CaixiModel.findOne({_id:id},function(err,result){
			if(err){
				logger.error(err);
			}else{
				result.remove(function(err){
					if(err){
						logger.error(err);
					}else{
						window.alert("delete ok");
						btn1_click();
					}
				});
				
			}
	});	
	
	
};




//loading
function showLoad(tipInfo) {
    var iWidth = 120;     //弹出窗口的宽度;
    var iHeight = 0;    //弹出窗口的高度;
    var scrolltop = 0;
    var scrollleft = 0;
    var cheight = 0;
    var cwidth = 0;
    var eTip = document.createElement('div');
    eTip.setAttribute('id', 'tipDiv');
    eTip.style.position = 'absolute';
    eTip.style.display = 'none';
    //eTip.style.border = 'solid 0px #D1D1D1';
    //eTip.style.backgroundColor = '#4B981D';
    //eTip.style.padding = '5px 15px';

    if(document.body.scrollTop){//这是一个js的兼容
        scrollleft=document.body.scrollLeft;
        scrolltop=document.body.scrollTop;
        cheight=document.body.clientHeight;
        cwidth=document.body.clientWidth;
    }
    else{
        scrollleft=document.documentElement.scrollLeft;
        scrolltop=document.documentElement.scrollTop;
        cheight=document.documentElement.clientHeight;
        cwidth=document.documentElement.clientWidth;
    }
    iHeight = eTip.offsetHeight;
    var v_left=(cwidth-iWidth)/2 + scrollleft; //
    var v_top=(cheight-iHeight)/2+ scrolltop;
    eTip.style.left = v_left + 'px';
    eTip.style.top = v_top + 'px';

    eTip.innerHTML = '<img src=\'images/loading.gif\' style=\'float:left;\' />&nbsp;&nbsp;<span style=\'color:#ffffff; font-size:12px\'>' + tipInfo + '</span>';
    try {
        document.body.appendChild(eTip);
    } catch (e) { }
    $("#tipDiv").css("float", "right");
    $("#tipDiv").css("z-index", "99");
    $('#tipDiv').show();
    ShowMark();
}

function closeLoad() {
    $('#tipDiv').hide();
    HideMark();
}


//显示蒙灰层
function ShowMark() {
    var xp_mark = document.getElementById("xp_mark");
    if (xp_mark != null) {
        //设置DIV
        xp_mark.style.left = 0 + "px";
        xp_mark.style.top = 0 + "px";
        xp_mark.style.position = "absolute";
        xp_mark.style.backgroundColor = "#000";
        xp_mark.style.zIndex = "1";
        if (document.all) {
            xp_mark.style.filter = "alpha(opacity=50)";
            var Ie_ver = navigator["appVersion"].substr(22, 1);
            if (Ie_ver == 6 || Ie_ver == 5) { hideSelectBoxes(); }
        }
        else { xp_mark.style.opacity = "0.5"; }
        xp_mark.style.width = "100%";
        xp_mark.style.height = "100%";
        xp_mark.style.display = "block";
    }
    else {
        //页面添加div explainDiv,注意必须是紧跟body 内的第一个元素.否则IE6不正常.
        $("body").prepend("<div id='xp_mark' style='display:none;'></div>");
        ShowMark(); //继续回调自己
    }
}

//隐藏蒙灰层
function HideMark() {
    var xp_mark = document.getElementById("xp_mark");
    xp_mark.style.display = "none";
    var Ie_ver = navigator["appVersion"].substr(22, 1);
    if (Ie_ver == 6 || Ie_ver == 5) { showSelectBoxes(); }
}





$(document).ready(function(){
	
	
	initMenu();
	
	$('#btn1').click(function(){
		showLoad('下载数据');
		var t=setTimeout(closeLoad,4000);  
		//closeLoad();
		btn1_click();
	});
	
	$('#btn2').click(function(){
		btn2_click();
	});
	
	$('#btn3').click(function(){
		
		// url = "http://www.zhms.cn/Ms_menu/chuan/";
		// request(url).pipe((fs.createWriteStream('chuan.html')));
		
		request('http://www.zhms.cn/Ms_menu/chuan/', function (error, response, body) {
		  if (!error && response.statusCode == 200) {
				var $ = cheerio.load(body);
				
				var li = $('.vl-list').find('.cai_img');
				
				li.each(function (index, ele) {
					
					var src = $('img', this).attr('src');
					console.log(src);
				});
				
				
			    // var li = $('.vl-list').find('li');
				// var arr = [];
				// li.each(function (index, ele) {
					
					// var src = $('img', this).attr('src');
					// var href = $('a', this).attr('href');
					// console.log("href:", href);
					// var obj = {
						// src: src,
						// href: 'http://www.22mm.cc' + href
						
					// };
					// arr.push(obj);
				// });
				// console.log("arr:", arr);
		  }else{
			 console.log(error);
		  }
		});
		
		
	});
	
	$('#myTabs a').click(function (e) {
		e.preventDefault()
		
		if (e.target.id == "tab_cook"){
			
			
			var proxy = EventProxy.create("caixilist","cooklist",function(caixilist,cooklist){
				var str = [
						"<% caixilist.forEach(function(caixi){%>",
						"<option value='<%- caixi.en%>'><%- caixi.name%></option>",
						"<%})%>",
					].join('\n');
				var ejs_view = ejs.compile(str);
				$('#caixi_select').html(ejs_view({'caixilist':caixilist}));
			
					str = [
						"<tbody>",
						 "<% cooklist.forEach(function(cook){%>",
						"<tr>",
					"<td><%- cook.title %></td>",
					"<td><%- cook.level %></td>",
					"<td><%- cook.caixi %></td>",
					"<td><a>Del</a></td></tr>",
					"<% }) %>",
					"</tbody>"].join('\n');
					ejs_view = ejs.compile(str);
					$('#table_cook').html(ejs_view({'cooklist':cooklist}));	
			
			});
			
			
			
			CaixiProxy.findAll(function(err,docs){
				if(err){
					window.alert(err);
				}else{
					proxy.emit("caixilist",docs);
				}
			});
			
			
			var query = {};
			var options = {limit:10};
			CookModel.find(query,null,options,function(err,docs){
				if(err){
					window.alert(err);
				}else{
					
					proxy.emit("cooklist",docs);
				}
			});
		}
	});
	
	$('#btn_addcaixi').click(function(){

		var _name =$("#name").val();
		var _en = $("#en").val();
		
		if(_name == "" || _en==""){
			window.alert("input empty");
			return;
		}
		
		var CaixiEntity = new CaixiModel();
		CaixiEntity.name = _name;
		CaixiEntity.en = _en;
		
		CaixiEntity.save(function(err,result){
			if(err){
				logger.error(err);
			}else{
				window.alert("add caixi ok");
				$("#name").val("");
				$("#en").val("");
			}
		});
		
	});
	
	$("#caixi_select").change(function(){
		
		$('#table_cook').empty();
		var _caixi = $("#caixi_select").val();
		
		
		CookModel.find({'caixi':_caixi},null,{limit:10},function(err,docs){
			if(err){
				window.alert(err);
			}else{
				var str = [
						"<tbody>",
						 "<% cooklist.forEach(function(cook){%>",
						"<tr>",
					"<td><%- cook.title %></td>",
					"<td><%- cook.level %></td>",
					"<td><%- cook.caixi %></td>",
					"<td><a>Del</a></td></tr>",
					"<% }) %>",
					"</tbody>"].join('\n');
				var ejs_view = ejs.compile(str);
				$('#table_cook').html(ejs_view({'cooklist':docs}));	
			}
		});
		
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});