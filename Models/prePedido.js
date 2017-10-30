




  var mongoose = require('mongoose');

 var url = '127.0.0.1:27017/' + process.env.OPENSHIFT_APP_NAME;

// if OPENSHIFT env variables are present, use the available connection info:
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    url = process.env.OPENSHIFT_MONGODB_DB_URL +
    process.env.OPENSHIFT_APP_NAME;
}

//creacion del modelo json
mongoose.connect(url);

var pedidoSchemaJSON = {
	type:{type:String},
	cases:{type:String},
	Ntoys:{type:String},
	refere:{type:String},
	size:{type:String},
	candy:{type:Boolean},
	toronto:{type:Boolean},
	cri:{type:Boolean},
	oreo:{type:Boolean},
	name:{type:String},
	content:{type:String},
	Prices:{type:mongoose.Schema.Types.ObjectId, ref:"Prices"}
	


};


/// implementacion del esquema con el modelo json
var pedido_schema = new mongoose.Schema(pedidoSchemaJSON);

// creaciion del usario con el esquema
var Pedido = mongoose.model("prePedido", pedido_schema);
module.exports = Pedido;