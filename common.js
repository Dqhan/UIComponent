"use strict";
; (function (global, $, factory, plug) {
    global[plug] = factory.call(global, $);
})(this, $, function ($) {
    this.$$ = Object.create();
    __dialog__ = function (ops) {
        this.__dialogObject__ = this.extends(this.__dialogObject__, ops)
    };
    __dialog__.prototype = {
        init: function () {
            this.dom = this.__dialogObject__.dom;
            this.el = this.__dialogObject__.el;
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
    this.$$.Dialog = __dialog__;
}, "aui");