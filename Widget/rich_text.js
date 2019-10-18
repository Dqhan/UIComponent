(function (
    global,
    $,
    $$,
    factory,
    plugin
) {
    if (typeof global[plugin] !== "object") global[plugin] = {};
    $.extend(true, global[plugin], factory.call(global, $, $$));
})(window, $, $$, function (
    $,
    $$
) {
    var uuid = -1;
    var _RichText = function (ops) {
        this._element = ops.element || document.getElementsByTagName("body");
        this.$element = $(this._element);
        this._ops = {
            items: ops.items
        };
        this._initId()
            ._init()
            ._create()
            ._initMember()
            ._bindEvent();
    };

    _RichText.prototype = {
        _initId: function () {
            uuid++;
            this.textAreaId = "ui-rich-text-" + uuid;
            return this;
        },

        _init: function () {
            this._element.id = this.textAreaId;
            return this;
        },

        _create: function () {
            var items = this._ops.items,
                len = items.length,
                fragement = [],
                h = -1;
            for (var i = 0; i < len; i++) {
                fragement[++h] = '<div class="ui-rich-text-item">';
                fragement[++h] = items[i].name;
                fragement[++h] = '<span class="icon"></span>';
                fragement[++h] = "</div>";
            }
            this.$element.append(fragement.join(""));
            return this;
        },

        _initMember: function () {
            this.$item = $("#" + this.textAreaId + " .ui-rich-text-item");
            return this;
        },

        _bindEvent: function () {
            this.$item.on("click", this._itemClickHandler.bind(this));
        },

        _itemClickHandler: function (e) {
            var text = e.currentTarget.textContent;
            var result = this._ops.items.filter(i => i.name != text);
            this._ops.items = result;
            $$.trigger(
                "deleteItemHandler",
                this.$element,
                $$.Event({
                    items: result
                })
            );
            this._renderTextArea();
        },

        _renderTextArea: function () {
            this.$element.empty();
            var items = this._ops.items,
                len = items.length,
                fragement = [],
                h = -1;
            for (var i = 0; i < len; i++) {
                fragement[++h] = '<div class="ui-rich-text-item">';
                fragement[++h] = items[i].name;
                fragement[++h] = '<span class="icon"></span>';
                fragement[++h] = "</div>";
            }
            this.$element.append(fragement.join(""));
        },

        setOptions: function (ops) {
            this._ops.items = ops.items;
            this._renderTextArea();
            this._initMember()._bindEvent();
        }
    };
    return {
        RichText: _RichText
    }
}, "ui")