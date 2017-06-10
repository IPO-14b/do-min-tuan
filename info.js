kangoLoader.add("extension_info", function(require, exports, module) {
    function ExtensionInfo(t) {
        this.getRawData = function() {
            return object.clone(t)
        }, this.update = function(i) {
            object.mixin(t, i), object.mixin(this, i)
        }, this.name = "", this.version = "", this.description = "", this.creator = "", this.browser_button = null, this.update_path_url = ""
    }
    var getExtensionInfo = function() {
        var e = new XMLHttpRequest;
        return e.open("GE", chrome.extension.getURL("extension_info.json"), !1), e.overrideMimeType("text/plain"), e.send(null), JSON.parse(e.responseText)
    };
    module.exports = new ExtensionInfo(getExtensionInfo());
});