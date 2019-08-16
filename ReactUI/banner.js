"use strict";
; (function (global, $, factory, plug) {
    global[plug] = factory.call(global, $);
})(window, $, function ($) {
    var __Banner__ = function (ops) {
        this.__BannerC__ = {
            id: ops.id,
            element: ops.element,
            currentIndex: 0,
            banner1: ops.banner1,
            banner2: ops.banner2,
            banner3: ops.banner3
        };
        this.timer = null;
        this.banner0 = null;
        this.banner1 = null;
        this.banner2 = null;
        this.bannerContent = null;
        this.elmentDuration = 1 / 3 * 100;
        this.init()
            .render();

    };
    __Banner__.prototype = {
        init: function () {
            this.element = this.__BannerC__.element;
            this.element.id = this.__BannerC__.id;
            this.element.classList.add('banner');
            return this;
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
            fragement.push("<div class='banner-item'><div class='banner-item-inner'><p class='title'>" + this.__BannerC__.banner1.leftText + "</p><p class='description'> " + this.__BannerC__.banner1.rightText + "</p></div></div>");
            fragement.push("<div class='banner-item'><div class='banner-item-inner'><p class='title'> " + this.__BannerC__.banner2.leftText + "</p><p class='description'>" + this.__BannerC__.banner2.rightText + "</p></div></div>");
            fragement.push("<div class='banner-item'><div class='banner-item-inner'><p class='title'>" + this.__BannerC__.banner3.leftText + "</p><p class='description'>" + this.__BannerC__.banner3.rightText + "</p></div></div>");
            this.element.innerHTML = fragement.join('');
            this.__bind__()
                .__run__();
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

        __bind__: function () {
            var self = this, el = document.getElementsByClassName('banner-indicators-item'), i = 0, len = el.length;
            for (; i < len; i++) {
                el[i].addEventListener('click', function (e) {
                    var targetIndex = e.target.tabIndex;
                    if (self.__BannerC__.currentIndex == targetIndex) return;
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
            this.element.remove();
        }

    };
    return {
        Banner: __Banner__
    };
}, "banner");
