// let cont1 = $("#contenedor-main");
// let cont2 = $("#cont-dinamico");
var imags = [], intervalo;
document.body.onload = function(){
    mostrarImagenes();
    iniciarInterval();
};

    function mostrarImagenes() {
        //Aquí se haría la petición Ajax para las imágenes, pero
        // lo uso con un array de forma estática

        imags = ["c1.jpg", "c2.jpg", "c3.jpg", "c4.jpg"];
        let divControls = document.querySelector('.controles');

        //Iteramos por las imágenes del array; y por cada una
        // creamos un elemento img con su SRC (del nombre de la imágen
        //  junto a su trayecto en la carpeta), y las clases necesarias
        for (let imagenPos in imags) {
            let elemImg = document.createElement('img');
            elemImg.setAttribute('src', 'imgs/' + imags[imagenPos]);
            //SÓLO ponemos la clase 'activa' en la primera imágen,
            // el resto serán 'inactiva', con esto se controla luego
            //  la imágen que tenemos seleccionada
            if (imagenPos == 0) {
                elemImg.setAttribute('class', 'activa');
            } else {
                elemImg.setAttribute('class', 'inactiva');
            }
            document.querySelector('.cont-dinamico').append(elemImg);
            //Crear controles, inputs de type='radio'
            let inputDirecto = document.createElement('input');
            inputDirecto.setAttribute('type', 'radio');
            if (imagenPos == 0) {
                inputDirecto.setAttribute('checked', 'true');
            } else {
                inputDirecto.setAttribute('checked', 'false');
            }
            inputDirecto.setAttribute('name', 'controles');
            //cada uno tendrá el valor del trayecto de la imágen
            inputDirecto.setAttribute('value', 'imgs/' + imags[imagenPos]);

            inputDirecto.addEventListener('click', cambiarImgDirect);
            divControls.append(inputDirecto);
        }
        //Mostramos la imagen activa (la primera); escondemos las demás
        $(".inactiva").hide();
        $(".activa").show();
    }
//Función para cambiar la imagen con los input[type='radio']
    function cambiarImgDirect(e) {
        let nombreSRC = e.target.value, cont = 0, numEncontrada;
        let imagenes = document.querySelectorAll('.cont-dinamico img');
        for (let img of imagenes) {
            if (img.getAttribute('class') == "activa") {
                img.className = "inactiva";
            }
            if (img.getAttribute('src') == nombreSRC) {
                numEncontrada = cont;
            }
            cont++;
        }
        imagenes[numEncontrada].className = "activa";
        actualizar();
    }
//Uso esta función para cambiar la imágen que hemos "seleccionado" con
// cambiarImgDirect() arriba, al cambiar su clase.
    function actualizar() {
        let imagenes = document.querySelectorAll('.cont-dinamico img');
        //Bucle jQuery, si encontramos un img con la clase 'inactiva', lo escondemos
        // la que esté 'activa', le hacemos un fadeIn() para que aparezca
        $(".cont-dinamico img").each(function(){
            if ($(this).hasClass('inactiva')) {
                $(this).hide();
            } else {
                $(this).fadeIn();
            }
        });
    }

    //Esto no funciona bien
    function actualizarInputs(numActiva) {
        $(".controles input").each(function() {
            if ($(this).prop('checked') == "true") {
                $(this).prop('checked', 'false');
            }
        });
        $(".controles input").eq(numActiva).prop('checked', 'true');
    }

    //Animaciones con jQuery

    function siguiente(e) {
        if (e != undefined) {
            if (e.type == 'click') quitarInterval();
        }
        let i = 0, numActiva; //numActiva -> Posición de la imágen con clase 'activa'
        let imagenes = document.querySelectorAll('.cont-dinamico img'),
        numImagenes = imagenes.length;
        let hecho = false;
        for(i=0;i<numImagenes;i++) {
            if (imagenes[i].className == "activa") {
                imagenes[i].className = "inactiva";
                $(".cont-dinamico img").eq(i).hide();
                hecho = true; 
//hecho representa que hemos encontrado la imagen 'activa'
            }
            if (hecho) {
                if ((i+1) == numImagenes) {
                    //Si la imágen siguiente es la longitud del array,
                    // significa que hemos llegado a la última
                    $(".cont-dinamico img").eq(0).fadeIn();
                    imagenes[0].className = "activa";
                    numActiva = 0;
                } else {
                    $(".cont-dinamico img").eq(i+1).fadeIn();
                    imagenes[i+1].className = "activa";
                    numActiva = i+1;
                }
                //Así, cuando encontramos la imágen, podemos salir del bucle for
                break;
            }
        }
        actualizarInputs(numActiva);
    }

    function anterior(e) {
        if (e != undefined) {
            if (e.type == 'click') quitarInterval();
        }
        let i=0, numActiva; //numActiva -> Posición de la imágen con clase 'activa'
        let imagenes = document.querySelectorAll('.cont-dinamico img'),
        numImagenes = imagenes.length;
        let hecho = false;
        for (i=0;i<numImagenes;i++) {
            if (imagenes[i].className == "activa") {
                imagenes[i].className = "inactiva";
                $(".cont-dinamico img").eq(i).hide();
                hecho = true;
            }
            if (hecho) {
                if ((i-1) < 0) {
                    //Si la imágen  anterior es la menor a 0,
                    // significa que hemos llegado a la primera
                    $(".cont-dinamico img").eq(numImagenes-1).fadeIn();
                    imagenes[numImagenes-1].className = "activa";
                    numActiva = numImagenes-1;
                } else {
                    $(".cont-dinamico img").eq(i-1).fadeIn();
                    imagenes[i-1].className = "activa";
                    numActiva = i-1;
                }
                break;
            }
        }

        actualizarInputs(numActiva);
    }

    // function animarSiguiente(pos) {
    //     numImagenes = document.querySelector('.cont-dinamico').children.length;
    //     $(".cont-dinamico img").eq(pos).animate({
    //         opacity: 0
    //     });
    //     if ((pos+1) == numImagenes) {
    //         $(".cont-dinamico img").eq(0).animate({
    //             opacity: 1
    //         });
    //     }
    // }
    // function animarAnterior(pos) {
    //     numImagenes = document.querySelector('.cont-dinamico').children.length;
    //     $(".cont-dinamico img").eq(pos).animate({
    //         opacity: 0
    //     });
    //     if (pos-1 < 0) {
    //         $(".cont-dinamico img").eq(numImagenes).animate({
    //             opacity: 1
    //         });
    //     }
    // }
    
//Activamos las funciones con los eventos siguientes. Botón siguiente, anterior, y 'recargar'
    $("#backBTN").click(anterior);
    $("#forwBTN").click(siguiente);

    $("#reloadInt").click(function(e) {
        e.preventDefault();
        iniciarInterval();
    });

//También el intervalo
    function iniciarInterval() {
        if (intervalo != null) {
            quitarInterval();
            intervalo = null;
        } else {
            intervalo = setInterval(siguiente, 1350);
        }
    }

    function quitarInterval() {
        clearInterval(intervalo);
    }