"use strict";
; (function (global, $, factory, plug) {
    global[plug] = factory.call(global, $);
})(window, $, function ($) {
    var __Banner__ = function (ops) {
        this.__BannerC__ = {
            currentIndex: 0,
        };
        this.timer = null;
        this.banner0 = null;
        this.banner1 = null;
        this.banner2 = null;
        this.bannerContent = null;
        this.elmentDuration = 1 / 3 * 100;
        this.extend(ops);
    };
    __Banner__.prototype = {
        init: function () {
            this.dom = this.__BannerC__.dom;
            this.dom.classList.add('banner');
        },
        render: function () {
            var fragement = [];
            fragement.push("<ol class=\"banner-indicators\">");
            fragement.push("<li class=\"banner-indicators-item active\" href='javascript:void(0);' tabIndex=\"0\" '></li>");
            fragement.push("<li class=\"banner-indicators-item\" href='javascript:void(0);' tabIndex=\"1\" '></li>");
            fragement.push("<li class=\"banner-indicators-item\" href='javascript:void(0);' tabIndex=\"2\" '></li>");
            fragement.push("</ol>");
            fragement.push("<div class='banner-inner'>");
            fragement.push("<div class='banner-content'>");
            fragement.push("<div class='banner-item'><div class='banner-item-inner'><p class='title'>Test1</p><p class='description'>Test1</p></div></div>");
            fragement.push("<div class='banner-item'><div class='banner-item-inner'><p class='title'>Test2</p><p class='description'>Test2</p></div></div>");
            fragement.push("<div class='banner-item'><div class='banner-item-inner'><p class='title'>Test3</p><p class='description'>Test3</p></div></div>");
            this.dom.innerHTML = fragement.join('');
            this.__bind__().__run__();
        },

        __run__: function () {
            var self = this,
                elements = document.getElementsByClassName('banner-item');
            this.banner0 = elements[0];
            this.banner1 = elements[1];
            this.banner2 = elements[2];
            this.bannerContent = document.getElementsByClassName('banner-content')[0];
            this.bannerContent.addEventListener('transitionend', this.__transitionEnd__.bind(this));
            setTimeout(function () { self.banner2.children[0].classList.add('active') }, 300);
            this.timer = setInterval(this.__bannerCarousel__.bind(this), 6000);
        },

        __transitionEnd__: function () {
            switch (this.__BannerC__.currentIndex) {
                case 0:
                    this.banner2.children[0].classList.add('active');
                    break;
                case 1:
                    this.banner1.children[0].classList.add('active');
                    break;
                case 2:
                    this.banner0.children[0].classList.add('active');
                    break;
            }
        },

        extend: function (ops) {
            this.__BannerC__.dom = ops.dom;
        },

        __bind__: function () {
            var self = this, el = document.getElementsByClassName('banner-indicators-item'), i = 0, len = el.length;
            for (; i < len; i++) {
                el[i].addEventListener('click', function (e) {
                    var targetIndex = e.target.tabIndex;
                    self.__BannerC__.currentIndex = targetIndex;
                    self.__renderBannerByCurrentIndex__();
                    window.clearInterval(self.timer);
                    self.timer = setInterval(self.__bannerCarousel__.bind(self), 6000);
                })
            }
            return this;
        },

        __bannerCarousel__: function () {
            this.__BannerC__.currentIndex++;
            if (this.__BannerC__.currentIndex > 2) this.__BannerC__.currentIndex = 0;
            this.__renderBannerByCurrentIndex__();
        },


        __renderBannerByCurrentIndex__: function () {
            var el = document.getElementsByClassName('banner-indicators-item'), i = 0, len = el.length;
            for (var j = 0; j < len; j++) {
                el[j].classList.remove('active');
            }
            this.banner2.children[0].classList.remove('active');
            this.banner0.children[0].classList.remove('active');
            this.banner1.children[0].classList.remove('active');
            switch (this.__BannerC__.currentIndex) {
                case 0:
                    this.bannerContent.style.transform = `translate3d(${-this.elmentDuration * 2}%,0,0)`;
                    el[this.__BannerC__.currentIndex].classList.add('active');
                    break;
                case 1:
                    this.bannerContent.style.transform = `translate3d(${-this.elmentDuration * 1}%,0,0)`;
                    el[this.__BannerC__.currentIndex].classList.add('active');
                    break;
                case 2:
                    this.bannerContent.style.transform = `translate3d(${-this.elmentDuration * 0}%,0,0)`;
                    el[this.__BannerC__.currentIndex].classList.add('active');
                    break;
            }
        },

        destory: function () {
            window.clearInterval(this.timer);
        }

    };
    return {
        Banner: __Banner__
    };
}, "banner");
