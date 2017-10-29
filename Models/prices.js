

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


var pedidoSchemaJSON = {
	type:{type:String},
	cases:{type:String},
	size:{type:String},
	Price:{type:[{flavorCake:String,flavorCream:String, price:String}]},
	minPrices:{flavorCake:String,flavorCream:String, price:String},
	maxPrices:{flavorCake:String,flavorCream:String, price:String}

};


/// implementacion del esquema con el modelo json
var pedido_schema = new mongoose.Schema(pedidoSchemaJSON);

// creaciion del usario con el esquema
var Pedido = mongoose.model("Prices", pedido_schema);
module.exports = Pedido;