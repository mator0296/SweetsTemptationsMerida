var router = (require("express")).Router();
var Pedidos = require("../Models/prePedido");
var Prices = require("../Models/prices");
var map = new (require('hashmap'))();

var Type = {type:String};




router.get("/",function(req,res){
	console.log(req.query)
	var json={$or:[]};
	if(req.query.type1){		
		var Params = req.query.type1.split(" ");
		console.log(Params.length);
		(Params.length>1) ? json.$or.push({$or:[{type:Params[0], cases:Params[1]}]}) : json.$or.push({$or:[{type:Params[0]}]})
	}
	if(req.query.type2){	
		var Params = req.query.type2.split(" ");
		console.log(Params.length);
		(Params.length>1) ? json.$or.push({$or:[{type:Params[0], cases:Params[1]}]}) : json.$or.push({$or:[{type:Params[0]}]})
	}

	if(req.query.type3){	
		var Params = req.query.type3.split(" ");
		console.log(Params.length);
		(Params.length>1) ? json.$or.push({$or:[{type:Params[0], cases:Params[1]}]}) : json.$or.push({$or:[{type:Params[0]}]})
	}
	Pedidos.find(((req.query.type1) ? json : {})).populate('Prices').exec(function(err, pedidos){
		if(!err){
			
			res.render("galery/galery",{pedidos:pedidos});
		}else
			console.log(err);
	})

});
router.get("/new", function(req,res){
	if(req.query.type == "cakes" || req.query.type == "cupcakes"){
		Pedidos.find(req.query,function(err, prePedidos){

			if(!err){
				res.render("galery/new",{prePedidos:prePedidos, type: req.query.type});
			}else{
				console.log(err)
			}
		})
	}else{

		Pedidos.find({},function(err, prePedidos){

			if(!err){
				res.render("galery/new",{prePedidos:prePedidos, type: undefined});
			}else{
				console.log(err)
			}
		})
	}
	
	

});



router.get("/special",function(req,res){
	res.render("galery/home");
})
router.get("/cakes",function(req,res){

	res.render("galery/cakes");
});

router.get("/cupcakes",function(req,res){

	res.render("galery/cupcakes")
})



module.exports = router;