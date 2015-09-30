var CookModel = require("../models").Cook;

exports.getCookById = function(id,callback){
	CookModel.findOne({_id:id},callback);
};


exports.getCooksByCaixi = function(caixi,callback){
	CookModel.find({'caixi':caixi},null,{limit:10},callback);
};