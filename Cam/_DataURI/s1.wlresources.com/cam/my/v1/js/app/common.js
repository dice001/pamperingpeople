var Init;
(function(b) {
    function c() {
        Social.init();
        Ws.init();
        Wpn.init();
        Call.init();
        PostMessage.init();
        Map.init();
        Slide.init();
        Module.init();
        Part.init()
    }

    function d() {
        Menu.init();
        $(window).scroll(function() {
            700 < $(window).scrollTop() ? $("#btnUp").fadeIn() : $("#btnUp").fadeOut()
        });
        $("#btnUp").click(function() {
            Tool.scrollTo($("body"), !1)
        });
        Livestream.init();
        PartFooter.init(!1);
        "boolean" == typeof Application.displayDisclaimer && Application.displayDisclaimer && Domain.disclaimer()
    }

    function e() {
        Tooltip.init(!1);
        "function" ==
        typeof $.fancybox && $("[data-fancybox]").fancybox({
            speed: 200,
            buttons: !1
        });
        $("[data-js-action]").each(function() {
            var a = $(this).attr("data-js-action"),
                b = $(this).attr("data-js-param");
            b && (b = b.split(","));
            $(this).unbind("click").click(function() {
                Core.callFunction(a, b)
            })
        });
        $("[data-js-toggle]").unbind("click");
        $("[data-js-toggle]").click(function(a) {
            a = $(this).attr("data-js-toggle");
            $(a).slideToggle();
            return !1
        });
        $("[data-js-switch]").off("change.switch").on("change.switch", function(a) {
            a = $(this).attr("data-js-switch");
            $(this).is(":checked") ? $(a).slideDown() : $(a).slideUp();
            return !1
        });
        $("form[data-ajax-send]").unbind("submit").submit(function() {
            Ajax.sendForm($(this));
            return !1
        });
        $(".jsFancyClose").off("click").on("click", function() {
            $.fancybox.close(!0)
        });
        $(".module.diaporama").each(function() {
            var a = $(this).attr("moduleId");
            ModuleDiaporama.initDisplay(a)
        })
    }
    b.all = function() {
        d();
        e();
        c()
    };
    b.module = c;
    b.front = d;
    b.action = e
})(Init || (Init = {}));

var StringTool;
(function(c) {
    c.escapeHtml = function(a) {
        var b = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#x2F;"
        };
        return String(a).replace(/[&<>"'\/]/g, function(a) {
            return b[a]
        })
    };
    c.nl2br = function(a, b) {
        return (a + "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1" + (b || "undefined" === typeof b ? "<br />" : "<br>") + "$2")
    }
})(StringTool || (StringTool = {}));
var Tool;
(function(e) {
    function f(a, b, d) {
        var c = "";
        d && (c = new Date, c.setTime(c.getTime() + 864E5 * d), c = "; expires=" + c.toUTCString());
        document.cookie = a + "=" + b + c + "; path=/"
    }
    e.setCookie = f;
    e.getCookie = function(a) {
        a += "=";
        for (var b = document.cookie.split(";"), d = 0; d < b.length; d++) {
            for (var c = b[d];
                " " == c.charAt(0);) c = c.substring(1, c.length);
            if (0 == c.indexOf(a)) return c.substring(a.length, c.length)
        }
        return null
    };
    e.removeCookie = function(a) {
        f(a, "", -1)
    };
    e.scrollTo = function(a, b) {
        "number" != typeof b && (b = -70);
        if (a.length) return $("html, body").animate({
                scrollTop: a.offset().top + b
            },
            500), !1
    };
    e.loader = function(a) {
        var b = '<table class="loading"><tr><td align="center"><img src="/static/img/loader-white.gif"></td></tr></table>';
        a && (b = '<table class="loading"><tr><td align="center"><img src="/static/img/loader-black.gif"></td></tr></table>');
        return b
    };
    e.loaderBtn = function(a, b, d) {
        var c = "white";
        b && (c = "black");
        b = '<div class="btnLoader" btn="' + a + '" style="display:none;"><img src="/static/img/loader-' + c + '.gif"></div>';
        d ? ($("#" + a).fadeIn(), $('.btnLoader[btn="' + a + '"]').remove()) : (d = $("#" +
            a), d.hide(), d.after(b), $('.btnLoader[btn="' + a + '"]').fadeIn())
    };
    e.loaderOk = function(a) {
        var b = $('.btnLoader[btn="' + a + '"]');
        b.html('<i class="fa fa-check" aria-hidden="true"></i>');
        window.setTimeout(function() {
            b.fadeOut(300, function() {
                $("#" + a).fadeIn();
                $(this).remove()
            })
        }, 2E3)
    };
    e.loaderError = function(a, b) {
        var d = $('.btnLoader[btn="' + a + '"]');
        d.html('<i class="fa fa-exclamation-triangle error" aria-hidden="true"></i><br><span class="error">' + b + "</span>");
        window.setTimeout(function() {
            d.fadeOut(300, function() {
                $("#" +
                    a).fadeIn();
                $(this).remove()
            })
        }, 1E4)
    };
    e.nl2br = function(a) {
        return (a + "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1<br />$2")
    };
    e.getId = function() {
        var a = new Date;
        return Date.now() + "" + a.getMilliseconds() + Math.floor(10 * Math.random() + 1)
    };
    e.inIframe = function() {
        try {
            return window.self !== window.top
        } catch (a) {
            return !0
        }
    };
    e.validateEmail = function(a) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(a.toLowerCase())
    }
})(Tool ||
    (Tool = {}));
