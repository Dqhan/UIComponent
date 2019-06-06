"use strict";
; (function (global, $, factory, plug) {
    global[plug] = factory.call(global, $);
})(window, $, function ($) {
    var __dialog__ = function (ops) {
        this.__dialogC__ = {
            root: $('body'),
            width: 400,
            height: 500,
            title: 'Dialog',
            footFragement: [],
            status: false
        };
        this.__events__ = {

        };
        this.__dialogC__ = this.extends(this.__dialogC__, ops);
    };
    __dialog__.prototype = {
        init: function () {
            this.root = this.__dialogC__.root;
            this.el = this.__dialogC__.el;
            this.footFragement = this.__dialogC__.footFragement;
            return this;
        },
        render: function () {
            var
                $dialogOuter = "<div class=\"dialog-bg\"></div>",
                $dialog = "<div class=\"dialog\" style=" +
                    "width:" + this.__dialogC__.width + "px" +
                    ";height:" + this.__dialogC__.height + "px" +
                    ";margin-top:" + -this.__dialogC__.height * 0.5 + "px" +
                    ";margin-left:" + -this.__dialogC__.width * 0.5 + "px" +
                    "></div>",
                $dialogTitle = "<div class=\"dialog-title\">" + this.__dialogC__.title + "</div>",
                $dialogContent = "<div class=\"dialog-content\"></div>";
            // var $foot = [];
            // $foot.push("<div class=\"dialog-footer\">");
            // if (this.footFragement.length !== 0)
            //     this.footFragement.forEach(function (el, index) {
            //         $foot.push("<button type=\"button\">" + el.text + "</button>");
            //     });
            // $foot.push("</div>");
            // $foot = $foot.join('');
            var $foot = document.createElement('div');
            $foot.classList.add("dialog-footer");
            if (this.footFragement.length !== 0)
                this.footFragement.forEach(function (el, index) {
                    var button = document.createElement('button');
                    button.textContent = el.text;
                    button.onclick = function () {
                        el.click();
                    }
                    $foot.appendChild(button);
                });
            this.root
                .wrapInner($dialogContent)
                .prepend($dialogTitle)
                .wrapInner($dialog)
                .wrapInner($dialogOuter);
            $('.dialog').append($foot);
            if (this.__dialogC__.status == false) this.root.css('display', 'none');
            else this.root.css('display', '');
            // if (this.__dialogC__.status == false) this.destory();
            return this;
        },
        setOptions: function (ops) {
            for (var i in ops) {
                if (typeof ops[i] !== undefined) this.__dialogC__[i] = ops[i];
            };
            if (this.__dialogC__.status == false) this.root.css('display', 'none');
            else this.root.css('display', '');
            this.reRender();
        },
        reRender: function () {
            var $dialog = $('.dialog');
            $dialog.css('width', this.__dialogC__.width + "px")
                .css('height', this.__dialogC__.height + "px")
                .css('margin-top', -this.__dialogC__.height * 0.5 + "px")
                .css('margin-left', -this.__dialogC__.width * 0.5 + "px")
        },
        extends: function (target, ops) {
            for (var i in ops) {
                if (ops[i]) target[i] = ops[i];
            }
            return target;
        },
        destory: function () {
            $('.dialog-bg').remove();
        }
    };
    return {
        Dialog: __dialog__
    };
}, "aui");