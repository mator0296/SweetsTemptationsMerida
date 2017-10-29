
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