"use strict";
(function (global, $, $$, factory, plugin) {
    if (typeof global[plugin] !== "object") global[plugin] = {};
    $.extend(global[plugin], factory.call(global, $, $$));
})(
    window,
    $,
    $$,
    function ($, $$) {
        var uuid = -1;

        var _RichCombobx = function (props) {
            return new _RichCombobx.fn.init(props);
        };

        var prototype = (_RichCombobx.fn = _RichCombobx.prototype = {
            _constructor: function (props) {
                if (props.isDropdown === "false" || props.isDropdown === "true") props.isDropdown = JSON.parse(props.isDropdown);
                if (props.isInput === "false" || props.isInput === "true") props.isInput = JSON.parse(props.isInput);
                $.extend(this._ops, props);
                this._initId();
                this._ops.element.id = this._richcomboboxId;
                this.$element = $(this._ops.element);
                this.$element.addClass("ui-rich-combobox");
            },

            _initId: function () {
                ++uuid;
                this._richcomboboxId = "ui-rich-combobox" + uuid;
                this._popupId = "ui-rich-combobox-popup-" + uuid;
                return this;
            },

            _setComboboxItems: function () {
                this._setSelectionItems()
                    ._setSelectionEvent();
            },

            _getCondition: function () {
                var value = "";
                value = this.$input.val().toLowerCase();
                return value;
            },

            _getInputValue: function (item) {
                return item["name"];
            },

            _updateFilteredSelections: function () {
                var items = this._ops.items,
                    i = 0,
                    len = items.length;
                for (; i < len; i++) {
                    if (this._filterSelectionResultIndex.includes(i)) {
                        $(this.$listbox.children()[i]).show();
                    } else {
                        $(this.$listbox.children()[i]).hide();
                    }
                }
                this._show();
            },

            _hideShow: function () {
                this._ops.isPopupOpen = !this._ops.isPopupOpen;
                if (this._ops.isPopupOpen) this._show();
                else this._hide();
            },

            _hide: function () {
                this._ops.isPopupOpen = false;
                this.$popup.hide();
            },

            _show: function () {
                this._ops.isPopupOpen = true;
                this.$popup.show();
                this._setPopupPosition();
                this.$selections.removeClass("ui-rich-combobox-selection-selected");
                if (
                    this._filterSelectionResultIndex.length == 0 &&
                    this.$selections.length == this._ops.items.length
                ) {
                    if (this._ops.selectedIndex == -1)
                        $(this.$selections[0]).addClass("ui-rich-combobox-selection-selected");
                    else
                        $(this.$selections[this._ops.selectedIndex]).addClass("ui-rich-combobox-selection-selected");
                    return;
                }
                if (
                    this._filterSelectionResultIndex.includes(this._ops.selectedIndex)
                ) {
                    $(this.$selections[this._ops.selectedIndex]).addClass("ui-rich-combobox-selection-selected");
                    return;
                } else {
                    $(this.$selections[this._filterSelectionResultIndex[0]]).addClass("ui-rich-combobox-selection-selected");
                    return;
                }
            },

            _setPopupPosition: function () {
                var self = this;
                this.$popup.css({ top: 0 }).position({
                    my: "left top",
                    at: "left bottom",
                    of: self._ops.element,
                    collision: "flip"
                });
            }
        });

        /**
         * set style
         */

        $.extend(prototype, {
            _setRichCombobxSytle: function () {
                this.$element
                    .css("width", this._ops.width)
                    .css("height", this._ops.height);
                return this;
            }
        });

        /**
         * create rich-combobox
         */

        $.extend(prototype, {
            _render: function () {
                this._createRichCombobox()
                    ._initMember()
                    ._bindEvent();
                this._setRichCombobxSytle();
                return this;
            },

            _createRichCombobox: function () {
                this._createRichComboboxContainer()
                    ._createPopup();
                return this;
            },

            _createRichComboboxContainer: function () {
                var h = -1,
                    fragement = [];
                fragement[++h] = "<div class=\"ui-rich-combobox-container\">"
                if (this._ops.isInput) {
                    fragement[++h] = "<input type=\"text\" class=\"ui-rich-combobox-input\"/>";
                    fragement[++h] = "</div>";
                }
                if (this._ops.isDropdown) {
                    fragement[++h] = "<div class=\"ui-rich-combobx-icon\">";
                    fragement[++h] = "<span class=\"fi-page-triangle-down-bs\"></span>";
                    fragement[++h] = "</div>";
                }
                this.$element.append(fragement.join(""));
                return this;
            },

            _createPopup: function () {
                var h = -1,
                    fragement = [];
                fragement[++h] = "<div style=\"width:" + this.$element.width() + "px;display:none;\" class=\"ui-rich-combobox-popup\" id=" + this._popupId + ">";
                fragement[++h] = "<div class=\"ui-rich-combobox-listbox\">";
                fragement[++h] = "<div class=\"ui-rich-combobox-listbox-container\">";
                fragement[++h] = "</div>";
                fragement[++h] = "</div>";
                fragement[++h] = "</div>";
                $("body").append(fragement.join(""));
                return this;
            }
        });

        /**
         * selectction function
         */

        $.extend(prototype, {
            _setSelectionItems: function () {
                var i = 0,
                    len = this._ops.items.length,
                    fragement = [];
                this.$listbox.empty();
                for (; i < len; i++) {
                    fragement.push('<div class="ui-rich-combobox-selection-container">');
                    fragement.push("<div role='option' class=\"ui-rich-combobox-selection\" data-index=" + i + ">");
                    fragement.push(this._ops.items[i].name);
                    fragement.push("</div>");
                    fragement.push("</div>");
                }
                this.$listbox.append(fragement.join(""));
                return this;
            },

            _setSelectionEvent: function () {
                this.$selections = $("#" + this._popupId + " .ui-rich-combobox-selection");
                this.$selections.on("click" + this._eventNameSpave, this._onSelectionClick.bind(this));
                return this;
            },



            _filterSelection: function (e) {
                var condition = this._getCondition();
                var i = 0,
                    len = this._ops.items.length,
                    items = this._ops.items;
                for (var i = 0; i < len; i++) {
                    var name = this._getInputValue(items[i]);
                    if (name.indexOf(condition) > -1) {
                        this._filterSelectionResultIndex.push(i);
                    }
                }
                this._updateFilteredSelections();
                this._filterSelectionResultIndex.length = 0;
            }
        });

        /**
         *  init member
         */

        $.extend(prototype, {
            _initMember: function () {
                this.$container = $("#" + this._richcomboboxId + " .ui-rich-combobox-container");
                this.$input = $("#" + this._richcomboboxId + " .ui-rich-combobox-input");
                this.$dropdown = $("#" + this._richcomboboxId + " .ui-rich-combobx-icon");
                this.$popup = $("#" + this._popupId);
                this.$listbox = $("#" + this._popupId + " .ui-rich-combobox-listbox-container");
                return this;
            }
        });

        /**
         * bind events
         */

        $.extend(prototype, {
            _bindEvent: function () {
                this.$input
                    .on("mousedown" + this._eventNameSpave, this._onComboboxMousedown.bind(this))
                    .on("focus" + this._eventNameSpave, this._onComboboxFocus.bind(this))
                    .on("blur" + this._eventNameSpave, this._onComboboxBlur.bind(this))
                    .on("mouseover" + this._eventNameSpave, this._onComboboxMouseover.bind(this))
                    .on("mouseleave" + this._eventNameSpave, this._onComboboxMouseleave.bind(this))
                    .on("keyup", +this._eventNameSpave, this._onInputkeyDown.bind(this));

                this.$listbox.on("mousedown" + this._eventNameSpave, this._onListboxMousedown.bind(this));

                this.$dropdown.on("click" + this._eventNameSpave, this._onDropdownClick.bind(this));

                this._debounceHandler = $$.debounce(this._filterSelection.bind(this));
            }
        });

        /**
         * event handler
         */

        _RichCombobx.fn._onInputkeyDown = function (e) {
            var self = e.data,
                keyCode = e.which;
            this._debounceHandler(e.target.value);
        };

        _RichCombobx.fn._onListboxMousedown = function (e) {
            e.stopPropagation();
            e.preventDefault();
        };

        _RichCombobx.fn._onDropdownClick = function (e) {
            this._hideShow();
        };

        _RichCombobx.fn._onComboboxMousedown = function (e) {
            this._hideShow();
        };

        _RichCombobx.fn._onComboboxFocus = function (e) {
            this.$element.addClass("ui-rich-combobox-focused");
        };

        _RichCombobx.fn._onComboboxBlur = function (e) {
            this.$element.removeClass("ui-rich-combobox-focused");
            this._hide();
        };

        _RichCombobx.fn._onComboboxMouseover = function (e) {
            this.$element.addClass("ui-rich-combobox-mouseover");
        };

        _RichCombobx.fn._onComboboxMouseleave = function (e) {
            this.$element.removeClass("ui-rich-combobox-mouseover");
        };

        _RichCombobx.fn._onSelectionClick = function (e) {
            var text = e.currentTarget.textContent;
            this._updateContainer(text)
                ._bindSelectedItemsClose()
                ._addResult(text);
            $$.trigger("selectionChanged",
                this.$element,
                $$.Event({
                    element: this.$element,
                    oldValue: this._ops.oldValue,
                    newValue: this._ops.newValue
                })
            );
            this._ops.oldValue = this._ops.newValue;
            this._hide();
        }

        _RichCombobx.fn._updateContainer = function (text) {
            if (this._ops.newValue.filter(d => d.name === text).length !== 0) return this;
            var fragement = [],
                h = -1;
            for (var i = 0; i < this._ops.items.length; i++) {
                if (text === this._ops.items[i].name) {
                    fragement[++h] = "<div class=\"ui-rich-combobox-selected-item\" role=\"grid-cell\" data-index=\" " + i + "\">";
                    fragement[++h] = "<div class=\"ui-rich-combobox-selected-item-text\">";
                    fragement[++h] = text;
                    fragement[++h] = "</div>";
                    fragement[++h] = "<div class=\"ui-rich-combobox-selected-item-close fi-page-cancel-bs\">";
                    fragement[++h] = "</div>";
                    fragement[++h] = "</div>";
                    break;
                } else
                    continue;
            };
            this.$input.before(fragement.join(""));
            return this;
        }

        _RichCombobx.fn._bindSelectedItemsClose = function () {
            $("#" + this._richcomboboxId + " .ui-rich-combobox-selected-item-close").on('click', this._closeSelectedItemsHandler.bind(this));
            return this;
        }

        _RichCombobx.fn._closeSelectedItemsHandler = function (e) {
            var text = e.currentTarget.parentNode.textContent;
            this._deleteResult(text);
            e.currentTarget.parentNode.remove();
        }

        _RichCombobx.fn._addResult = function (text) {
            if (this._ops.newValue.filter(d => d.name === text).length === 0)
                this._ops.newValue.push(this._ops.items.filter(d => d.name === text)[0]);
            return this;
        }

        _RichCombobx.fn._deleteResult = function (text) {
            for (var i = 0; i < this._ops.newValue.length; i++) {
                if (this._ops.newValue.filter(d => d.name === text).length !== 0) {
                    this._ops.newValue.splice(i, 1);
                    break;
                } else continue;
            }
        }


        /**
         * 非 Combobox 内部 function
         */

        _RichCombobx.fn.init = function (props) {
            this._eventNameSpave = ".rich-combobox-event";
            this._ops = {
                element: null,
                items: [],
                isPopupOpen: false,
                oldValue: [],
                newValue: [],
                selectedIndex: -1,
                width: '600px',
                height: '40px',
                isDropdown: true,
                isInput: true
            };
            this._constructor(props);
            this._render()
                ._setComboboxItems();
            // this._hide();

            this._delay = 200;
            this._filterSelectionResultIndex = [];
            return this;
        };

        _RichCombobx.fn.setOptions = function (props) {
            $.extend(this._ops, props);
            this._setRichCombobxSytle();
            this._setComboboxItems();
        };

        _RichCombobx.fn.init.prototype = _RichCombobx.prototype;

        return {
            RichCombobox: _RichCombobx
        };
    },
    "ui"
);
