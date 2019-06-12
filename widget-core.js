
(function (global, $, factory) {
    global = factory.call(global, $);
})(window, $, function ($) {
    var DUI = {};
    window.DUI = window.$$ = DUI;
    window.$$.Event = function (props) {
        if (!(this instanceof $$.Event))
            return new $$.Event(props);
        this.oldValue = null;
        this.newValue = null;
        this.element = null;
        this.params = {};
        $.extend(this, props);
    };

    window.$$.trigger = function (type, el, args) {
        var event = $.Event(type, args);
        el.trigger(event, args);
    };
})