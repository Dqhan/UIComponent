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
        return new _MessageBar.fn._init(ops);
    };

    var prototype = _MessageBar.fn = _MessageBar.prototype = {
        _constructor: function () {
            this._initId();
            this._ops.element.id = this._messageId;
            this.$element = $(this._ops.element);
            this.$element.addClass("ui-message");
        },

        _initId: function () {
            ++uuid;
            this._messageId = "ui-message-id-" + uuid;
            return this;
        }
    };

    /**
     * 初始化属性
     */

    _MessageBar.fn._init = function (ops) {
        this._ops = {
            element: ops.element,
            msg: ops.msg || "Message is empty.",
            type: ops.type || "success",
            show: ops.show || false
        };
        $.extend(true, this._ops, ops);
        this._constructor();
        this._render();
        return this;
    };

    /**
     * render messagebar
     */

    $.extend(true, prototype, {
        _render: function () {
            var message = this._createMessagebar();
            this.$element.append(message);
            this._initMember()
                ._bindEvent()
                ._setMessagebar();
        },

        _createMessagebar: function () {
            var fragement = [],
                h = -1;
            fragement[++h] = '<div class="icon">';
            fragement[++h] = "</div>";
            fragement[++h] = '<div class="ui-message-content">';
            fragement[++h] = this._ops.msg;
            fragement[++h] = "</div>";
            fragement[++h] = '<div class="ui-message-btn">';
            fragement[++h] = "</div>";
            return fragement.join("");
        }
    })

    /**
     * init member
     */

    $.extend(true, prototype, {
        _initMember: function () {
            this.$btn = $("#" + this._messageId + " .ui-message-btn");
            this.$content = $("#" + this._messageId + " .ui-message-content");
            this.$icon = $("#" + this._messageId + " .icon");
            return this;
        },
    })

    /**
     *  bind event
     */

    $.extend(true, prototype, {
        _bindEvent: function () {
            this.$btn.on("click", this._messageBtnClick.bind(this));
            return this;
        },
    })

    /**
     * event handler
     */

    _MessageBar.fn._messageBtnClick = function () {
        this.$element.css("display", "none");
    };

    /**
     * 
     */

    _MessageBar.fn._setMessagebar = function () {
        var self = this;

        this.$element
            .removeClass("success")
            .removeClass("error")
            .removeClass("info")
            .removeClass("warn");
        var clr_type = {
            success: function () {
                self.$element.addClass("success");
                self.$icon.removeClass("fi-page-round-infor-a info");
                self.$icon.removeClass("fi-page-round-error-a error");
                self.$icon.removeClass("fi-page-circle-warning-a warn");
                self.$icon.addClass("fi-page-round-finish-a success");
            },
            error: function () {
                self.$element.addClass("error");
                self.$icon.removeClass("fi-page-round-finish-a success");
                self.$icon.removeClass("fi-page-round-infor-a info");
                self.$icon.removeClass("fi-page-circle-warning-a warn");
                self.$icon.addClass("fi-page-round-error-a error");
            },
            info: function () {
                self.$element.addClass("info");
                self.$icon.removeClass("fi-page-round-finish-a success");
                self.$icon.removeClass("fi-page-round-error-a error");
                self.$icon.removeClass("fi-page-circle-warning-a warn");
                self.$icon.addClass("fi-page-round-infor-a info info");
            },
            warn: function () {
                self.$element.addClass("warn");
                self.$icon.removeClass("fi-page-round-finish-a success");
                self.$icon.removeClass("fi-page-round-infor-a info");
                self.$icon.removeClass("fi-page-round-error-a error");
                self.$icon.addClass("fi-page-circle-warning-a warn");
            }
        };
        clr_type[this._ops.type]();
        this.$content.text(self._ops.msg);

        var clr_display = {
            false: function () {
                self.$element.css("display", "none");
            },
            true: function () {
                self.$element.css("display", "");
            }
        };
        clr_display[this._ops.show]();

        return this;
    }

    /**
     * 外部调用函数
     */

    _MessageBar.fn.setOptions = function (ops) {
        $.extend(true, this._ops, ops);
        this._setMessagebar();
    }

    _MessageBar.fn._init.prototype = _MessageBar.prototype;

    return {
        MessageBar: _MessageBar,
    };
}, "ui")