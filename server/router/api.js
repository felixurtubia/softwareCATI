//Dependecies
var express = require('express');
var router= express.Router();
var mysql = require('mysql');
var url = require('url');
//var Usuario = require('../models/usuario.js');
//var Rol= require('../models/rol.js');
//var Usuario= require('../models/usuario.js');
var models  = require('../models');

//PARA EL CSV
var fs = require('fs');
var parse = require('csv-parse');
var path = require('path');
var busboy = require('connect-busboy');

// Routes

//Return router
module.exports = router;

//Crear proyecto
router.post('/proyectos', isLoggedIn, isAdmin,function (req,res,next) {
    try{
        console.log(req.body.nombre);
        models.Proyecto.create({
            nombre: req.body.nombre,
            creador: req.user.email,
        });
        res.render('proyectosAdmin.html', {
            user :req.user,
            confirmation: req.flash('info','MENSAJE ES UN TOODO AAAAA'),
            failureFlash : true
        })
    }
    catch(ex){
        console.error('No se pudo crear proyecto:' +ex);
        return next(ex)
    }
});

//Modificar Proyecto
router.post('/modificarProyecto/:id', isLoggedIn, isAdmin,function(req,res,next){
    try{
        models.Proyecto.findOne({
            where: {
                id:req.params.id
            }
        }).then(function(proyecto) {
            proyecto.updateAttributes({
                nombre: req.body.nombre
            });
        });
        res.redirect('/proyectos');
    }
    catch(ex){
        console.error("Internal error:"+ex);
        return next(ex);
    }
});

//Eliminar Proyecto
router.delete('/proyectos/:id', isLoggedIn, isAdmin, function(req,res,next){
    try{
        models.Proyecto.destroy({where: {id: req.params.id} }).then(function () {
            return models.Proyecto.findAll().then(function (proyecto) {
                res.json(proyecto);
            })
        })
    }
    catch(ex){
        console.error("Internal error:"+ex);
        return next(ex);
    }
});

//Obtener proyectos
router.get('/proyectos', isLoggedIn, function(req, res, next) {
    try {
        models.Proyecto.findAll({
            attributes: ['id', 'nombre']
        }).then(function (user) {
            res.json(user);
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});

//Obetener usuarios
router.get('/usuarios', isLoggedIn, function(req, res, next) {
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

//Obtener un usuario con id determinado
router.get('/usuarios/:id', isLoggedIn, function(req, res, next) {
	try {
		//var query = url.parse(req.url,true).query;
		//console.log(query);
		console.log(req.params.id);
		models.Usuario.findAll({
			where: {
				id: req.params.id
			}
		}).then(function (user) {
			res.json(user);
		});
	} catch (ex) {
		console.error("Internal error:" + ex);
		return next(ex);
	}
});

//Crear usuario
router.post('/usuarios', isLoggedIn, isAdmin, function(req,res,next){
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

//Buscar un usuario para ser modificado
router.get('/modificarUsuario/:id', isLoggedIn, isAdmin,function (req,res,next) {
    try{
        models.Usuario.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (usuario) {
            res.render('modificarUsuario.html',{resultado: usuario, title:"modificar Usuario",user : req.user});
        })
    } catch(ex) {
        console.error("Internal Error:" + ex);
        return next(ex);
    }
});

//MODIFICAR USUARIO
router.post('/modificarUsuario/:id', isLoggedIn, isAdmin,function(req,res,next){
    try{
        models.Usuario.findOne({
            where: {
                id:req.params.id
            }
        }).then(function(user) {
            user.updateAttributes({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            });

        });
        res.redirect('/usuarios');
	}
	catch(ex){
		console.error("Internal error:"+ex);
		return next(ex);
	}
});

//ELIMINAR USUARIO
router.delete('/usuarios/:id', isLoggedIn, isAdmin, function(req,res,next){
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

//SUBIR Y LEER ARCHIVO CSV (USO DE BUSBOY)
router.use(busboy());
router.post('/upload',function (req,res,next) {
    try{
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {

            /*console.log("Uploading: " + filename);
             console.log("DirName: " + __dirname);
             console.log("fieldname: " +fieldname);*/

            // Se crea en router/files con el nombre del archivo
            fstream = fs.createWriteStream(__dirname + '/files/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                var csvData=[];
                fs.createReadStream(__dirname + '/files/' + filename)
                    .pipe(parse({delimiter: ','}))
                    .on('data', function(csvrow) {
                        //console.log(csvrow[0]);
                        //Agrega por fila a la base de datos
                        models.Contacto.create({
                            name: csvrow[0],
                            lastname: csvrow[1],
                            number: csvrow[2],
                            state: csvrow[3]
                        });

                        csvData.push(csvrow);
                    })
                    .on('end',function() {
                        //do something wiht csvData
                        //CsvData es un arreglo de arreglos
                    });
                res.redirect('/upload');
            });
        });
    }
    catch(ex){
        console.error('No se pudo leer archivo:' +ex);
        return next(ex)
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