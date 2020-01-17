(function (global,
    $,
    $$,
    factory,
    plugin) {
    if (typeof global[plugin] !== "object") global[plugin] = {};
    $.extend(true, global[plugin], factory.call(global, $, $$))
})(window, $, $$, function (
    $,
    $$
) {
    var uuid = -1;
    var _TabControl = function (ops) {
        this._ops = {
            items: ops.items || [],
            hashItems: {},
            selectedIndex: ops.selectedIndex || 0,
            type: ops.type || 'default'
        };
        this._element = ops.element
        this.$element = $(ops.element);
        this._oldValue = { selectedIndex: 0 };
        this._convertHashItems();
        this._initId()
            ._init()
            ._create()
            ._initMember()
            ._setTabContainer()
            ._setTabContent()
            ._bindEvent();
    };

    _TabControl.prototype = {
        _convertHashItems: function () {
            var i = 0;
            for (; i < this._ops.items.length; i++) {
                this._ops.hashItems[i] = {
                    selectedIndex: i,
                    selectedItem: this._ops.items[i]
                };
            }
        },

        _init: function () {
            this._element.id = this._tabControlId;
            if (this._ops.type === 'vertical')
                this.$element.addClass("ui-tabcontrol-vertical");
            else
                this.$element.addClass("ui-tabcontrol");
            return this;
        },

        _initId: function () {
            ++uuid;
            this._tabControlId = 'ui-tabcontrol-' + uuid;
            return this;
        },

        _create: function () {
            this._createTab();
            return this;
        },

        _createTab: function () {
            var fragement = [],
                h = -1;
            fragement[++h] = "<div class=\"ui-tab-container\">";
            fragement[++h] = "</div>";
            this.$element.prepend(fragement.join(""));
        },

        _initMember: function () {
            this.$container = $('#' + this._tabControlId + ' > .ui-tab-container');
            this.$contents = $('#' + this._tabControlId + ' .ui-tabcontrol-content').children();
            return this;
        },

        _setTabContainer: function () {
            var i = 0,
                items = this._ops.items,
                len = items.length,
                h = -1,
                fragement = [];
            for (; i < len; i++) {
                if (this._ops.selectedIndex == i)
                    fragement[++h] = "<div class=\"ui-tabcontrol-container-item active\" data-index=" + i + ">";
                else
                    fragement[++h] = "<div class=\"ui-tabcontrol-container-item\" data-index=" + i + ">";
                if (items[i].template !== undefined)
                    fragement[++h] = items[i].template;
                else
                    fragement[++h] = items[i].title;
                fragement[++h] = "</div>"
            }
            this.$container.append(fragement.join(''));
            return this;
        },

        _resetTabContainer: function () {
            var $targets = this.$container.children();
            $targets.removeClass("active");
            $($targets[this._ops.selectedIndex]).addClass("active");
        },

        _bindEvent: function () {
            this.$container.find('.ui-tabcontrol-container-item').on('click', this._tabClickHandler.bind(this));
            return this;
        },

        _tabClickHandler: function (e) {
            var self = this,
                newValue = this._ops.hashItems[e.currentTarget.dataset.index];
            $$.trigger(
                "tabHandleChanged",
                self.$element,
                $$.Event({
                    element: self.$element,
                    oldValue: this._oldValue,
                    newValue: newValue
                })
            );
            this._ops.selectedIndex = newValue.selectedIndex;
            this._oldValue = newValue;
            this._resetTabContainer();
            this._setTabContent();
        },

        _setTabContent: function () {
            this.$contents.addClass("ui-tabcontrol-content-item");
            var i = 0,
                items = this._ops.items,
                len = items.length;
            for (; i < len; i++) {
                if (i !== this._ops.selectedIndex)
                    $(this.$contents[i]).css("display", "none");
                else $(this.$contents[i]).css("display", "");
            }
            return this;
        },

        setOptions: function (ops) {
            this._ops.items = ops.items;
            this._ops.selectedIndex = ops.selectedIndex || this._oldValue.selectedIndex;
            this._convertHashItems();
            this._removeTabTabContainer()
                ._setTabContainer()
                ._setTabContent();
        },
        _removeTabTabContainer: function () {
            this.$container.empty();
            return this;
        }
    };

    return {
        TabControl: _TabControl
    }

}, "ui")