var Pedidos = require("../Models/pedido");
module.exports = function(req,res,next){
	if(req.params.id == "new" || req.params.id == "valide" || req.params.id == "notvalide"){
		next();
		return;
	}
	Pedidos.findById(req.params.id)
			.populate("creator")
			.exec( function(err, pedido){
				if(!err){
					res.locals.pedido = pedido;
					console.log(pedido)
					next();
				}else{
					console.log(err);
				}
			});

}