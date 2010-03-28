var EventHub = function() {
    var eventSubscribers = new Array();

    this.subscribe = function(eventName, callback) {
        if (eventName == null) throw "Event name is null.";
        if (callback == null) throw "Subscriber for event '" + eventName + "' is null.";

        getCallbacksForEvent(eventName).push(callback);
    };

    this.publish = function(eventName) {
        if (eventName == null) throw "Event name is null.";

        var eventCallbacks = getCallbacksForEvent(eventName);
        for (var i in eventCallbacks) {
            eventCallbacks[i]();
        }
    };

    function getCallbacksForEvent(eventName) {
        var eventCallbacks = eventSubscribers[eventName];

        if (eventCallbacks == null) {
            eventCallbacks = new Array();
            eventSubscribers[eventName] = eventCallbacks;
        }
        return eventCallbacks;
    }
};