(function ($) {
    //garatizando que las variables esten en el function scope
    var items;

    //http://eternicode.github.io/bootstrap-datepicker/
    //Configurando los "datepickers"
    var items = $('.calendar');
    if (items.length > 0 && !Modernizr.inputtypes.date) {
        items.each(function (i) {
            var obj = $(this);
            var fecha = obj.val();
            if (fecha !== "") {
                fecha = fecha
                    .split("-")
                    .reverse()
                    .join("/");
                obj.val(fecha);
            }

            var opts = {
                autoclose: true,
                language: 'es'
            };

            obj.datepicker(opts);
        });
    }

})(window.jQuery);