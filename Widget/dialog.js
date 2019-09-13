(function (global, $, $$, factory, plugin) {
    if (typeof global[plugin] !== "object") global[plugin] = {};
    $.extend(true, global[plugin], factory.call(global, $, $$));
})(
    window,
    $,
    $$,
    function ($, $$) {
        var uuid = -1;

        var _Dialog = function (ops) {
            return new _Dialog.fn.init(ops);
        };

        var prototype = _Dialog.prototype = _Dialog.fn = {
            _constructor: function () {
                this._element = this._ops.element;
                this.$element = $(this._element);
            },

            _initId: function () {
                uuid++;
                this._dialogId = "ui-dialog-" + uuid;
                return this;
            }
        };

        /**
         * render dialog
         */

        $.extend(true, prototype, {
            _render: function () {
                this._createDialog();
                this._initMember();
                var foot = this._createFooter();
                this.$dialog.append(foot);
                this._initBtnMember()
                    ._bindBtnEvent();
                this._setStyle();
            },

            _createDialog: function () {
                var $dialogOuter = '<div class="ui-backdrop"></div>',
                    $dialog = "<div id=" + this._dialogId +
                        ' class="dialog" style=' +
                        "width:" +
                        this._ops.width +
                        "px" +
                        ";height:" +
                        this._ops.height +
                        "px" +
                        ";margin-top:" +
                        -this._ops.height * 0.5 +
                        "px" +
                        ";margin-left:" +
                        -this._ops.width * 0.5 +
                        "px" +
                        "></div>",
                    $dialogTitle =
                        '<div class="dialog-title">' + this._ops.title + "</div>",
                    $dialogContent = '<div class="dialog-content"></div>';
                this.$element
                    .wrapInner($dialogContent)
                    .prepend($dialogTitle)
                    .wrapInner($dialog)
                    .wrapInner($dialogOuter);
                return this;
            },

            _createFooter: function () {
                var fragement = [],
                    h = -1;
                fragement[++h] = '<div class="dialog-footer">';
                this._ops.btnArray.forEach(function (el, index) {
                    fragement[++h] = "<button>";
                    fragement[++h] = el.text;
                    fragement[++h] = "</button>";
                });
                fragement[++h] = "</div>";
                return fragement.join("");
            }

        });

        /**
         *  init member
         */

        $.extend(true, prototype, {
            _initMember: function () {
                this.$dialog = $("#" + this._dialogId);
                return this;
            },

            _initBtnMember: function () {
                this.$btns = $("#" + this._dialogId + " .dialog-footer button");
                this.$btns[0].focus();
                return this;
            },
        })

        /**
         * bind events
         */

        $.extend(true, prototype, {
            _bindBtnEvent: function () {
                this.$btns.on("click", this._btnClickHandler.bind(this));
            }
        });

        /**
         * event handler
         */

        _Dialog.fn._btnClickHandler = function () {
            $$.trigger("btnClick", this.$dialog, $$.Event({}));
        }

        /**
         * set dailog style
         */

        $.extend(true, prototype, {
            _setStyle: function () {
                if (this._ops.status == false) this.$element.css("display", "none");
                else this.$element.css("display", "");
                this.$dialog
                    .css("width", this._ops.width + "px")
                    .css("height", this._ops.height + "px")
                    .css("margin-top", -this._ops.height * 0.5 + "px")
                    .css("margin-left", -this._ops.width * 0.5 + "px");
            }
        })

        /**
         * 非Dialog 内部函数
         */

        _Dialog.fn.init = function (ops) {
            this._ops = {
                element: null,
                width: 400,
                height: 500,
                title: ops.title || "Dialog",
                btnArray: [],
                status: false
            };
            $.extend(true, this._ops, ops);
            this._constructor();
            this._initId()
                ._render();
            return this;
        };

        _Dialog.fn.destory = function () {
            $(".dialog-bg").remove();
        };

        _Dialog.fn.setOptions = function (ops) {
            $.extend(true, this._ops, ops);
            this._setStyle();
        };

        _Dialog.fn.init.prototype = _Dialog.prototype;

        return {
            Dialog: _Dialog
        };
    },
    "ui"
);
