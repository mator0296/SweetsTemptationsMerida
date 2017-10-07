var route = (require("express")).Router();
var Pedidos = require("../Models/pedido");
var prePedidos = require("../Models/prePedido");
var User = require("../Models/users").User;
var SearchPedido = require("../middleware/Search_pedido");
var SearchPrePedido = require("../middleware/SearchPrePedido");
var Type = {type:String,cases:String};
var formidable = require('formidable');
var fs = require('fs');
var mv = require('mv');
var SendEmail = require("../Public/javaScript/EmailSend/SendGmail");
var Prices = require("../Models/prices");
var putList = require ('../middleware/Filed');
route.all("/pedidos/:id*", SearchPedido);
route.all("/prepedidos/:id*", SearchPrePedido);
route.get("/",function(req,res){
	res.render("admin/home");

});

route.get("/pedidos/:id/edit", function(req,res){
	res.render("admin/pedidos/edit");
});
route.get("/prepedidos/new" , function(req,res){
	res.render("admin/pedidos/new")
})
route.post("/askcakes", function(req,res){
	//putList();
	Prices.find({}, function(err, prices){
		for (var i = 0; i < prices.length; i++) {
			prices[i].remove();
		}
	});
	
	var form = new formidable.IncomingForm();

		form.parse(req,function(err,fields,files){
			mv(files.refere.path,"Public/data/tortas.xlsx",{mkdirp: true}, function(err){
				if(!err){

					putList();
			       	prePedidos.find({}, function(err, pedidos){
							Prices.find({}, function(err, prices){
								if(!err && prices){
									
									for(i in pedidos){
										for(j in prices){
											if(pedidos[i].size == prices[j].size && pedidos[i].type == prices[j].type && pedidos[i].cases == prices[j].cases ){
												pedidos[i].Prices = prices[j]._id;
												pedidos[i].save(function(err, pedido) {
													console.log(pedido)
												});
											}
										}
									}	
								}
								res.redirect('/admin/pedidos')
							})
						
					})		
				}else{
					console.log(err)
				}
			})
		})

})
route.route("/prepedidos/:id")
	.get(function(req,res){		
		res.render("admin/pedidos/preShow");	
	})
	.put(function(req,res){
				//pedido.date = req.body.date;
				res.locals.prePedido.save(function(err){
					if(!err){
						res.render("admin/pedidos/show");
					}
					else{
						console.log(err);
						res.rendirect("/pedidos");
					}
				});
				
			

	})
	.delete(function(req,res){
		

		//fs.unlinkSync(res.locals.prePedido.refere);
		res.locals.prePedido.remove();
		res.redirect("/admin/pedidos");
			


	});

route.route("/pedidos/:id")
	.get(function(req,res){		
		console.log("LLegue aqui a show")
				res.render("admin/pedidos/show");	
	})
	.put(function(req,res){

				res.locals.pedido.from = req.body.from;
				res.locals.pedido.to = req.body.to;
				res.locals.pedido.addres = req.body.addres;
				res.locals.pedido.pay = req.body.pay;
				//pedido.date = req.body.date;
				res.locals.pedido.save(function(err){
					if(!err){
						res.render("admin/pedidos/show");
					}
					else{
						console.log(err);
						res.rendirect("/pedidos");
					}
				});
				
			

	})
	.delete(function(req,res){


		fs.unlinkSync(res.locals.pedido.refere);
		fs.unlinkSync(res.locals.pedido.buyState.refere);
				
		res.locals.pedido.remove();
		res.redirect("/admin/pedidos");
			


	});
route.post("/pedidos/valide",function(req,res){
		
		User.findById(req.body.id).populate('car').exec(function(err,user){

			if(!err){
				if(!user.buyState.state){
						user.buyState.state = "Validado"
						for (var i = user.car.length - 1; i >= 0; i--) {

							user.car[i].price = req.body.prices[i];
							user.car[i].pedidoValid = true;
							user.car[i].save(function(err) {
							})

						}
					SendEmail("Pedido Validado", user.email, 'hemos Validado su pedido, esta listo para el pago en las cuentas que encontrara en nuestra pagina');
				}else if (user.buyState.state == "Validando pago"){
					user.buyState.state = "Pago validado"
					SendEmail("Pago validado", user.email, 'hemos Validado su pago su pedido esta listo el dia acordado estaremos ahi para endulzar sus fiestas');
				}
				user.save(function(err,user){
					if(!err){
						res.status(200).send({result:'success' , url:"/app/pedidos"})
						//res.redirect("/admin/pedidos/")
					}
				})
			}
		})
		

	});
route.post("/pedidos/notvalide",function(req,res){
	
		
		User.findById(req.body.id).populate('car').exec(function(err,user){

			if(!err){
				if(!user.buyState.state){
						user.buyState.preBuy = false;
						

					SendEmail("Pedido no Validado", user.email, 'No hemos Validado su pedido, debido a que:' + req.body.msj );
				}else if (user.buyState.state == "Validando pago"){
					user.buyState.state = "Validado"
					SendEmail("Pago no validado", user.email, 'No hemos Validado su pago debido a que:' + req.body.msj);
				}
				user.save(function(err,user){
					if(!err){
						res.status(200).send({result:'success' , url:"/app/pedidos"})
						//res.redirect("/admin/pedidos/")
					}
				})
			}
		})
		

	});
route.route("/pedidos")
	.get(function(req,res){
		User.find({}).populate("car").populate('budget.prePedido').exec(function(err,user){
			if(!err){
				prePedidos.find({},function(err,prePedidos){
					if(!err){
						res.render("admin/pedidos/pedidos",{users:user, prePedidos:prePedidos});
					}
				})
				
			}else{
				res.redirect("/")
			}

		})
		
	})
	.post(function(req,res){
		var form = new formidable.IncomingForm();

		form.parse(req,function(err,fields,files){

		var type;
		var cases
		if((fields.type.includes('one') || fields.type.includes('two')) && !fields.type.includes('3') ){
			type=fields.type.substr(3);
			cases= fields.type.substr(0,3);
		}else {
			type = "cakes";
			cases = fields.type;
		}
		var pedidos = new prePedidos({ name: fields.name, type:type, cases:cases, cri : (fields.cri == 'on'), size:fields.size, content:fields.content,
					candy : (fields.candy == 'on'),
					toronto : (fields.toronto == 'on'),
					oreo :(fields.oreo == 'on'), cri: (fields.cri == "on"), Ntoys:fields.Ntoys});

		mv(files.refere.path,"Public/ImagesPre/"+pedidos._id+ "." +files.refere.type.split("/").pop(),{mkdirp: true}, function(err){
			if(!err){
				pedidos.refere = "Public/ImagesPre/"+pedidos._id+ "." +files.refere.type.split("/").pop();
				Prices.findOne({size:pedidos.size,cases:pedidos.cases,type:pedidos.type}, function(err, prices) {
					console.log("pedidos.type", pedidos.type);
					console.log("pedidos.cases", pedidos.cases);
					console.log("pedidos.size", pedidos.size);
					
						if(!err && prices){
							console.log("prices", prices);
							pedidos.Prices = prices._id;
							pedidos.save(function(err, pedido){
								if(!err){
									res.redirect("/galery");
								}else
									console.log(err)
							});
						}else{	
							console.log(err)
						}

							
				})
						
				
			}else
				console.log(err)


		})
		

		});
		
				
	});

module.exports = route;