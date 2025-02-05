function imageZoom(imgID, resultID) {
    var img, lens, result, cx, cy;
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);
    /*create lens:*/
    lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    /*insert lens:*/
    img.parentElement.insertBefore(lens, img);
    /*calcular la relacion entre el resultado DIV y la lente:*/
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    /*establecer propiedades de fondo para el resultado DIV:*/
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    /*ejecutar una funcion cuando alguien mueve el cursor sobre la imagen, o la lente:*/
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    /*y tambien para pantallas tactiles:*/
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);
  
    function moveLens(e) {
      var pos, x, y;
      /*prevenir cualquier otra accion que pueda producirse al desplazarse sobre la imagen:*/
      e.preventDefault();
      /*obtener las posiciones x e y del cursor:*/
      pos = getCursorPos(e);
      /*calcular la posicion de la lente:*/
      x = pos.x - (lens.offsetWidth / 2);
      y = pos.y - (lens.offsetHeight / 2);
      
/*evitar que la lente se coloque fuera de la imagen:*/
if (x > img.width - lens.offsetWidth) {
  x = img.width - lens.offsetWidth;
}
if (x < 0) {
  x = 0;
}
      if (y > img.height - lens.offsetHeight) {
        y = img.height - lens.offsetHeight;
      }
      if (y < 0) {
        y = 0;
      }
      /*fija la posicion de la lente:*/
      lens.style.left = x + "px";
      lens.style.top = y + "px";
      /*visualizar lo que "ve" la lente:*/
      result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }
  
    function getCursorPos(e) {
      var a, x = 0,
        y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*considere cualquier desplazamiento de pagina:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {
        x: x,
        y: y
      };
    }
  }
  
  let img = document.querySelectorAll('.item-img')
  
  
  
  // Recorremos boton para obtener sus datos en el evento.
  img.forEach(function(item, idx) {
    // Evento onclick 
    item.addEventListener('mousemove', function(e) {
  
  
  
      // Obtenemos el id del model por el data-id
      let x = e.target.dataset.id
      console.log(x)
  
      //zoom effect:
      imageZoom(x, "myresult");
    })
  })


 