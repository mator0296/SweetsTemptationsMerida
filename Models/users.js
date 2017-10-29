

 var  mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL || 'mongodb://localhost/SweetsTemptations',
    mongoURLLabel = "";
Object.assign=require('object-assign')
//creacion del modelo json
if (mongoURL == 'mongodb://localhost/SweetsTemptations' && process.env.DATABASE_SERVICE_NAME) {
  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
      mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
      mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
      mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
      mongoPassword = process.env[mongoServiceName + '_PASSWORD']
      mongoUser = process.env[mongoServiceName + '_USER'];

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

  }
}




  var mongoose = require('mongoose');

  mongoose.connect(mongoURL, function(err, conn) {
    if (err) {
      callback(err);
      return;
    }

 

    console.log('Connected to MongoDB at: %s', mongoURL);
  });



var userSchemaJSON = {
	username:{type:String, require:true},
	email:{type:String, require:true},
	password:{type:String, require:true},
	name:{type:String, require:true},
	lastname:{type:String, require:true},
	birdDate:Date,
	age:{type:Number, require:true},
	gender:{type:String,require:true},
	budget:[{prePedido:{type:mongoose.Schema.Types.ObjectId, ref:"prePedido"},price:{type:String},flavorCake:{type:String},flavorCream:{type:String}}],
	car:[{type:mongoose.Schema.Types.ObjectId, ref:"Pedido"}],
	buyState:{phoneNumber:String,state:String, preBuy:Boolean,bankFrom:String,bankTo:String, refere:String, nroReference:String,from:{type:String},to:{type:String },for:{type:String},addres:{type:String},pay:{type:String},date:Date, totalPrice:Number, clock:String}
	
};


/// implementacion del esquema con el modelo json
var user_schema = new mongoose.Schema(userSchemaJSON);


// creaciion del usario con el esquema
var User = mongoose.model("Users", user_schema);
module.exports.User = User;