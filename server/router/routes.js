/**
 * Created by famancil on 21-08-16.
 */

module.exports = function(app, passport) {

    app.get('/', function (req, res) {
        res.render('index.html', {title: 'Departamento de Industrias?'});
    });

    /*app.get('/prueba', function (req, res) {
        res.render('prueba.html');
    });*/

    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.html', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.html', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

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

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    app.get('/proyectos',isLoggedIn, isAdmin, function (req,res) {
         res.render('proyectos.html', {
            user :req.user
        })
    });

    app.get('/usuarios', isAdmin,function (req,res) {
        res.render('usuarios.html');
    });
    app.get('/verUsuario', function (req, res) {
        if(req.user.privileges) res.render('VerUsuario.html');
    });

    app.get('/crearUsuario', function (req, res) {
        if (req.user.privileges) res.render('CrearUsuario.html', {title: 'Registrar Usuarios'});
    });
}

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