








  var mongoose = require('mongoose');


 var url = '127.0.0.1:27017/' + process.env.OPENSHIFT_APP_NAME;

// if OPENSHIFT env variables are present, use the available connection info:
if ( process.env.MONGO_URL) {
    url = process.env.MONGO_URL 
}

//creacion del modelo json
mongoose.connect(url);


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