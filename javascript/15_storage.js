(function($){
	if(typeof(sessionStorage) !== "undefined") {
     	InitStorage()
		 $("store").click(function() { localStorage.removeItem("visitas");});
	} else {
	 	alert("No storage");
	}
	
	function InitStorage() {
		if(sessionStorage.visitas)
			sessionStorage.visitas = Number(sessionStorage.vistas) + 1;
		else
			sessionStorage.visitas = 1;
			
		if(localStorage.visitas)
			localStorage.visitas = Number(localStorage.vistas) + 1;
		else
			localStorage.visitas = 1;
			
		$("#session").text("Visitas en la sesión: " + sessionStorage.visitas);
		$("#local").text("Visitas en la historia: " + localStorage.visitas);
	}
})(jQuery);