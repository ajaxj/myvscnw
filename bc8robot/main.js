global.$ = $;
var log4js = require("log4js");
log4js.configure('log4js_config.json', {});
var logger = log4js.getLogger('dev');

var nwGui = require("nw.gui");
var ejs = require("ejs");
var EventProxy = require("eventproxy");
var fs = require("fs");
var request = require("request");
var cheerio = require('cheerio');

var mongoose = require('mongoose');

var mgo_url = "mongodb://test:test@localhost/bc8";
// var mgo_url ="mongodb://test:test@47.88.136.150/bc8";
mongoose.connect(mgo_url,null,function(err){
	if(err){
		window.alert(err);
		logger.error(err);
		return;
	}
});
var caixiProxy = require("./proxy").CaixiProxy;
var cookProxy = require("./proxy").CookProxy;
// var nwGui = require("nw.gui");

var App = {
	//添加caixi
	caixi_add_handle:function(){
		var params = {toolbar: false, resizable: false, show: true, height: 220, width: 350};
		var caixiAddWindow = nwGui.Window.open('caixi_add.html', params);
		caixiAddWindow.on('document-end', function() {
			caixiAddWindow.focus()
			$(caixiAddWindow.window.document).find('#btn_caixi_add_close').bind('click', function(e){
					var _name =$(caixiAddWindow.window.document).find("#name").val();
					var _en = $(caixiAddWindow.window.document).find("#en").val();
					
					if(_name == "" || _en==""){
						window.alert("input empty");
						return;
					}
					
					caixiProxy.insert(_name,_en,function(err,doc){
						if(err){
							logger.error(err);
							return;
						}else{
							App.tab_caixi_handle();
							
						}
					});
				caixiAddWindow.close();
			});
			
		});
	},
	//list caixi
	tab_caixi_handle:function(){
		caixiProxy.findAll(function(err,docs){
				if(err){
					logger.error(err);
					return;
				}else{
					var str = [
					"<% caixilist.forEach(function(caixi){%>",
					"<tr>",
					"<td><%- caixi.name %></td>",
					"<td><%- caixi.en %></td>",
					"<td><a onclick=deleteCaixi('<%- caixi.id%>')>Del</a></td></tr>",
					"<% }) %>"].join('\n');
					var ejs_view = ejs.compile(str);
					$('#table_caixi').html(ejs_view({'caixilist':docs}));
					
				}
		});
	},
	tab_cook_handle:function(){
		cookProxy.getCooksByLevel(2,function(err,docs){
				if(err){
					logger.error(err);
					return;
				}else{
					var str = [
					"<% cooklist.forEach(function(cook){%>",
					"<tr>",
					"<td><%- cook.title %></td>",
					"<td><%- cook.level %></td>",
					"<td><a onclick=deleteCaixi('<%- cook.id%>')>Del</a></td></tr>",
					"<% }) %>"].join('\n');
					var ejs_view = ejs.compile(str);
					$('#table_cook').html(ejs_view({'cooklist':docs}));
					
				}
		});
	}
}


//functions
var deleteCaixi = function(id){
	
	caixiProxy.getCaixiById(id,function(err,doc){
			if(err){
				logger.error(err);
				return;
			}else{
				doc.remove(function(err){
					if(err){
						logger.error(err);
						return;
					}else{
						window.alert("delete ok");
						App.tab_caixi_handle();
					}
				});
				
			}
	});	
	
};


// var btn1_click = function(){
	// CaixiModel.find({},null,null,function(err,docs){
		// if(err){
			// logger.error(err);
		// }else{
			// var str = [
				// "<tbody>",
                // "<% caixilist.forEach(function(caixi){%>",
                // "<tr>",
            // "<td><%- caixi.name %></td>",
            // "<td><%- caixi.en %></td>",
            // "<td><a onclick=deleteCaixi('<%- caixi.id%>')>Del</a></td></tr>",
        	// "<% }) %>",
            // "</tbody>"].join('\n');
			// var ejs_view = ejs.compile(str);
			// $('#table1').html(ejs_view({'caixilist':docs}));
		// }
	// });

