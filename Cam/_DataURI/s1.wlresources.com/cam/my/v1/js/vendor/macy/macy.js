! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Macy = e()
}(this, function() {
    "use strict";

    function t(t) {
        var e = document.body.clientWidth,
            o = void 0;
        for (var n in t.breakAt)
            if (e < n) {
                o = t.breakAt[n];
                break
            }
        return o || (o = t.columns), o
    }

    function e(e) {
        var o = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
            n = t(e),
            r = void 0,
            i = 100 / n;
        return o ? 1 === n ? "100%" : (r = (n - 1) * e.margin / n, "calc(" + i + "% - " + r + "px)") : i
    }

    function o(o, n) {
        var r = t(o.options),
            i = 0,
            s = void 0;
        return 1 === ++n ? 0 : (s = (o.options.margin - (r - 1) * o.options.margin / r) * (n - 1), i += e(o.options, !1) * (n - 1), "calc(" + i + "% + " + s + "px)")
    }

    function n(t) {
        for (var e = 0, o = t.container, n = t.rows, r = n.length - 1; r >= 0; r--) e = n[r] > e ? n[r] : e;
        o.style.height = e + "px"
    }

    function r(e, o) {
        var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
        l(e, t(e.options), r), o.forEach(function(t) {
            var o = 0,
                n = parseInt(t.offsetHeight, 10);
            isNaN(n) || (e.rows.forEach(function(t, n) {
                t < e.rows[o] && (o = n)
            }), t.style.position = "absolute", t.style.top = e.rows[o] + "px", t.style.left = "" + e.cols[o], e.rows[o] += isNaN(n) ? 0 : n + e.options.margin, i && (t.dataset.macyComplete = 1))
        }), i && (e.tmpRows = null), n(e)
    }

    function i(e, o) {
        var r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
            i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
            s = t(e.options);
        l(e, s, r), o.forEach(function(t) {
            e.lastcol === s && (e.lastcol = 0);
            var o = c(t, "height");
            o = parseInt(o.replace("px", ""), 10), isNaN(o) || (t.style.position = "absolute", t.style.top = e.rows[e.lastcol] + "px", t.style.left = "" + e.cols[e.lastcol], e.rows[e.lastcol] += isNaN(o) ? 0 : o + e.options.margin, e.lastcol += 1, i && (t.dataset.macyComplete = 1))
        }), i && (e.tmpRows = null), n(e)
    }

    function s(t, e) {
        var o = void 0;
        return function() {
            o && clearTimeout(o), o = setTimeout(t, e)
        }
    }
    Object.getOwnPropertyNames(Array.prototype).forEach(function(t) {
        "length" !== t && (NodeList.prototype[t] = Array.prototype[t], HTMLCollection.prototype[t] = Array.prototype[t])
    });
    var a = function t(e, o) {
        if (!(this instanceof t)) return new t(e, o);
        if (e = e.replace(/^\s*/, "").replace(/\s*$/, ""), o) return this.byCss(e, o);
        for (var n in this.selectors)
            if (o = n.split("/"), new RegExp(o[1], o[2]).test(e)) return this.selectors[n](e);
        return this.byCss(e)
    };
    a.prototype.byCss = function(t, e) {
        return (e || document).querySelectorAll(t)
    }, a.prototype.selectors = {}, a.prototype.selectors[/^\.[\w\-]+$/] = function(t) {
        return document.getElementsByClassName(t.substring(1))
    }, a.prototype.selectors[/^\w+$/] = function(t) {
        return document.getElementsByTagName(t)
    }, a.prototype.selectors[/^\#[\w\-]+$/] = function(t) {
        return document.getElementById(t.substring(1))
    };
    var c = function(t, e) {
            return window.getComputedStyle(t, null).getPropertyValue(e)
        },
        l = function(t, e) {
            var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (t.lastcol || (t.lastcol = 0), n) {
                t.rows = [], t.cols = [], t.lastcol = 0;
                for (var r = e - 1; r >= 0; r--) t.rows[r] = 0, t.cols[r] = o(t, r)
            }
            if (t.tmpRows) {
                t.rows = [];
                for (var r = e - 1; r >= 0; r--) t.rows[r] = t.tmpRows[r]
            } else {
                t.tmpRows = [];
                for (var r = e - 1; r >= 0; r--) t.tmpRows[r] = t.rows[r]
            }
        },
        u = function(t) {
            var o = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
                s = o ? t.container.children : a(':scope > *:not([data-macy-complete="1"])', t.container),
                c = e(t.options);
            return s.forEach(function(t) {
                o && (t.dataset.macyComplete = 0), t.style.width = c
            }), t.options.trueOrder ? i(t, s, o, n) : r(t, s, o, n)
        },
        p = function(t, e) {
            setTimeout(function() {
                var o = t();
                e && e(o)
            }, 0)
        },
        f = function(t, e, o) {
            t && p(t), o.req === o.complete && p(e)
        },
        h = function(t, e, o) {
            var n = t.length,
                r = 0;
            t.forEach(function(t) {
                t.complete && (r++, f(e, o, {
                    req: n,
                    complete: r
                })), t.addEventListener("load", function() {
                    r++, f(e, o, {
                        req: n,
                        complete: r
                    })
                })
            })
        },
        d = Object.assign || function(t) {
            for (var e = 1; e < arguments.length; e++) {
                var o = arguments[e];
                for (var n in o) Object.prototype.hasOwnProperty.call(o, n) && (t[n] = o[n])
            }
            return t
        },
        m = {
            columns: 4,
            margin: 2,
            trueOrder: !0,
            waitForImages: !1
        },
        v = function t() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : m;
            if (!(this instanceof t)) return new t(e);
            if (this.options = {}, d(this.options, m, e), this.container = a(e.container), this.container instanceof a || !this.container) return !!e.debug && console.error("Error: Container not found");
            delete this.options.container, this.container.length && (this.container = this.container[0]), this.container.style.position = "relative", this.rows = [];
            var o = this.recalculate.bind(this, !1, !1),
                n = this.recalculate.bind(this, !0, !0),
                r = a("img", this.container);
            if (this.resizer = s(function() {
                    n()
                }, 100), window.addEventListener("resize", this.resizer), e.waitForImages) return h(r, null, n);
            this.recalculate(!0, !1), h(r, o, n)
        };
    return v.init = function(t) {
        return console.warn("Depreciated: Macy.init will be removed in v3.0.0 opt to use Macy directly like so Macy({ /*options here*/ }) "), new v(t)
    }, v.prototype.recalculateOnImageLoad = function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            o = a("img", this.container),
            n = this.recalculate.bind(this, e, !1),
            r = this.recalculate.bind(this, e, !0);
        return t ? h(o, null, r) : (n(), h(o, n, r))
    }, v.prototype.runOnImageLoad = function(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            o = a("img", this.container);
        return e ? h(o, t, t) : h(o, null, t)
    }, v.prototype.recalculate = function() {
        return u(this, arguments.length > 0 && void 0 !== arguments[0] && arguments[0], !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1])
    }, v.prototype.remove = function() {
        window.removeEventListener("resize", this.resizer), this.container.children.forEach(function(t) {
            t.removeAttribute("data-macy-complete"), t.removeAttribute("style")
        }), this.container.removeAttribute("style")
    }, v.prototype.reInit = function() {
        this.recalculate(!0, !0), window.addEventListener("resize", this.resizer)
    }, v
});