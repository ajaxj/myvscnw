//分类的schema
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CategorySchema = new Schema({
	name:{type:String},
	en:{type:String},
	level:{type:Number}			//分级 0 mv 1 tv
});


mongoose.model("Category",CategorySchema,"tv_category");