

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

//PESTAÑA PROYECTOS
    app.get('/proyectos',isLoggedIn, isAdmin, function (req,res) {
         res.render('proyectos.html', {
            user :req.user
        })
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
    app.post('/modificarUsuario', isLoggedIn, isAdmin, function (req,res) {
        res.render('modificarUsuario.html', {
            title: 'Modificar Usuario',
            user: req.user,
            id: req.body.id
        });
    });

    app.get('/upload',isAdmin, isLoggedIn, function (req,res) {
        res.render('SubirArchivo.html', {
            user: req.user
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