// var mongoose = require('mongoose');
// mongoose.connect('mongodb://test:test@localhost/bc8');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('mongoose opened!');
//   var caixiSchema = new mongoose.Schema({
//       name:{type: String}, 
//       en:{type: String}
//     }, 
//     {collection: "bc8_caixi"}
//     );
//   var CaixiModel = mongoose.model('Caixi',caixiSchema);

//   CaixiModel.find({},null,null,function(err,docs){
// 	  if(err){
// 		  console.log(err);
// 	  }else{
// 		  console.log(docs);
// 	  }
//   });

//   // User.findOne({name:"WangEr"}, function(err, doc){
//     // if(err) console.log(err);
//     // else console.log(doc.name + ", password - " + doc.password);
//   // });

//   // var lisi = new User({name:"LiSi", password:"123456"});
//   // lisi.save(function(err, doc){
//     // if(err)console.log(err);
//     // else console.log(doc.name + ' saved');
//   // });  
// });


// var log4js = require("log4js");

// log4js.configure('log4js_config.json', {});
// var logger = log4js.getLogger('dev');


//     logger.trace("this is trace");
// 	logger.debug("this is debug");
// 	logger.info("this is info");
// 	logger.warn("this is warn");
// 	logger.error("this is error");
// 	logger.fatal("this is fatal");



// log4js.loadAppender("file");
//log4js.addAppender(log4js.appenders.file('cheese.log'),'cheese');
//var logger = log4js.getLogger('cheese');
// logger.setLevel('ERROR');
// logger.setLevel("DEBUG");
// logger.trace("this is trace");
// logger.debug("this is debug");
// logger.info("this is info");
// logger.warn("this is warn");
// logger.error("this is error");
// logger.fatal("this is fatal");
var folder_view = require('folder_view');
var folder = new folder_view.Folder();
folder.open(process.cwd());