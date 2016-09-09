angular.module("MiPrimerApp",[])
    .controller("MiPrimerController",function ($scope,$http) {
        $scope.title="Listar Usuario";
        $scope.users=[];
        console.log("hola");
        $http.get("http://10.10.5.249:3300/api/usuarios")
            .success(function (data) {
                console.log(data);
                $scope.users=data;

        })
            .error(function (err) {
                
            })
        
    });