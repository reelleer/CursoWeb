(function ($) {
    var b = $("#store");
    var myForm = $(document.getElementById("grades").form)

    if (!!window.localStorage) {
        if (window.localStorage.getItem(location.pathname)) {
            b.val("Recover");
        } else {
            b.val("Store");
        }

        b.on("click", function (e, o) {
            if (b.val().toLocaleLowerCase() == "store") {
                myForm = $(this.form);
                var store = JSON.stringify(myForm.serializeArray());
                window.localStorage.setItem(location.pathname, store);
            } else {
                var inputs = $(":input", myForm);

                var store = JSON.parse(window.localStorage.getItem(location.pathname));

                for(var i = 0; i < store.length; i++)
                {
                    if (store[i].name.indexOf("Token") < 0) {
                        var ip = inputs.filter('[name="' + store[i].name + '"]')
                        if (ip.length == 1) {
                            var oip = ip.get(0);
                            if (oip.tagName == "SELECT")
                                oip.selectedIndex = i.value + 1
                            ip.val(store[i].value);
                        }

                        inputs.end();
                    }
                }

                b.val("Store");
                window.localStorage.removeItem(location.pathname);
            }
        });
    } else {
        $("#borrador").hide();
    }

    myForm.on("submit", function (e, o) {
        e.preventDefault();
        $.post(location.pathname, myForm.serialize(), function (data, status, xhr) {
            console.log(data);
            console.log(status);
        }).fail(function () {
            console.log("Error");
            console.log(this.arguments);
        });
    });
})(jQuery);