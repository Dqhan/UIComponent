(function (global, $, factory) {
  global = factory.call(global, $);
})(window, $, function ($) {
  var UI = {};

  UI.Event = function (props) {
    if (!(this instanceof $$.Event)) return new $$.Event(props);
    this.oldValue = null;
    this.newValue = null;
    this.element = null;
    this.params = {};
    $.extend(this, props);
  };

  UI.trigger = function (type, el, args) {
    var event = $.Event(type, args);
    el.trigger(event, args);
  };

  UI.isNumber = function (target) {
    var regex = /^[+]{0,1}(\d+)$/;

    if (regex.test(target)) return true;
    else return false;
  };

  UI.debounce = function (fn) {
    var timer,
      self = this;
    return function (e) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(self, [e]);
      }, self._delay);
    };
  },


    window.UI = window.$$ = UI;
});
