var _kangoLoader = function() {
	function r(r, e) {
		t[r] = e
	}

	function e(r) {
		if (i[r]) return i[r].exports;
		if (t[r]) {
			var o = i[r] = i[r] || {
				id: r,
				exports: {}
			};
			return t[r](e, o.exports, o), delete t[r], o.exports
		}
		throw new Error("Unable to find module with id=" + r)
	}

	function o() {
		for (var r in i)
			if (i.hasOwnProperty(r)) {
				var e = i[r];
				e.exports.dispose && e.exports.dispose(), e.dispose && e.dispose()
			}
		i = {}, t = {}
	}
	var i = {},
		t = {};
	return {
		add: r,
		require: e,
		dispose: o
	}
}();