var CaixiModel = require("../models").Caixi;

//查找所有的caixi
exports.findAll = function(callback){
	CaixiModel.find({},null,null,callback);
};

//插入caixi
exports.insert = function(name,en,callback){
	var caixiEntity = new CaixiModel();
	caixiEntity.name = name;
	caixiEntity.en = en;
	caixiEntity.save(callback);
};

//通过id查找caixi
exports.getCaixiById = function(id,callback){
	var query = {_id:id};
	CaixiModel.findOne(query,callback);
}