
var app = angular.module("myApp",[]);

app.controller("myCtrl", function($scope,$http) {
    $scope.title="Usuarios registrados";
    $scope.title2="Registrar Usuario";
    $scope.title3="modificar Usuario";
    $scope.formData = {};
    /*$scope.firstName = "John";
    $scope.lastName= "Doe";*/
    $http.get('/api/usuarios')
        .success(function(data) {
            $scope.users = data;
            console.log(data)
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
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
    $scope.deleteUsuario = function(id) {
        $http.delete('/api/usuarios/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
    $scope.updateUsuario = function(id) {
        $http.post('/api/usuarios/modificar', $scope.formData)
            .success(function(data){
                $scope.formData = {};
                $scope.todos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
});
