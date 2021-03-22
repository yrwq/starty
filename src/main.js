const L_KEY = "links";  // The local storage key where we store links
let links = {};         // The dict of the links

// Safely parse from local storage
function safe_parse(input) {
    try {
        return JSON.parse(input) || {};
    } catch {
        return {};
    }
}

// Get each link from links dict
function get_links() {
    let pos = [];
    pos.forEach((p) => {
        links = links[p];
    });
    return links;
}

// Parse links from local storage
function read_links() {
    return safe_parse(localStorage.getItem(L_KEY));
}

// Write links to local storage
function write_links() {
    localStorage.setItem(L_KEY, JSON.stringify(links));
}

// Format the url
function format_url(url) {
    let final_url = url;
    // If the url doesn't contains 'http' or 'https:',
    // Add a 'https://' prefix to the url and return it.
    // We need this, because we can't open a url without https://
    if (!/^http|https:\/\//.test(final_url)) {
        final_url = "https://" + final_url;
    }
    return final_url;
}

// Visuall list links (append them to 'links')
function list() {
    const links = get_links();

    // Reset links
    $(".links").text("");

    // Add each link to the list
    $.each(links, function(key, value) {
        $(".links").append("\t\t\"" + key + "\": \"" + value + "\",<br>");
    });

    // Highlight the actual list
    hljs.highlightAll();
}

$(function () {


    // Initialize links
    const ls_links = read_links();
    if (ls_links) {
        links = ls_links;
    }

    list();

    // Handle keypresses
    $(document).keydown(function (e) {

        $("#box").focus();

        // Every key press will focus the command box
        if (e.keyCode === 190) {
            $("#box").focus();
        } else if (e.keyCode === 27) {
            $("#box").val("");
        }

    });

    // Search for given string on google
    $("form").on("submit", function (e) {

        // Get the value of the input box and split it to words
        val = $("#box").val();
        var vals = val.split(" ");

        // The first value should always be a command,
        var cmd = vals[0];

        // Add a key, link pair to the localstorage
        // :a key link
        if (/^:a/i.test(cmd)) {
            var key = vals[1];
            var link = format_url(vals[2]);

            // Get already added links from localstorage
            const links = get_links();
            // Add the key and a link as a dict to the localstorage
            links[key] = link;
            // Save the localstorage's state
            write_links();
            list();

        // Open a link using the link's key from localstorage
        } else if (/^:o/i.test(cmd)) {
            var key = vals[1];
            const links = get_links();
            window.open(links[key], "_blank");

        // List each link and add it to the main code area
        } else if (/^:l/i.test(cmd)) {
            list();

        // Delete a key with its value from localStorage
        } else if (/^:d/i.test(cmd)) {
            var key = vals[1];
            const links = get_links();
            delete links[key];
            write_links();
            list();

        // Search for a string on google
        } else if(val.startsWith("?") || val.startsWith("/")){
            window.open("https://google.com/search?q=" + val.substring(1, val.length), "_blank");
        }

        $("#box").val("");
        e.preventDefault();

    });

});
