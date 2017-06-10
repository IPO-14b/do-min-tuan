function(t) {
    function e(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {
            exports: {},
			id: r,
            loaded: !1
        };
        return t[r].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports
    }
    var n = {};
	return e.m = t, e.c = n, e.p = "/", e(0)
    }([function(t, e, n) {
        function r(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }

    function o() {
        (0, h.isChrome)() && (setTimeout(function() {
            return document.documentElement.style.height = "155px"
        }, 0), setTimeout(function() {
            document.documentElement.style.height = "156px", document.documentElement.style.width = "359px"
        }, 280), setTimeout(function() {
            return document.documentElement.style.width = "360px"
        }, 310))
    }

    function i() {
        ((0, h.isFirefox)() || (0, h.isSafari)()) && (document.documentElement.style.overflow = "hidden", setTimeout(function() {
            return KangoAPI.resizeWindow(document.documentElement.scrollWidth, Math.min(A, document.documentElement.scrollHeight))
        }, 0), setTimeout(function() {
            return KangoAPI.resizeWindow(document.documentElement.scrollWidth, Math.min(A, document.documentElement.scrollHeight))
        }, 210))
    }
	KangoAPI.onReady(function() {
        var t = d.default.init();
        v.default.init(t.getInstalled());
        var e = (0, l.default)(i, 50);
        (0, a.render)(u.default.h(p.default, {
            API: t,
            ApiEvents: {
                addListener: d.default.addEventListener,
                removeListener: d.default.removeEventListener
            },
            resizeOnUpdate: e,
            trackEvents: v.default.event.bind(v.default)
        }), document.body), o()
    })
    function s(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "en",
            n = "en" === e ? "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ru&dt=t" : "https://translate.googleapis.com/translate_a/single?client=gtx&sl=ru&tl=en&dt=t";
        return (0, x.promisedXhr)(n, {
            method: "POST",
            params: {
                q: encodeURIComponent(t)
            }
        }).then(l, f)

        f = "en" === "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ru&dt=t" : "https://translate.googleapis.com/translate_a/single?client=gtx&sl=ru&tl=en&dt=t";
        return (0, x.promisedXhr)(n, {
            method: "GET",
            params: {
                q: encodeURIComponent(t)
            }
        });
    }

    function show(f) {
        h.showPopUp(f);
    }
}]);