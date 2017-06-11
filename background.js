if (!localStorage.hasOwnProperty("first-run"))
    localStorage["first-run"] = "true";
if (!localStorage.hasOwnProperty("status"))
    localStorage["status"] = "on";
if (!localStorage.hasOwnProperty("test_time"))
    localStorage["test_time"] = "" + new Date().getTime();
if (!localStorage.hasOwnProperty("test_hour"))
    localStorage["test_hour"] = "20";
localStorage["last_hosts_0"] = "0";
localStorage["last_hosts_1"] = "1";


chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.operation == 'set') {
        localStorage[request.key] = request.value;
    } else if (request.operation == 'get') {
        sendResponse({
            val: localStorage[request.key]
        });
    } else if (request.operation == "hostname") {
        localStorage["last_hosts_0"] = localStorage["last_hosts_1"]
        localStorage["last_hosts_1"] = request.value;
    }
})

function isNowTestTime() {
    if (localStorage["last_hosts_0"] != localStorage["last_hosts_1"]) {
        return false;
    }
    var test_date = new Date(parseInt(localStorage["test_time"]));
    if (new Date() > test_date)
        return true;
    else
        return false;
}

function setLingoletTestTime(new_time) {
    var test_date = new Date(parseInt(localStorage["test_time"]));
    if (new Date(parseInt(new_time)) > test_date)
        localStorage["test_time"] = new_time
}

is_test_notification_showed = false;
setInterval(function() {
    if (isNowTestTime() && !is_test_notification_showed) {

        var opt = {
            type: "basic",
            title: "It's time to spend 3 minutes with English",
            message: "Improve rapidly every day!",
            iconUrl: "images/icon_128.png",
            buttons: [{
                title: "Play & learn",
                iconUrl: "images/stream_test_finished.png"
            }, {
                title: "Change notification settings",
                iconUrl: "images/settings_icon.png"
            }]
        }
        chrome.notifications.onClosed.addListener(testNotificationOnClose);
        chrome.notifications.onButtonClicked.addListener(onTestNotificationButtonClick);
        test_notification = chrome.notifications.create("testNotify", opt, testNotificationCallback);
        is_test_notification_showed = true;
    }
}, 1000)

function testNotificationCallback(id) {

}

function testNotificationOnClose(id) {
    if (id.equal("testNotify")) {
        var d = new Date();
        var h = parseInt(localStorage["test_hour"]);
        d.setSeconds(0, 0);
        d.setMinutes(0);
        d.setHours(h);
        if (new Date() > d)
            d.setHours(24 + h);
        var new_time = "" + d.getTime();

        setLingoletTestTime(new_time);
        is_test_notification_showed = false;
    }
}