// };

// var btn2_click = function(){
	// $('#table1').empty();
// };








$(document).ready(function(){
	
	$("#btn_add_caixi").click(function(){
		App.caixi_add_handle();
	});
	
	// $("#btn_test").click(function(){
		// var win = nwGui.Window.reload('https://github.com', {
			  // position: 'center',
			  // width: 901,
			  // height: 127
			// });
			// win.on ('loaded', function(){
			 
			  // var document = win.window.document;
			// });
	// });
	
	//首页tab的切换
	$('#mytabs a').click(function(e){
		e.preventDefault();
		//切换到分类tab
		if( e.target.id == "tab_caixi"){
			App.tab_caixi_handle();
		}
		
		if( e.target.id == "tab_cook"){
			App.tab_cook_handle();
		}
		
	});
	
	
	// $('#myTabs a').click(function (e) {
		// e.preventDefault()
		
		// if (e.target.id == "tab_cook"){
			
			
			// var proxy = EventProxy.create("caixilist","cooklist",function(caixilist,cooklist){
				// var str = [
						// "<% caixilist.forEach(function(caixi){%>",
						// "<option value='<%- caixi.en%>'><%- caixi.name%></option>",
						// "<%})%>",
					// ].join('\n');
				// var ejs_view = ejs.compile(str);
				// $('#caixi_select').html(ejs_view({'caixilist':caixilist}));
			
					// str = [
						// "<tbody>",
						 // "<% cooklist.forEach(function(cook){%>",
						// "<tr>",
					// "<td><%- cook.title %></td>",
					// "<td><%- cook.level %></td>",
					// "<td><%- cook.caixi %></td>",
					// "<td><a>Del</a></td></tr>",
					// "<% }) %>",
					// "</tbody>"].join('\n');
					// ejs_view = ejs.compile(str);
					// $('#table_cook').html(ejs_view({'cooklist':cooklist}));	
			
			// });
			
			
			
			// CaixiProxy.findAll(function(err,docs){
				// if(err){
					// window.alert(err);
				// }else{
					// proxy.emit("caixilist",docs);
				// }
			// });
			
			
			// var query = {};
			// var options = {limit:10};
			// CookModel.find(query,null,options,function(err,docs){
				// if(err){
					// window.alert(err);
				// }else{
					
					// proxy.emit("cooklist",docs);
				// }
			// });
		// }
	// });
	
	// $('#btn_addcaixi').click(function(){

		// var _name =$("#name").val();
		// var _en = $("#en").val();
		
		// if(_name == "" || _en==""){
			// window.alert("input empty");
			// return;
		// }
		
		// var CaixiEntity = new CaixiModel();
		// CaixiEntity.name = _name;
		// CaixiEntity.en = _en;
		
		// CaixiEntity.save(function(err,result){
			// if(err){
				// logger.error(err);
			// }else{
				// window.alert("add caixi ok");
				// $("#name").val("");
				// $("#en").val("");
			// }
		// });
		
	// });
	
	// $("#caixi_select").change(function(){
		
		// $('#table_cook').empty();
		// var _caixi = $("#caixi_select").val();
		
		
		// CookModel.find({'caixi':_caixi},null,{limit:10},function(err,docs){
			// if(err){
				// window.alert(err);
			// }else{
				// var str = [
						// "<tbody>",
						 // "<% cooklist.forEach(function(cook){%>",
						// "<tr>",
					// "<td><%- cook.title %></td>",
					// "<td><%- cook.level %></td>",
					// "<td><%- cook.caixi %></td>",
					// "<td><a>Del</a></td></tr>",
					// "<% }) %>",
					// "</tbody>"].join('\n');
				// var ejs_view = ejs.compile(str);
				// $('#table_cook').html(ejs_view({'cooklist':docs}));	
			// }
		// });
		
	// });

	
});