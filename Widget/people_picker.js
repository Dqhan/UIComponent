import { RSA_NO_PADDING } from "constants";

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
            type: ops.type,
            items: ops.items,
            hashItems: {},
            selectedItems: ops.selectedItems
        };
        this._ops.hashItems = this._convetToHash();
        this._element = ops.element;
        this.$element = $(this._element);
        this._initId()
            ._init()
            ._create()
            ._initMember()
            ._bindEvent();
    };
    var prototype = _PeoplePicker.fn = _PeoplePicker.prototype = {
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
            this._peoplePickerDropdownId = "ui-people-picker-popup-" + uuid;
            return this;
        },
        _init: function () {
            this.$element.addClass("ui-people-picker");
            this._element.id = this._peoplePickerId;
            this._eventNameSpave = ".peoplepicker-event";
            return this;
        },
        _create: function () {
            var _input = this._createInput();
            this.$element.append(_input);
            this._createPopup();
            return this;
        },
        _createInput: function () {
            var fragement = [],
                h = -1;
            fragement[++h] = '<div class="ui-people-picker-container">';
            fragement[++h] = '<input type="text" class="ui-people-picker-container-input" />';
            fragement[++h] = '<div class="ui-people-picker-container-icon fi-page-user-a">';
            fragement[++h] = "</div>";
            return fragement.join("");
        },
        _createPopup: function () {
            var fragement = [],
                h = -1;
            fragement[++h] = "<div id=" + this._peoplePickerDropdownId + ' class="ui-people-picker-dropdown" style="display:none">';
            fragement[++h] = "</div>";
            $("body").append(fragement.join(""));
            return this;
        },

        _initMember: function () {
            this.$container = $("#" + this._peoplePickerId + " .ui-people-picker-container");
            this.$input = $("#" + this._peoplePickerId + " .ui-people-picker-container-input");
            this.$dropdown = $("#" + this._peoplePickerDropdownId);
            this.$icon = $("#" + this._peoplePickerId + " .ui-people-picker-container-icon");
            return this;
        },

        _bindEvent: function () {
            this.$input
                .on('focus' + this._eventNameSpave, this._onPeoplePickeFocus.bind(this))
                .on("blur" + this._eventNameSpave, this._onPeoplePickeBlur.bind(this))
                .on("mouseover" + this._eventNameSpave, this._onPeoplePickeMouseover.bind(this))
                .on("mouseleave" + this._eventNameSpave, this._onPeoplePickeMouseleave.bind(this))
                .on('keyup' + this._eventNameSpave, $$.debounce(this._onPeoplePickekeyDown.bind(this), 300));
            this.$dropdown.on('mousedown' + this._eventNameSpave, this._onListBoxMousedown.bind(this));
            this.$icon.on("click" + this._eventNameSpave, this._iconClickHandler.bind(this));
        },

        _onPeoplePickeFocus: function () {
            this.$element.addClass("ui-combobox-focused");
        },

        _onPeoplePickeBlur: function () {
            this._hide();
        },

        _onPeoplePickeMouseover: function () {
            this.$element.addClass("ui-combobox-focused");
        },

        _onPeoplePickeMouseleave: function () {
            this.$element.removeClass("ui-combobox-focused");
        },

        _onListBoxMousedown: function (e) {
            e.stopPropagation();
            e.preventDefault();
        },

        _iconClickHandler: function () {
            var $element = this.$element;
            $$.trigger("openPopup",
                $element,
                $$.Event({
                    element: $element,
                    oldValue: null,
                    newValue: null
                })
            );
        },

        _show: function () {
            this.$dropdown.show();
            this._setPopupPosition();
        },


        _hide: function () {
            this._ops.items.length = 0;
            this.$dropdown.hide();
        },

        _onPeoplePickekeyDown: function (e) {
            // var url = `http://localhost:2323/getJSON`;
            var condition = this._getCondition();
            this._filterSelection(condition);
            this._show();
            switch (e.which) {
                case 8:
                    this._deleteResult();
                    break;
            }
        },

        _filterSelection: function (condition) {
            this._setSetDropdownItemsLoading();
            var url = "./peoplepickerdata.json";
            fetch(url, {
                method: 'GET',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store',
                credentials: 'include'
            })
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    if (condition === "")
                        this._setSetDropdownItemsLoading();
                    else {
                        this._ops.items = res.userInfo.filter(u => u.name.indexOf(condition) > -1);
                        this._setDropdownItems();
                    }
                })
                .catch(e => {
                    console.log(e);
                })
        },

        _setSetDropdownItemsLoading: function () {
            this.$dropdown.empty();
            var fragement = [],
                h = -1;
            fragement[++h] = "<div>";
            fragement[++h] = "<span class=\"ui-loading\"></span>"
            fragement[++h] = "Loading...";
            fragement[++h] = "</div>";
            this.$dropdown.append(fragement.join(''));
        },

        _setDropdownItems: function () {
            this.$dropdown.empty();
            var fragement = [],
                h = -1,
                i = 0,
                items = this._ops.items,
                len = items.length;
            if (len === 0) {
                fragement[++h] = "<div>";
                fragement[++h] = "No selected Items.";
                fragement[++h] = "</div>";
            } else {
                for (; i < len; i++) {
                    fragement[++h] = '<div class="ui-people-picker-dropdown-selection-container">';
                    fragement[++h] = '<div class="ui-people-picker-dropdown-selection-item" data-people-picker-selection-value="' + items[i].id + '">' + items[i].name + "</div>";
                    fragement[++h] = "</div>";
                }
            }
            this.$dropdown.append(fragement.join(''));
            this._bindDropdownItemsEvent();
        },

        _bindDropdownItemsEvent: function () {
            var $selectionItems = this._get$dropdownselectionitems();
            $selectionItems.on("click" + this._eventNameSpave, this._downdropitemsClickHandler.bind(this));
        },

        _get$dropdownselectionitems: function () {
            return $("#" + this._peoplePickerDropdownId + " .ui-people-picker-dropdown-selection-item");
        },

        _getCondition: function () {
            return this.$input.val().toLowerCase();
        },

        _setPopupPosition: function () {
            var self = this;
            this.$dropdown.css({ top: 0 }).position({
                my: "left top",
                at: "left bottom",
                of: self._element,
                collision: "flip"
            });
        },

        _downdropitemsClickHandler: function (e) {
            var targets = this._ops.items.filter(
                i => i.id == e.target.dataset.peoplePickerSelectionValue
            );
            this._addResult(targets[0]);
            this._hide();
        },

        _addResult: function (target) {
            this.traction_actionResult('add').preform(target);
            var self = this;
            $$.Event({
                element: self._element,
                oldValue: null,
                newValue: self._ops.selectedItems
            });
            this.$input.val("");
        },

        _deleteResult: function () {
            this.traction_actionResult('delete').preform();
            var self = this;
            $$.Event({
                element: self._element,
                oldValue: null,
                newValue: self._ops.selectedItems
            });
        },

        traction_actionResult: function (action) {
            var clr = {
                add: this.addResultTraction.bind(this),
                delete: this.deleteResultTraction.bind(this)
            },
                traction = clr[action]();
            return {
                preform: function (target) {
                    traction.init(target);
                    traction.close();
                }
            }
        },

        addResultTraction: function () {
            var self = this;
            return {
                init: function (target) {
                    if (self._ops.type === "single") {
                        self._ops.selectedItems.length = 0;
                        self._ops.selectedItems.push(target);
                    }
                    else {
                        if (self._ops.selectedItems.filter(i => i.id == target.id).length === 0)
                            self._ops.selectedItems.push(target);
                    }
                },
                close: function () {
                    self._setSelectedItemsToInput();
                }
            }
        },

        deleteResultTraction: function () {
            var self = this;
            return {
                init: function () {
                    self._ops.selectedItems.splice(self._ops.selectedItems.length - 1, 1);
                },
                close: function () {
                    self._setSelectedItemsToInput();
                }
            }
        },

        _setSelectedItemsToInput: function () {
            this._get$SelectedItems().remove();
            var fragement = [],
                h = -1;
            if (this._ops.selectedItems.length === 0) return;
            fragement[++h] = '<div class="selectedItem" data-people-picker-selectedItem-value="' + this._ops.selectedItems[0].id + '">';
            fragement[++h] = this._ops.selectedItems[0].name;
            fragement[++h] = '<div class="selectedItem-icon"></div>';
            fragement[++h] = "</div>";
            this.$container.prepend(fragement.join(""));
            this._bindEventForSelectedItem();
        },

        _get$SelectedItems: function () {
            return $("#" + this._peoplePickerId + " .ui-people-picker-container" + " .selectedItem");
        },

        _bindEventForSelectedItem: function () {

        },

    };


    // window.onsize = $$.debounce(function () {
    //     var $container = $("#" + "ui-people-picker-" + uuid + " .ui-people-picker-container"),
    //         $selectedItems = $("#" + "ui-people-picker-" + uuid + " .ui-people-picker-container" + " .selectedItem"),
    //         selectedItemsWidth;
    //     for (var i = 0; i < $selectedItems.length; i++) {
    //         var width = $selectedItems[i].width;
    //         selectedItemsWidth += width;
    //     }
    //     if (selectedItemsWidth > ($container.width - 45)) {

    //     }
    // });

    _PeoplePicker.fn.setOptions = function (ops) {
        $.extend(true, this._ops, ops);
        this._setSelectedItemsToInput();
    };

    return {
        PeoplePicker: _PeoplePicker
    }
}, "ui")