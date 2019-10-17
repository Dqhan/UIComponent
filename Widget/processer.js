; (function (global,
    $,
    $$,
    factory,
    plugin) {
    if (typeof global[plugin] !== "object") global[plugin] = {};
    $.extend(global[plugin], factory.call(global, $, $$));
})(window, $, $$, function (
    $,
    $$) {
    var uuid = -1;

    function _Processer(props) {
        return new _Processer.fn.init(props);
    };

    var prototype = _Processer.fn = _Processer.prototype = {
        _constructor: function (props) {
            $.extend(this._ops, props);
            $element = $(this._ops.element);
        }
    }

    _Processer.fn.init = function (props) {
        this._ops = {
            element: null,
            processerValue: 0
        };
        this._constructor(props);
        this._initId()
        this._render();
        return this;
    }

    _Processer.fn.init.prototype = _Processer.prototype;

    $.extend(prototype, {
        _initId: function () {
            ++uuid;
            this._processerId = 'ui-processer' + uuid;
        }
    })

    $.extend(prototype, {
        _render: function () {
            this._ops.element.id = this._processerId;
            $element.addClass('ui-processer');
            this._renderContent();
            this._initMember();
            this._calculate();
        },
        _renderContent: function () {
            var fragement = [],
                h = -1;
            fragement[++h] = "<div class=\"ui-processer-content\">";
            fragement[++h] = "</div>";
            $element.append(fragement.join(''));
        }
    })

    $.extend(prototype, {
        _initMember: function () {
            this.$processer = $('#' + this._processerId);
            this.$content = $('#' + this._processerId + ' .ui-processer-content');
        }
    })

    $.extend(prototype, {
        setOptions: function (props) {
            if (props.processerValue === undefined || $.isNumeric(props.processerValue))
                props.processerValue = 0;
            props.processerValue = parseInt(props.processerValue);
            if (props.processerValue > 100)
                props.processerValue = 100;
            $.extend(this._ops, props);
            this._calculate();
        },
    })

    $.extend(prototype, {
        _calculate: function () {
            var maxWidth = this.$processer.width(),
                precent = this._ops.processerValue / 100;
            this.$content.width(maxWidth * precent + 'px');
        }
    })

    return {
        Processer: _Processer
    }

}, 'ui')