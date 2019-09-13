"use strict";
(function (global, $, $$, factory, plugin) {
    if (typeof global[plugin] !== "object") global[plugin] = {};
    $.extend(true, global[plugin], factory.call(global, $, $$));
})(
    window,
    $,
    $$,
    function ($, $$) {
        var uuid = -1;

        var _Combobox = function (ops) {
            return new _Combobox.fn.init(ops);
        };

        var prototype = (_Combobox.fn = _Combobox.prototype = {
            _constructor: function () {
                this._element = this._ops.element;
                this._setComboboxStyle();
            },

            _initId: function () {
                ++uuid;
                this._ops.inputId = "ui-combobox-input-" + uuid;
                this._ops.dorpdownId = "ui-combobox-dropdown-" + uuid;
                this._ops.popupId = "ui-combobox-popup-" + uuid;
                this._ops.placeHolderId = "ui-combobox-placeholder-" + uuid;
                this._ops.listboxId = "ui-combobox-listboxId-" + uuid;
                return this;
            },

            _setComboboxItems: function () {
                this._setSelectionItems()
                    ._setSelectionEvent()
                    ._setSelectedItem(this._ops.selectedItem);
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
                this._ops.popupOpend = !this._ops.popupOpend;
                if (this._ops.popupOpend) this._show();
                else this._hide();
            },

            _hide: function () {
                this._ops.popupOpend = false;
                this.$popup.hide();
            },

            _show: function () {
                this._ops.popupOpend = true;
                this.$popup.show();
                this._setPopupPosition();
                this.$selections.removeClass("ui-combobox-selection-selected");
                if (
                    this._filterSelectionResultIndex.length == 0 &&
                    this.$selections.length == this._ops.items.length
                ) {
                    if (this._ops.selectedIndex == -1)
                        $(this.$selections[0]).addClass("ui-combobox-selection-selected");
                    else
                        $(this.$selections[this._ops.selectedIndex]).addClass("ui-combobox-selection-selected");
                    return;
                }
                if (
                    this._filterSelectionResultIndex.includes(this._ops.selectedIndex)
                ) {
                    $(this.$selections[this._ops.selectedIndex]).addClass("ui-combobox-selection-selected");
                    return;
                } else {
                    $(this.$selections[this._filterSelectionResultIndex[0]]).addClass("ui-combobox-selection-selected");
                    return;
                }
            },

            _setPopupPosition: function () {
                var self = this;
                this.$popup.css({ top: 0 }).position({
                    my: "left top",
                    at: "left bottom",
                    of: self._element,
                    collision: "flip"
                });
            }
        });

        /**
         * set style
         */

        $.extend(true, prototype, {
            _setComboboxStyle: function () {
                this._element.addClass("ui-combobox");
                this._element
                    .css("width", this._ops.width + "px")
                    .css("height", this._ops.height + "px");
            },

            _setPopupSytle: function () {
                this.$popup
                    .css("width", this._ops.popupWidth)
                    .css("height", this._ops.popupHeight)
                    .css("max-width", this._ops.popupMaxWidth)
                    .css("max-height", this._ops.popupMaxHeight);
                return this;
            }
        });

        /**
         * create combobox
         */

        $.extend(true, prototype, {
            _render: function () {
                this._createCombobox()
                    ._createDropDown()
                    ._createPopup()
                    ._initMember()
                    ._bindEvent();
                return this;
            },

            _createCombobox: function () {
                var h = -1,
                    fragement = [];
                fragement[++h] =
                    "<input id=" + this._ops.inputId + ' class="ui-combobox-input" />';
                fragement[++h] = '<div class="ui-combobox-placeholder">';
                fragement[++h] = "<div id='>" + this._ops.placeHolderId + "<' /div>";
                fragement[++h] = "</div>";
                this._element.append(fragement.join(""));
                return this;
            },

            _createDropDown: function () {
                var h = -1,
                    fragement = [];
                fragement[++h] = "<div id=" + this._ops.dorpdownId + ' class="ui-combobox-dropdown-container">';
                fragement[++h] = '<div class="ui-dorpdown-icon"></div>';
                fragement[++h] = "</div>";
                this._element.append(fragement.join(""));
                return this;
            },

            _createPopup: function () {
                var h = -1,
                    fragement = [];
                fragement[++h] = '<div class="ui-combobox-popup" id=' + this._ops.popupId + ">";
                fragement[++h] = '<div class="ui-combobox-listbox">';
                fragement[++h] = '<div class="ui-combobox-listbox-container" id=' + this._ops.listboxId + ">";
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

        $.extend(true, prototype, {
            _setSelectionItems: function () {
                var tempItems = this._ops.items;
                var i = 0,
                    len = tempItems.length,
                    fragement = [];
                this.$listbox.empty();
                for (; i < len; i++) {
                    fragement.push('<div class="ui-combobox-selection-container">');
                    fragement.push("<div role='option' class=\"ui-combobox-selection\" id=ui-combobox-selection-select-option-" + i + ">");
                    fragement.push(tempItems[i].name);
                    fragement.push("</div>");
                    fragement.push("</div>");
                }
                this.$listbox.append(fragement.join(""));
                return this;
            },

            _setSelectionEvent: function () {
                this.$selections = $("#" + this._ops.listboxId + " .ui-combobox-selection");
                this.$selections.on("click" + this._eventNameSpave, this._onSelectionClick.bind(this));
                return this;
            },

            _setSelectedItem: function (selectedItem) {
                this.$selections.removeClass("ui-combobox-selection-selected");
                var selectedText = this._ops.items[0]
                if (typeof selectedItem === "string") selectedText = selectedItem;
                if (typeof selectedItem === "object" && selectedItem !== null && selectedItem.name) selectedText = selectedItem.name;
                for (var i = 0; i < this._ops.items.length; i++) {
                    if (this._ops.items[i].name == selectedText) {
                        this._ops.selectedIndex = i;
                    }
                }
                if (this._ops.selectedIndex != -1) {
                    var inputValue = this._ops.items[this._ops.selectedIndex].name;
                    this.$input.val(inputValue);
                    this.$selections[this._ops.selectedIndex].classList.add("ui-combobox-selection-selected");
                    this._ops.newValue = this._ops.items[this._ops.selectedIndex];
                } else {
                    this.$input.val(inputValue);
                    this.$selections[0].classList.add("ui-combobox-selection-selected");
                    this._ops.newValue = null;
                }
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

        $.extend(true, prototype, {
            _initMember: function () {
                this.$listbox = $("#" + this._ops.listboxId);
                this.$input = $("#" + this._ops.inputId);
                this.$popup = $("#" + this._ops.popupId);
                this.$dropdown = $("#" + this._ops.dorpdownId);
                return this;
            }
        });

        /**
         * bind events
         */

        $.extend(true, prototype, {
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

        _Combobox.fn._onInputkeyDown = function (e) {
            var self = e.data,
                keyCode = e.which;
            this._debounceHandler(e.target.value);
        };

        _Combobox.fn._onListboxMousedown = function (e) {
            e.stopPropagation();
            e.preventDefault();
        };

        _Combobox.fn._onDropdownClick = function (e) {
            this._hideShow();
        };

        _Combobox.fn._onComboboxMousedown = function (e) {
            this._hideShow();
        };

        _Combobox.fn._onComboboxFocus = function (e) {
            this._element.addClass("ui-combobox-focused");
        };

        _Combobox.fn._onComboboxBlur = function (e) {
            this._element.removeClass("ui-combobox-focused");
            this._hide();
        };

        _Combobox.fn._onComboboxMouseover = function (e) {
            this._element.addClass("ui-combobox-mouseover");
        };

        _Combobox.fn._onComboboxMouseleave = function (e) {
            this._element.removeClass("ui-combobox-mouseover");
        };

        _Combobox.fn._onSelectionClick = function (e) {
            var text = e.currentTarget.textContent;
            this._setSelectedItem(text);
            $$.trigger("selectionChanged",
                this._element,
                $$.Event({
                    element: this._element,
                    oldValue: this._ops.oldValue,
                    newValue: this._ops.newValue
                })
            );
            this._ops.oldValue = this._ops.newValue;
            this._hide();
        }

        /**
         * 非 Combobox 内部 function
         */

        _Combobox.fn.init = function (ops) {
            this._eventNameSpave = ".combobox-event";

            this._ops = {
                element: null,
                items: [],
                popupOpend: false,
                oldValue: {},
                newValue: {},
                selectedIndex: -1,
                selectedItem: {}
            };
            $.extend(true, this._ops, ops);

            this._constructor();
            this._initId()
                ._render()
                ._setComboboxItems();
            this._hide();

            this._delay = 200;
            this._filterSelectionResultIndex = [];
            return this;
        };

        _Combobox.fn.setOptions = function (ops) {
            $.extend(true, this._ops, ops);
            this._setPopupSytle();
            this._setComboboxItems();
            this._setSelectedItem(this._ops.selectedItem);
        };

        _Combobox.fn.init.prototype = _Combobox.prototype;

        return {
            Combobox: _Combobox
        };
    },
    "ui"
);
