




  var mongoose = require('mongoose');

 var url = '127.0.0.1:27017/' + process.env.OPENSHIFT_APP_NAME;

// if OPENSHIFT env variables are present, use the available connection info:
if ( process.env.MONGO_URL) {
    url = process.env.MONGO_URL 
}

//creacion del modelo json
mongoose.connect(url);

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