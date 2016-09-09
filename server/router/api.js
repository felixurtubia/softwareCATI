//Dependecies
var express = require('express');
var router= express.Router();
var mysql = require('mysql');
var url = require('url');
//var Usuario = require('../models/usuario.js');
//var Rol= require('../models/rol.js');
//var Usuario= require('../models/usuario.js');
var models  = require('../models');



// Routes
/*router.get('/usuarios', function(req,res){
	res.send('api esta funcionando');
});*/

/*router.get('/', function(req,res){
	res.render('api', {title: 'Mi primer Aplicacion Web'});
});*/

//Return router
module.exports = router;


//GET usuarios
router.get('/usuarios', function(req, res, next) {
	try {
		/*var query = url.parse(req.url,true).query;
		 console.log(query);*/
		models.Usuario.findAll().then(function (user) {
			//for(var x=0;x<user.length;x++){
			//console.log(user[x].username);
			//res.render('VerUsuario.html', {title: 'Listar Usuarios', resultado: user});
			res.json(user);
			//}
		});
		//res.render('VerUsuario.html', {title: 'Listar Usuarios'});
	} catch (ex) {
		console.error("Internal error:" + ex);
		return next(ex);
	}
});
//GET un usuario con id determinado
router.get('/usuarios/:id', function(req, res, next) {
	try {
		//var query = url.parse(req.url,true).query;
		//console.log(query);
		console.log(req.params.id);
		models.Usuario.findAll({
			where: {
				id: req.params.id
			}
		}).then(function (user) {
			//for(var x=0;x<user.length;x++){
			//console.log(user[x].username);
			//console.log(user.get('username'));
			res.json(user);
			//}
		});
	} catch (ex) {
		console.error("Internal error:" + ex);
		return next(ex);
	}
});
//POST crear proyecto
router.post('/proyectos',function (req,res,next) {
	try{
		console.log(req.body.nombre);
		models.Proyecto.create({
			nombre: req.body.nombre,
			creador: req.user.email,
		});
		res.render('proyectos.html', {
			user :req.user
			
		})
	}
	catch(ex){
		console.error('No se pudo crear proyecto:' +ex);
		return next(ex)
	}
})

//POST crear usuario
router.post('/usuarios', function(req,res,next){
try{
	console.log(req.body.permiso);
	var resultado=[];
	models.Usuario.create({
		username: req.body.username,
		password: req.body.password,
		email: req.body.email
	}).then(function (user) {
		models.Rol.create({
			permiso: req.body.permiso,
			UsuarioId: user.id
		}).then(function (rol) {
			resultado.push(user);
			resultado.push(rol);
			res.json(resultado);
		});
	});
	}
	catch(ex){
	console.error("Internal error:"+ex);
	return next(ex);
	}
});

router.put('/usuarios/:id', function(req,res,next){
	try{

		models.Usuario.findOne({ where: {id:req.params.id} }).then(function (user) {
			//for(var x=0;x<user.length;x++){
			//console.log(user.username);
			if(req.body.username){
				if(req.body.email) {
					user.updateAttributes({
						username: req.body.username,
						email: req.body.email
					}).then(function (result) {
						res.json(result);
					})
				}
				else {
					user.updateAttributes({
						username: req.body.username
					}).then(function (result) {
						res.json(result);
					})
				}

			}
		});
	}
	catch(ex){
		console.error("Internal error:"+ex);
		return next(ex);
	}
});

router.delete('/usuarios/:id', function(req,res,next){
	try{
		models.Usuario.destroy({where: {id: req.params.id} }).then(function () {
			return models.Usuario.findAll().then(function (user) {
				res.json(user);
			})
		})
	}
	catch(ex){
		console.error("Internal error:"+ex);
		return next(ex);
	}
});

