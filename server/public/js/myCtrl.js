
var app = angular.module("myApp",[]);

app.controller("controladorUsuarios", function($scope,$http) {
    $scope.title="Usuarios registrados";
    $scope.title2="Registrar Usuario";
    $scope.title3="modificar Usuario";
    $scope.formData = {};

    $http.get('/api/usuarios')
        .success(function(data) {
            $scope.users = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $scope.getUsuario = function(id) {
        $http.get('/api/usuarios/' + id)
            .success(function(data){
                $scope.user = data;
                console.log(data)
            })
            .error(function (data) {
                console.log('Error: ' + data)
            });
    };
    $scope.crearUsuario = function(){
        $http.post('/api/usuarios', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
    $scope.eliminarUsuario = function(id) {
        $http.delete('/api/usuarios/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
});
app.controller("controladorProyectos", function ($scope,$http) {
    $scope.formData = {};
    $http.get('/api/proyectos')
        .success(function(data) {
            $scope.proyectos = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.crearProyecto = function(){
        $http.post('/api/proyectos', $scope.formData)
            .success(function (data) {
                $scope.formData = {};
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
    $scope.elimiarProyecto = function (id) {
        $http.delete('/api/proyectos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
/*
    $scope.modificarProyecto = function () {
        console.log($scope.idProyecto);
        $http.post('/api/modificarProyecto/' + $scope.idProyecto, $scope.informacion)
            .success(function (data) {
                $scope.formData = {};
                $scope.idProyecto = -1;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    }
*/

});