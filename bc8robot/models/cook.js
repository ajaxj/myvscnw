var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CookSchema = new Schema({
    title:{type:String},
    content:{type:String},
    url:{type:String},
	level:{type:Number},
	caixi:{type:String},
	from:{type:String},
	top:{type:Number},
	createdAt:{type:Number},
	site:{type:String}
});

mongoose.model("Cook",CookSchema,"bc8_cook")