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

    var _Loading = function (ops) {
        return new _Loading.fn.init(ops);
    };

    var prototype = _Loading.fn = _Loading.prototype = {
        _initId: function () {
            this.uuid = ++uuid;
            this._loadingId = "ui-loading-" + this.uuid;
            return this;
        },
        _initRootElement: function () {
            this._element = document.createElement("div");
            this._element.classList.add("ui-loading");
            this._element.id = this._loadingId;
            this.$element = $(this._element);
        },
    };

    _Loading.fn.init = function (ops) {
        this._target = ops.element;
        this._positionAbsolute = ops.positionAbsolute;
        this._initId()
            ._initRootElement();
        this._renderLoading(ops.element);
        return this;
    }

    _Loading.fn.init.prototype = _Loading.fn = _Loading.prototype;

    /**
     * create loading
     */

    $.extend(true, prototype, {
        _renderLoading: function () {
            var backDrop = this._createBackDrop(),
                animation = this._createLoadingAnimation();
            this.$element.append(backDrop);
            this.$element.append(animation);
            return this;
        },
        _createBackDrop: function () {
            var fragement = [],
                h = -1;
            if (this._positionAbsolute)
                fragement[++h] = '<div class="ui-backdrop-absolute"></div>'
            else
                fragement[++h] = '<div class="ui-backdrop"></div>';
            return fragement.join("");
        },
        _createLoadingAnimation: function () {
            var fragement = [],
                h = -1;
            if (this._positionAbsolute)
                fragement[++h] = '<div class="ui-loading-dialog-relative">';
            else
                fragement[++h] = '<div class="ui-loading-dialog">';
            fragement[++h] = '<div class="ui-loading-circle">';
            fragement[++h] = '<span class="left">';
            fragement[++h] = '<span class="anim"></span>';
            fragement[++h] = "</span>";
            fragement[++h] = '<span class="right">';
            fragement[++h] = '<span class="anim"></span>';
            fragement[++h] = "</span>";
            fragement[++h] = '<span class="center"></span>';
            fragement[++h] = "</div>";
            fragement[++h] = "</div>";
            return fragement.join("");
        },
    })

    /**
     * api 
     */

    _Loading.fn.loading = function (isShow) {
        var action = isShow || false;
        var self = this,
            clr = {
                true: function () {
                    $(self._target).append(self._element);
                },
                false: function () {
                    self.$element.remove();
                }
            };
        clr[action]();
    }

    var unique = [];

    $$.loading = function (isShow, elementId) {
        if (elementId && document.getElementById(elementId) instanceof HTMLElement) {
            element = document.getElementById(elementId);
            element.style.position = "relative";
            var ops = {
                element: element,
                positionAbsolute: true
            }
            if (unique.includes(elementId)) {

            } else {
                unique.push(elementId);
                unique[elementId] = _Loading(ops);
            }
        }
        else {
            element = document.getElementsByTagName('body')[0];
            elementId = 'body';
            var ops = {
                element: element,
                positionAbsolute: false
            }
            if (unique.includes(elementId)) {

            } else {
                unique.push(elementId);
                unique[elementId] = _Loading(ops);
            }
        }
        unique[elementId].loading(isShow);
    }
}, "ui")