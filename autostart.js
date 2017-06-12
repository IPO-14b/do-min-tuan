(function() {

    var is_lingapp = false;
    if (document.domain == "vocabla.com" || document.domain == "staging.vocabla.com") {
        is_lingapp = true;
    };

    if (window.location.protocol == "http:" || window.location.protocol == "https:") {
        chrome.extension.sendRequest({
            operation: "hostname",
            value: document.domain
        });

        chrome.extension.sendRequest({
            key: 'status',
            operation: 'get'
        }, function(res) {
            if (res.val == "on" || is_lingapp) {
                setLingolet();
            }
        });

        function setLingolet() {
            if (!document.getElementById('script')) {
                var x = document.createElement('script');
                x.setAttribute('id', 'script');
                x.src = chrome.extension.getURL("page_script.js");
                document.body.appendChild(x);
            }
        }
    }

}());