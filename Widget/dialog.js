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
    var __Dialog__ = function (ops) {
        this.__dialogC__ = {
            width: 400,
            height: 500,
            title: ops.title || "Dialog",
            footFragement: [],
            status: false
        };
        this.__element__ = ops.element || document.getElementsByTagName("body");
        this.$element = $(this.__element__);
        this.__dialogC__ = this.extends(this.__dialogC__, ops);
        this.__initId__()
            .__init__()
            .__render__()
            .__initMember__();
        this.footFragement.length !== 0 && this.__createFooter__();
        this.__bindEvent__();
    };
    __Dialog__.prototype = {
        __initId__: function () {
            uuid++;
            this.__dialogId__ = "ui-dialog-" + uuid;
            return this;
        },

        __init__: function () {
            this.footFragement = this.__dialogC__.footFragement;
            return this;
        },

        __initMember__: function () {
            this.$dialog = $("#" + this.__dialogId__);
            return this;
        },

        __render__: function () {
            var $dialogOuter = '<div class="ui-backdrop"></div>',
                $dialog =
                    "<div id=" +
                    this.__dialogId__ +
                    ' class="dialog" style=' +
                    "width:" +
                    this.__dialogC__.width +
                    "px" +
                    ";height:" +
                    this.__dialogC__.height +
                    "px" +
                    ";margin-top:" +
                    -this.__dialogC__.height * 0.5 +
                    "px" +
                    ";margin-left:" +
                    -this.__dialogC__.width * 0.5 +
                    "px" +
                    "></div>",
                $dialogTitle =
                    '<div class="dialog-title">' + this.__dialogC__.title + "</div>",
                $dialogContent = '<div class="dialog-content"></div>';
            this.$element
                .wrapInner($dialogContent)
                .prepend($dialogTitle)
                .wrapInner($dialog)
                .wrapInner($dialogOuter);
            if (this.__dialogC__.status == false)
                this.$element.css("display", "none");
            else this.$element.css("display", "");
            return this;
        },

        __createFooter__: function () {
            var fragement = [],
                h = -1;
            fragement[++h] = '<div class="dialog-footer">';
            this.footFragement.forEach(function (el, index) {
                fragement[++h] = "<button>";
                fragement[++h] = el.text;
                fragement[++h] = "</button>";
            });
            fragement[++h] = "</div>";
            this.$dialog.append(fragement.join(""));
            this.__initBtnMember__();
        },

        __initBtnMember__: function () {
            this.$btns = $("#" + this.__dialogId__ + " .dialog-footer button");
            this.$btns[0].focus();
        },

        __bindEvent__: function () {
            this.$btns.on("click", this.__btnClickHandler__.bind(this));
            return this;
        },

        __btnClickHandler__() {
            $$.trigger("btnClick", this.$dialog, $$.Event({}));
        },

        setOptions: function (ops) {
            for (var i in ops) {
                if (typeof ops[i] !== undefined) this.__dialogC__[i] = ops[i];
            }
            if (this.__dialogC__.status == false)
                this.$element.css("display", "none");
            else this.$element.css("display", "");
            this.___reRender__();
        },

        ___reRender__: function () {
            this.$dialog
                .css("width", this.__dialogC__.width + "px")
                .css("height", this.__dialogC__.height + "px")
                .css("margin-top", -this.__dialogC__.height * 0.5 + "px")
                .css("margin-left", -this.__dialogC__.width * 0.5 + "px");
        },

        extends: function (target, ops) {
            for (var i in ops) {
                if (ops[i]) target[i] = ops[i];
            }
            return target;
        },

        destory: function () {
            $(".dialog-bg").remove();
        }
    };
    return {
        Dialog: __Dialog__
    }
}, "ui")