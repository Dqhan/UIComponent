"use strict";
(function (global,
    $,
    $$,
    factory,
    plugin
) {
    if (typeof global[plugin] !== "Object") global[plugin] = {};
    global[plugin] = $.extend(false, global[plugin], factory.call(global, $, $$));
})(window,
    $,
    $$,
    function ($, $$) {
        var uuid = -1;
        var __Combobox__ = function (ops) {
            this.__eventNameSpave__ = ".combobox-event";
            this.__ComboboxC__ = {
                root: $("body"),
                inputId: "ui-combobox-input-",
                dorpdownId: "ui-combobox-dropdown-",
                popupId: "ui-combobox-popup-",
                placeHolderId: "ui-combobox-placeholder-",
                listboxId: "ui-combobox-listboxId-",
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
            this.__initId__()
                .__init__()
                .__load__();
        };

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
                this.__element__
                    .css("width", this.__ComboboxC__.width + "px")
                    .css("height", this.__ComboboxC__.height + "px")
                    .addClass("ui-combobox");
                this.__createCombobox__()
                    .__createDropDown__()
                    .__createPopup__()
                    .__initDom__()
                    .__bindEvent__();
                return this;
            },
            __createCombobox__: function () {
                var h = -1,
                    fragement = [];
                fragement[++h] =
                    "<input id='" +
                    this.__ComboboxC__.inputId +
                    '\' class="ui-combobox-input" />';
                fragement[++h] = '<div class="ui-combobox-placeholder">';
                fragement[++h] =
                    "<div id='>" + this.__ComboboxC__.placeHolderId + "<' /div>";
                fragement[++h] = "</div>";
                this.__element__.append(fragement.join(""));
                return this;
            },
            __createDropDown__: function () {
                var h = -1,
                    fragement = [];
                fragement[++h] =
                    "<div id=" +
                    this.__ComboboxC__.dorpdownId +
                    ' class="ui-combobox-dropdown-container">';
                fragement[++h] = '<div class="ui-dorpdown-icon"></div>';
                fragement[++h] = "</div>";
                this.__element__.append(fragement.join(""));
                return this;
            },
            __createPopup__: function () {
                var h = -1,
                    fragement = [];
                fragement[++h] =
                    '<div class="ui-combobox-popup" id=' +
                    this.__ComboboxC__.popupId +
                    ">";
                fragement[++h] = '<div class="ui-combobox-listbox">';
                fragement[++h] =
                    '<div class="ui-combobox-listbox-container" id=' +
                    this.__ComboboxC__.listboxId +
                    ">";
                fragement[++h] = "</div>";
                fragement[++h] = "</div>";
                fragement[++h] = "</div>";
                $("body").append(fragement.join(""));
                return this;
            },
            __initDom__: function () {
                this.__$Dom__.$listbox = $("#" + this.__ComboboxC__.listboxId);
                this.__$Dom__.$input = $("#" + this.__ComboboxC__.inputId);
                this.__$Dom__.$popup = $("#" + this.__ComboboxC__.popupId);
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
                this.__$Dom__.$popup
                    .css("width", ops.popupWidth)
                    .css("height", ops.popupHeight)
                    .css("max-width", ops.popupMaxWidth)
                    .css("max-height", ops.popupMaxHeight);
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
                var i = 0,
                    len = tempItems.length,
                    fragement = [];
                this.__$Dom__.$listbox.empty();
                for (; i < len; i++) {
                    fragement.push('<div class="ui-combobox-selection-container">');
                    fragement.push(
                        "<div role='option' class=\"ui-combobox-selection\" id=ui-combobox-selection-select-option-" +
                        i +
                        ">"
                    );
                    fragement.push(tempItems[i].name);
                    fragement.push("</div>");
                    fragement.push("</div>");
                }
                this.__$Dom__.$listbox.append(fragement.join(""));
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
                    },
                    selectedText = "";
                selectedText = clr[typeof selectedItem]();
                for (var i = 0; i < this.__ComboboxC__.items.length; i++) {
                    if (this.__ComboboxC__.items[i].name == selectedText) {
                        this.__ComboboxC__.selectedIndex = i;
                    }
                }
                this.__$Dom__.$selections.removeClass("ui-combobox-selection-selected");
                if (this.__ComboboxC__.selectedIndex != -1) {
                    var inputValue = this.__ComboboxC__.items[
                        this.__ComboboxC__.selectedIndex
                    ].name;
                    this.__$Dom__.$input[0].value = inputValue;
                    this.__$Dom__.$selections[
                        this.__ComboboxC__.selectedIndex
                    ].classList.add("ui-combobox-selection-selected");
                    this.__ComboboxC__.newValue = this.__ComboboxC__.items[
                        this.__ComboboxC__.selectedIndex
                    ];
                } else {
                    this.__$Dom__.$input[0].value = "";
                    this.__$Dom__.$selections[0].classList.add(
                        "ui-combobox-selection-selected"
                    );
                    this.__ComboboxC__.newValue = null;
                }
                this.__hide__();
                return this;
            },

            __bindEvent__: function () {
                var self = this;
                this.__$Dom__.$input
                    .on("mousedown" + this.__eventNameSpave__, function (e) {
                        self.__hideShow__();
                    })
                    .on("focus" + this.__eventNameSpave__, function (e) {
                        self.__element__.addClass("ui-combobox-focused");
                    })
                    .on("blur" + this.__eventNameSpave__, function (e) {
                        self.__element__.removeClass("ui-combobox-focused");
                        self.__hide__();
                    })
                    .on("mouseover" + this.__eventNameSpave__, function () {
                        self.__element__.addClass("ui-combobox-mouseover");
                    })
                    .on("mouseleave" + this.__eventNameSpave__, function () {
                        self.__element__.removeClass("ui-combobox-mouseover");
                    })
                    .on(
                        "keyup",
                        +this.__eventNameSpave__,
                        this.__onInputkeyDown__.bind(this)
                    );

                this.__debounceHandler__ = this.__debounce__(
                    this.__filterSelection__.bind(this)
                );

                this.__$Dom__.$listbox.on(
                    "mousedown" + this.__eventNameSpave__,
                    function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                );
                $("#" + this.__ComboboxC__.dorpdownId).on(
                    "click" + this.__eventNameSpave__,
                    function (e) {
                        self.__hideShow__();
                    }
                );
            },

            __setSelectionEvent__: function () {
                var self = this;
                this.__$Dom__.$selections = $(
                    "#" + this.__ComboboxC__.listboxId + " .ui-combobox-selection"
                );
                this.__$Dom__.$selections.on(
                    "click" + this.__eventNameSpave__,
                    function (e) {
                        var text = e.currentTarget.textContent;
                        self.__setSelectedItem__(text);
                        $$.trigger(
                            "selectionChanged",
                            self.__element__,
                            $$.Event({
                                element: self.__element__,
                                oldValue: self.__ComboboxC__.oldValue,
                                newValue: self.__ComboboxC__.newValue
                            })
                        );
                        self.__ComboboxC__.oldValue = self.__ComboboxC__.newValue;
                    }
                );
                return this;
            },

            __onInputkeyDown__: function (e) {
                var self = e.data,
                    keyCode = e.which;
                this.__debounceHandler__(e.target.value);
            },

            __debounce__: function (fn) {
                var timer,
                    self = this;
                return function (e) {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        fn.apply(self, [e]);
                    }, self.__delay__);
                };
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
                }
                this.__updateFilteredSelections__();
                this.__filterSelectionResultIndex__.length = 0;
            },
            __getCondition__: function () {
                var value = "";
                value = this.__$Dom__.$input.val().toLowerCase();
                return value;
            },

            __getInputValue__: function (item) {
                return item["name"];
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
                if (this.__ComboboxC__.popupOpend) this.__show__();
                else this.__hide__();
            },

            __hide__: function () {
                this.__ComboboxC__.popupOpend = false;
                this.__$Dom__.$popup.hide();
            },

            __show__: function () {
                this.__ComboboxC__.popupOpend = true;
                this.__$Dom__.$popup.show();
                this.__setPopupPosition__();
                this.__$Dom__.$selections.removeClass("ui-combobox-selection-selected");
                if (
                    this.__filterSelectionResultIndex__.length == 0 &&
                    this.__$Dom__.$selections.length == this.__ComboboxC__.items.length
                ) {
                    if (this.__ComboboxC__.selectedIndex == -1)
                        $(this.__$Dom__.$selections[0]).addClass(
                            "ui-combobox-selection-selected"
                        );
                    else
                        $(
                            this.__$Dom__.$selections[this.__ComboboxC__.selectedIndex]
                        ).addClass("ui-combobox-selection-selected");
                    return;
                }
                if (
                    this.__filterSelectionResultIndex__.includes(
                        this.__ComboboxC__.selectedIndex
                    )
                ) {
                    $(
                        this.__$Dom__.$selections[this.__ComboboxC__.selectedIndex]
                    ).addClass("ui-combobox-selection-selected");
                    return;
                } else {
                    $(
                        this.__$Dom__.$selections[this.__filterSelectionResultIndex__[0]]
                    ).addClass("ui-combobox-selection-selected");
                    return;
                }
                console.log("no select items.");
            },

            __setPopupPosition__: function () {
                var self = this;
                this.__$Dom__.$popup.css({ top: 0 }).position({
                    my: "left top",
                    at: "left bottom",
                    of: self.__element__,
                    collision: "flip"
                });
            },

            __extends__: function (ops, target) {
                for (var i in ops) {
                    if (typeof ops[i] !== undefined) target[i] = ops[i];
                }
            }
        };
        return {
            Combobox: __Combobox__
        };
    },
    "ui");