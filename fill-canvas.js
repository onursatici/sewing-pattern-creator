function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      console.log(e);
      console.log(e.target.result);
      $('#image')
        .attr('src', e.target.result);
      var canvas = document.getElementById("myCanvas");
      var img = document.getElementById("image");
      canvas.width = img.width;
      canvas.height = img.height;
      var context = canvas.getContext("2d");
      context.drawImage(img, 0, 0);
    };

    reader.readAsDataURL(input.files[0]);
  }
}
