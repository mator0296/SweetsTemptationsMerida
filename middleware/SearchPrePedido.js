var Pedidos = require("../Models/prePedido");
module.exports = function(req,res,next){
	if(req.params.id == "new" || req.params.id == "valide" || req.params.id == "notvalide"){
		next();
		return;
	}
	Pedidos.findById(req.params.id).populate('Prices').exec( function(err, pedido){
				if(!err){
					res.locals.prePedido = pedido;
					next();
				}else{
					console.log(err);
				}
			});

}