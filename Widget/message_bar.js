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
    var _MessageBar = function (ops) {
        this._ops = {
            msg: ops.msg || "Message is empty.",
            type: ops.type || "success",
            show: ops.show || false
        };
        this._element = ops.element;
        this._initId()
            ._init()
            ._initMember()
            ._bindEvent()
            ._setMessage();
    };

    _MessageBar.prototype = {
        _initId: function () {
            ++uuid;
            this._messageId = "ui-message-id-" + uuid;
            this._element.id = this._messageId;
            $(this._element).addClass("ui-message");
            return this;
        },
        _init: function () {
            var fragement = [],
                h = -1;
            fragement[++h] = '<div class="icon">';
            fragement[++h] = "</div>";
            fragement[++h] = '<div class="ui-message-content">';
            fragement[++h] = this._ops.msg;
            fragement[++h] = "</div>";
            fragement[++h] = '<div class="ui-message-btn">';
            fragement[++h] = "</div>";
            $(this._element).append(fragement.join(""));
            return this;
        },

        _initMember: function () {
            this.$btn = $("#" + this._messageId + " .ui-message-btn");
            this.$content = $("#" + this._messageId + " .ui-message-content");
            this.$icon = $("#" + this._messageId + " .icon");
            return this;
        },

        _bindEvent: function () {
            this.$btn.on("click", this._messageBtnClick.bind(this));
            return this;
        },

        _setMessage: function () {
            var self = this;
            var clr_display = {
                false: function () {
                    $(self._element).css("display", "none");
                },
                true: function () {
                    $(self._element).css("display", "");
                }
            };
            clr_display[self._ops.show]();
            $(self._element)
                .removeClass("success")
                .removeClass("error")
                .removeClass("info")
                .removeClass("warn");
            var clr_type = {
                success: function () {
                    $(self._element).addClass("success");
                    self.$icon.removeClass("fi-page-round-infor-a info");
                    self.$icon.removeClass("fi-page-round-error-a error");
                    self.$icon.removeClass("fi-page-circle-warning-a warn");
                    self.$icon.addClass("fi-page-round-finish-a success");
                },
                error: function () {
                    $(self._element).addClass("error");
                    self.$icon.removeClass("fi-page-round-finish-a success");
                    self.$icon.removeClass("fi-page-round-infor-a info");
                    self.$icon.removeClass("fi-page-circle-warning-a warn");
                    self.$icon.addClass("fi-page-round-error-a error");
                },
                info: function () {
                    $(self._element).addClass("info");
                    self.$icon.removeClass("fi-page-round-finish-a success");
                    self.$icon.removeClass("fi-page-round-error-a error");
                    self.$icon.removeClass("fi-page-circle-warning-a warn");
                    self.$icon.addClass("fi-page-round-infor-a info info");
                },
                warn: function () {
                    $(self._element).addClass("warn");
                    self.$icon.removeClass("fi-page-round-finish-a success");
                    self.$icon.removeClass("fi-page-round-infor-a info");
                    self.$icon.removeClass("fi-page-round-error-a error");
                    self.$icon.addClass("fi-page-circle-warning-a warn");
                }
            };
            clr_type[self._ops.type]();
            this.$content.text(self._ops.msg);
            return self;
        },

        _messageBtnClick: function () {
            $(this._element).css("display", "none");
        },

        setOptions: function (ops) {
            this._ops.type = ops.type;
            this._ops.msg = ops.msg;
            this._ops.show = ops.show;
            this._setMessage();
        }
    };
    return {
        MessageBar: _MessageBar,
    };
}, "ui")