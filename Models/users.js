




  var mongoose = require('mongoose');

 var url = '127.0.0.1:27017/' + process.env.OPENSHIFT_APP_NAME;

// if OPENSHIFT env variables are present, use the available connection info:
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    url = process.env.OPENSHIFT_MONGODB_DB_URL +
    process.env.OPENSHIFT_APP_NAME;
}

//creacion del modelo json
mongoose.connect(url);


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