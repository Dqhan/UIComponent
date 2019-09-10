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
        this._ops = {
            columns: ops.columns,
            items: ops.items
        };
        this._element = ops.element;
        this._initId()
            ._init()
            ._create()
            ._initMember();
    };

    _Datagrid.prototype = {
        _initId: function () {
            ++uuid;
            this.tableId = "ui-table-" + uuid;
            return this;
        },
        _init: function () {
            $(this._element).addClass("ui-table");
            this._element.id = this.tableId;
            return this;
        },
        _initMember: function () {
            return this;
        },
        _create: function () {
            this._createTable();
            return this;
        },
        _createTable: function () {
            var fragement = [],
                h = -1;
            $(this._element).append(fragement.join(""));
        },
        setOptions: function (ops) { }
    };
    return {
        Datagrid: _Datagrid
    };
}, "ui");