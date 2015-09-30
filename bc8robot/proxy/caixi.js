var CaixiModel = require("../models").Caixi;

exports.findAll = function(callback){
	CaixiModel.find({},null,null,callback);
};
