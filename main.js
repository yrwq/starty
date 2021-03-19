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

        link = "https://www.google.com/search?q=" +
            encodeURIComponent($("#box").val().replace(/^:s /g, ""));

        window.open(link, "_blank");
    });

});
