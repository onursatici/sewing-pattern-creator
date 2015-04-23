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
            .attr('width', img.width)
            .attr('height', img.height);
        };

        reader.readAsDataURL(input.files[0]);
      }
    };
    $scope.mouseMove = function($event) {

      var x = $event.offsetX;
      var y = $event.offsetY;

      var coord = "x=" + x + ", y=" + y;

      //TODO add drawRects(height,width,size,shape)
      drawRects(x, y);

      var c = $("#myCanvas")[0].getContext('2d');
      var p = c.getImageData(x, y, 2, 2).data;
      //console.log(p);
      var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
      $('#status').html(coord + "<br>" + hex);
    };

    function rgbToHex(r, g, b) {
      if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
      return ((r << 16) | (g << 8) | b).toString(16);
    }

    function drawRects(x, y) {
      var rects = $('.drag');
      if (rects) rects.remove();

      var height = parseInt($scope.height,10);
      var width = parseInt($scope.width,10);
      var size = parseInt($scope.size,10);
      var svg = d3.select('#mySvg');
      if (x - width * size > 0 && y - height * size > 0)
        var count = 0;
        for (var rectY = y - height * size; rectY < y; rectY = rectY + size) {
            console.log('init:'+(y - height * size)+'last:'+ (rectY+size) + 'check:' + y + '>' + rectY);
          for (var rectX = x - width * size; rectX < x; rectX = rectX + size) {
            count++;
            svg.append('rect')
              .classed('drag', true)
              .attr('x', rectX)
              .attr('y', rectY)
              .attr("stroke-width", 1)
              .attr("stroke", "rgb(102,192,183)")
              .attr('fill-opacity', 0)
              .attr('width', size)
              .attr('height', size);
          }
        }
    }

  });
