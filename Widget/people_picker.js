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
            this._peoplePickerPopupId = "ui-people-picker-popup-" + uuid;
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
            if (this._ops.type === 'single') this._createPopup();
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
            fragement[++h] = "<div id=" + this._peoplePickerPopupId + ' class="ui-people-picker-dropdown" style="display:none">';
            for (var i = 0; i < this._ops.items.length; i++) {
                fragement[++h] = '<div class="ui-people-picker-dropdown-selection-container">';
                fragement[++h] = '<div class="ui-people-picker-dropdown-selection-item" data-people-picker-selection-value="' + this._ops.items[i].id + '">' + this._ops.items[i].name + "</div>";
                fragement[++h] = "</div>";
            }
            fragement[++h] = "</div>";
            $("body").append(fragement.join(""));
            return this;
        },

        _initMember: function () {
            this.$container = $("#" + this._peoplePickerId + " .ui-people-picker-container");
            this.$input = $("#" + this._peoplePickerId + " .ui-people-picker-container-input");
            this.$popup = $("#" + this._peoplePickerPopupId);
            this.$dropdown_items = $("#" + this._peoplePickerPopupId + " .ui-people-picker-dropdown-selection-item");
            this.$icon = $("#" + this._peoplePickerId + " .ui-people-picker-container-icon");
            return this;
        },

        _bindEvent: function () {
            this.$input
                .on('focus' + this._eventNameSpave, this._onPeoplePickeFocus.bind(this))
                .on("blur" + this._eventNameSpave, this._onPeoplePickeBlur.bind(this))
                .on("mousedown" + this._eventNameSpave, this._onPeoplePickerMousedown.bind(this))
                .on("mouseover" + this._eventNameSpave, this._onPeoplePickeMouseover.bind(this))
                .on("mouseleave" + this._eventNameSpave, this._onPeoplePickeMouseleave.bind(this))
                .on('keyup' + this._eventNameSpave, this._onPeoplePickekeyDown.bind(this));
            if (this._ops.type === 'single') {
                this.$popup.on('mousedown' + this._eventNameSpave, this._onListBoxMousedown.bind(this));
                this.$dropdown_items.on("click" + this._eventNameSpave, this._downdropitemsClickHandler.bind(this));
            }
            this.$icon.on("click" + this._eventNameSpave, this._iconClickHandler.bind(this));
        },

        _onPeoplePickeFocus: function () {
            this.$element.addClass("ui-combobox-focused");
        },

        _onPeoplePickeBlur: function () {
            this._hide();
        },

        _onPeoplePickerMousedown: function () {
            var result = this._filterSelectionForContainer();
            this.filterSelection(result);
            this._show();
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
            this.$popup.show();
            this._setPopupPosition();
        },


        _hide: function () {
            this.$popup.hide();
        },

        _onPeoplePickekeyDown: function (e) {
            var condition = this._getCondition(),
                filterIndexResult = [];
            for (var i = 0; i < this._ops.items.length; i++) {
                var text = this._ops.items[i].name;
                if (text.indexOf(condition) > -1) {
                    if (!filterIndexResult.includes(i))
                        filterIndexResult.push(i);
                    else
                        continue;
                }
            };
            //数组为空时默认全部展示
            if (filterIndexResult.length === 0) return;
            //keydown 与 mouse down 取交集
            var containerResult = this._filterSelectionForContainer();
            var result = filterIndexResult.filter(c => containerResult.includes(c));
            this.filterSelection(result);
            this._show();
            switch (e.which) {
                case 8:
                    this._deleteResult();
                    break;
            }
        },

        _filterSelectionForContainer: function () {
            var $selectedItems = this.get$SelectedItems(),
                len = $selectedItems.length,
                hash = {},
                index = [];
            for (var i = 0; i < len; i++) {
                var id = $selectedItems[i].dataset.peoplePickerSelecteditemValue;
                hash[id] = true;
            }
            for (var i = 0; i < this._ops.items.length; i++) {
                var item = this._ops.items[i];
                if (hash[item.id]) continue;
                else index.push(i);
            };
            return index;
        },

        filterSelection: function (array) {
            if (array.length == 0) return;
            for (var i = 0; i < this._ops.items.length; i++) {
                if (array.includes(i)) {
                    $(this.$dropdown_items[i]).show();
                } else {
                    $(this.$dropdown_items[i]).hide();
                }
            }
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
            var targets = this._ops.items.filter(
                i => i.id == e.target.dataset.peoplePickerSelectionValue
            );
            this._addResult(targets[0]);
            this._hide();
        },

        _addResult: function (target) {
            this.traction_actionResult('add').preform(target);
            this._setSelectedItemsToInput();
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
            this._setSelectedItemsToInput();
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
                    traction.init();
                    traction.close(target);
                }
            }
        },

        addResultTraction: function () {
            var self = this;
            return {
                init: function () {

                },
                close: function (target) {
                    self._ops.selectedItems.unshift(target);
                }
            }
        },

        deleteResultTraction: function () {
            var self = this;
            return {
                init: function () {

                },
                close: function () {
                    self._ops.selectedItems.splice(self._ops.selectedItems.length - 1, 1);
                }
            }
        },

        _setSelectedItemsToInput: function () {
            var fragement = [],
                h = -1;
            // items = this._ops.selectedItems,
            // len = items.length;
            // for (var i = 0; i < len; i++) {
            //     if (this.isContainerMore()) {

            //         break;
            //     } else {
            //         fragement[++h] = '<div class="selectedItem" data-people-picker-selectedItem-value="' + items[i].id + '">';
            //         fragement[++h] = items[i].name;
            //         fragement[++h] = '<div class="selectedItem-icon"></div>';
            //         fragement[++h] = "</div>";
            //     }
            // }
            // this.get$SelectedItems().remove();
            if (this._ops.selectedItems.length === 0) return;

            if (this.isContainerMore()) {
                fragement[++h] = "<div>";
                fragement[++h] = "...";
                fragement[++h] = "</div>"
                this.$container.append(fragement.join(""));
            } else {
                fragement[++h] = '<div class="selectedItem" data-people-picker-selectedItem-value="' + this._ops.selectedItems[0].id + '">';
                fragement[++h] = this._ops.selectedItems[0].name;
                fragement[++h] = '<div class="selectedItem-icon"></div>';
                fragement[++h] = "</div>";
                this.$container.prepend(fragement.join(""));
            }
            this._bindEventForSelectedItem();
        },

        isContainerMore: function () {
            var $selectedItems = this.get$SelectedItems(),
                selectedItemsWidth = 0;
            for (var i = 0; i < $selectedItems.length; i++) {
                selectedItemsWidth += $($selectedItems[i]).width();
            };
            if ($selectedItems.length == 0) return false;
            else return selectedItemsWidth > this.$container.width() - 150;
        },

        get$SelectedItems: function () {
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