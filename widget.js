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
                $dialogOuter = "<div class=\"ui-backdrop\"></div>",
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
        this.__eventNameSpave__ = ".combobox-event";
        this.__ComboboxC__ = {
            root: $('body'),
            inputId: 'ui-combobox-input-',
            dorpdownId: 'ui-combobox-dropdown-',
            popupId: 'ui-combobox-popup-',
            placeHolderId: 'ui-combobox-placeholder-',
            listboxId: 'ui-combobox-listboxId-',
            items: [],
            selectedIndex: 0,
            popupOpend: false
        };
        this.__$Dom__ = {};
        this.__extends__(ops, this.__ComboboxC__);
        this.__element__ = this.__ComboboxC__.root;
        this.__initId__().__init__().__load__();
    }

    __Combobox__.prototype = {
        __initId__: function () {
            this.__uuId = ++uuid;
            this.__ComboboxC__.inputId += uuid;
            this.__ComboboxC__.dorpdownId += uuid;
            this.__ComboboxC__.popupId += uuid;
            this.__ComboboxC__.placeHolderId += uuid;
            this.__ComboboxC__.listboxId += uuid;
            return this;
        },
        __init__: function () {
            this.__element__.css('width', this.__ComboboxC__.width + 'px')
                .css('height', this.__ComboboxC__.height + 'px')
                .addClass('ui-combobox');
            this.__createCombobox__()
                .__createDropDown__()
                .__createPopup__()
                .__initDom__()
                .__bindEvent__();
            return this;
        },
        __createCombobox__: function () {
            var h = -1, fragement = [];
            fragement[++h] = "<input id='" + this.__ComboboxC__.inputId + "' class=\"ui-combobox-input\" />";
            fragement[++h] = "<div class=\"ui-combobox-placeholder\">";
            fragement[++h] = "<div id='>" + this.__ComboboxC__.placeHolderId + "<' /div>";
            fragement[++h] = "</div>";
            this.__element__.append(fragement.join(''));
            return this;
        },
        __createDropDown__: function () {
            var h = -1, fragement = [];
            fragement[++h] = "<div id=" + this.__ComboboxC__.dorpdownId + " class=\"ui-combobox-dropdown-container\">";
            fragement[++h] = "<div class=\"ui-dorpdown-icon\"></div>";
            fragement[++h] = "</div>";
            this.__element__.append(fragement.join(''));
            return this;
        },
        __createPopup__: function () {
            var h = -1, fragement = [];
            fragement[++h] = "<div class=\"ui-combobox-popup\" id=" + this.__ComboboxC__.popupId + ">";
            fragement[++h] = "<div class=\"ui-combobox-listbox\">";
            fragement[++h] = "<div class=\"ui-combobox-listbox-container\" id=" + this.__ComboboxC__.listboxId + ">";
            fragement[++h] = "</div>";
            fragement[++h] = "</div>";
            fragement[++h] = "</div>";
            $('body').append(fragement.join(''));
            return this;
        },
        __initDom__: function () {
            this.__$Dom__.$listbox = $('#' + this.__ComboboxC__.listboxId);
            this.__$Dom__.$input = $('#' + this.__ComboboxC__.inputId);
            this.__$Dom__.$popup = $('#' + this.__ComboboxC__.popupId);
            return this;
        },
        __load__: function () {
            this.__addItems__();
            this.__$Dom__.$popup.hide();
        },
        setOptions: function (key, ops) {
            var self = this,
                clr = {
                    setStyle: self.__setSytle__,
                    setItems: self.__setItems__
                }
            clr[key](ops);
        },
        __setSytle__: function (ops) {
            this.__$Dom__.$popup.css('width', ops.popupWidth)
                .css('height', ops.popupHeight)
                .css('max-width', ops.popupMaxWidth)
                .css('max-height', ops.popupMaxHeight)
            return this;
        },
        __setItems__: function (ops) {
            this.__ComboboxC__.items = ops.items;
            this.__addItems__().__setSelectedIndex__(ops.selectedIndex);
        },
        __addItems__: function () {
            var i = 0, c = this.__ComboboxC__.items.length, fragement = [];
            for (; i < c; i++) {
                fragement.push("<div class=\"ui-combobox-selection-container\">");
                fragement.push("<div role='option' class=\"ui-combobox-selection\" id=ui-combobox-selection-select-option-" + i + ">");
                fragement.push(this.__ComboboxC__.items[i].name);
                fragement.push("</div>");
                fragement.push("</div>");
            }
            this.__$Dom__.$listbox.append(fragement.join(''));
            return this;
        },
        __setSelectedIndex__: function (selectedIndex, dom) {
            this.__ComboboxC__.selectedIndex = selectedIndex;
            if (dom) this.__$Dom__.$input[0].value = dom.textContent;
            return this;
        },
        __bindEvent__: function () {
            var eventName = this.__eventNameSpave__,
                self = this;
            this.__$Dom__.$input.on('mousedown' + eventName, function (e) {
                self.__ComboboxC__.popupOpend = !self.__ComboboxC__.popupOpend;
                self.__hideShow__();
            }).on('focus' + eventName, function (e) {
                self.__element__.addClass('ui-combobox-focused');
            }).on('blur' + eventName, function (e) {
                self.__element__.removeClass('ui-combobox-focused');
                self.__$Dom__.$popup.hide();
            }).on('mouseover' + eventName, function () {
                self.__element__.addClass('ui-combobox-mouseover');
            }).on('mouseleave' + eventName, function () {
                self.__element__.removeClass('ui-combobox-mouseover');
            });
            this.__$Dom__.$listbox.on('mousedown' + eventName, function (e) {
                var selectedIndex = e.target.id.replace('ui-combobox-selection-select-option-', '');
                self.__setSelectedIndex__(selectedIndex, e.target);
                self.__ComboboxC__.popupOpend = false;
                self.__hideShow__();
            });
        },
        __hideShow__: function () {
            if (!this.__ComboboxC__.popupOpend)
                this.__hide__();
            else
                this.__show__();
        },

        __hide__: function () {
            this.__$Dom__.$popup.hide();
            
        },

        __show__: function () {
            this.__$Dom__.$popup.show();
            this.__setPopupPosition__();
        },

        __setPopupPosition__() {
            var self = this;
            this.__$Dom__.$popup
                .css({ top: 0 })
                .position({
                    my: "left top",
                    at: "left bottom",
                    of: self.__element__,
                    collision: "flip"
                })
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