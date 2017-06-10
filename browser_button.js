kangoLoader.add("browser_button", function(require, exports, module) {
	function BrowserButtonBase(t) {
		EventTarget.call(this), this._details = t
	}

function BrowserButton(t) {
    BrowserButtonBase.call(this, t), this._popupDetails = null, chrome.browserAction.onClicked.addListener(func.bind(this._onClicked, this)), this._initDetails(t)
	}
	var Info = require("info");
	BrowserButton.prototype = object.extend(BrowserButtonBase, {
		_onClicked: function() {
			return this.fireEvent(this.event.COMMAND)
		},
		_initDetails: function(t) {
			object.isObject(t) && (object.isString(t.icon) && this.setIcon(t.icon), object.isString(t.caption) && this.setCaption(t.caption))
		},
		setTooltipText: function(t) {
			chrome.browserAction.setTitle({
				title: t.toString()
			})
		},
		setCaption: function(t) {},
		setIcon: function(t) {
			chrome.browserAction.setIcon({
				path: io.getFileUrl(t)
			})
		},
		setBadgeValue: function(t) {
			chrome.browserAction.setBadgeText({
				text: null != t && 0 != t ? t.toString() : ""
			})
		},
		setBadgeBackgroundColor: function(t) {
			chrome.browserAction.setBadgeBackgroundColor({
				color: t
			})
		},
	});

});