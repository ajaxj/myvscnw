var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CaixiSchema = new Schema({
	name:{type:String},
	en:{type:String}
});

mongoose.model("Caixi",CaixiSchema,"bc8_caixi");