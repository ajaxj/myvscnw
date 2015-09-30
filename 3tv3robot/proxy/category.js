var CategoryModel = require("../models").Category;	//分类模型


//查找所有分类
exports.findAll = function(callback){
	CategoryModel.find({},null,null,callback);
};