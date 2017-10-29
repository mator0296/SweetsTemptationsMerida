



  var mongoose = require('mongoose');
var conection_string = 'mongodb://localhost/SweetsTemptations'
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  conection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" + 
  process.env.OPENSHIFT_MONGODB_DB_HOST + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PORT + "/" + 
  process.env.OPENSHIFT_APP_NAME ;


}
mongoose.connect( conection_string , { useMongoClient: true });
//creacion del modelo json


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