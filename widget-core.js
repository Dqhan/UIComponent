(function (global, $, factory) {
  global = factory.call(global, $);
})(window, $, function ($) {
  var R = {};

  R.Event = function (props) {
    if (!(this instanceof $$.Event)) return new $$.Event(props);
    this.oldValue = null;
    this.newValue = null;
    this.element = null;
    this.params = {};
    $.extend(this, props);
  };

  R.trigger = function (type, el, args) {
    var event = $.Event(type, args);
    el.trigger(event, args);
  };

  R.isNumber = function (target) {
    var regex = /^[+]{0,1}(\d+)$/;

    if (regex.test(target)) return true;
    else return false;
  };

  //防抖
  R.debounce = function (fn, delay) {
    var timer,
      self = this;
    return function (e) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(self, [e]);
      }, delay);
    };
  };

  //节流
  R.throttle = function () {

  }

  window.R = window.$$ = R;
});
