

module.exports = function(app, passport) {

    app.get('/', function (req, res) {
        res.render('index.html', {title: 'Departamento de Industrias?',message: req.flash('Message')});
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


//DASHBOARD USUARIO Y ADMIN
    app.get('/dashboard', isLoggedIn, function(req, res) {
        if(req.user){
            if(req.user.privileges){
                res.render('dashboardAdmin.html',{
                    user : req.user
                });
            }else{
                res.render('dashboardUser.html',{
                    user : req.user
                });
            }
        }
    });

//LOGOUT
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    
//PROYECTO
    app.get('/proyecto/:id', isLoggedIn, function (req,res) {
        if (req.user.privileges)
            res.render("proyectoAdmin.html", {
                user:req.user,
                id: req.params.id
            });
        else
            res.render("proyectoUser.html",{
                user :req.user,
                id: req.params.id
            });
    });

//PESTAÑA PROYECTOS
    app.get('/proyectos',isLoggedIn, function (req,res) {
        if (req.user.privileges)
            res.render("proyectosAdmin.html", {
                user:req.user
            });
        else
            res.render("proyectosUser.html",{
                user :req.user
            });
    });

    //VISTA NUEVO proyecto
    app.get('/CrearProyecto', isLoggedIn, isAdmin, function (req, res) {
        res.render('CrearProyecto.html', {
            title: 'Crear Proyecto',
            user : req.user
        });
    });
/*PESTAÑA MODIFICAR PROYECTO*/
    app.get('/modificarProyecto/:id', isLoggedIn, isAdmin, function (req, res) {
        res.render('modificarProyecto.html',{id : req.params.id,user : req.user});
    });


//PESTAÑA USUARIOS
    app.get('/usuarios', isLoggedIn, isAdmin,function (req,res) {
        res.render('usuarios.html',{
            user : req.user
        });
    });

//VISTA NUEVO USUARIO
    app.get('/crearUsuario', isLoggedIn, isAdmin, function (req, res) {
        res.render('crearUsuario.html', {
            title: 'Registrar Usuarios',
            user : req.user
        });
    });

//VISTA MODIFICAR USUARIO
    app.get('/modificarUsuario/:id', isLoggedIn, isAdmin, function (req,res) {
        res.redirect('../api/modificarUsuario/'+req.params.id);
    });

//VISTA SUBIR ARCHIVO
    app.get('/upload',isAdmin, isLoggedIn, function (req,res) {
        res.render('SubirArchivo.html', {
            user: req.user
        });
    });

//VISTA VER CONTACTO
    app.get('/contacto', isLoggedIn, isAdmin,function (req,res) {
        res.render('contacto.html',{
            user : req.user
        });
    });

//VISTA VER AUDIOS
    app.get('/audios', isLoggedIn, isAdmin,function (req,res) {
        res.render('audios.html',{
            user : req.user
        });
    });

    app.get('/encuesta', isLoggedIn, isAdmin,function (req,res) {
        res.render('cargarEncuesta.html',{
            user : req.user
        });
    });


};



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