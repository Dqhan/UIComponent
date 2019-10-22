(function (global, $, $$, factory, plugin) {
    if (typeof global[plugin] !== "object") global[plugin] = {};
    $.extend(global[plugin], factory.call(global, $, $$));
})(
    window,
    $,
    $$,
    function ($, $$) {
        var uuid = -1;

        var _Dialog = function (ops) {
            return new _Dialog.fn.init(ops);
        };

        var prototype = (_Dialog.prototype = _Dialog.fn = {
            _constructor: function (props) {
                $.extend(this._ops, props);
                this._element = this._ops.element;
                this.$element = $(this._element);
                this.$element.css('display', 'none');
            },

            _initId: function () {
                uuid++;
                this._dialogId = "ui-dialog-" + uuid;
                return this;
            }
        });

        /**
         * render dialog
         */

        $.extend(prototype, {
            _render: function () {
                this._createDialog();
                this._initMember();
                this.$footer.append(this._createFooter());
                this._initBtnMember()
                    ._bindBtnEvent();
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
                    $dialogTitle = '<div class="dialog-title">' + this._ops.title + "</div>",
                    $dialogContent = '<div class="dialog-content"' +
                        (this._ops.height - 130) + "px" +
                        '></div>';
                $dialogFooter = '<div class="dialog-footer"></div>';
                this.$element
                    .wrapInner($dialogContent)
                    .prepend($dialogTitle)
                    .append($dialogFooter)
                    .wrapInner($dialog)
                    .wrapInner($dialogOuter);
                return this;
            },

            _createFooter: function () {
                var fragement = [],
                    h = -1;
                this._ops.btnArray.forEach(function (el, index) {
                    fragement[++h] = "<button>";
                    fragement[++h] = el.text;
                    fragement[++h] = "</button>";
                });
                return fragement.join("");
            }
        });

        /**
         *  init member
         */

        $.extend(prototype, {
            _initMember: function () {
                this.$dialog = $("#" + this._dialogId);
                this.$title = $("#" + this._dialogId + " .dialog-title");
                this.$content = $("#" + this._dialogId + " .dialog-content");
                this.$footer = $("#" + this._dialogId + " .dialog-footer");
                return this;
            },

            _initBtnMember: function () {
                this.$btns = $("#" + this._dialogId + " .dialog-footer button");
                this.$btns[0].focus();
                return this;
            }
        });

        /**
         * bind events
         */

        $.extend(prototype, {
            _bindBtnEvent: function () {
                var i = 0,
                    len = this.$btns.length;
                for (; i < len; i++) {
                    $(this.$btns[i]).on("click",  this._ops.btnArray[i].click)
                }
                // this.$btns.on("click", this._btnClickHandler.bind(this));
            }
        });

        /**
         * event handler
         */

        // _Dialog.fn._btnClickHandler = function () {
        //     $$.trigger("btnClick", this.$dialog, $$.Event({}));
        // };

        /**
         * set dailog style
         */

        $.extend(prototype, {
            _updateDialog: function () {
                if (this._ops.status === false) this.$element.css("display", "none");
                else this.$element.css("display", "");
                this.$dialog
                    .css("width", this._ops.width + "px")
                    .css("height", this._ops.height + "px")
                    .css("margin-top", -this._ops.height * 0.5 + "px")
                    .css("margin-left", -this._ops.width * 0.5 + "px");
                this.$content.css('height', this._ops.height - 130 + "px");
                this.$title.val(this._ops.title);
                this.$footer.html(this._createFooter());
                this._initBtnMember()
                    ._bindBtnEvent();
            }
        });

        /**
         * 非Dialog 内部函数
         */

        _Dialog.fn.init = function (props) {
            this._ops = {
                element: null,
                width: 400,
                height: 500,
                title: props.title || "Dialog",
                btnArray: [],
                status: false
            };
            if (!$$.isNumber(props.width)) throw new Error('Argument width is illegal.');
            else props.width = parseInt(props.width);
            if (!$$.isNumber(props.height)) throw new Error('Argument height is illegal.');
            else props.height = parseInt(props.height);
            if (props.btnArray !== undefined && !$$.isArray(props.btnArray)) throw new Error('Argument btnArray is illegal.');
            if (!$$.isBool(props.status)) throw new Error('Argument status is illegal.');
            this._constructor(props);
            this._initId()
                ._render();
            return this;
        };

        _Dialog.fn.setOptions = function (props) {
            if (!$$.isNumber(props.width)) throw new Error('Argument width is illegal.');
            else props.width = parseInt(props.width);
            if (!$$.isNumber(props.height)) throw new Error('Argument height is illegal.');
            else props.height = parseInt(props.height);
            if (props.btnArray !== undefined && !$$.isArray(props.btnArray)) throw new Error('Argument btnArray is illegal.');
            if (!$$.isBool(props.status)) throw new Error('Argument status is illegal.');
            $.extend(this._ops, props);
            this._updateDialog();
        };

        _Dialog.fn.init.prototype = _Dialog.prototype;

        return {
            Dialog: _Dialog
        };
    },
    "ui"
);
