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

    var _TipConform = function (ops) {
        return new _TipConform.fn._init(ops);
    };

    var prototype = _TipConform.fn = _TipConform.prototype = {
        _constructor(ops) {
            $.extend(true, this._ops, ops);
            this.handleClick = ops.handleClick;
            this._initId();
        },

        _initId: function () {
            uuid++;
            this.tipConformId = "ui-tip-conform-" + uuid;
            this.tipConformOuterId = "ui-tip-conform" + uuid;
            return this;
        },

        _destory: function () {
            this.$tipConformOuter.length != 0 && this.$tipConformOuter.remove();
        }
    };

    _TipConform.fn._init = function (ops) {
        this._ops = {
            footer: ops.footer
        };
        this._constructor(ops);
        return this;
    };

    _TipConform.fn._init.prototype = _TipConform.prototype;

    /**
     * render  confirm
     */

    $.extend(true, prototype, {
        _render: function () {
            var confirm = this._createConfirm();
            $("body").append(confirm);
            this._initMember();
            var header = this._createHeaderBtn();
            this.$header.append(header);
            this._initCloseBtn();
            if (this._ops.footer) {
                var foot = this._createFooterBtn();
                this.$footer.append(foot);
                this._initOkBth();
            }
            return this;
        },

        _createConfirm: function () {
            var fragement = [],
                h = -1;
            fragement[++h] = "<div id=" + this.tipConformOuterId + ' class="ui-backdrop-outer">';
            fragement[++h] = '<div class="ui-backdrop"></div>';
            fragement[++h] = "<div id=" + this.tipConformId + ' class="ui-tip-conform" >';
            fragement[++h] = '<div class="ui-tip-conform-header">';
            fragement[++h] = "Conform";
            fragement[++h] = "</div>";
            fragement[++h] = '<div class="ui-tip-conform-contianer">';
            fragement[++h] = this._ops.message || "message is empty.";
            fragement[++h] = "</div>";
            if (this._ops.footer) {
                fragement[++h] = '<div class="ui-tip-conform-footer">';
                fragement[++h] = "</div>";
            }
            fragement[++h] = "</div>";
            fragement[++h] = "</div>";
            return fragement.join("");
        },

        _initMember: function () {
            this.$tipConform = $("#" + this.tipConformId);
            this.$tipConformOuter = $("#" + this.tipConformOuterId);
            this.$header = $("#" + this.tipConformId + " .ui-tip-conform-header");
            if (this._ops.footer)
                this.$footer = $("#" + this.tipConformId + " .ui-tip-conform-footer");
            return this;
        },

        _createHeaderBtn: function () {
            var fragement = [],
                h = -1;
            fragement[++h] = '<span class="icon fi-page-remove-a"></span>';
            return fragement.join('');
        },

        _initCloseBtn: function () {
            this.$closeBtn = $("#" + this.tipConformId + " .icon");
        },

        _createFooterBtn: function () {
            var fragement = [], h = -1;
            fragement[++h] = "<button class=\"ui-tip-conform-footer-btn\">";
            fragement[++h] = "ok"
            fragement[++h] = "</button>";
            return fragement.join('');
        },

        _initOkBth: function () {
            this.$okBtn = $("#" + this.tipConformId + " .ui-tip-conform-footer-btn");
        }

    })

    /**
     *  bind event
     */

    $.extend(true, prototype, {
        _bindEvent: function () {
            this.$closeBtn.on("click", this._closeBtnClickHandler.bind(this));
            this.$okBtn.on("click", this._okBtnClickHandler.bind(this));
        }
    })

    /**
     * event handlers
     */

    _TipConform.fn._okBtnClickHandler = function () {
        this.handleClick();
        this._destory();
    };

    _TipConform.fn._closeBtnClickHandler = function () {
        this._destory();
    };

    $$.conform = function (ops) {
        _TipConform(ops)
            ._render(ops)
            ._bindEvent();
    };

}, "ui")
