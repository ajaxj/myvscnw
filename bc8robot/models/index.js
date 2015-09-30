var mongoose = require("mongoose");
require("./caixi");
require("./cook");
// require("./friendlink");
exports.Caixi = mongoose.model("Caixi");
exports.Cook = mongoose.model("Cook");
// exports.Friendlink = mongoose.model("Friendlink");