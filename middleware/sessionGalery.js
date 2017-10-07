///middleware personalizados
var User = require("../Models/users").User;
module.exports = function(req,res,next){
		req.session.user_id = undefined;
		console.log("entre aqui en middleware")
		res.redirect("/login");
		//res.redirect(req.headers.referer.substring(0,req.headers.referer.indexOf("/") ));

}