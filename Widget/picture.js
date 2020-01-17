(function (global, $, $$, factory, plugin) {
    if (typeof global[plugin] !== "object") global[plugin] = {};
    $.extend(global[plugin], factory.call(global, $, $$));
})(
    window,
    $,
    $$,
    function ($, $$) {
        var uuid = -1;

        var _Picture = function (ops) {
            return new _Picture.fn.init(ops);
        };

        var prototype = (_Picture.prototype = _Picture.fn = {
            _constructor: function (props) {
                $.extend(this._ops, props);
                this._element = this._ops.element;
                this.$element = $(this._element);
                if (this._ops.status === false) this.$element.css("display", "none");
                else this.$element.css("display", "");
            },

            _initId: function () {
                uuid++;
                this._pictureId = "ui-picture-" + uuid;
                return this;
            }
        });

        /**
         * render picture
         */

        $.extend(prototype, {
            _render: function () {
                this._createPicture();
                this._initMember();
                this._initBtnMember()
                    ._bindBtnEvent();
                this.freshImg();
            },

            _createPicture: function () {
                var $pictureOuter = '<div class="ui-backdrop"></div>',
                    $CloseBtn = '<div class="picture-close-btn fi-page-close-a"></div>',
                    $picture = "<div id=" + this._pictureId +
                        ' class="picture" style=' + "width:" + this._ops.width + "px" + ";height:" + this._ops.height + "px" + ";margin-top:" +
                        -this._ops.height * 0.5 + "px" + ";margin-left:" +
                        -this._ops.width * 0.5 + "px" + "></div>",
                    $pictureContent = '<div class="picture-content"></div>',
                    $leftBtn = '<div class="picture-left-btn fi-page-arrow-paging-left-as"></div>',
                    $rightBtn = '<div class="picture-right-btn fi-page-arrow-paging-right-as"></div>';
                this.$element
                    .wrapInner($pictureContent)
                    .append($CloseBtn)
                    .append($leftBtn)
                    .append($rightBtn)
                    .wrapInner($picture)
                    .wrapInner($pictureOuter)
                return this;
            },

            freshImg: function () {
                this.$content.empty();
                var fragement = [],
                    h = -1;
                fragement[++h] = '<img class="picture-content-img" src=' + this._ops.src + ' />';
                this.$content.append(fragement.join(''));
                var width = $('.picture-content-img').width(),
                    height = $('.picture-content-img').height();
                if (width > height) {
                    this.$content.width(this._ops.width);
                    this.$content.height('auto');
                }
                else {
                    this.$content.width('auto');
                    this.$content.height(this._ops.height);
                }
            }
        });

        /**
         *  init member
         */

        $.extend(prototype, {
            _initMember: function () {
                this.$picture = $("#" + this._pictureId);
                this.$content = $("#" + this._pictureId + " .picture-content");
                return this;
            },

            _initBtnMember: function () {
                this.$closeBtn = $('#' + this._pictureId + ' .picture-close-btn');
                this.$leftBtn = $('#' + this._pictureId + ' .picture-left-btn');
                this.$rightBtn = $('#' + this._pictureId + ' .picture-right-btn');
                return this;
            }
        });

        /**
         * bind events
         */

        $.extend(prototype, {
            _bindBtnEvent: function () {
                this.$closeBtn.on('click', this.handleCloseBtn.bind(this));
                this.$leftBtn.on('click', this.handleLeftBtn.bind(this));
                this.$rightBtn.on('click', this.handleRightBtn.bind(this));
            }
        });



        /**
         * event handler
         */

        _Picture.fn.handleCloseBtn = function () {
            $$.trigger("closeBtnClick", this.$picture, $$.Event({}));
        };

        _Picture.fn.handleLeftBtn = function () {
            $$.trigger("leftBtnClick", this.$picture, $$.Event({}));
        };

        _Picture.fn.handleRightBtn = function () {
            $$.trigger("rightBtnClick", this.$picture, $$.Event({}));
        };

        /**
         * set dailog style
         */

        $.extend(prototype, {
            _updatePicture: function () {
                if (this._ops.status === false) this.$element.css("display", "none");
                else this.$element.css("display", "");
                this.$picture
                    .css("width", this._ops.width + "px")
                    .css("height", this._ops.height + "px")
                    .css("margin-top", -this._ops.height * 0.5 + "px")
                    .css("margin-left", -this._ops.width * 0.5 + "px");
                this.freshImg();
            }
        });

        /**
         * 非Picture 内部函数
         */

        _Picture.fn.init = function (props) {
            this._ops = {
                element: null,
                width: 400,
                height: 500,
                status: false,
                src: props.src,
                name: props.name
            };
            if (!$$.isNumber(props.width)) throw new Error('Argument width is illegal.');
            else props.width = parseInt(props.width);
            if (!$$.isNumber(props.height)) throw new Error('Argument height is illegal.');
            else props.height = parseInt(props.height);
            if (!$$.isBool(props.status)) throw new Error('Argument status is illegal.');
            this._constructor(props);
            this._initId()
                ._render();
            return this;
        };

        _Picture.fn.setOptions = function (props) {
            if (!$$.isNumber(props.width)) throw new Error('Argument width is illegal.');
            else props.width = parseInt(props.width);
            if (!$$.isNumber(props.height)) throw new Error('Argument height is illegal.');
            else props.height = parseInt(props.height);
            if (!$$.isBool(props.status)) throw new Error('Argument status is illegal.');
            $.extend(this._ops, props);
            this._updatePicture();
        };

        _Picture.fn.init.prototype = _Picture.prototype;

        return {
            Picture: _Picture
        };
    },
    "ui"
);
