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

//MODIFICAR USUARIO
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

//ELIMINAR USUARIO
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
