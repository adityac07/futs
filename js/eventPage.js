! function (e) {
    var t = {};

    function a(r) {
        if (t[r]) return t[r].exports;
        var n = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(n.exports, n, n.exports, a), n.l = !0, n.exports
    }
    a.m = e, a.c = t, a.d = function (e, t, r) {
        a.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: r
        })
    }, a.r = function (e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, a.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return a.d(t, "a", t), t
    }, a.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, a.p = "", a(a.s = 257)
}({
    257: function (e, t, a) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r, n, o, i, s, c, u = a(72);
        ! function () {
            var e = this,
                t = function (t, a) {
                    var r, n = t.split("."),
                        o = window || e;
                    n[0] in o || !o.execScript || o.execScript("var " + n[0]);
                    for (; n.length && (r = n.shift());) n.length || void 0 === a ? o = o[r] ? o[r] : o[r] = {} : o[r] = a
                },
                a = function (e) {
                    var t = chrome.runtime.connect("nmmhkkegccagdldgiimedpiccmgmieda", {}),
                        a = !1;
                    t.onMessage.addListener(function (t) {
                        a = !0, "response" in t && !("errorType" in t.response) ? e.success && e.success(t) : e.failure && e.failure(t)
                    }), t.onDisconnect.addListener(function () {
                        !a && e.failure && e.failure({
                            request: {},
                            response: {
                                errorType: "INTERNAL_SERVER_ERROR"
                            }
                        })
                    }), t.postMessage(e)
                };
            t("google.payments.inapp.buy", function (e) {
                e.method = "buy", a(e)
            }), t("google.payments.inapp.consumePurchase", function (e) {
                e.method = "consumePurchase", a(e)
            }), t("google.payments.inapp.getPurchases", function (e) {
                e.method = "getPurchases", a(e)
            }), t("google.payments.inapp.getSkuDetails", function (e) {
                e.method = "getSkuDetails", a(e)
            })
        }(), r = window, n = document, o = "script", i = "ga", r.GoogleAnalyticsObject = i, r.ga = r.ga || function () {
            (r.ga.q = r.ga.q || []).push(arguments)
        }, r.ga.l = 1 * Number(new Date), s = n.createElement(o), c = n.getElementsByTagName(o)[0], s.async = 1, s.src = "https://www.google-analytics.com/analytics.js", c.parentNode.insertBefore(s, c), ga("create", "UA-108017342-2", "auto"), ga("set", "checkProtocolTask", function () {}), ga("send", "pageview");
        var l = null;

        function m(e) {
            ga("send", {
                hitType: "event",
                eventCategory: "telemetry",
                eventAction: e
            })
        }
        chrome.runtime.onInstalled.addListener(function (e) {
            var t = chrome.runtime.getManifest().version,
                a = e.previousVersion;
            "update" === e.reason && t !== a ? (m("update-" + t), chrome.runtime.reload()) : "install" === e.reason && chrome.runtime.reload()
        }), chrome.runtime.onMessage.addListener(function (e, t, a) {
            var r = !1;
            if (e.contactDeveloper) chrome.tabs.query({
                active: !0
            }, function (e) {
                var t = e[0].id;
                chrome.tabs.create({
                    active: !0,
                    url: "mailto:shortfuts@gmail.com?subject=shortfuts%20feedback"
                }, function (e) {
                    setTimeout(function () {
                        chrome.tabs.remove(e.id), chrome.tabs.update(t, {
                            highlighted: !0
                        })
                    }, 150)
                })
            });
            else if (e.review) chrome.tabs.create({
                active: !0,
                url: "https://chrome.google.com/webstore/detail/shortfuts/piepdojghinggmddebidfkhfbdaggnmh"
            });
            else if (e.search) l = Date.now(), chrome.storage.sync.set({
                lastSearchTime: l
            }), chrome.storage.sync.get("searchCount", function (e) {
                var t, a = e.searchCount;
                t = a ? a + 1 : 1, chrome.storage.sync.set({
                    searchCount: t
                })
            });
            else if (e.warningShown) m("searchingTooQuicklyWarningShown"), chrome.storage.sync.get("warningCount", function (e) {
                e.warningCount ? chrome.storage.sync.set({
                    warningCount: e.warningCount + 1
                }) : chrome.storage.sync.set({
                    warningCount: 1
                })
            });
            else if (e.isPremiumUser) r = !0, u.default(function (e) {
                a({
                    isPremium: e
                })
            });
            else if (e.futChief1) m("futChief1");
            else if (e.futTradingMethods) m("futTradingMethods");
            else if (e.cardBought) {
                var n = Date.now() - (l || 0) < 3e3;
                chrome.storage.sync.get(["snipeCount", "binCount"], function (e) {
                    var t = e.snipeCount,
                        a = e.binCount,
                        r = t || 0;
                    n && (r = t ? t + 1 : 1);
                    var o = a ? a + 1 : 1;
                    chrome.storage.sync.set({
                        snipeCount: r,
                        binCount: o
                    }, function () {
                        chrome.tabs.query({
                            active: !0,
                            currentWindow: !0
                        }, function (e) {
                            chrome.tabs.sendMessage(e[0].id, {
                                forCounter: !0,
                                snipeCount: r,
                                binCount: o
                            })
                        })
                    })
                })
            } else if (e.binStatsIsOpen) chrome.storage.sync.set({
                binStatsIsOpen: e.binStatsIsOpen
            });
            else if (e.presetsIsOpen) chrome.storage.sync.set({
                presetsIsOpen: e.presetsIsOpen
            });
            else if (e.preset1) chrome.storage.sync.set({
                preset1: e.preset1
            }, function () {
                return chrome.tabs.query({
                    active: !0,
                    currentWindow: !0
                }, function (t) {
                    chrome.tabs.sendMessage(t[0].id, {
                        preset1Updated: e.preset1
                    })
                })
            });
            else if (e.preset2) chrome.storage.sync.set({
                preset2: e.preset2
            }, function () {
                return chrome.tabs.query({
                    active: !0,
                    currentWindow: !0
                }, function (t) {
                    chrome.tabs.sendMessage(t[0].id, {
                        preset2Updated: e.preset2
                    })
                })
            });
            else if (e.preset3) chrome.storage.sync.set({
                preset3: e.preset3
            }, function () {
                return chrome.tabs.query({
                    active: !0,
                    currentWindow: !0
                }, function (t) {
                    chrome.tabs.sendMessage(t[0].id, {
                        preset3Updated: e.preset3
                    })
                })
            });
            else if (e.preset4) chrome.storage.sync.set({
                preset4: e.preset4
            }, function () {
                return chrome.tabs.query({
                    active: !0,
                    currentWindow: !0
                }, function (t) {
                    chrome.tabs.sendMessage(t[0].id, {
                        preset4Updated: e.preset4
                    })
                })
            });
            else if (e.preset5) chrome.storage.sync.set({
                preset5: e.preset5
            }, function () {
                return chrome.tabs.query({
                    active: !0,
                    currentWindow: !0
                }, function (t) {
                    chrome.tabs.sendMessage(t[0].id, {
                        preset5Updated: e.preset5
                    })
                })
            });
            else if (e.getPricingData) {
                r = !0;
                var o = e.resourceId,
                    i = e.platform;
                fetch("https://apisf.futalert.co.uk/api/player/fetchplayerprice", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    referrer: "no-referrer",
                    body: JSON.stringify({
                        PlayerExternalId: o,
                        PlatformId: "ps" === i ? 1 : 2
                    })
                }).then(function (e) {
                    return e.json()
                }).then(function (e) {
                    "Fail" !== e.Status.StatusType && null !== e.PriceInformation.Price || a({
                        status: "fail"
                    }), a({
                        bin: e.PriceInformation.Price,
                        lastUpdated: e.PriceInformation.RemainingTime
                    })
                }).catch(function () {
                    a({
                        status: "requestFailed"
                    })
                })
            } else e.reportSearchResults ? fetch("https://apisf.futalert.co.uk/api/player/pushprices", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                referrer: "no-referrer",
                body: JSON.stringify({
                    PlayerList: e.data
                })
            }) : e.getPlayerPrices ? (r = !0, fetch("https://apisf.futalert.co.uk/api/player/fetchplayerprices", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                referrer: "no-referrer",
                body: JSON.stringify({
                    PlayerExternalIds: e.playerExternalIds,
                    PlatformId: "ps" === e.platform ? 1 : 2
                })
            }).then(function (e) {
                return e.json()
            }).then(function (e) {
                "Fail" === e.Status.StatusType && a({
                    status: "fail"
                }), a({
                    priceInformation: e.PricesInformation
                })
            }).catch(function () {
                a({
                    status: "requestFailed"
                })
            })) : e.showCalculator && chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }, function (e) {
                chrome.tabs.sendMessage(e[0].id, {
                    showCalculator: !0
                })
            });
            return r
        })
    },
    72: function (e, t, a) {
        "use strict";
        var r = this && this.__awaiter || function (e, t, a, r) {
                return new(a || (a = Promise))(function (n, o) {
                    function i(e) {
                        try {
                            c(r.next(e))
                        } catch (e) {
                            o(e)
                        }
                    }

                    function s(e) {
                        try {
                            c(r.throw(e))
                        } catch (e) {
                            o(e)
                        }
                    }

                    function c(e) {
                        e.done ? n(e.value) : new a(function (t) {
                            t(e.value)
                        }).then(i, s)
                    }
                    c((r = r.apply(e, t || [])).next())
                })
            },
            n = this && this.__generator || function (e, t) {
                var a, r, n, o, i = {
                    label: 0,
                    sent: function () {
                        if (1 & n[0]) throw n[1];
                        return n[1]
                    },
                    trys: [],
                    ops: []
                };
                return o = {
                    next: s(0),
                    throw: s(1),
                    return: s(2)
                }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                    return this
                }), o;

                function s(o) {
                    return function (s) {
                        return function (o) {
                            if (a) throw new TypeError("Generator is already executing.");
                            for (; i;) try {
                                if (a = 1, r && (n = 2 & o[0] ? r.return : o[0] ? r.throw || ((n = r.return) && n.call(r), 0) : r.next) && !(n = n.call(r, o[1])).done) return n;
                                switch (r = 0, n && (o = [2 & o[0], n.value]), o[0]) {
                                    case 0:
                                    case 1:
                                        n = o;
                                        break;
                                    case 4:
                                        return i.label++, {
                                            value: o[1],
                                            done: !1
                                        };
                                    case 5:
                                        i.label++, r = o[1], o = [0];
                                        continue;
                                    case 7:
                                        o = i.ops.pop(), i.trys.pop();
                                        continue;
                                    default:
                                        if (!(n = (n = i.trys).length > 0 && n[n.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                            i = 0;
                                            continue
                                        }
                                        if (3 === o[0] && (!n || o[1] > n[0] && o[1] < n[3])) {
                                            i.label = o[1];
                                            break
                                        }
                                        if (6 === o[0] && i.label < n[1]) {
                                            i.label = n[1], n = o;
                                            break
                                        }
                                        if (n && i.label < n[2]) {
                                            i.label = n[2], i.ops.push(o);
                                            break
                                        }
                                        n[2] && i.ops.pop(), i.trys.pop();
                                        continue
                                }
                                o = t.call(e, i)
                            } catch (e) {
                                o = [6, e], r = 0
                            } finally {
                                a = n = 0
                            }
                            if (5 & o[0]) throw o[1];
                            return {
                                value: o[0] ? o[1] : void 0,
                                done: !0
                            }
                        }([o, s])
                    }
                }
            };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = function (e) {
            return r(this, void 0, void 0, function () {
                return n(this, function (t) {
                    return chrome.identity.getProfileUserInfo(function (t) {
                        var a = ["marte", "csgol", "tybra", "rober", "Sveop", "marcv", "chr.t", "akhta", "moham", "Sodex", "Sahan", "youri", "patru", "marce", "tabou", "iwage", "taylo", "magnu", "henda", "hauke", "PSANG", "ytnew", "denis", "marc.", "octav", "amade", "khita", "ph.pa", "djkla", "t.sac", "moham", "flori", "isaac", "97abd", "bgull", "maxva", "ahmad", "ruaan", "jelte", "bamau", "simon", "danie", "milan", "lucas", "Phili", "jon.p", "lobo.", "Cyril", "eddy9", "Benja", "icaka", "shand", "ahmed", "burha", "Allan", "risho", "netol", "kooij", "Mikin", "joeri", "fault", "c.m.s", "Jahnc", "emile", "Mfath", "asmor", "osman", "kiani", "brand", "l45as", "geert", "yahtz", "kabou", "KyleT", "chsan", "Khlla", "james", "deven", "nille", "nekro", "adria", "exec8", "xxthe", "nickl", "jean.", "henri", "tomas", "phili", "dexiz", "rafal", "s.zie", "dm.ma", "mikl0", "haava", "Fawce", "david", "lampr", "omars", "breez", "kmogn", "lucia", "stini", "jandy", "emili", "lysy6", "dre08", "Mr.al", "fussb", "cappi", "j.bon", "moham", "bmons", "nagy4", "Essam", "emils", "bass1", "karee", "cdean", "stasi", "obero", "emart", "xenqp", "oalay", "markd", "danie", "nikol", "shane", "sd.cz", "Chiel", "tugtu", "gwiib", "sjrsv", "loreu", "valer", "furka", "rvsuu", "goula", "souli", "nkuip", "coran", "quinn", "jekel", "maqui", "amird", "chris", "hidek", "tomij", "peetm", "mkaar", "akkez", "fabia", "crs.n", "ferna", "thedj", "marco", "mbopa", "malch", "ofrei", "aaron", "mahdy", "thiju", "ron1n", "magma", "Thati", "mariu", "tobia", "ronal", "linus", "damm0", "jonas", "peluc", "F.wal", "armen", "karim", "hdooa", "fatko", "bo.2.", "rawan", "terje", "tarek", "halfd", "bauke", "dhkue", "ander", "jakej", "vapec", "suley", "farik", "jabul", "sheko", "clv8a", "jbaar", "maxib", "orodi", "ols19", "buett", "bestm", "krijn", "kmain", "futin", "david", "t.m.n", "willi", "yahya", "khali", "feder", "djcan", "wuu.p", "omerm", "third", "djese", "fbxse", "danie", "oemer", "97.za", "hi.fo", "ebgam", "milan", "black", "pedja", "goerk", "gwiib", "artox", "vande", "jmaga", "nikla", "davis", "khai7", "vaugh", "klajd", "Abulo", "deije", "dave.", "darap", "kevin", "marvi", "altun", "jovan", "thepi", "Althe", "Hayde", "charl", "oguzh", "labor", "st0rm", "jweea", "bahra", "veilo", "moska", "oprim", "amrhu", "Hydre", "eie36", "dudua", "balda", "Hamed", "Baloc", "bnjgr", "ramyr", "hansi", "eugen", "Tkrin", "ebrah", "Wahbi", "shawk", "velmi", "y.sin", "tmac4", "ibaty", "migue", "Wolfa", "mafut", "bartr", "benla", "lenno", "samet", "lesmi", "rakes", "tommp", "r.kos", "nico9", "giane", "luker", "playi", "lenna", "dara.", "weise", "musli", "casva", "drrrk", "Sasch", "khnsn", "burak", "ernes", "conta", "onder", "wieth", "julia", "datsc", "vande", "wille", "faerb", "plavs", "major", "ikben", "sovan", "bengo", "agust", "broed", "EvanB", "nieky", "rober"].map(function (e) {
                                return e.toLocaleLowerCase()
                            }),
                            r = t.email && t.email.toLocaleLowerCase() || "";
                        a.indexOf(r.substring(0, 5)) > -1 ? e(!0) : window.google.payments.inapp.getPurchases({
                            parameters: {
                                env: "prod"
                            },
                            success: function (t) {
                                e(o(t.response.details))
                            },
                            failure: function () {
                                e(!1)
                            }
                        })
                    }), [2]
                })
            })
        };
        var o = function (e) {
            for (var t = 0, a = e; t < a.length; t++) {
                var r = a[t];
                if (r && "premium_subscription" === r.sku && "ACTIVE" === r.state) return !0;
                if (r && "premium_subscription_149" === r.sku && "ACTIVE" === r.state) return !0;
                if (r && "premium_fifa_20" === r.sku && "ACTIVE" === r.state) return !0
            }
            return !1
        }
    }
});