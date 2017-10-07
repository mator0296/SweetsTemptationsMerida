var mongoose = require('mongoose');
var User = require('../Models/users').User;
// Estrategia de autenticación con Twitter
//var TwitterStrategy = require('passport-twitter').Strategy;
// Estrategia de autenticación con Facebook
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// Fichero de configuración donde se encuentran las API keys
// Este archivo no debe subirse a GitHub ya que contiene datos
// que pueden comprometer la seguridad de la aplicación.
var config = require('../config');

// Exportamos como módulo las funciones de passport, de manera que
// podamos utilizarlas en otras partes de la aplicación.
// De esta manera, mantenemos el código separado en varios archivos
// logrando que sea más manejable.
module.exports = function(passport) {

	// Serializa al usuario para almacenarlo en la sesión
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	// Deserializa el objeto usuario almacenado en la sesión para
	// poder utilizarlo
	passport.deserializeUser(function(obj, done) {
		done(null, obj);
	});

	

	// Configuración del autenticado con Facebook
	passport.use(new FacebookStrategy({
		clientID: config.facebook.key,
		clientSecret: config.facebook.secret,
		callbackURL	 : '/auth/facebook/callback',
		profileFields : ['id', 'displayName', 'emails']
	}, function(accessToken, refreshToken, profile, done) {
		console.log(profile)
		
		User.findOne({email:profile.emails[0].value}, function(err, user) {

			if(err){
				done(err, null);
			}else if(user){
				done(null, user);
			}else{
				user = new User({email:profile.emails[0].value, username:profile.displayName.split(" ")[0], password:profile.displayName.split(" ")[0], name:profile.displayName.split(" ")[0], lastName:profile.displayName.split(" ")[1],car:[], buyState:{preBuy:false, state :"No Enviando",bankTo:"",bankFrom:"",refere:"", nroReference:""}})
				user.save(function(errr) {
					if(!errr)
						done(null,user);
					else
						done(errr, null)
				})
			}
		});
	}));
	passport.use(new GoogleStrategy({
		clientID: config.google.key,
		clientSecret: config.google.secret,
		callbackURL	 : '/auth/google/callback'
	}, function(accessToken, refreshToken, profile, done) {
		
		User.findOne({email:profile.emails[0].value}, function(err, user) {

			if(err){
				done(err, null);
			}else if(user){
				done(null, user);
			}else{
				user = new User({email:profile.emails[0].value, username:profile.name.givenName, password:profile.name.givenName, name:profile.name.givenName, lastName:profile.name.familyName,car:[], buyState:{preBuy:false, state :"No Enviando",bankTo:"",bankFrom:"",refere:"", nroReference:""}})
				user.save(function(errr) {
					if(!errr)
						done(null,user);
					else
						done(errr, null)
				})
			}
		});
		
	
	}));
}