(function ($){
	var contador = 0;
	
	$('form textarea').width("100%");

	var submit = $('form');
	var commentBlock = $("#comentarios");
	var respond = $("#respuesta");
	var commentPopup = $("#mostrar");

	commentBlock.on("click",responder);
	commentBlock.on("mouseover", showComment);
	commentBlock.on("mouseout", showComment);

	respond.hide();

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
				commentPopup.style.left = pos.x+'px';
				commentPopup.style.top = pos.y+'px';
				console.log(commentPopup.offsetParent, e.target.tagName);
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
	}

	function responder(e){
		if(e.target.tagName === "A"){
			e.preventDefault();
			var cID = e.target.textContent.replace("#","c");
			var respuesta = document.getElementById("respondiendo");
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
})(jQuery);