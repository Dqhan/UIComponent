"use strict";
; (function (global, $, factory, plug) {
    global[plug] = factory.call(global, $);
})(window, $, function ($) {
    var __dialog__ = function (ops) {
        this.__dialogC__ = {};
        this.__dialogC__ = this.extends(this.__dialogC__, ops);
    };
    __dialog__.prototype = {
        init: function () {
            this.root = this.__dialogC__.root;
            this.el = this.__dialogC__.el;
            return this;
        },
        render: function () {
            var
                $dialogOuter = "<div class=\"dialog-bg\"></div>",
                $dialog = "<div class=\"dialog\"></div>",
                $dialogTitle = "<div class=\"dialog-title\"></div>",
                $dialogContent = "<div class=\"dialog-content\"></div>";
            this.root
                .wrapInner($dialogContent)
                .prepend($dialogTitle)
                .wrapInner($dialog)
                .wrapInner($dialogOuter);
            return this;
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