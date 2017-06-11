"use_strict";
(function() {

    var vocabla = {
        "app_url": "vocabla.com"
    }

    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            main();
        }
    }, 10);

    function main() {
        var is_page = false;
        var is_secure = false;
        if (document.domain == "vocabla.com" || document.domain == "staging.vocabla.com") {
            is_vocabla_page = true
        }
        if (is_page) {
            if (!document.getElementById('installed')) {
                var installed = document.createElement('div');
                installed.setAttribute('id', 'installed');
                document.body.appendChild(installed);
            }
        } else
        if (is_secure) {
            //toDo
        } else {
            var plugin_box = document.createElement('span');
            plugin_box.setAttribute('id', 'span');

            var plugin_translationsPopup = document.createElement('div')
            plugin_translationsPopup.setAttribute('id', 'translationsPopup')
            plugin_box.appendChild(plugin_translationsPopup);

            var plugin_box_analytics = document.createElement('div')
            plugin_box_analytics.setAttribute('id', 'analytics-iframes')
            plugin_box.appendChild(plugin_box_analytics);

            document.body.appendChild(plugin_box);

            function findParentById(elem, id) {
                var testObj = elem.parentNode;
                while (testObj && testObj.parentNode && testObj.nodeName != "BODY" && testObj.nodeName != 'HTML' && testObj.getAttribute("id") != id) {
                    if (testObj.parentNode.nodeName == "BODY")
                        break;
                    testObj = testObj.parentNode;
                }
                if (testObj.getAttribute("id") == id)
                    return testObj;
                else
                    return null;
            }

            function addAnalyticsIframe(css_class, href) {
                var new_iframe = document.createElement('iframe');
                new_iframe.setAttribute("class", css_class);
                new_iframe.setAttribute("src", href);
                var to_remove = document.getElementById("analytics-iframes").getElementsByClassName(css_class);
                var to_remove_length = to_remove.length;
                for (var i = to_remove_length - 1; i >= 0; i--) {
                    document.getElementById("analytics-iframes").removeChild(to_remove[i]);
                }
                document.getElementById("analytics-iframes").appendChild(new_iframe);
            }

            document.body.onclick = function(e) {
                if (e.target.getAttribute("id") != "translationsPopup" && !findParentById(e.target, 'translationsPopup'))
                    document.getElementById('translationsPopup').style.display = "none";
            };

            function getSelectionText() {
                var html = "";
                if (typeof window.getSelection != "undefined") {
                    var sel = window.getSelection();
                    if (sel.rangeCount) {
                        var container = document.createElement("div");
                        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                            container.appendChild(sel.getRangeAt(i).cloneContents());
                        }
                        html = container.textContent;
                    }
                } else if (typeof document.selection != "undefined") {
                    if (document.selection.type == "Text") {
                        html = document.selection.createRange().htmlText;
                    }
                }
                return html;
            }

            function bindDblclickHandler() {
                document.body.ondblclick = function(e) {
                    e.preventDefault();

                    addAnalyticsIframe("loaded", "http://" + vocabla.app_url + "/plugin/stats/doubleclick.html");

                    var selection = getSelectionText();
                    var word = selection.replace(/^\s+|\s+$/g, "");
                    var query_params = "value=" + word;

                    var word_lang = "en";
                    var def_lang = "ru";
                    var browser_lang = (navigator.language) ? navigator.language : navigator.userLanguage;

                    query_params += "&words_language=" + word_lang + "&definitions_language=" + def_lang;

                    if (word.length > 0 && word.match(/^\w.*$/) && word.match(/^[\'\-\w\s]*$/)) {
                        var getUrl = 'https://' + vocabla.app_url + '/plugin/words/search.html?' + query_params;
                        var iframe = document.createElement('iframe');
                        iframe.style.width = '254px';
                        iframe.style.height = '154px';
                        iframe.style.border = 'none';
                        iframe.style.zIndex = 1500;
                        iframe.id = "TranslateIframe";
                        iframe.src = getUrl;
                        document.getElementById("translationsPopup").innerHTML = "";
                        document.getElementById("translationsPopup").appendChild(iframe);

                        document.getElementById("translationsPopup").style.display = "block";

                        setPopupPosition(e.pageY, e.pageX);
                    }
                }
            }


            function setPopupPosition(positiony, positionx) {
                var top_pos = positiony + 15;
                var left_pos = positionx - 30;

                var div_width = 330;
                var window_width = document.body.clientWidth;

                if (left_pos + div_width > window_width)
                    left_pos = window_width - div_width - 30;

                if (left_pos < 0)
                    left_pos = 10;
                document.getElementById('translationsPopup').style.position = 'absolute';
                document.getElementById('translationsPopup').style.top = top_pos + 'px';
                document.getElementById('translationsPopup').style.left = left_pos + 'px';
            }

            bindDblclickHandler();
        }
    } //end main()

})();