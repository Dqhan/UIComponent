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
            this.el = this.__dialogC__.el;
            this.el.classList.add('dialog-content');
        },
        render: function () {
            var fragement = [];
            fragement.push("<div class=\"dialog\">");
            fragement.push("<span class=\"dialog-title\"></span>");
            fragement.push("</div>");
            document.getElementsByClassName('dialog').innerHTML = fragement.join('');
            if (this.el) this.dom.appendChild(this.el);
        },
        extends: function (target, ops) {
            for (var i in ops) {
                target[i] = ops[i];
            }
            return target;
        }
    };
  return {
      Dialog: __dialog__
  };
}, "aui");