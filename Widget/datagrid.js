(function (global,
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

    var _Datagrid = function (ops) {
        return new _Datagrid.fn.init(ops);
    };

    var prototype = _Datagrid.fn = _Datagrid.prototype = {
        _constructor: function (ops) {
            $.extend(true, this._ops, ops);
            this._initId();
            this._ops.element.id = this.tableId;
            this.$element = $(this._ops.element);
            this.$element.addClass("ui-table");
        },

        _initId: function () {
            ++uuid;
            this.tableId = "ui-table-" + uuid;
            return this;
        },
    };

    _Datagrid.fn.init = function (ops) {
        this._ops = {
            element: null
        };
        this._constructor(ops);
        return this;
    };

    _Datagrid.fn.init.prototype = _Datagrid.prototype;

    return {
        Datagrid: _Datagrid
    };
}, "ui");