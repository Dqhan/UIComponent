(function (global,
    $,
    $$,
    factory,
    plugin) {
    if (typeof global[plugin] !== "object") global[plugin] = {};
    $.extend(true, global[plugin], factory.call(global, $, $$));
})(window, $, $$, function (
    $,
    $$
) {
    var uuid = -1;
    var _PeoplePicker = function (ops) {
        this._ops = {
            items: ops.items,
            selectedItem: ops.selectedItem,
            hashItems: {},
            filterSelectionResultIndex: [],
            resultValue: []
        };
        this._ops.hashItems = this._convetToHash();
        this._element = ops.element;
        this._initId()
            ._init()
            ._create()
            ._initMember()
            ._bindEvent();
    };
    _PeoplePicker.prototype = {
        _convetToHash: function () {
            var hash = {},
                items = this._ops.items,
                len = this._ops.items.length;
            for (var i = 0; i < items.length; i++) {
                if (!hash[items[i].id]) {
                    hash[items[i].id] = items[i].name;
                }
            }
            return hash;
        },
        _initId: function () {
            uuid++;
            this._peoplePickerId = "ui-people-picker-" + uuid;
            this._peoplePickerPopupId = "ui-people-picker-popup-" + uuid;
            return this;
        },
        _init: function () {
            $(this._element).addClass("ui-people-picker");
            this._element.id = this._peoplePickerId;
            return this;
        },
        _create: function () {
            var _input = this._createInput();
            $(this._element).append(_input);
            this._createPopup();
            return this;
        },
        _createInput: function () {
            var fragement = [],
                h = -1;
            fragement[++h] = '<div class="ui-people-picker-container">';
            fragement[++h] =
                '<input type="text" class="ui-people-picker-container-input" />';
            fragement[++h] =
                '<div class="ui-people-picker-container-icon fi-page-user-a">';
            fragement[++h] = "</div>";
            return fragement.join("");
        },
        _createPopup: function () {
            var fragement = [],
                h = -1;
            fragement[++h] =
                "<div id=" +
                this._peoplePickerPopupId +
                ' class="ui-people-picker-dropdown" style="display:none">';
            for (var i = 0; i < this._ops.items.length; i++) {
                fragement[++h] =
                    '<div class="ui-people-picker-dropdown-selection-container">';
                fragement[++h] =
                    '<div class="ui-people-picker-dropdown-selection-item">' +
                    this._ops.items[i].name +
                    "</div>";
                fragement[++h] = "</div>";
            }
            fragement[++h] = "</div>";
            $("body").append(fragement.join(""));
            return this;
        },

        _initMember: function () {
            this.$container = $(
                "#" + this._peoplePickerId + " .ui-people-picker-container"
            );
            this.$input = $(
                "#" + this._peoplePickerId + " .ui-people-picker-container-input"
            );
            this.$popup = $("#" + this._peoplePickerPopupId);
            this.$dropdown_items = $(
                "#" +
                this._peoplePickerPopupId +
                " .ui-people-picker-dropdown-selection-item"
            );
            this.$icon = $(
                "#" + this._peoplePickerId + " .ui-people-picker-container-icon"
            );
            return this;
        },

        _bindEvent: function () {
            this.$input
                //.on('focus', this._inputFocusHandler.bind(this))
                .on("blur", this._inputBlurHandler.bind(this))
                .on("keyup", this._inputKeyupHandler.bind(this));
            this.$dropdown_items.on(
                "click",
                this._downdropitemsClickHandler.bind(this)
            );
            this.$icon.on("click", this._iconClickHandler.bind(this));
        },

        _iconClickHandler: function () {
            var $element = $(this._element);
            $$.trigger(
                "openPopup",
                $element,
                $$.Event({
                    element: $element,
                    oldValue: null,
                    newValue: null
                })
            );
        },

        _inputFocusHandler: function () {
            this._show();
        },

        _show: function () {
            this.$popup.show();
            this._setPopupPosition();
        },

        _hide: function () {
            this.$popup.hide();
        },
        _inputBlurHandler: function () {
            // this._hide();
        },

        _inputKeyupHandler: function (e) {
            var condition = this._getCondition();
            var i = 0,
                items = this._ops.items,
                len = items.length;
            for (; i < len; i++) {
                var text = items[i].name;
                if (text.indexOf(condition) > -1) {
                    this._ops.filterSelectionResultIndex.push(i);
                }
            }
            this._filterSelection();
            switch (e.which) {
                case 8:
                    this._deleteResult();
                    break;
            }
        },
        _filterSelection: function () {
            var items = this._ops.items,
                len = items.length,
                i = 0;
            for (; i < len; i++) {
                if (this._ops.filterSelectionResultIndex.includes(i)) {
                    $(this.$dropdown_items[i]).show();
                } else {
                    $(this.$dropdown_items[i]).hide();
                }
            }
            this._ops.filterSelectionResultIndex.length = 0;
            this._show();
        },
        _getCondition: function () {
            return this.$input.val().toLowerCase();
        },
        _setPopupPosition: function () {
            var self = this;
            this.$popup.css({ top: 0 }).position({
                my: "left top",
                at: "left bottom",
                of: self._element,
                collision: "flip"
            });
        },

        _downdropitemsClickHandler: function (e) {
            var target = this._ops.items.filter(
                i => i.name == e.target.innerText
            )[0];
            this._addResult(target);
            this._hide();
        },
        _addResult: function (target) {
            this._ops.resultValue.unshift(target);
            this._setSelectedItemsToInput();
            var self = this;
            $$.Event({
                element: self._element,
                oldValue: null,
                newValue: self._ops.resultValue
            });
            //this._filterSelection();
            this.$input.val("");
        },
        _deleteResult: function () {
            this._ops.resultValue.splice(this._ops.resultValue.length - 1, 1);
            this._setSelectedItemsToInput();
            var self = this;
            $$.Event({
                element: self._element,
                oldValue: null,
                newValue: self._ops.resultValue
            });
        },
        _setSelectedItemsToInput: function () {
            $("#" + this._peoplePickerId + " .selectedItem").remove();
            var fragement = [],
                h = -1,
                items = this._ops.resultValue,
                len = items.length;
            for (var i = 0; i < len; i++) {
                fragement[++h] = '<div class="selectedItem">';
                fragement[++h] = items[i].name;
                fragement[++h] = '<div class="selectedItem-icon"></div>';
                fragement[++h] = "</div>";
            }
            this.$container.prepend(fragement.join(""));
            this._bindEventForSelectedItem();
        },

        _bindEventForSelectedItem: function () { },

        setOptions: function () { }
    };
    return {
        PeoplePicker: _PeoplePicker
    }
}, "ui")