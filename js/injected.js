! function (e) {
    var t = {};

    function r(a) {
        if (t[a]) return t[a].exports;
        var n = t[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return e[a].call(n.exports, n, n.exports, r), n.l = !0, n.exports
    }
    r.m = e, r.c = t, r.d = function (e, t, a) {
        r.o(e, t) || Object.defineProperty(e, t, {
            configurable: !1,
            enumerable: !0,
            get: a
        })
    }, r.r = function (e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, r.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return r.d(t, "a", t), t
    }, r.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, r.p = "", r(r.s = 211)
}({
    12: function (e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = r(32),
            n = r(69);
        window.addEventListener("message", function (e) {
            if (e.source == window && e.data.type && "lastSalePrice" == e.data.type) {
                var t = e.data,
                    r = t.lastSalePrice,
                    a = t.bin,
                    n = t.lastUpdated,
                    s = t.platform,
                    d = t.futAlertPath,
                    c = t.hideProfit,
                    u = i(),
                    p = document.createElement("div");
                p.style.display = "flex", p.style.justifyContent = "center", p.style.alignItems = "center", p.style.flexDirection = "column", p.style.padding = "6px", p.style.fontSize = "14px";
                var f = c ? "" : o(a, r);
                p.innerHTML = "<strong>Current price on " + s + '</strong><span style="font-size: 10px; margin: 4px 0">(updated ' + n + ')</span><div style="font-size: 24px; margin: 12px 0 6px 0" class="currency-coins">' + a.toLocaleString() + "</div>" + f + '</div><div style="font-size: 12px; display: flex; align-items: center; ' + (f ? "margin-top: 12px" : "") + '">Pricing data provided by <a href="https://portfolio.futalert.co.uk/welcome" target="_blank" style="color: #fc003f; margin: 0 3px">FUT Alert</a><span><img style="height: 30px; border-radius: 50%;" src="' + d + '"/></span></div>', u.appendChild(p), l(u)
            }
        }, !1), t.clearPricingDataContainer = function () {
            var e = document.getElementsByClassName("DetailView")[0],
                t = document.getElementById("pricingDataContainer");
            t && e.removeChild(t)
        }, t.addPricingDataContainerMessage = function (e, t) {
            var r = i();
            r.style.padding = "12px";
            var a = document.createElement("div");
            if (a.style.display = "flex", a.style.justifyContent = "center", a.innerText = e, r.appendChild(a), t) {
                var n = document.createElement("div");
                n.style.display = "flex", n.style.justifyContent = "center", n.innerText = t, n.style.fontSize = "12px", r.appendChild(n)
            }
            l(r)
        }, t.displayPricingData = function (e, t, r) {
            var a;
            "xbox" === r ? a = "Xbox" : "ps" === r ? a = "PlayStation" : "pc" === r && (a = "PC"), window.postMessage({
                type: "getLastSalePrice",
                data: {
                    bin: e,
                    lastUpdated: t,
                    platform: a,
                    futAlertPath: chrome.extension.getURL("futAlert.jpg")
                }
            }, "*")
        };
        var i = function () {
                t.clearPricingDataContainer();
                var e = document.createElement("div");
                return e.id = "pricingDataContainer", e.style.display = "flex", e.style.flexDirection = "column", e.style.alignItems = "center", e.style.justifyContent = "center", e.style.backgroundColor = "#30383f", e.style.color = "white", e.style.margin = "0", e.style.padding = "4px", e
            },
            l = function (e) {
                document.getElementsByClassName("DetailView")[0].prepend(e)
            },
            o = function (e, t) {
                if (a.default() || n.default()) return "";
                var r = Math.floor(e - t - .05 * e);
                return '<div>(<span style="color: ' + (r > 0 ? "lightgreen" : "indianred") + '">' + r.toLocaleString() + "</span> profit)</div>"
            }
    },
    211: function (e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var a = r(12),
            n = ["ClubSearchResultsSplitViewController", "UTMarketSearchResultsSplitViewController", "UTTransferListSplitViewController", "UTUnassignedItemsSplitViewController", "UTWatchListSplitViewController", "UTSBCSquadSplitViewController", "UTSquadSplitViewController"],
            i = ["ClubSearchResultsSplitViewController", "UTMarketSearchResultsSplitViewController"];
        window.addEventListener("message", function (e) {
            if (e.source == window) {
                var t;
                try {
                    t = getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController().getCurrentController().className
                } catch (e) {}
                if (e.data.type && "getPlayerResourceId" == e.data.type) {
                    if (!l(t)) return void a.addPricingDataContainerMessage("Unable to get pricing data from this page.");
                    if ("UTSBCSquadSplitViewController" === t || "UTSquadSplitViewController" === t) {
                        var r = parseInt(document.getElementsByClassName("ut-squad-slot-view ui-slot-selected")[0].getAttribute("index")),
                            n = getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController().getCurrentController()._squad._players[r];
                        return void window.postMessage({
                            type: "playerResourceId",
                            resourceId: n._item.resourceId,
                            platform: e.data.platform
                        }, "*")
                    }
                    var d = o(),
                        c = s();
                    d && c && c.forEach(function (t, r) {
                        d[r].classList.value.indexOf("selected") > -1 && window.postMessage({
                            type: "playerResourceId",
                            resourceId: t.data.resourceId,
                            platform: e.data.platform
                        }, "*")
                    })
                } else if (e.data.type && "getPlatform" == e.data.type) {
                    var u = null;
                    services.User.getUser().getSelectedPersona().isPlaystation && (u = "ps"), services.User.getUser().getSelectedPersona().isPC && (u = "pc"), services.User.getUser().getSelectedPersona().isXbox && (u = "xbox"), window.postMessage({
                        type: "platform",
                        platform: u
                    }, "*")
                } else if (e.data.type && "getMinPrice" == e.data.type) {
                    if (!l(t)) return void a.addPricingDataContainerMessage("Unable to list players on this page.");
                    var p = o();
                    c = s();
                    p && c && c.forEach(function (e, t) {
                        p[t].classList.value.indexOf("selected") > -1 && window.postMessage({
                            type: "minPrice",
                            minPrice: e.data._itemPriceLimits.minimum
                        }, "*")
                    })
                } else if (e.data.type && "searchIsUnmodified" == e.data.type) {
                    var f = [];
                    if ((c = s()).length >= 20) return;
                    c.forEach(function (e, t) {
                        var r = e.data.resourceId,
                            a = e.data._auction.buyNowPrice,
                            n = e.data._auction.expires;
                        f.push({
                            PlayerExternalId: r,
                            Price: a,
                            RemainingTime: n
                        })
                    }), window.postMessage({
                        type: "reportSearchResults",
                        data: f
                    }, "*")
                } else if (e.data.type && "getLastSalePrice" == e.data.type) {
                    if ("UTSBCSquadSplitViewController" === t || "UTSquadSplitViewController" === t) {
                        r = parseInt(document.getElementsByClassName("ut-squad-slot-view ui-slot-selected")[0].getAttribute("index")), n = getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController().getCurrentController()._squad._players[r];
                        var g = e.data.data,
                            y = g.bin,
                            m = g.lastUpdated,
                            w = (u = g.platform, g.futAlertPath);
                        return void window.postMessage({
                            type: "lastSalePrice",
                            lastSalePrice: n._item.lastSalePrice,
                            bin: y,
                            lastUpdated: m,
                            platform: u,
                            futAlertPath: w,
                            hideProfit: 0 === n._item.discardValue
                        }, "*")
                    }
                    var C = o();
                    c = s();
                    C && c && c.forEach(function (t, r) {
                        if (C[r].classList.value.indexOf("selected") > -1) {
                            var a = e.data.data,
                                n = a.bin,
                                i = a.lastUpdated,
                                l = a.platform,
                                o = a.futAlertPath;
                            window.postMessage({
                                type: "lastSalePrice",
                                lastSalePrice: t.data.lastSalePrice,
                                bin: n,
                                lastUpdated: i,
                                platform: l,
                                futAlertPath: o,
                                hideProfit: 0 === t.data.discardValue
                            }, "*")
                        }
                    })
                } else if (e.data.type && "getPlayerExternalIds" == e.data.type) {
                    if (-1 === i.indexOf(t)) return;
                    var v = [];
                    (c = s()).forEach(function (e, t) {
                        var r = e.data.resourceId; - 1 === v.indexOf(r) && v.push(r)
                    }), window.postMessage({
                        type: "playerExternalIds",
                        playerExternalIds: v,
                        platform: e.data.platform
                    }, "*")
                } else if (e.data.type && "paintRows" == e.data.type) {
                    var _ = e.data.priceInformation;
                    c = s();
                    try {
                        document.getElementsByClassName("ut-pinned-list-container SearchResults ui-layout-left")[0].addEventListener("click", function () {
                            a.clearPricingDataContainer()
                        })
                    } catch (e) {}
                    try {
                        document.getElementsByClassName("ut-pinned-list-container ut-club-search-results-view ui-layout-left")[0].addEventListener("click", function () {
                            a.clearPricingDataContainer()
                        })
                    } catch (e) {}
                    c.forEach(function (e, t) {
                        var r = e.data.resourceId;
                        e.data.untradeable || e.data.loans > 0 || _.forEach(function (t) {
                            if (t.PlayerExternalId == r) {
                                var a = parseInt(e.data._auction.buyNowPrice) || e.data.lastSalePrice,
                                    n = t.Price - a - .05 * t.Price,
                                    i = Math.max(parseInt(e.data._auction.startingBid), parseInt(e.data._auction.currentBid)),
                                    l = t.Price - i - .05 * t.Price;
                                a && n > 0 ? (e.__root.classList.add("shouldBin"), e.__rowContent.classList.add("shouldBin")) : i && l > 0 && (e.__root.classList.add("shouldBid"), e.__rowContent.classList.add("shouldBid"))
                            }
                        })
                    })
                }
            }
        }, !1);
        var l = function (e) {
                return n.indexOf(e) > -1
            },
            o = function () {
                return $(getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController()._view.__root).find(".listFUTItem")
            },
            s = function () {
                var e, t = d();
                return t ? t._view._list && t._view._list._listRows && t._view._list._listRows.length > 0 ? t._view._list._listRows : t._view._sections && t._view._sections.length > 0 ? (t._view._sections.forEach(function (t) {
                    t._listRows.length > 0 && (e = e ? e.concat(t._listRows) : t._listRows)
                }), e) : void 0 : null
            },
            d = function () {
                var e = getAppMain().getRootViewController().getPresentedViewController().getCurrentViewController().getCurrentController(),
                    t = e.className;
                return "UTUnassignedItemsSplitViewController" === t || "UTWatchListSplitViewController" === t ? e && e._leftController && e._leftController._view ? e._leftController : null : e && e._listController && e._listController._view ? e._listController : null
            }
    },
    32: function (e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = function () {
            return document.getElementsByClassName("SearchResults").length > 0
        }
    },
    69: function (e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = function () {
            return document.getElementsByClassName("ut-watch-list-view").length > 0
        }
    }
});