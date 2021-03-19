$(function () {

    $(document).keydown(function (e) {
        // Any key press will focus the input-box
        $("#box").focus();

        // Enter
        if (e.keyCode === 27) {
            $("#box").blur();
            $("#box").val("");
        }
    });

    // Search for given string on google
    $("form").on("submit", function (e) {

        val = $("#box").val();
        var vals = val.split(" ");

        var cmd = vals[0];
        if(cmd == "add") {
            var key = vals[1];
            var link = vals[2];
            localStorage.setItem(key, link);
        } else if(cmd == "open") {
            var key = vals[1];
            var link = localStorage.getItem(key);
            window.open(link, "_blank");
        }

    });

});
