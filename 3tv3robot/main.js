global.$ = $;				//定义公共jquery对象

//定义 log4js
var log4js = require("log4js");
log4js.configure("log4js_config.json",{});
var logger = log4js.getLogger("dev");

var ejs = require("ejs");
var nwGui = require("nw.gui");

	//连接moogoose
var mongoose = require('mongoose');
mongoose.connect("mongodb://test:test@localhost/test",null,function(err){
		if(err){
			logger.error(err);
			return false;
		}
});

var categoryProxy = require("./proxy").CategoryProxy;

var App = {
	
	category_add_handle:function(){
		var params = {toolbar: false, resizable: false, show: true, height: 220, width: 350};
		var categoryAddWindow = nwGui.Window.open('category_add.html', params);
		categoryAddWindow.on('document-end', function() {
			categoryAddWindow.focus()
			$(categoryAddWindow.window.document).find('#btn_category_add_close').bind('click', function(e){
				
					categoryAddWindow.close();
			});
			
		});
	},
	tab_category_handle:function(){
		categoryProxy.findAll(function(err,docs){
				if(err){
					logger.error(err);
					return;
				}else{
					var str = [
						"<% categorylist.forEach(function(category){%>",
						"<tr>",
					"<td><%- category.name %></td>",
					"<td><%- category.en %></td>",
					"<td><%- category.level %></td></tr>",
					"<% }) %>"].join('\n');
					var ejs_view = ejs.compile(str);
					$('#table_category').html(ejs_view({'categorylist':docs}));
					console.log("tab_category_handle");
				}
			});
	}
};


//启动主函数
$(document).ready(function(){
		
		
	$("#btn_add_category").click(function(){
		App.category_add_handle();
	});
	
	//首页tab的切换
	$('#mytabs a').click(function(e){
		
		//切换到分类tab
		if( e.target.id == "tab_category"){
			App.tab_category_handle();
		}
	});
	
});