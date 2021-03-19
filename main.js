$(function () {

    // Any key to focus the input box,
    // Return to search
    $(document).keydown(function (e) {
        $("#box").focus();

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
        $("#box").blur();
        $("#box").val("");
    });

});
