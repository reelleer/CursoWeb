(function (){
	var contador = 0;
	//querySelectorAll retorna un nodelist, se comporta como una arreglo
	//pero no lo es.
	var txtAreas = document.querySelectorAll('form textarea');

	for(var i = 0;  i < txtAreas.length; i++){
		txtAreas[i].style.display = "inline-block";
		txtAreas[i].style.width = "100%";
	}

	var submit = document.querySelector('form');
	var commentBlock = document.getElementById("comentarios");
	var respond = document.getElementById("respuesta");
	commentBlock.addEventListener("click",responder);
	respond.style.display = "none";

	submit.onsubmit = publicar;



	function publicar(e){
		e.preventDefault();

		var email = document.getElementById("correo");
		var comment = document.getElementById("comentario");
		var fecha = new Date();

		contador++;

		var elemento = '<p><a href="#">#' + contador + '</a> ' +
					   '<b>' + email.value + '</b> - <time>' + 
					   fecha.toLocaleDateString() + ' ' + 
					   fecha.toLocaleTimeString() + '</time></p>' +
					   '<p>' + comment.value + '</p>';

		var ec = document.createElement("DIV");
		ec.id = "c" + contador;
		ec.innerHTML = elemento;

		//var comments = document.getElementById("comentarios");
		//comments.appendChild(ec);
		commentBlock.appendChild(ec);
	}

	function responder(e){
		if(e.target.tagName === "A"){
			e.preventDefault();
			var cID = e.target.textContent.replace("#","c");
			var respuesta = document.getElementById("respondiendo");
			var comentario = document.getElementById(cID);
			respuesta.innerHTML = comentario.innerHTML;
			respond.style.display = "block";
		}
	}
})();

