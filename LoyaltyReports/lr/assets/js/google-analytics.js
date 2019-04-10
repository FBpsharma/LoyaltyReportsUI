loadScript("https://www.google-analytics.com/analytics.js", () => {
    window.ga = window.ga || function () { (ga.q = ga.q || []).push(arguments) }; ga.l = +new Date;

    ga('create', 'UA-130094952-1', 'auto');

});

function loadScript(url, callback) {

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" ||
                script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = function () {
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}
