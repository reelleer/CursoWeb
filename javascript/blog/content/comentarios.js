(function (){
	var contador = 0;
	//querySelectorAll retorna un nodelist, se comporta como una arreglo
	//pero no lo es. http://www.w3schools.com/js/js_htmldom_nodelist.asp
	var txtAreas = document.querySelectorAll('form textarea');

	for(var i = 0;  i < txtAreas.length; i++){
		txtAreas[i].style.display = "inline-block";
		txtAreas[i].style.width = "100%";
	}

	var submit = document.querySelector('form');
	var commentBlock = document.getElementById("comentarios");
	var respond = document.getElementById("respuesta");
	var commentPopup = document.getElementById("mostrar");
	var respuesta = document.getElementById("respondiendo");
	commentBlock.addEventListener("click",responder);
	commentBlock.addEventListener("mouseover", showComment);
	commentBlock.addEventListener("mouseout", showComment);
	respond.style.display = "none";

	submit.onsubmit = publicar;

	function showComment(e){
		if(e.target.tagName === "SPAN"){
			if(e.type === "mouseout")
			{
				commentPopup.style.display = "none";
			} else {
				var cID = e.target.textContent.replace("#","c");
				var comment = document.getElementById(cID);
				commentPopup.innerHTML = comment.children[1].innerHTML;
				commentPopup.style.display = "block";
				commentPopup.style.position = "fixed";
				var pos = getPosition(e.target);
				pos.y += e.target.offsetHeight;
				
				//verificamos que el popup se pueda ver siempre
				if(pos.y + commentPopup.offsetHeight > window.innerHeight)
					pos.y -= e.target.offsetHeight + commentPopup.offsetHeight;
					
				commentPopup.style.left = pos.x+'px';
				commentPopup.style.top = pos.y+'px';
			}
		}
	}

	/*function hideComment(e) {
		if(e.target.tagName === "SPAN"){
			commentPopup.style.display = "none";
		}
	}*/

	function publicar(e){
		e.preventDefault();

		var theComment;
		var email = document.getElementById("correo");
		var comment = document.getElementById("comentario");
		var respondTo = document.getElementById("responde");
		var fecha = new Date();

		contador++;

		theComment = comment.value;

		if(respondTo.value !== ""){
			theComment = '<span>#' + respondTo.value + '</span> ' + theComment;
		}

		var elemento = '<p><a href="#">#' + contador + '</a> ' +
					   '<b>' + email.value + '</b> - <time>' + 
					   fecha.toLocaleDateString() + ' ' + 
					   fecha.toLocaleTimeString() + '</time></p>' +
					   '<p>' + theComment + '</p>';

		var ec = document.createElement("DIV");
		ec.id = "c" + contador;
		ec.innerHTML = elemento;

		//var comments = document.getElementById("comentarios");
		//comments.appendChild(ec);
		commentBlock.appendChild(ec);
		
		//limpiando todos menos el email
		comment.value = "";
		respondTo.value = "";
		respuesta.innerHTML = "";
	}

	function responder(e){
		if(e.target.tagName === "A"){
			e.preventDefault();
			var cID = e.target.textContent.replace("#","c");
			/*
			esto se movió a la función anónima para poder accederlo
			desde cualquier función interna
			var respuesta = document.getElementById("respondiendo");
			*/
			var comentario = document.getElementById(cID);
			var cIdR = document.getElementById("responde");
			respuesta.innerHTML = comentario.innerHTML;
			respond.style.display = "block";
			cIdR.value = cID.substr(1);
		}
	}

	function getPosition(element) {
	    var xPosition = 0;
	    var yPosition = 0;
	  
	    while(element) {
	        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
	        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
	        element = element.offsetParent;
	    }
	    return { x: xPosition, y: yPosition };
	}
})();