var mongoose = require('mongoose');
mongoose.connect('mongodb://test:test@localhost/bc8');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose opened!');
  var caixiSchema = new mongoose.Schema({
      name:{type: String}, 
      en:{type: String}
    }, 
    {collection: "bc8_caixi"}
    );
  var CaixiModel = mongoose.model('Caixi',caixiSchema);

  CaixiModel.find({},null,null,function(err,docs){
	  if(err){
		  console.log(err);
	  }else{
		  console.log(docs);
	  }
  });

  // User.findOne({name:"WangEr"}, function(err, doc){
    // if(err) console.log(err);
    // else console.log(doc.name + ", password - " + doc.password);
  // });

  // var lisi = new User({name:"LiSi", password:"123456"});
  // lisi.save(function(err, doc){
    // if(err)console.log(err);
    // else console.log(doc.name + ' saved');
  // });  
});