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
                this._extend(props);
                this._initId();
                this._ops.element.id = this._richcomboboxId;
                this.$element = $(this._ops.element);
                this.$element.addClass("ui-rich-combobox");
            },

            _extend: function (props) {
                if (toString.call(props.isDropdown) !== '[object Undefined]' && (props.isDropdown === "false" || props.isDropdown === "true"))
                    Object.assign(this._ops, {
                        isDropdown: JSON.parse(props.isDropdown)
                    });
                if (toString.call(props.isInput) !== '[object Undefined]' && (props.isInput === "false" || props.isInput === "true"))
                    Object.assign(this._ops, {
                        isInput: JSON.parse(props.isInput)
                    });
                if (toString.call(props.width) !== "[object Undefined]")
                    Object.assign(this._ops, {
                        width: props.width
                    })
                if (toString.call(props.height) !== "[object Undefined]")
                    Object.assign(this._ops, {
                        height: props.height
                    })
                if (toString.call(props.element) !== '[object Undefined]' && toString.call(props.element) === "[object HTMLDivElement]")
                    Object.assign(this._ops, {
                        element: props.element
                    })
                if (toString.call(props.items) !== '[object Undefined]' && toString.call(props.items) === "[object Array]")
                    Object.assign(this._ops, {
                        items: props.items
                    })
                if (toString.call(props.selectedItems) !== '[object Undefined]' && toString.call(props.selectedItems) === "[object Array]")
                    Object.assign(this._ops, {
                        newValue: props.selectedItems
                    })
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
                this._getSelectionLoading().hide();
                var items = this._ops.items,
                    i = 0,
                    len = items.length;
                if (this._filterSelectionResultIndex.length !== 0) {
                    for (; i < len; i++) {
                        if (this._filterSelectionResultIndex.includes(i) && !this._selectedResultIndex.includes(i)) {
                            $(this.$listbox.children()[i]).show();
                        } else {
                            $(this.$listbox.children()[i]).hide();
                        }
                    }
                }
                if (this.$listbox.children(':visible').length === 0)
                    this._getSelectionNoMatch().show();
                else
                    this._getSelectionNoMatch().hide();
                return this;
            },

            _resetFilterSelectionResultIndex: function () {
                this._filterSelectionResultIndex.length = 0;
            },

            _getSelectionNoMatch: function () {
                return $("#" + this._popupId + " .aui-richcombobox-popup-empty");
            },

            _getSelectionLoading: function () {
                return $("#" + this._popupId + " .aui-richcombobox-popup-loading");
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
                setTimeout(this._filterSelection.bind(this), 200);
                // this._filterSelection();
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
                fragement[++h] = '<div class="ui-rich-combobox-container">';
                if (this._ops.isInput)
                    fragement[++h] = '<input type="text" class="ui-rich-combobox-input"/>';
                else
                    fragement[++h] = '<input style="display:none;" type="text" class="ui-rich-combobox-input"/>';
                fragement[++h] = "</div>";
                if (this._ops.isDropdown) {
                    fragement[++h] = '<div class="ui-rich-combobx-icon">';
                    fragement[++h] = '<span class="fi-page-triangle-down-bs"></span>';
                    fragement[++h] = "</div>";
                } else {
                    fragement[++h] = '<div style="display:none;" class="ui-rich-combobx-icon">';
                    fragement[++h] = '<span class="fi-page-triangle-down-bs"></span>';
                    fragement[++h] = "</div>";
                }
                this.$element.append(fragement.join(""));
                return this;
            },

            _createPopup: function () {
                var h = -1,
                    fragement = [];
                fragement[++h] = '<div style="width:' + this.$element.width() + 'px;display:none;" class="ui-rich-combobox-popup" id=' + this._popupId + ">";
                fragement[++h] = '<div class="ui-rich-combobox-listbox">';
                fragement[++h] = '<div class="ui-rich-combobox-listbox-container">';
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
                this.$listbox.empty();
                var i = 0,
                    len = this._ops.items.length,
                    fragement = [],
                    h = -1;
                for (; i < len; i++) {
                    fragement[++h] = "<div class=\"ui-rich-combobox-selection-container\" data-index=" + i + ">";
                    fragement[++h] = "<div role='option' class=\"ui-rich-combobox-selection\">";
                    fragement[++h] = this._ops.items[i].name;
                    fragement[++h] = "</div>";
                    fragement[++h] = "</div>";
                }
                fragement[++h] = "<div class=\"aui-richcombobox-popup-loading\">";
                fragement[++h] = "Please wait a moment."
                fragement[++h] = "</div>";
                fragement[++h] = "<div class=\"aui-richcombobox-popup-empty\">";
                fragement[++h] = "No matches found.";
                fragement[++h] = "</div>";
                this.$listbox.append(fragement.join(""));
                return this;
            },

            _setSelectionEvent: function () {
                this.$listbox.children().on("click" + this._eventNameSpave, this._onSelectionClick.bind(this));
                return this;
            },

            _filterSelection: function () {
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
                this._updateFilteredSelections()
                    ._resetFilterSelectionResultIndex();
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
                    .on("focus" + this._eventNameSpave, this._onComboboxFocus.bind(this))
                    .on("blur" + this._eventNameSpave, this._onComboboxBlur.bind(this))
                    .on("mouseover" + this._eventNameSpave, this._onComboboxMouseover.bind(this))
                    .on("mouseleave" + this._eventNameSpave, this._onComboboxMouseleave.bind(this))
                    .on("keyup", +this._eventNameSpave, $$.debounce(this._onInputkeyDown.bind(this), 200));

                this.$listbox.on("mousedown" + this._eventNameSpave, this._onListboxMousedown.bind(this));
                this.$dropdown.on("click" + this._eventNameSpave, this._onDropdownClick.bind(this));
            }
        });

        /**
         * event handler
         */

        _RichCombobx.fn._onInputkeyDown = function (e) {
            var self = e.data,
                keyCode = e.which;
            if (this._cacheInput === "" && keyCode === 8) this._deleteResult();
            this._cacheInput = this.$input.val();
            this.$listbox.children().hide();
            this._getSelectionLoading().show();
            this._show();
        };

        _RichCombobx.fn._onListboxMousedown = function (e) {
            e.stopPropagation();
            e.preventDefault();
        };

        _RichCombobx.fn._onDropdownClick = function (e) {
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
            var index = $(e.currentTarget).attr('data-index');
            this._addSelectedSelection(index);
            $$.trigger(
                "selectionChanged",
                this.$element,
                $$.Event({
                    element: this.$element,
                    oldValue: $$.deepCopy(this._ops.oldValue),
                    newValue: $$.deepCopy(this._ops.newValue)
                })
            );
            this._ops.oldValue = this._ops.newValue;
            this._hide();
            this.$input.val('');
        };

        _RichCombobx.fn._bindSelectedItemsClose = function () {
            $("#" + this._richcomboboxId + " .ui-rich-combobox-selected-item-close").on("click", this._closeSelectedItemsHandler.bind(this));
            return this;
        };

        _RichCombobx.fn._closeSelectedItemsHandler = function (e) {
            this._deleteResult(e);
            $$.trigger(
                "handleDeleteeSelectionChanged",
                this.$element,
                $$.Event({
                    element: this.$element,
                    oldValue: $$.deepCopy(this._ops.oldValue),
                    newValue: $$.deepCopy(this._ops.newValue)
                })
            );
        };

        _RichCombobx.fn._addSelectedSelection = function (index) {
            var fragement = [],
                h = -1;
            var item = this._ops.items[index];
            this.$container.children("[data-index=" + index + "]").remove();
            fragement[++h] = this._createSelection(item);
            this.$input.before(fragement.join(""));
            this._bindSelectedItemsClose();

            this._ops.newValue.push(item);
            this._selectedResultIndex.push(index);
        };

        _RichCombobx.fn._createSelection = function (item) {
            var fragement = [],
                h = -1;
            fragement[++h] = '<div class="ui-rich-combobox-selected-item" role="grid-cell" data-index="' + item.index + '">';
            fragement[++h] = '<div class="ui-rich-combobox-selected-item-text">';
            fragement[++h] = item.name;
            fragement[++h] = "</div>";
            fragement[++h] = '<div class="ui-rich-combobox-selected-item-close fi-page-cancel-bs">';
            fragement[++h] = "</div>";
            fragement[++h] = "</div>";
            return fragement.join('');
        }

        _RichCombobx.fn._deleteResult = function (e) {
            if (toString.call(e) === "[object Undefined]") {
                var selectedItems = $("#" + this._richcomboboxId + " .ui-rich-combobox-selected-item"),
                    len = selectedItems.length;
                $(selectedItems[len - 1]).remove();
                this._ops.newValue.splice(this._ops.newValue.length - 1, 1);
                this._selectedResultIndex.splice(this._selectedResultIndex.length - 1, 1);
            }
            else {
                e.currentTarget.parentNode.remove();
                var targetText = e.currentTarget.parentNode.textContent;
                var targetIndex = parseInt(e.currentTarget.parentNode.dataset.index);
                for (var i = 0; i < this._ops.newValue.length; i++) {
                    if (this._ops.newValue[i].name === targetText) {
                        this._ops.newValue.splice(i, 1);
                        this._selectedResultIndex.splice(this._selectedResultIndex.indexOf(targetIndex), 1);
                        break;
                    } else continue;
                }
            }
        };

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
                width: "600px",
                height: "",
                isDropdown: true,
                isInput: true,
                disabled: false
            };
            this._constructor(props);
            this._render()
                ._setComboboxItems();
            this._delay = 200;
            this._filterSelectionResultIndex = [];
            this._selectedResultIndex = [];
            return this;
        };

        _RichCombobx.fn.setOptions = function (props) {
            this._extend(props);
            this._setRichCombobxSytle();
        };

        _RichCombobx.fn.updateSelectedItems = function (selectedItems) {
            if (toString.call(selectedItems) === "[object Undefined]") throw new Error('selectedItems 传错了！')
            var a = selectedItems;
            for (var i = 0; i < selectedItems.length; i++) {
                this._addSelectedSelection(selectedItems[i].name);
            };
        };

        _RichCombobx.fn.init.prototype = _RichCombobx.prototype;

        return {
            RichCombobox: _RichCombobx
        };
    },
    "ui"
);
