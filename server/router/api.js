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

//Return router
module.exports = router;

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

//GET usuarios
router.get('/usuarios', function(req, res, next) {
	try {
		/*var query = url.parse(req.url,true).query;
		 console.log(query);*/
		models.Usuario.findAll({
		    where: {
		        privileges: false
            }
        }).then(function (user) {
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

//POST crear usuario
router.post('/usuarios', function(req,res,next){
    try{
        models.Usuario.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            privileges: false
        });
    }
    catch(ex){
        console.error("Internal error:"+ex);
        return next(ex);
    }
});

router.post('/modificarUsuario', isLoggedIn, isAdmin, function (req,res) {
    res.redirect('/modificarUsuario', {
        title: 'Modificar Usuario',
        user: req.user,
        id: req.body.id
    })
});

router.post('/usuario_u', function(req,res,next){
    try{
        models.Usuario.findOne({ where: {id:req.body.id} }).then(function(user) {
                    if(req.body.username != null){
                        if(req.body.email != null) {
                            if(req.body.password != null){
                                user.updateAttributes({
                                    username: req.body.username,
                                    email: req.body.email,
                                    password: req.body.password
                                })
                            }
                            user.updateAttributes({
                                username: req.body.username,
                                email: req.body.email
                            })
                        }
                        else {
                            user.updateAttributes({
                                username: req.body.username
                            })
                        }

                    }
                    else if (req.body.email != null) {
                        if (req.body.password != null) {
                            user.updateAttributes({
                                email: req.body.email,
                                password: req.body.password
                            })
                        }
                        else {
                            user.updateAttributes({
                                email: req.body.password
                            })
                        }
                    }
                    else {
                        user.updateAttributes({
                            password: req.body.password
                        })
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

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
function isAdmin(req, res, next){
    if (req.user.privileges)
        return next();
    res.redirect('..');
}