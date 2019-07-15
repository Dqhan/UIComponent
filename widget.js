"use strict";
; (function (global, $, $$, factory, plug) {
    global[plug] = factory.call(global, $, $$);
})(window, $, $$, function ($, $$) {
    /*
     dialog UI
 */
    var __Dialog__ = function (ops) {
        this.__dialogC__ = {
            width: 400,
            height: 500,
            title: ops.title || 'Dialog',
            footFragement: [],
            status: false
        };
        this.__element__ = ops.element || document.getElementsByTagName('body');
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
            this.$dialog = $('#' + this.__dialogId__);
            return this;
        },

        __render__: function () {
            var
                $dialogOuter = "<div class=\"ui-backdrop\"></div>",
                $dialog = "<div id=" + this.__dialogId__ + " class=\"dialog\" style=" +
                    "width:" + this.__dialogC__.width + "px" +
                    ";height:" + this.__dialogC__.height + "px" +
                    ";margin-top:" + -this.__dialogC__.height * 0.5 + "px" +
                    ";margin-left:" + -this.__dialogC__.width * 0.5 + "px" +
                    "></div>",
                $dialogTitle = "<div class=\"dialog-title\">" + this.__dialogC__.title + "</div>",
                $dialogContent = "<div class=\"dialog-content\"></div>";
            this.$element
                .wrapInner($dialogContent)
                .prepend($dialogTitle)
                .wrapInner($dialog)
                .wrapInner($dialogOuter);
            if (this.__dialogC__.status == false) this.$element.css('display', 'none');
            else this.$element.css('display', '');
            return this;
        },

        __createFooter__: function () {
            var fragement = [], h = -1;
            fragement[++h] = "<div class=\"dialog-footer\">";
            this.footFragement.forEach(function (el, index) {
                fragement[++h] = "<button>";
                fragement[++h] = el.text;
                fragement[++h] = "</button>";
            });
            fragement[++h] = "</div>";
            this.$dialog.append(fragement.join(''));
            this.__initBtnMember__();
        },

        __initBtnMember__: function () {
            this.$btns = $('#' + this.__dialogId__ + ' .dialog-footer button');
            this.$btns[0].focus();
        },

        __bindEvent__: function () {
            this.$btns.on('click', this.__btnClickHandler__.bind(this));
            return this;
        },

        __btnClickHandler__() {
            $$.trigger('btnClick', this.$dialog, $$.Event({}));
        },

        setOptions: function (ops) {
            for (var i in ops) {
                if (typeof ops[i] !== undefined) this.__dialogC__[i] = ops[i];
            };
            if (this.__dialogC__.status == false) this.$element.css('display', 'none');
            else this.$element.css('display', '');
            this.___reRender__();
        },

        ___reRender__: function () {
            this.$dialog.css('width', this.__dialogC__.width + "px")
                .css('height', this.__dialogC__.height + "px")
                .css('margin-top', -this.__dialogC__.height * 0.5 + "px")
                .css('margin-left', -this.__dialogC__.width * 0.5 + "px");
            $('#' + this.__dialogId__ + ' .dialog-footer button')[0].focus();
        },

        extends: function (target, ops) {
            for (var i in ops) {
                if (ops[i]) target[i] = ops[i];
            }
            return target;
        },

        destory: function () {
            $('.dialog-bg').remove();
        }
    };

    /*
     combobox UI
     */
    var uuid = -1;
    var __Combobox__ = function (ops) {
        this.__eventNameSpave__ = ".combobox-event";
        this.__ComboboxC__ = {
            root: $('body'),
            inputId: 'ui-combobox-input-',
            dorpdownId: 'ui-combobox-dropdown-',
            popupId: 'ui-combobox-popup-',
            placeHolderId: 'ui-combobox-placeholder-',
            listboxId: 'ui-combobox-listboxId-',
            items: [],
            popupOpend: false,
            oldValue: {},
            newValue: {},
            selectedIndex: -1,
            selectedItem: {}
        };
        this.__delay__ = 200;
        this.__$Dom__ = {};
        this.__filterSelectionResultIndex__ = [];
        this.__extends__(ops, this.__ComboboxC__);
        this.__element__ = this.__ComboboxC__.root;
        this.__initId__().__init__().__load__();
    }

    __Combobox__.prototype = {
        __initId__: function () {
            this.__uuId = ++uuid;
            this.__ComboboxC__.inputId += uuid;
            this.__ComboboxC__.dorpdownId += uuid;
            this.__ComboboxC__.popupId += uuid;
            this.__ComboboxC__.placeHolderId += uuid;
            this.__ComboboxC__.listboxId += uuid;
            return this;
        },
        __init__: function () {
            this.__element__.css('width', this.__ComboboxC__.width + 'px')
                .css('height', this.__ComboboxC__.height + 'px')
                .addClass('ui-combobox');
            this.__createCombobox__()
                .__createDropDown__()
                .__createPopup__()
                .__initDom__()
                .__bindEvent__();
            return this;
        },
        __createCombobox__: function () {
            var h = -1, fragement = [];
            fragement[++h] = "<input id='" + this.__ComboboxC__.inputId + "' class=\"ui-combobox-input\" />";
            fragement[++h] = "<div class=\"ui-combobox-placeholder\">";
            fragement[++h] = "<div id='>" + this.__ComboboxC__.placeHolderId + "<' /div>";
            fragement[++h] = "</div>";
            this.__element__.append(fragement.join(''));
            return this;
        },
        __createDropDown__: function () {
            var h = -1, fragement = [];
            fragement[++h] = "<div id=" + this.__ComboboxC__.dorpdownId + " class=\"ui-combobox-dropdown-container\">";
            fragement[++h] = "<div class=\"ui-dorpdown-icon\"></div>";
            fragement[++h] = "</div>";
            this.__element__.append(fragement.join(''));
            return this;
        },
        __createPopup__: function () {
            var h = -1, fragement = [];
            fragement[++h] = "<div class=\"ui-combobox-popup\" id=" + this.__ComboboxC__.popupId + ">";
            fragement[++h] = "<div class=\"ui-combobox-listbox\">";
            fragement[++h] = "<div class=\"ui-combobox-listbox-container\" id=" + this.__ComboboxC__.listboxId + ">";
            fragement[++h] = "</div>";
            fragement[++h] = "</div>";
            fragement[++h] = "</div>";
            $('body').append(fragement.join(''));
            return this;
        },
        __initDom__: function () {
            this.__$Dom__.$listbox = $('#' + this.__ComboboxC__.listboxId);
            this.__$Dom__.$input = $('#' + this.__ComboboxC__.inputId);
            this.__$Dom__.$popup = $('#' + this.__ComboboxC__.popupId);
            return this;
        },
        __load__: function () {
            this.__seSelectionItems__().__setSelectionEvent__();
            this.__$Dom__.$popup.hide();
        },
        setOptions: function (key, ops) {
            var self = this,
                clr = {
                    setStyle: self.__setSytle__.bind(this),
                    setItems: self.__setItems__.bind(this),
                    setSelectedItem: self.__setSelectedItem__.bind(this)
                };
            clr[key](ops);
        },
        __setSytle__: function (ops) {
            this.__$Dom__.$popup.css('width', ops.popupWidth)
                .css('height', ops.popupHeight)
                .css('max-width', ops.popupMaxWidth)
                .css('max-height', ops.popupMaxHeight)
            return this;
        },

        __setItems__: function (ops) {
            this.__ComboboxC__.items = ops.items;
            this.__seSelectionItems__()
                .__setSelectionEvent__()
                .__setSelectedItem__(ops.selectedItem);
        },
        __seSelectionItems__: function () {
            var tempItems = this.__ComboboxC__.items;
            var i = 0, len = tempItems.length, fragement = [];
            this.__$Dom__.$listbox.empty();
            for (; i < len; i++) {
                fragement.push("<div class=\"ui-combobox-selection-container\">");
                fragement.push("<div role='option' class=\"ui-combobox-selection\" id=ui-combobox-selection-select-option-" + i + ">");
                fragement.push(tempItems[i].name);
                fragement.push("</div>");
                fragement.push("</div>");
            }
            this.__$Dom__.$listbox.append(fragement.join(''));
            return this;
        },
        __setSelectedItem__: function (selectedItem) {
            var self = this,
                clr = {
                    object: function () {
                        return selectedItem.name;
                    },
                    string: function () {
                        return selectedItem;
                    },
                    undefined: function () {
                        return self.__ComboboxC__.items[0];
                    }
                }, selectedText = "";
            selectedText = clr[typeof selectedItem]();
            for (var i = 0; i < this.__ComboboxC__.items.length; i++) {
                if (this.__ComboboxC__.items[i].name == selectedText) {
                    this.__ComboboxC__.selectedIndex = i;
                }
            }
            this.__$Dom__.$selections.removeClass('ui-combobox-selection-selected');
            if (this.__ComboboxC__.selectedIndex != -1) {
                var inputValue = this.__ComboboxC__.items[this.__ComboboxC__.selectedIndex].name;
                this.__$Dom__.$input[0].value = inputValue;
                this.__$Dom__.$selections[this.__ComboboxC__.selectedIndex].classList.add('ui-combobox-selection-selected');
                this.__ComboboxC__.newValue = this.__ComboboxC__.items[this.__ComboboxC__.selectedIndex];
            } else {
                this.__$Dom__.$input[0].value = '';
                this.__$Dom__.$selections[0].classList.add('ui-combobox-selection-selected');
                this.__ComboboxC__.newValue = null;
            }
            this.__hide__();
            return this;
        },

        __bindEvent__: function () {
            var self = this;
            this.__$Dom__.$input.on('mousedown' + this.__eventNameSpave__, function (e) {
                self.__hideShow__();
            }).on('focus' + this.__eventNameSpave__, function (e) {
                self.__element__.addClass('ui-combobox-focused');
            }).on('blur' + this.__eventNameSpave__, function (e) {
                self.__element__.removeClass('ui-combobox-focused');
                self.__hide__();
            }).on('mouseover' + this.__eventNameSpave__, function () {
                self.__element__.addClass('ui-combobox-mouseover');
            }).on('mouseleave' + this.__eventNameSpave__, function () {
                self.__element__.removeClass('ui-combobox-mouseover');
            }).on('keyup', + this.__eventNameSpave__, this.__onInputkeyDown__.bind(this));

            this.__debounceHandler__ = this.__debounce__(this.__filterSelection__.bind(this));

            this.__$Dom__.$listbox.on('mousedown' + this.__eventNameSpave__, function (e) {
                e.stopPropagation();
                e.preventDefault();
            });
            $('#' + this.__ComboboxC__.dorpdownId).on('click' + this.__eventNameSpave__, function (e) {
                self.__hideShow__();
            });

        },

        __setSelectionEvent__: function () {
            var self = this;
            this.__$Dom__.$selections = $('#' + this.__ComboboxC__.listboxId + ' .ui-combobox-selection');
            this.__$Dom__.$selections.on('click' + this.__eventNameSpave__, function (e) {
                var text = e.currentTarget.textContent;
                self.__setSelectedItem__(text);
                $$.trigger("selectionChanged", self.__element__, $$.Event({
                    element: self.__element__,
                    oldValue: self.__ComboboxC__.oldValue,
                    newValue: self.__ComboboxC__.newValue
                }))
                self.__ComboboxC__.oldValue = self.__ComboboxC__.newValue;
            });
            return this;
        },

        __onInputkeyDown__: function (e) {
            var self = e.data,
                keyCode = e.which;
            this.__debounceHandler__(e.target.value);
        },

        __debounce__: function (fn) {
            var
                timer,
                self = this;
            return function (e) {
                clearTimeout(timer);
                timer = setTimeout(function () {
                    fn.apply(self, [e])
                }, self.__delay__);
            }
        },

        __filterSelection__: function (e) {
            console.log(e);
            var condition = this.__getCondition__();
            var i = 0,
                len = this.__ComboboxC__.items.length,
                items = this.__ComboboxC__.items;
            for (var i = 0; i < len; i++) {
                var name = this.__getInputValue__(items[i]);
                if (name.indexOf(condition) > -1) {
                    this.__filterSelectionResultIndex__.push(i);
                }
            };
            this.__updateFilteredSelections__();
            this.__filterSelectionResultIndex__.length = 0;
        },
        __getCondition__: function () {
            var value = '';
            value = this.__$Dom__.$input.val().toLowerCase();
            return value;
        },

        __getInputValue__: function (item) {
            return item['name'];
        },

        __updateFilteredSelections__: function () {
            var items = this.__ComboboxC__.items,
                i = 0,
                len = items.length;
            for (; i < len; i++) {
                if (this.__filterSelectionResultIndex__.includes(i)) {
                    $(this.__$Dom__.$listbox.children()[i]).show();
                } else {
                    $(this.__$Dom__.$listbox.children()[i]).hide();
                }
            }
            this.__show__();
        },

        __hideShow__: function () {
            this.__ComboboxC__.popupOpend = !this.__ComboboxC__.popupOpend;
            if (this.__ComboboxC__.popupOpend)
                this.__show__();
            else
                this.__hide__();
        },

        __hide__: function () {
            this.__ComboboxC__.popupOpend = false;
            this.__$Dom__.$popup.hide();
        },

        __show__: function () {
            this.__ComboboxC__.popupOpend = true;
            this.__$Dom__.$popup.show();
            this.__setPopupPosition__();
            this.__$Dom__.$selections.removeClass('ui-combobox-selection-selected');
            if (this.__filterSelectionResultIndex__.length == 0 && this.__$Dom__.$selections.length == this.__ComboboxC__.items.length) {
                if (this.__ComboboxC__.selectedIndex == -1)
                    $(this.__$Dom__.$selections[0]).addClass('ui-combobox-selection-selected');
                else
                    $(this.__$Dom__.$selections[this.__ComboboxC__.selectedIndex]).addClass('ui-combobox-selection-selected');
                return;
            }
            if (this.__filterSelectionResultIndex__.includes(this.__ComboboxC__.selectedIndex)) {
                $(this.__$Dom__.$selections[this.__ComboboxC__.selectedIndex]).addClass('ui-combobox-selection-selected');
                return;
            } else {
                $(this.__$Dom__.$selections[this.__filterSelectionResultIndex__[0]]).addClass('ui-combobox-selection-selected');
                return;
            }
            console.log('no select items.');
        },

        __setPopupPosition__: function () {
            var self = this;
            this.__$Dom__.$popup
                .css({ top: 0 })
                .position({
                    my: "left top",
                    at: "left bottom",
                    of: self.__element__,
                    collision: "flip"
                })
        },

        __extends__: function (ops, target) {
            for (var i in ops) {
                if (typeof ops[i] !== undefined) target[i] = ops[i];
            }
        }
    }

    /*
     loading UI
     */

    var Loading = function () {
        this._initId()
            ._init()
            ._createLoading()
            ._initMember();
    }

    Loading.prototype = {
        _init: function () {
            this._element = document.createElement('div');
            this._element.classList.add('ui-loading');
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
            var fragement = [], h = -1;
            fragement[++h] = "<div class=\"ui-backdrop\"></div>";
            return fragement.join('');
        },
        _createLoadingAnimation: function () {
            var fragement = [], h = -1;
            fragement[++h] = "<div class=\"ui-loading-dialog\">";
            fragement[++h] = "<div class=\"ui-loading-circle\">";
            fragement[++h] = "<span class=\"left\">";
            fragement[++h] = "<span class=\"anim\"></span>";
            fragement[++h] = "</span>";
            fragement[++h] = "<span class=\"right\">";
            fragement[++h] = "<span class=\"anim\"></span>";
            fragement[++h] = "</span>";
            fragement[++h] = "<span class=\"center\"></span>";
            fragement[++h] = "</div>";
            fragement[++h] = "</div>";
            return fragement.join('');
        },
        loading: function (isShow) {
            var self = this;
            var clr = {
                true: function () {
                    $('body').append(self._element);
                },
                false: function () {
                    self._element.remove();
                },
                undefined: function () {
                    throw new Error('arguments can not empty.')
                }
            }
            clr[isShow]();
        }
    }

    if (!loader) {
        var loader = new Loading();
    }
    $$.loading = function (isShow) {
        loader.loading(isShow);
    }

    var TabControl = function (ops) {
        this._ops = {
            items: ops.items || [],
            hashItems: {},
            selectedIndex: ops.selectedIndex || 0
        };
        this._element = $(ops.element);
        this._tabContainerId = "ui-tabcontrol-container-";
        this._oldValue = { selectedIndex: 0 };
        this._convertHashItems();
        this._init()
            ._initId()
            ._create()
            ._initMember()
            ._setTabContainer()
            ._setTabContent()
            ._bindEvent();
    }

    TabControl.prototype = {
        _convertHashItems: function () {
            var i = 0;
            for (; i < this._ops.items.length; i++) {
                this._ops.hashItems[this._ops.items[i].title] = {
                    selectedIndex: i,
                    selectedItem: this._ops.items[i]
                };
            }
        },
        _init: function () {
            this._element.addClass('ui-tabcontrol');
            return this;
        },

        _initId: function () {
            this._tabContainerId += uuid;
            return this;
        },

        _create: function () {
            this._createTab();
            return this;
        },

        _createTab: function () {
            var fragement = [],
                h = -1;
            fragement[++h] = "<div id= " + this._tabContainerId + " class=\"ui-tab-container\">";
            fragement[++h] = "</div>";
            this._element.prepend(fragement.join(''));
        },

        _initMember: function () {
            this.$container = $('#' + this._tabContainerId);
            this.$contents = $('.ui-tabcontrol-content').children();
            return this;
        },

        _setTabContainer: function () {
            var i = 0,
                items = this._ops.items,
                len = items.length;
            for (; i < len; i++) {
                var el = document.createElement('div');
                el.textContent = items[i].title;
                $(el).addClass('ui-tabcontrol-container-item');
                if (this._ops.selectedIndex == i) $(el).addClass('active');
                el.onclick = this._tabClickHandler.bind(this);
                this.$container.append(el);
            }
            return this;
        },

        _resetTabContainer: function () {
            var $targets = this.$container.children();
            $targets.removeClass('active');
            $($targets[this._ops.selectedIndex]).addClass('active');
        },

        _bindEvent: function () {
            return this;
        },

        _tabClickHandler: function (e) {
            var self = this,
                newValue = this._ops.hashItems[e.target.textContent];
            $$.trigger("tabHandleChanged", self._element, $$.Event({
                element: self._element,
                oldValue: this._oldValue,
                newValue: newValue
            }));
            this._ops.selectedIndex = newValue.selectedIndex;
            this._oldValue = newValue;
            this._resetTabContainer();
            this._setTabContent();
        },

        _setTabContent: function () {
            this.$contents.addClass('ui-tabcontrol-content-item');
            var i = 0,
                items = this._ops.items,
                len = items.length;
            for (; i < len; i++) {
                if (i !== this._ops.selectedIndex)
                    $(this.$contents[i]).css('display', 'none');
                else
                    $(this.$contents[i]).css('display', '');
            }
            return this;
        },

        setOptions: function (ops) {
            this._ops.items = ops.items;
            this._ops.selectedIndex = ops.selectedIndex || this._oldValue.selectedIndex;
            this._convertHashItems();
            this._removeTabTabContainer()
                ._setTabContainer()
                ._setTabContent();
        },
        _removeTabTabContainer: function () {
            this.$container.empty();
            return this;
        }
    }

    var Pager = function (ops) {
        this._ops = {
            count: ops.count || 0,
            selectedIndex: ops.selectedIndex || 1,
            size: ops.size || 0
        };
        this._element = ops.element || document.getElementsByTagName('body');
        this._init()
            ._create()
            ._initMember()
            ._createPagerBtn()
            ._initEventBind()
        this._inputValue = 1;
    };

    Pager.prototype = {
        _initId: function () {
            uuid++;
            this._pagerId = "ui-pager-" + uuid;
        },
        _init: function () {
            this._element.id = this._pagerId;
            $(this._element).addClass('ui-pager-container')
            return this;
        },

        _create: function () {
            var fragement = [], h = -1;
            fragement[++h] = "<div class=\"ui-pager-trangleBtn\">";
            fragement[++h] = "<button class=\"ui-pager-triangle-left-as\"></button>";
            fragement[++h] = "</div>";

            fragement[++h] = "<div class=\"pager-content\">";
            fragement[++h] = "</div>";

            fragement[++h] = "<div class=\"ui-pager-trangleBtn\">";
            fragement[++h] = "<button class=\"ui-pager-triangle-right-as\"></button>";
            fragement[++h] = "</div>";

            fragement[++h] = "<div class=\"ui-pager-go\">";
            fragement[++h] = "<input type=\"text\" class=\"ui-pager-go-input\" value=\"1\" />";
            fragement[++h] = "<button class=\"ui-pager-go-btn\">GO</button>";
            fragement[++h] = "</div>";
            $(this._element).append(fragement.join(''));
            return this;
        },

        _createPagerBtn: function () {
            this.$pagerElBtnGroup.empty();
            var
                fragement = [], h = -1;
            if (this._ops.count <= 5) {
                for (var i = 0; i < this._ops.count; i++) {
                    if (i + 1 == this._ops.selectedIndex)
                        fragement[++h] = "<button class=\"pager-content-btn active\" value=" + (i + 1) + ">";
                    else
                        fragement[++h] = "<button class=\"pager-content-btn\" value=" + (i + 1) + ">";
                    fragement[++h] = i + 1;
                    fragement[++h] = "</button>";
                }
                this.$pagerElBtnGroup.append(fragement.join(''));
            } else {
                for (var i = 0; i < this._ops.count; i++) {
                    if (this._ops.selectedIndex <= 4 || this._ops.selectedIndex == this._ops.count) {
                        if (i + 1 <= 4) {
                            if (i + 1 == this._ops.selectedIndex)
                                fragement[++h] = "<button class=\"pager-content-btn active\" value=" + (i + 1) + "> " + (i + 1) + "</button>";
                            else
                                fragement[++h] = "<button class=\"pager-content-btn\" value=" + (i + 1) + ">" + (i + 1) + "</button>";
                        } else if (i + 1 == this._ops.count) {
                            var m = h + 1;
                            if (i + 1 == this._ops.selectedIndex)
                                fragement[++m] = "<button class=\"pager-content-btn active\" value=" + (i + 1) + "> " + (i + 1) + "</button>";
                            else
                                fragement[++m] = "<button class=\"pager-content-btn\" value=" + (i + 1) + ">" + (i + 1) + "</button>";
                        } else {
                            fragement[h + 1] = "<button class=\"button-bald\" disabled>...</button>";
                        }
                    } else if (this._ops.selectedIndex == 1 || this._ops.selectedIndex >= this._ops.count - 3) {
                        if (i + 1 == 1) {
                            if (i + 1 == this._ops.selectedIndex)
                                fragement[++h] = "<button class=\"pager-content-btn active\" value=" + (i + 1) + "> " + (i + 1) + "</button>";
                            else
                                fragement[++h] = "<button class=\"pager-content-btn\" value=" + (i + 1) + ">" + (i + 1) + "</button>";
                        } else if (i + 1 >= this._ops.count - 3) {
                            var m = h + 1;
                            if (i + 1 == this._ops.selectedIndex)
                                fragement[++m] = "<button class=\"pager-content-btn active\" value=" + (i + 1) + "> " + (i + 1) + "</button>";
                            else
                                fragement[++m] = "<button class=\"pager-content-btn\" value=" + (i + 1) + ">" + (i + 1) + "</button>";
                            h = m;
                        } else {
                            fragement[h + 1] = "<button class=\"button-bald\" disabled>...</button>";
                        }
                    } else if (this._ops.selectedIndex > 4 && this._ops.selectedIndex < this._ops.count - 3) {
                        if (i + 1 == 1) {
                            if (i + 1 == this._ops.selectedIndex)
                                fragement[++h] = "<button class=\"pager-content-btn active\" value=" + (i + 1) + "> " + (i + 1) + "</button>";
                            else
                                fragement[++h] = "<button class=\"pager-content-btn\" value=" + (i + 1) + "> " + (i + 1) + "</button>";
                        } else if (i + 1 == this._ops.selectedIndex - 1 || i + 1 == this._ops.selectedIndex || i + 1 == this._ops.selectedIndex + 1) {
                            var m = h + 1;
                            if (i + 1 == this._ops.selectedIndex)
                                fragement[++m] = "<button class=\"pager-content-btn active\" value=" + (i + 1) + "> " + (i + 1) + "</button>";
                            else
                                fragement[++m] = "<button class=\"pager-content-btn\" value=" + (i + 1) + "> " + (i + 1) + "</button>";
                            h = m;
                        } else if (i + 1 == this._ops.count) {
                            var m = h + 1;
                            if (i + 1 == this._ops.selectedIndex)
                                fragement[++m] = "<button class=\"pager-content-btn active\" value=" + (i + 1) + "> " + (i + 1) + "</button>";
                            else
                                fragement[++m] = "<button class=\"pager-content-btn\" value=" + (i + 1) + "> " + (i + 1) + "</button>";
                            h = m;
                        } else {
                            fragement[h + 1] = "<button class=\"button-bald\" disabled>...</button>";
                        }
                    }
                }
                this.$pagerElBtnGroup.append(fragement.join(''));
            }
            return this;
        },

        _initMember: function () {
            this.$leftBtn = $("#" + this._pagerId + " .ui-pager-triangle-left-as");
            this.$rightBtn = $("#" + this._pagerId + " .ui-pager-triangle-right-as");
            this.$goBtn = $("#" + this._pagerId + " .ui-pager-go-btn");
            this.$pagerElBtnGroup = $("#" + this._pagerId + " .pager-content");
            this.$input = $("#" + this._pagerId + " .ui-pager-go-input");
            return this;
        },

        _initEventBind() {
            this.$leftBtn.on('click', this._leftBtnClick.bind(this));
            this.$rightBtn.on('click', this._rightBtnClick.bind(this));
            this.$goBtn.on('click', this._goBtnClick.bind(this));
            this.$pagerElBtnGroup.on('click', this._pageBtnClick.bind(this));
        },

        _leftBtnClick: function () {
            if (this._ops.selectedIndex != 1)
                this._ops.selectedIndex -= 1;
            else
                return;
            this._setSelectIndex(this._ops.selectedIndex);
        },

        _rightBtnClick: function () {
            if (this._ops.selectedIndex != this._ops.count)
                this._ops.selectedIndex += 1;
            else
                return;
            this._setSelectIndex(this._ops.selectedIndex);
        },

        _pageBtnClick: function (e) {
            var
                selectedIndex = parseInt(e.target.value);
            this._setSelectIndex(selectedIndex);
        },

        _goBtnClick: function () {
            var value = this.$input.val();
            if (value == '') throw new Error('Value i error.');
            var targetIndex = parseInt(value);
            this._setSelectIndex(targetIndex);
        },

        _setSelectIndex: function (index) {
            var selectedIndex = index || 1;
            var $element = $(this._element);
            $$.trigger("selectedPageChanged", $element, $$.Event({
                element: $element,
                oldValue: null,
                newValue: selectedIndex
            }));
            this._ops.selectedIndex = selectedIndex;
            this._createPagerBtn();
        },

        //_resetPager: function () {
        //    $('.pager-content-btn').removeClass('active');
        //    var current = $('.pager-content-btn')[this._ops.selectedIndex - 1];
        //    $(current).addClass('active');
        //}
    };

    var MessageBar = function (ops) {
        this._ops = {
            msg: ops.msg || 'Message is empty.',
            type: ops.type || 'success',
            show: ops.show || false
        };
        this._element = ops.element;
        this._initId()
            ._init()
            ._initMember()
            ._bindEvent()
            ._setMessage();
    }

    MessageBar.prototype = {
        _initId: function () {
            ++uuid;
            this._messageId = "ui-message-id-" + uuid;
            this._element.id = this._messageId;
            $(this._element).addClass('ui-message');
            return this;
        },
        _init: function () {
            var fragement = [], h = -1;
            fragement[++h] = "<div class=\"icon\">";
            fragement[++h] = "</div>";
            fragement[++h] = "<div class=\"ui-message-content\">";
            fragement[++h] = this._ops.msg;
            fragement[++h] = "</div>";
            fragement[++h] = "<div class=\"ui-message-btn\">";
            fragement[++h] = "</div>";
            $(this._element).append(fragement.join(''));
            return this;
        },

        _initMember: function () {
            this.$btn = $('#' + this._messageId + " .ui-message-btn");
            this.$content = $('#' + this._messageId + " .ui-message-content");
            this.$icon = $('#' + this._messageId + " .icon");
            return this;
        },

        _bindEvent: function () {
            this.$btn.on('click', this._messageBtnClick.bind(this));
            return this;
        },

        _setMessage: function () {
            var self = this;
            var clr_display = {
                false: function () {
                    $(self._element).css('display', 'none');
                },
                true: function () {
                    $(self._element).css('display', '');
                }
            };
            clr_display[self._ops.show]();
            $(self._element).removeClass('success')
                .removeClass('error')
                .removeClass('info')
                .removeClass('warn');
            var clr_type = {
                success: function () {
                    $(self._element).addClass('success');
                    self.$icon.removeClass('fi-page-round-infor-a info');
                    self.$icon.removeClass('fi-page-round-error-a error');
                    self.$icon.removeClass('fi-page-circle-warning-a warn');
                    self.$icon.addClass('fi-page-round-finish-a success');
                },
                error: function () {
                    $(self._element).addClass('error');
                    self.$icon.removeClass('fi-page-round-finish-a success');
                    self.$icon.removeClass('fi-page-round-infor-a info');
                    self.$icon.removeClass('fi-page-circle-warning-a warn');
                    self.$icon.addClass('fi-page-round-error-a error');
                },
                info: function () {
                    $(self._element).addClass('info');
                    self.$icon.removeClass('fi-page-round-finish-a success');
                    self.$icon.removeClass('fi-page-round-error-a error');
                    self.$icon.removeClass('fi-page-circle-warning-a warn');
                    self.$icon.addClass('fi-page-round-infor-a info info');
                },
                warn: function () {
                    $(self._element).addClass('warn');
                    self.$icon.removeClass('fi-page-round-finish-a success');
                    self.$icon.removeClass('fi-page-round-infor-a info');
                    self.$icon.removeClass('fi-page-round-error-a error');
                    self.$icon.addClass('fi-page-circle-warning-a warn');
                }
            }
            clr_type[self._ops.type]();
            this.$content.text(self._ops.msg);
            return self;
        },

        _messageBtnClick: function () {
            $(this._element).css('display', 'none');
        },

        setOptions: function (ops) {
            this._ops.type = ops.type;
            this._ops.msg = ops.msg;
            this._ops.show = ops.show;
            this._setMessage();
        }

    }

    var PeoplePicker = function (ops) {
        this._ops = {
            items: ops.items,
            selectedItem: ops.selectedItem,
            hashItems: {},
            filterSelectionResultIndex: [],
            resultValue: []
        };
        this._ops.hashItems = this._convetToHash();
        this._element = ops.element;
        this._initId()
            ._init()
            ._create()
            ._initMember()
            ._bindEvent();
    }
    PeoplePicker.prototype = {
        _convetToHash: function () {
            var hash = {},
                items = this._ops.items,
                len = this._ops.items.length;
            for (var i = 0; i < items.length; i++) {
                if (!hash[items[i].id]) {
                    hash[items[i].id] = items[i].name;
                }
            }
            return hash;
        },
        _initId: function () {
            uuid++;
            this._peoplePickerId = "ui-people-picker-" + uuid;
            this._peoplePickerPopupId = "ui-people-picker-popup-" + uuid;
            return this;
        },
        _init: function () {
            $(this._element).addClass('ui-people-picker');
            this._element.id = this._peoplePickerId;
            return this;
        },
        _create: function () {
            var _input = this._createInput();
            $(this._element).append(_input);
            this._createPopup();
            return this;
        },
        _createInput: function () {
            var fragement = [], h = -1;
            fragement[++h] = "<div class=\"ui-people-picker-container\">";
            fragement[++h] = "<input type=\"text\" class=\"ui-people-picker-container-input\" />";
            fragement[++h] = "<div class=\"ui-people-picker-container-icon fi-page-user-a\">";
            fragement[++h] = "</div>";
            return fragement.join('');
        },
        _createPopup: function () {
            var fragement = [], h = -1;
            fragement[++h] = "<div id=" + this._peoplePickerPopupId + " class=\"ui-people-picker-dropdown\" style=\"display:none\">";
            for (var i = 0; i < this._ops.items.length; i++) {
                fragement[++h] = "<div class=\"ui-people-picker-dropdown-selection-container\">"
                fragement[++h] = "<div class=\"ui-people-picker-dropdown-selection-item\">" + this._ops.items[i].name + "</div>";
                fragement[++h] = "</div>";
            }
            fragement[++h] = "</div>";
            $('body').append(fragement.join(''));
            return this;
        },

        _initMember: function () {
            this.$container = $('#' + this._peoplePickerId + " .ui-people-picker-container");
            this.$input = $('#' + this._peoplePickerId + " .ui-people-picker-container-input");
            this.$popup = $('#' + this._peoplePickerPopupId);
            this.$dropdown_items = $('#' + this._peoplePickerPopupId + ' .ui-people-picker-dropdown-selection-item');
            this.$icon = $('#' + this._peoplePickerId + " .ui-people-picker-container-icon");
            return this;
        },

        _bindEvent: function () {
            this.$input
                //.on('focus', this._inputFocusHandler.bind(this))
                .on('blur', this._inputBlurHandler.bind(this))
                .on('keyup', this._inputKeyupHandler.bind(this))
            this.$dropdown_items.on('click', this._downdropitemsClickHandler.bind(this));
            this.$icon.on('click', this._iconClickHandler.bind(this));
        },

        _iconClickHandler: function () {
            var $element = $(this._element);
            $$.trigger("openPopup", $element, $$.Event({
                element: $element,
                oldValue: null,
                newValue: null
            }));
        },

        _inputFocusHandler: function () {
            this._show();
        },

        _show: function () {
            this.$popup.show();
            this._setPopupPosition();
        },

        _hide: function () {
            this.$popup.hide();
        },
        _inputBlurHandler: function () {
            // this._hide();
        },

        _inputKeyupHandler: function (e) {
            var condition = this._getCondition();
            var i = 0, items = this._ops.items, len = items.length;
            for (; i < len; i++) {
                var text = items[i].name;
                if (text.indexOf(condition) > -1) {
                    this._ops.filterSelectionResultIndex.push(i);
                }
            }
            this._filterSelection();
            switch (e.which) {
                case 8:
                    this._deleteResult();
                    break;
            }
        },
        _filterSelection: function () {
            var items = this._ops.items,
                len = items.length,
                i = 0;
            for (; i < len; i++) {
                if (this._ops.filterSelectionResultIndex.includes(i)) {
                    $(this.$dropdown_items[i]).show();
                } else {
                    $(this.$dropdown_items[i]).hide();
                }
            }
            this._ops.filterSelectionResultIndex.length = 0;
            this._show();
        },
        _getCondition: function () {
            return this.$input.val().toLowerCase();
        },
        _setPopupPosition: function () {
            var self = this;
            this.$popup
                .css({ top: 0 })
                .position({
                    my: "left top",
                    at: "left bottom",
                    of: self._element,
                    collision: "flip"
                })
        },

        _downdropitemsClickHandler: function (e) {
            var target = this._ops.items.filter(i => i.name == e.target.innerText)[0];
            this._addResult(target);
            this._hide();
        },
        _addResult: function (target) {
            this._ops.resultValue.unshift(target);
            this._setSelectedItemsToInput();
            var self = this;
            $$.Event({
                element: self._element,
                oldValue: null,
                newValue: self._ops.resultValue
            });
            //this._filterSelection();
            this.$input.val("");
        },
        _deleteResult: function () {
            this._ops.resultValue.splice(this._ops.resultValue.length - 1, 1);
            this._setSelectedItemsToInput();
            var self = this;
            $$.Event({
                element: self._element,
                oldValue: null,
                newValue: self._ops.resultValue
            });
        },
        _setSelectedItemsToInput: function () {
            $('#' + this._peoplePickerId + ' .selectedItem').remove();
            var fragement = [], h = -1, items = this._ops.resultValue, len = items.length;
            for (var i = 0; i < len; i++) {
                fragement[++h] = "<div class=\"selectedItem\">";
                fragement[++h] = items[i].name;
                fragement[++h] = "<div class=\"selectedItem-icon\"></div>";
                fragement[++h] = "</div>";
            }
            this.$container.prepend(fragement.join(''));
            this._bindEventForSelectedItem();
        },

        _bindEventForSelectedItem: function () {

        },

        setOptions: function () {

        }
    }

    var Table = function (ops) {
        this._ops = {
            columns: ops.columns,
            items: ops.items
        }
        this._element = ops.element;
        this._initId()
            ._init()
            ._create()
            ._initMember()
    };

    Table.prototype = {
        _initId: function () {
            ++uuid;
            this.tableId = "ui-table-" + uuid;
            return this;
        },
        _init: function () {
            $(this._element).addClass('ui-table');
            this._element.id = this.tableId;
            return this;
        },
        _initMember: function () {
            return this;
        },
        _create: function () {
            this._createTable()
            return this;
        },
        _createTable: function () {
            var fragement = [], h = -1;
            // fragement[++h] = "<table class=\"ui-table\">";
            // fragement[++h] = this._createHeader();
            // fragement[++h] = this._createBody();
            // fragement[++h] = "</table>";
            $(this._element).append(fragement.join(''));
        },
        // _createHeader: function () {
        //     var fragement = [], h = -1;
        //     fragement[++h] = "<thead>";
        //     fragement[++h] = "<tr>";
        //     for (var i = 0; i < this._ops.columns.length; i++) {
        //         fragement[++h] = "<th style=\"width: " + this._ops.columns[i].width + " \">";
        //         fragement[++h] = this._ops.columns[i].name
        //         fragement[++h] = "</th>";
        //     }
        //     fragement[++h] = "</tr>";
        //     fragement[++h] = "</thead>";
        //     return fragement.join('');
        // },
        // _createBody: function () {
        //     var fragement = [], h = -1;
        //     fragement[++h] = "<tbody>";
        //     fragement[++h] = "<tr>";
        //     fragement[++h] = "</tr>";
        //     fragement[++h] = "</tbody>";
        //     return fragement.join('');
        // }
        setOptions: function (ops) {

        }
    };

    var TipConform = function () {
        this._initId()
            ._init()
    };

    TipConform.prototype = {
        _init: function () {
            return this;
        },

        _initId: function () {
            uuid++;
            this.tipConformId = "ui-tip-conform-" + uuid;
            this.tipConformOuterId = "ui-tip-conform" + uuid;
            return this;
        },

        // setConform: function () {

        // },

        conform: function (ops) {
            if (typeof ops.status == undefined) throw new Error('status can not be empty.')
            var self = this;
            var clr = {
                show: function (ops) {
                    self._render(ops);
                },
                hide: function () {
                    self._destory();
                }
            }
            clr[ops.status](ops);
        },

        _render: function (ops) {
            var fragement = [], h = -1;
            fragement[++h] = "<div id=" + this.tipConformOuterId + " class=\"ui-backdrop-outer\">";
            fragement[++h] = "<div class=\"ui-backdrop\"></div>";
            fragement[++h] = "<div id=" + this.tipConformId + " class=\"ui-tip-conform\" >";
            fragement[++h] = "<div class=\"ui-tip-conform-header\">";
            fragement[++h] = "Tip Conform";
            fragement[++h] = "</div>";
            fragement[++h] = "<div class=\"ui-tip-conform-contianer\">"
            fragement[++h] = ops.message || 'message is empty.';
            fragement[++h] = "</div>";
            fragement[++h] = "</div>";
            fragement[++h] = "</div>";
            $('body').append(fragement.join(''));
            this._initMember()
                ._createBtn()
                ._bindEvent();
            return this;
        },

        _initMember: function () {
            this.$tipConform = $('#' + this.tipConformId);
            this.$tipConformOuter = $('#' + this.tipConformOuterId);
            this.$header = $('#' + this.tipConformId + " .ui-tip-conform-header");
            return this;
        },

        _createBtn: function () {
            var fragement = [], h = -1;
            fragement[++h] = "<span class=\"icon fi-page-remove-a\"></span>";
            this.$header.append(fragement.join(''));
            this._setBtn();
            return this;
        },

        _setBtn: function () {
            this.$btn = $('#' + this.tipConformId + " .icon");
        },

        _bindEvent: function () {
            var self = this;
            this.$btn.on('click', function () {
                self._destory();
            })
        },

        _destory: function () {
            this.$tipConformOuter.length != 0 && this.$tipConformOuter.remove();
        }
    }

    var tipConform = new TipConform();

    $$.conform = function (ops) {
        tipConform.conform(ops)
    };

    var TextArea = function (ops) {
        this._element = ops.element || document.getElementsByTagName('body');
        this.$element = $(this._element);
        this._ops = {
            items: ops.items
        };
        this._initId()
            ._init()
            ._create()
            ._initMember()
            ._bindEvent();
    };

    TextArea.prototype = {
        _initId: function () {
            uuid++;
            this.textAreaId = "ui-textarea-" + uuid;
            return this;
        },

        _init: function () {
            this._element.id = this.textAreaId;
            return this;
        },

        _create: function () {
            var items = this._ops.items,
                len = items.length,
                fragement = [],
                h = -1;
            for (var i = 0; i < len; i++) {
                fragement[++h] = "<div class=\"ui-textarea-item\">";
                fragement[++h] = items[i].name;
                fragement[++h] = "<span class=\"icon\"></span>"
                fragement[++h] = "</div>";
            }
            this.$element.append(fragement.join(''));
            return this;
        },

        _initMember: function () {
            this.$item = $('#' + this.textAreaId + ' .ui-textarea-item');
            return this;
        },

        _bindEvent: function () {
            this.$item.on('click', this._itemClickHandler.bind(this));
        },

        _itemClickHandler: function () {

        }
    };

    return {
        Dialog: __Dialog__,
        Combobox: __Combobox__,
        TabControl: TabControl,
        Pager: Pager,
        MessageBar: MessageBar,
        PeoplePicker: PeoplePicker,
        Table: Table,
        TextArea: TextArea
    };
}, "aui");