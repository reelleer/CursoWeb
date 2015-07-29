(function ($){
	var contador = 0;
	var mostrado = false;
	
	$('form textarea').width("100%");

	var submit = $('form');
	var commentBlock = $("#comentarios");
	var respond = $("#respuesta");
	var commentPopup = $("#mostrar");

	commentBlock.on("click",responder);
	commentBlock.on("mouseover", showComment);
	commentBlock.on("mouseout", showComment);

	respond.hide();

	submit.on("submit",publicar);

	function showComment(e){
		if(e.target.tagName === "SPAN"){
			if(e.type === "mouseout")
			{
				commentPopup.hide();
				mostrado = false;
			} else if(!mostrado && e.type === "mouseover") {
				mostrado = true;
				var cID = e.target.textContent.replace("#","c");
				var comment = $("#" + cID + "> p + p");
				var miTarget = $(e.target);
				var pos = miTarget.offset();
				
				pos.top += miTarget.outerHeight();

				commentPopup.html(comment.html())
					.show()
					.offset(pos);
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
		var email = $("#correo");
		var comment = $("#comentario");
		var respondTo = $("#responde");
		var fecha = new Date();

		contador++;

		theComment = comment.val();

		if(respondTo.val() !== ""){
			theComment = '<span>#' + respondTo.val() + '</span> ' + theComment;
		}

		var elemento = '<p><a href="#">#' + contador + '</a> ' +
					   '<b>' + email.val() + '</b> - <time>' + 
					   fecha.toLocaleDateString() + ' ' + 
					   fecha.toLocaleTimeString() + '</time></p>' +
					   '<p>' + theComment + '</p>';

		$("<div></div>")
			.attr("id","c" + contador)
			.html(elemento)
			.appendTo(commentBlock);
	}

	function responder(e){
		if(e.target.tagName === "A"){
			e.preventDefault();
			//$(e.target).text().replace
			var cID = e.target.textContent.replace("#","c");
			var respuesta = $("#respondiendo");
			//esto es un recordatorio que el código
			//con javascript puro tiene un mejor
			//rendimiento
			var comentario = document.getElementById(cID);
			var cIdR = $("#responde");
			respuesta.html(comentario.innerHTML);
			respond.show();
			cIdR.val(cID.substr(1));
		}
	}
})(jQuery);