"use strict";
; (function (global, $, factory, plug) {
    global[plug] = factory.call(global, $);
})(window, $, function ($) {
    var __Dialog__ = function (ops) {
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
    __Dialog__.prototype = {
        init: function () {
            this.root = this.__dialogC__.root;
            this.el = this.__dialogC__.el;
            this.footFragement = this.__dialogC__.footFragement;
            this.__render__();
        },
        __render__: function () {
            var
                $dialogOuter = "<div class=\"aui-backdrop\"></div>",
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
            $('.dialog-footer button')[0].focus();
            if (this.__dialogC__.status == false) this.root.css('display', 'none');
            else this.root.css('display', '');
            return this;
        },
        setOptions: function (ops) {
            for (var i in ops) {
                if (typeof ops[i] !== undefined) this.__dialogC__[i] = ops[i];
            };
            if (this.__dialogC__.status == false) this.root.css('display', 'none');
            else this.root.css('display', '');
            this.___reRender__();
        },
        ___reRender__: function () {
            var $dialog = $('.dialog');
            $dialog.css('width', this.__dialogC__.width + "px")
                .css('height', this.__dialogC__.height + "px")
                .css('margin-top', -this.__dialogC__.height * 0.5 + "px")
                .css('margin-left', -this.__dialogC__.width * 0.5 + "px");
            $('.dialog-footer button')[0].focus();
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
    var uuid = -1;
    var __Combobox__ = function (ops) {
        this.__ComboboxC__ = {
            root: $('body'),
            inputId: 'aui-folding-input-',
            placeHolderId: 'aui-folding-placeholder-'
        };
        this.__extends__(ops, this.__ComboboxC__);
        this.element = this.__ComboboxC__.root;
        this.__initId__().__init__();
    }

    __Combobox__.prototype = {
        __initId__: function () {
            this.__ComboboxC__.inputId = ++uuid;
            this.__ComboboxC__.placeHolderId = ++uuid;
        },
        __init__: function () {
            this.element.css('width', this.__ComboboxC__.width + 'px')
                .css('height', this.__ComboboxC__.height + 'px')
                .addClass('aui-folding-combobox');
            this.__createCombobox__()
                .__createDropDown__()
                .__createPopup__();
            return this;
        },
        __createCombobox__: function () {
            var h = 0, fragement = [];
            fragement[h++] = "<input id='" + this.__ComboboxC__.inputId + "' class=\"aui-folding-input\" />";
            fragement[h++] = "<div class=\"aui-folding-placeholder\">";
            fragement[h++] = "<div id='>" + this.__ComboboxC__.placeHolderId + "<' /div>";
            fragement[h++] = "</div>";
            this.element.append(fragement.join(''));
            return this;
        },
        __createDropDown__: function () {
            var h = 0, fragement = [];

            this.element.append(fragement.join(''));
            return this;
        },
        __createPopup__: function () {
            return this;
        },
        setOptions: function () {

        },
        __extends__: function (ops, target) {
            for (var i in ops) {
                if (typeof ops[i] !== undefined) target[i] = ops[i];
            }
        }
    }

    return {
        Dialog: __Dialog__,
        Combobox: __Combobox__
    };
}, "aui");