var Ajax;
(function(d) {
    d.send = function(a, c, d, e) {
        $("div.errorMsg").remove();
        $(".error").removeClass("error");
        a = {
            url: a,
            type: "POST",
            data: c,
            dataType: "json"
        };
        c && "function" == typeof c.entries && (a.processData = !1, a.contentType = !1);
        $.ajax(a).done(function(b) {
            if ("object" == typeof b.actions || "array" == typeof b.actions)
                for (var a in b.actions) {
                    var c = b.actions[a].action;
                    "redirect" == c && (document.location.href = b.actions[a].url);
                    "reload" == c && location.reload();
                    "function" == c && Core.callFunction(b.actions[a].name, b.actions[a].params)
                }
            "function" === typeof e &&
                e(b);
            "error" == b.result && "object" == typeof b.error && (a = '<div class="errorMsg">' + b.error.msg + "</div>", $("#" + b.error.target, d).after(a), $(".error", d).slideDown(), $("#" + b.error.target, d).addClass("error"))
        }).fail(function() {}).always(function() {})
    };
    d.sendForm = function(a) {
        var c = window.FormData ? new FormData(a[0]) : null;
        c = null !== c ? c : a.serializeArray();
        a = a.attr("action");
        d.send(a, c, !1, !1);
        return !1
    }
})(Ajax || (Ajax = {}));
var Core;
(function(d) {
    function e(b) {
        if (null == b || "object" != typeof b) return b;
        if (b instanceof Date) {
            var a = new Date;
            a.setTime(b.getTime());
            return a
        }
        if (b instanceof Array) {
            a = [];
            for (var c = 0, d = b.length; c < d; c++) a[c] = e(b[c]);
            return a
        }
        if (b instanceof Object) {
            a = {};
            for (c in b) b.hasOwnProperty(c) && (a[c] = e(b[c]));
            return a
        }
        throw Error("Unable to copy obj! Its type isn't supported.");
    }
    d.MSG_INTERNAL_ERROR = "Internal error";
    (function(b) {
        function a(a) {
            if ("content" in a) return null;
            if (!a) return {
                code: 1,
                msg: d.MSG_INTERNAL_ERROR
            };
            if (!("error" in
                    a)) return {
                code: 2,
                msg: d.MSG_INTERNAL_ERROR
            };
            a = a.error;
            var b = {
                code: 3,
                msg: d.MSG_INTERNAL_ERROR
            };
            "code" in a && (b.code = a.code);
            "msg" in a && (b.msg = a.msg);
            "extra" in a && (b.extra = a.extra);
            return b
        }
        b.post = function(b, e) {
            void 0 === e && (e = null);
            var c = $.ajax({
                    type: "post",
                    dataType: "json",
                    data: e,
                    url: Application.Config.url.root + b
                }),
                f = c.then(function(b) {
                    if (!(b && "content" in b)) {
                        var c = $.Deferred();
                        c.reject(a(b));
                        return c
                    }
                    return b.content
                }, function(a) {
                    var b = {
                        code: 0,
                        msg: d.MSG_INTERNAL_ERROR
                    };
                    b.code = 500 == a.status ? 4 : 200 == a.status ?
                        5 : "abort" == a.statusText ? 7 : 6;
                    return b
                });
            f.jqXHR = c;
            return f
        }
    })(d.Ajax || (d.Ajax = {}));
    d.clone = e;
    d.bootstrap = function() {
        if ("onDocumentReady" in Application) {
            for (var b = Application.onDocumentReady.split(/\./), a = window, c; c = b.shift();)
                if (c in a) a = a[c];
                else {
                    a = null;
                    break
                }
            "function" === typeof a && window.setTimeout(function() {
                a()
            }, 1)
        }
    };
    d.callFunction = function(b, a) {
        if (!b) return !1;
        a || (a = {});
        if (b.indexOf(".") && -1 != b.indexOf(".")) {
            var c = b.split(".");
            c = window[c[0]][c[1]]
        } else if ("function" === typeof window[b]) c = window[b];
        else return !1;
        if (a.length)
            for (i in a) a[i] && "string" == typeof a[i] && (a[i] = a[i].trim());
        else c();
        1 == a.length && c(a[0]);
        2 == a.length && c(a[0], a[1]);
        3 == a.length && c(a[0], a[1], a[2])
    }
})(Core || (Core = {}));
(function() {
    var d = document.getElementById("app-data");
    if (d) {
        if ("textContent" in d) var e = d.textContent;
        else(e = jQuery(d).text()) || (e = jQuery(d).html());
        e && (window.Application = jQuery.parseJSON(e), jQuery(document).ready(function() {
            Core.bootstrap()
        }))
    }
})();
var Menu;
(function(c) {
    c.init = function() {
        $(".menu-btn", ".header").click(function(a) {
            var b = $("ul.menu", ".header");
            b.hasClass("show") ? b.slideUp(250, function() {
                $(this).attr("style", "")
            }).removeClass("show") : b.slideDown(250).addClass("show");
            a.preventDefault();
            a.stopPropagation();
            return !1
        });
        $(".menu li", ".header").click(function() {
            var a = $("ul.menu", ".header");
            a.hasClass("show") && a.slideUp(250, function() {
                $(this).attr("style", "")
            }).removeClass("show")
        });
        $(".domain .header.owner .email").length && ($(window).resize(function() {
            var a = $(".domain .header.owner").height();
            $("#content").css({
                paddingTop: a
            });
            $("#slide").css({
                top: a
            })
        }), $(window).resize())
    }
})(Menu || (Menu = {}));
var Signup;
(function(c) {
    function e() {
        var a = $(".signup"),
            b = {
                firstname: $("#firstname", a).val(),
                lastname: $("#lastname", a).val()
            };
        Ajax.send("/signup/setName", b, a, function(a) {
            "error" == a.result && Tool.loaderBtn("signupSetName", !1, !0)
        });
        Tool.loaderBtn("signupSetName", !0)
    }

    function f() {
        var a = $(".signup"),
            b = {
                email: $("#email", a).val(),
                password: $("#password", a).val(),
                age: $("#age", a).val(),
                "g-recaptcha-response": $("#g-recaptcha-response", a).val()
            };
        Ajax.send("/signup/setAccount", b, a, function(a) {
            "error" == a.result && Tool.loaderBtn("btnSignup", !1, !0)
        });
        Tool.loaderBtn("btnSignup", !0)
    }

    function g() {
        var a = $(".signup"),
            b = {
                email: $("#email", a).val(),
                password: $("#password", a).val()
            };
        Ajax.send("/signup/loginSend", b, a, function(a) {
            "error" == a.result && Tool.loaderBtn("signupLogin", !1, !0)
        });
        Tool.loaderBtn("signupLogin", !0)
    }
    c.setName = e;
    c.setDomain = function() {
        var a = $(".signup"),
            b = {
                domain: $("#domain", a).val()
            };
        Ajax.send("/signup/setDomain", b, a)
    };
    c.updateDomain = function(a) {
        var b = $(".signup #domain");
        "model" == Application.app && (b = $("#content #domainName"));
        b.val(a)
    };
    c.setAccount = f;
    c.setPhone = function() {
        var a = $(".signup"),
            b = {
                country: $("#country", a).val(),
                phone: $("#phone", a).val()
            };
        Ajax.send("/signup/setPhone", b, a, function(a) {
            "error" == a.result && Tool.loaderBtn("signupSetPhone", !1, !0)
        });
        Tool.loaderBtn("signupSetPhone", !0)
    };
    c.setPhoneConfirm = function() {
        var a = $(".signup"),
            b = {
                code: $("#code", a).val()
            };
        Ajax.send("/signup/setPhoneConfirm", b, a)
    };
    c.setEmail = function() {
        var a = $(".signup"),
            b = {
                email: $("#email", a).val()
            };
        Ajax.send("/signup/setEmail", b, a)
    };
    c.setAddress =
        function() {
            var a = $(".signup"),
                b = {
                    firstname: $("#firstname", a).val(),
                    lastname: $("#lastname", a).val(),
                    address1: $("#address1").val(),
                    address2: $("#address2").val(),
                    zipcode: $("#zipcode").val(),
                    city: $("#city").val(),
                    country: $("#country").val(),
                    phone: $("#phone").val()
                };
            Ajax.send("/signup/setAddress", b, a)
        };
    c.loginSend = g;
    c.emailSendAgain = function() {
        var a = $(".signup");
        Ajax.send("/signup/emailSendAgain", {}, a, function(a) {
            $.fancybox.open([{
                src: "/signup/" + ("success" == a.result ? "emailSendAgainOk" : "emailSendAgainError"),
                type: "ajax",
                opts: {
                    onComplete: function() {}
                }
            }], {
                loop: !1,
                closeClickOutside: !1,
                touch: !1
            })
        })
    };
    c.passwordForget = function() {
        var a = $(".signup"),
            b = {
                email: $("#email", a).val()
            };
        Ajax.send("/signup/passwordForgetSend", b, a, function(b) {
            "success" == b.result && ($(".jsForgetEmail", a).slideUp(), $(".jsForgetMsg", a).slideDown());
            "error" == b.result && Tool.loaderBtn("signupPasswordForget", !1, !0)
        });
        Tool.loaderBtn("signupPasswordForget", !0)
    };
    c.passwordReset = function() {
        var a = $(".signup"),
            b = {
                userId: $("#userId", a).val(),
                resetToken: $("#resetToken",
                    a).val(),
                password1: $("#password1", a).val(),
                password2: $("#password2", a).val()
            };
        Ajax.send("/signup/passwordResetSend", b, a, function(b) {
            "success" == b.result && ($(".jsReset", a).slideUp(), $(".jsResetOk", a).slideDown());
            "error" == b.result && Tool.loaderBtn("signupPasswordReset", !1, !0)
        });
        Tool.loaderBtn("signupPasswordReset", !0)
    };
    c.social = function(a) {
        newPopupSocialNetwork = window.open("/signup/social/" + a, "", "height=450,width=650");
        window.focus && newPopupSocialNetwork.focus()
    };
    c.initSetName = function() {
        $("#lastname").keypress(function(a) {
            13 ==
                a.which && e()
        });
        Init.all()
    };
    c.initLogin = function() {
        $("#password").keypress(function(a) {
            13 == a.which && g()
        });
        Init.all()
    };
    c.initSetAccount = function() {
        $("#password").keypress(function(a) {
            13 == a.which && f()
        });
        Init.all()
    };
    c.initSocialList = function() {
        $('.socialList .item .switch-input[id^="activeSocial"]', ".signup").change(function() {
            var a = $(this).is(":checked"),
                b = $(this).parents(".item").attr("alias");
            a ? Social.login(b) : Social.logout(b)
        });
        Init.all()
    };
    c.modelSetDomain = function() {
        var a = $(".domain"),
            b = {
                domain: $("#domainName").val()
            };
        Ajax.send("/signup/setDomain", b, a)
    };
    c.setTemplate = function(a) {
        var b = $(".templateList .item");
        Ajax.send("/signup/setTemplate", {
            templateId: a
        }, b)
    };
    c.setNoTemplate = function() {
        var a = $("#btnNoTemplate");
        Ajax.send("/signup/setNoTemplate", {}, a)
    };
    c.initValidateEmail = function() {
        $("#validEmail").on("click", function() {
            var a = $("#validationResult"),
                b = $("#nextPage a"),
                c = "no",
                e = {
                    user: $("#user").val(),
                    code: $("#code").val()
                };
            Ajax.send("/signup/validEmail", e, a, function(d) {
                if (void 0 !== d.content) {
                    var e = d.content.msg,
                        f = d.content.urlNext;
                    d.content.checkEmail && (c = "ok");
                    a.addClass(c);
                    $("span", a).html(e);
                    b.attr("href", f);
                    b.css("display", "block")
                }
                void 0 !== d.error && (e = d.error.code, d = d.error.msg, a.addClass(c), $("span", a).html(e + " : " + d))
            });
            Tool.loaderBtn("validEmail", !0, !1)
        });
        Init.all()
    }
})(Signup || (Signup = {}));
var SlideAccount;
(function(a) {
    a.init = function() {}
})(SlideAccount || (SlideAccount = {}));
var Module;
(function(b) {
    function f(c) {
        var a = $('.module[moduleId="' + c + '"]', "#content");
        a.prepend('<div class="loading-layer">' + Tool.loader(!0) + "</div>");
        a.load("/domain/update/module/" + c, function() {
            Init.all()
        })
    }
    b.selectedId = 0;
    b.moduleList = {};
    b.newModule = {};
    b.init = function() {
        Application.user.isLog && Application.user.owner && ($("div.module", ".part-content").off("click").on("click", function(c) {
            c = $(this).attr("moduleId");
            b.selectedId != c && b.select(c, !0)
        }), $("div.module", ".part-content").each(function() {
            var c = $(this).attr("moduleId");
            b.moduleList[c] = {}
        }), $("div.module .editor", ".part-content").on("click", function(c) {
            c.stopPropagation();
            return !1
        }))
    };
    b.save = function(c, a, b) {
        Ajax.send("/module/save", a, "", function(a) {
            void 0 != a.result && "" != a.result && ("success" == a.result && void 0 != a.hash && "" != a.hash ? ($(".contentEdit #dataHash").val(a.hash), "function" === typeof b && b(c)) : (clearInterval(SlideModule.SlideModuleTimer), void 0 != a.msg && "" != a.msg && (Tool.loaderBtn("btnModuleSave"), Tool.loaderError("btnModuleSave", a.msg))))
        })
    };
    b.updateStatus = function(c,
        a) {
        var b = $('.module[moduleId="' + c + '"]', "#content");
        a ? b.slideDown(300, function() {
            Tool.scrollTo($(this), -100)
        }) : b.slideUp(300, function() {
            Tool.scrollTo($(this), -100)
        });
        Ajax.send("/module/saveStatus", {
            id: c,
            status: a
        })
    };
    b.saveOrder = function(c) {
        Ajax.send("/module/saveOrder", {
            list: c
        })
    };
    b.create = function(c, a, d) {
        a = '<div class="module ' + a + ' selected bgWhite paddingMedium " moduleId="' + c + '"></div>';
        d ? ($('.part-content .module[moduleId="' + d + '"]', "#content").after(a), b.saveOrder(b.getList())) : $("#content .part-content").append(a);
        b.select(c);
        SlideModule.edit(c);
        f(c)
    };
    b.createBefore = function(c, a) {
        b.newModule.before = !0;
        b.newModule.after = !1;
        b.newModule.moduleId = c
    };
    b.createAfter = function(c, a) {
        Ajax.send("/module/create/" + a, {
            afterModuleId: c
        }, !1)
    };
    b.updateDisplay = f;
    b.updateTitle = function(c, a) {
        $('.module[moduleId="' + c + '"] .head .title h2', "#content").html(a)
    };
    b.displayTitle = function(c, a) {
        var b = $('.module[moduleId="' + c + '"] .head .title', "#content");
        $("h2", b).show();
        a ? b.slideDown() : b.slideUp()
    };
    b.updateDescription = function(c, a) {
        $('.module[moduleId="' +
            c + '"] .head .description .txt', "#content").html(Tool.nl2br(a))
    };
    b.displayDescription = function(c, a) {
        var b = $('.module[moduleId="' + c + '"] .head .description', "#content");
        $(".txt", b).show();
        a ? b.slideDown() : b.slideUp()
    };
    b.remove = function(c) {
        if (!c) return !1;
        Ajax.send("/module/remove/" + c, {}, "", function() {
            $('.module[moduleId="' + c + '"]', "#content").slideUp(400, function() {
                $(this).remove()
            });
            $.fancybox.close()
        })
    };
    b.displayRemoveLayer = function(c) {
        $.fancybox.open([{
            src: "/module/displayRemoveLayer/" + c,
            type: "ajax",
            opts: {
                onComplete: function() {
                    Init.action()
                }
            }
        }], {
            loop: !1,
            closeClickOutside: !0,
            touch: !1
        })
    };
    b.getList = function() {
        var c = [];
        $(".part-content .module", "#content").each(function() {
            var a = $(this).attr("moduleId");
            c.push(a)
        });
        return c
    };
    b.moveUp = function(c) {
        var a = $('.part-content .module[moduleId="' + c + '"]', "#content");
        a.prev().insertAfter(a);
        a.next().is(":hidden") && a.prev().insertAfter(a);
        a.next().is(":hidden") && a.prev().insertAfter(a);
        a.next().is(":hidden") && a.prev().insertAfter(a);
        a.next().is(":hidden") && a.prev().insertAfter(a);
        a.next().is(":hidden") && a.prev().insertAfter(a);
        a = b.getList();
        b.saveOrder(a);
        b.scrollTo(c);
        b.updateEditor()
    };
    b.moveDown = function(c) {
        var a = $('.part-content .module[moduleId="' + c + '"]', "#content");
        a.next().insertBefore(a);
        a.prev().is(":hidden") && a.next().insertBefore(a);
        a.prev().is(":hidden") && a.next().insertBefore(a);
        a.prev().is(":hidden") && a.next().insertBefore(a);
        a.prev().is(":hidden") && a.next().insertBefore(a);
        a.prev().is(":hidden") && a.next().insertBefore(a);
        a = b.getList();
        b.saveOrder(a);
        b.scrollTo(c);
        b.updateEditor()
    };
    b.select = function(c, a) {
        b.selectedId && b.unselect(!1, !0);
        $("div.module", ".part-content").removeClass("selected");
        $('.part-content .module[moduleId="' + c + '"]', "#content").addClass("selected");
        b.scrollTo(c);
        a && SlideModule.edit(c);
        b.selectedId = c
    };
    b.unselect = function(c, a) {
        c || (c = b.selectedId);
        b.selectedId && a && SlideModule.moduleSelected == c && SlideModule.save(c);
        $('.part-content .module[moduleId="' + c + '"]', "#content").removeClass("selected");
        b.selectedId = !1
    };
    b.scrollTo = function(c) {
        c = $('.part-content .module[moduleId="' +
            c + '"]', "#content");
        Tool.scrollTo(c, -100)
    };
    b.updateEditor = function() {
        $(".part-content .module .editor a.up", "#content").show();
        $(".part-content .module .editor a.down", "#content").show();
        $(".part-content .module:first .editor a.up", "#content").hide();
        $(".part-content .module:last .editor a.down", "#content").hide()
    };
    b.setBackground = function(c, a) {
        var b = $('.part-content .module[moduleId="' + c + '"]', "#content");
        b.removeClass("bgWhite bgGrey1 bgGrey2 bgGrey3 bgGrey4 bgBlack bg1 bg2");
        b.addClass(a)
    };
    b.setPaddingHeight =
        function(c, a) {
            var b = $('.part-content .module[moduleId="' + c + '"]', "#content");
            b.removeClass("paddingSmall paddingMedium paddingLarge");
            var e = "padding" + a.charAt(0).toUpperCase() + a.slice(1);
            b.addClass(e)
        };
    b.displayAddSubMenu = function(c) {
        b.moduleList[c].editor = b.moduleList[c].editor || {};
        var a = $('.part-content .module[moduleId="' + c + '"] .editor', "#content");
        b.moduleList[c].editor.addSubMenu ? ($(".addSubMenu", a).slideUp(), b.moduleList[c].editor.addSubMenu = !1, b.moduleList[c].editor.timer && clearTimeout(b.moduleList[c].editor.timer)) :
            Ajax.send("/slide/contentAddList", {}, !1, function(d) {
                $(".addSubMenu", a).html("");
                for (var e in d.moduleList) $(".addSubMenu", a).append('<a href="Javascript:;" typeId="' + d.moduleList[e].id + '"><img src="' + Application.staticUrl + "/icons/module-" + d.moduleList[e].id + '.png"></a>');
                $(".addSubMenu a", a).on("click", function() {
                    var a = $(this).attr("typeId");
                    b.createAfter(c, a)
                });
                $(".addSubMenu", a).hide().slideDown();
                b.moduleList[c].editor.addSubMenu = !0;
                $(".addSubMenu", a).on("mouseleave", function() {
                    b.moduleList[c].editor.timer &&
                        clearTimeout(b.moduleList[c].editor.timer);
                    b.moduleList[c].editor.timer = setTimeout(function() {
                        $(".addSubMenu", a).slideUp();
                        b.moduleList[c].editor.addSubMenu = !1
                    }, 2E3)
                });
                $(".addSubMenu", a).on("mouseenter", function() {
                    b.moduleList[c].editor.timer && clearTimeout(b.moduleList[c].editor.timer)
                })
            })
    }
})(Module || (Module = {}));
var ModuleBtn;
(function(a) {
    a.update = function(a, b) {
        var c = $('.module[moduleId="' + a + '"]', "#content");
        $(".btn a", c).html(b.text);
        $(".btn a", c).attr("href", b.url);
        $(".btn a", c).attr("target", b.target)
    }
})(ModuleBtn || (ModuleBtn = {}));
var ModuleComment;
(function(b) {
    function c() {
        Tool.scrollTo($(".layout-comments", "#content"), -70);
        var a = $(".layout-comments", "#content");
        a.prepend('<div class="loading-layer">' + Tool.loader(!0) + "</div>");
        a.load("/comment/refresh/", function() {
            Init.all()
        })
    }
    b.open = function() {
        $.fancybox.open([{
            src: Application.prefixLang + "/comment",
            type: "ajax",
            opts: {
                onComplete: function() {
                    Init.action();
                    var a = window.location.href;
                    $('.modal.feedback input[name="url"]').val(a)
                }
            }
        }], {
            loop: !1,
            closeClickOutside: !1,
            touch: !1
        })
    };
    b.saveDone = function() {
        $(".modal.comment").length &&
            ($(".modal.comment form").slideUp(), $(".modal.comment .sendDone").slideDown(), c(), setTimeout(function() {
                $.fancybox.close()
            }, 3E3))
    };
    b.remove = function(a) {
        Ajax.send("/comment/remove/" + a, {}, "", function() {
            $('.item[commentid="' + a + '"]', ".part-comments").remove();
            $.fancybox.close()
        })
    };
    b.displayRemove = function(a) {
        $.fancybox.open([{
            src: "/comment/displayRemoveComment/" + a,
            type: "ajax",
            opts: {
                onComplete: function() {
                    Init.action()
                }
            }
        }], {
            loop: !1,
            closeClickOutside: !0,
            touch: !1
        })
    };
    b.refresh = c
})(ModuleComment || (ModuleComment = {}));
var ModuleContactForm;
(function(c) {
    c.send = function() {
        var d = $(".module .contactForm form", "#content"),
            b = d.serializeArray(),
            a = {},
            c;
        for (c in b) a[b[c].name] = b[c].value;
        b = d.attr("action");
        Ajax.send(b, a, d, function(a) {
            "error" == a.result && Tool.loaderBtn("btnSendContactForm", !1, !0)
        });
        Tool.loaderBtn("btnSendContactForm")
    };
    c.displayOk = function() {
        $(".module .contactForm", "#content").slideUp();
        $(".module .contactFormOk", "#content").slideDown()
    };
    c.update = function(c, b) {
        var a = $('.module[moduleId="' + c + '"]', "#content");
        b.name ? $(".line-contactName",
            a).slideDown() : $(".line-contactName", a).slideUp();
        b.phone ? $(".line-contactPhone", a).slideDown() : $(".line-contactPhone", a).slideUp();
        b.email ? $(".line-contactEmail", a).slideDown() : $(".line-contactEmail", a).slideUp();
        b.company ? $(".line-contactCompany", a).slideDown() : $(".line-contactCompany", a).slideUp();
        b.subject ? $(".line-contactSubject", a).slideDown() : $(".line-contactSubject", a).slideUp()
    }
})(ModuleContactForm || (ModuleContactForm = {}));
var ModuleDiaporama;
(function(f) {
    diaporamaList = [];
    f.updateHeight = function(b, c) {
        var a = $('.module[moduleId="' + b + '"] .imgList', "#content");
        a.removeClass("small medium large");
        a.addClass(c)
    };
    f.updateWidth = function(b, c) {
        var a = $('.module[moduleId="' + b + '"]', "#content");
        a.removeClass("fullWidth");
        c && a.addClass("fullWidth")
    };
    f.add = function(b, c, a) {
        var d = $('.module[moduleId="' + b + '"]', "#content"),
            e = "";
        e = '<div class="item" imgId="' + c + '" style="background-image:url(' + Application.cdnUrl + a.imgUrl + ')">';
        e += "</div>";
        $(".imgList", d).append(e);
        f.initDisplay(b);
        $(".noContent", d).slideUp(400, function() {
            $(this).remove()
        })
    };
    f.remove = function(b, c) {
        var a = $('.module[moduleId="' + b + '"]', "#content");
        $('.item[imgId="' + c + '"]', a).fadeOut(400, function() {
            $(this).remove()
        })
    };
    f.initDisplay = function(b) {
        var c = $('.module[moduleId="' + b + '"] .imgList', "#content");
        diaporamaList[b] && "undefined" != typeof diaporamaList[b].timer && clearTimeout(diaporamaList[b].timer);
        var a = {
                tab: [],
                zIndex: 0
            },
            d = $('.module[moduleId="' + b + '"] .imgMenu', "#content");
        d.html("");
        var e = 0;
        c.children().each(function() {
            a.tab.push($(this));
            $(this).attr("data-num", e);
            $(this).hide();
            d.append('<a href="Javascript:;" data-num="' + e + '"></a>');
            e++
        });
        a.display = function(g) {
            if (a.num == g) return !1;
            a.num = g;
            a.zIndex++;
            var b = a.tab[g];
            if (!b) return !1;
            b.css({
                zIndex: a.zIndex,
                left: "100%"
            });
            b.show();
            b.animate({
                left: ""
            }, 500);
            $("a", d).removeClass("selected");
            $('a[data-num="' + g + '"]', d).addClass("selected")
        };
        $("a", d).off("click").on("click", function() {
            var b = $(this).attr("data-num");
            a.display(b);
            a.setTimer(15E3)
        });
        a.setTimer = function(b) {
            b && null != b && "undefined" !=
                b || (b = 5E3);
            a.timer && clearTimeout(a.timer);
            a.timer = setTimeout(function() {
                a.next();
                a.setTimer()
            }, b)
        };
        a.next = function() {
            var b = a.num + 1;
            b >= a.tab.length && (b = 0);
            a.display(b)
        };
        a.display(Math.floor(Math.random() * a.tab.length));
        a.setTimer();
        diaporamaList[b] = a
    }
})(ModuleDiaporama || (ModuleDiaporama = {}));
var ModuleDivider;
(function(a) {
    a.update = function(a, c) {
        var b = $('.module[moduleId="' + a + '"]', "#content");
        $("hr", b).removeClass("s1 s2 s3 w25 w50 w75 w100");
        $("hr", b).addClass("s" + c.style);
        $("hr", b).addClass("w" + c.width)
    }
})(ModuleDivider || (ModuleDivider = {}));
var ModuleImgCard;
(function(c) {
    c.update = function(c, a) {
        var b = $('.module[moduleId="' + c + '"]', "#content");
        $(".text", b).html(a.text);
        var d = a.textPosition;
        d || (d = "bottom");
        if (a.imgUrl) {
            var e = '<a href="Javascript:;">' + ('<img src="' + Application.cdnUrl + a.imgUrl + '">');
            e += "</a>";
            $(".img", b).html(e)
        }
        $(".imgRow", b).removeClass("left right bottom");
        $(".imgRow", b).addClass(d)
    }
})(ModuleImgCard || (ModuleImgCard = {}));
var ModuleImgCol;
(function(d) {
    d.colDisplay = function(a, c, b) {
        a = $('.module[moduleId="' + a + '"]', "#content");
        $('.colList .item[col="' + c + '"]', a).removeClass("show");
        b && $('.colList .item[col="' + c + '"]', a).addClass("show");
        $(".colList", a).attr("nbCol", $(".colList .item.show", a).length)
    };
    d.updateText = function(a, c, b) {
        a = $('.module[moduleId="' + a + '"]', "#content");
        $('.colList .item[col="' + c + '"] .text', a).html(b)
    };
    d.updateImg = function(a, c, b) {
        a = $('.module[moduleId="' + a + '"]', "#content");
        b.imgUrl && (b = "" + ('<a href="Javascript:;" style="background-image:url(' + Application.cdnUrl +
            b.imgUrlMin + ')">'), b += "</a>", $('.colList .item[col="' + c + '"] .imgContent', a).html(b))
    };
    d.editCol = function(a, c) {
        var b = $('.module[moduleId="' + a + '"]', "#content");
        $('.colList .item[col="' + c + '"]', b).off("click").on("click", function() {
            SlideModuleImgCol.editCol(c)
        })
    };
    d.update = function(a, c) {
        var b = $('.module[moduleId="' + a + '"]', "#content");
        $(".text", b).html(c.text);
        var d = c.textPosition;
        d || (d = "bottom");
        if (c.imgUrl) {
            var e = '<a href="Javascript:;">' + ('<img src="' + Application.cdnUrl + c.imgUrl + '">');
            e += "</a>";
            $(".img",
                b).html(e)
        }
        $(".imgRow", b).removeClass("left right bottom");
        $(".imgRow", b).addClass(d)
    }
})(ModuleImgCol || (ModuleImgCol = {}));
var ModuleImgText;
(function(c) {
    c.update = function(c, a) {
        var b = $('.module[moduleId="' + c + '"]', "#content");
        $(".text", b).html(a.text);
        var d = a.textPosition;
        d || (d = "left");
        if (a.imgUrl) {
            var e = '<a href="Javascript:;">' + ('<img src="' + Application.cdnUrl + a.imgUrl + '">');
            e += "</a>";
            $(".img", b).html(e)
        }
        $(".imgRow", b).removeClass("left right w25 w50 w75");
        $(".imgRow", b).addClass(d);
        $(".imgRow", b).addClass("w" + a.textWidth)
    }
})(ModuleImgText || (ModuleImgText = {}));
var ModuleLink;
(function(d) {
    d.update = function(a, b, c) {
        a = $('.module[moduleId="' + a + '"]', "#content");
        $('.item[linkId="' + b + '"] .text', a).html(c.title);
        $('.item[linkId="' + b + '"] .desc', a).html(c.desc);
        $('.item[linkId="' + b + '"]', a).attr("href", c.url);
        $(".noContent", a).slideUp(400, function() {
            $(this).remove()
        })
    };
    d.add = function(a, b) {
        var c = $('.module[moduleId="' + a + '"]', "#content");
        var d = "" + ('<a class="item empty" linkId="' + b + '" href="" target="_blank">') + '<div class="text">Url link</div><div class="desc">Description</div>';
        d +=
            "</div>";
        $(".linkList", c).append(d);
        $(".noContent", c).slideUp(400, function() {
            $(this).remove()
        })
    };
    d.remove = function(a, b) {
        var c = $('.module[moduleId="' + a + '"]', "#content");
        $('.item[linkId="' + b + '"]', c).fadeOut(400, function() {
            $(this).remove()
        })
    };
    d.select = function(a, b, c) {
        a = $('.module[moduleId="' + a + '"]', "#content");
        $('.item[linkId="' + b + '"]', a).removeClass("selected");
        c && $('.item[linkId="' + b + '"]', a).addClass("selected")
    }
})(ModuleLink || (ModuleLink = {}));
var ModuleList;
(function(d) {
    d.update = function(a, c, b) {
        a = $('.module[moduleId="' + a + '"]', "#content");
        $('.item[itemId="' + c + '"] .label', a).html(b.label);
        $('.item[itemId="' + c + '"] .value', a).html(b.value)
    };
    d.add = function(a, c) {
        var b = $('.module[moduleId="' + a + '"]', "#content");
        var d = '<div class="item" itemId="' + c + '"><span class="label c3"></span><span class="value"></span>';
        d += "</div>";
        $(".list", b).append(d);
        $(".noContent", b).slideUp(400, function() {
            $(this).remove()
        })
    };
    d.remove = function(a, c) {
        var b = $('.module[moduleId="' + a + '"]',
            "#content");
        $('.item[itemId="' + c + '"]', b).fadeOut(400, function() {
            $(this).remove()
        })
    };
    d.setStyle = function(a, c) {
        var b = $('.module[moduleId="' + a + '"] .list', "#content");
        b.removeClass("style1");
        b.addClass(c)
    };
    d.select = function(a, c, b) {
        a = $('.module[moduleId="' + a + '"]', "#content");
        $('.item[itemId="' + c + '"]', a).removeClass("selected");
        b && $('.item[itemId="' + c + '"]', a).addClass("selected")
    };
    d.changeOrder = function(a, c, b) {
        a = $('.module[moduleId="' + a + '"] .list', "#content");
        var d = b.item.next().attr("itemId");
        b = b.item.prev().attr("itemId");
        c = $('.item[itemId="' + c + '"]', a).detach();
        d ? $('.item[itemId="' + d + '"]', a).before(c) : $('.item[itemId="' + b + '"]', a).after(c)
    }
})(ModuleList || (ModuleList = {}));
var ModuleLivecamLink;
(function(d) {
    d.update = function(a, c, b) {
        a = $('.module[moduleId="' + a + '"]', "#content");
        b = b.url;
        $('.item[linkId="' + c + '"]', a).attr("href", b)
    };
    d.add = function(a, c) {
        var b = $('.module[moduleId="' + a + '"]', "#content");
        var d = '<a class="item link" linkId="' + c.id + '" href="' + c.url + '" target="_blank">';
        d += '<img src="/static/img' + c.logo + '">';
        d += "</a>";
        $(".list", b).append(d);
        $(".noContent", b).slideUp(400, function() {
            $(this).remove()
        })
    };
    d.remove = function(a, c) {
        var b = $('.module[moduleId="' + a + '"]', "#content");
        $('.item[linkId="' +
            c + '"]', b).fadeOut(400, function() {
            $(this).remove()
        })
    };
    d.select = function(a, c, b) {
        a = $('.module[moduleId="' + a + '"]', "#content");
        $('.item[linkId="' + c + '"]', a).removeClass("selected");
        b && $('.item[linkId="' + c + '"]', a).addClass("selected")
    };
    d.setStyle = function(a, c) {
        var b = $('.module[moduleId="' + a + '"] .list', "#content");
        b.removeClass("round roundCorner square noBg");
        b.addClass(c)
    };
    d.setBgColor = function(a, c) {
        var b = $('.module[moduleId="' + a + '"] .list', "#content");
        b.removeClass("bgWhite bgGrey1 bgGrey2 bgGrey3 bgGrey4 bgBlack bg1 bg2");
        b.addClass(c)
    };
    d.changeOrder = function(a, c, b) {
        a = $('.module[moduleId="' + a + '"] .list', "#content");
        var d = b.item.next().attr("linkId");
        b = b.item.prev().attr("linkId");
        c = $('.item[linkId="' + c + '"]', a).detach();
        d ? $('.item[linkId="' + d + '"]', a).before(c) : $('.item[linkId="' + b + '"]', a).after(c)
    }
})(ModuleLivecamLink || (ModuleLivecamLink = {}));
var ModuleMap;
(function(c) {
    c.addMarker = function(b) {
        b = $(".contentEdit .markerList", "#slide");
        var a = Tool.getId();
        b.append('<div line="' + a + '"></div>');
        $('div[line="' + a + '"]', b).load("/slide/contentEditMapMarker/" + a, {}, function() {});
        return !1
    };
    c.removeMarker = function(b) {
        $('.contentEdit .linkList .item[linkId="' + b + '"]', "#slide").slideUp(300, function() {
            $(this).remove()
        });
        var a = $(".contentEdit .linkList", "#slide").attr("moduleId");
        $('.module[moduleId="' + a + '"] .linkList .item[linkId="' + b + '"]', "#content").fadeOut(300, function() {
            $(this).remove()
        })
    };
    c.editMarker = function(b) {
        $('.contentEdit .markerList .item[markerId="' + b + '"] div.display', "#slide").slideUp();
        $('.contentEdit .markerList .item[markerId="' + b + '"] div.edit', "#slide").slideDown()
    };
    c.saveMarker = function(b) {
        var a = $('.contentEdit .linkList .item[linkId="' + b + '"]', "#slide"),
            c = $(".url input", a).val(),
            d = $(".title input", a).val(),
            e = $(".desc input", a).val();
        $(".display .text", a).html(d ? d : c);
        $(".display .desc", a).html(e);
        a = $(".contentEdit .linkList", "#slide").attr("moduleId");
        a = $('.module[moduleId="' +
            a + '"] .linkList .item[linkId="' + b + '"]', "#content");
        a.attr("href", c);
        $(".text", a).html(d ? d : c);
        $(".desc", a).html(e);
        $('.contentEdit .linkList .item[linkId="' + b + '"] div.display', "#slide").slideDown();
        $('.contentEdit .linkList .item[linkId="' + b + '"] div.edit', "#slide").slideUp()
    }
})(ModuleMap || (ModuleMap = {}));
var ModuleNewsletter;
(function(e) {
    e.send = function() {
        var b = $(".module .contactForm form", "#content"),
            a = b.serializeArray(),
            d = {},
            c;
        for (c in a) d[a[c].name] = a[c].value;
        a = b.attr("action");
        Ajax.send(a, d, b, function(a) {
            "error" == a.result && Tool.loaderBtn("btnSendContactForm", !1, !0)
        });
        Tool.loaderBtn("btnSendContactForm")
    }
})(ModuleNewsletter || (ModuleNewsletter = {}));
var ModulePhoto;
(function(d) {
    d.update = function(d, a) {
        var b = $('.module[moduleId="' + d + '"]', "#content");
        $(".img", b).html("");
        b.removeClass("bgFullWidth");
        b.css("background-image", "none");
        var c = Application.staticUrl + a.defaultImgUrl;
        a.imgUrl && (c = Application.cdnUrl + a.imgUrl);
        var e = "Javascript:;";
        a.link && (e = a.link + '" target="_blank');
        a.fullWidth ? (b.addClass("bgFullWidth"), b.css("background-image", "url(" + c + ")")) : (c = "" + ('<a href="' + e + '">') + ('<img src="' + c + '">') + "</a>", $(".img", b).html(c))
    }
})(ModulePhoto || (ModulePhoto = {}));
var ModulePhotoGallery;
(function(e) {
    e.updateImgWidth = function(a, c) {
        var b = $('.module[moduleId="' + a + '"] .imgList', "#content");
        b.removeClass("small medium large");
        b.addClass(c)
    };
    e.changeOrder = function(a, c, b) {
        a = $('.module[moduleId="' + a + '"] .imgList', "#content");
        var d = b.item.next().attr("imgId");
        b = b.item.prev().attr("imgId");
        c = $('.item[imgId="' + c + '"]', a).detach();
        d ? $('.item[imgId="' + d + '"]', a).before(c) : $('.item[imgId="' + b + '"]', a).after(c)
    };
    e.add = function(a, c, b) {
        a = $('.module[moduleId="' + a + '"]', "#content");
        var d = "";
        d = '<div class="item" imgId="' +
            c + '"><a href="Javascript:;">' + ('<img src="' + Application.cdnUrl + b.imgUrlMin + '">');
        d += "</a>";
        d += "</div>";
        $(".imgList", a).append(d);
        $(".noContent", a).slideUp(400, function() {
            $(this).remove()
        })
    };
    e.remove = function(a, c) {
        var b = $('.module[moduleId="' + a + '"]', "#content");
        $('.item[imgId="' + c + '"]', b).fadeOut(400, function() {
            $(this).remove()
        })
    }
})(ModulePhotoGallery || (ModulePhotoGallery = {}));
var ModuleQuote;
(function(b) {
    b.update = function(b, c) {
        var a = $('.module[moduleId="' + b + '"]', "#content");
        $(".text", a).html(Tool.nl2br(c.text));
        $(".author", a).html(c.author);
        $(".quoteText", a).removeClass("s1 s2 s3");
        $(".quoteText", a).addClass("s" + c.style)
    }
})(ModuleQuote || (ModuleQuote = {}));
var ModuleRss;
(function(a) {
    a.update = function(a, b) {}
})(ModuleRss || (ModuleRss = {}));
var ModuleSocialLink;
(function(e) {
    e.update = function(a, c, b) {
        a = $('.module[moduleId="' + a + '"]', "#content");
        var d = "email" == b.type ? "mailto:" : "";
        d += b.url;
        $('.item[linkId="' + c + '"]', a).attr("href", d)
    };
    e.add = function(a, c) {
        var b = $('.module[moduleId="' + a + '"]', "#content");
        var d = "" + ('<a class="item link" linkId="' + c.id + '" href="' + c.url + '" target="_blank">');
        d += '<i class="' + c.icon + '"></i>';
        d += "</a>";
        $(".list", b).append(d);
        $(".noContent", b).slideUp(400, function() {
            $(this).remove()
        })
    };
    e.remove = function(a, c) {
        var b = $('.module[moduleId="' +
            a + '"]', "#content");
        $('.item[linkId="' + c + '"]', b).fadeOut(400, function() {
            $(this).remove()
        })
    };
    e.select = function(a, c, b) {
        a = $('.module[moduleId="' + a + '"]', "#content");
        $('.item[linkId="' + c + '"]', a).removeClass("selected");
        b && $('.item[linkId="' + c + '"]', a).addClass("selected")
    };
    e.setStyle = function(a, c) {
        var b = $('.module[moduleId="' + a + '"] .list', "#content");
        b.removeClass("round roundCorner square noBg");
        b.addClass(c)
    };
    e.setBgColor = function(a, c) {
        var b = $('.module[moduleId="' + a + '"] .list', "#content");
        b.removeClass("bgWhite bgGrey1 bgGrey2 bgGrey3 bgGrey4 bgBlack bg1 bg2");
        b.addClass(c)
    };
    e.changeOrder = function(a, c, b) {
        a = $('.module[moduleId="' + a + '"] .list', "#content");
        var d = b.item.next().attr("linkId");
        b = b.item.prev().attr("linkId");
        c = $('.item[linkId="' + c + '"]', a).detach();
        d ? $('.item[linkId="' + d + '"]', a).before(c) : $('.item[linkId="' + b + '"]', a).after(c)
    }
})(ModuleSocialLink || (ModuleSocialLink = {}));
var ModuleText;
(function(c) {
    c.update = function(c, a) {
        var b = $('.module[moduleId="' + c + '"]', "#content");
        $(".text", b).html(a.text);
        a.text2 && $(".text2", b).html(a.text2);
        a.columns ? $(".textRow", b).addClass("twoColumns") : $(".textRow", b).removeClass("twoColumns")
    }
})(ModuleText || (ModuleText = {}));
var ModuleVideo;
(function(a) {
    a.update = function(a, b) {
        $('.module[moduleId="' + a + '"]', "#content")
    }
})(ModuleVideo || (ModuleVideo = {}));
var ModuleVideoGallery;
(function(a) {
    a.update = function(d, b) {
        $('.module[moduleId="' + d + '"]', "#content")
    };
    a.add = function(d, b) {
        var c = $('.module[moduleId="' + d + '"]', "#content");
        var a = "" + ('<div class="item empty" videoId="' + b + '">') + ('<img src="' + Application.staticUrl + '/icons/module-5.png">');
        a += '<div class="int"><span></span></div></div>';
        $(".videoList", c).append(a);
        $(".noContent", c).slideUp(400, function() {
            $(this).remove()
        })
    };
    a.remove = function(a, b) {
        var c = $('.module[moduleId="' + a + '"]', "#content");
        $('.item[videoId="' + b + '"]', c).fadeOut(400,
            function() {
                $(this).remove()
            })
    }
})(ModuleVideoGallery || (ModuleVideoGallery = {}));
var Part;
(function(b) {
    b.selectedPart = "";
    b.init = function() {
        if (Application.user.isLog && Application.user.owner) $("div.part", "#content").off("click").on("click", function(a) {
            a = $(this).attr("partName");
            b.selectedPart != a && b.select(a, !0)
        })
    };
    b.save = function(a, b, d) {
        var c = "/part/save/" + a,
            e = "partEdit";
        "options" == a && (c = "/part/saveOptions", e = "editOptions");
        "design" == a && (e = "editDesign");
        Ajax.send(c, {
            data: b
        }, "", function(b) {
            void 0 != b.result && "" != b.result && ("success" == b.result && void 0 != b.hash && "" != b.hash ? ($("." + e + " #dataHash").val(b.hash),
                "function" === typeof d && d(a)) : ("options" == a ? SlideOptions.SlideOptionsTimer && clearInterval(SlideOptions.SlideOptionsTimer) : clearInterval(SlidePart.SlidePartTimer), void 0 != b.msg && "" != b.msg && (Tool.loaderBtn("btnPartSave"), Tool.loaderError("btnPartSave", b.msg))))
        })
    };
    b.updateStatus = function(a, b) {
        var d = "partEdit";
        "options" == a && (d = "editOptions");
        "design" == a && (d = "editDesign");
        var c = $('.part[partName="' + a + '"]');
        b ? (c.slideDown(300, function() {
                Tool.scrollTo($(this), -100)
            }), "footer" == a && $("#mapFooter").slideDown(300)) :
            (c.slideUp(300, function() {
                Tool.scrollTo($(this), -100)
            }), "footer" == a && $("#mapFooter").slideUp(300));
        Ajax.send("/part/saveStatus", {
            partName: a,
            status: b
        }, "", function(a) {
            void 0 != a.result && "" != a.result && "success" == a.result && void 0 != a.hash && "" != a.hash && $("." + d + " #dataHash").val(a.hash)
        })
    };
    b.updateDisplay = function(a) {};
    b.select = function(a, c) {
        b.selectedPart && b.unselect(!1, !0);
        $("div.part", "#content").removeClass("selected");
        $('.part[partName="' + a + '"]').addClass("selected");
        b.scrollTo(a);
        c && SlidePart.edit(a);
        b.selectedPart = a
    };
    b.unselect = function(a, c) {
        a || (a = b.selectedPart);
        b.selectedPart && c && SlidePart.selectedPart == a && b.selectedPart == a && ("options" == a ? SlideOptions.save() : SlidePart.save(a));
        $('.part[partName="' + a + '"]').removeClass("selected");
        "options" == a ? SlideOptions.SlideOptionsTimer && clearInterval(SlideOptions.SlideOptionsTimer) : clearInterval(SlidePart.SlidePartTimer);
        b.selectedPart = !1
    };
    b.scrollTo = function(a) {
        a = $('.part[partName="' + a + '"]');
        Tool.scrollTo(a, -100)
    };
    b.updateEditor = function() {
        $(".part-content .module .editor a.up",
            "#content").show();
        $(".part-content .module .editor a.down", "#content").show();
        $(".part-content .module:first .editor a.up", "#content").hide();
        $(".part-content .module:last .editor a.down", "#content").hide()
    };
    b.setBackground = function(a, b) {
        var c = $('.part[partName="' + a + '"]', "#content");
        c.removeClass("bgWhite bgGrey1 bgGrey2 bgGrey3 bgGrey4 bgBlack bg1 bg2");
        c.addClass(b)
    };
    b.setPaddingHeight = function(a, b) {
        var c = $('.part[partName="' + a + '"]', "#content");
        c.removeClass("paddingSmall paddingMedium paddingLarge");
        var f = "padding" + b.charAt(0).toUpperCase() + b.slice(1);
        c.addClass(f)
    }
})(Part || (Part = {}));
var PartBio;
(function(c) {
    c.update = function(c, b) {
        var a = $('.part[partName="' + c + '"]', "#content");
        $("h2", a).html(b.title);
        b.displayTitle ? $("h2", a).slideDown() : $("h2", a).slideUp();
        $(".presentation", a).html(b.presentation);
        b.displayPresentation ? $(".presentation", a).slideDown() : $(".presentation", a).slideUp()
    }
})(PartBio || (PartBio = {}));
var PartComment;
(function(c) {
    function e(a, d) {
        var b = $('.part[partName="' + a + '"]', "#content");
        b.prepend('<div class="loading-layer">' + Tool.loader(!0) + "</div>");
        b.load("/comment/update/", function() {
            Init.all()
        })
    }
    c.updateHeader = function(a, d) {
        var b = $('.part[partName="' + a + '"]', "#content");
        $(".title h2", b).html(d.title);
        d.displayTitle ? $("h2", b).slideDown() : $("h2", b).slideUp();
        $(".presentation .txt", b).html(d.presentation);
        d.displayPresentation ? $(".presentation .txt", b).slideDown() : $(".presentation .txt", b).slideUp()
    };
    c.newLayer =
        function(a) {
            $.fancybox.open([{
                src: Application.prefixLang + "/comment/newLayer/" + a,
                type: "ajax",
                opts: {
                    onComplete: function() {
                        Init.action();
                        var a = window.location.href;
                        $('.modal.feedback input[name="url"]').val(a)
                    }
                }
            }], {
                loop: !1,
                closeClickOutside: !1,
                touch: !1
            })
        };
    c.saveDone = function(a) {
        $(".modal.comment").length && ($(".modal.comment form").slideUp(), $(".modal.comment .sendDone").slideDown(), e("comment", a), setTimeout(function() {
            $.fancybox.close()
        }, 3E3))
    };
    c.update = e;
    c.remove = function(a) {
        Ajax.send("/comment/remove/" +
            a, {}, "",
            function() {
                $('.item[commentid="' + a + '"]', ".part.comment").slideUp(500, function() {
                    this.remove()
                });
                $.fancybox.close()
            })
    };
    c.removeLayer = function(a) {
        $.fancybox.open([{
            src: "/comment/displayRemoveComment/" + a,
            type: "ajax",
            opts: {
                onComplete: function() {
                    Init.action()
                }
            }
        }], {
            loop: !1,
            closeClickOutside: !0,
            touch: !1
        })
    }
})(PartComment || (PartComment = {}));
var PartFooter;
(function(c) {
    var d = !1,
        f = !1;
    c.init = function(a) {
        if ($("#mapFooter").is(":visible") && !d || a) {
            a = $("#mapFooter");
            var b = a.attr("mapZoom");
            b = c.getZoomLevel(b);
            var e = a.attr("mapLat");
            a = a.attr("mapLon");
            document.getElementById("mapFooter");
            d = L.map("mapFooter").setView([e, a], b);
            L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(d);
            f = L.marker([e, a], {}).addTo(d);
            f.bindPopup('<div class="tooltipmap">' + $('.part[partName="footer"] .inner .infos',
                "#content").html() + "</div>");
            if (Application.user.isLog) d.on("click", function(a) {
                $("div.part.footer", "#content").click()
            })
        }
    };
    c.markerUpdate = function(a) {
        f.setLatLng(a);
        d.panTo(a)
    };
    c.display = function(a, b) {
        var c = $('.part[partName="footer"]', "#content");
        b ? $("." + a, c).slideDown() : $("." + a, c).slideUp()
    };
    c.updateContent = function(a, b) {
        var c = $('.part[partName="footer"]', "#content");
        "email" == a && (b = '<a href="mailto:' + b + '" class="link">' + b + "</a>");
        "website" == a && (b = '<a href="' + b + '" target="_blank" class="link">' +
            b + "</a>");
        $("." + a, c).html(b)
    };
    c.mapUpdate = function(a) {
        var b = $('.part[partName="footer"]', "#content");
        if (!a.status) return $("#mapFooter").slideUp(), !1;
        $("#mapFooter").slideDown(300, function() {
            d || c.init(!0)
        });
        var e = $("#mapFooter").detach();
        "top" == a.mapPosition && b.before(e);
        "bottom" == a.mapPosition && b.after(e);
        "left" == a.mapPosition && $(".inner .infos", b).before(e);
        "right" == a.mapPosition && $(".inner .infos", b).after(e);
        b.removeClass("mapLeft mapRight mapBottom mapTop");
        a = "map" + a.mapPosition.charAt(0).toUpperCase() +
            a.mapPosition.slice(1);
        b.addClass(a);
        c.mapCenter()
    };
    c.mapCenter = function() {
        if (f) {
            var a = f.getLatLng();
            c.map.panTo(a)
        }
    };
    c.mapZoom = function(a) {
        a = c.getZoomLevel(a);
        d.setZoom(a)
    };
    c.getZoomLevel = function(a) {
        (a = {
            small: 4,
            medium: 7,
            large: 10
        }[a]) || (a = 7);
        return a
    }
})(PartFooter || (PartFooter = {}));
var PartHeader;
(function(c) {
    c.update = function(a, b) {};
    c.profileDisplay = function(a) {
        var b = $('.part[partName="header"]', "#content");
        a ? $(".avatar", b).slideDown() : $(".avatar", b).slideUp()
    };
    c.updateProfile = function(a) {
        var b = $('.part[partName="header"]', "#content");
        a = '<img src="' + (a.cdnUrl + a.imgUrlMin + "?time=" + (new Date).getTime()) + '"/>';
        $(".avatar", b).html(a)
    };
    c.updateProfilePosition = function(a) {
        var b = $('.part[partName="header"]', "#content");
        b.removeClass("left right center top");
        b.addClass(a)
    };
    c.updateProfileStyle = function(a) {
        var b =
            $('.part[partName="header"] .avatar', "#content");
        b.removeClass("round square roundCorner");
        b.addClass(a)
    };
    c.updateNamePosition = function(a) {
        var b = $('.part[partName="header"]', "#content");
        b.removeClass("nameLeft nameRight nameBottom nameTop");
        var c = "name" + a.charAt(0).toUpperCase() + a.slice(1);
        b.addClass(c);
        c = $(".username", b).detach();
        "top" == a || "left" == a ? $(".avatar", b).before(c) : $(".avatar", b).after(c)
    };
    c.updateName = function(a) {
        var b = $('.part[partName="header"] .inner', "#content");
        $("h1", b).html(a.name);
        $(".baseline", b).html(a.baseline);
        b.removeClass("left", "right", "center", "top");
        b.addClass(a.profilePosition)
    };
    c.nameDisplay = function(a) {
        var b = $('.part[partName="header"]', "#content");
        a ? $(".username", b).slideDown() : $(".username", b).slideUp()
    };
    c.updateHeight = function(a) {
        var b = $('.part[partName="header"]', "#content");
        b.removeClass("heightSmall heightMedium heightLarge");
        a = "height" + a.charAt(0).toUpperCase() + a.slice(1);
        b.addClass(a)
    };
    c.updateBackground = function(a) {
        var b = $('.part[partName="header"]', "#content");
        a = a.cdnUrl + a.imgUrl + "?time=" + (new Date).getTime();
        b.css({
            backgroundImage: "url(" + a + ")"
        })
    }
})(PartHeader || (PartHeader = {}));
var Slide;
(function(a) {
    function g() {
        $("#" + a.displayed, "#slide").clearQueue().animate({
            right: -500
        }, 550, "swing");
        $("#content").clearQueue().animate({
            paddingRight: 0
        }, 400, "swing", function() {
            Social.init();
            $("#slide").hide()
        });
        $("#btnUp").clearQueue().animate({
            right: 25
        }, 400, "swing");
        Module.unselect();
        Part.unselect();
        a.displayed = !1
    }

    function h(b, c, d) {
        $(".menu a", ".header").removeClass("active");
        if (a.displayed) {
            if (a.displayed == b) {
                g();
                return
            }
            $("#" + a.displayed, "#slide").delay(200).clearQueue().animate({
                right: -500
            })
        }
        $("#slide").show();
        $("#" +
            b, "#slide").css({
            zIndex: 100
        });
        $("#" + b, "#slide").clearQueue().animate({
            right: 0
        }, 400, "swing", function() {
            Social.init()
        });
        var e = 450;
        windowWidth = $(window).width();
        windowWidth < e && (e = windowWidth);
        $("#content").clearQueue().delay(100).animate({
            paddingRight: e
        }, 500, "swing");
        $("#btnUp").clearQueue().animate({
            right: e + 25
        }, 400, "swing");
        a.displayed = b;
        $('.menu a[data-js-param="' + b + '"]', ".header").addClass("active");
        c || ("contacts" == b && (c = "contact"), "editor" == b && (c = "content"), "account" == b && (c = "account"), "social" ==
            b && (c = "social"));
        k(b, c, d)
    }

    function k(b, c, d) {
        Module.selectedId && Module.unselect(!1, !0);
        Part.selectedPart && Part.unselect(!1, !0);
        if (a.displayed != b) return h(b, c, d), !1;
        var e = $(".content", "#" + b);
        e.html(q);
        e.load("/slide/" + c, {}, function() {
            "function" === typeof d && d();
            r(b, c)
        })
    }

    function r(b, c) {
        var a = $(".content", "#" + b);
        a.perfectScrollbar();
        a.hide();
        a.fadeIn();
        Init.action();
        $(".head-menu a.button", "#" + b).removeClass("active");
        $('.head-menu a[tag$="' + c + '"]', "#" + b).addClass("active");
        $(".part > .title", a).click(function() {
            $("a",
                $(this)).hasClass("min") ? ($(".row", $(this).parent()).stop().slideUp(), $("a", $(this)).removeClass("min").addClass("max")) : ($(".row", $(this).parent()).stop().slideDown(), $("a", $(this)).removeClass("max").addClass("min"))
        });
        a = c.split("/");
        l(b + "/" + a[0], a[1])
    }

    function l(b, a) {
        "contacts/contact" == b && m();
        "account/accountEdit" == b && n();
        "account/options" == b && p()
    }

    function m() {
        $("#contacts #callPermission", "#slide").change(function() {
            var b = $(this).is(":checked");
            Account.callPermissionSave(b ? 1 : 0)
        });
        Wpn.layerAsk()
    }

    function n() {
        $("#privateDataSave", "#slide").click(function() {
            var b = $("#slide"),
                a = {};
            a.firstname = $("#firstname", b).val();
            a.lastname = $("#lastname", b).val();
            a.address1 = $("#address1", b).val();
            a.address2 = $("#address2", b).val();
            a.zipcode = $("#zipcode", b).val();
            a.city = $("#city", b).val();
            a.country = $("#country", b).val();
            a.phone = $("#phone", b).val();
            a.email = $("#email", b).val();
            Account.privateDataSave(a, b, function() {
                Tool.loaderOk("privateDataSave")
            });
            Tool.loaderBtn("privateDataSave");
            return !1
        })
    }

    function p() {
        var b =
            "granted" == Notification.permission ? !0 : !1;
        $("#pushNotifs").prop("checked", b);
        $("#pushNotifs").change(function() {
            $(this).is(":checked") ? Wpn.subscribe() : Wpn.unsubscribe()
        })
    }
    a.displayed = !1;
    a.type = "";
    var q = Tool.loader(),
        t = Tool.loader(!0);
    a.init = function() {
        if (!$("#slide").length) return !1;
        "boolean" == typeof Application.openSlide && Application.openSlide && (setTimeout(function() {
            a.displayed || a.contentList()
        }, 500), Application.openSlide = !1);
        "boolean" == typeof Application.displayTutorial && Application.displayTutorial &&
            (Domain.tutorial(), Application.displayTutorial = !1);
        $(".emailValidation").length && setTimeout(function() {
            $(".emailValidation").slideDown()
        }, 3E4)
    };
    a.close = g;
    a.display = h;
    a.loadContent = k;
    a.initContent = l;
    a.contentList = function() {
        a.loadContent("editor", "content", function() {
            $(".userModuleList .item", "#slide").each(function() {
                var b = $(this).attr("moduleId"),
                    a = $(this).attr("partName"),
                    d = $(this);
                $(".bg, .name", $(this)).on("click", function() {
                    b && Module.select(b, !0);
                    a && Part.select(a, !0)
                });
                $(".active", $(this)).on("change",
                    function() {
                        var c = $(this).is(":checked") ? 1 : 0;
                        c ? d.removeClass("off") : d.addClass("off");
                        b && Module.updateStatus(b, c);
                        a && Part.updateStatus(a, c)
                    })
            })
        })
    };
    a.moduleList = function(b) {
        a.loadContent("editor", "contentAdd", function() {
            b || (Module.newModule = {})
        })
    };
    a.socialNetwork = function() {
        var b = $(".module.socialHub", "#content").attr("moduleId");
        b ? Module.select(b, !0) : Ajax.send("/module/create/1")
    };
    a.updateFullWebsite = function() {
        var b = $(window).height();
        $("#content").html('<div><div style="height:' + b + 'px;">' + t + "</div></div>");
        return $.ajax("/domain/update/fullContent").done(function(b) {
            $("#content").html("<div>" + b + "</div>");
            Init.all();
            PartFooter.init(!0);
            Tool.scrollTo($(".header", "#content"))
        })
    };
    a.account = function() {
        a.loadContent("account", "account", function() {
            setPosition || (Module.newModule = {})
        })
    };
    a.initUploader = function(b, a, d) {
        a = new plupload.Uploader({
            runtimes: "html5,html4",
            multi_selection: !1,
            browse_button: b,
            url: a,
            resize: {
                width: 2E3,
                height: 1500,
                quality: 90
            },
            filters: {
                max_file_size: "10mb",
                mime_types: [{
                    title: "Image files",
                    extensions: "jpg,gif,png,jpeg"
                }]
            },
            init: {
                PostInit: function() {},
                FilesAdded: function(a, c) {
                    this.start();
                    $("#" + b).after('<div class="uploadLoader"><span></span></div>');
                    $("#" + b).hide()
                },
                UploadProgress: function(a, b) {
                    $("span", ".uploadLoader").animate({
                        width: b.percent + "%"
                    })
                },
                FileUploaded: function(a, c, f) {
                    JSON.parse(f.response);
                    $("#" + b).show();
                    $(".uploadLoader").remove();
                    "function" == typeof d && d(a, c, f)
                },
                Error: function(a, b) {}
            }
        });
        a.init();
        return a
    };
    a.initSlideContentEditMap = function(a) {
        var b = $('.part-content .module[moduleId="' +
            a + '"]', "#content");
        $(".mapObj", b).addClass("selected");
        $(".contentEdit .edit-map #btnAddMarker", "#slide").click(function(b) {
            var c = $(".contentEdit .markerList", "#slide"),
                d = !1;
            "Object" != typeof b.latLng && (d = new google.maps.LatLng(b.lat, b.lng));
            var f = Tool.getId(),
                g = "map" + a;
            c.append('<div line="' + f + '">' + Tool.loader() + "</div>");
            $('div[line="' + f + '"]', c).load("/slide/contentEditMapMarker/" + f, {}, function() {
                Map.addMarker(g, d, f)
            });
            $(this).hide()
        })
    };
    a.disableStandaloneSocialNetwork = function(b) {
        $.ajax("/social/setStandalone/" +
            b + "?standalone=0").done(function() {
            a.updateFullWebsite();
            a.loadContent("editor", "content")
        })
    };
    a.initSlideContact = m;
    a.initSlideHist = function() {};
    a.initSlideLive = function() {};
    a.initSlideAccount = function() {};
    a.initSlideAccountEdit = n;
    a.initSlideOptions = p;
    a.initSlideStats = function() {};
    a.emailAliasSave = function() {
        var a = $("#slide .emailAlias"),
            c = {};
        c.alias = $("#alias", a).val();
        c.redirectTo = $("#redirectTo", a).val();
        Account.emailAliasSave(c, a, function() {
            Tool.loaderOk("emailAliasSave")
        });
        Tool.loaderBtn("emailAliasSave");
        return !1
    };
    a.emailAliasDelete = function(a) {
        var b = {};
        b.alias = a;
        Account.emailAliasDelete(b, "", function() {
            Tool.loaderOk("emailAliasDelete")
        });
        Tool.loaderBtn("emailAliasDelete");
        return !1
    }
})(Slide || (Slide = {}));
var SlideAccount;
(function(c) {
    c.init = function() {};
    c.domainNameSave = function(a, b, d) {
        b = $("#slide");
        a = {};
        a.domain = $("#domainName", b).val();
        Tool.loaderBtn("btnAccountSave");
        Ajax.send("/account/domainNameSave", a, b, function(a) {
            "error" == a.result && (Tool.loaderBtn("btnAccountSave", !1, !0), "object" == typeof a.error && a.error.domain && $("#domainName", "#slide").val(a.error.domain));
            "success" == a.result && (Tool.loaderOk("btnAccountSave"), setTimeout(function() {
                Slide.loadContent("account", "account")
            }, 2E3))
        })
    };
    c.requestDomain = function() {
        var a =
            $("#slide");
        Tool.loaderBtn("btnRequest");
        Ajax.send("/account/requestDomain", {}, a, function(a) {
            "error" == a.result && Tool.loaderBtn("btnRequest", !1, !0)
        })
    };
    c.addressSave = function() {
        var a = $("#slide"),
            b = $("#slide .editAddress").serializeObject();
        Tool.loaderBtn("btnAccountSave");
        Ajax.send("/account/addressSave", b, a, function(a) {
            "error" == a.result && Tool.loaderBtn("btnAccountSave", !1, !0)
        })
    };
    c.phoneSave = function() {
        var a = $("#slide"),
            b = $("#slide .editPhone").serializeObject();
        Tool.loaderBtn("btnPhoneSave");
        Ajax.send("/account/phoneSave",
            b, a,
            function(a) {
                "error" == a.result && Tool.loaderBtn("btnPhoneSave", !1, !0)
            })
    };
    c.phoneCodeSave = function() {
        var a = $("#slide"),
            b = $("#slide .editPhoneCode").serializeObject();
        Tool.loaderBtn("btnPhoneSave");
        Ajax.send("/account/phoneCodeSave", b, a, function(a) {
            "error" == a.result && Tool.loaderBtn("btnPhoneSave", !1, !0)
        })
    };
    c.emailSave = function() {
        var a = $("#slide"),
            b = $("#slide .editEmail").serializeObject();
        Tool.loaderBtn("btnEmailSave");
        Ajax.send("/account/emailSave", b, a, function(a) {
            "error" == a.result && Tool.loaderBtn("btnEmailSave", !1, !0)
        })
    };
    c.langSave = function() {
        var a = $("#slide"),
            b = $("#slide .editLanguage").serializeObject();
        Tool.loaderBtn("btnLangSave");
        Ajax.send("/account/langSave", b, a, function(a) {
            "error" == a.result && Tool.loaderBtn("btnLangSave", !1, !0)
        })
    }
})(SlideAccount || (SlideAccount = {}));
var SlideDesign;
(function(b) {
    b.init = function() {
        $('[name="width"]', "#slide .editDesign").on("change", function() {
            var a = $(this).val();
            b.setWidth(a)
        });
        $('[name="colorId"]', "#slide .editDesign").on("change", function() {
            var a = $(this).val();
            b.setColor(a)
        });
        $('[name="layoutId"]', "#slide .editDesign").on("change", function() {
            var a = $(this).val();
            b.setLayout(a)
        });
        $('[name="backgroundColor"]', "#slide .editDesign").on("change", function() {
            var a = $(this).val();
            b.setBackground(a)
        });
        $('[name="border"]', "#slide .editDesign").on("change", function() {
            var a =
                $(this).val();
            b.setBorder(a)
        });
        $('[name="borderColor"]', "#slide .editDesign").on("change", function() {
            var a = $(this).val();
            b.setBorderColor(a)
        });
        $('[name="shadow"]', "#slide .editDesign").on("change", function() {
            var a = $(this).val();
            b.setShadow(a)
        });
        void 0 !== b.SlideDesignTimer && !1 !== b.SlideDesignTimer && clearInterval(b.SlideDesignTimer);
        b.SlideDesignTimer = setInterval(function() {}, 2E4)
    };
    b.edit = function() {
        Slide.loadContent("editor", "design", function() {
            b.init()
        })
    };
    b.setColor = function(a) {
        $(".colorExplain .schema .item",
            "#slide").removeClass(function(a, b) {
            return (b.match(/(^|\s)shade\S+/g) || []).join(" ")
        });
        $(".colorExplain .schema .item", "#slide").addClass("shade" + a);
        $("#content").removeClass(function(a, b) {
            return (b.match(/(^|\s)shade\S+/g) || []).join(" ")
        });
        $("#content").addClass("shade" + a);
        $(".editDesign .row.options").removeClass(function(a, b) {
            return (b.match(/(^|\s)shade\S+/g) || []).join(" ")
        });
        $(".editDesign .row.options").addClass("shade" + a);
        b.save()
    };
    b.setLayout = function(a) {
        $("#content").removeClass(function(a,
            b) {
            return (b.match(/(^|\s)layout\S+/g) || []).join(" ")
        });
        $("#content").addClass("layout" + a);
        b.save();
        Slide.updateFullWebsite()
    };
    b.setWidth = function(a) {
        var c = $("#content"),
            d = $(".layoutList", "#slide .editDesign");
        c.removeClass("fullWidth widthSmall widthMedium widthLarge");
        d.removeClass("fullWidth widthSmall widthMedium widthLarge");
        "fullWidth" != a ? ($(".optionBorder", "#slide .editDesign").slideDown(), a = "width" + a.charAt(0).toUpperCase() + a.slice(1), c.addClass(a), d.addClass(a)) : ($(".optionBorder", "#slide .editDesign").slideUp(),
            c.addClass(a));
        b.save()
    };
    b.setBackground = function(a) {
        var c = $("#content");
        c.removeClass("bgWhite bgGrey1 bgGrey2 bgGrey3 bgGrey4 bgBlack bg1 bg2");
        c.addClass(a);
        b.save()
    };
    b.setBorder = function(a) {
        var c = $("#content"),
            d = $(".layoutList", "#slide .editDesign");
        c.removeClass("borderSmall borderMedium borderLarge");
        d.removeClass("borderSmall borderMedium borderLarge");
        var e = "border" + a.charAt(0).toUpperCase() + a.slice(1);
        c.addClass(e);
        d.addClass(e);
        a ? $(".optionBorderColor", "#slide .editDesign").slideDown() :
            $(".optionBorderColor", "#slide .editDesign").slideUp();
        b.save()
    };
    b.setBorderColor = function(a) {
        var c = $("#content"),
            d = $(".layoutList", "#slide .editDesign");
        c.removeClass(function(a, b) {
            return (b.match(/(^|\s)borderColor\S+/g) || []).join(" ")
        });
        d.removeClass(function(a, b) {
            return (b.match(/(^|\s)borderColor\S+/g) || []).join(" ")
        });
        a = "borderColor" + a.charAt(0).toUpperCase() + a.slice(1);
        c.addClass(a);
        d.addClass(a);
        b.save()
    };
    b.setShadow = function(a) {
        var c = $("#content"),
            d = $(".layoutList", "#slide .editDesign");
        c.removeClass(function(a,
            b) {
            return (b.match(/(^|\s)shadow\S+/g) || []).join(" ")
        });
        d.removeClass(function(a, b) {
            return (b.match(/(^|\s)shadow\S+/g) || []).join(" ")
        });
        a && (a = "shadow" + a.charAt(0).toUpperCase() + a.slice(1), c.addClass(a), d.addClass(a));
        b.save()
    };
    b.save = function() {
        var a = $("#slide .editDesign").serializeObject();
        $("input:checkbox", $("#slide .editDesign")).each(function() {
            $(this).is(":checked") || (a[$(this).attr("name")] = 0)
        });
        a.partName = "design";
        Part.save("design", a)
    }
})(SlideDesign || (SlideDesign = {}));
var SlideModule;
(function(b) {
    b.moduleSelected = !1;
    b.init = function() {
        SlideModuleText.init();
        SlideModulePhoto.init();
        SlideModuleDiaporama.init();
        SlideModuleImgText.init();
        SlideModuleImgCard.init();
        SlideModuleRss.init();
        SlideModuleBtn.init();
        SlideModuleVideo.init();
        SlideModuleVideoGallery.init();
        SlideModuleDivider.init();
        SlideModuleLink.init();
        SlideModulePhotoGallery.init();
        SlideModuleContactForm.init();
        SlideModuleSocialLink.init();
        SlideModuleImgCol.init();
        SlideModuleQuote.init();
        SlideModuleSocialHub.init();
        SlideModuleList.init();
        SlideModuleLivecamLink.init();
        $("#headerTitle", "#slide .contentEdit").on("keyup", function(a) {
            a = $("#slide .contentEdit").attr("moduleId");
            var b = $(this).val();
            Module.updateTitle(a, b);
            b ? Module.displayTitle(a, !0) : Module.displayTitle(a, !1)
        });
        $("#headerTitle", "#slide .contentEdit").on("focus", function(a) {
            a = $("#slide .contentEdit").attr("moduleId");
            Module.scrollTo(a)
        });
        $("#displayTitle", "#slide .contentEdit").on("change.display", function() {
            var a = $("#slide .contentEdit").attr("moduleId");
            $(this).is(":checked") ?
                Module.displayTitle(a, !0) : Module.displayTitle(a, !1);
            Module.scrollTo(a)
        });
        $("#headerDescription", "#slide .contentEdit").on("keyup", function(a) {
            a = $("#slide .contentEdit").attr("moduleId");
            var b = $(this).val();
            Module.updateDescription(a, b);
            b ? Module.displayDescription(a, !0) : Module.displayDescription(a, !1)
        });
        $("#headerDescription", "#slide .contentEdit").on("focus", function(a) {
            a = $("#slide .contentEdit").attr("moduleId");
            Module.scrollTo(a)
        });
        $("#displayDescription", "#slide .contentEdit").on("change.display",
            function() {
                var a = $("#slide .contentEdit").attr("moduleId");
                $(this).is(":checked") ? Module.displayDescription(a, !0) : Module.displayDescription(a, !1);
                Module.scrollTo(a)
            });
        $("#moduleStatus", "#slide .contentEdit").on("change", function() {
            var a = $(this).is(":checked") ? 1 : 0,
                b = $("#slide .contentEdit").attr("moduleId");
            Module.updateStatus(b, a);
            a ? $("#moduleEditContent", "#slide .contentEdit").slideDown() : $("#moduleEditContent", "#slide .contentEdit").slideUp()
        });
        $('[name="options[bgColor]"]', "#slide .contentEdit").on("change.bg",
            function() {
                var a = $("#slide .contentEdit").attr("moduleId"),
                    b = $(this).val();
                Module.setBackground(a, b)
            });
        $('[name="options[paddingHeight]"]', "#slide .contentEdit").on("change.paddingHeight", function() {
            var a = $("#slide .contentEdit").attr("moduleId"),
                b = $(this).val();
            Module.setPaddingHeight(a, b)
        });
        void 0 != b.SlideModuleTimer && 0 != b.SlideModuleTimer && clearInterval(b.SlideModuleTimer);
        b.SlideModuleTimer = setInterval(function() {
                var a = $("#slide .contentEdit").attr("moduleId");
                Module.selectedId == a && b.autoSave(a)
            },
            2E4)
    };
    b.edit = function(a) {
        Slide.loadContent("editor", "moduleEdit/" + a, function() {
            b.init()
        });
        b.moduleSelected = a
    };
    b.save = function(a, b) {
        var c = $("#slide .contentEdit").serializeObject();
        c.moduleId = a;
        c.displayTitle || (c.title = "");
        c.displayDescription || (c.description = "");
        Module.save(a, c, b)
    };
    b.saveAndRedirect = function(a) {
        b.save(a, function(a) {
            Module.updateDisplay(a);
            Module.unselect(!1, !1);
            Slide.contentList()
        })
    };
    b.autoSave = function(a) {
        b.save(a, function() {
            Tool.loaderBtn("btnModuleSave");
            Tool.loaderOk("btnModuleSave")
        })
    }
})(SlideModule ||
    (SlideModule = {}));
