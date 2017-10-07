///middleware personalizados
var User = require("../Models/users").User;
var prePedidos = require("../Models/prePedido");

module.exports = function(req,res,next){

	if(req.originalUrl.includes("endSession")){
		req.session.user_id = undefined;
		prePedidos.find({}).populate('Prices').exec(function(err, pedidos){
			if(pedidos.length>=4){
				var num1 = 1, num2 = 1, num3 = 1 , num4 = 1;
				while((num1 == num2) || (num1 == num3) || (num1 == num4) || (num2 == num3) || (num2 == num4) || (num3 == num4) ){

					num1 = Math.floor(Math.random() * pedidos.length);
					num2 = Math.floor(Math.random() * pedidos.length);
					num3 = Math.floor(Math.random() * pedidos.length);
					num4 = Math.floor(Math.random() * pedidos.length);
					
				}
				res.locals = {temptations : [pedidos[num1], pedidos[num2],pedidos[num3],pedidos[num4]],user:undefined};
			}else if(pedidos.length>0) {

				res.locals = {temptations : pedidos,user:undefined};
			
			
			}else{
				res.locals = {temptations :undefined,user:undefined};
			}
			res.redirect('/')
		});	

	}else if(!req.session.user_id){
		if((req.originalUrl.includes("app") && !req.originalUrl.includes("prepedidos")  )|| req.originalUrl.includes("admin")){
			res.status(404).send('no tienes permitdo el paso ');
			return;
		}else{
			prePedidos.find({}).populate('Prices').exec(function(err, pedidos){
				if(!err){
					if(pedidos.length>=4){
						var num1 = 1, num2 = 1, num3 = 1 , num4 = 1;
						while((num1 == num2) || (num1 == num3) || (num1 == num4) || (num2 == num3) || (num2 == num4) || (num3 == num4) ){

							num1 = Math.floor(Math.random() * pedidos.length);
							num2 = Math.floor(Math.random() * pedidos.length);
							num3 = Math.floor(Math.random() * pedidos.length);
							num4 = Math.floor(Math.random() * pedidos.length);
							
						}
						res.locals = {temptations : [pedidos[num1], pedidos[num2],pedidos[num3],pedidos[num4]],user:undefined};
					}else if(pedidos.length>0) {

						res.locals = {temptations : pedidos,user:undefined};
					
					
					}else{
						res.locals = {temptations :undefined,user:undefined};
					}
					next();	
				}
				
			});

			

		} 
			

	}else{

		User.findById(req.session.user_id).populate("car").populate('budget.prePedido').exec(function(err, user){
			//console.log("user", user);
			//console.log(req.originalUrl)
			if(err){

				console.log(err);
				if(req.originalUrl.includes("app") || req.originalUrl.includes("admin") )
					res.status(404).send('no tienes permitdo el paso ')
				else{
					prePedidos.find({}).populate('Prices').exec(function(err, pedidos){
						if(!err){
							if(pedidos.length>=4){
								var num1 = 1, num2 = 1, num3 = 1 , num4 = 1;
								while((num1 == num2) || (num1 == num3) || (num1 == num4) || (num2 == num3) || (num2 == num4) || (num3 == num4) ){

									num1 = Math.floor(Math.random() * pedidos.length);
									num2 = Math.floor(Math.random() * pedidos.length);
									num3 = Math.floor(Math.random() * pedidos.length);
									num4 = Math.floor(Math.random() * pedidos.length);
									
								}
								res.locals = {temptations : [pedidos[num1], pedidos[num2],pedidos[num3],pedidos[num4]],user:user};
							}else if(pedidos.length>0) {

								res.locals = {temptations : pedidos,user:user};
							
							
							}else{
								res.locals = {temptations :undefined,user:user};
							}
							next();	
						}
						
					});
				}
			}else{
				prePedidos.find({}).populate('Prices').exec(function(err, pedidos){
					if(!err){
						if(pedidos.length>=4){
							var num1 = 1, num2 = 1, num3 = 1 , num4 = 1;
							while((num1 == num2) || (num1 == num3) || (num1 == num4) || (num2 == num3) || (num2 == num4) || (num3 == num4) ){

								num1 = Math.floor(Math.random() * pedidos.length);
								num2 = Math.floor(Math.random() * pedidos.length);
								num3 = Math.floor(Math.random() * pedidos.length);
								num4 = Math.floor(Math.random() * pedidos.length);
								
							}
							res.locals = {temptations : [pedidos[num1], pedidos[num2],pedidos[num3],pedidos[num4]],user:user};
						}else if(pedidos.length>0) {

							res.locals = {temptations : pedidos,user:user};
						
						
						}else{
							res.locals = {temptations :undefined,user:user};
						}
						next();	
					}
					
				});			
				//console.log(req.session)
			}
		});
		
	}

}