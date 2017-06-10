kangoLoader.add("api", function(require, exports, module) {
    function dispatchMessage(e, n) {
		return messageRouter.dispatchMessage(e, n)
	}

	function wrapEventTarget(e) {
		function n() {
			array.forEach(r, function(n) {
				e.removeEventListener(n.type, n.listener)
			}), r = []
		}
		var r = [];
		return e.addEventListener = func.decorate(e.addEventListener, function(e, n) {
			var t = n[0],
				o = n[1];
			return e.call(this, t, o) ? (r.push({
				type: t,
				listener: o
			}), !0) : !1
		}), {
			clear: n
		}
	}



});