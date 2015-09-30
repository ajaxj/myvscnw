var CookModel = require("../models").Cook;


//查找cooks通过level分级
exports.getCooksByLevel = function(level,callback){
	var query = {"level":level};
	CookModel.find(query,null,null,callback);
};


//查找Cook通过Id
exports.getCookById = function(id,callback){
	CookModel.findOne({_id:id},callback);
};


//查找cooks通过caixi
exports.getCooksByCaixi = function(caixi,callback){
	CookModel.find({'caixi':caixi},null,{limit:10},callback);
};