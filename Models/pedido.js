


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


  mongoURL = ""
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
   console.log(mongoURL)
  mongoose.connect(mongoURL, function(err, conn) {
    if (err) {
      callback(err);
      return;
    }

 

    console.log('Connected to MongoDB at: %s', mongoURL);
  });


var pedidoSchemaJSON = {
	name:{type:String},
	type:{type:String},
	cases:{type:String},
	flavorCake:{type:String},
	flavorCream:{type:String},
	Ntoys:{type:String},
	refere:{type:String},
	price:{type:String},
	size:{type:String},
	candy:{type:Boolean},
	toronto:{type:Boolean},
	cri:{type:Boolean},
	oreo:{type:Boolean},
	creator:{type:mongoose.Schema.Types.ObjectId, ref:"Users"},
	content:{type:String},
	refereDelete:{type:Boolean},
	pedidoValid:{type:Boolean}



};


/// implementacion del esquema con el modelo json
var pedido_schema = new mongoose.Schema(pedidoSchemaJSON);

// creaciion del usario con el esquema
var Pedido = mongoose.model("Pedido", pedido_schema);
module.exports = Pedido;