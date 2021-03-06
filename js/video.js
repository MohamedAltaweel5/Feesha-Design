! function (a, b, c, d) {
    "use strict";

    function g(b, c) {
        function g() {
            d.options.originalVideoW = d.options.$video[0].videoWidth, d.options.originalVideoH = d.options.$video[0].videoHeight, d.initialised || d.init()
        }
        var d = this;
        this.element = b, this.options = a.extend({}, f, c), this._defaults = f, this._name = e, this.options.$video = a(b), this.detectBrowser(), this.shimRequestAnimationFrame(), this.options.has3d = this.detect3d(), this.options.$videoWrap.css({
            position: "relative",
            overflow: "hidden",
            "z-index": "10"
        }), this.options.$video.css({
            position: "absolute",
            "z-index": "1"
        }), this.options.$video.on("canplay canplaythrough", g), this.options.$video[0].readyState > 3 && g()
    }
    var e = "backgroundVideo",
        f = {
            $videoWrap: a("#video-wrap"),
            $outerWrap: a(b),
            $window: a(b),
            minimumVideoWidth: 400,
            preventContextMenu: !1,
            parallax: !0,
            parallaxOptions: {
                effect: 1.5
            },
            pauseVideoOnViewLoss: !1
        };
    g.prototype = {
        init: function () {
            var a = this;
            this.initialised = !0, this.options.pauseVideoOnViewLoss && this.playPauseVideo(), this.options.preventContextMenu && this.options.$video.on("contextmenu", function () {
                return !1
            }), a.update()
        },
        update: function () {
            var a = this,
                c = !1,
                d = function () {
                    a.positionObject(), c = !1
                },
                e = function () {
                    c || (b.requestAnimationFrame(d), c = !0)
                };
            this.options.parallax && this.options.$window.on("scroll.backgroundVideo", e), this.options.$window.on("resize.backgroundVideo", e), e()
        },
        detect3d: function () {
            var e, f, a = c.createElement("p"),
                g = {
                    WebkitTransform: "-webkit-transform",
                    OTransform: "-o-transform",
                    MSTransform: "-ms-transform",
                    MozTransform: "-moz-transform",
                    transform: "transform"
                };
            c.body.insertBefore(a, c.body.lastChild);
            for (e in g) a.style[e] !== d && (a.style[e] = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)", f = b.getComputedStyle(a).getPropertyValue(g[e]));
            return a.parentNode.removeChild(a), f !== d ? "none" !== f : !1
        },
        detectBrowser: function () {
            var a = navigator.userAgent.toLowerCase();
            a.indexOf("chrome") > -1 || a.indexOf("safari") > -1 ? (this.options.browser = "webkit", this.options.browserPrexix = "-webkit-") : a.indexOf("firefox") > -1 ? (this.options.browser = "firefox", this.options.browserPrexix = "-moz-") : -1 !== a.indexOf("MSIE") || a.indexOf("Trident/") > 0 ? (this.options.browser = "ie", this.options.browserPrexix = "-ms-") : a.indexOf("Opera") > -1 && (this.options.browser = "opera", this.options.browserPrexix = "-o-")
        },
        scaleObject: function () {
            var b, c, d;
            return this.options.$videoWrap.width(this.options.$outerWrap.width()), this.options.$videoWrap.height(this.options.$outerWrap.height()), b = this.options.$window.width() / this.options.originalVideoW, c = this.options.$window.height() / this.options.originalVideoH, d = b > c ? b : c, d * this.options.originalVideoW < this.options.minimumVideoWidth && (d = this.options.minimumVideoWidth / this.options.originalVideoW), this.options.$video.width(d * this.options.originalVideoW), this.options.$video.height(d * this.options.originalVideoH), {
                xPos: -(parseInt(this.options.$video.width() - this.options.$window.width()) / 2),
                yPos: parseInt(this.options.$video.height() - this.options.$window.height()) / 2
            }
        },
        positionObject: function () {
            var a = this,
                c = b.pageYOffset,
                d = this.scaleObject(this.options.$video, a.options.$videoWrap),
                e = d.xPos,
                f = d.yPos;
            f = this.options.parallax ? c >= 0 ? this.calculateYPos(f, c) : this.calculateYPos(f, 0) : -f, a.options.has3d ? (this.options.$video.css(a.options.browserPrexix + "transform", "translate3d(-" + e + "px, " + f + "px, 0)"), this.options.$video.css("transform", "translate3d(" + e + "px, " + f + "px, 0)")) : (this.options.$video.css(a.options.browserPrexix + "transform", "translate(-" + e + "px, " + f + "px)"), this.options.$video.css("transform", "translate(" + e + "px, " + f + "px)"))
        },
        calculateYPos: function (a, b) {
            var c, d;
            return c = parseInt(this.options.$videoWrap.offset().top), d = c - b, a = -(d / this.options.parallaxOptions.effect + a)
        },
        disableParallax: function () {
            this.options.$window.unbind(".backgroundVideoParallax")
        },
        playPauseVideo: function () {
            var a = this;
            this.options.$window.on("scroll.backgroundVideoPlayPause", function () {
                a.options.$window.scrollTop() < a.options.$videoWrap.height() ? a.options.$video.get(0).play() : a.options.$video.get(0).pause()
            })
        },
        shimRequestAnimationFrame: function () {
            for (var a = 0, c = ["ms", "moz", "webkit", "o"], d = 0; d < c.length && !b.requestAnimationFrame; ++d) b.requestAnimationFrame = b[c[d] + "RequestAnimationFrame"], b.cancelAnimationFrame = b[c[d] + "CancelAnimationFrame"] || b[c[d] + "CancelRequestAnimationFrame"];
            b.requestAnimationFrame || (b.requestAnimationFrame = function (c, d) {
                var e = (new Date).getTime(),
                    f = Math.max(0, 16 - (e - a)),
                    g = b.setTimeout(function () {
                        c(e + f)
                    }, f);
                return a = e + f, g
            }), b.cancelAnimationFrame || (b.cancelAnimationFrame = function (a) {
                clearTimeout(a)
            })
        }
    }, a.fn[e] = function (b) {
        return this.each(function () {
            a.data(this, "plugin_" + e) || a.data(this, "plugin_" + e, new g(this, b))
        })
    }
} (jQuery, window, document);