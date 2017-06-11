"use_strict";
(function() {

   /**
    *
    *Урл внешнего сервиса
    *
    *@var object $vocabla
    */
    var vocabla = {
        "app_url": "vocabla.com"
    }

   /**
    *
    *Задание интервала, при котором в равные промежутки
    *времени будет выполняться код
    */
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            main();
        }
    }, 10);

   /**
    *
    *Главная функция, в которой производятся действия
    *
    */
    function main() {
        var is_page = false;
        if (document.domain == "vocabla.com" || document.domain == "staging.vocabla.com") {
            is_vocabla_page = true
        }
        if (is_page) {
            if (!document.getElementById('installed')) {
                var installed = document.createElement('div');
                installed.setAttribute('id', 'installed');
                document.body.appendChild(installed);
            }
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

            document.body.onclick = function(e) {
                if (e.target.getAttribute("id") != "translationsPopup" && !findParentById(e.target, 'translationsPopup'))
                    document.getElementById('translationsPopup').style.display = "none";
            };


           /**
		    *
		    *Получение выделенного текста
		    *
		    *@return string $html
		    */
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

           /**
		    *
		    *Обработка двойного клика
		    *и получение перевода слова с внешнего ресура
		    *
		    */
            function bindDblclickHandler() {
                document.body.ondblclick = function(e) {
                    e.preventDefault();

                   /**
				    *Полученный текст из вызванной функции getSelectionText()
				    *
				    *@var string $selection
				    */
                    var selection = getSelectionText();

                   /**
				    *Полученное слово путем удаления пробелов
				    *
				    *@var string $word
				    */                    
                    var word = selection.replace(/^\s+|\s+$/g, "");

                    /**
				    *Параметр value запроса к внешнему ресурсу
				    *
				    *@var string $query_params
				    */  
                    var query_params = "value=" + word;

					/**
				    *Язык, с которого идет перевод
				    *
				    *@var string $word_lang
				    */  
                    var word_lang = "en";

					/**
				    *Язык, на которое будет переведено слово
				    *
				    *@var string $def_lang
				    */  
                    var def_lang = "ru";

                    /**
				    *Параметры value, words_language, definitions_language запроса к внешнему ресурсу
				    *
				    *@var string $query_params
				    */  
                    query_params += "&words_language=" + word_lang + "&definitions_language=" + def_lang;

                    if (word.length > 0 && word.match(/^\w.*$/) && word.match(/^[\'\-\w\s]*$/)) {

                    	/**
				    	*Результат запроса
				    	*
				    	*@var object $query_params
				    	*/  
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


           /**
		    *
		    *Задание координат для отображения попапа
		    */
            function setPopupPosition(positiony, positionx) {
           
           	   /**
		    	*Координата Y попапа
		    	*
		    	*@var integer &top_pos
		    	*/
                var top_pos = positiony + 15;

               /**
		    	*Координата X попапа
		    	*
		    	*@var integer &top_pos
		    	*/
                var left_pos = positionx - 30;

               /**
		    	*Ширина дива
		    	*
		    	*@var integer &div_width
		    	*/
                var div_width = 330;

               /**
		    	*Ширина окна браузера
		    	*
		    	*@var integer &window_width
		    	*/
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
    }

})();