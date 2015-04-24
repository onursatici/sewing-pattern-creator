angular.module('karolaj')
  .controller('PatternController', function($scope) {
    $scope.colors = [];
    rgbColors = []; //TODO make this unnecessary
    $scope.remove = function(idx) {
      console.log($scope.colors[idx]);
      $scope.colors.splice(idx, 1);
      rgbColors.splice(idx, 1);
    };
    $scope.add = function() {
      $scope.colors.push("#aaaaaa");
      rgbColors.push(hexToRgb("#aaaaaa"));
      console.log(rgbColors);
      //$scope.remove();
    };
    $scope.change = function(idx) {
      rgbColors[idx] = hexToRgb($scope.colors[idx]);
      console.log(rgbColors);
    }

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
    $scope.mouseMove = function onMouseMove($event) {

      var x = $event.offsetX;
      var y = $event.offsetY;
      drawRects(x, y);

    };

    function rgbToHex(r, g, b) {
      if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
      return ((r << 16) | (g << 8) | b).toString(16);
    }

    function hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    function drawRects(x, y) {
      var rects = $('.drag');
      if (rects) rects.remove();

      var coord = "x=" + x + ", y=" + y;
      var c = $("#myCanvas")[0].getContext('2d');
      var p = c.getImageData(x, y, 2, 2).data;
      var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
      $('#status').html(coord + "<br>" + hex);

      var height = parseInt($scope.height, 10);
      var width = parseInt($scope.width, 10);
      var size = parseInt($scope.size, 10);
      var svg = d3.select('#mySvg');
      if (x - width * size > 0 && y - height * size > 0)
        var count = 0;
      for (var rectY = y - height * size; rectY < y; rectY = rectY + size) {
        for (var rectX = x - width * size; rectX < x; rectX = rectX + size) {
          count++;
          var fill = fillColor(rectX, rectY, size, c.getImageData(rectX, rectY, size, size).data);
          svg.append('rect')
            .classed('drag', true)
            .attr('x', rectX)
            .attr('y', rectY)
            .attr("stroke-width", 0)
            //.attr("stroke", "rgb(140,15,200)")
            .attr("stroke", $scope.colors[0])
            .attr('fill', fill + '') //TODO change to fill
            .attr('width', size)
            .attr('height', size);
        }
      }
    }

    function fillColor(x, y, size, colorArray) {
      var redSum = 0,
        greenSum = 0,
        blueSum = 0,
        count = 0;
      for (var i = 0; i < colorArray.length; i = i + 4) {
        redSum += colorArray[i];
        greenSum += colorArray[i + 1];
        blueSum += colorArray[i + 2];
        count++;
      }
      if(!$scope.colors.length){
        return '#' + ('000000' + rgbToHex(Math.floor(redSum / count), Math.floor(greenSum / count), Math.floor(blueSum / count))).slice(-6);
      }
      //return 'rgb('+Math.floor(redSum/count)+','+Math.floor(greenSum/count)+','+Math.floor(blueSum/count)+')';
      return findMatchingColor(Math.floor(redSum/count),Math.floor(greenSum/count),Math.floor(blueSum/count));
    }

    function findMatchingColor(r, g, b) {
      var minCost = 10000;
      var cost = 0;
      var bestIdx = 0;
      for (var i = 0; i < rgbColors.length; i++) {
        cost = calculateCost(rgbColors[i], r, g, b);
        if (cost < minCost) {
          minCost = cost;
          bestIdx = i;
        }
      }
      return $scope.colors[bestIdx];
    }

    function calculateCost(color, r, g, b) {
      return Math.pow((color.r-r),2)+Math.pow((color.g-g),2)+Math.pow((color.b-b),2);
    }

  });
