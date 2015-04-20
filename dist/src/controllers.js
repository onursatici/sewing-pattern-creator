angular.module('karolaj')
    .controller('PatternController', function ($scope) {
      $scope.colors=[];
      $scope.show = function(){
        $scope.display = true;
      };
      $scope.remove = function(color){
        if(color) console.log(color);
        //TODO implement the removal of color from colors
       $scope.display = false;
      };
      $scope.add = function(){
        console.log($scope.newColor);
        $scope.colors.push($scope.newColor);
        console.log($scope.colors);
        $scope.remove();
      };
    });

