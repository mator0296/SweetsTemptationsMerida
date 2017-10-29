




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