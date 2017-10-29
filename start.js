var app = (require("express"))();
var bodyparse = require("body-parser");
var User = require("./Models/users").User;
var session = require("cookie-session");
var router = require("./Routes/route_app");
var router_galery = require("./Routes/router_galery");
var router_admin = require("./Routes/route_admin");
var methodOverride = require("method-override");
var formidable = require('formidable');
var SendEmail = require("./Public/javaScript/EmailSend/SendGmail");
var passport = require('passport');
require('./middleware/passport')(passport);


var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";





app.use(passport.initialize());
app.use(passport.session());  
app.use(methodOverride("_method"));

app.use(bodyparse.json());
app.use(bodyparse.urlencoded({extended:true}));//el body parse para leer los datos del documento
app.use("/stactic", require("express").static("Public"));//la carpeta donde se guardan los documentos staticos
app.use(session({
  name:"session",//clave secreta de sesion
  keys:["key1", "key2"]


}));


///estoy pasandole un middleware porlo que cada vez que alguien entre por /app el va a hacer lo que esta ahi antes de lo demas
app.use("/", require("./middleware/session"));
//app.use("/endSession",require("./middleware/sessionGalery") )
//app.use("/admin", require("./middleware/session"));
//app.use("/galery", require("./middleware/sessionGalery"));
///estoy creado una ruta modular es decir que cada vez que alguien coloque app se va a buscar en router no en este .js

app.use("/app", router);
app.use("/galery",router_galery);
app.use("/admin",router_admin);
app.set("view engine","jade");//donde decimos que usamos jade

app.get('/auth/facebook', passport.authenticate('facebook',{ scope: ['email']}));

app.get('/auth/facebook/callback', passport.authenticate('facebook'), function(req, res){
    req.session.user_id = req.user._id;
    res.redirect("/")
})

app.get('/auth/google', passport.authenticate('google',{ scope: ['email', 'profile']}));

app.get('/auth/google/callback', passport.authenticate('google'), function(req, res){

    req.session.user_id = req.user._id;
    res.redirect("/")
})
app.get("/contact",function(req,res){
  res.render("contact")
});
app.get("/FAQ",function(req,res){
  res.render("FAQ")
});
app.get("/about",function(req,res){
  res.render("about")
});
app.post("/contact",function(req,res){
var form = new formidable.IncomingForm();

  form.parse(req,function(err,fields,files){
    SendEmail("Contact", "sweettemptations18@gmail.com",{name:fields.name,number:fields.number, email:fields.mail, content:fields.content},req);
  })
})

app.get("/",function(req,res){
  res.render("index");
  User.find({}, function(err, users){
    //console.log(users)
  })
});
app.get("/home",function(req,res){
  res.render("index");
});



app.post("/register", function(req,res){
  
 var form = new formidable.IncomingForm();
  form.parse(req,function(err,fields,files){

    User.findOne({email:fields.email},function(err,users) {
      if(users){
        res.status(404).send('usuario ya existe');
        
        return;
      }else{
        var user = new User({username:fields.username,name:fields.name, lastname:fields.lastName,email:fields.email,birdDate:new Date(fields.date), gender:fields.gender, password:fields.password,car:[], buyState:{preBuy:false, state :"No Enviando",bankTo:"",bankFrom:"",refere:"", nroReference:""}});

        user.save(function(error, user){

          if(error){


            res.status(404).send('Usuario no encontrado');
            return;
          }else{
            if(user.name === "admin" && user.password === "admin" && user.email === "sweettemptations18@gmail.com"){
              putList();
              req.session.user_id=user._id;
              res.status(200).send({result:'success' , url:"/admin/pedidos"})
              return;
            }  
            req.session.user_id=user._id;
            res.status(200).send({result:'success' , url:"/"})
            console.log(user)
          }
        }); 

      }
    })
})    
  
});

app.post("/login", function(req,res){
 User.findOne({email:req.body.email,password:req.body.password},function(err,doc){
    if(doc){
      if(doc.name === "admin" && doc.password === "admin" && doc.email === "sweettemptations18@gmail.com"){
        req.session.user_id=doc._id;
        res.status(200).send({result:'success' , url:'/admin/'})
        return;
      }
      req.session.user_id = doc._id;
      res.status(200).send({result:'success' , url:'/app/pedidos'})
    }else{

      res.status(404).send( "no hay usuario")
    }

    
  })
  
  /*User.findOneAndRemove({username:req.body.email},function(err){
      if(!err){
        console.log("lo elimino")
        res.redirect("/login");

      }else{
        console.log("no lo elimino")
        res.redirect("login");
        

      }

    })*/


  
});

app.get("/login",function(req,res){
  
  res.render("login");
 



});

app.get("/register",function(req,res){

  User.find({}, function(err, users){
    if(!err){
      res.render("register",{users: users});
    }else{
      res.redirect("/")
    }

  
  })

 


});


var server_port =  process.env.OPENSHIFT_NODEJS_PORT || 8080,
    server_ip_address   =  process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    

app.listen(server_port, server_ip_address, function(){
  console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});
