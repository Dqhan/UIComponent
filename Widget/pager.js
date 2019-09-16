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
    var _Pager = function (ops) {
        return new _Pager.fn._init(ops);
    };

    var prototype = _Pager.fn = _Pager.prototype = {
        _constructor: function () {
            this._initId();
            this._ops.element.id = this._pagerId;
            this.$element = $(this._ops.element);
            this.$element.addClass("ui-pager-container");
            return this;
        },

        _initId: function () {
            uuid++;
            this._pagerId = "ui-pager-" + uuid;
            return this;
        }
    }

    /**
     * init
     */

    _Pager.fn._init = function (ops) {
        this._ops = {
            element: ops.element,
            count: ops.count || 0,
            selectedIndex: ops.selectedIndex || 1,
            size: ops.size || 0
        };
        $.extend(true, this._ops, ops);
        this._constructor()
            ._render();
        return this;
    }

    _Pager.fn._init.prototype = _Pager.prototype;

    /**
     * render pager
     */

    $.extend(true, prototype, {
        _render: function () {
            this._createPager()
                ._initMember()
                ._createPagerBtn();
            this._bindEvent();
            return this;
        },
        _createPager: function () {
            var fragement = [],
                h = -1;
            fragement[++h] = '<div class="ui-pager-trangleBtn">';
            fragement[++h] = '<button class="fi-page-triangle-left-as"></button>';
            fragement[++h] = "</div>";

            fragement[++h] = '<div class="pager-content">';
            fragement[++h] = "</div>";

            fragement[++h] = '<div class="ui-pager-trangleBtn">';
            fragement[++h] = '<button class="fi-page-triangle-right-as"></button>';
            fragement[++h] = "</div>";

            fragement[++h] = '<div class="ui-pager-go">';
            fragement[++h] =
                '<input type="text" class="ui-pager-go-input" value="1" />';
            fragement[++h] = '<button class="ui-pager-go-btn">GO</button>';
            fragement[++h] = "</div>";
            this.$element.append(fragement.join(""));
            return this;
        },

        _createPagerBtn: function () {
            this.$pagerElBtnGroup.empty();
            var fragement = [],
                h = -1;
            if (this._ops.count <= 5) {
                for (var i = 0; i < this._ops.count; i++) {
                    if (i + 1 == this._ops.selectedIndex)
                        fragement[++h] = '<button class="pager-content-btn active" value=' + (i + 1) + ">";
                    else
                        fragement[++h] = '<button class="pager-content-btn" value=' + (i + 1) + ">";
                    fragement[++h] = i + 1;
                    fragement[++h] = "</button>";
                }
                this.$pagerElBtnGroup.append(fragement.join(""));
            } else {
                for (var i = 0; i < this._ops.count; i++) {
                    if (this._ops.selectedIndex <= 4) {
                        if (i + 1 <= 4) {
                            if (i + 1 == this._ops.selectedIndex)
                                fragement[++h] = '<button class="pager-content-btn active" value=' + (i + 1) + "> " + (i + 1) + "</button>";
                            else
                                fragement[++h] = '<button class="pager-content-btn" value=' + (i + 1) + ">" + (i + 1) + "</button>";
                        } else if (i + 1 == this._ops.count) {
                            var m = h + 1;
                            if (i + 1 == this._ops.selectedIndex)
                                fragement[++m] = '<button class="pager-content-btn active" value=' + (i + 1) + "> " + (i + 1) + "</button>";
                            else
                                fragement[++m] = '<button class="pager-content-btn" value=' + (i + 1) + ">" + (i + 1) + "</button>";
                        } else
                            fragement[h + 1] = '<button class="button-bald" disabled>...</button>';
                    } else if (this._ops.selectedIndex >= this._ops.count - 3) {
                        if (i + 1 == 1) {
                            if (i + 1 == this._ops.selectedIndex)
                                fragement[++h] = '<button class="pager-content-btn active" value=' + (i + 1) + "> " + (i + 1) + "</button>";
                            else
                                fragement[++h] = '<button class="pager-content-btn" value=' + (i + 1) + ">" + (i + 1) + "</button>";
                        } else if (i + 1 >= this._ops.count - 3) {
                            var m = h + 1;
                            if (i + 1 == this._ops.selectedIndex)
                                fragement[++m] = '<button class="pager-content-btn active" value=' + (i + 1) + "> " + (i + 1) + "</button>";
                            else
                                fragement[++m] = '<button class="pager-content-btn" value=' + (i + 1) + ">" + (i + 1) + "</button>";
                            h = m;
                        } else {
                            fragement[h + 1] = '<button class="button-bald" disabled>...</button>';
                        }
                    } else if (
                        this._ops.selectedIndex > 4 &&
                        this._ops.selectedIndex < this._ops.count - 3
                    ) {
                        if (i + 1 == 1) {
                            if (i + 1 == this._ops.selectedIndex)
                                fragement[++h] = '<button class="pager-content-btn active" value=' + (i + 1) + "> " + (i + 1) + "</button>";
                            else
                                fragement[++h] = '<button class="pager-content-btn" value=' + (i + 1) + "> " + (i + 1) + "</button>";
                        } else if (
                            i + 1 == this._ops.selectedIndex - 1 ||
                            i + 1 == this._ops.selectedIndex ||
                            i + 1 == this._ops.selectedIndex + 1
                        ) {
                            var m = h + 1;
                            if (i + 1 == this._ops.selectedIndex)
                                fragement[++m] = '<button class="pager-content-btn active" value=' + (i + 1) + "> " + (i + 1) + "</button>";
                            else
                                fragement[++m] = '<button class="pager-content-btn" value=' + (i + 1) + "> " + (i + 1) + "</button>";
                            h = m;
                        } else if (i + 1 == this._ops.count) {
                            var m = h + 1;
                            if (i + 1 == this._ops.selectedIndex)
                                fragement[++m] = '<button class="pager-content-btn active" value=' + (i + 1) + "> " + (i + 1) + "</button>";
                            else
                                fragement[++m] = '<button class="pager-content-btn" value=' + (i + 1) + "> " + (i + 1) + "</button>";
                            h = m;
                        } else {
                            fragement[h + 1] = '<button class="button-bald" disabled>...</button>';
                        }
                    }
                }
                this.$pagerElBtnGroup.append(fragement.join(""));
            }
            return this;
        }
    })

    /**
     *  init member
     */

    $.extend(true, prototype, {
        _initMember: function () {
            this.$leftBtn = $("#" + this._pagerId + " .fi-page-triangle-left-as");
            this.$rightBtn = $("#" + this._pagerId + " .fi-page-triangle-right-as");
            this.$goBtn = $("#" + this._pagerId + " .ui-pager-go-btn");
            this.$pagerElBtnGroup = $("#" + this._pagerId + " .pager-content");
            this.$input = $("#" + this._pagerId + " .ui-pager-go-input");
            return this;
        },
    })

    /**
     * bind event
     */

    $.extend(true, prototype, {
        _bindEvent() {
            this.$leftBtn.on("click", this._leftBtnClick.bind(this));
            this.$rightBtn.on("click", this._rightBtnClick.bind(this));
            this.$goBtn.on("click", this._goBtnClick.bind(this));
            this.$pagerElBtnGroup.on("click", this._pageBtnClick.bind(this));
        },
    })

    /**
     * event handler
     */

    _Pager.fn._leftBtnClick = function () {
        if (this._ops.selectedIndex != 1) this._ops.selectedIndex -= 1;
        else return;
        this._setSelectIndex(this._ops.selectedIndex);
        this._createPagerBtn();
    };

    _Pager.fn._rightBtnClick = function () {
        if (this._ops.selectedIndex != this._ops.count)
            this._ops.selectedIndex += 1;
        else return;
        this._setSelectIndex(this._ops.selectedIndex);
        this._createPagerBtn();

    };

    _Pager.fn._pageBtnClick = function () {
        var selectedIndex = parseInt(e.target.value);
        this._setSelectIndex(selectedIndex);
        this._createPagerBtn();
    };

    _Pager.fn._goBtnClick = function () {
        var value = this.$input.val();
        if (value == "") throw new Error("Value i error.");
        var targetIndex = parseInt(value);
        if (targetIndex > this._ops.count) targetIndex = this._ops.count;
        if (targetIndex <= 0) targetIndex = 1;
        this._setSelectIndex(targetIndex);
        this._createPagerBtn();
    };

    $.extend(true, prototype, {
        _setSelectIndex: function (index) {
            if (this._ops.selectedIndex == index) return;
            var selectedIndex = index || 1;
            var $element = $(this._element);
            $$.trigger(
                "selectedPageChanged",
                $element,
                $$.Event({
                    element: $element,
                    oldValue: null,
                    newValue: selectedIndex
                })
            );
            this._ops.selectedIndex = selectedIndex;
        },
    })

    /**
     * 外部调用函数
     */

    _Pager.fn.setOptions = function (ops) {
        if (!$$.isNumber(ops.count)) throw new Error("count is error.");
        if (!$$.isNumber(ops.size)) throw new Error("count is error.");
        if (!$$.isNumber(ops.selectedIndex)) throw new Error("count is error.");
        if (ops.selectedIndex > ops.count) ops.selectedIndex = ops.count;
        this._ops.count = ops.count;
        this._ops.selectedIndex = ops.selectedIndex;
        this._ops.size = ops.size;
        this._createPagerBtn();
    }

    return {
        Pager: _Pager
    }
}, "ui");