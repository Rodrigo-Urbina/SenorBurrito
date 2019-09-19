$("#seccion_comentario").hide()
$("#error_comment").hide()
/*
1. Función que muestra y esconde la sección para hacer comentarios 
   al hacer click el botón 'Escribe una reseña'. 
   on click!
   (5 puntos)
*/
$("#escribe_reseña").on("click", function(event) {
    $("#seccion_comentario").show()
})



/*
2. Cargar los comentarios de el archivo comentarios.xml o bien de 
  https://tc2026daw.github.io/instrucciones/misc/comentarios.xml 
  (función ajax, 25 puntos)
*/

$.ajax({
    url: "https://tc2026daw.github.io/instrucciones/misc/comentarios.xml",
    type: "GET",
    dataType: "xml",
    success: function (data) {
        let newHtml = ""
        $(data).find("comment").each(function (event) {
            newHtml += `
            <div class="review">
                <span class="nombre">${$(this).find("name").text()}</span><br>
                <span>${getStarsSpans($(this).find("stars").text())}</span><br>
                <span>${$(this).find("text").text()}</span>
            </div>
            `
        })
        $("#seccion_reviews").append(newHtml)
    },
    error: function (error_msg) {
        console.log(error_msg)
    }
})


/*
3. Funcion que apendiza el nuevo comentario al darle click a PUBLICAR
  on click!
  (función, 35 puntos)
*/
$("#btn-publicar").on("click", function (event) {
    publish()
})

function publish() {
    if ($("#nombre").val() == "" || $("#email").val() == "" || $("#comentario").text() == "") {
        $("#error_comment").show()
    } else {
        $("#error_comment").hide()

        let newHTML = ''
        console.log("todo bien")
        let numStars = $("input[name='rating']:checked").val()
        console.log(numStars)

        newHTML += `
                <div class="review">
                  <span class="nombre">
                    ${$("#nombre").val()}
                  </span>
                  <span class="date">
                    Justo ahora
                  </span>
                  <br>
                `

        newHTML += getStarsSpans(numStars)

        newHTML += `
                <p>
                  ${$("#comentario").text()}
                </p>
              </div>
              `

        $('#seccion_reviews').append(newHTML)

        clean()
    }
}

/*
4. Funcion que limpia el nombre, el email y el div "#comentarios" al darle
   click en "btn-limpiar" con leyenda de "CANCELAR"
   on click!
  (5 puntos)
*/

$("#btn-limpiar").on("click", function (event) {
    console.log("entra1")
    clean()
})

function clean() {
    console.log("entra2")
    $("#nombre").val("")
    $("#email").val("")
    $("#comentario").empty()
    $("#rating").empty()
}


/*
Funcion que recibe un numero de stars y regresa los 5 spans 
que simbolizan las estrellas del rating. por ejemplo:
let stars = 3;
let html = getStarsSpans(stars);

html = '
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
'
*/
function getStarsSpans(stars) {
  let new_html = '';
  for( let i = 0; i < stars; i++) {
    new_html += `
      <span class="fa fa-star checked"></span>
    `;
  }

  for ( let i = 0; i < 5 - stars; i++ ) {
    new_html += `
      <span class="fa fa-star"></span>
    `;
  }

  return new_html;
}
