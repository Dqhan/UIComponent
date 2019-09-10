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
            selectedIndex: ops.selectedIndex || 0
        };
        this._element = $(ops.element);
        this._tabContainerId = "ui-tabcontrol-container-";
        this._oldValue = { selectedIndex: 0 };
        this._convertHashItems();
        this._init()
            ._initId()
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
                this._ops.hashItems[this._ops.items[i].title] = {
                    selectedIndex: i,
                    selectedItem: this._ops.items[i]
                };
            }
        },
        _init: function () {
            this._element.addClass("ui-tabcontrol");
            return this;
        },

        _initId: function () {
            this._tabContainerId += uuid;
            return this;
        },

        _create: function () {
            this._createTab();
            return this;
        },

        _createTab: function () {
            var fragement = [],
                h = -1;
            fragement[++h] =
                "<div id= " + this._tabContainerId + ' class="ui-tab-container">';
            fragement[++h] = "</div>";
            this._element.prepend(fragement.join(""));
        },

        _initMember: function () {
            this.$container = $("#" + this._tabContainerId);
            this.$contents = $(".ui-tabcontrol-content").children();
            return this;
        },

        _setTabContainer: function () {
            var i = 0,
                items = this._ops.items,
                len = items.length;
            for (; i < len; i++) {
                var el = document.createElement("div");
                el.textContent = items[i].title;
                $(el).addClass("ui-tabcontrol-container-item");
                if (this._ops.selectedIndex == i) $(el).addClass("active");
                el.onclick = this._tabClickHandler.bind(this);
                this.$container.append(el);
            }
            return this;
        },

        _resetTabContainer: function () {
            var $targets = this.$container.children();
            $targets.removeClass("active");
            $($targets[this._ops.selectedIndex]).addClass("active");
        },

        _bindEvent: function () {
            return this;
        },

        _tabClickHandler: function (e) {
            var self = this,
                newValue = this._ops.hashItems[e.target.textContent];
            $$.trigger(
                "tabHandleChanged",
                self._element,
                $$.Event({
                    element: self._element,
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
            this._ops.selectedIndex =
                ops.selectedIndex || this._oldValue.selectedIndex;
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