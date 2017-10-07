var route = (require("express")).Router();
var Pedidos = require("../Models/pedido");
var prePedidos = require("../Models/prePedido");
var SearchPedido = require("../middleware/Search_pedido");
var formidable = require('formidable');
var mv = require('mv');
var fs = require('fs');
var SendEmail = require("../Public/javaScript/EmailSend/SendGmail");
var SearchPrePedido = require("../middleware/SearchPrePedido");
route.all("/prepedidos/:id*", SearchPrePedido);


route.all("/pedidos/:id*", SearchPedido);
route.get("/",function(req,res){
	res.render("app/home");
});


route.route("/prepedidos/:id")
	.get( function(req,res) {
	
		res.render('app/pedidos/showPre', {add:(req.query.op== 'add')});

		
	})
	.delete(function(req, res) {
		res.locals.user.budget = res.locals.user.budget.filter(function(current){
				return !(current.prePedido._id.toString() === res.locals.prePedido._id.toString()) ;
		});
		res.locals.user.buyState.state = undefined;
		res.locals.user.buyState.preBuy=false;
		res.locals.user.save(function(err, save){
			if(!err){

				res.redirect("/app/pedidos");
			}


		})	
	})
route.get("/pedidos/:id/edit", function(req,res){
	res.render("app/pedidos/edit");
});



route.get("/pedidos/valide", function(req,res){
	res.render("app/pedidos/validate");
});

route.post("/addprepedidos", function(req,res){
		
	res.locals.user.budget.push({prePedido:req.body.id, price:req.body.price, flavorCake:req.body.flavorCake,flavorCream:req.body.flavorCream})
	res.locals.user.buyState.state = undefined;
	res.locals.user.buyState.preBuy = false;
	res.locals.user.save(function(err, pedido){
		if(!err){

			res.status(200).send({result:'success' , url:"/app/pedidos"})
		}else{
			console.log(err)
		}

	})	

});

route.get("/addprepedidos", function(req,res){
	console.log(req.query)
})


route.post("/pedidos/valide",function(req,res){

	var form = new formidable.IncomingForm();
	form.parse(req,function(err,fields,files){

		if(!res.locals.user.buyState.preBuy){
			res.locals.user.buyState.preBuy = true;
			res.locals.user.buyState.from=fields.from;
			res.locals.user.buyState.to=fields.to;
			res.locals.user.buyState.addres=fields.addres;
			res.locals.user.buyState.phoneNumber=fields.phoneNumber;
			res.locals.user.buyState.pay = fields.pay;
			res.locals.user.buyState.date=new Date(fields.date);
			res.locals.user.buyState.clock= fields.clock;
			SendEmail("Pedido enviado" , "sweettemptations18@gmail.com" , 'revisar pedidos');

			if(res.locals.user.buyState.state != "Pago validado" && res.locals.user.buyState.state != "Validando pago")
				res.locals.user.buyState.state = undefined;
			res.locals.user.save(function(err, user){
				if(!err){
					res.redirect("/app/pedidos");
				}else{
					res.redirect("/login");
				}

			})
		}else{
			if(!err){
				if(res.locals.user.buyState.state == "Validado"){
					res.locals.user.buyState.state = "Validando pago";
					res.locals.user.buyState.bankFrom = fields.bankFrom;
					res.locals.user.buyState.bankTo = fields.bankTo;
					res.locals.user.buyState.nroReference = fields.nroReference;


					mv(files.refere.path,"Public/ImagesPay/"+ res.locals.user._id+ "." +files.refere.type.split("/").pop(),
						function(err){
							if(!err){
								res.locals.user.buyState.refere = "Public/ImagesPay/"+res.locals.user._id+ "." +files.refere.type.split("/").pop();
								res.locals.user.save(function(err,user){
									if(!err){
										SendEmail("Pago enviado" , "sweettemptations18@gmail.com" , 'revisar pedidos');
										res.status(200).send({result:'success' , url:"/app/pedidos"})	
									}else{
										res.redirect("/pedidos");
									}
								})
							}else{
								console.log(err)
							}
					});


				}


			}else{
				console.log(err);
			}
		}
	});

})	;


route.route("/pedidos/:id")
	.get(function(req, res){

		res.render('app/pedidos/show', {add:(req.query.op== 'add')});
	})
	.put(function(req,res){
				if(req.body.from)
					res.locals.pedido.from = req.body.from;
				if(req.body.to)
					res.locals.pedido.to = req.body.to;
				if(req.body.addres)
					res.locals.pedido.addres = req.body.addres;
				if(req.body.pay)
					res.locals.pedido.pay = req.body.pay;

				//pedido.date = req.body.date;
				res.locals.pedido.save(function(err){
					if(!err){
						res.locals.user.buyState.preBuy=false;
						res.locals.user.save(function(error){
							if(!err){
								res.render("app/pedidos/show");
							}

						});
					}
					else{
						console.log(err);
						res.rendirect("/pedidos");
					}
				});



	})
	.delete(function(req,res){

		if(res.locals.pedido.refereDelete)
			fs.unlinkSync(res.locals.pedido.refere);

		res.locals.user.car = res.locals.user.car.filter(function(current){
			return current._id.toString() !== res.locals.pedido._id.toString();
		});
		res.locals.user.buyState.state = undefined;
		res.locals.user.buyState.preBuy=false;
		res.locals.user.save(function(err, save){
			if(!err){
				res.locals.pedido.remove();
				res.redirect("/app/pedidos");
			}


		})




	});

route.route("/pedidos")
	.get(function(req,res){
		
		res.render("app/pedidos/pedidos");
			
	})
	.post(function(req,res){

	var callbackEspecial = function(err, pedido){
		if(!err){
			//res.locals.user.car.pop();
			res.locals.user.car.push(pedido._id);
			res.locals.user.buyState.state = undefined;
			res.locals.user.buyState.preBuy = false;
			res.locals.user.save(function(err,user){
				if(!err){
					res.status(200).send({result:'success' , url:"/app/pedidos"})

				}else{

					console.log(err)
				}


			})
		}

		}
	var form = new formidable.IncomingForm();

	form.parse(req,function(err,fields,files){

		var type , cases, name;
		if((fields.type.includes('one') || fields.type.includes('two')) && !fields.type.includes('3') ){
			type=fields.type.substr(3);
			cases= fields.type.substr(0,3);
		}else {
			type = "cakes";
			cases = fields.type;
		}


		if(type=='cakes'){
			name = 'Torta ';
		}else{
			name = 'Cupcake '
		}

		name += 'de ' + flavorCake;
		var pedidos = new Pedidos({ creator:res.locals.user._id,type:type,name:name, cases:cases, flavorCream:fields.flavorCream, flavorCake: fields.flavorCake, cri:(fields.cri == 'on'),
					candy : (fields.candy == 'on'),
					toronto : (fields.toronto == 'on'),
					oreo : (fields.oreo == 'on') , refere: fields.img.replace("/stactic" , "Public"), refereDelete:false, content:fields.content, pedidoValid:false});
		if(files.refere.size > 0){
			mv(files.refere.path,"Public/Images/"+pedidos._id+ "." +files.refere.type.split("/").pop(), {mkdirp: true} ,function(err){

					pedidos.refere = "Public/Images/"+pedidos._id+ "." +files.refere.type.split("/").pop();
					pedidos.refereDelete = true;
					pedidos.save(callbackEspecial);
					})


		}else{
			pedidos.save(callbackEspecial)
		}

	});
});


module.exports = route;