angular.module('karolaj')
    .controller('PatternController', function ($scope) {
      $scope.colors=[];
      $scope.remove = function(idx){
        console.log($scope.colors[idx]);
        $scope.colors.splice(idx,1)
      };
      $scope.add = function(){
        $scope.colors.push("#aaaaaa");
        console.log($scope.colors);
        //$scope.remove();
      };
    });

