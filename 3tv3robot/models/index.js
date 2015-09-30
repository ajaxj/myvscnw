//集合所有的mongoose.models并切exports;
var mongoose = require("mongoose");
require("./category");

exports.Category = mongoose.model("Category");