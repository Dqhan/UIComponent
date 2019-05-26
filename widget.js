"use strict";
; (function (global, $, factory, plug) {
    global[plug] = factory.call(global, $);
})(window, $, function ($) {
    var __dialog__ = function (ops) {
        this.__dialogC__  ={};
        this.__dialogC__ = this.extends(this.__dialogC__, ops)
    };
    __dialog__.prototype = {
        init: function () {
            this.dom = this.__dialogC__.dom;
            this.el = this.__dialogC__.el;
            this.dom.classList.add('dialog');
            this.el.classList.add('dialog-content');
        },
        render: function () {
            var fragement = [];
            fragement.add("<span class=\"dialog-title\"></span>");
            this.dom.innerHTML = fragement.join('');
            if (this.el) this.dom.appendChild(this.el);
            document.body.appendChild(this.dom);
        },
        extends: function (target, ops) {
            for (var i in ops) {
                target[i] = ops[i];
            }
            return target;
        }
    };
  return  {
      Dialog: __dialog__
  };
}, "aui");