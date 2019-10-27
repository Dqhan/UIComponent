"use strict";

import { runInThisContext } from "vm";

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
                if (toString.call(props.type) !== '[object Undefined]' && (props.type === "single" || props.type === "multiple"))
                    Object.assign(this._ops, {
                        type: props.type
                    });
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
                if (toString.call(props.items) !== '[object Undefined]' && toString.call(props.items) === "[object Array]") {
                    Object.assign(this._ops, {
                        items: props.items
                    })
                    this._assembleItems();
                }
                if (toString.call(props.selectedItems) !== '[object Undefined]' && toString.call(props.selectedItems) === "[object Array]")
                    Object.assign(this._ops, {
                        newValue: props.selectedItems
                    })
            },

            _assembleItems: function () {
                this._ops.items.forEach((item, index) => {
                    item.index = index;
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
                return this.$input.val().toLowerCase();;
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
                        var selection = items[i];
                        if (this._filterSelectionResultIndex.includes(i) && !this._selectedResultIndex.includes(selection.index)) {
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
                this.$popup
                    .css("width", this._ops.width);
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
                fragement[++h] = '<div style="display:none;" class="ui-rich-combobox-popup" id=' + this._popupId + ">";
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
                this.$listbox.children('.ui-rich-combobox-selection-container').on("click" + this._eventNameSpave, this._onSelectionClick.bind(this));
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
            if (this._cacheInput === "" && keyCode === 8) this._deleteSelectedSelection();
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
            index = parseInt(index);
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
        };

        _RichCombobx.fn._bindSelectedItemsCloseIcon = function (index) {
            this.$container.find("[data-index=" + index + "]").find(".ui-rich-combobox-selected-item-close").on("click", this._closeSelectedItemsHandler.bind(this));
            return this;
        };

        _RichCombobx.fn._closeSelectedItemsHandler = function (e) {
            e.stopPropagation();
            var index = $(e.currentTarget.parentNode).attr('data-index');
            index = parseInt(index);
            this._deleteSelectedSelection(index);
            $$.trigger(
                "selectionChanged",
                this.$element,
                $$.Event({
                    element: this.$element,
                    oldValue: $$.deepCopy(this._ops.oldValue),
                    newValue: $$.deepCopy(this._ops.newValue)
                })
            );
        };

        _RichCombobx.fn._addSelectedSelection = function (index) {
            this.$input.val('');
            var fragement = [],
                h = -1,
                target = this._findTargetSelectionByIndex(index, this._ops.items);
            if (this._findSameItemsViaSelection(target).length === 1)
                return;
            fragement[++h] = this._createSelection(target);
            if (this._ops.type === "single") {
                this.$container.find('.ui-rich-combobox-selected-item').remove();
                this.$input.before(fragement.join(""));
                this._bindSelectedItemsCloseIcon(index);
                this._ops.newValue = [].concat(target);
                this._selectedResultIndex = [].concat(index);
            } else {
                this.$input.before(fragement.join(""));
                this._bindSelectedItemsCloseIcon(index);
                this._ops.newValue.push(target);
                this._selectedResultIndex.push(index);
            }
        };

        _RichCombobx.fn._findTargetSelectionByIndex = function (index, items) {
            if (index < 0 || toString.call(items) !== "[object Array]")
                throw new Error('_findTargetSelectionByIndex params is error.');
            var i = 0,
                len = items.length,
                result = null;
            for (; i < len; i++) {
                var item = items[i];
                if (index === item.index) {
                    result = item;
                    break;
                }
                else
                    continue;
            }
            return result;
        };

        _RichCombobx.fn._findSameItemsViaSelection = function (target) {
            var name = target['name'],
                result = null,
                items = this._getSelectedItems(),
                i = 0,
                len = items.length;
            for (; i < len; i++) {
                var selection = items[i];
                if (selection['name'] === name) {
                    result = selection;
                    break;
                } else continue;
            }
            if (result === null) return [];
            else return this.$container.find("[data-index=" + result.index + "]");
        };

        _RichCombobx.fn._getSelectedItems = function () {
            return this._ops.newValue;
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

        _RichCombobx.fn._deleteSelectedSelection = function (index) {
            if (toString.call(index) === "[object Undefined]") {
                var len = this.$container.find('.ui-rich-combobox-selected-item').length,
                    targetElement = this.$container.find('.ui-rich-combobox-selected-item')[len - 1],
                    targetIndex = $(targetElement).attr("data-index");
                targetIndex = parseInt(targetIndex);
                $(targetElement).remove();
                for (var i = 0; i < this._ops.newValue.length; i++) {
                    if (this._ops.newValue[i].index === targetIndex) {
                        this._ops.newValue.splice(i, 1);
                        this._selectedResultIndex.splice(this._selectedResultIndex.indexOf(targetIndex), 1);
                        break;
                    } else continue;
                }
            }
            else {
                this.$container.find("[data-index=" + index + "]").remove();
                for (var i = 0; i < this._ops.newValue.length; i++) {
                    if (this._ops.newValue[i].index === index) {
                        this._ops.newValue.splice(i, 1);
                        this._selectedResultIndex.splice(this._selectedResultIndex.indexOf(index), 1);
                        break;
                    } else continue;
                }
            }
        };

        _RichCombobx.fn._initSelectedSelection = function (selectedItems) {
            var hash = {},
                unique = [];
            selectedItems.forEach((item, index) => {
                var text = item['name'];
                var target = this._findTargetSelectionByText(text, this._ops.items);
                if (!hash[text] && target !== null) {
                    unique.push(target);
                    hash[text] = true;
                };
            })
            selectedItems = unique;

            this.$container.find('.ui-rich-combobox-selected-item').remove();
            this._ops.newValue = selectedItems;
            this._selectedResultIndex = selectedItems.map(item => item.index);
            var fragement = [],
                h = -1,
                i = 0,
                len = selectedItems.length;
            for (; i < len; i++) {
                var selection = selectedItems[i];
                fragement[++h] = this._createSelection(selection);
            }
            this.$input.before(fragement.join(''));
            this.$container.find('.ui-rich-combobox-selected-item .ui-rich-combobox-selected-item-close')
                .on("click", this._closeSelectedItemsHandler.bind(this))
        }

        _RichCombobx.fn._findTargetSelectionByText = function (text, items) {
            if (toString.call(text) !== "[object String]") throw new Error('_findTargetSelectionByText params for text is error.');
            // if (items.length === 0) throw new Error('this._ops.items 沒被初始化')
            var i = 0,
                len = items.length,
                result = null;
            for (; i < len; i++) {
                var item = items[i];
                if (text === item['name']) {
                    result = item;
                    break;
                }
                else continue;
            }
            return result;
        }

        /**
         * 非 Combobox 内部 function
         */

        _RichCombobx.fn.init = function (props) {
            this._eventNameSpave = ".rich-combobox-event";
            this._ops = {
                type: "multiple",
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
            if (toString.call(props.selectedItems) === "[object Array]")
                this._initSelectedSelection(props.selectedItems);
            this._delay = 200;
            this._filterSelectionResultIndex = [];
            this._selectedResultIndex = [];
            return this;
        };

        _RichCombobx.fn.setOptions = function (props) {
            this._extend(props);
            this._setRichCombobxSytle();
            if (toString.call(props.selectedItems) === "[object Array]")
                this._initSelectedSelection(props.selectedItems);
            this._setComboboxItems();
        };

        _RichCombobx.fn.init.prototype = _RichCombobx.prototype;

        return {
            RichCombobox: _RichCombobx
        };
    },
    "ui"
);