var SlideModuleBtn;
(function(a) {
    a.init = function() {
        if (!$("#slide .moduleBtn").length) return !1;
        $("#btnText", "#slide .moduleBtn").on("keyup", function() {
            a.update()
        });
        $("#btnUrl", "#slide .moduleBtn").on("keyup", function() {
            a.update()
        })
    };
    a.update = function() {
        var b = $("#slide .contentEdit"),
            a = $(".contentEdit", "#slide").attr("moduleId");
        b = {
            text: $('input[name="options[text]"]', b).val(),
            url: $('input[name="options[url]"]', b).val(),
            target: $('select[name="options[target]"]', b).val()
        };
        ModuleBtn.update(a, b)
    };
    a.remove = function(a) {
        $('.list .item[rssId="' +
            a + '"]', "#slide .moduleRss").slideUp(300, function() {
            $(this).remove()
        })
    }
})(SlideModuleBtn || (SlideModuleBtn = {}));
var SlideModuleContactForm;
(function(b) {
    b.init = function() {
        var a = $("#slide .moduleContactForm");
        if (!$("#slide .moduleContactForm").length) return !1;
        $("#contactName", a).change(function() {
            b.update()
        });
        $("#contactCompany", a).change(function() {
            b.update()
        });
        $("#contactEmail", a).change(function() {
            b.update()
        });
        $("#contactPhone", a).change(function() {
            b.update()
        });
        $("#contactSubject", a).change(function() {
            b.update()
        })
    };
    b.update = function() {
        var a = $("#slide .contentEdit"),
            b = $(".contentEdit", "#slide").attr("moduleId");
        a = {
            name: $('input[name="options[name]"]',
                a).is(":checked"),
            email: $('input[name="options[email]"]', a).is(":checked"),
            company: $('input[name="options[company]"]', a).is(":checked"),
            phone: $('input[name="options[phone]"]', a).is(":checked"),
            subject: $('input[name="options[subject]"]', a).is(":checked"),
            msgSend: $('textarea[name="options[msgSend]"]', a).val()
        };
        ModuleContactForm.update(b, a)
    }
})(SlideModuleContactForm || (SlideModuleContactForm = {}));
var SlideModuleDiaporama;
(function(e) {
    e.init = function() {
        if (!$("#slide .moduleDiaporama").length) return !1;
        Slide.initUploader("btnPhotoUpload", "/slide/photoUpload/", function(a, b, f) {
            a = JSON.parse(f.response);
            e.add(a)
        });
        $('[name="options[height]"]', "#slide .moduleDiaporama").change(function() {
            var a = $(".contentEdit", "#slide").attr("moduleId"),
                b = $(this).val();
            ModuleDiaporama.updateHeight(a, b)
        });
        $('[name="options[fullWidth]"]', "#slide .moduleDiaporama").on("change.fullWidth", function() {
            var a = $(".contentEdit", "#slide").attr("moduleId"),
                b = $(this).is(":checked");
            ModuleDiaporama.updateWidth(a, b)
        })
    };
    e.edit = function(a) {
        var b = $("#slide .moduleDiaporama");
        $('.list .item[imgId="' + a + '"] .display', b).fadeOut();
        $('.list .item[imgId="' + a + '"] .edit', b).delay(500).fadeIn({
            start: function() {
                $('.list .item[imgId="' + a + '"]', b).addClass("edit")
            }
        });
        $('.list .item[imgId!="' + a + '"]', b).fadeOut();
        $(".actions", b).fadeOut()
    };
    e.remove = function(a) {
        var b = $(".contentEdit", "#slide").attr("moduleId");
        $('.list .item[imgId="' + a + '"]', "#slide .moduleDiaporama").fadeOut(300,
            function() {
                $(this).remove()
            });
        ModuleDiaporama.remove(b, a);
        $(".list .item", "#slide .moduleDiaporama").fadeIn();
        $(".list .item .display", "#slide .moduleDiaporama").fadeIn();
        $(".actions", "#slide .moduleDiaporama").fadeIn()
    };
    e.add = function(a) {
        var b = $(".contentEdit", "#slide").attr("moduleId"),
            e = $(".list", "#slide .moduleDiaporama"),
            c = new Date;
        c = Date.now() + "" + c.getMilliseconds();
        var d = '<div class="item" imgId="' + c + '">' + ('<a href="Javascript:SlideModulePhotoGallery.edit(' + c + ')" class="display">') + ('<input type="hidden" value="' +
            a.imgId + '" name="options[imgList][item' + c + '][imgId]">');
        d += '<input type="hidden" value="' + a.imgUrl + '" name="options[imgList][item' + c + '][imgUrl]">';
        d += '<input type="hidden" value="' + a.imgUrlMin + '" name="options[imgList][item' + c + '][imgUrlMin]">';
        d = d + ('<input type="hidden" value="" name="options[imgList][item' + c + '][imgLegend]">') + ('<img src="' + Application.cdnUrl + a.imgUrlMin + '">');
        d = d + '</a><div class="edit" style="display:none;">' + ('<img src="' + Application.cdnUrl + a.imgUrlMin + '">');
        d = d + "<label>Text</label>" +
            ('<input type="text" value="" name="options[imgList][item' + c + '][imgLegend]">') + ('<a href="Javascript:SlideModulePhotoGallery.save(' + c + ')" class="save"><i class="fa fa-check"></i></a>') + ('<a href="Javascript:SlideModulePhotoGallery.remove(' + c + ')" class="remove"><i class="fa fa-times"></i></a>') + "</div></div>";
        e.append(d);
        ModuleDiaporama.add(b, c, a)
    };
    e.save = function(a) {
        var b = $("#slide .moduleDiaporama");
        $(".contentEdit", "#slide").attr("moduleId");
        $('.list .item[imgId="' + a + '"] .edit', b).fadeOut();
        $(".list .item",
            b).delay(500).fadeIn();
        $(".list .item .display", b).delay(500).fadeIn();
        $('.list .item[imgId="' + a + '"]', "#slide .moduleDiaporama").removeClass("edit");
        $(".actions", b).fadeIn()
    }
})(SlideModuleDiaporama || (SlideModuleDiaporama = {}));
var SlideModuleDivider;
(function(c) {
    function a() {
        var b = $("#slide .contentEdit"),
            a = $(".contentEdit", "#slide").attr("moduleId");
        b = {
            style: $('[name="options[style]"]:checked', b).val(),
            width: $('[name="options[width]"]:checked', b).val()
        };
        ModuleDivider.update(a, b)
    }
    c.init = function() {
        if (!$("#slide .moduleDivider").length) return !1;
        $('[name="options[style]"]', "#slide .moduleDivider").on("change", function() {
            a()
        });
        $('[name="options[width]"]', "#slide .moduleDivider").on("change", function() {
            a()
        })
    };
    c.update = a
})(SlideModuleDivider || (SlideModuleDivider = {}));
var SlideModuleContactForm;
(function(b) {
    b.init = function() {
        var a = $("#slide .moduleContactForm");
        if (!$("#slide .moduleContactForm").length) return !1;
        $("#contactName", a).change(function() {
            b.update()
        });
        $("#contactCompany", a).change(function() {
            b.update()
        });
        $("#contactEmail", a).change(function() {
            b.update()
        });
        $("#contactPhone", a).change(function() {
            b.update()
        });
        $("#contactSubject", a).change(function() {
            b.update()
        })
    };
    b.update = function() {
        var a = $("#slide .contentEdit"),
            b = $(".contentEdit", "#slide").attr("moduleId");
        a = {
            name: $('input[name="options[name]"]',
                a).is(":checked"),
            email: $('input[name="options[email]"]', a).is(":checked"),
            company: $('input[name="options[company]"]', a).is(":checked"),
            phone: $('input[name="options[phone]"]', a).is(":checked"),
            subject: $('input[name="options[subject]"]', a).is(":checked"),
            msgSend: $('textarea[name="options[msgSend]"]', a).val()
        };
        ModuleContactForm.update(b, a)
    }
})(SlideModuleContactForm || (SlideModuleContactForm = {}));
var SlideModuleContactForm;
(function(b) {
    b.init = function() {
        var a = $("#slide .moduleContactForm");
        if (!$("#slide .moduleContactForm").length) return !1;
        $("#contactName", a).change(function() {
            b.update()
        });
        $("#contactCompany", a).change(function() {
            b.update()
        });
        $("#contactEmail", a).change(function() {
            b.update()
        });
        $("#contactPhone", a).change(function() {
            b.update()
        });
        $("#contactSubject", a).change(function() {
            b.update()
        })
    };
    b.update = function() {
        var a = $("#slide .contentEdit"),
            b = $(".contentEdit", "#slide").attr("moduleId");
        a = {
            name: $('input[name="options[name]"]',
                a).is(":checked"),
            email: $('input[name="options[email]"]', a).is(":checked"),
            company: $('input[name="options[company]"]', a).is(":checked"),
            phone: $('input[name="options[phone]"]', a).is(":checked"),
            subject: $('input[name="options[subject]"]', a).is(":checked"),
            msgSend: $('textarea[name="options[msgSend]"]', a).val()
        };
        ModuleContactForm.update(b, a)
    }
})(SlideModuleContactForm || (SlideModuleContactForm = {}));
var SlideModuleImgCard;
(function(c) {
    c.init = function() {
        if (!$("#slide .moduleImgCard").length) return !1;
        $("#textPosition", "#slide .moduleImgCard").change(function() {
            c.update()
        });
        $("#text", "#slide .moduleImgCard").trumbowyg({
            btns: [
                ["undo", "redo"],
                ["strong", "em"],
                ["link"],
                ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"],
                ["unorderedList", "orderedList"],
                ["removeformat"]
            ],
            removeformatPasted: !0
        }).on("tbwchange", function() {
            SlideModuleImgText.update()
        });
        Slide.initUploader("btnImgTextUpload", "/slide/photoUpload/", function(a,
            b, d) {
            a = JSON.parse(d.response);
            b = '<img src="' + a.cdnUrl + a.imgUrlMin + '">';
            b += '<input type="hidden" value="' + a.imgId + '" name="options[imgId]">';
            b += '<input type="hidden" value="' + a.imgUrl + '" name="options[imgUrl]">';
            b += '<input type="hidden" value="' + a.imgUrlMin + '" name="options[imgUrlMin]">';
            $(".display", "#slide .moduleImgCard").html(b);
            c.update()
        });
        $(".img .display", "#slide .moduleImgCard").on("click", function() {
            $('input[type="file"]', "#slide .moduleImgCard").click()
        })
    };
    c.update = function() {
        var a = $("#slide .contentEdit"),
            b = $(".contentEdit", "#slide").attr("moduleId");
        a = {
            text: $('textarea[name="options[text]"]', a).val(),
            textPosition: $('select[name="options[textPosition]"]', a).val(),
            imgId: $('input[name="options[imgId]"]', a).val(),
            imgUrl: $('input[name="options[imgUrl]"]', a).val(),
            imgUrlMin: $('input[name="options[imgUrlMin]"]', a).val()
        };
        ModuleImgCard.update(b, a)
    }
})(SlideModuleImgCard || (SlideModuleImgCard = {}));
var SlideModuleImgCol;
(function(d) {
    function e(a) {
        $(".menuCol .item", "#slide .moduleImgCol").on("click", function() {
            var a = $(this).attr("col");
            d.editCol(a)
        });
        var e = $(".contentEdit", "#slide").attr("moduleId");
        ModuleImgCol.editCol(e, a);
        $("#displayCol" + a, "#slide .moduleImgCol").on("change.display", function() {
            var b = $(".contentEdit", "#slide").attr("moduleId"),
                c = $(this).is(":checked");
            ModuleImgCol.colDisplay(b, a, c)
        });
        $("#text" + a, "#slide .moduleImgCol").trumbowyg({
            btns: [
                ["undo", "redo"],
                ["strong", "em"],
                ["link"],
                ["justifyLeft", "justifyCenter",
                    "justifyRight", "justifyFull"
                ],
                ["unorderedList", "orderedList"],
                ["removeformat"]
            ],
            removeformatPasted: !0
        }).on("tbwchange", function() {
            var b = $(".contentEdit", "#slide").attr("moduleId"),
                c = $("#text" + a, "#slide .moduleImgCol").val();
            ModuleImgCol.updateText(b, a, c)
        });
        Slide.initUploader("btnImgTextUpload" + a, "/slide/photoUpload/", function(b, c, d) {
            b = JSON.parse(d.response);
            c = '<img src="' + b.cdnUrl + b.imgUrlMin + '">';
            c += '<input type="hidden" value="' + b.imgId + '" name="options[colList][item' + a + '][imgId]">';
            c += '<input type="hidden" value="' +
                b.imgUrl + '" name="options[colList][item' + a + '][imgUrl]">';
            c += '<input type="hidden" value="' + b.imgUrlMin + '" name="options[colList][item' + a + '][imgUrlMin]">';
            $(".img" + a + " .display", "#slide .moduleImgCol").html(c);
            c = $(".contentEdit", "#slide").attr("moduleId");
            ModuleImgCol.updateImg(c, a, b)
        });
        $(".img" + a + " .display", "#slide .moduleImgCol").on("click", function() {
            $(".img" + a + ' input[type="file"]', "#slide .moduleImgCol").click()
        })
    }
    d.init = function() {
        if (!$("#slide .moduleImgCol").length) return !1;
        for (var a = 1; 5 >=
            a; a++) e(a)
    };
    d.editCol = function(a) {
        $(".menuCol .item", "#slide .moduleImgCol").removeClass("selected");
        $('.menuCol .item[col="' + a + '"]', "#slide .moduleImgCol").addClass("selected");
        $(".contentCol", "#slide .moduleImgCol").hide();
        $('.contentCol[col="' + a + '"]', "#slide .moduleImgCol").fadeIn(300)
    }
})(SlideModuleImgCol || (SlideModuleImgCol = {}));
var SlideModuleImgText;
(function(c) {
    c.init = function() {
        if (!$("#slide .moduleImgText").length) return !1;
        $("#text", "#slide .moduleImgText").trumbowyg({
            btns: [
                ["undo", "redo"],
                ["strong", "em"],
                ["link"],
                ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"],
                ["unorderedList", "orderedList"],
                ["removeformat"]
            ],
            removeformatPasted: !0
        }).on("tbwchange", function() {
            c.update()
        });
        $('[name="options[textPosition]"]', "#slide .moduleImgText").change(function() {
            c.update()
        });
        $('[name="options[textWidth]"]', "#slide .moduleImgText").change(function() {
            c.update()
        });
        Slide.initUploader("btnImgTextUpload",
            "/slide/photoUpload/",
            function(a, b, d) {
                a = JSON.parse(d.response);
                b = '<img src="' + a.cdnUrl + a.imgUrlMin + '">';
                b += '<input type="hidden" value="' + a.imgId + '" name="options[imgId]">';
                b += '<input type="hidden" value="' + a.imgUrl + '" name="options[imgUrl]">';
                b += '<input type="hidden" value="' + a.imgUrlMin + '" name="options[imgUrlMin]">';
                $(".display", "#slide .moduleImgText").html(b);
                c.update()
            });
        $(".img .display", "#slide .moduleImgText").on("click", function() {
            $('input[type="file"]', "#slide .moduleImgText").click()
        })
    };
    c.update = function() {
        var a = $("#slide .contentEdit"),
            b = $(".contentEdit", "#slide").attr("moduleId");
        a = {
            text: $('textarea[name="options[text]"]', a).val(),
            textPosition: $('[name="options[textPosition]"]:checked', a).val(),
            textWidth: $('[name="options[textWidth]"]:checked', a).val(),
            imgId: $('input[name="options[imgId]"]', a).val(),
            imgUrl: $('input[name="options[imgUrl]"]', a).val(),
            imgUrlMin: $('input[name="options[imgUrlMin]"]', a).val()
        };
        ModuleImgText.update(b, a)
    }
})(SlideModuleImgText || (SlideModuleImgText = {}));
var SlideModuleLink;
(function(c) {
    function g(a) {
        var c = $(".contentEdit", "#slide").attr("moduleId");
        $('.list .item[linkId="' + a + '"]', "#slide .moduleLink").slideUp(300, function() {
            $(this).remove()
        });
        ModuleLink.remove(c, a);
        $(".actions", "#slide .moduleLink").slideDown()
    }
    c.init = function() {
        if (!$("#slide .moduleLink").length) return !1;
        $("#btnAddLink", "#slide .moduleLink").off("click").on("click", function() {
            c.add()
        })
    };
    c.update = function(a, c) {
        var b = $(".contentEdit", "#slide").attr("moduleId");
        ModuleLink.update(b, a, c)
    };
    c.remove = g;
    c.edit =
        function(a) {
            $('.list .item[linkId="' + a + '"] .display', "#slide .moduleLink").slideUp();
            $('.list .item[linkId="' + a + '"] .edit', "#slide .moduleLink").slideDown();
            $('.list .item[linkId!="' + a + '"]', "#slide .moduleLink").slideUp();
            $('.list .item[linkId!="' + a + '"] .edit', "#slide .moduleLink").slideUp();
            $('.list .item[linkId="' + a + '"] .edit input, .list .item[linkId="' + a + '"] .edit textarea', "#slide .moduleLink").on("keyup", function(b) {
                b = $(".contentEdit", "#slide").attr("moduleId");
                var c = $('.list .item[linkId="' +
                        a + '"] .edit input.linkTitle', "#slide .moduleLink").val(),
                    f = $('.list .item[linkId="' + a + '"] .edit input.linkUrl', "#slide .moduleLink").val(),
                    e = $('.list .item[linkId="' + a + '"] .edit textarea.linkDesc', "#slide .moduleLink").val();
                c || (c = f);
                ModuleLink.update(b, a, {
                    title: c,
                    url: f,
                    desc: e
                })
            });
            var c = $(".contentEdit", "#slide").attr("moduleId");
            ModuleLink.select(c, a, !0);
            $(".actions", "#slide .moduleLink").slideUp()
        };
    c.add = function() {
        var a = $(".contentEdit", "#slide").attr("moduleId"),
            e = $(".list", "#slide .moduleLink"),
            b = new Date;
        b = Date.now() + "" + b.getMilliseconds();
        var d = '<div class="item" linkId="' + b + '"><div class="display" style="display:none;">' + ('<a href="Javascript:SlideModuleLink.edit(' + b + ')" class="int">') + '<div class="text"></div><div class="desc"></div>';
        d += "</a>";
        d = d + ('<a href="Javascript:SlideModuleLink.remove(' + b + ')" class="remove"><i class="fa fa-times"></i></a>') + '</div><div class="edit">';
        d += "<label>Title</label>";
        d = d + ('<input type="text" value="" name="options[linkList][item' + b + '][linkTitle]" class="linkTitle">') +
            "<label>Url</label>" + ('<input type="text" value="" placeholder="http://" name="options[linkList][item' + b + '][linkUrl]" class="linkUrl">') + "<label>Description</label>" + ('<textarea name="options[linkList][item' + b + '][linkDesc]" class="linkDesc"></textarea>') + ('<a href="Javascript:SlideModuleLink.save(' + b + ')" class="save"><i class="fa fa-check"></i></a>') + ('<a href="Javascript:SlideModuleLink.remove(' + b + ')" class="remove"><i class="fa fa-times"></i></a>') + "</div></div>";
        e.append(d);
        $('.list .item[linkId!="' +
            b + '"]', "#slide .moduleLink").slideUp();
        $('.list .item[linkId!="' + b + '"] .edit', "#slide .moduleLink").slideUp();
        $(".actions", "#slide .moduleLink").slideUp();
        c.edit(b);
        ModuleLink.add(a, b)
    };
    c.save = function(a) {
        var e = $(".contentEdit", "#slide").attr("moduleId"),
            b = $('.list .item[linkId="' + a + '"] .edit input.linkTitle', "#slide .moduleLink").val(),
            d = $('.list .item[linkId="' + a + '"] .edit input.linkUrl', "#slide .moduleLink").val();
        b || (b = d);
        b || g(a);
        var f = $('.list .item[linkId="' + a + '"] .edit textarea.linkDesc', "#slide .moduleLink").val();
        $('.list .item[linkId="' + a + '"] .display .text', "#slide .moduleLink").html(b);
        $('.list .item[linkId="' + a + '"] .display .desc', "#slide .moduleLink").html(f);
        $('.list .item[linkId="' + a + '"] .display', "#slide .moduleLink").slideDown();
        $('.list .item[linkId="' + a + '"] .edit', "#slide .moduleLink").slideUp();
        $(".list .item", "#slide .moduleLink").slideDown();
        $(".list .item .display", "#slide .moduleLink").slideDown();
        $(".actions", "#slide .moduleLink").slideDown();
        c.update(a, {
            title: b,
            url: d,
            desc: f
        });
        ModuleLink.select(e,
            a, !1)
    }
})(SlideModuleLink || (SlideModuleLink = {}));
var SlideModuleList;
(function(b) {
    b.init = function() {
        if (!$("#slide .moduleList").length) return !1;
        $("#btnAddItem", "#slide .moduleList").off("click").on("click", function() {
            b.add()
        });
        $(".item", "#slide .moduleList").off("click").on("click", function() {
            var a = $(this).attr("itemId");
            b.edit(a)
        });
        $(".list", "#slide .moduleList").sortable({
            helper: "clone",
            update: function(a, b) {
                var c = $(".contentEdit", "#slide").attr("moduleId"),
                    d = b.item.attr("itemId");
                ModuleList.changeOrder(c, d, b)
            }
        })
    };
    b.update = function(a, b) {
        var c = $(".contentEdit", "#slide").attr("moduleId");
        ModuleList.update(c, a, b)
    };
    b.remove = function(a) {
        var b = $(".contentEdit", "#slide").attr("moduleId");
        $('.list .item[itemId="' + a + '"]', "#slide .moduleList").slideUp(300, function() {
            $(this).remove()
        });
        ModuleList.remove(b, a);
        $(".list .item", "#slide .moduleList").show();
        $(".actions", "#slide .moduleList").slideDown()
    };
    b.edit = function(a) {
        $('.list .item[itemId="' + a + '"]', "#slide .moduleList").addClass("selected");
        $('.list .item[itemId="' + a + '"] .edit', "#slide .moduleList").slideDown();
        $('.list .item[itemId!="' +
            a + '"]', "#slide .moduleList").hide();
        $('.list .item[itemId!="' + a + '"] .edit', "#slide .moduleList").slideUp();
        $(".contentEdit", "#slide").attr("moduleId");
        $(".actions", "#slide .moduleList").slideUp()
    };
    b.add = function() {
        var a = $(".contentEdit", "#slide").attr("moduleId"),
            e = $(".list", "#slide .moduleList"),
            c = new Date;
        c = Date.now() + "" + c.getMilliseconds();
        var d = '<div class="item" itemId="' + c + '"><div class="display" style="display:none;"><span class="label"></span>';
        d += '<span class="value"></span>';
        d += "</div>";
        d += '<div class="edit">';
        d += "<label>Label</label>";
        d = d + ('<input type="text" value="" name="options[list][item' + c + '][label]" class="itemLabel">') + "<label>Value</label>" + ('<input type="text" value="" placeholder="value" name="options[list][item' + c + '][value]" class="itemValue">') + ('<a href="Javascript:SlideModuleList.save(' + c + ')" class="save"><i class="fa fa-check"></i></a>') + ('<a href="Javascript:SlideModuleList.remove(' + c + ')" class="remove"><i class="fa fa-times"></i></a>') + "</div></div>";
        e.append(d);
        $('.list .item[itemId!="' + c + '"]', "#slide .moduleList").slideUp();
        $('.list .item[itemId!="' + c + '"] .edit', "#slide .moduleList").slideUp();
        $(".actions", "#slide .moduleList").slideUp();
        b.edit(c);
        $(".item", "#slide .moduleList").off("click").on("click", function() {
            var a = $(this).attr("itemId");
            b.edit(a)
        });
        ModuleList.add(a, c)
    };
    b.save = function(a) {
        var e = $(".contentEdit", "#slide").attr("moduleId"),
            c = $('.list .item[itemId="' + a + '"] .edit input.itemLabel', "#slide .moduleList").val(),
            d = $('.list .item[itemId="' + a +
                '"] .edit input.itemValue', "#slide .moduleList").val();
        $('.list .item[itemId="' + a + '"] .display .label', "#slide .moduleList").html(c);
        $('.list .item[itemId="' + a + '"] .display .value', "#slide .moduleList").html(d);
        $('.list .item[itemId="' + a + '"] .display', "#slide .moduleList").slideDown();
        $('.list .item[itemId="' + a + '"] .edit', "#slide .moduleList").slideUp();
        $(".list .item", "#slide .moduleList").slideDown();
        $(".list .item .display", "#slide .moduleList").slideDown();
        $(".list .item", "#slide .moduleList").removeClass("selected");
        $(".actions", "#slide .moduleList").slideDown();
        c || d ? (b.update(a, {
            label: c,
            value: d
        }), ModuleList.select(e, a, !1)) : b.remove(a)
    }
})(SlideModuleList || (SlideModuleList = {}));
var SlideModuleLivecamLink;
(function(b) {
    b.init = function() {
        if (!$("#slide .moduleLivecamLink").length) return !1;
        $("#btnAddLink", "#slide .moduleLivecamLink").off("click").on("click", function() {
            b.displayAddLinkList()
        });
        $("#btnCancelAddLink", "#slide .moduleLivecamLink").off("click").on("click", function() {
            b.cancelAddLinkList()
        });
        $('[name="options[style]"]', "#slide .moduleLivecamLink").on("change", function() {
            var a = $(".contentEdit", "#slide").attr("moduleId"),
                c = $(this).val();
            ModuleLivecamLink.setStyle(a, c);
            "noBg" == c ? $(".btnBgColorOptions",
                "#slide .moduleLivecamLink").slideUp() : $(".btnBgColorOptions", "#slide .moduleLivecamLink").slideDown()
        });
        $('[name="options[btnBgColor]"]', "#slide .moduleLivecamLink").on("change", function() {
            var a = $(".contentEdit", "#slide").attr("moduleId"),
                c = $(this).val();
            ModuleLivecamLink.setBgColor(a, c)
        });
        $(".list", "#slide .moduleLivecamLink").sortable({
            update: function(a, c) {
                var b = $(".contentEdit", "#slide").attr("moduleId"),
                    f = c.item.attr("linkId");
                ModuleLivecamLink.changeOrder(b, f, c)
            }
        })
    };
    b.displayAddLinkList = function() {
        $(".currentLinkList",
            "#slide .moduleLivecamLink").slideUp();
        $(".addLinkList", "#slide .moduleLivecamLink").slideDown()
    };
    b.cancelAddLinkList = function() {
        $(".currentLinkList", "#slide .moduleLivecamLink").slideDown();
        $(".addLinkList", "#slide .moduleLivecamLink").slideUp()
    };
    b.remove = function(a) {
        var c = $(".contentEdit", "#slide").attr("moduleId");
        $('.list .item[linkId="' + a + '"]', "#slide .moduleLivecamLink").slideUp(300, function() {
            $(this).remove()
        });
        $(".list .item", "#slide .moduleLivecamLink").show();
        $(".currentLinkList", "#slide .moduleLivecamLink").slideDown();
        $(".actions", "#slide .moduleLivecamLink").slideDown();
        ModuleLivecamLink.remove(c, a)
    };
    b.edit = function(a) {
        $('.list .item[linkId="' + a + '"]', "#slide .moduleLivecamLink").addClass("selected");
        $('.list .item[linkId="' + a + '"] .edit', "#slide .moduleLivecamLink").slideDown();
        $('.list .item[linkId!="' + a + '"]', "#slide .moduleLivecamLink").hide();
        $('.list .item[linkId!="' + a + '"] .edit', "#slide .moduleLivecamLink").slideUp();
        $(".contentEdit", "#slide").attr("moduleId");
        $(".actions", "#slide .moduleLivecamLink").slideUp()
    };
    b.add = function(a, c, g, f) {
        var h = $(".contentEdit", "#slide").attr("moduleId"),
            k = $(".list", "#slide .moduleLivecamLink"),
            e = new Date;
        e = Date.now() + "" + e.getMilliseconds();
        var d = '<div class="item" linkId="' + e + '"><div class="display">' + ('<a href="Javascript:SlideModuleLivecamLink.edit(' + e + ')" class="int">') + ('<img src="/static/img/' + g + '">') + "</a>";
        d += "<span>" + c + "</span>";
        d += "</div>";
        d += '<div class="edit">';
        d = d + ('<input type="hidden" value="' + a + '" name="options[linkList][item' + e + '][type]" class="linkTitle">') +
            "<label>Title</label>";
        d += '<input type="text" value="' + c + '" name="options[linkList][item' + e + '][label]" class="linkTitle">';
        d += "<label>" + ("email" == a ? "Email" : "Url") + "</label>";
        d += '<input type="text" value="' + f + '" placeholder="" name="options[linkList][item' + e + '][url]" class="linkUrl">';
        d += '<a href="Javascript:SlideModuleLivecamLink.save(' + e + ')" class="save"><i class="fa fa-check"></i></a>';
        d += '<a href="Javascript:SlideModuleLivecamLink.remove(' + e + ')" class="remove"><i class="fa fa-times"></i></a>';
        d += "</div>";
        d += "</div>";
        k.append(d);
        b.cancelAddLinkList();
        b.edit(e);
        ModuleLivecamLink.add(h, {
            type: a,
            logo: g,
            title: c,
            url: f,
            id: e
        })
    };
    b.save = function(a) {
        var c = $(".contentEdit", "#slide").attr("moduleId"),
            b = $('.list .item[linkId="' + a + '"] .edit input.linkTitle', "#slide .moduleLivecamLink").val(),
            f = $('.list .item[linkId="' + a + '"] .edit input.linkUrl', "#slide .moduleLivecamLink").val();
        $('.list .item[linkId="' + a + '"] .edit', "#slide .moduleLivecamLink").slideUp(200, function() {
            $(".list .item", "#slide .moduleLivecamLink").removeClass("selected");
            $(".list .item", "#slide .moduleLivecamLink").fadeIn();
            $(".actions", "#slide .moduleLivecamLink").slideDown()
        });
        ModuleLivecamLink.update(c, a, {
            type: type,
            title: b,
            url: f,
            desc: desc,
            id: a
        })
    }
})(SlideModuleLivecamLink || (SlideModuleLivecamLink = {}));
var SlideModulePhoto;
(function(d) {
    d.init = function() {
        if (!$("#slide .modulePhoto").length) return !1;
        $("#fullWidth", "#slide .modulePhoto").change(function() {
            d.update()
        });
        Slide.initUploader("btnPhotoUpload", "/slide/photoUpload/", function(a, c, b) {
            a = JSON.parse(b.response);
            c = '<img src="' + a.cdnUrl + a.imgUrlMin + '">';
            c += '<input type="hidden" value="' + a.imgId + '" name="options[imgId]">';
            c += '<input type="hidden" value="' + a.imgUrl + '" name="options[imgUrl]">';
            c += '<input type="hidden" value="' + a.imgUrlMin + '" name="options[imgUrlMin]">';
            $(".display",
                "#slide .modulePhoto").html(c);
            d.update()
        });
        $(".img .display", "#slide .modulePhoto").on("click", function() {
            $('input[type="file"]', "#slide .modulePhoto").click()
        })
    };
    d.update = function() {
        var a = $("#slide .contentEdit"),
            c = $(".contentEdit", "#slide").attr("moduleId"),
            b = {
                cdnUrl: Application.cdnUrl,
                imgId: $('input[name="options[imgId]"]', a).val(),
                imgUrl: $('input[name="options[imgUrl]"]', a).val(),
                imgUrlMin: $('input[name="options[imgUrlMin]"]', a).val()
            };
        b.imgUrl || (b.defaultImgUrl = $('input[name="defaultImgUrl"]',
            a).val());
        var d = $("#fullWidth", "#slide .modulePhoto").is(":checked") ? 1 : 0;
        (b.fullWidth = d) ? ($(".contentEdit .head", "#slide").slideUp(), $(".contentEdit .optionLegendContainer", "#slide").slideUp(), $(".contentEdit .optionLinkContainer", "#slide").slideUp(), b.link = "") : ($(".contentEdit .head", "#slide").slideDown(), $(".contentEdit .optionLegendContainer", "#slide").slideDown(), $(".contentEdit .optionLinkContainer", "#slide").slideDown(), b.link = $('input[name="options[linkUrl]"]', a).val());
        ModulePhoto.update(c,
            b)
    }
})(SlideModulePhoto || (SlideModulePhoto = {}));
var SlideModulePhotoGallery;
(function(d) {
    d.init = function() {
        if (!$("#slide .modulePhotoGallery").length) return !1;
        Slide.initUploader("btnPhotoUpload", "/slide/photoUpload/", function(a, b, f) {
            a = JSON.parse(f.response);
            d.add(a)
        });
        $('[name="options[imgWidth]"]', "#slide .modulePhotoGallery").change(function() {
            var a = $(this).val(),
                b = $(".contentEdit", "#slide").attr("moduleId");
            ModulePhotoGallery.updateImgWidth(b, a)
        });
        $(".list", "#slide .modulePhotoGallery").sortable({
            update: function(a, b) {
                var d = $(".contentEdit", "#slide").attr("moduleId"),
                    c =
                    b.item.attr("imgId");
                ModulePhotoGallery.changeOrder(d, c, b)
            }
        })
    };
    d.edit = function(a) {
        var b = $("#slide .modulePhotoGallery");
        $('.list .item[imgId="' + a + '"] .display', b).fadeOut();
        $('.list .item[imgId="' + a + '"] .edit', b).delay(500).fadeIn({
            start: function() {
                $('.list .item[imgId="' + a + '"]', b).addClass("edit")
            }
        });
        $('.list .item[imgId!="' + a + '"]', b).fadeOut();
        $(".actions", b).fadeOut()
    };
    d.remove = function(a) {
        var b = $(".contentEdit", "#slide").attr("moduleId");
        $('.list .item[imgId="' + a + '"]', "#slide .modulePhotoGallery").fadeOut(300,
            function() {
                $(this).remove()
            });
        ModulePhotoGallery.remove(b, a);
        $(".list .item", "#slide .modulePhotoGallery").fadeIn();
        $(".list .item .display", "#slide .modulePhotoGallery").fadeIn();
        $(".actions", "#slide .modulePhotoGallery").fadeIn()
    };
    d.add = function(a) {
        var b = $(".contentEdit", "#slide").attr("moduleId"),
            d = $(".list", "#slide .modulePhotoGallery"),
            c = new Date;
        c = Date.now() + "" + c.getMilliseconds();
        var e = '<div class="item" imgId="' + c + '">' + ('<a href="Javascript:SlideModulePhotoGallery.edit(' + c + ')" class="display">') +
            ('<input type="hidden" value="' + a.imgId + '" name="options[imgList][item' + c + '][imgId]">');
        e += '<input type="hidden" value="' + a.imgUrl + '" name="options[imgList][item' + c + '][imgUrl]">';
        e += '<input type="hidden" value="' + a.imgUrlMin + '" name="options[imgList][item' + c + '][imgUrlMin]">';
        e = e + ('<input type="hidden" value="" name="options[imgList][item' + c + '][imgLegend]">') + ('<img src="' + Application.cdnUrl + a.imgUrlMin + '">');
        e = e + '</a><div class="edit" style="display:none;">' + ('<img src="' + Application.cdnUrl + a.imgUrlMin +
            '">');
        e = e + "<label>Text</label>" + ('<input type="text" value="" name="options[imgList][item' + c + '][imgLegend]">') + ('<a href="Javascript:SlideModulePhotoGallery.save(' + c + ')" class="save"><i class="fa fa-check"></i></a>') + ('<a href="Javascript:SlideModulePhotoGallery.remove(' + c + ')" class="remove"><i class="fa fa-times"></i></a>') + "</div></div>";
        d.append(e);
        ModulePhotoGallery.add(b, c, a)
    };
    d.save = function(a) {
        var b = $("#slide .modulePhotoGallery");
        $(".contentEdit", "#slide").attr("moduleId");
        $('.list .item[imgId="' +
            a + '"] .edit', b).fadeOut();
        $(".list .item", b).delay(500).fadeIn();
        $(".list .item .display", b).delay(500).fadeIn();
        $('.list .item[imgId="' + a + '"]', "#slide .modulePhotoGallery").removeClass("edit");
        $(".actions", b).fadeIn()
    }
})(SlideModulePhotoGallery || (SlideModulePhotoGallery = {}));
var SlideModuleQuote;
(function(a) {
    a.init = function() {
        if (!$("#slide .moduleQuote").length) return !1;
        $('[name="options[text]"]', "#slide .moduleQuote").on("keyup", function() {
            a.update()
        });
        $('[name="options[author]"]', "#slide .moduleQuote").on("keyup", function() {
            a.update()
        });
        $('[name="options[style]"]', "#slide .moduleQuote").on("change", function() {
            a.update()
        })
    };
    a.update = function() {
        var a = $("#slide .contentEdit"),
            b = $(".contentEdit", "#slide").attr("moduleId");
        a = {
            text: $('[name="options[text]"]', a).val(),
            author: $('[name="options[author]"]', a).val(),
            style: $('[name="options[style]"]:checked', a).val()
        };
        ModuleQuote.update(b, a)
    }
})(SlideModuleQuote || (SlideModuleQuote = {}));
var SlideModuleRss;
(function(c) {
    c.init = function() {
        if (!$("#slide .moduleRss").length) return !1;
        $("#btnAddRssFeed", "#slide .moduleRss").off("click").on("click", function() {
            var a = $(".list", "#slide .moduleRss"),
                b = new Date;
            b = Date.now() + "" + b.getMilliseconds();
            var c = '<div class="item" rssId="' + b + '"><label>Url RSS Feed</label><input type="text" value="" name="options[rssList][][rssUrl]">';
            a.append(c + ('<a href="Javascript:SlideModuleRss.remove(' + b + ')"><i class="fa fa-times"></i></a>') + "</div>")
        })
    };
    c.update = function() {
        var a = $("#slide .contentEdit"),
            b = $(".contentEdit", "#slide").attr("moduleId");
        a = {
            text: $('textarea[name="options[text]"]', a).val(),
            text2: $('textarea[name="options[text2]"]', a).val(),
            columns: $('input[name="options[columns]"]', a).is(":checked")
        };
        ModuleRss.update(b, a)
    };
    c.remove = function(a) {
        $('.list .item[rssId="' + a + '"]', "#slide .moduleRss").slideUp(300, function() {
            $(this).remove()
        })
    }
})(SlideModuleRss || (SlideModuleRss = {}));
var SlideModuleSocialHub;
(function(c) {
    c.init = function() {
        if (!$("#slide .moduleSocialHub").length) return !1;
        $(".socialList .item .bg", "#slide").unbind("click");
        $(".socialList .item .bg", "#slide").click(function() {
            var b = $(this).parent().hasClass("selected");
            $(".socialList .item .head.selected", "#slide").each(function() {
                $(this).removeClass("selected");
                $(".infos", $(this).parent()).slideUp({
                    queue: !1
                })
            });
            var a = $(this).parent().parent();
            b || ($(".infos", a).slideDown({
                queue: !1
            }), $(this).parent().addClass("selected"));
            return !1
        });
        $(".socialList .subList input",
            "#slide").click(function() {
            var b = $(this).val(),
                a = $(this).is(":checked") ? 1 : 0;
            Social.updateSubFeedStatus(b, a)
        });
        $('.socialList .item .switch-input[id^="activeSocial"]', "#slide").change(function() {
            var b = $(this).is(":checked"),
                a = $(this).parents(".item").attr("alias");
            b ? Social.login(a) : Social.logout(a)
        });
        $('.socialList .item .switch-input[id^="separateSocial"]', "#slide").change(function() {
            var b = $(this).is(":checked"),
                a = $(this).parents(".item").attr("alias");
            $.ajax({
                method: "POST",
                url: "/social/setStandalone/" +
                    a + "?standalone=" + (b ? 1 : 0)
            }).done(function() {
                Slide.updateFullWebsite().done(function() {
                    Tool.scrollTo($(b ? ".module.standalone_social_network." + a : ".module.socialHub"))
                })
            })
        })
    }
})(SlideModuleSocialHub || (SlideModuleSocialHub = {}));
var SlideModuleSocialLink;
(function(b) {
    b.init = function() {
        if (!$("#slide .moduleSocialLink").length) return !1;
        $("#btnAddLink", "#slide .moduleSocialLink").off("click").on("click", function() {
            b.displayAddLinkList()
        });
        $("#btnCancelAddLink", "#slide .moduleSocialLink").off("click").on("click", function() {
            b.cancelAddLinkList()
        });
        $('[name="options[style]"]', "#slide .moduleSocialLink").on("change", function() {
            var a = $(".contentEdit", "#slide").attr("moduleId"),
                c = $(this).val();
            ModuleSocialLink.setStyle(a, c);
            "noBg" == c ? $(".btnBgColorOptions",
                "#slide .moduleSocialLink").slideUp() : $(".btnBgColorOptions", "#slide .moduleSocialLink").slideDown()
        });
        $('[name="options[btnBgColor]"]', "#slide .moduleSocialLink").on("change", function() {
            var a = $(".contentEdit", "#slide").attr("moduleId"),
                c = $(this).val();
            ModuleSocialLink.setBgColor(a, c)
        });
        $(".list", "#slide .moduleSocialLink").sortable({
            update: function(a, c) {
                var b = $(".contentEdit", "#slide").attr("moduleId"),
                    f = c.item.attr("linkId");
                ModuleSocialLink.changeOrder(b, f, c)
            }
        })
    };
    b.displayAddLinkList = function() {
        $(".currentLinkList",
            "#slide .moduleSocialLink").slideUp();
        $(".addLinkList", "#slide .moduleSocialLink").slideDown()
    };
    b.cancelAddLinkList = function() {
        $(".currentLinkList", "#slide .moduleSocialLink").slideDown();
        $(".addLinkList", "#slide .moduleSocialLink").slideUp()
    };
    b.remove = function(a) {
        var c = $(".contentEdit", "#slide").attr("moduleId");
        $('.list .item[linkId="' + a + '"]', "#slide .moduleSocialLink").slideUp(300, function() {
            $(this).remove()
        });
        ModuleSocialLink.remove(c, a);
        $(".list .item", "#slide .moduleSocialLink").show();
        $(".currentLinkList",
            "#slide .moduleSocialLink").slideDown();
        $(".actions", "#slide .moduleSocialLink").slideDown()
    };
    b.edit = function(a) {
        $('.list .item[linkId="' + a + '"]', "#slide .moduleSocialLink").addClass("selected");
        $('.list .item[linkId="' + a + '"] .edit', "#slide .moduleSocialLink").slideDown();
        $('.list .item[linkId!="' + a + '"]', "#slide .moduleSocialLink").hide();
        $('.list .item[linkId!="' + a + '"] .edit', "#slide .moduleSocialLink").slideUp();
        $(".contentEdit", "#slide").attr("moduleId");
        $(".actions", "#slide .moduleSocialLink").slideUp()
    };
    b.add = function(a, c, g, f) {
        var h = $(".contentEdit", "#slide").attr("moduleId"),
            k = $(".list", "#slide .moduleSocialLink"),
            e = new Date;
        e = Date.now() + "" + e.getMilliseconds();
        var d = '<div class="item" linkId="' + e + '"><div class="display">' + ('<a href="Javascript:SlideModuleSocialLink.edit(' + e + ')" class="int">') + ('<i class="' + g + '"></i>') + "</a>";
        d += "<span>" + c + "</span>";
        d += "</div>";
        d += '<div class="edit">';
        d = d + ('<input type="hidden" value="' + a + '" name="options[socialList][item' + e + '][type]" class="linkTitle">') + "<label>Title</label>";
        d += '<input type="text" value="' + c + '" name="options[socialList][item' + e + '][label]" class="linkTitle">';
        d += "<label>" + ("email" == a ? "Email" : "Url") + "</label>";
        d += '<input type="text" value="' + f + '" placeholder="" name="options[socialList][item' + e + '][url]" class="linkUrl">';
        d += '<a href="Javascript:SlideModuleSocialLink.save(' + e + ')" class="save"><i class="fa fa-check"></i></a>';
        d += '<a href="Javascript:SlideModuleSocialLink.remove(' + e + ')" class="remove"><i class="fa fa-times"></i></a>';
        d += "</div>";
        d += "</div>";
        k.append(d);
        b.cancelAddLinkList();
        b.edit(e);
        ModuleSocialLink.add(h, {
            type: a,
            icon: g,
            title: c,
            url: f
        })
    };
    b.save = function(a) {
        var c = $(".contentEdit", "#slide").attr("moduleId"),
            b = $('.list .item[linkId="' + a + '"] .edit input.linkTitle', "#slide .moduleSocialLink").val(),
            f = $('.list .item[linkId="' + a + '"] .edit input.linkUrl', "#slide .moduleSocialLink").val();
        $('.list .item[linkId="' + a + '"] .edit', "#slide .moduleSocialLink").slideUp(200, function() {
            $(".list .item", "#slide .moduleSocialLink").removeClass("selected");
            $(".list .item", "#slide .moduleSocialLink").fadeIn();
            $(".actions", "#slide .moduleSocialLink").slideDown()
        });
        ModuleSocialLink.update(c, a, {
            type: type,
            title: b,
            url: f,
            desc: desc,
            id: a
        })
    }
})(SlideModuleSocialLink || (SlideModuleSocialLink = {}));
var SlideModuleText;
(function(a) {
    a.init = function() {
        if (!$("#slide .moduleText").length) return !1;
        $("#text", "#slide .moduleText").trumbowyg({
            btns: [
                ["undo", "redo"],
                ["strong", "em"],
                ["link"],
                ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"],
                ["unorderedList", "orderedList"],
                ["removeformat"]
            ],
            removeformatPasted: !0
        }).on("tbwchange", function() {
            a.update()
        });
        $("#text2", "#slide .moduleText").trumbowyg({
            btns: [
                ["undo", "redo"],
                ["strong", "em"],
                ["link"],
                ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"],
                ["unorderedList",
                    "orderedList"
                ],
                ["removeformat"]
            ],
            removeformatPasted: !0
        }).on("tbwchange", function() {
            a.update()
        });
        $("#columns", "#slide .moduleText").change(function() {
            a.update()
        })
    };
    a.update = function() {
        var a = $("#slide .contentEdit"),
            b = $(".contentEdit", "#slide").attr("moduleId");
        a = {
            text: $('textarea[name="options[text]"]', a).val(),
            text2: $('textarea[name="options[text2]"]', a).val(),
            columns: $('input[name="options[columns]"]', a).is(":checked")
        };
        ModuleText.update(b, a)
    }
})(SlideModuleText || (SlideModuleText = {}));
var SlideModuleVideo;
(function(a) {
    function b() {
        $("#slide .contentEdit");
        var a = $(".contentEdit", "#slide").attr("moduleId");
        SlideModule.save(a, function(a) {
            Module.updateDisplay(a)
        })
    }
    a.init = function() {
        if (!$("#slide .moduleVideo").length) return !1;
        $("#videoUrl", "#slide .contentEdit").on("keyup", function(a) {
            $("#slide .contentEdit").attr("moduleId");
            b()
        })
    };
    a.update = b
})(SlideModuleVideo || (SlideModuleVideo = {}));
var SlideModuleVideoGallery;
(function(a) {
    a.init = function() {
        if (!$("#slide .moduleVideoGallery").length) return !1
    };
    a.update = function() {
        $("#slide .contentEdit");
        $(".contentEdit", "#slide").attr("moduleId")
    };
    a.remove = function(a) {
        var c = $(".contentEdit", "#slide").attr("moduleId");
        $('.list .item[videoId="' + a + '"]', "#slide .moduleVideoGallery").slideUp(300, function() {
            $(this).remove()
        });
        ModuleVideoGallery.remove(c, a)
    };
    a.add = function() {
        var a = $(".contentEdit", "#slide").attr("moduleId"),
            c = $(".list", "#slide .moduleVideoGallery"),
            b = new Date;
        b = Date.now() + "" + b.getMilliseconds();
        var d = '<div class="item" videoId="' + b + '"><label>Url Video</label><input type="text" value="" name="options[videoList][][videoUrl]">';
        c.append(d + ('<a href="Javascript:SlideModuleVideoGallery.remove(' + b + ')"><i class="fa fa-times"></i></a>') + "</div>");
        ModuleVideoGallery.add(a, b)
    }
})(SlideModuleVideoGallery || (SlideModuleVideoGallery = {}));
var SlideOptions;
(function(a) {
    a.init = function() {
        Part.selectedPart = "options";
        SlidePart.selectedPart = "options";
        $(".countryList a", "#slide .editOptions").on("click", function() {
            var b = $(this).attr("countryId");
            a.blockedCountryRemove(b)
        });
        $("#cBAdd", "#slide .editOptions").on("click", function() {
            $(".cBListContent", "#slide .editOptions").slideUp();
            $(".cBAddContent", "#slide .editOptions").slideDown()
        });
        $("#cBCancel", "#slide .editOptions").on("click", function() {
            $(".cBListContent", "#slide .editOptions").slideDown();
            $(".cBAddContent",
                "#slide .editOptions").slideUp()
        });
        $(".cBAddContent select", "#slide .editOptions").on("change", function() {
            var b = $(this).val(),
                c = $("option:selected", this).text();
            a.blockedCountryAdd(b, c);
            $("#cBCancel", "#slide .editOptions").click();
            $(this).val("")
        });
        void 0 !== a.SlideOptionsTimer && !1 !== a.SlideOptionsTimer && clearInterval(a.SlideOptionsTimer);
        a.SlideOptionsTimer = setInterval(function() {
            $("#slide .editOptions").length ? a.autoSave() : a.SlideOptionsTimer && clearInterval(a.SlideOptionsTimer)
        }, 2E4);
        $("#displayCallBtn",
            "#slide .editOptions").on("change", function() {
            $(this).is(":checked") ? ($("#callPermissionPart", "#slide .editOptions").slideDown(), $(".btnCall", "#content").slideDown()) : ($("#callPermissionPart", "#slide .editOptions").slideUp(), $(".btnCall", "#content").slideUp())
        });
        $("#callPermission", "#slide .editOptions").change(function() {
            var a = $(this).is(":checked") ? 1 : 0;
            Account.callPermissionSave(a)
        })
    };
    a.edit = function() {
        Slide.loadContent("editor", "options", function() {
            a.init()
        })
    };
    a.save = function(a) {
        var b = $("#slide .editOptions").serializeObject();
        b.options = b.options || {};
        "undefined" == typeof b.options.displayDisclaimer && (b.options.displayDisclaimer = 0);
        "undefined" == typeof b.options.displayMenu && (b.options.displayMenu = 0);
        Part.save("options", b, a)
    };
    a.saveAndRedirect = function() {
        a.save(function(a) {
            Slide.contentList()
        })
    };
    a.autoSave = function() {
        a.save(function() {
            Tool.loaderBtn("btnPartSave");
            Tool.loaderOk("btnPartSave")
        })
    };
    a.blockedCountryRemove = function(a) {
        Ajax.send("/account/blockedCountry/remove/" + a, {}, "", function() {
            $('.countryList a[countryId="' +
                a + '"]', "#slide .editOptions").fadeOut(300, function() {
                $(this).remove()
            })
        })
    };
    a.blockedCountryAdd = function(b, c) {
        Ajax.send("/account/blockedCountry/add/" + b, {}, "", function() {
            var d = '<a href="Javascript:;" countryId="' + b + '" class="link">' + c + '<i class="fa fa-times"></i></a>';
            $(".countryList", "#slide .editOptions").append(d);
            $('.countryList a[countryId="' + b + '"]', "#slide .editOptions").on("click", function() {
                a.blockedCountryRemove(b)
            })
        })
    }
})(SlideOptions || (SlideOptions = {}));
var SlidePart;
(function(a) {
    a.selectedPart = !1;
    a.init = function() {
        SlidePartHeader.init();
        SlidePartBio.init();
        SlidePartComment.init();
        SlidePartFooter.init();
        $("#partStatus", "#slide .partEdit").on("change", function() {
            var b = $(this).is(":checked") ? 1 : 0,
                a = $("#slide .partEdit").attr("partName");
            Part.updateStatus(a, b);
            b ? $("#partEditContent", "#slide .partEdit").slideDown() : $("#partEditContent", "#slide .partEdit").slideUp()
        });
        $('[name="bgColor"]', "#slide .partEdit").on("change.bg", function() {
            var a = $("#slide .partEdit").attr("partName"),
                c =
                $(this).val();
            Part.setBackground(a, c)
        });
        $('[name="paddingHeight"]', "#slide .partEdit").on("change.paddingHeight", function() {
            var a = $("#slide .partEdit").attr("partName"),
                c = $(this).val();
            Part.setPaddingHeight(a, c)
        });
        void 0 !== a.SlidePartTimer && !1 !== a.SlidePartTimer && clearInterval(a.SlidePartTimer);
        a.SlidePartTimer = setInterval(function() {
            var b = $("#slide .partEdit").attr("partName");
            Part.selectedPart == b ? a.autoSave(b) : a.SlidePartTimer && clearInterval(a.SlidePartTimer)
        }, 2E4)
    };
    a.edit = function(b) {
        Slide.loadContent("editor",
            "partEdit/" + b,
            function() {
                a.init()
            });
        a.selectedPart = b
    };
    a.save = function(a, c) {
        var b = $("#slide .partEdit").serializeObject();
        $("input:checkbox", $("#slide .partEdit")).each(function() {
            $(this).is(":checked") || (b[$(this).attr("name")] = 0)
        });
        b.partName = a;
        Part.save(a, b, c)
    };
    a.saveAndRedirect = function(b) {
        a.save(b, function(a) {
            Part.updateDisplay(a);
            Part.unselect(!1, !1);
            Slide.contentList()
        })
    };
    a.autoSave = function(b) {
        a.save(b, function() {
            Tool.loaderBtn("btnPartSave");
            Tool.loaderOk("btnPartSave")
        })
    }
})(SlidePart || (SlidePart = {}));
var SlidePartBio;
(function(b) {
    b.init = function() {
        var a = $("#slide .partEdit_bio");
        if (!a.length) return !1;
        $("#bioTitle", a).on("keyup", function(a) {
            b.update()
        });
        $("#displayTitle", a).on("change.display", function() {
            b.update()
        });
        $("#textPresentation", a).trumbowyg({
            btns: [
                ["undo", "redo"],
                ["strong", "em"],
                ["link"],
                ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"],
                ["unorderedList", "orderedList"],
                ["removeformat"]
            ],
            removeformatPasted: !0
        }).on("tbwchange", function() {
            b.update()
        });
        $("#displayPresentation", a).on("change.display",
            function() {
                b.update()
            })
    };
    b.update = function() {
        var a = $("#slide .partEdit"),
            b = $(".partEdit", "#slide").attr("partName");
        a = {
            displayTitle: $('[name="displayTitle"]', a).is(":checked"),
            title: $('input[name="title"]', a).val(),
            displayPresentation: $('[name="displayPresentation"]', a).is(":checked"),
            presentation: $('textarea[name="presentation"]', a).val()
        };
        PartBio.update(b, a)
    }
})(SlidePartBio || (SlidePartBio = {}));
var SlidePartComment;
(function(b) {
    b.init = function() {
        var a = $("#slide .partEdit");
        if (!a.length) return !1;
        $("#textTitle", a).on("keyup", function(a) {
            b.update()
        });
        $("#displayTitle", a).on("change.display", function() {
            b.update()
        });
        $("#displayPresentation", a).on("change.display", function() {
            b.update()
        });
        $("#textPresentation", a).on("keyup", function() {
            b.update()
        })
    };
    b.update = function() {
        var a = $("#slide .partEdit"),
            b = $(".partEdit", "#slide").attr("partName");
        a = {
            displayTitle: $('[name="displayTitle"]', a).is(":checked"),
            title: $('input[name="title"]',
                a).val(),
            displayPresentation: $('[name="displayPresentation"]', a).is(":checked"),
            presentation: $('textarea[name="presentation"]', a).val()
        };
        PartComment.updateHeader(b, a)
    }
})(SlidePartComment || (SlidePartComment = {}));
var SlidePartFooter;
(function(b) {
    function c(a) {
        $('[name="mapLon"]', "#slide .partFooter").val(a.lng);
        $('[name="mapLat"]', "#slide .partFooter").val(a.lat);
        d.setLatLng(a);
        b.map.panTo(a);
        PartFooter.markerUpdate(a)
    }
    var d = !1;
    b.init = function() {
        var a = $("#slide .partFooter");
        if (!a.length) return !1;
        $('[name="displayName"]', a).change(function() {
            var a = $(this).is(":checked");
            PartFooter.display("name", a)
        });
        $('[name="name"]', a).on("keyup", function(a) {
            a = $(this).val();
            PartFooter.updateContent("name", a)
        });
        $('[name="displayAddress"]', a).change(function() {
            var a =
                $(this).is(":checked");
            PartFooter.display("address", a)
        });
        $('[name="address"]', a).trumbowyg({
            btns: [
                ["undo", "redo"],
                ["strong", "em"],
                ["link"],
                ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"],
                ["unorderedList", "orderedList"],
                ["removeformat"]
            ],
            removeformatPasted: !0
        }).on("tbwchange", function() {
            var a = $('[name="address"]', "#slide .partFooter").val();
            PartFooter.updateContent("address", a)
        });
        $('[name="displayPhone"]', a).change(function() {
            var a = $(this).is(":checked");
            PartFooter.display("phone", a)
        });
        $('[name="phone"]', a).on("keyup", function(a) {
            a = $(this).val();
            PartFooter.updateContent("phone", a)
        });
        $('[name="displayEmail"]', a).change(function() {
            var a = $(this).is(":checked");
            PartFooter.display("email", a)
        });
        $('[name="email"]', a).on("keyup", function(a) {
            a = $(this).val();
            PartFooter.updateContent("email", a)
        });
        $('[name="displayWebsite"]', a).change(function() {
            var a = $(this).is(":checked");
            PartFooter.display("website", a)
        });
        $('[name="website"]', a).on("keyup", function(a) {
            a = $(this).val();
            PartFooter.updateContent("website",
                a)
        });
        $('[name="mapDisplay"]', a).on("change.map", function() {
            $(this).is(":checked") && b.mapInit();
            b.mapUpdate()
        });
        $('[name="mapPosition"]', a).on("change", function() {
            b.mapUpdate()
        });
        $('[name="mapZoom"]', a).on("change", function() {
            var a = $(this).val();
            PartFooter.mapZoom(a)
        });
        $('[name="mapDisplay"]', a).is(":checked") && !$("#mapEditFooter", "#slide").attr("init") && b.mapInit()
    };
    b.mapInit = function() {
        var a = $("#slide .partFooter"),
            e = $('[name="mapZoom"]:checked', a).val();
        e = PartFooter.getZoomLevel(e);
        var f = $('[name="mapLat"]',
            a).val();
        a = $('[name="mapLon"]', a).val();
        b.map = L.map("mapEditFooter").setView([f, a], e);
        L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: ""
        }).addTo(b.map);
        d = L.marker([f, a], {
            draggable: !0
        }).addTo(b.map);
        $("#mapEditFooter", "#slide").attr("init", !0);
        b.map.on("click", function(a) {
            c(a.latlng)
        });
        d.on("dragend", function(a) {
            a = a.target.getLatLng();
            c(a)
        })
    };
    b.markerUpdate = c;
    b.mapUpdate = function() {
        var a = $("#slide .partFooter");
        a = {
            status: $('[name="mapDisplay"]', a).is(":checked"),
            mapPosition: $('[name="mapPosition"]:checked', a).val()
        };
        PartFooter.mapUpdate(a)
    }
})(SlidePartFooter || (SlidePartFooter = {}));
var SlidePartHeader;
(function(e) {
    e.init = function() {
        var b = $("#slide .partEdit_header");
        if (!b.length) return !1;
        $('[name="namePosition"]', b).change(function() {
            var a = $(this).val();
            PartHeader.updateNamePosition(a)
        });
        Slide.initUploader("btnImgUpload", "/slide/photoUpload/", function(a, c, d) {
            a = JSON.parse(d.response);
            c = '<img src="' + a.cdnUrl + a.imgUrlMin + '">';
            c += '<input type="hidden" value="' + a.imgId + '" name="profileImgId">';
            c += '<input type="hidden" value="' + a.imgUrlMin + '" name="profileImgUrl">';
            $(".img .display", b).html(c);
            PartHeader.updateProfile(a)
        });
        $(".img .display", b).on("click", function() {
            $('.img input[type="file"]', b).click()
        });
        Slide.initUploader("btnBgUpload", "/slide/photoUpload/", function(a, c, d) {
            a = JSON.parse(d.response);
            c = '<img src="' + a.cdnUrl + a.imgUrlMin + '">';
            c += '<input type="hidden" value="' + a.imgId + '" name="backgroundImgId">';
            c += '<input type="hidden" value="' + a.imgUrl + '" name="backgroundImgUrl">';
            $(".imgBg .display", b).html(c);
            PartHeader.updateBackground(a)
        });
        $(".imgBg .display", b).on("click", function() {
            $('.imgBg input[type="file"]',
                b).click()
        });
        $('[name="profilePosition"]', b).change(function() {
            var a = $(this).val();
            PartHeader.updateProfilePosition(a)
        });
        $('[name="profileStyle"]', b).change(function() {
            var a = $(this).val();
            PartHeader.updateProfileStyle(a)
        });
        $("#profileDisplay", b).change(function() {
            var a = $(this).is(":checked");
            PartHeader.profileDisplay(a);
            var c = $(".profilePosition", b).detach();
            a ? $('[name="profileAlign"]', b).after(c) : $('[name="nameAlign"]', b).after(c)
        });
        $("#nameDisplay", b).change(function() {
            var a = $(this).is(":checked");
            PartHeader.nameDisplay(a)
        });
        $('[name="height"]', b).change(function() {
            var a = $(this).val();
            PartHeader.updateHeight(a)
        });
        $("#name, #baseline", b).on("keyup", function() {
            var a = $("#slide .partEdit");
            a = {
                name: $('[name="name"]', a).val(),
                baseline: $('[name="baseline"]', a).val(),
                namePosition: $('[name="namePosition"]', a).val()
            };
            PartHeader.updateName(a)
        })
    }
})(SlidePartHeader || (SlidePartHeader = {}));
var Layer;
(function(b) {
    function c(a) {
        "/login" == a && ($(".btnEmail", ".signupSocial").click(function() {
            $(".signupSocial", ".signup ").slideUp();
            $(".signupEmail", ".signup").slideDown()
        }), $("#btnSignup").click(function() {
            client_btnSignup()
        }));
        Init.btnActions()
    }
    b.display = function(a, b) {
        $.fancybox.open({
            href: a,
            type: "ajax",
            scrolling: "no",
            closeBtn: !1,
            padding: 0,
            afterClose: function() {},
            afterShow: function() {
                c(a)
            }
        })
    };
    b.init = c
})(Layer || (Layer = {}));
var PostMessage;
(function(d) {
    function c(a) {
        var b = [];
        "string" == typeof a.data && (b = a.data.split("|"));
        "socialNetworkConnected" == b[0] && (Slide.socialNetwork(), Social.updateSocialHub());
        "socialNetworkSignup" == b[0] && ((a = b[1]) || (a = "/signup/phone"), document.location.href = a);
        "socialNetworkLogin" == b[0] && ((a = b[1]) || (a = "/"), document.location.href = a);
        "closeIframe" == b[0] && $(".domain .part-live").slideUp(400, function() {
            $(this).remove()
        })
    }
    d.init = function() {
        window.addEventListener ? addEventListener("message", c, !1) : attachEvent("onmessage",
            c)
    }
})(PostMessage || (PostMessage = {}));
var Social;
(function(b) {
    function e(a) {
        if (!$(".socialList", ".domain").length) return !1;
        var d = {
            1100: 3,
            750: 2,
            400: 1
        };
        a && (d = {
            1350: 3,
            1E3: 2,
            650: 1
        });
        var b = 0;
        $("#content .socialList").each(function() {
            var a = $(this).attr("id");
            Macy({
                container: "#" + a,
                trueOrder: !1,
                waitForImages: !1,
                margin: 20,
                columns: 4,
                breakAt: d
            });
            b++
        });
        h()
    }

    function f() {
        Tool.scrollTo($(".socialHub", "#content"), -70);
        var a = $(".module.socialHub", "#content");
        a.prepend('<div class="loading-layer">' + Tool.loader(!0) + "</div>");
        a.load("/domain/update/socialHub", function() {
            b.init();
            Init.action()
        })
    }

    function h() {
        $("[video-play]").unbind("click");
        $("[video-play]").click(function(a) {
            $(this).hide();
            a = $(this).attr("video-type");
            var d = $(this).attr("video-url"),
                b = $(this).attr("video-id"),
                c = "";
            "mp4" == a && (c = c + ('<video controls id="' + b + '" class="video-js vjs-default-skin vjs-big-play-centered" data-setup=\'{"fluid": true, "autoplay": true}\'>') + ('<source src="' + d + '" type="video/mp4"/>') + "</video>", $(this).after(c), videojs(b, {}, function() {}));
            "facebook" == a && ($(this).show(), $("i", this).hide(),
                c += '<iframe src="https://www.facebook.com/v2.5/plugins/video.php?href=' + d + '&allowfullscreen=true&app_id=1680344545554550&autoplay=true&sdk=joe&show_text=false" frameborder="0" allowfullscreen></iframe>', $(this).after(c));
            "youtube" == a && (c += '<iframe src="https://www.youtube.com/embed/' + b + '?rel=0&showinfo=0&autoplay=1" frameborder="0" allowfullscreen></iframe>', $(this).after(c));
            "vimeo" == a && (c += '<iframe src="https://player.vimeo.com/video/' + b + '?autoplay=1&title=0&byline=0&portrait=0" frameborder="0" allowfullscreen></iframe>',
                $(this).after(c));
            "dailymotion" == a && (c += '<iframe src="https://www.dailymotion.com/embed/video/' + b + '?autoplay=1&sharing-enable=0&endscreen-enable=0" frameborder="0" allowfullscreen></iframe>', $(this).after(c))
        })
    }
    var g;
    b.init = function() {
        if (!$(".socialList", ".domain").length) return !1;
        e(Slide.displayed);
        g && clearInterval(g);
        g = setInterval(function() {
            var a = $(".item", ".socialHub").first().attr("postId");
            "undefined" !== typeof a && Ajax.send("/social/getLastPost/" + a, {})
        }, 12E4)
    };
    b.initMacy = e;
    b.moreSocialPost = function(a,
        b) {
        Domain.loadSocialPost(a, "bottom", null, b)
    };
    b.login = function(a) {
        newPopupSocialNetwork = window.open("/social/AuthLogin/" + a, "", "height=" + .67 * window.screen.height + ",width=" + .5 * window.screen.width + ",resizable=yes");
        window.focus && newPopupSocialNetwork.focus()
    };
    b.logout = function(a) {
        Ajax.send("/social/logout/" + a, {}, "", function() {
            Slide.loadContent("social", "social");
            Slide.socialNetwork();
            var b = $(".module.standalone_social_network." + a);
            b.length && Module.remove(b.attr("moduleId"))
        })
    };
    b.getLastContent = function(a) {
        Ajax.send("/social/update/" +
            a, {}, "",
            function() {
                Slide.loadContent("social", "social");
                var d = $(".module.standalone_social_network." + a);
                d.length ? (Tool.scrollTo(d), d.find(".inner").prepend('<div class="loading-layer">' + Tool.loader(!0) + "</div>").load("/domain/update/socialNetwork/" + a, function() {
                    b.init();
                    Init.action()
                })) : f()
            })
    };
    b.updateSubFeedStatus = function(a, b) {
        Ajax.send("/social/updateSubFeedStatus/", {
            userSocialNetworkSubId: a,
            status: b
        }, "", function() {
            f()
        })
    };
    b.removePost = function(a) {
        Ajax.send("/social/removePost/" + a, {}, "", function() {
            $('.item[postId="' +
                a + '"]', ".socialHub").remove();
            e(Slide.displayed);
            $.fancybox.close()
        })
    };
    b.updateSocialHub = f;
    b.initPlayVideo = h;
    b.modalPostRemove = function(a) {
        $.fancybox.open([{
            src: "/slide/removePost/" + a,
            type: "ajax",
            opts: {
                onComplete: function() {
                    Init.action()
                }
            }
        }], {
            loop: !1,
            closeClickOutside: !0,
            touch: !1
        })
    };
    b.modalPostShare = function(a, b) {
        $.fancybox.open([{
            src: "/slide/sharePost/" + a,
            type: "ajax",
            opts: {
                onComplete: function() {
                    Init.action();
                    $("#socialShare").jsSocials({
                        url: b,
                        text: "",
                        showLabel: !1,
                        showCount: !1,
                        shareIn: "popup",
                        shares: "email twitter facebook googleplus linkedin pinterest whatsapp".split(" "),
                        on: {
                            click: function(a) {
                                $.fancybox.close()
                            }
                        }
                    })
                }
            }
        }], {
            loop: !1,
            closeClickOutside: !0,
            touch: !1
        })
    }
})(Social || (Social = {}));
var Ws;
(function(c) {
    function e() {
        var e = Tool.getCookie("auth-token");
        if ("string" != typeof Application.apiUrl || !Application.apiUrl) return !1;
        var f = Application.apiUrl.replace("https://", "");
        d = new WebSocket("wss://" + f + "/ws", [], {
            headers: {
                Cookie: "auth-token=" + e
            }
        });
        d.onopen = function() {
            d.send(JSON.stringify({
                cmd: "listen"
            }));
            c.nb = 0
        };
        d.onmessage = function(b) {
            b = JSON.parse(b.data);
            var a = !1;
            "undefined" !== typeof b.payload && (a = b.payload.notif_type);
            "CALL" == a && Call.incoming(b.payload);
            "MISSEDCALL" == a && Call.hangup(b.payload.roomid);
            "NEW_MEMBER" !=
            a && "INVITE" != a && "ACCEPTED_INVITE" != a || "contacts" != Slide.displayed || Slide.loadContent("contacts", "contact");
            "CALL_IN_PROGRESS" != a && "CALL_REJECTED" != a || $("#call").fadeOut()
        };
        d.onerror = function(b) {};
        d.onclose = function() {
            c.nb++;
            5 > c.nb && c.open()
        }
    }
    var d = "";
    c.init = function() {
        if ("object" != typeof Application.user || !Application.user.isLog || !Application.apiWsConnect) return !1;
        e()
    };
    c.open = e
})(Ws || (Ws = {}));
var Wpn;
(function(c) {
    function f() {
        if (!Application.user.isLog) return !1;
        "granted" !== Notification.permission && Notification.requestPermission();
        navigator.serviceWorker.ready.then(function(b) {
            b.pushManager.subscribe({
                userVisibleOnly: !0
            }).then(function(a) {
                d = !0;
                if (a && a.endpoint) {
                    if (a.getKey) {
                        var b = a.getKey("p256dh");
                        b = btoa(String.fromCharCode.apply(null, new Uint8Array(b)));
                        var c = a.getKey("auth");
                        c = btoa(String.fromCharCode.apply(null, new Uint8Array(c)))
                    }
                    a = a.endpoint;
                    a = {
                        device_id: Tool.getCookie("deviceId"),
                        device_type: "web",
                        device_push_token: a,
                        device_key: b,
                        device_auth_key: c,
                        device_model: navigator.userAgent
                    };
                    $.ajax({
                        url: "/api/device",
                        type: "POST",
                        data: a,
                        dataType: "json",
                        success: function(a) {}
                    })
                }
            })["catch"](function(a) {})
        });
        $.fancybox.close()
    }

    function g() {
        return navigator.serviceWorker.ready.then(function(b) {
            b.pushManager.getSubscription().then(function(a) {
                d = a ? !0 : !1
            })["catch"](function(a) {})
        })
    }
    var d = !1,
        e = !1;
    c.init = function() {
        if ("object" != typeof Application.user || !Application.user.isLog) return !1;
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/service-worker.js");
            var b = Notification.permission;
            if ("denied" == b || "blocked" == b) e = !0;
            "showNotification" in ServiceWorkerRegistration.prototype ? "PushManager" in window ? g() : e = !0 : e = !0
        }
    };
    c.subscribe = f;
    c.unsubscribe = function() {
        return navigator.serviceWorker.ready.then(function(b) {
            b.pushManager.getSubscription().then(function(a) {
                if (!a) throw d = !1, Error("No push subscription");
                a.unsubscribe().then(function(a) {
                    d = !1
                })["catch"](function(a) {})
            })["catch"](function(a) {})
        })
    };
    c.hasNotif = g;
    c.layerAsk = function() {
        d || e ? e || f() : $.fancybox.open([{
            src: "/slide/notifActivation",
            type: "ajax",
            opts: {
                onComplete: function() {
                    Init.action()
                }
            }
        }], {
            loop: !1,
            closeClickOutside: !1,
            touch: !1
        })
    }
})(Wpn || (Wpn = {}));
var Call;
(function(b) {
    function f(a) {
        "publish" == a ? document.location.href = "/" : (Ajax.send("/call/setHangup/", {
            roomId: a
        }), $(".domain #call").fadeOut(300, function() {
            $(this).remove()
        }), b.end())
    }
    var d = !1,
        e = !1;
    b.init = function() {
        if (!$("#call").length) return !1;
        $(".layer .avatar", "#call").click(function() {
            $(this).parent().parent().fadeOut()
        })
    };
    b.answer = function(a) {
        d && d.close();
        a = "/answer/" + a;
        var b = 800,
            c = 600;
        window.screen && (c = window.screen.availWidth - 30, b = window.screen.availHeight - 60);
        d = window.open(a, "", "height=" + b + ",width=" +
            c);
        window.focus && d.focus();
        d || (document.location.href = a);
        $("#call").fadeOut(300, function() {
            $(this).remove()
        })
    };
    b.hangup = f;
    b.start = function(a, b) {
        if (Application.user.isLog || 1 == b) {
            if (Application.user.id == a) return $(".btnCall a.button", "#content").slideUp(), $(".btnCall .myself", "#content").slideDown(), e && clearTimeout(e), e = setTimeout(function() {
                $(".btnCall a.button", "#content").slideDown();
                $(".btnCall .myself", "#content").slideUp()
            }, 4E3), !1;
            var c = Application.frontUrl;
            Application.domain.url && (c = Application.domain.url);
            document.location.href = c + "/call/" + a
        } else c = Application.domain.url + "/call/", document.location.href = c
    };
    b.incoming = function(a) {
        $("#call").remove();
        $("#content").before('<div id="call" style="display:none;"></div>');
        $("#call").load("/call/incoming", a, function() {
            Init.action();
            $("#call").fadeIn()
        })
    };
    b.setCaller = function() {
        var a = $("#firstnameCall", "#call .infoCaller").val(),
            b = $("#lastnameCall", "#call .infoCaller").val(),
            c = $("#emailphone", "#call .infoCaller").val();
        Ajax.send("/call/setCaller/", {
            firstname: a,
            lastname: b,
            emailphone: c
        }, "", function() {})
    };
    b.blockConfirm = function() {
        $(".incomingCall .buttons", "#call").slideUp();
        $(".incomingCall .blockConfirm", "#call").slideDown()
    };
    b.blockCancel = function() {
        $(".incomingCall .buttons", "#call").slideDown();
        $(".incomingCall .blockConfirm", "#call").slideUp()
    };
    b.blockUser = function(a, b) {
        Ajax.send("/contact/userBlock/" + a, {});
        f(b)
    };
    b.fullscreen = function(a) {
        a = document.getElementById(a);
        document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement ||
            document.msFullscreenElement ? document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen() : a.requestFullscreen ? a.requestFullscreen() : a.webkitRequestFullscreen ? a.webkitRequestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.msRequestFullscreen && a.msRequestFullscreen()
    };
    b.end = function() {
        $("#call .layer > div").hide();
        $("#call .layer .endCall").show();
        $("#call .layer").fadeIn();
        setTimeout(function() {
            b.close()
        }, 4E3)
    };
    b.streamError = function() {
        $("#call .layer > div").hide();
        $("#call .layer .streamError").show();
        $("#call .layer").fadeIn();
        setTimeout(function() {
            b.close()
        }, 4E3)
    };
    b.close = function() {
        if (Tool.inIframe()) {
            var a = window.parent;
            a && a.postMessage("closeIframe", "*")
        }
        window.close();
        self.close();
        window.open("", "_self", "");
        window.close()
    };
    b.back = function() {
        var a = Application.domain.url;
        Application.domain.validated && (a = "http://" + Application.domain.name +
            ".cam");
        document.location.href = a
    }
})(Call || (Call = {}));
var Contact;
(function(c) {
    function e(b) {
        $('.telList .item[itemId="' + b + '"]', "#slide").slideUp(function() {
            $(this).remove()
        })
    }

    function f(b) {
        $('.emailList .item[itemId="' + b + '"]', "#slide").slideUp(function() {
            $(this).remove()
        })
    }
    c.remove = function(b) {
        var a = $(".content", "#slide");
        Ajax.send("/contact/delete", {
            contactId: b
        }, a)
    };
    c.save = function(b) {
        var a = $("#contacts .content", "#slide"),
            c = $('input[name="tel[]"]', a).map(function() {
                return $(this).val()
            }).get(),
            d = $('input[name="telId[]"]', a).map(function() {
                return $(this).val()
            }).get();
        c.shift();
        d.shift();
        var e = $('input[name="email[]"]', a).map(function() {
                return $(this).val()
            }).get(),
            f = $('input[name="emailId[]"]', a).map(function() {
                return $(this).val()
            }).get();
        e.shift();
        f.shift();
        c = {
            contactId: b,
            firstname: $("#firstname", a).val(),
            lastname: $("#lastname", a).val(),
            tel: c,
            telId: d,
            email: e,
            emailId: f,
            mycamId: $("#mycamId", a).val()
        };
        b ? Ajax.send("/contact/save/" + b, c, a) : Ajax.send("/contact/save", c, a)
    };
    c.block = function(b) {
        var a = $(".content", "#slide");
        Ajax.send("/contact/block/" + b, {
            contactId: b
        }, a)
    };
    c.unblock =
        function(b) {
            var a = $(".content", "#slide");
            Ajax.send("/contact/unblock/" + b, {
                contactId: b
            }, a)
        };
    c.userAdd = function(b) {
        var a = $(".content", "#slide");
        Ajax.send("/contact/userAdd/" + b, {}, a)
    };
    c.userBlock = function(b) {
        var a = $(".content", "#slide");
        Ajax.send("/contact/userBlock/" + b, {}, a)
    };
    c.histDelete = function() {
        var b = $(".content", "#slide");
        Ajax.send("/contact/histDelete", {}, b)
    };
    c.addPhone = function() {
        var b = $(".telList", "#slide"),
            a = $(".item.hide", b).clone();
        a.removeClass("hide");
        var c = new Date,
            d = Date.now() + "" + c.getMilliseconds();
        a.attr("itemId", d);
        $(".remove", a).click(function() {
            e(d)
        });
        $('input[name="telId[]"]', a).val(d);
        $('input[name="tel[]"]', a).attr("id", "tel" + d);
        b.append(a)
    };
    c.addEmail = function() {
        var b = $(".emailList", "#slide"),
            a = $(".item.hide", b).clone();
        a.removeClass("hide");
        var c = new Date,
            d = Date.now() + "" + c.getMilliseconds();
        a.attr("itemId", d);
        $(".remove", a).click(function() {
            f(d)
        });
        $('input[name="emailId[]"]', a).val(d);
        $('input[name="email[]"]', a).attr("id", "email" + d);
        b.append(a)
    };
    c.removePhone = e;
    c.removeEmail = f;
    c.call =
        function(b) {
            var a = $(".content", "#slide");
            Ajax.send("/contact/call/" + b, {
                contactId: b
            }, a)
        };
    c.invite = function(b, a, c) {
        b = $(".invite", "#slide");
        Ajax.send("/contact/invite", {
            contactId: c,
            type: a,
            id: c
        }, b)
    }
})(Contact || (Contact = {}));
var Feedback;
(function(a) {
    a.open = function() {
        $.fancybox.open([{
            src: Application.prefixLang + "/feedback",
            type: "ajax",
            opts: {
                onComplete: function() {
                    Init.action();
                    var a = window.location.href;
                    $('.modal.feedback input[name="url"]').val(a)
                }
            }
        }], {
            loop: !1,
            closeClickOutside: !1,
            touch: !1
        })
    };
    a.saveDone = function() {
        $(".modal.feedback").length && ($(".modal.feedback form").slideUp(), $(".modal.feedback .sendDone").slideDown(), setTimeout(function() {
            $.fancybox.close()
        }, 3E3))
    }
})(Feedback || (Feedback = {}));
var Livestream;
(function(b) {
    b.init = function() {
        if ($(".part-live").length) $(window).on("scroll", function() {
            var a = $(".layout-live"),
                c = a.innerHeight(),
                b = a.offset().top + c / 1.2;
            $(this).scrollTop() > b ? (a.css({
                height: c + "px"
            }), $(".part-live", a).addClass("mini")) : ($(".part-live", a).removeClass("mini"), a.css({
                height: "auto"
            }))
        })
    }
})(Livestream || (Livestream = {}));
var User;
(function(b) {
    b.startStream = function(b) {
        var a = "",
            d = $("#contacts #liveMode", "#slide").is(":checked") ? "private" : "public",
            c = $("#contact #liveTitle", "#slide").val(),
            a = a + ("privacy=" + d);
        c && (a += "&title=" + c);
        document.location.href = "/publish/" + b + "/?" + a
    }
})(User || (User = {}));
var Domain;
(function(b) {
    b.loadSocialPost = function(a, b, e, c) {
        var d = $('#content [moduleId="' + a + '"]');
        a = {
            nb: d.find(".item").length,
            pos: b,
            id: e,
            socialNetworkId: void 0
        };
        c && (a.socialNetworkId = c);
        $.ajax({
            url: "/domain/update/socialPost/",
            type: "POST",
            data: a,
            dataType: "html",
            success: function(a, e, c) {
                "top" == b && d.find(".socialList").prepend(a);
                "bottom" == b && d.find(".socialList").append(a);
                c.getResponseHeader("X-Has-More-Content") || d.find(".moreContent").hide();
                Init.action();
                Social.initMacy(Slide.displayed)
            }
        })
    };
    b.contactSend = function() {
        var a =
            $(".page.contact .contactForm"),
            b = {
                name: $("#name", a).val(),
                email: $("#email", a).val(),
                msg: $("#msg", a).val()
            };
        Ajax.send("/api/sendContact", b, a, function(a) {
            "error" == a.result && Tool.loaderBtn("btnSendContact", !1, !0)
        });
        Tool.loaderBtn("btnSendContact", !0, !1)
    };
    b.contactSendOk = function() {
        $(".page.contact .contactForm").slideUp();
        $(".page.contact .contactFormSuccess").slideDown()
    };
    b.chatSupport = function() {
        var a = "";
        void 0 !== Application.frontUrl && "" != Application.frontUrl && (a = Application.frontUrl);
        void 0 !== Application.prefixLang &&
            "" != Application.prefixLang && (a += Application.prefixLang);
        window.open(a + "/chatSupport", "chatSupport", "height=500,width=750");
        return !1
    };
    b.tutorial = function(a) {
        $.fancybox.close(!0);
        a || (a = "");
        $.fancybox.open([{
            src: "/slide/tutorial/" + a,
            type: "ajax",
            opts: {
                onComplete: function() {
                    Init.action();
                    "end" == a && setTimeout(function() {
                        $.fancybox.close()
                    }, 2500)
                }
            }
        }], {
            loop: !1,
            closeClickOutside: !1,
            touch: !1
        });
        return !1
    };
    b.disclaimer = function() {
        $.fancybox.close(!0);
        Application.displayDisclaimer = !1;
        $.fancybox.open([{
            src: "/domain/disclaimer",
            type: "ajax",
            opts: {
                onComplete: function() {}
            }
        }], {
            loop: !1,
            closeClickOutside: !1,
            smallBtn: !1,
            touch: !1
        });
        return !1
    };
    b.disclaimerAccept = function() {
        Tool.setCookie("displayDisclaimer", 1, 1E3);
        $.fancybox.close(!0)
    }
})(Domain || (Domain = {}));
var Map;
(function(d) {
    function k() {
        e = c = !1;
        if ("Object" == typeof Application.user.locationData) {
            var a = Application.user.locationData.latLng;
            var b = Application.user.locationData.zoom
        }
        a && 0 <= b && Application.user.displayLocation && d.contactMapInit(a, b)
    }

    function g(a, b) {
        if (!c) {
            var d = {
                    center: a,
                    zoom: b,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoomControl: !0,
                    mapTypeControl: !1,
                    scaleControl: !1,
                    streetViewControl: !1,
                    rotateControl: !1,
                    fullscreenControl: !1
                },
                f = document.getElementById("mapPartContact");
            c = new google.maps.Map(f, d);
            e =
                new google.maps.Marker({
                    position: a,
                    map: c
                })
        }
    }
    var h = {},
        c = !1,
        e = !1;
    d.init = function() {
        if ($("#mapPartContact").length && Application.user.displayLocation) {
            var a = Application.user.locationData.latLng;
            a = new google.maps.LatLng(a.lat, a.lng);
            g(a, Application.user.locationData.zoom);
            k()
        }
        $(".module.map", "#content").each(function() {
            $(this).attr("moduleId")
        })
    };
    d.contactMapReset = k;
    d.contactMapInit = g;
    d.contactMapUpdate = function(a, b) {
        c || g(a, b);
        c.setZoom(b);
        c.setCenter(a);
        e.setPosition(a)
    };
    d.addMarker = function(a, b, c) {
        var f =
            h[a].map;
        if (!c) {
            var e = new Date;
            c = Date.now() + "" + e.getMilliseconds()
        }
        b || (b = f.getCenter());
        b = new google.maps.Marker({
            position: b,
            map: f,
            title: "New marker : " + c,
            draggable: !0
        });
        b.markerId = c;
        b.mapId = a;
        h[a].markerList[c] = b;
        b.addListener("click", function() {
            var b = "<b>New marker !</b><br />I am a new marker<br>" + this.getPosition().toString();
            b += "<br>Id " + c;
            d.isEditMode(a) && (b += "<br><a href=\"Javascript:Map.removeMarker('" + a + "', '" + c + "')\">Delete</a>");
            (void 0).setContent(b);
            (void 0).open(f, this)
        })
    };
    d.removeMarker =
        function(a, b) {
            h[a].markerList[b].setMap(null)
        };
    d.isEditMode = function(a) {
        return $(".module #" + a, "#content").hasClass("selected") ? !0 : !1
    }
})(Map || (Map = {}));
(function(c) {
    c.fn.serializeObject = function() {
        var e = this,
            f = {},
            d = {},
            h = /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
            k = /[a-zA-Z0-9_]+|(?=\[\])/g,
            l = /^$/,
            m = /^\d+$/,
            n = /^[a-zA-Z0-9_]+$/;
        this.build = function(a, c, b) {
            a[c] = b;
            return a
        };
        this.push_counter = function(a) {
            void 0 === d[a] && (d[a] = 0);
            return d[a]++
        };
        c.each(c(this).serializeArray(), function() {
            if (h.test(this.name)) {
                for (var a, d = this.name.match(k), b = this.value, g = this.name; void 0 !== (a = d.pop());) g = g.replace(new RegExp("\\[" + a + "\\]$"), ""), a.match(l) ? b =
                    e.build([], e.push_counter(g), b) : a.match(m) ? b = e.build([], a, b) : a.match(n) && (b = e.build({}, a, b));
                f = c.extend(!0, f, b)
            }
        });
        return f
    }
})(jQuery);
var Tooltip;
(function(a) {
    a.init = function(a) {
        "undefined" == typeof a && (a = !1);
        a ? $(".tooltips", a).tooltip({
            showBody: "|"
        }) : $(".tooltips").tooltip({
            showBody: "|"
        })
    }
})(Tooltip || (Tooltip = {}));
(function(a) {
    a.fn.tipr = function(d) {
        var e = a.extend({
            speed: 200,
            mode: "below",
            space: 70
        }, d);
        return this.each(function() {
            var d = -1;
            a(document).on("mousemove", function(a) {
                d = a.clientY
            });
            var h = a(window).height();
            a(this).hover(function() {
                var c = e.mode;
                a(window).on("resize", function() {
                    h = a(window).height()
                });
                h - d < e.space ? c = "above" : (c = e.mode, a(this).attr("data-mode") && (c = a(this).attr("data-mode")));
                tipr_cont = ".tipr_container_" + c;
                c = '<div class="tipr_container_' + c + '"><div class="tipr_point_' + c + '"><div class="tipr_content">' +
                    a(this).attr("title") + "</div></div></div>";
                a(this).after(c);
                c = a(tipr_cont).outerWidth();
                c = a(this).width() / 2 - c / 2;
                a(tipr_cont).css("margin-left", c + "px");
                a(this).removeAttr("title alt");
                a(tipr_cont).fadeIn(e.speed)
            }, function() {
                a(tipr_cont).remove()
            })
        })
    }
})(jQuery);
(function(a) {
    function d(b) {
        return a.data(b, "tooltip")
    }

    function e(b) {
        d(this).delay ? l = setTimeout(h, d(this).delay) : h();
        q = !!d(this).track;
        a(document.body).bind("mousemove", c);
        c(b)
    }

    function t() {
        if (!a.tooltip.blocked && this != g && (this.tooltipText || d(this).bodyHandler)) {
            g = this;
            p = this.tooltipText;
            if (d(this).bodyHandler) {
                b.title.hide();
                var f = d(this).bodyHandler.call(this);
                f.nodeType || f.jquery ? b.body.empty().append(f) : b.body.html(f);
                b.body.show()
            } else if (d(this).showBody) {
                f = p.split(d(this).showBody);
                b.title.html(f.shift()).show();
                b.body.empty();
                for (var c = 0, k; k = f[c]; c++) 0 < c && b.body.append("<br/>"), b.body.append(k);
                b.body.hideWhenEmpty()
            } else b.title.html(p).show(), b.body.hide();
            d(this).showURL && a(this).url() ? b.url.html(a(this).url().replace("http://", "")).show() : b.url.hide();
            b.parent.addClass(d(this).extraClass);
            d(this).fixPNG && b.parent.fixPNG();
            e.apply(this, arguments)
        }
    }

    function h() {
        l = null;
        d(g).fade ? b.parent.is(":animated") ? b.parent.stop().show().fadeTo(d(g).fade, g.tOpacity) : b.parent.is(":visible") ? b.parent.fadeTo(d(g).fade,
            g.tOpacity) : b.parent.fadeIn(d(g).fade) : b.parent.show();
        c()
    }

    function c(f) {
        if (!(a.tooltip.blocked || f && "OPTION" == f.target.tagName))
            if (!q && b.parent.is(":visible") && a(document.body).unbind("mousemove", c), null == g) a(document.body).unbind("mousemove", c);
            else {
                b.parent.removeClass("viewport-right").removeClass("viewport-bottom");
                var m = b.parent[0].offsetLeft,
                    k = b.parent[0].offsetTop;
                if (f && g) {
                    var e = d(g);
                    if (!e) return;
                    m = f.pageX + e.left;
                    k = f.pageY + e.top;
                    f = "auto";
                    e.positionLeft && (f = a(window).width() - m, m = "auto");
                    b.parent.css({
                        left: m,
                        right: f,
                        top: k
                    })
                }
                e = a(window).scrollLeft();
                f = a(window).scrollTop();
                var h = a(window).width(),
                    l = a(window).height(),
                    n = b.parent[0];
                e + h < n.offsetLeft + n.offsetWidth && (m -= n.offsetWidth + 20 + d(g).left, b.parent.css({
                    left: m + "px"
                }).addClass("viewport-right"));
                f + l < n.offsetTop + n.offsetHeight && (k -= n.offsetHeight + 20 + d(g).top, b.parent.css({
                    top: k + "px"
                }).addClass("viewport-bottom"))
            }
    }

    function r(f) {
        function c() {
            b.parent.removeClass(e.extraClass).hide().css("opacity", "")
        }
        if (!a.tooltip.blocked) {
            l && clearTimeout(l);
            g = null;
            var e =
                d(this);
            "undefined" == typeof e ? a("#tooltip").hide() : (e.fade ? b.parent.is(":animated") ? b.parent.stop().fadeTo(e.fade, 0, c) : b.parent.stop().fadeOut(e.fade, c) : c(), d(this).fixPNG && b.parent.unfixPNG())
        }
    }
    var b = {},
        g, p, l, q = !1;
    a.tooltip = {
        blocked: !1,
        defaults: {
            delay: !1,
            fade: 150,
            showURL: !1,
            extraClass: "",
            top: 15,
            left: 15,
            track: !0,
            id: "tooltip"
        },
        block: function() {
            a.tooltip.blocked = !a.tooltip.blocked
        }
    };
    a.fn.extend({
        tooltip: function(c) {
            c = a.extend({}, a.tooltip.defaults, c);
            b.parent || (b.parent = a('<div id="' + c.id + '"><div class="t_title"></div><div class="t_body"></div><div class="t_url"></div></div>').appendTo(document.body).hide(),
                a.fn.bgiframe && b.parent.bgiframe(), b.title = a("div.t_title", b.parent), b.body = a("div.t_body", b.parent), b.url = a("div.t_url", b.parent));
            return this.each(function() {
                if (!this.tooltipText || this.title) a.data(this, "tooltip", c), this.tOpacity = b.parent.css("opacity"), this.tooltipText = this.title, a(this).removeAttr("title"), this.alt = "";
                c.disabled && (this.tooltipText = "")
            }).mouseover(t).mouseout(r).click(r)
        },
        fixPNG: function() {
            return this
        },
        unfixPNG: function() {
            return this
        },
        hideWhenEmpty: function() {
            return this.each(function() {
                a(this)[a(this).html() ?
                    "show" : "hide"]()
            })
        },
        url: function() {
            return this.attr("href") || this.attr("src")
        }
    })
})(jQuery);
var Translation;
(function(a) {
    function b(d, e, a) {
        if (!(d in f)) return d;
        d = f[d];
        if (e && "object" == typeof e) {
            a = a && "escape" in a ? a.escape : !0;
            for (var c in e)
                if (e.hasOwnProperty(c)) {
                    var b = e[c];
                    a && (b = StringTool.escapeHtml(b));
                    c = c.match(/^[a-zA-Z]/) ? "#" + c + "#" : "" + c;
                    d = d.replace("" + c, b)
                }
        }
        return d
    }
    var f = {};
    a.load = function(a) {
        if (a)
            for (var b in a) a.hasOwnProperty(b) && (f[b] = a[b])
    };
    a.tr = b;
    a.trNumber = function(a, e, f, c) {
        f["#NUMBER#"] = e;
        return b(a, f, c)
    }
})(Translation || (Translation = {}));
(function() {
    var a = document.getElementById("translation-data");
    if (a) {
        if ("textContent" in a) var b = a.textContent;
        else(b = jQuery(a).text()) || (b = jQuery(a).html());
        b && Translation.load(jQuery.parseJSON(b))
    }
})();
var AppHome;
(function(a) {
    function d() {
        $("#btn-get-random").bind("click", function() {
            a.Action.randomNumber()
        });
        $("#btn-ajax-echo").bind("click", function() {
            a.Action.serverEcho($("#txt-echo-content").val(), $("#chk-do-error").is(":checked"))
        });
        document.getElementById("actionDisplayUsername").addEventListener("click", function() {
            alert("As JS: " + Application.usernameRaw + "\nAs HTML: " + Application.usernameHtml)
        })
    }
    a.main = function() {
        d()
    };
    (function(a) {
        a.randomNumberOnSuccess = function(b) {
            $("#ajax-random-number").html(b.toString())
        };
        a.serverEchoOnSuccess =
            function(b) {
                $("#ajax-echo").html(StringTool.escapeHtml(b))
            }
    })(a.Render || (a.Render = {}));
    (function(a) {
        a.getRandomNumber = function() {
            return Core.Ajax.post("/rnd/1/500")
        };
        a.serverEcho = function(a, c) {
            return Core.Ajax.post("/home/echo", {
                content: a,
                doError: c ? 1 : 0
            })
        }
    })(a.Ajax || (a.Ajax = {}));
    (function(c) {
        c.randomNumber = function() {
            $("#btn-get-random").attr("disabled", "disabled");
            a.Ajax.getRandomNumber().then(function(b) {
                a.Render.randomNumberOnSuccess(b.value)
            }).fail(function(a) {
                alert("RandomNumber: Error " + a.code +
                    ": " + a.msg)
            }).always(function() {
                $("#btn-get-random").removeAttr("disabled")
            })
        };
        c.serverEcho = function(b, c) {
            $("#btn-ajax-echo").attr("disabled", "disabled");
            a.Ajax.serverEcho(b, c).then(function(b) {
                a.Render.serverEchoOnSuccess(b.display)
            }).fail(function(a) {
                alert("serverEcho: Error " + a.code + ": " + a.msg)
            }).always(function() {
                $("#btn-ajax-echo").removeAttr("disabled")
            })
        }
    })(a.Action || (a.Action = {}));
    $(".btnURL").click(function(a) {
        var b = $(this).attr("href");
        window.history.pushState(b, b, b);
        a.preventDefault();
        history.replaceState("", b, "")
    })
})(AppHome || (AppHome = {}));