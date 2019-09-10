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
    var Loading = function () {
        this._initId()
            ._init()
            ._createLoading()
            ._initMember();
    };

    Loading.prototype = {
        _init: function () {
            this._element = document.createElement("div");
            this._element.classList.add("ui-loading");
            this._element.id = this._loadingId;
            return this;
        },
        _initId: function () {
            this.__uuId = ++uuid;
            this._loadingId = "ui-loading-" + this.__uuId;
            return this;
        },
        _initMember: function () {
            return this;
        },
        _createLoading: function () {
            var backDrop = this._createBackDrop();
            var animation = this._createLoadingAnimation();
            $(this._element).append(backDrop);
            $(this._element).append(animation);
            return this;
        },
        _createBackDrop: function () {
            var fragement = [],
                h = -1;
            fragement[++h] = '<div class="ui-backdrop"></div>';
            return fragement.join("");
        },
        _createLoadingAnimation: function () {
            var fragement = [],
                h = -1;
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
        loading: function (isShow) {
            var self = this;
            var clr = {
                true: function () {
                    $("body").append(self._element);
                },
                false: function () {
                    self._element.remove();
                },
                undefined: function () {
                    throw new Error("arguments can not empty.");
                }
            };
            clr[isShow]();
        }
    };

    if (!loader) {
        var loader = new Loading();
    }
    $$.loading = function (isShow) {
        loader.loading(isShow);
    };

}, "ui")