/**
 * Created by famancil on 23-08-16.
 */
var app = angular.module("myApp",[]);

app.controller("myCtrl", function($scope,$http) {
    $scope.title="Listar Usuario";
    $scope.title2="Registrar Usuario";
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
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
});
/*app.controller("mysCtrl", function($scope,$http) {
    //$scope.title = "Listar Usuario";
    $scope.title2 = "Registrar Usuario";
});*/