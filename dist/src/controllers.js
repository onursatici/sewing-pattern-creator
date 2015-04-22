angular.module('karolaj')
  .controller('PatternController', function($scope) {
    $scope.colors = [];
    $scope.remove = function(idx) {
      console.log($scope.colors[idx]);
      $scope.colors.splice(idx, 1);
    };
    $scope.add = function() {
      $scope.colors.push("#aaaaaa");
      console.log($scope.colors);
      //$scope.remove();
    };
    $scope.readURL = function(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
          $('#image')
            .attr('src', e.target.result);
          var canvas = document.getElementById("myCanvas");
          var img = document.getElementById("image");
          canvas.width = img.width;
          canvas.height = img.height;
          var context = canvas.getContext("2d");
          context.drawImage(img, 0, 0);

          d3.select("#mySvg")
            .attr('width',img.width)
            .attr('height',img.height);
        };

        reader.readAsDataURL(input.files[0]);
      }
    };
    $scope.mouseMove = function($event) {

      var x = $event.offsetX;
      var y = $event.offsetY;
      var coord = "x=" + x + ", y=" + y;
      var c = $("#myCanvas")[0].getContext('2d');
      var p = c.getImageData(x, y, 1, 1).data;
      var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
      $('#status').html(coord + "<br>" + hex);
    };

    function rgbToHex(r, g, b) {
      if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
      return ((r << 16) | (g << 8) | b).toString(16);
    }

  });
