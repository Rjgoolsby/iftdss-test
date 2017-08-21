/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
window.MadCap = {};
MadCap.CreateNamespace = function(b) {
    var d = b.split(".");
    var e = MadCap;
    for (var a = 0, c = d.length; a < c; a++) {
        var b = d[a];
        if (b == "MadCap") {
            continue
        }
        if (typeof(e[b]) != "undefined") {
            e = e[b];
            continue
        }
        e[b] = {};
        e = e[b]
    }
    return e
};
if (!Object.create) {
    Object.create = function(b) {
        if (arguments.length > 1) {
            throw new Error("Object.create implementation only accepts the first parameter.")
        }

        function a() {}
        a.prototype = b;
        return new a()
    }
}
if (typeof String.prototype.trim !== "function") {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, "")
    }
}
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(b) {
        var a = this.length >>> 0;
        var c = Number(arguments[1]) || 0;
        c = (c < 0) ? Math.ceil(c) : Math.floor(c);
        if (c < 0) {
            c += a
        }
        for (; c < a; c++) {
            if (c in this && this[c] === b) {
                return c
            }
        }
        return -1
    }
}
MadCap.Extend = function(a, b) {
    b.prototype = Object.create(a.prototype);
    b.prototype.constructor = b;
    b.prototype.base = a.prototype
};
MadCap.Exception = function(b, a) {
    this.Number = b;
    this.Message = a
};
MadCap.IsIOS = function() {
    return MadCap.String.Contains(navigator.userAgent, "iphone") || MadCap.String.Contains(navigator.userAgent, "ipad")
};
MadCap.IsIBooks = function() {
    return MadCap.HasEpubReadingSystem() && navigator.epubReadingSystem.name == "iBooks"
};
MadCap.HasEpubReadingSystem = function() {
    return "epubReadingSystem" in navigator
};
MadCap.IsSafari = function() {
    return MadCap.String.Contains(navigator.userAgent, "safari") && !MadCap.String.Contains(navigator.userAgent, "chrome")
};
(function() {
    var a = MadCap.CreateNamespace("String");
    a.IsNullOrEmpty = function(b) {
        if (b == null) {
            return true
        }
        if (b.length == 0) {
            return true
        }
        return false
    };
    a.StartsWith = function(f, e, c) {
        if (e == null) {
            return false
        }
        if (f.length < e.length) {
            return false
        }
        var d = f;
        var b = e;
        if (!c) {
            d = d.toLowerCase();
            b = b.toLowerCase()
        }
        if (d.substring(0, b.length) == b) {
            return true
        } else {
            return false
        }
    };
    a.EndsWith = function(f, e, c) {
        if (e == null) {
            return false
        }
        if (f.length < e.length) {
            return false
        }
        var d = f;
        var b = e;
        if (!c) {
            d = d.toLowerCase();
            b = b.toLowerCase()
        }
        if (d.substring(d.length - b.length) == b) {
            return true
        } else {
            return false
        }
    };
    a.Contains = function(h, g, c) {
        var d = c ? h : h.toLowerCase();
        if ($.isArray(g)) {
            for (var e = 0, f = g.length; e < f; e++) {
                var b = c ? g[e] : g[e].toLowerCase();
                if (d.indexOf(b) != -1) {
                    return true
                }
            }
            return false
        }
        var b = c ? g : g.toLowerCase();
        return d.indexOf(b) != -1
    };
    a.Trim = function(b) {
        return a.TrimRight(a.TrimLeft(b))
    };
    a.TrimLeft = function(d) {
        var b = 0;
        var c = d.length;
        for (b = 0; b < c && d.charAt(b) == " "; b++) {}
        return d.substring(b, d.length)
    };
    a.TrimRight = function(c) {
        var b = 0;
        for (b = c.length - 1; b >= 0 && c.charAt(b) == " "; b--) {}
        return c.substring(0, b + 1)
    };
    a.ToBool = function(e, c) {
        var b = c;
        if (e != null) {
            var d = e.toLowerCase();
            if (d != "true" && d != "false" && d != "1" && d != "0" && d != "yes" && d != "no") {
                throw new MadCap.Exception(-1, "The string can not be converted to a boolean value.")
            }
            b = d == "true" || d == "1" || d == "yes"
        }
        return b
    };
    a.ToInt = function(d, b) {
        var c = b;
        if (d != null) {
            c = parseInt(d)
        }
        return c
    };
    a.ToDashed = function(b) {
        return b.replace(/([A-Z])/g, function(c) {
            return "-" + c.toLowerCase()
        })
    };
    a.LocaleCompare = function(d, c, e) {
        if (e) {
            if (typeof Intl !== "undefined" && typeof Intl.Collator !== "undefined") {
                var b = new Intl.Collator(e);
                if (b) {
                    return b.compare(d, c)
                }
            }
            if (String.prototype.localeCompare) {
                return d.localeCompare(c, e)
            }
        }
        return d < c ? -1 : d > c ? 1 : 0
    };
    a.Compare = function(f, e) {
        var h = f.length;
        var g = e.length;
        for (var d = 0; d < h && d < g; d++) {
            var c = f.charCodeAt(d);
            var b = e.charCodeAt(d);
            if (c < b) {
                return -1
            } else {
                if (c > b) {
                    return 1
                }
            }
        }
        if (h < g) {
            return -1
        } else {
            if (h > g) {
                return 1
            } else {
                return 0
            }
        }
    };
    a.IsPunctuation = function(b) {
        var d = b.charCodeAt(0);
        return (d >= 33 && d <= 35) || (d >= 37 && d <= 42) || (d >= 44 && d <= 47) || (d == 58 || d == 59) || (d == 63 || d == 64) || (d >= 91 && d <= 93) || (d == 95) || (d == 123) || (d == 125) || (d == 161) || (d == 171) || (d == 173) || (d == 183) || (d == 187) || (d == 191) || (d == 894) || (d == 903) || (d >= 1370 && d <= 1375) || (d == 1417 || d == 1418) || (d == 1470) || (d == 1472) || (d == 1475) || (d == 1478) || (d == 1523 || d == 1524) || (d == 1548 || d == 1549) || (d == 1563) || (d == 1566 || d == 1567) || (d >= 1642 && d <= 1645) || (d == 1748) || (d >= 1792 && d <= 1805) || (d >= 2039 && d <= 2041) || (d == 2404 || d == 2405) || (d == 2416) || (d == 3572) || (d >= 3663 && d <= 3675) || (d >= 3844 && d <= 3858) || (d >= 3898 && d <= 3901) || (d == 3973) || (d == 4048 || d == 4049) || (d >= 4170 && d <= 4175) || (d == 4347) || (d >= 4961 && d <= 4968) || (d == 5741 || d == 5742) || (d == 5787 || d == 5788) || (d >= 5867 && d <= 5869) || (d == 5941 || d == 5942) || (d >= 6100 && d <= 6102) || (d >= 6104 && d <= 6106) || (d >= 6144 && d <= 6154) || (d == 6468 || d == 6469) || (d == 6622 || d == 6623) || (d == 6686 || d == 6687) || (d >= 7002 && d <= 7008) || (d >= 8208 && d <= 8231) || (d >= 8240 && d <= 8259) || (d >= 8261 && d <= 8273) || (d >= 8275 && d <= 8286) || (d == 8317 || d == 8318) || (d == 8333 || d == 8334) || (d == 9001 || d == 9002) || (d >= 10088 && d <= 10101) || (d >= 10181 && d <= 10182) || (d >= 10214 && d <= 10219) || (d >= 10627 && d <= 10648) || (d >= 10712 && d <= 10715) || (d == 10748 || d == 10749) || (d >= 11513 && d <= 11516) || (d == 11518 || d == 11519) || (d >= 11776 && d <= 11799) || (d == 11804 || d == 11805) || (d >= 12289 && d <= 12291) || (d >= 12296 && d <= 12305) || (d >= 12308 && d <= 12319) || (d == 12336) || (d == 12349) || (d == 12448) || (d == 12539) || (d >= 43124 && d <= 43127) || (d == 64830 || d == 64831) || (d >= 65040 && d <= 65049) || (d >= 65072 && d <= 65106) || (d >= 65108 && d <= 65121) || (d == 65123) || (d == 65128) || (d == 65130 || d == 65131) || (d >= 65281 && d <= 65283) || (d >= 65285 && d <= 65290) || (d >= 65292 && d <= 65295) || (d == 65306 || d == 65307) || (d == 65311 || d == 65312) || (d >= 65339 && d <= 65341) || (d == 65343) || (d == 65371) || (d == 65373) || (d >= 65375 && d <= 65381)
    };
    a.Split = function(h, g) {
        var c = h.length;
        var f = [];
        var b = -1,
            d = -1;
        for (var e = 0; e <= c; e++) {
            if (e == c || g(h.charAt(e))) {
                if (b > -1) {
                    f.push(h.slice(b, d));
                    b = -1
                }
            } else {
                if (b == -1) {
                    b = e
                }
                d = e + 1
            }
        }
        return f
    }
})();
(function() {
    MadCap.CreateNamespace("DEBUG");
    var a = MadCap.DEBUG;
    a.Log = {};
    a.Log.Create = function() {
        var e = document.createElement("div");
        e.setAttribute("id", "DEBUG_Log");
        var f = document.createElement("div");
        $(f).addClass("MCDebugLogHeader");
        f.appendChild(document.createTextNode("Log Console"));
        e.appendChild(f);
        var d = document.createElement("div");
        $(d).addClass("MCDebugLogBody");
        e.appendChild(d);
        var c = document.createElement("div");
        $(c).addClass("MCDebugLogFooter");
        e.appendChild(c);
        document.body.appendChild(e);
        var b = new MadCap.DragDrop(e, f)
    };
    a.Log._LoadTime = new Date();
    a.Log.AddLine = function(d) {
        if (parent != window) {
            MadCap.Utilities.CrossFrame.PostMessageRequest(parent, "DEBUG-AddLine", [d], null);
            return
        }
        var f = document.getElementById("DEBUG_Log");
        if (f == null) {
            return
        }
        var c = new Date();
        var h = c - a.Log._LoadTime;
        var e = document.createElement("p");
        $(e).addClass("MCDebugLogEntryTime");
        e.appendChild(document.createTextNode(h + "ms " + c.toLocaleTimeString()));
        var b = document.createElement("div");
        $(b).addClass("MCDebugLogEntry");
        b.appendChild(e);
        b.appendChild(document.createTextNode(d));
        var g = MadCap.Dom.GetElementsByClassName("MCDebugLogBody", "div", f)[0];
        g.insertBefore(b, g.firstChild)
    }
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function() {
    MadCap.CreateNamespace("Dom");
    var a = MadCap.Dom;
    a.Dataset = function(c, b) {
        return c.getAttribute("data-" + MadCap.String.ToDashed(b))
    };
    a.GetElementsByClassName = function(g, b, c) {
        b = b || "*";
        c = c || document;
        var d = new Array();
        var j = c.getElementsByTagName(b);
        for (var e = 0, h = j.length; e < h; e++) {
            var f = j[e];
            if ($(f).hasClass(g)) {
                d[d.length] = f
            }
        }
        return d
    };
    a.GetElementsByAttribute = function(h, k, l, j) {
        l = l || "*";
        j = j || document;
        var c = new Array();
        var b = j.getElementsByTagName(l);
        for (var g = 0, e = b.length; g < e; g++) {
            var d = b[g];
            var f = a.GetAttribute(d, h);
            if (f == k) {
                c[c.length] = d
            }
        }
        return c
    };
    a.GetChildNodeByTagName = function(d, f, e) {
        var c = null;
        var g = -1;
        for (var b = d.firstChild; b != null; b = b.nextSibling) {
            if (b.nodeName.toLowerCase() == f.toLowerCase()) {
                g++;
                if (g == e) {
                    c = b;
                    break
                }
            }
        }
        return c
    };
    a.GetAncestorNodeByTagName = function(d, e, f) {
        f = f || document.body;
        var c = null;
        var b = d.parentNode;
        while (b != null && b != f) {
            if (b.nodeName.toLowerCase() == e.toLowerCase()) {
                c = b;
                break
            }
            b = b.parentNode
        }
        return c
    };
    a.GetAttribute = function(b, e) {
        var d = b.getAttribute(e);
        if (d == null) {
            d = b.getAttribute(e.toLowerCase());
            if (d == null) {
                var c = e.indexOf(":");
                if (c != -1) {
                    d = b.getAttribute(e.substring(c + 1, e.length))
                }
            }
        }
        return d
    };
    a.GetAttributeInt = function(e, c, b) {
        var d = b;
        var f = a.GetAttribute(e, c);
        if (f != null) {
            d = parseInt(f)
        }
        return d
    };
    a.GetAttributeBool = function(e, d, c) {
        var b = c;
        var f = a.GetAttribute(e, d);
        if (f != null) {
            b = MadCap.String.ToBool(f, c)
        }
        return b
    };
    a.GetScrollPosition = function() {
        var b = 0;
        var c = 0;
        if (typeof(window.pageYOffset) != "undefined") {
            b = window.pageXOffset;
            c = window.pageYOffset
        } else {
            if (typeof(document.documentElement.scrollTop) != "undefined" && document.documentElement.scrollTop > 0) {
                b = document.documentElement.scrollLeft;
                c = document.documentElement.scrollTop
            }
        }
        return {
            X: b,
            Y: c
        }
    }
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function() {
    MadCap.CreateNamespace("Utilities");
    MadCap.Utilities.Dictionary = function(f) {
        this._Map = new Object();
        this._Overflows = new Array();
        this._Length = 0;
        this._IgnoreCase = f == true
    };
    var a = MadCap.Utilities.Dictionary;
    a.prototype.GetLength = function(f) {
        return this._Length
    };
    a.prototype.ForEach = function(j) {
        var f = this._Map;
        for (var n in f) {
            var m = f[n];
            var l = j(n, m);
            if (l != undefined && !l) {
                return
            }
        }
        var h = this._Overflows;
        for (var k = 0, g = h.length; k < g; k++) {
            var o = h[k];
            var l = j(o.Key, o.Value);
            if (l != undefined && !l) {
                return
            }
        }
    };
    a.prototype.GetItem = function(g) {
        if (this._IgnoreCase) {
            g = g.toLowerCase()
        }
        var h = null;
        if (typeof(this._Map[g]) == "function") {
            var f = this.GetItemOverflowIndex(g);
            if (f >= 0) {
                h = this._Overflows[f].Value
            }
        } else {
            h = this._Map[g];
            if (typeof(h) == "undefined") {
                h = null
            }
        }
        return h
    };
    a.prototype.GetItemOverflowIndex = function(g) {
        if (this._IgnoreCase) {
            g = g.toLowerCase()
        }
        var j = this._Overflows;
        for (var f = 0, h = j.length; f < h; f++) {
            if (j[f].Key == g) {
                return f
            }
        }
        return -1
    };
    a.prototype.Remove = function(g) {
        if (this._IgnoreCase) {
            g = g.toLowerCase()
        }
        if (typeof(this._Map[g]) == "function") {
            var f = this.GetItemOverflowIndex(g);
            if (f >= 0) {
                this._Overflows.splice(f, 1);
                this._Length--
            }
        } else {
            if (typeof(this._Map[g]) != "undefined") {
                delete(this._Map[g]);
                this._Length--
            }
        }
    };
    a.prototype.Add = function(f, h) {
        if (this._IgnoreCase) {
            f = f.toLowerCase()
        }
        if (typeof(this._Map[f]) == "function") {
            var g = this.GetItem(f);
            if (g != null) {
                this.Remove(f)
            }
            this._Overflows[this._Overflows.length] = {
                Key: f,
                Value: h
            }
        } else {
            this._Map[f] = h
        }
        this._Length++
    };
    a.prototype.AddUnique = function(f, h) {
        if (this._IgnoreCase) {
            f = f.toLowerCase()
        }
        var g = this.GetItem(f);
        if (typeof(g) == "undefined" || !g) {
            this.Add(f, h)
        }
    };
    MadCap.Utilities.DateTime = function(h) {
        var g = /\/Date\(([0-9]+)\)\//i;
        var f = g.exec(h);
        if (f != null) {
            this.Date = new Date(parseInt(f[1]))
        } else {
            this.Date = new Date(h)
        }
    };
    var c = MadCap.Utilities.DateTime;
    c.Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    MadCap.Utilities.TimeSpan = function(g, f) {
        if (typeof g == "undefined") {
            g = new Date()
        }
        if (typeof f == "undefined") {
            f = new Date()
        }
        if (g > f) {
            this.FromDate = f;
            this.ToDate = g
        } else {
            this.FromDate = g;
            this.ToDate = f
        }
        this.Ticks = this.ToDate - this.FromDate;
        this.Seconds = this.Ticks / 1000;
        this.Minutes = this.Seconds / 60;
        this.Hours = this.Minutes / 60;
        this.Days = this.Hours / 24
    };
    var b = MadCap.Utilities.TimeSpan;
    b.prototype.ToDurationString = function() {
        if (this.Minutes < 1) {
            return "Just now"
        }
        if (this.Hours < 1) {
            return parseInt(this.Minutes) + " minutes ago"
        }
        if (this.Days < 1) {
            return parseInt(this.Hours) + " hours ago"
        }
        if (this.Days < 30) {
            return parseInt(this.Days) + " days ago"
        }
        var f = c.Months[this.FromDate.getMonth()] + " " + this.FromDate.getDate();
        if (this.FromDate.getFullYear() != this.ToDate.getFullYear()) {
            f += ", " + this.FromDate.getFullYear()
        }
        return f
    };
    MadCap.Utilities.Url = function(h) {
        var g = this;
        var f = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
        this._Segments = [];
        this.FullPath = null;
        this.Path = null;
        this.PlainPath = null;
        this.Name = null;
        this.Extension = null;
        this.NameWithExtension = null;
        this.FullFragment = null;
        this.Fragment = null;
        this.Query = null;
        this.Origin = null;
        this.IsAbsolute = false;
        this.IsRootRelative = false;
        this.IsFolder = false;
        this.QueryMap = new MadCap.Utilities.Dictionary(true);
        this.HashMap = new MadCap.Utilities.Dictionary(true);
        (function() {
            var j = "";
            var t = "";
            var l = "";
            var z = "";
            var y = h.indexOf("#");
            var w = h.indexOf("?");
            if (y != -1) {
                t = h.substring(y);
                if (y > w) {
                    j = h.substring(y)
                } else {
                    j = h.substring(y, w)
                }
            }
            if (w != -1) {
                if (w > y) {
                    l = h.substring(w)
                } else {
                    l = h.substring(w, y)
                }
            }
            var n = y > -1 ? (w > -1 ? Math.min(y, w) : y) : w;
            var u = h.substring(0, n == -1 ? h.length : n);
            n = u.lastIndexOf("/");
            var s = u.substring(0, n + 1);
            var i = u.substring(n + 1);
            n = i.lastIndexOf(".");
            var A = i.substring(0, n);
            var m = i.substring(n + 1);
            var q = "";
            n = u.indexOf(":");
            if (n >= 0) {
                q = u.substring(0, n)
            }
            var v = !MadCap.String.IsNullOrEmpty(q);
            if (!MadCap.String.IsNullOrEmpty(h)) {
                var o = h;
                if (MadCap.String.EndsWith(o, "/")) {
                    o = o.substring(0, o.length - 1)
                }
                g._Segments = o.split("/");
                if (v) {
                    var r = h.match(f);
                    if (r) {
                        if (r[4]) {
                            z = r[1] + ":" + r[2] + r[3] + ":" + r[4]
                        } else {
                            z = r[1] + ":" + r[2] + r[3]
                        }
                        g.Origin = z
                    }
                }
            }
            g.FullPath = h;
            g.Path = s;
            g.PlainPath = u;
            g.Name = A;
            g.Extension = m;
            g.NameWithExtension = i;
            g.Scheme = q;
            g.IsAbsolute = v;
            g.IsRootRelative = MadCap.String.StartsWith(u, "/", false);
            g.IsFolder = MadCap.String.EndsWith(u, "/");
            g.FullFragment = t;
            g.Fragment = j;
            g.Query = l;
            var p = g.Query;
            if (!MadCap.String.IsNullOrEmpty(p)) {
                p = p.substring(1);
                p = p.replace(/\+/g, " ");
                x(p, "&", g.QueryMap)
            }
            var k = g.Fragment;
            if (!MadCap.String.IsNullOrEmpty(k)) {
                k = k.substring(1);
                x(k, "&", g.HashMap)
            }

            function x(K, C, B) {
                var H = K.split(C);
                for (var F = 0, D = H.length; F < D; F++) {
                    var E = H[F];
                    var G = E.indexOf("=");
                    var J = null;
                    var I = null;
                    if (G >= 0) {
                        J = decodeURIComponent(E.substring(0, G));
                        I = decodeURIComponent(E.substring(G + 1))
                    } else {
                        J = E
                    }
                    B.Add(J, I)
                }
            }
        })()
    };
    var e = MadCap.Utilities.Url;
    e.GetDocumentUrl = function() {
        return new e(document.location.href)
    };
    e.GetAbsolutePath = function(h) {
        var g = e.GetDocumentUrl();
        var f = new MadCap.Utilities.Url(g.PlainPath);
        if (!f.IsFolder) {
            f = f.ToFolder()
        }
        return f.CombinePath(h).FullPath
    };
    e.StripInvalidCharacters = function(f) {
        return f.replace(/(javascript:|data:|[<>])/gi, "")
    };
    e.ReplaceReservedCharacters = function(f, h) {
        var k = /[ ()&;,!'$]/;
        var j = f.split("");
        for (var g = 0; g < j.length; g++) {
            if (j[g].charCodeAt(0) > 127 || j[g].match(k)) {
                j[g] = h
            }
        }
        return j.join("")
    };
    e.Navigate = function(f) {
        document.location = e.StripInvalidCharacters(f)
    };
    e.GenerateNavigateTopicPath = function(g) {
        var h = g.IsRootRelative ? g.PlainPath : e.GetAbsolutePath(g.PlainPath);
        var f = e.GetDocumentUrl().QueryMap.GetItem("skinName") || g.QueryMap.GetItem("skinName");
        if (f != null) {
            h += ("?skinName=" + f)
        }
        if (g.FullFragment.indexOf("#search-") == 0) {
            h += g.FullFragment
        } else {
            if (g.QueryMap.GetLength() > 0) {
                h += (f == null) ? "?" : "&";
                g.QueryMap.ForEach(function(j, k) {
                    var i = ["skinName", "highlight"];
                    if (k && i.indexOf(j) == -1) {
                        h += (j + "=" + encodeURIComponent(k) + "&")
                    }
                });
                h = h.slice(0, -1)
            }
            h += g.Fragment
        }
        return h
    };
    e.NavigateTopic = function(f) {
        var g = e.GenerateNavigateTopicPath(f);
        e.Navigate(g)
    };
    e.OnNavigateTopic = function(h) {
        var f = $(this).attr("href");
        if (typeof f != "undefined") {
            var i = new e(f);
            if (!MadCap.String.IsNullOrEmpty(f) && !i.IsAbsolute && i.PlainPath) {
                var g = e.GenerateNavigateTopicPath(i);
                if (g != e.GetAbsolutePath(i.PlainPath)) {
                    MadCap.Utilities.PreventDefault(h);
                    e.Navigate(g)
                }
            } else {
                if (i.HashMap.GetLength() > 0) {
                    e.NavigateHash(i.Fragment);
                    $(window).trigger("hashchange");
                    h.preventDefault()
                }
            }
        }
    };
    e.NavigateHash = function(f) {
        document.location.hash = e.StripInvalidCharacters(f)
    };
    e.CurrentHash = function() {
        return new MadCap.Utilities.Url(document.location.href).FullFragment
    };
    e.prototype.AddFile = function(i) {
        if (typeof(i) == "string") {
            i = new e(i)
        }
        if (i.IsAbsolute) {
            return i
        }
        var h = i.FullPath;
        if (h.charAt(0) == "/") {
            var j = document.location;
            var k = j.href.lastIndexOf(j.pathname);
            var g = j.href.substring(0, k);
            return new e(g + h)
        }
        var f = this.FullPath;
        if (!MadCap.String.EndsWith(f, "/")) {
            f = f + "/"
        }
        return new e(f + h)
    };
    e.prototype.CombinePath = function(l) {
        if (typeof(l) == "string") {
            l = new e(l)
        }
        if (l.IsAbsolute) {
            throw new MadCap.Exception(-1, "Cannot combine two absolute paths.")
        }
        var j = l.FullPath;
        var k = l.FullPath.split("/");
        var o = this.FullPath;
        var m = "";
        if (this.Origin && l.IsRootRelative) {
            return new e(this.Origin + j)
        }
        if (this.Scheme == "mk") {
            var n = o.indexOf("::");
            m = o.substring(0, n + "::".length);
            o = o.substring(n + "::".length)
        }
        for (var h = 0, f = k.length; h < f; h++) {
            var g = k[h];
            if (o.length > 1 && MadCap.String.EndsWith(o, "/")) {
                o = o.substring(0, o.length - 1)
            }
            if (g == ".") {
                o += "/"
            } else {
                if (g == "..") {
                    o = o.substring(0, o.lastIndexOf("/") + 1)
                } else {
                    if (o != "" && !MadCap.String.EndsWith(o, "/")) {
                        o += "/"
                    }
                    o += g
                }
            }
        }
        o = m + o;
        return new e(o)
    };
    e.prototype.ToQuery = function(g) {
        var f = this.PlainPath + "?" + g + this.Fragment;
        return new e(f)
    };
    e.prototype.ToFolder = function() {
        var f = this.PlainPath;
        if (MadCap.String.EndsWith(f, "/")) {
            f = f.substring(0, f.length - 1)
        }
        var h = f.lastIndexOf("/");
        var g = f.substring(0, h + 1);
        return new e(g)
    };
    e.prototype.ToRelative = function(n) {
        if (typeof(n) == "string") {
            n = new e(n)
        }
        if (this.IsAbsolute != n.IsAbsolute) {
            return this
        }
        var k = 0;
        var l = n._Segments.length;
        for (; k < l; k++) {
            var g = this._Segments[k];
            var f = n._Segments[k];
            if (g != f) {
                break
            }
        }
        var m = "";
        var o = MadCap.String.EndsWith(n.FullPath, "/") ? 0 : 1;
        for (var h = 0; h < l - k - o; h++) {
            m += "../"
        }
        for (var h = k; h < this._Segments.length; h++) {
            if (h > k) {
                m += "/"
            }
            m += this._Segments[h]
        }
        return new e(m)
    };
    e.prototype.ToExtension = function(j) {
        var h = this.FullPath;
        var i = h.lastIndexOf(".");
        var g = h.substring(0, i);
        var f = g + "." + j;
        return new e(f)
    };
    e.prototype.ToScheme = function(f) {
        var h = this.FullPath;
        pos = h.indexOf(":");
        if (pos < 0) {
            return this
        }
        var g = f + ":" + h.substring(pos);
        return new e(g)
    };
    e.prototype.ToPath = function() {
        return new e(this.Path)
    };
    e.prototype.ToPlainPath = function() {
        return new e(this.PlainPath)
    };
    e.prototype.ToNoQuery = function() {
        return new e(this.PlainPath + this.Fragment)
    };
    e.prototype.ToNoFragment = function() {
        return new e(this.PlainPath + this.Query)
    };
    MadCap.Utilities.CrossFrame = {};
    var d = MadCap.Utilities.CrossFrame;
    d.MESSAGE_SEPARATOR = "%%%%%";
    d.DATA_SEPARATOR = "^^^^^";
    d._MessageID = 0;
    d._MessageInfos = new Array();
    d._MessageHandlerFuncs = new Array();
    d._PostMessage = function(h, f) {
        if (typeof h == "undefined" || h == null) {
            return
        }
        if (h.postMessage != null) {
            h.postMessage(f, "*");
            return
        }
        var g = {
            data: f,
            source: window
        };
        h.MadCap.Utilities.CrossFrame.OnMessage(g)
    };
    d.AddMessageHandler = function(h, g) {
        var f = d._MessageHandlerFuncs.length;
        d._MessageHandlerFuncs[f] = {
            HandlerFunc: h,
            ContextObj: g
        }
    };
    d.PostMessageRequest = function(n, k, l, f) {
        d._MessageInfos[d._MessageID] = f;
        var h = "";
        if (l != null) {
            for (var g = 0, j = l.length; g < j; g++) {
                if (g > 0) {
                    h += d.DATA_SEPARATOR
                }
                h += l[g]
            }
        }
        var m = "request" + d.MESSAGE_SEPARATOR + k + d.MESSAGE_SEPARATOR + h + d.MESSAGE_SEPARATOR + d._MessageID;
        d._PostMessage(n, m);
        d._MessageID++
    };
    d._PostMessageResponse = function(n, k, l, f) {
        var h = "";
        if (l != null) {
            for (var g = 0, j = l.length; g < j; g++) {
                if (g > 0) {
                    h += d.DATA_SEPARATOR
                }
                h += l[g]
            }
        }
        var m = "response" + d.MESSAGE_SEPARATOR + k + d.MESSAGE_SEPARATOR + h + d.MESSAGE_SEPARATOR + f;
        d._PostMessage(n, m);
        d._MessageID++
    };
    d.OnMessage = function(t) {
        var s = t.originalEvent;
        var o = s.data.split(d.MESSAGE_SEPARATOR);
        var m = o[0];
        var l = o[1];
        var j = o[2];
        var f = parseInt(o[3]);
        var h = null;
        if (!MadCap.String.IsNullOrEmpty(j)) {
            h = j.split(d.DATA_SEPARATOR);
            for (var p = 0, g = h.length; p < g; p++) {
                if (h[p] == "null") {
                    h[p] = null
                }
            }
        }
        if (m == "request") {
            var k = false;
            var x = true;
            var v = new Array();
            for (var p = 0, g = d._MessageHandlerFuncs.length; p < g; p++) {
                var w = d._MessageHandlerFuncs[p];
                var u = w.HandlerFunc;
                var q = w.ContextObj;
                var r = null;
                if (q != null) {
                    r = u.call(q, l, h, v, s.source, f)
                } else {
                    r = u(l, h, v, s.source, f)
                }
                k = r.Handled;
                x = r.FireResponse;
                if (k) {
                    break
                }
            }
            if (!k) {
                if (l == "DEBUG-AddLine") {
                    var l = h[0];
                    MadCap.DEBUG.Log.AddLine(l);
                    k = true
                } else {
                    if (l == "url") {
                        v[v.length] = document.location.href;
                        k = true
                    } else {
                        if (l == "get-title") {
                            v[v.length] = document.title;
                            k = true
                        } else {
                            if (l == "navigate") {
                                var n = h[0];
                                document.location.href = n;
                                k = true
                            }
                        }
                    }
                }
            }
            if (x) {
                d._PostMessageResponse(s.source, l, v.length > 0 ? v : null, f)
            }
        } else {
            if (m == "response") {
                if (d._MessageInfos[f] != null) {
                    d._MessageInfos[f](h)
                }
            }
        }
    };
    if (window.postMessage != "undefined") {
        $(window).bind("message", d.OnMessage)
    } else {}
    MadCap.Utilities.PreventDefault = function(f) {
        f.preventDefault ? f.preventDefault() : event.returnValue = false
    };
    MadCap.Utilities.AsyncForeach = function(i, g, h) {
        i = i.slice(0);

        function f() {
            var j = i.shift();
            g(j, function(k) {
                if (i.length > 0) {
                    f()
                } else {
                    h()
                }
            })
        }
        if (i.length > 0) {
            f()
        } else {
            h()
        }
    };
    MadCap.Utilities.Now = Date.now || function() {
        return new Date().getTime()
    };
    MadCap.Utilities.Has = function(g, f) {
        return g != null && Object.prototype.hasOwnProperty.call(g, f)
    };
    MadCap.Utilities.Debounce = function(h, j, g) {
        var m, l, f, k, n;
        var i = function() {
            var o = MadCap.Utilities.Now() - k;
            if (o < j && o > 0) {
                m = setTimeout(i, j - o)
            } else {
                m = null;
                if (!g) {
                    n = h.apply(f, l);
                    if (!m) {
                        f = l = null
                    }
                }
            }
        };
        return function() {
            f = this;
            l = arguments;
            k = MadCap.Utilities.Now();
            var o = g && !m;
            if (!m) {
                m = setTimeout(i, j)
            }
            if (o) {
                n = h.apply(f, l);
                f = l = null
            }
            return n
        }
    };
    MadCap.Utilities.Memoize = function(g, f) {
        var h = function(k) {
            var j = h.cache;
            var i = "" + (f ? f.apply(this, arguments) : k);
            if (!MadCap.Utilities.Has(j, i)) {
                j[i] = g.apply(this, arguments)
            }
            return j[i]
        };
        h.cache = {};
        return h
    };
    MadCap.Utilities.IsRuntimeFileType = function(f) {
        return MadCap.Dom.Dataset(document.documentElement, "mcRuntimeFileType") == f
    };
    MadCap.Utilities.HasRuntimeFileType = function(g) {
        var f = MadCap.Dom.Dataset(document.documentElement, "mcRuntimeFileType");
        return f && f.split(";").indexOf(g) > -1
    };
    MadCap.Utilities.CreateStylesheet = function(i, j) {
        var g = i || document,
            f;
        var h = g.createElement("style");
        if (j) {
            h.setAttribute("media", j)
        }
        g.getElementsByTagName("head")[0].appendChild(h);
        f = g.styleSheets[g.styleSheets.length - 1];
        return f
    };
    MadCap.Utilities.AsyncForeachParallel = function(l, j, k) {
        var h = 0;
        if (l.length === 0) {
            k()
        }
        var f = l.length;
        for (var g = 0; g < f; g++) {
            j(l[g], function() {
                h++;
                if (h === l.length) {
                    k()
                }
            })
        }
    };
    MadCap.Utilities.FixLink = function(h, g, i, f) {
        if (!h.IsAbsolute) {
            h = g.CombinePath(h);
            var j = h.FullPath;
            if (!MadCap.String.IsNullOrEmpty(i) && i != null && f) {
                h = h.ToRelative(f);
                j = i + h.FullPath
            }
            return j
        }
    };
    MadCap.Utilities.IsRTL = function() {
        return $("html").css("direction") === "rtl"
    };
    MadCap.Utilities.ToggleButtonState = function(f) {
        var i = $(f);
        var g = i.attr("data-current-state") || "1";
        var h = g == "1" ? 2 : 1;
        MadCap.Utilities.SetButtonState(f, h)
    };
    MadCap.Utilities.SetButtonState = function(h, l) {
        var m = $(h);
        var j = l == 1 ? 2 : 1;
        var k = m.attr("data-state" + l + "-class");
        var g = m.attr("data-state" + j + "-class");
        m.attr("data-current-state", l);
        m.removeClass(g).addClass(k);
        m.attr("title", m.attr("data-state" + l + "-title"));
        if (MadCap.Utilities.HasRuntimeFileType("SkinPreview")) {
            var f = m.attr("data-mc-style2");
            if (f) {
                var i = m.attr("data-mc-style1");
                if (!i) {
                    i = m.attr("data-mc-style");
                    m.attr("data-mc-style1", i)
                }
                m.attr("data-mc-style", l == 1 ? i : f)
            }
        }
    };
    MadCap.Utilities.LoadHandlers = Object.create(null);
    MadCap.Utilities.LoadScript = function(i, h, g) {
        var f = document.createElement("script");
        f.src = i;
        f.type = "text/javascript";
        if (f.addEventListener) {
            $(f).error(g);
            $(f).load(h)
        } else {
            if (f.readyState) {
                f.onreadystatechange = function() {
                    if (f.readyState == "loaded" || f.readyState == "complete") {
                        h()
                    }
                }
            }
        }
        document.getElementsByTagName("head")[0].appendChild(f);
        return f
    };
    MadCap.Utilities.LoadRegisteredScript = function(m, j, i, h) {
        var k = false;
        var f;
        $("script").each(function(n, o) {
            var p = $(o).attr("src");
            if (!MadCap.String.IsNullOrEmpty(p) && p.toLowerCase() == m.toLowerCase()) {
                k = true;
                f = o
            }
        });
        if (k) {
            var g = new MadCap.Utilities.Url(m).Name;
            var l = MadCap.Utilities.LoadHandlers[g];
            if (l) {
                l(h)
            }
            j()
        }
    };
    MadCap.Utilities.LoadScripts = function(f, i, h, g) {
        MadCap.Utilities.AsyncForeach(f, function(j, k) {
            if (!MadCap.String.IsNullOrEmpty(j)) {
                MadCap.Utilities.LoadRegisteredScript(j, k, h, g)
            } else {
                k()
            }
        }, i)
    };
    MadCap.Utilities.TopicUniqueStyleSheets = Object.create(null);
    MadCap.Utilities.LoadStyleSheets = function(g, f) {
        $.each(g, function(i, h) {
            if (!MadCap.String.IsNullOrEmpty(h)) {
                MadCap.Utilities.LoadStyleSheetUnique(h, f)
            }
        })
    };
    MadCap.Utilities.LoadStyleSheetUnique = function(i, g) {
        var h = false;
        $("link").each(function(k, l) {
            var j = $(l).attr("href");
            if (!MadCap.String.IsNullOrEmpty(j) && j.toLowerCase() == i.toLowerCase()) {
                h = true
            }
        });
        if (!h) {
            var f = '<link rel="stylesheet" type="text/css" href="{0}" />';
            cssLink = f.replace("{0}", i);
            if ($('link[href*="' + i + '"]').length == 0 || !MadCap.String.Contains(i, "/Topic.css", false)) {
                if (g) {
                    $(cssLink).insertAfter(g)
                } else {
                    $("head").append(insertIndex, cssLink)
                }
            }
        }
        MadCap.Utilities.TopicUniqueStyleSheets[i] = $('link[href*="' + i + '"]')
    };
    MadCap.Utilities.RemoveTopicStylesheets = function() {
        $.each(MadCap.Utilities.TopicUniqueStyleSheets, function(f, g) {
            $(g).remove()
        })
    };
    MadCap.Utilities.CombineRelevancy = function(h, g) {
        var f = MadCap.Utilities.CapNumber(h, g, 16, 0, 2);
        for (var j = 2; j < 7; j++) {
            f = MadCap.Utilities.CapNumber(f, g, 16, j, 1)
        }
        f = MadCap.Utilities.CapNumber(f, g, 16, 7, 1, 7);
        return f
    };
    MadCap.Utilities.CalculateScore = function(g, f, h) {
        return (Math.log(g) / Math.log(2147483647) * h) + (f * (1 - h))
    };
    MadCap.Utilities.CapNumber = function(j, i, p, l, f, n) {
        if (!n) {
            n = Math.pow(p, f) - 1
        }
        var g = Math.pow(p, l);
        var m = g * Math.pow(p, f);
        var o = ~~(j % m / g);
        var k = ~~(i % m / g);
        var h = Math.min(o + k, n);
        return j + ((h - o) * g)
    };
    MadCap.Utilities.Require = function(h, i) {
        if (!MadCap.Utilities._requireCache) {
            MadCap.Utilities._requireCache = Object.create(null)
        }
        var f = MadCap.Utilities._requireCache;
        var g = h[0];
        var j = f[g];
        if (j && j.data) {
            i(j.data)
        } else {
            if (j && j.callbacks) {
                j.callbacks.push(i)
            } else {
                f[g] = {
                    callbacks: [i]
                };
                require([g], function(l) {
                    j = f[g];
                    j.data = l;
                    for (var k = 0; k < j.callbacks.length; k++) {
                        j.callbacks[k](l)
                    }
                    j.callbacks = null;
                    require.undef(g)
                })
            }
        }
    };
    MadCap.Utilities.GetChunkId = function(f, l, k) {
        for (var h = 0; h < f.length; h++) {
            var g = f[h];
            var j = k(l, g);
            if (j === 0) {
                return h
            } else {
                if (j === -1) {
                    return h - 1
                }
            }
        }
        return f.length - 1
    };
    MadCap.Utilities.GetChunkIds = function(f, n, l) {
        var m = [];
        var j = false;
        for (var h = 0; h < f.length; h++) {
            var g = f[h];
            var k = l(n, g);
            if (k === -1 && h === 0) {
                return m
            }
            if (k === 0) {
                if (h > 0 && !j) {
                    m.push(h - 1)
                }
                m.push(h);
                j = true
            } else {
                if (k === -1) {
                    if (h > 0 && !j) {
                        m.push(h - 1)
                    }
                    break
                }
            }
        }
        if (m.length === 0) {
            m.push(f.length - 1)
        }
        return m
    };
    MadCap.Utilities.ClearRequireCache = function() {
        MadCap.Utilities._requireCache = null
    };
    MadCap.Utilities.StopWords = Array("a", "an", "the", "to", "of", "is", "for", "and", "or", "do", "be", "by", "he", "she", "on", "in", "at", "it", "not", "no", "are", "as", "but", "her", "his", "its", "non", "only", "than", "that", "then", "they", "this", "we", "were", "which", "with", "you", "into", "about", "after", "all", "also", "been", "can", "come", "from", "had", "has", "have", "me", "made", "many", "may", "more", "most", "near", "over", "some", "such", "their", "there", "these", "under", "use", "was", "when", "where", "against", "among", "became", "because", "between", "during", "each", "early", "found", "however", "include", "late", "later", "med", "other", "several", "through", "until", "who", "your");
    MadCap.Utilities.Store = (function() {
        try {
            if (window.localStorage) {
                return window.localStorage
            }
        } catch (h) {
            if (console && console.log) {
                console.log("window.localStorage not available")
            }
        }
        var g = "MadCap";
        var i = document.createElement("div");
        i.style.display = "none";
        document.getElementsByTagName("head")[0].appendChild(i);
        if (typeof i.addBehavior == "function") {
            i.addBehavior("#default#userdata");
            i.load(g);
            return {
                getItem: function(j) {
                    return i.XMLDocument.documentElement.getAttribute(j)
                },
                setItem: function(j, k) {
                    i.XMLDocument.documentElement.setAttribute(j, k);
                    i.save(g)
                },
                removeItem: function(j) {
                    i.removeAttribute(j);
                    i.save(g)
                }
            }
        }
        var f = "data-" + g + "-";
        return {
            getItem: function(j) {
                var k = i.getAttribute(f + j);
                return k ? decodeURIComponent(k) : k
            },
            setItem: function(j, k) {
                i.setAttribute(f + j, k ? encodeURIComponent(k) : null)
            },
            removeItem: function(j) {
                i.removeAttribute(f + j)
            }
        }
    })()
})();
Array.prototype.Remove = function(a) {
    if (a < 0 || a > this.length) {
        throw "Index out of bounds."
    }
    this.splice(a, 1)
};
Array.prototype.RemoveValue = function(b) {
    for (var a = this.length - 1; a >= 0; a--) {
        if (this[a] == b) {
            this.Remove(a)
        }
    }
};
Array.prototype.Union = function(b) {
    var a = [].concat(this);
    if (b) {
        for (var c = 0; c < b.length; c++) {
            if (this.indexOf(b[c]) === -1) {
                a.push(b[c])
            }
        }
    }
    return a
};
Array.prototype.Intersect = function(b) {
    var a = [];
    for (var c = 0; c < b.length; c++) {
        if (this.indexOf(b[c]) !== -1) {
            a.push(b[c])
        }
    }
    return a
};
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function() {
    MadCap.Utilities.Xhr = function(d, b, c) {
        var e = this;
        this._XmlDoc = null;
        this._XmlHttp = null;
        this._Args = d;
        this._LoadFunc = b;
        this._LoadContextObj = c;
        this.OnreadystatechangeLocal = function() {
            if (e._XmlDoc.readyState == 4) {
                e._XmlDoc.onreadystatechange = a._Noop;
                var f = null;
                if (e._XmlDoc.documentElement != null) {
                    f = e._XmlDoc
                }
                if (e._LoadContextObj == null) {
                    e._LoadFunc(f, e._Args)
                } else {
                    e._LoadFunc.call(e._LoadContextObj, f, e._Args)
                }
            }
        };
        this.OnreadystatechangeRemote = function() {
            if (e._XmlHttp.readyState == 4) {
                e._XmlHttp.onreadystatechange = a._Noop;
                var f = null;
                if (e._XmlHttp.responseXML != null && e._XmlHttp.responseXML.documentElement != null) {
                    f = e._XmlHttp.responseXML
                }
                if (e._LoadContextObj == null) {
                    e._LoadFunc(f, e._Args)
                } else {
                    e._LoadFunc.call(e._LoadContextObj, f, e._Args)
                }
            }
        }
    };
    var a = MadCap.Utilities.Xhr;
    a.prototype._LoadLocal = function(b, c) {
        if (window.ActiveXObject) {
            this._XmlDoc = a._GetMicrosoftXmlDomObject();
            this._XmlDoc.async = c;
            if (this._LoadFunc) {
                this._XmlDoc.onreadystatechange = this.OnreadystatechangeLocal
            }
            try {
                if (!this._XmlDoc.load(b)) {
                    this._XmlDoc = null
                }
            } catch (d) {
                this._XmlDoc = null
            }
        } else {
            if (window.XMLHttpRequest) {
                this._LoadRemote(b, c)
            }
        }
        return this._XmlDoc
    };
    a.prototype._LoadRemote = function(b, c) {
        this._XmlHttp = a._GetXhrObject();
        if (this._LoadFunc) {
            this._XmlHttp.onreadystatechange = this.OnreadystatechangeRemote
        }
        try {
            this._XmlHttp.open("GET", b, c);
            this._XmlHttp.send(null);
            if (!c && (this._XmlHttp.status == 0 || this._XmlHttp.status == 200)) {
                this._XmlDoc = this._XmlHttp.responseXML
            }
        } catch (d) {
            this._XmlHttp.abort();
            if (this._LoadFunc) {
                if (this._LoadContextObj == null) {
                    this._LoadFunc(null, this._Args)
                } else {
                    this._LoadFunc.call(this._LoadContextObj, null, this._Args)
                }
            }
        }
        return this._XmlDoc
    };
    a.prototype.Load = function(b, d) {
        var e = null;
        var c = document.location.protocol;
        if (c == "file:" || c == "mk:" || c == "ms-its:" || c == "app:") {
            e = this._LoadLocal(b, d)
        } else {
            if (c == "http:" || c == "https:") {
                e = this._LoadRemote(b, d)
            }
        }
        return e
    };
    a.LoadXmlString = function(c) {
        var b = null;
        if (window.ActiveXObject) {
            b = a._GetMicrosoftXmlDomObject();
            b.async = false;
            b.loadXML(c)
        } else {
            if (DOMParser) {
                var d = new DOMParser();
                b = d.parseFromString(c, "text/xml")
            }
        }
        return b
    };
    a.CreateXmlDocument = function(b) {
        var c = "<" + b + " />";
        var d = a.LoadXmlString(c);
        return d
    };
    a.GetOuterXml = function(d) {
        var b = null;
        if (window.ActiveXObject) {
            b = d.xml
        } else {
            if (window.XMLSerializer) {
                var c = new XMLSerializer();
                b = c.serializeToString(d)
            }
        }
        return b
    };
    a.ImportNode = function(c, b) {
        if (typeof(c.importNode) == "function") {
            return c.importNode(b, true)
        }
        return b.cloneNode(true)
    };
    a.CallWebService = function(e, d, f, b) {
        var c = new a(b, f, null);
        var g = c.Load(e, d);
        return g
    };
    a._MicrosoftXmlDomProgIDs = ["Msxml2.DOMDocument.6.0", "Msxml2.DOMDocument", "Microsoft.XMLDOM"];
    a._MicrosoftXmlHttpProgIDs = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
    a._MicrosoftXmlDomProgID = null;
    a._MicrosoftXmlHttpProgID = null;
    a._FilePathToXmlStringMap = new MadCap.Utilities.Dictionary();
    a._LoadingFilesPathMap = new MadCap.Utilities.Dictionary();
    a._LoadingFromQueue = false;
    a.ForceUseJS = false;
    a.Load = function(g, e, b, h, c) {
        function l() {
            a._LoadingFilesPathMap.Remove(j.FullPath);
            var n = a._FilePathToXmlStringMap.GetItem(j.Name);
            if (n != null) {
                a._FilePathToXmlStringMap.Remove(j.Name);
                m = a.LoadXmlString(n)
            }
            a._LoadingFilesPathMap.ForEach(function(q, r) {
                var p = new MadCap.Utilities.Url(q);
                var o = r;
                if (p.Name == f && p.FullPath != j.FullPath) {
                    a._LoadingFilesPathMap.Remove(p.FullPath);
                    a._LoadingFromQueue = true;
                    a.Load(p.FullPath, o.async, o.LoadFunc, o.args, o.loadContextObj);
                    return false
                }
                return true
            });
            if (c == null) {
                b(m, h)
            } else {
                b.call(c, m, h)
            }
        }
        var m = null;
        if (a.ForceUseJS || (Boolean(!window.ActiveXObject) && MadCap.String.StartsWith(document.location.protocol, "file"))) {
            var i = new MadCap.Utilities.Url(g);
            var j = i.ToExtension("js");
            var f = j.Name;
            a._LoadingFilesPathMap.Add(j.FullPath, {
                async: e,
                LoadFunc: b,
                args: h,
                loadContextObj: c
            });
            var k = false;
            a._LoadingFilesPathMap.ForEach(function(p, q) {
                var o = new MadCap.Utilities.Url(p);
                var n = q;
                if (o.Name == f && o.FullPath != j.FullPath) {
                    k = true;
                    return false
                }
                return true
            });
            if (a._LoadingFromQueue || !k) {
                a._LoadingFromQueue = false;
                MadCap.Utilities.LoadScript(j.FullPath, l, l)
            }
        } else {
            var d = new a(h, b, c);
            m = d.Load(g, e)
        }
        return m
    };
    a._Noop = function() {};
    a._GetMicrosoftXmlDomObject = function() {
        var e = null;
        if (a._MicrosoftXmlDomProgID == null) {
            for (var c = 0; c < a._MicrosoftXmlDomProgIDs.length; c++) {
                var d = a._MicrosoftXmlDomProgIDs[c];
                try {
                    e = new ActiveXObject(d);
                    a._MicrosoftXmlDomProgID = d;
                    break
                } catch (b) {}
            }
        } else {
            e = new ActiveXObject(a._MicrosoftXmlDomProgID)
        }
        return e
    };
    a._GetXhrObject = function() {
        if (window.XMLHttpRequest) {
            return function() {
                return new window.XMLHttpRequest()
            }
        } else {
            if (window.ActiveXObject) {
                return function() {
                    var e = null;
                    if (a._MicrosoftXmlHttpProgID == null) {
                        for (var c = 0; c < a._MicrosoftXmlHttpProgIDs.length; c++) {
                            var d = a._MicrosoftXmlHttpProgIDs[c];
                            try {
                                e = new ActiveXObject(d);
                                a._MicrosoftXmlHttpProgID = d;
                                break
                            } catch (b) {}
                        }
                    } else {
                        e = new ActiveXObject(a._MicrosoftXmlHttpProgID)
                    }
                    return e
                }
            }
        }
    }()
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function() {
    MadCap.CreateNamespace("TextEffects");
    var a = MadCap.TextEffects;
    a.Init = function(b) {
        a.ExpandingControl.Load(b);
        a.DropDownControl.Load(b);
        a.TogglerControl.Load(b);
        a.TextPopupControl.Load(b);
        a.TopicPopupControl.Load(b)
    };
    a.Dispose = function(b) {
        a.ExpandingControl.UnLoad(b);
        a.DropDownControl.UnLoad(b);
        a.TogglerControl.UnLoad(b);
        a.TextPopupControl.UnLoad(b);
        a.TopicPopupControl.UnLoad(b)
    };
    $(function() {
        MadCap.Utilities.LoadHandlers.MadCapTextEffects = a.Init;
        a.Init(document)
    });
    a.TextEffectControl = function(d, c) {
        if (this._rootEl == null) {
            this._rootEl = d
        }
        this._hotSpotEl = null;
        this._bodyEls = null;
        this._className = c;
        a.TextEffectControl.Controls[a.TextEffectControl.Controls.length] = this;
        var b = this;
        (function() {
            b._hotSpotEl = MadCap.Dom.GetElementsByClassName(b._className + "HotSpot", null, b._rootEl)[0];
            b._bodyEls = MadCap.Dom.GetElementsByClassName(b._className + "Body", null, b._rootEl);
            var g = MadCap.Dom.GetElementsByClassName(b._className + "HotSpot", null, b._rootEl);
            for (var e = g.length - 1; e >= 0; e--) {
                var f = g[e].parentNode;
                while (f != null) {
                    if ($(f).hasClass(b._className)) {
                        if (f == b._rootEl) {
                            $(g[e]).click(function(h) {
                                b.Toggle.call(b)
                            })
                        } else {
                            break
                        }
                    }
                    f = f.parentNode
                }
            }
        })()
    };
    a.UnbindTextEffectControl = function(d, c) {
        if (this._rootEl == null) {
            this._rootEl = d
        }
        this._hotSpotEl = null;
        this._bodyEls = null;
        this._className = c;
        var b = this;
        (function() {
            b._hotSpotEl = MadCap.Dom.GetElementsByClassName(b._className + "HotSpot", null, b._rootEl)[0];
            var g = MadCap.Dom.GetElementsByClassName(b._className + "HotSpot", null, b._rootEl);
            for (var e = g.length - 1; e >= 0; e--) {
                var f = g[e].parentNode;
                while (f != null) {
                    if ($(f).hasClass(b._className)) {
                        if (f == b._rootEl) {
                            $(g[e]).unbind()
                        } else {
                            break
                        }
                    }
                    f = f.parentNode
                }
            }
            $(b._hotSpotEl).unbind()
        })()
    };
    a.TextEffectControl.Controls = new Array();
    a.TextEffectControl.FindControl = function(c) {
        for (var b = 0; b < a.TextEffectControl.Controls.length; b++) {
            if (a.TextEffectControl.Controls[b]._rootEl == c) {
                return a.TextEffectControl.Controls[b]
            }
        }
        return null
    };
    a.TextEffectControl.ExpandAll = function(b) {
        for (var c = 0, d = a.TextEffectControl.Controls.length; c < d; c++) {
            var e = a.TextEffectControl.Controls[c];
            if (b == "open") {
                e.Open(false)
            } else {
                if (b == "close") {
                    e.Close(false)
                }
            }
        }
    };
    a.TextEffectControl.prototype.Open = function() {
        var d = $(this._rootEl);
        if (d.hasClass("MCToggler")) {
            d = $(this._rootEl.parentNode).find("a.MCToggler")
        }
        d.removeClass(this._className + "_Closed");
        d.addClass(this._className + "_Open");
        var c = null;
        if (d.hasClass("MCToggler")) {
            c = $(".MCToggler_Image_Icon")
        } else {
            if (d.hasClass("MCDropDown")) {
                c = $(".MCDropDown_Image_Icon")
            } else {
                if (d.hasClass("MCExpanding")) {
                    c = $(".MCExpanding_Image_Icon")
                }
            }
        }
        var b = d.find(c);
        this.ToggleAltText(b[0], d, "closed");
        d.attr("data-mc-state", "open")
    };
    a.TextEffectControl.prototype.Close = function() {
        var d = $(this._rootEl);
        if (d.hasClass("MCToggler")) {
            d = $(this._rootEl.parentNode).find("a.MCToggler")
        }
        d.removeClass(this._className + "_Open");
        d.addClass(this._className + "_Closed");
        var c = null;
        if (d.hasClass("MCToggler")) {
            c = $(".MCToggler_Image_Icon")
        } else {
            if (d.hasClass("MCDropDown")) {
                c = $(".MCDropDown_Image_Icon")
            } else {
                if (d.hasClass("MCExpanding")) {
                    c = $(".MCExpanding_Image_Icon")
                }
            }
        }
        var b = d.find(c);
        this.ToggleAltText(b[0], d, "open");
        d.attr("data-mc-state", "closed")
    };
    a.TextEffectControl.prototype.ToggleAltText = function(g, c, d) {
        if (g != null) {
            var b = $(g);
            var f = b.attr("data-mc-alt2");
            var e = b.attr("alt");
            if (c != null && c.attr("data-mc-state") == d) {
                b.attr("alt", f);
                b.attr("data-mc-alt2", e)
            }
        }
    };
    a.TextEffectControl.prototype.Toggle = function() {
        var d = $(this._rootEl);
        if (d.hasClass("MCToggler")) {
            d = $(this._rootEl.parentNode).find("a.MCToggler")
        }
        var b = d.attr("data-mc-state") || "closed";
        var c = null;
        if (b == "open") {
            this.Close(true)
        } else {
            if (b == "closed") {
                this.Open(true)
            }
        }
        $(d.find("a")[0]).focus()
    };
    a.TextEffectControl.prototype.ResizeSlideshow = function(f, d) {
        if (f) {
            var e = $(f);
            var c = e.closest('div[class^="mc-viewport"]');
            if (c) {
                var b = 0;
                e.children().each(function() {
                    b = b + $(this).outerHeight()
                });
                if (d) {
                    b = c.height() + Math.max(b, e.outerHeight())
                } else {
                    b = c.height() - Math.max(b, e.outerHeight())
                }
                c.animate({
                    height: b
                })
            }
        }
    };
    a.ExpandingControl = function(b) {
        a.TextEffectControl.call(this, b, "MCExpanding")
    };
    MadCap.Extend(a.TextEffectControl, a.ExpandingControl);
    a.ExpandingControl.Load = function(c) {
        var d = $(".MCExpanding", c);
        for (var b = 0, e = d.length; b < e; b++) {
            var g = d[b];
            var f = new a.ExpandingControl(g);
            f.Init()
        }
    };
    a.ExpandingControl.UnLoad = function(c) {
        var d = $(".MCExpanding", c);
        for (var b = 0, e = d.length; b < e; b++) {
            a.UnbindTextEffectControl(d[b])
        }
    };
    a.ExpandingControl.prototype.Init = function() {
        this.Close(false)
    };
    a.ExpandingControl.prototype.Open = function(b) {
        this.base.Open.call(this);
        var c = $(this._bodyEls[0]);
        this.ResizeSlideshow(c, true);
        if (b) {
            c.css({
                "white-space": "nowrap"
            });
            c.hide().animate({
                width: "show"
            }, function() {
                $(this).css({
                    "white-space": "normal"
                })
            })
        } else {
            c.show()
        }
    };
    a.ExpandingControl.prototype.Close = function(c) {
        if (!c) {
            $(this._bodyEls[0]).hide();
            this.base.Close.call(this);
            return
        }
        var b = this;
        this.ResizeSlideshow(this._bodyEls[0], false);
        $(this._bodyEls[0]).css({
            "white-space": "nowrap"
        }).animate({
            width: "hide"
        }, function() {
            $(this).css({
                "white-space": "normal"
            });
            b.base.Close.call(b)
        })
    };
    a.DropDownControl = function(b) {
        a.TextEffectControl.call(this, b, "MCDropDown")
    };
    MadCap.Extend(a.TextEffectControl, a.DropDownControl);
    a.DropDownControl.Load = function(e) {
        var d = $(".MCDropDown", e);
        for (var c = 0, f = d.length; c < f; c++) {
            var b = d[c];
            var g = new a.DropDownControl(b);
            g.Init(false)
        }
    };
    a.DropDownControl.UnLoad = function(d) {
        var c = $(".MCDropDown", d);
        for (var b = 0, e = c.length; b < e; b++) {
            a.UnbindTextEffectControl(c[b])
        }
    };
    a.DropDownControl.prototype.Init = function() {
        this.Close(false)
    };
    a.DropDownControl.prototype.Open = function(c) {
        this.base.Open.call(this);
        var d = $(this._bodyEls[0]);
        var b = d.find("div.sticky");
        if (b.length > 0) {
            d.slideDown();
            b.foundation("_calc", true);
            return
        }
        if (c) {
            d.hide().slideDown()
        } else {
            d.show()
        }
        this.ResizeSlideshow(d, true)
    };
    a.DropDownControl.prototype.Close = function(d) {
        var e = $(this._bodyEls[0]);
        if (!d) {
            var b = e.find("div.sticky");
            if (b.length > 0) {
                b.foundation("_calc", true)
            }
            e.hide();
            this.base.Close.call(this);
            return
        }
        var c = this;
        this.ResizeSlideshow(this._bodyEls[0], false);
        $(this._bodyEls[0]).slideUp(function() {
            c.base.Close.call(c)
        })
    };
    a.TogglerControl = function(c) {
        this._rootEl = c;
        this._hotSpotEl = c;
        this._bodyEls = new Array();
        this._className = "MCToggler";
        a.TextEffectControl.Controls[a.TextEffectControl.Controls.length] = this;
        var b = this;
        (function() {
            var h = MadCap.Dom.Dataset(b._rootEl, "mcTargets");
            var d = h.split(";");
            for (var f = 0, g = d.length; f < g; f++) {
                var j = d[f];
                var e = MadCap.Dom.GetElementsByAttribute("data-mc-target-name", j, null, document.body);
                b._bodyEls = b._bodyEls.concat(e)
            }
            $(b._hotSpotEl).click(function(i) {
                b.Toggle.call(b)
            })
        })()
    };
    MadCap.Extend(a.TextEffectControl, a.TogglerControl);
    a.TogglerControl.Load = function(c) {
        var e = $(".MCToggler", c);
        for (var b = 0, d = e.length; b < d; b++) {
            var g = e[b];
            var f = new a.TogglerControl(g);
            f.Init()
        }
    };
    a.TogglerControl.UnLoad = function(c) {
        var e = $(".MCToggler", c);
        for (var b = 0, d = e.length; b < d; b++) {
            a.UnbindTextEffectControl(e[b])
        }
    };
    a.TogglerControl.prototype.Init = function() {
        this.Close(false)
    };
    a.TogglerControl.prototype.Open = function(b) {
        this.base.Open.call(this);
        for (var c = 0, d = this._bodyEls.length; c < d; c++) {
            if (b) {
                $(this._bodyEls[c]).css({
                    opacity: 0,
                    display: ""
                });
                $(this._bodyEls[c]).animate({
                    opacity: 1
                }, 200)
            } else {
                $(this._bodyEls[c]).css({
                    opacity: 1,
                    display: ""
                })
            }
        }
        this.ResizeSlideshow(this._bodyEls[0], true)
    };
    a.TogglerControl.prototype.Close = function(c) {
        this.base.Close.call(this);
        this.ResizeSlideshow(this._bodyEls[0], false);

        function f(g) {
            $(g).css("display", "none")
        }
        for (var d = 0, e = this._bodyEls.length; d < e; d++) {
            var b = this;
            if (c) {
                $(this._bodyEls[d]).animate({
                    opacity: 0
                }, 200, function() {
                    f(this)
                })
            } else {
                f(this._bodyEls[d])
            }
        }
    };
    a.TextPopupControl = function(c) {
        this._rootEl = c;
        this._hotSpotEl = c;
        this._bodyEls = null;
        this._className = "MCTextPopup";
        var b = this;
        (function() {
            b._bodyEls = $("." + b._className + "Body", b._rootEl).toArray();
            if (jQuery.browser.mobile) {
                $(b._hotSpotEl).click(function(d) {
                    if ($(this).attr("data-mc-state") === "closed") {
                        b.Open()
                    } else {
                        b.Close()
                    }
                })
            } else {
                $(b._hotSpotEl).mouseover(function(d) {
                    b.Open()
                });
                $(b._hotSpotEl).mouseleave(function(d) {
                    b.Close()
                })
            }
        })()
    };
    MadCap.Extend(a.TextEffectControl, a.TextPopupControl);
    a.TextPopupControl.Load = function(d) {
        var b = $(".MCTextPopup", d);
        for (var c = 0, f = b.length; c < f; c++) {
            var g = b[c];
            var e = new a.TextPopupControl(g);
            e.Init()
        }
    };
    a.TextPopupControl.UnLoad = function(d) {
        var b = $(".MCTextPopup", d);
        for (var c = 0, e = b.length; c < e; c++) {
            a.UnbindTextEffectControl(b[c])
        }
    };
    a.TextPopupControl.prototype.Init = function() {
        this.Close(false)
    };
    a.TextPopupControl.prototype.Open = function() {
        this.base.Open.call(this);
        var A = $(this._rootEl);
        var k = $(this._bodyEls[0]);
        var f = $(".MCTextPopupArrow", A);
        var d = $(".title-bar.sticky");
        var t = $(window);
        k.css("top", "0");
        k.css("left", "0");
        k.css("height", "auto");
        var i = 13;
        var n = k.offset().top;
        var o = k.offset().left;
        var x = A.offset().top - n;
        var l = A.offset().left - o;
        var m = x + this._rootEl.offsetHeight;
        var w = k[0].offsetWidth;
        var p = k[0].offsetHeight;
        var C = l + (A[0].offsetWidth / 2);
        var g = C - (w / 2);
        var z = g + w;
        var s = m + i;
        var e = t.scrollTop();
        var v = t.scrollLeft();
        var c = -f[0].offsetWidth / 2;
        var b = t.width();
        var r = e + t.height() - m;
        if (d) {
            e += d.innerHeight()
        }
        if ((p + i) > r) {
            var B = x - e;
            if ((p + i) > B) {
                s = m;
                var q = parseInt(k.css("border-top-width"));
                var h = parseInt(k.css("border-bottom-width"));
                var y = parseInt(k.css("padding-top"));
                var j = parseInt(k.css("padding-bottom"));
                k.css("height", (r - q - h - y - j) + "px");
                k.css("overflow", "auto")
            } else {
                k.addClass("MCTextPopupBodyBottom");
                s = x - p - i
            }
        } else {
            k.removeClass("MCTextPopupBodyBottom")
        }
        k.css("top", s + "px");
        if (z >= b + v) {
            c += (z - b - v)
        }
        if (g < v) {
            c += (g - v)
        }
        g = Math.min(g, v + b - w);
        g = Math.max(g, v);
        var u = A.closest("body");
        if (MadCap.HasEpubReadingSystem()) {
            g = A.offset().left;
            c = -((k[0].offsetWidth / 2) - (f[0].offsetWidth / 2))
        }
        k.css("left", g + "px");
        k.css("zIndex", 1);
        f.css("margin-left", c + "px");
        k.animate({
            opacity: 1
        }, 200)
    };
    a.TextPopupControl.prototype.Close = function() {
        this.base.Close.call(this);
        var b = $(this._bodyEls[0]);
        b.css("opacity", 0)
    };
    a.TopicPopupControl = function(c) {
        this._rootEl = c;
        this._hotSpotEl = c;
        this._bodyEls = null;
        this._className = "MCTopicPopup";
        var b = this;
        (function() {
            b._bodyEls = $("." + b._className + "Body", b._rootEl).toArray();
            $(b._hotSpotEl).click(function(d) {
                b.Open();
                $(document.documentElement).click(function(f) {
                    b.Close();
                    $(document.documentElement).off("click", arguments.callee)
                });
                d.stopPropagation();
                MadCap.Utilities.PreventDefault(d)
            })
        })()
    };
    MadCap.Extend(a.TextEffectControl, a.TopicPopupControl);
    a.TopicPopupControl.Load = function(d) {
        var g = $(".MCTopicPopup", d);
        for (var c = 0, e = g.length; c < e; c++) {
            var b = g[c];
            var f = new a.TopicPopupControl(b);
            f.Init()
        }
    };
    a.TopicPopupControl.UnLoad = function(c) {
        var e = $(".MCTopicPopup", c);
        for (var b = 0, d = e.length; b < d; b++) {
            a.UnbindTextEffectControl(e[b])
        }
    };
    a.TopicPopupControl.prototype.Init = function() {
        this.Close(false)
    };
    a.TopicPopupControl.prototype.Open = function() {
        this.base.Open.call(this);
        var f = $("<div></div>");
        f.addClass("MCTopicPopupContainer needs-pie");
        var b = MadCap.Dom.GetAttribute(this._hotSpotEl, "href");
        var k = document.createElement("iframe");
        $(k).addClass("MCTopicPopupBody");
        k.setAttribute("src", b);
        k.setAttribute("name", "MCPopup");
        f.append(k);
        var i = document.body;
        f.appendTo(i);
        var h = $(this._rootEl);
        var c = h.attr("data-mc-width");
        var o = h.attr("data-mc-height");
        if (c != null || o != null) {
            f.css({
                top: "50%",
                left: "50%",
                width: c,
                height: o
            });
            var e = f.width();
            var g = f.height();
            var d = $(window);
            var n = d.width() - 100;
            var m = d.height() - 100;
            if (e > n) {
                f.css({
                    width: n + "px"
                });
                e = n
            }
            if (g > m) {
                f.css({
                    height: m + "px"
                });
                g = m
            }
            f.css({
                "margin-top": (-g / 2) + "px",
                "margin-left": (-e / 2) + "px"
            })
        }
        $(k).css("height", "100%");
        if ($("html").attr("data-mc-target-type") == "EPUB") {
            var j = ($(this._hotSpotEl).offset().top - f.offset().top) - f[0].offsetHeight / 2;
            f.css({
                "margin-top": j + "px",
                left: $(this._hotSpotEl).offset().left,
                "margin-left": $(this._hotSpotEl).offset().left
            })
        }
        f.animate({
            opacity: 1
        }, 200);
        var l = a.AddBackgroundTint("dark", i);
        $(l).animate({
            opacity: 0.5
        }, 200)
    };
    a.TopicPopupControl.prototype.Close = function() {
        this.base.Close.call(this);
        var b = $(".MCTopicPopupContainer");
        var c = b.parent();
        b.remove();
        a.RemoveBackgroundTint();
        if ($("#topicContent").length > 0) {
            c.css("overflow", "auto")
        }
    };
    a.CreateLinkListTree = function(q, h, e, g, o) {
        a.RemoveLinkListTrees();
        if (!g) {
            g = ""
        }
        var b = $("<ul class='responsive-link-list tree inner'></ul>");
        var j = $(e).attr("target");
        for (var f = 0, c = q.length; f < c; f++) {
            var p = q[f];
            var m = $("<li class='IndexEntry IndexEntryLink tree-node tree-node-leaf'></li>").appendTo(b);
            var l = $("<div class='IndexTerm'></div>").appendTo(m);
            var k = $("<span class='label'></span>").appendTo(l);
            var d = $("<a/>").appendTo(k);
            d.text(p.Title);
            var n = p.Link;
            d.attr("href", g + n);
            m.click(o)
        }
        b.appendTo(h)
    };
    a.CreateDummyToolbarDropdown = function(h, i, c, f) {
        var b = [];
        var e = new MadCap.Utilities.Url(document.location.href);
        var g = {
            Title: c + "1",
            Link: e.PlainPath + e.Fragment
        };
        var d = {
            Title: c + "2",
            Link: e.PlainPath + e.Fragment
        };
        b[0] = g;
        b[1] = d;
        a.CreateToolbarDropdown(b, h[0], i, f)
    };
    a.CreateToolbarDropdown = function(j, f, i, h) {
        var c = $(f);
        var d = 2;
        var b = c.position().left;
        var g = c.position().top + c.height() + d;
        var e = "";
        a.CreateLinkListPopup(j, c.closest(".popup-container"), g, b, f, e, "toolbar-button-drop-down " + i, true, false, h)
    };
    a.CreateLinkListPopup = function(m, k, w, j, F, B, t, H, G, r) {
        if (typeof t === "undefined") {
            t = "link-list-popup"
        }
        if (typeof H === "undefined") {
            H = true
        }
        if (typeof G === "undefined") {
            G = true
        }
        a.RemoveLinkListPopups();
        if (!B) {
            B = ""
        }
        var l = $("<div class='" + t + " needs-pie'><ul></ul></div>");
        var y = l.children("ul");
        var I = $(F).attr("target");
        for (var C = 0, h = m.length; C < h; C++) {
            var D = m[C];
            var e = (typeof(D.Image) != "undefined");
            var s = (e) ? $("<li><img><a></a></li>").appendTo(y) : $("<li><a></a></li>").appendTo(y);
            var g = $("a", s);
            g.attr("target", I);
            if (I == "_popup") {
                g.click(a.TopicPopup_Click)
            }
            if (e) {
                var q = $("img", s);
                q.attr("src", D.Image);
                q.attr("alt", D.Title);
                g.text(" " + D.Title)
            } else {
                g.text(D.Title)
            }
            var o = D.Link;
            g.attr("href", B + o);
            s.click(a.Item_Click)
        }
        l.appendTo(k);
        var v = l.closest(".popup-container");
        if (v.length == 0) {
            v = $(window)
        }
        if (r) {
            v = $(window)
        }
        var b = v.width();
        var d = v.height();
        var c = v.scrollTop();
        var A = v.scrollLeft();
        var z = l[0].offsetWidth;
        var u = l[0].offsetHeight;
        var E = 0;
        var p = 0;
        if (typeof(v[0].classList) != "undefined" && v[0].classList.contains("topicToolbarProxy")) {
            if (typeof(v.offset()) != "undefined") {
                E = v.offset().top;
                p = v.offset().left
            }
        }
        if (G) {
            w = Math.min(w, c + E + d - u);
            w = Math.max(w, c + E)
        }
        if (H) {
            j = Math.min(j, A + p + b - z);
            j = Math.max(j, A + p)
        }
        if ((w == 0 && j == 0) || MadCap.IsIBooks()) {
            if (H) {
                j = $(F).offset().left + $(F).width()
            }
            if (G) {
                w = $(F).offset().top + $(F).height()
            }
        }
        if (MadCap.IsIBooks()) {
            l.css("display", "inline-block");
            if (H) {
                j = j - F.offsetWidth
            }
            if (G) {
                w = w - (l[0].offsetHeight / 2)
            }
        }
        if (H && MadCap.Utilities.IsRTL()) {
            var x = 0;
            if (typeof($(F).offset()) != "undefined") {
                x += $(F).offset().left
            }
            if (typeof($(F).width()) != "undefined") {
                x += $(F).width()
            }
            var f = Math.min($(window).width() - x, l.width());
            j = j - f
        }
        l.css("top", w);
        l.css("left", j);
        l.css("zIndex", 1);
        l.hide().fadeIn(200);
        $triggerObject = r ? $(F) : $([document, F]);
        $triggerObject.click(function(i) {
            l.remove();
            $triggerObject.off("click", arguments.callee)
        });
        $triggerObject.keydown(function(i) {
            var i = i || windows.event;
            if (i.keyCode != 27 && i.keyCode != 13) {
                return
            }
            if (!l.is(":focus")) {
                return
            }
            l.remove();
            $triggerObject.off("keydown", arguments.callee)
        });
        if (!r) {
            var n = function(i) {
                a.RemoveLinkListPopups();
                v.off("click", n)
            };
            v.click(n)
        }
        l.attr("tabindex", 0);
        l.focus()
    };
    a.Item_Click = function(d) {
        var c = $("a", this);
        var b = c.attr("href");
        var f = c.attr("target");
        if (b && !MadCap.String.IsNullOrEmpty(b)) {
            if (f) {
                window.open(b, f)
            } else {
                if (document.parentNode != null && MadCap.Utilities.HasRuntimeFileType("Topic") && $("html").attr("data-mc-target-type") == "EPUB") {
                    document.parentNode.open(b)
                } else {
                    document.location.href = b
                }
            }
        }
        MadCap.Utilities.PreventDefault(d)
    };
    a.RemoveLinkListTrees = function() {
        $(".responsive-link-list").remove()
    };
    a.RemoveLinkListPopups = function() {
        $(".link-list-popup").remove();
        $(".toolbar-button-drop-down").remove()
    };
    a.AddBackgroundTint = function(c, d) {
        if (!d) {
            d = document.body
        }
        var b = $("<div id='mc-background-tint'></div>");
        b.addClass(c);
        b.appendTo(d);
        return b[0]
    };
    a.RemoveBackgroundTint = function() {
        $("#mc-background-tint").remove()
    }
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function(a) {
    a.fn.fitVids = function(c) {
        var e = {
            customSelector: null
        };
        var d = document.createElement("div"),
            b = document.getElementsByTagName("base")[0] || document.getElementsByTagName("script")[0];
        d.className = "fit-vids-style";
        d.innerHTML = "<style>.fluid-width-video-wrapper {width: 100%;position: relative;padding: 0;} .fluid-width-video-wrapper iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; } </style>";
        b.parentNode.insertBefore(d, b);
        if (c) {
            a.extend(e, c)
        }
        return this.each(function() {
            var f = ["iframe[src*='player.vimeo.com']", "iframe[src*='www.youtube.com']", "iframe[src*='www.kickstarter.com']"];
            if (e.customSelector) {
                f.push(e.customSelector)
            }
            var g = a(this).find(f.join(","));
            g.each(function() {
                var j = a(this);
                if (j.parent(".fluid-width-video-wrapper").length) {
                    return
                }
                var m = j.attr("height") && !isNaN(parseInt(j.attr("height"), 10)) ? parseInt(j.attr("height"), 10) : j.height(),
                    l = !isNaN(parseInt(j.attr("width"), 10)) ? parseInt(j.attr("width"), 10) : j.width(),
                    h = m / l;
                if (!j.attr("id")) {
                    var k = "fitvid" + Math.floor(Math.random() * 999999);
                    j.attr("id", k)
                }
                j.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", h * 100 + "%");
                j.removeAttr("height").removeAttr("width")
            })
        })
    }
})(jQuery);
! function(a) {
    var c = {},
        b = {
            mode: "horizontal",
            slideSelector: "",
            infiniteLoop: !0,
            hideControlOnEnd: !1,
            speed: 500,
            easing: null,
            slideMargin: 0,
            startSlide: 0,
            randomStart: !1,
            captions: !1,
            ticker: !1,
            tickerHover: !1,
            adaptiveHeight: !1,
            adaptiveHeightSpeed: 500,
            video: !1,
            useCSS: !0,
            preloadImages: "visible",
            responsive: !0,
            touchEnabled: !0,
            swipeThreshold: 50,
            oneToOneTouch: !0,
            preventDefaultSwipeX: !0,
            preventDefaultSwipeY: !1,
            pager: !0,
            pagerType: "full",
            pagerShortSeparator: " / ",
            pagerSelector: null,
            buildPager: null,
            pagerCustom: null,
            controls: !0,
            nextText: "Next",
            prevText: "Prev",
            nextSelector: null,
            prevSelector: null,
            autoControls: !1,
            startText: "Start",
            stopText: "Stop",
            autoControlsCombine: !1,
            autoControlsSelector: null,
            auto: !1,
            pause: 4000,
            autoStart: !0,
            autoDirection: "next",
            autoHover: !1,
            autoDelay: 0,
            minSlides: 1,
            maxSlides: 1,
            moveSlides: 0,
            slideWidth: 0,
            onSliderLoad: function() {},
            onSlideBefore: function() {},
            onSlideAfter: function() {},
            onSlideNext: function() {},
            onSlidePrev: function() {},
            slideshowClass: ""
        };
    a.fn.MCSlider = function(aq) {
        if (0 == this.length) {
            return this
        }
        if (this.length > 1) {
            return this.each(function() {
                a(this).MCSlider(aq)
            }), this
        }
        var ap = {},
            am = this;
        c.el = this;
        var aB = a(window).width(),
            at = a(window).height(),
            ay = function() {
                ap.settings = a.extend({}, b, aq), ap.settings.slideWidth = parseInt(ap.settings.slideWidth), ap.children = am.children(ap.settings.slideSelector), ap.children.length < ap.settings.minSlides && (ap.settings.minSlides = ap.children.length), ap.children.length < ap.settings.maxSlides && (ap.settings.maxSlides = ap.children.length), ap.settings.randomStart && (ap.settings.startSlide = Math.floor(Math.random() * ap.children.length)), ap.active = {
                    index: ap.settings.startSlide
                }, ap.carousel = ap.settings.minSlides > 1 || ap.settings.maxSlides > 1, ap.carousel && (ap.settings.preloadImages = "all"), ap.minThreshold = ap.settings.minSlides * ap.settings.slideWidth + (ap.settings.minSlides - 1) * ap.settings.slideMargin, ap.maxThreshold = ap.settings.maxSlides * ap.settings.slideWidth + (ap.settings.maxSlides - 1) * ap.settings.slideMargin, ap.working = !1, ap.controls = {}, ap.interval = null, ap.animProp = "vertical" == ap.settings.mode ? "top" : "left", ap.usingCSS = ap.settings.useCSS && "fade" != ap.settings.mode && function() {
                    var f = document.createElement("div"),
                        g = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
                    for (var d in g) {
                        if (void 0 !== f.style[g[d]]) {
                            return ap.cssPrefix = g[d].replace("Perspective", "").toLowerCase(), ap.animProp = "-" + ap.cssPrefix + "-transform", !0
                        }
                    }
                    return !1
                }(), "vertical" == ap.settings.mode && (ap.settings.maxSlides = ap.settings.minSlides), am.data("origStyle", am.attr("style")), am.children(ap.settings.slideSelector).each(function() {
                    a(this).data("origStyle", a(this).attr("style"))
                }), az()
            },
            az = function() {
                am.wrap('<div class="mc-wrapper"><div class="mc-viewport ' + ap.settings.slideshowClass + '"></div></div>'), ap.viewport = am.parent(), ap.loader = a('<div class="mc-loading" />'), ap.viewport.prepend(ap.loader), am.css({
                    width: "horizontal" == ap.settings.mode ? 100 * ap.children.length + 215 + "%" : "auto",
                    position: "relative"
                }), ap.usingCSS && ap.settings.easing ? am.css("-" + ap.cssPrefix + "-transition-timing-function", ap.settings.easing) : ap.settings.easing || (ap.settings.easing = "swing"), ax(), ap.viewport.css({
                    width: "100%",
                    overflow: "hidden",
                    position: "relative"
                }), ap.viewport.parent().css({
                    maxWidth: ak()
                }), ap.settings.pager || ap.viewport.parent().css({
                    margin: "0 auto 0px"
                }), ap.children.css({
                    "float": "horizontal" == ap.settings.mode ? "left" : "none",
                    listStyle: "none",
                    position: "relative"
                }), ap.children.css("width", al()), "horizontal" == ap.settings.mode && ap.settings.slideMargin > 0 && ap.children.css("marginRight", ap.settings.slideMargin), "vertical" == ap.settings.mode && ap.settings.slideMargin > 0 && ap.children.css("marginBottom", ap.settings.slideMargin), "fade" == ap.settings.mode && (ap.children.css({
                    position: "absolute",
                    zIndex: 0,
                    display: "none"
                }), ap.children.eq(ap.settings.startSlide).css({
                    zIndex: 50,
                    display: "block"
                })), ap.controls.el = a('<div class="mc-controls" />'), ap.settings.captions && J(), ap.active.last = ap.settings.startSlide == ai() - 1, ap.settings.video && am.fitVids();
                var d = ap.children.eq(ap.settings.startSlide);
                "all" == ap.settings.preloadImages && (d = ap.children), ap.settings.ticker ? ap.settings.pager = !1 : (ap.settings.pager && F(), ap.settings.controls && ad(), ap.settings.auto && ap.settings.autoControls && ab(), (ap.settings.controls || ap.settings.autoControls || ap.settings.pager) && ap.viewport.after(ap.controls.el)), aw(d, av)
            },
            aw = function(h, f) {
                var g = h.find('img:not([src=""])').length;
                if (0 === g) {
                    return void f()
                }
                var d = 0;
                h.find('img:not([src=""])').each(function() {
                    $(this).one("load error", function() {
                        ++d === g && f()
                    }).each(function() {
                        this.complete && $(this).load()
                    })
                })
            },
            av = function() {
                if (ap.settings.infiniteLoop && "fade" != ap.settings.mode && !ap.settings.ticker) {
                    var g = "vertical" == ap.settings.mode ? ap.settings.minSlides : ap.settings.maxSlides,
                        d = ap.children.slice(0, g).clone().addClass("mc-clone"),
                        f = ap.children.slice(-g).clone().addClass("mc-clone");
                    am.append(d).prepend(f)
                }
                ap.loader.remove(), G(), "vertical" == ap.settings.mode && (ap.settings.adaptiveHeight = !0), ap.viewport.height(ao()), am.redrawSlider(), ap.settings.onSliderLoad(ap.active.index), ap.initialized = !0, ap.settings.responsive && a(window).bind("resize", ae), ap.settings.auto && ap.settings.autoStart && aa(), ap.settings.ticker && U(), ap.settings.pager && Z(ap.settings.startSlide), ap.settings.controls && s(), ap.settings.touchEnabled && !ap.settings.ticker && K()
            },
            ao = function() {
                var f = 0,
                    d = a();
                if ("vertical" == ap.settings.mode || ap.settings.adaptiveHeight) {
                    if (ap.carousel) {
                        var g = 1 == ap.settings.moveSlides ? ap.active.index : ap.active.index * ar();
                        for (d = ap.children.eq(g), i = 1; i <= ap.settings.maxSlides - 1; i++) {
                            d = g + i >= ap.children.length ? d.add(ap.children.eq(i - 1)) : d.add(ap.children.eq(g + i))
                        }
                    } else {
                        d = ap.children.eq(ap.active.index)
                    }
                } else {
                    d = ap.children
                }
                return "vertical" == ap.settings.mode ? (d.each(function() {
                    f += a(this).outerHeight()
                }), ap.settings.slideMargin > 0 && (f += ap.settings.slideMargin * (ap.settings.minSlides - 1))) : f = Math.max.apply(Math, d.map(function() {
                    return a(this).outerHeight(!1)
                }).get()), f
            },
            ak = function() {
                var d = "100%";
                return ap.settings.slideWidth > 0 && (d = "horizontal" == ap.settings.mode ? ap.settings.maxSlides * ap.settings.slideWidth + (ap.settings.maxSlides - 1) * ap.settings.slideMargin : ap.settings.slideWidth), d
            },
            al = function() {
                var d = ap.settings.slideWidth,
                    f = ap.viewport.width();
                return 0 == ap.settings.slideWidth || ap.settings.slideWidth > f && !ap.carousel || "vertical" == ap.settings.mode ? d = (f / ap.settings.minSlides) : ap.settings.maxSlides > 1 && "horizontal" == ap.settings.mode && (f > ap.maxThreshold || f < ap.minThreshold && (d = (f - ap.settings.slideMargin * (ap.settings.minSlides - 1)) / ap.settings.minSlides)), d
            },
            ax = function() {
                var d = 1;
                if ("horizontal" == ap.settings.mode && ap.settings.slideWidth > 0) {
                    if (ap.viewport.width() < ap.minThreshold) {
                        d = ap.settings.minSlides
                    } else {
                        if (ap.viewport.width() > ap.maxThreshold) {
                            d = ap.settings.maxSlides
                        } else {
                            var f = ap.children.first().width();
                            d = Math.floor(ap.viewport.width() / f)
                        }
                    }
                } else {
                    "vertical" == ap.settings.mode && (d = ap.settings.minSlides)
                }
                return d
            },
            ai = function() {
                var f = 0;
                if (ap.settings.moveSlides > 0) {
                    if (ap.settings.infiniteLoop) {
                        f = ap.children.length / ar()
                    } else {
                        for (var g = 0, d = 0; g < ap.children.length;) {
                            ++f, g = d + ax(), d += ap.settings.moveSlides <= ax() ? ap.settings.moveSlides : ax()
                        }
                    }
                } else {
                    f = Math.ceil(ap.children.length / ax())
                }
                return f
            },
            ar = function() {
                return ap.settings.moveSlides > 0 && ap.settings.moveSlides <= ax() ? ap.settings.moveSlides : ax()
            },
            G = function() {
                if (ap.children.length > ap.settings.maxSlides && ap.active.last && !ap.settings.infiniteLoop) {
                    if ("horizontal" == ap.settings.mode) {
                        var f = ap.children.last(),
                            g = f.position();
                        aA(-(g.left - (ap.viewport.width() - f.width())), "reset", 0)
                    } else {
                        if ("vertical" == ap.settings.mode) {
                            var d = ap.children.length - ap.settings.minSlides,
                                g = ap.children.eq(d).position();
                            aA(-g.top, "reset", 0)
                        }
                    }
                } else {
                    var g = ap.children.eq(ap.active.index * ar()).position();
                    ap.active.index == ai() - 1 && (ap.active.last = !0), void 0 != g && ("horizontal" == ap.settings.mode ? aA(-g.left, "reset", 0) : "vertical" == ap.settings.mode && aA(-g.top, "reset", 0))
                }
            },
            aA = function(g, k, f, h) {
                if (ap.usingCSS) {
                    var l = "vertical" == ap.settings.mode ? "translate3d(0, " + g + "px, 0)" : "translate3d(" + g + "px, 0, 0)";
                    am.css("-" + ap.cssPrefix + "-transition-duration", f / 1000 + "s"), "slide" == k ? (am.css(ap.animProp, l), am.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                        am.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), ac()
                    })) : "reset" == k ? am.css(ap.animProp, l) : "ticker" == k && (am.css("-" + ap.cssPrefix + "-transition-timing-function", "linear"), am.css(ap.animProp, l), am.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
                        am.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), aA(h.resetValue, "reset", 0), Q()
                    }))
                } else {
                    var d = {};
                    d[ap.animProp] = g, "slide" == k ? am.animate(d, f, ap.settings.easing, function() {
                        ac()
                    }) : "reset" == k ? am.css(ap.animProp, g) : "ticker" == k && am.animate(d, speed, "linear", function() {
                        aA(h.resetValue, "reset", 0), Q()
                    })
                }
            },
            aj = function() {
                for (var g = "", d = ai(), f = 0; d > f; f++) {
                    var h = "";
                    ap.settings.buildPager && a.isFunction(ap.settings.buildPager) ? (h = ap.settings.buildPager(f), ap.pagerEl.addClass("mc-custom-pager")) : (h = f + 1, ap.pagerEl.addClass("mc-default-pager")), g += '<div class="mc-pager-item"><a data-slide-index="' + f + '" class="mc-pager-link">' + h + "</a></div>"
                }
                ap.pagerEl.html(g)
            },
            F = function() {
                ap.settings.pagerCustom ? ap.pagerEl = a(ap.settings.pagerCustom) : (ap.pagerEl = a('<div class="mc-pager" />'), ap.settings.pagerSelector ? a(ap.settings.pagerSelector).html(ap.pagerEl) : ap.controls.el.addClass("mc-has-pager").append(ap.pagerEl), aj()), ap.pagerEl.delegate("a", "click", an)
            },
            ad = function() {
                ap.controls.next = a('<a class="mc-next">' + ap.settings.nextText + "</a>"), ap.controls.prev = a('<a class="mc-prev">' + ap.settings.prevText + "</a>"), ap.controls.next.bind("click", ah), ap.controls.prev.bind("click", ag), ap.settings.nextSelector && a(ap.settings.nextSelector).append(ap.controls.next), ap.settings.prevSelector && a(ap.settings.prevSelector).append(ap.controls.prev), ap.settings.nextSelector || ap.settings.prevSelector || (ap.controls.directionEl = a('<div class="mc-controls-direction" />'), ap.controls.directionEl.append(ap.controls.prev).append(ap.controls.next), ap.controls.el.addClass("mc-has-controls-direction").append(ap.controls.directionEl))
            },
            ab = function() {
                ap.controls.start = a('<div class="mc-controls-auto-item"><a class="mc-start">' + ap.settings.startText + "</a></div>"), ap.controls.stop = a('<div class="mc-controls-auto-item"><a class="mc-stop">' + ap.settings.stopText + "</a></div>"), ap.controls.autoEl = a('<div class="mc-controls-auto" />'), ap.controls.autoEl.delegate(".mc-start", "click", au), ap.controls.autoEl.delegate(".mc-stop", "click", R), ap.settings.autoControlsCombine ? ap.controls.autoEl.append(ap.controls.start) : ap.controls.autoEl.append(ap.controls.start).append(ap.controls.stop), ap.settings.autoControlsSelector ? a(ap.settings.autoControlsSelector).html(ap.controls.autoEl) : ap.controls.el.addClass("mc-has-controls-auto").append(ap.controls.autoEl), af(ap.settings.autoStart ? "stop" : "start")
            },
            J = function() {
                ap.children.each(function() {
                    var d = a(this).attr("title");
                    void 0 != d && ("" + d).length && a(this).append('<div class="mc-caption"><div>' + d + "</div></div>")
                })
            },
            ah = function(d) {
                ap.settings.auto && am.stopAuto(), am.goToNextSlide(), d.preventDefault()
            },
            ag = function(d) {
                ap.settings.auto && am.stopAuto(), am.goToPrevSlide(), d.preventDefault()
            },
            au = function(d) {
                am.startAuto(), d.preventDefault()
            },
            R = function(d) {
                am.stopAuto(), d.preventDefault()
            },
            an = function(g) {
                ap.settings.auto && am.stopAuto();
                var d = a(g.currentTarget),
                    f = parseInt(d.attr("data-slide-index"));
                f != ap.active.index && am.goToSlide(f), g.preventDefault()
            },
            Z = function(f) {
                var d = ap.children.length;
                return "short" == ap.settings.pagerType ? (ap.settings.maxSlides > 1 && (d = Math.ceil(ap.children.length / ap.settings.maxSlides)), ap.pagerEl.html(f + 1 + ap.settings.pagerShortSeparator + d), void 0) : (ap.pagerEl.find("a").removeClass("active"), ap.pagerEl.each(function(g, h) {
                    a(h).find("a").eq(f).addClass("active")
                }), void 0)
            },
            ac = function() {
                if (ap.settings.infiniteLoop) {
                    var d = "";
                    0 == ap.active.index ? d = ap.children.eq(0).position() : ap.active.index == ai() - 1 && ap.carousel ? d = ap.children.eq((ai() - 1) * ar()).position() : ap.active.index == ap.children.length - 1 && (d = ap.children.eq(ap.children.length - 1).position()), "horizontal" == ap.settings.mode ? aA(-d.left, "reset", 0) : "vertical" == ap.settings.mode && aA(-d.top, "reset", 0)
                }
                ap.working = !1, ap.settings.onSlideAfter(ap.children.eq(ap.active.index), ap.oldIndex, ap.active.index)
            },
            af = function(d) {
                ap.settings.autoControlsCombine ? ap.controls.autoEl.html(ap.controls[d]) : (ap.controls.autoEl.find("a").removeClass("active"), ap.controls.autoEl.find("a:not(.mc-" + d + ")").addClass("active"))
            },
            s = function() {
                1 == ai() ? (ap.controls.prev.addClass("disabled"), ap.controls.next.addClass("disabled")) : !ap.settings.infiniteLoop && ap.settings.hideControlOnEnd && (0 == ap.active.index ? (ap.controls.prev.addClass("disabled"), ap.controls.next.removeClass("disabled")) : ap.active.index == ai() - 1 ? (ap.controls.next.addClass("disabled"), ap.controls.prev.removeClass("disabled")) : (ap.controls.prev.removeClass("disabled"), ap.controls.next.removeClass("disabled")))
            },
            aa = function() {
                ap.settings.autoDelay > 0 ? setTimeout(am.startAuto, ap.settings.autoDelay) : am.startAuto(), ap.settings.autoHover && am.hover(function() {
                    ap.interval && (am.stopAuto(!0), ap.autoPaused = !0)
                }, function() {
                    ap.autoPaused && (am.startAuto(!0), ap.autoPaused = null)
                })
            },
            U = function() {
                var f = 0;
                if ("next" == ap.settings.autoDirection) {
                    am.append(ap.children.clone().addClass("mc-clone"))
                } else {
                    am.prepend(ap.children.clone().addClass("mc-clone"));
                    var d = ap.children.first().position();
                    f = "horizontal" == ap.settings.mode ? -d.left : -d.top
                }
                aA(f, "reset", 0), ap.settings.pager = !1, ap.settings.controls = !1, ap.settings.autoControls = !1, ap.settings.tickerHover && !ap.usingCSS && ap.viewport.hover(function() {
                    am.stop()
                }, function() {
                    var k = 0;
                    ap.children.each(function() {
                        k += "horizontal" == ap.settings.mode ? a(this).outerWidth(!0) : a(this).outerHeight(!0)
                    });
                    var g = ap.settings.speed / k,
                        h = "horizontal" == ap.settings.mode ? "left" : "top",
                        l = g * (k - Math.abs(parseInt(am.css(h))));
                    Q(l)
                }), Q()
            },
            Q = function(g) {
                speed = g ? g : ap.settings.speed;
                var k = {
                        left: 0,
                        top: 0
                    },
                    f = {
                        left: 0,
                        top: 0
                    };
                "next" == ap.settings.autoDirection ? k = am.find(".mc-clone").first().position() : f = ap.children.first().position();
                var h = "horizontal" == ap.settings.mode ? -k.left : -k.top,
                    l = "horizontal" == ap.settings.mode ? -f.left : -f.top,
                    d = {
                        resetValue: l
                    };
                aA(h, "ticker", speed, d)
            },
            K = function() {
                ap.touch = {
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    }
                }, ap.viewport.bind("touchstart", j)
            },
            j = function(d) {
                if (ap.working) {
                    d.preventDefault()
                } else {
                    ap.touch.originalPos = am.position();
                    var f = d.originalEvent;
                    ap.touch.start.x = f.changedTouches[0].pageX, ap.touch.start.y = f.changedTouches[0].pageY, ap.viewport.bind("touchmove", e), ap.viewport.bind("touchend", t)
                }
            },
            e = function(f) {
                var k = f.originalEvent,
                    d = Math.abs(k.changedTouches[0].pageX - ap.touch.start.x),
                    g = Math.abs(k.changedTouches[0].pageY - ap.touch.start.y);
                if (3 * d > g && ap.settings.preventDefaultSwipeX ? f.preventDefault() : 3 * g > d && ap.settings.preventDefaultSwipeY && f.preventDefault(), "fade" != ap.settings.mode && ap.settings.oneToOneTouch) {
                    var l = 0;
                    if ("horizontal" == ap.settings.mode) {
                        var h = k.changedTouches[0].pageX - ap.touch.start.x;
                        l = ap.touch.originalPos.left + h
                    } else {
                        var h = k.changedTouches[0].pageY - ap.touch.start.y;
                        l = ap.touch.originalPos.top + h
                    }
                    aA(l, "reset", 0)
                }
            },
            t = function(f) {
                ap.viewport.unbind("touchmove", e);
                var h = f.originalEvent,
                    d = 0;
                if (ap.touch.end.x = h.changedTouches[0].pageX, ap.touch.end.y = h.changedTouches[0].pageY, "fade" == ap.settings.mode) {
                    var g = Math.abs(ap.touch.start.x - ap.touch.end.x);
                    g >= ap.settings.swipeThreshold && (ap.touch.start.x > ap.touch.end.x ? am.goToNextSlide() : am.goToPrevSlide(), am.stopAuto())
                } else {
                    var g = 0;
                    "horizontal" == ap.settings.mode ? (g = ap.touch.end.x - ap.touch.start.x, d = ap.touch.originalPos.left) : (g = ap.touch.end.y - ap.touch.start.y, d = ap.touch.originalPos.top), !ap.settings.infiniteLoop && (0 == ap.active.index && g > 0 || ap.active.last && 0 > g) ? aA(d, "reset", 200) : Math.abs(g) >= ap.settings.swipeThreshold ? (0 > g ? am.goToNextSlide() : am.goToPrevSlide(), am.stopAuto()) : aA(d, "reset", 200)
                }
                ap.viewport.unbind("touchend", t)
            },
            ae = function() {
                var f = a(window).width(),
                    d = a(window).height();
                if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
                    (aB != f || at != d) && (aB = f, at = d, am.redrawSlider())
                }
            };
        return am.goToSlide = function(o, k) {
            if (!ap.working && ap.active.index != o) {
                if (ap.working = !0, ap.oldIndex = ap.active.index, ap.active.index = 0 > o ? ai() - 1 : o >= ai() ? 0 : o, ap.settings.onSlideBefore(ap.children.eq(ap.active.index), ap.oldIndex, ap.active.index), "next" == k ? ap.settings.onSlideNext(ap.children.eq(ap.active.index), ap.oldIndex, ap.active.index) : "prev" == k && ap.settings.onSlidePrev(ap.children.eq(ap.active.index), ap.oldIndex, ap.active.index), ap.active.last = ap.active.index >= ai() - 1, ap.settings.pager && Z(ap.active.index), ap.settings.controls && s(), "fade" == ap.settings.mode) {
                    ap.settings.adaptiveHeight && ap.viewport.height() != ao() && ap.viewport.animate({
                        height: ao()
                    }, ap.settings.adaptiveHeightSpeed), ap.children.filter(":visible").fadeOut(ap.settings.speed).css({
                        zIndex: 0
                    }), ap.children.eq(ap.active.index).css("zIndex", 51).fadeIn(ap.settings.speed, function() {
                        a(this).css("zIndex", 50), ac()
                    })
                } else {
                    ap.settings.adaptiveHeight && ap.viewport.height() != ao() && ap.viewport.animate({
                        height: ao()
                    }, ap.settings.adaptiveHeightSpeed);
                    var u = 0,
                        f = {
                            left: 0,
                            top: 0
                        };
                    if (!ap.settings.infiniteLoop && ap.carousel && ap.active.last) {
                        if ("horizontal" == ap.settings.mode) {
                            var r = ap.children.eq(ap.children.length - 1);
                            f = r.position(), u = ap.viewport.width() - r.outerWidth()
                        } else {
                            var h = ap.children.length - ap.settings.minSlides;
                            f = ap.children.eq(h).position()
                        }
                    } else {
                        if (ap.carousel && ap.active.last && "prev" == k) {
                            var p = 1 == ap.settings.moveSlides ? ap.settings.maxSlides - ar() : (ai() - 1) * ar() - (ap.children.length - ap.settings.maxSlides),
                                r = am.children(".mc-clone").eq(p);
                            f = r.position()
                        } else {
                            if ("next" == k && 0 == ap.active.index) {
                                f = am.find("> .mc-clone").eq(ap.settings.maxSlides).position(), ap.active.last = !1
                            } else {
                                if (o >= 0) {
                                    var q = o * ar();
                                    f = ap.children.eq(q).position()
                                }
                            }
                        }
                    }
                    if ("undefined" != typeof f) {
                        var m = "horizontal" == ap.settings.mode ? -(f.left - u) : -f.top;
                        aA(m, "slide", ap.settings.speed)
                    }
                }
            }
        }, am.goToNextSlide = function() {
            if (ap.settings.infiniteLoop || !ap.active.last) {
                var d = parseInt(ap.active.index) + 1;
                am.goToSlide(d, "next")
            }
        }, am.goToPrevSlide = function() {
            if (ap.settings.infiniteLoop || 0 != ap.active.index) {
                var d = parseInt(ap.active.index) - 1;
                am.goToSlide(d, "prev")
            }
        }, am.startAuto = function(d) {
            ap.interval || (ap.interval = setInterval(function() {
                "next" == ap.settings.autoDirection ? am.goToNextSlide() : am.goToPrevSlide()
            }, ap.settings.pause), ap.settings.autoControls && 1 != d && af("stop"))
        }, am.stopAuto = function(d) {
            ap.interval && (clearInterval(ap.interval), ap.interval = null, ap.settings.autoControls && 1 != d && af("start"))
        }, am.getCurrentSlide = function() {
            return ap.active.index
        }, am.getSlideCount = function() {
            return ap.children.length
        }, am.redrawSlider = function() {
            ap.children.add(am.find(".mc-clone")).outerWidth(al()), ap.viewport.css("height", ao()), ap.settings.ticker || G(), ap.active.last && (ap.active.index = ai() - 1), ap.active.index >= ai() && (ap.active.last = !0), ap.settings.pager && !ap.settings.pagerCustom && (aj(), Z(ap.active.index))
        }, am.destroySlider = function() {
            ap.initialized && (ap.initialized = !1, a(".mc-clone", this).remove(), ap.children.each(function() {
                void 0 != a(this).data("origStyle") ? a(this).attr("style", a(this).data("origStyle")) : a(this).removeAttr("style")
            }), void 0 != a(this).data("origStyle") ? this.attr("style", a(this).data("origStyle")) : a(this).removeAttr("style"), a(this).unwrap().unwrap(), ap.controls.el && ap.controls.el.remove(), ap.controls.next && ap.controls.next.remove(), ap.controls.prev && ap.controls.prev.remove(), ap.pagerEl && ap.pagerEl.remove(), a(".mc-caption", this).remove(), ap.controls.autoEl && ap.controls.autoEl.remove(), clearInterval(ap.interval), ap.settings.responsive && a(window).unbind("resize", ae))
        }, am.reloadSlider = function(d) {
            void 0 != d && (aq = d), am.destroySlider(), ay()
        }, ay(), this
    }
}(jQuery);
(function() {
    var a = MadCap.CreateNamespace("Slideshow");
    $(function() {
        if (MadCap.Utilities != null && MadCap.Utilities.LoadHandlers != null) {
            MadCap.Utilities.LoadHandlers.MadCapSlideshow = a.Init;
            a.Init(document)
        }
    });
    a.Init = function(b) {
        var c;
        if ($("html").attr("data-mc-target-type")) {
            c = function(e, d) {
                return e.attr("data-mc-" + d)
            }
        } else {
            c = function(e, d) {
                return e.attr("madcap:" + d.replace("-", ""))
            }
        }
        $(".MCSlider", b).each(function(q, h) {
            var I = $(h);
            var l = {};
            var u = h.className;
            var f = c(I, "random-start");
            var z = c(I, "infinite-loop");
            var r = c(I, "show-captions");
            var w = c(I, "controls");
            var y = c(I, "slide-width");
            var x = c(I, "adaptive-height");
            var k = c(I, "responsive");
            var j = c(I, "navigation");
            var s = true;
            var e = false;
            l.pagerCustom = null;
            if (j) {
                if (j == "Thumbnails") {
                    e = true;
                    l.pagerCustom = "#mc-pager" + (q + 1).toString()
                }
                if (j == "None") {
                    s = false
                }
            }
            var F = c(I, "auto-hover");
            var m = c(I, "auto-start");
            var H = c(I, "auto-controls");
            var d = c(I, "combine-controls");
            var D = c(I, "auto-direction");
            var E = +c(I, "auto-delay");
            var t = c(I, "mode");
            var A = +c(I, "speed");
            var o = +c(I, "pause");
            var C = +c(I, "slides-displayed");
            var B = c(I, "video");
            if (u) {
                l.slideshowClass = u
            }
            if (f) {
                if ("true" == f.toString().toLowerCase()) {
                    l.randomStart = true
                } else {
                    if ("false" == f.toString().toLowerCase()) {
                        l.randomStart = false
                    }
                }
            }
            if (z) {
                if ("true" == z.toString().toLowerCase()) {
                    l.infiniteLoop = true
                } else {
                    if ("false" == z.toString().toLowerCase()) {
                        l.infiniteLoop = false;
                        l.hideControlOnEnd = true
                    }
                }
            }
            if (r) {
                if ("true" == r.toString().toLowerCase()) {
                    l.captions = true
                } else {
                    if ("false" == r.toString().toLowerCase()) {
                        l.captions = false
                    }
                }
            }
            if (w) {
                if ("true" == w.toString().toLowerCase()) {
                    l.controls = true
                } else {
                    if ("false" == w.toString().toLowerCase()) {
                        l.controls = false
                    }
                }
            }
            l.pager = s;
            l.thumbnails = e;
            if (y) {
                l.slideWidth = y
            }
            if (x) {
                if ("true" == x.toString().toLowerCase()) {
                    l.adaptiveHeight = true
                } else {
                    if ("false" == x.toString().toLowerCase()) {
                        l.adaptiveHeight = false
                    }
                }
            }
            if (k) {
                if ("true" == k.toString().toLowerCase()) {
                    l.responsive = true
                } else {
                    if ("false" == k.toString().toLowerCase()) {
                        l.responsive = false
                    }
                }
            }
            var p = false;
            if (F) {
                if ("true" == F.toString().toLowerCase()) {
                    l.autoHover = true;
                    p = true
                } else {
                    if ("false" == F.toString().toLowerCase()) {
                        l.autoHover = false
                    }
                }
            }
            if (m) {
                if ("true" == m.toString().toLowerCase()) {
                    l.autoStart = true;
                    p = true
                } else {
                    if ("false" == m.toString().toLowerCase()) {
                        l.autoStart = false
                    }
                }
            }
            if (H) {
                if ("true" == H.toString().toLowerCase()) {
                    l.autoControls = true;
                    l.autoControlsCombine = true;
                    p = true
                } else {
                    if ("false" == H.toString().toLowerCase()) {
                        l.autoControls = false;
                        l.autoControlsCombine = false
                    }
                }
            }
            if (p) {
                l.auto = true
            }
            if (D) {
                l.autoDirection = D
            }
            if (E) {
                l.autoDelay = E
            }
            if (t) {
                l.mode = t
            }
            if (A) {
                l.speed = A
            }
            if (o) {
                l.pause = o
            }
            if (C) {
                l.minSlides = C;
                l.maxSlides = C;
                l.moveSlides = 1;
                if (y) {
                    var G = y.match(/\d+/);
                    var v = y.replace(/\d/g, "");
                    l.slideWidth = (G / C) + v
                }
            }
            if (navigator.userAgent.indexOf("MSIE") !== -1) {
                l.preloadImages = "all"
            }
            l.video = true;
            l.useCSS = false;
            if (B) {
                l.video = false
            }
            l.onSliderLoad = function(J) {
                $(".MCSlide").css("visibility", "visible")
            };
            var g;
            var n;
            if (MadCap.Utilities != null && MadCap.Utilities.HasRuntimeFileType("Topic") && $("html").attr("data-mc-target-type") != "EPUB" && $("html").attr("data-mc-target-type") != "EclipseHelp") {
                MadCap.Utilities.CrossFrame.PostMessageRequest(parent, "get-href", null, function(O) {
                    if (O) {
                        var K = new MadCap.Utilities.Url(decodeURIComponent(O[0]));
                        var J = new MadCap.Utilities.Url(K.Fragment.substring(1));
                        g = J.Fragment;
                        n = K.QueryMap.GetItem("Highlight");
                        if (g) {
                            g = g.substring(1);
                            g = g.replace(".", "\\.");
                            try {
                                l.startSlide = $("[name=" + g + "]").closest(".MCSlide").index();
                                if (l.startSlide < 0) {
                                    l.startSlide = 0
                                }
                            } catch (N) {
                                l.startSlide = 0
                            }
                        } else {
                            if (n) {
                                var M = n.replace('"', "").split(" ");
                                for (var L = 0; L < M.length; L++) {
                                    if (M[L] == "") {
                                        M.splice(M[L], 1);
                                        L--
                                    }
                                }
                                $(".MCSlide", b).each(function(P, S) {
                                    for (var R = 0; R < M.length; R++) {
                                        if (M[R] != "") {
                                            var Q = new RegExp("\\b" + M[R] + "\\b", "i");
                                            var U = $(S).attr("title");
                                            if (U != null && U.match(Q)) {
                                                l.startSlide = P;
                                                return false
                                            }
                                            var T = $(S).text();
                                            if (T != null && T.match(Q)) {
                                                l.startSlide = P;
                                                return false
                                            }
                                        }
                                    }
                                    if (l.startSlide < 0) {
                                        l.startSlide = 0
                                    }
                                })
                            }
                        }
                    }
                    I.MCSlider(l)
                })
            } else {
                I.MCSlider(l)
            }
        })
    }
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function() {
    MadCap.WebHelp = MadCap.CreateNamespace("WebHelp");
    MadCap.WebHelp.FeedbackController = function(g) {
        var f = this;
        var e = 0;
        this.Server = g;
        this.FeedbackServer = c(g);
        this.Version = -1;
        this.FeedbackActive = false;
        this.PulseServer = null;
        this.PulseEnabled = false;
        this.PulseActive = false;
        this.PulseUserGuid = null;

        function c(j, i) {
            if (j == null) {
                return null
            }
            if (typeof i == "undefined") {
                i = ""
            }
            var h = new MadCap.Utilities.Url(j);
            h = h.CombinePath(i + "Service.FeedbackExplorer/FeedbackJsonService.asmx/");
            return h.FullPath
        }

        function d(w, v, o, k) {
            if (typeof MadCap.WebHelp.FeedbackController.Shared == "undefined") {
                MadCap.WebHelp.FeedbackController.Shared = f
            }
            var z = document.createElement("script");
            var l = document.getElementsByTagName("head")[0];
            var s = "MCLiveHelpScript_" + e++;
            var m = f.FeedbackServer + w + "?";
            m += "OnComplete=" + v + "&ScriptID=" + s + "&UniqueID=" + (new Date()).getTime();
            if (o != null) {
                for (var x = 0, j = o.length; x < j; x++) {
                    var t = o[x];
                    var B = t[0];
                    var u = encodeURIComponent(t[1]);
                    m += ("&" + B + "=" + u)
                }
            }
            if (document.body.currentStyle != null) {
                var q = 2083;
                if (m.length > q) {
                    var r = m.length - q;
                    var A = {
                        ExceedAmount: r
                    };
                    var y = new MadCap.FeedbackException(-1, "URL limit exceeded.", A);
                    throw y
                }
            }
            var n = 2048;
            var p = m.indexOf("?");
            var h = m.substring(p + 1).length;
            if (h > n) {
                var r = h - n;
                var A = {
                    ExceedAmount: r
                };
                var y = new MadCap.FeedbackException(-1, "Query string limit exceeded.", A);
                throw y
            }
            z.id = s;
            z.setAttribute("type", "text/javascript");
            z.setAttribute("src", m);
            l.appendChild(z);
            return s
        }

        function b(h) {
            window.setTimeout(function() {
                var i = document.getElementById(h);
                i.parentNode.removeChild(i)
            }, 10)
        }
        this.Init = (function() {
            var k = false;
            var h = false;
            var i = new Array();
            var l = 3000;

            function j() {
                for (var m = 0; m < i.length; m++) {
                    i[m].apply(this, arguments)
                }
                k = true
            }
            return function(m) {
                if (k) {
                    m.apply(this, arguments);
                    return
                }
                if (m != null) {
                    i.push(m)
                }
                if (h) {
                    return
                }
                h = true;
                this.GetVersion(function() {
                    if (this.PulseEnabled) {
                        this.GetPulseServerActivated(function(n) {
                            this.PulseActive = n && n.toLowerCase() === "true";
                            j.apply(this, arguments)
                        }, null, this)
                    } else {
                        j()
                    }
                }, null, this);
                window.setTimeout(function() {
                    if (!k) {
                        j.apply(this, arguments)
                    }
                }, l)
            }
        })();
        this.GetUserGuid = function() {
            return f.PulseEnabled ? f.PulseUserGuid : MadCap.Utilities.Store.getItem("LiveHelpUserGuid")
        };
        this.LogTopic = function(i, j, h) {
            this.LogTopicOnComplete = function(k) {
                if (h != null) {
                    h()
                }
                b(k);
                this.LogTopicOnComplete = null
            };
            this.GetVersion(function(k) {
                if (k == 1) {
                    d("LogTopic", "MadCap.WebHelp.FeedbackController.Shared.LogTopicOnComplete", [
                        ["TopicID", i]
                    ])
                } else {
                    d("LogTopic2", "MadCap.WebHelp.FeedbackController.Shared.LogTopicOnComplete", [
                        ["TopicID", i],
                        ["CSHID", j]
                    ])
                }
            })
        };
        this.LogSearch = function(h, k, i, l, j) {
            this.LogSearchOnComplete = function(m) {
                b(m);
                this.LogSearchOnComplete = null
            };
            d("LogSearch", "MadCap.WebHelp.FeedbackController.Shared.LogSearchOnComplete", [
                ["ProjectID", h],
                ["UserGuid", k],
                ["ResultCount", i],
                ["Language", l],
                ["Query", j]
            ])
        };
        this.AddComment = function(j, l, k, i, n, m, h) {
            this.AddCommentOnComplete = function(o) {
                if (h != null) {
                    h()
                }
                b(o);
                this.AddCommentOnComplete = null
            };
            d("AddComment", "MadCap.WebHelp.FeedbackController.Shared.AddCommentOnComplete", [
                ["TopicID", j],
                ["UserGuid", l],
                ["Username", k],
                ["Subject", i],
                ["Comment", n],
                ["ParentCommentID", m]
            ])
        };
        this.GetAverageRating = function(j, h, i) {
            if (j == null) {
                if (h != null) {
                    h(0, 0, i)
                }
                return
            }
            this.GetAverageRatingOnComplete = function(m, l, k) {
                if (h != null) {
                    h(l, k, i)
                }
                b(m);
                this.GetAverageRatingOnComplete = null
            };
            d("GetAverageRating", "MadCap.WebHelp.FeedbackController.Shared.GetAverageRatingOnComplete", [
                ["TopicID", j]
            ])
        };
        this.SubmitRating = function(j, k, m, h, i) {
            this.SubmitRatingOnComplete = function(n) {
                if (h != null) {
                    h(i)
                }
                b(n);
                this.SubmitRatingOnComplete = null
            };
            var l = d("SubmitRating", "MadCap.WebHelp.FeedbackController.Shared.SubmitRatingOnComplete", [
                ["TopicID", j],
                ["Rating", k],
                ["Comment", m]
            ])
        };
        this.GetTopicComments = function(j, l, k, h, i) {
            this.GetTopicCommentsOnComplete = function(o, n) {
                if (h != null) {
                    h(n, i)
                }
                b(o);
                this.GetTopicCommentsOnComplete = null
            };
            var m = d("GetTopicComments", "MadCap.WebHelp.FeedbackController.Shared.GetTopicCommentsOnComplete", [
                ["TopicID", j],
                ["UserGuid", l],
                ["Username", k]
            ])
        };
        this.GetAnonymousEnabled = function(i, h, j) {
            this.GetAnonymousEnabledOnComplete = function(l, k) {
                if (h != null) {
                    h(k, j)
                }
                b(l);
                this.GetAnonymousEnabledOnComplete = null
            };
            d("GetAnonymousEnabled", "MadCap.WebHelp.FeedbackController.Shared.GetAnonymousEnabledOnComplete", [
                ["ProjectID", i]
            ])
        };
        this.StartActivateUser = function(m, r, p) {
            this.StartActivateUserOnComplete = function(A, z) {
                if (r != null) {
                    r(z, p)
                }
                b(A);
                this.StartActivateUserOnComplete = null
            };
            var y = FMCGetChildNodeByAttribute(m.documentElement, "Name", "Username");
            var j = FMCGetAttribute(y, "Value");
            var n = FMCGetChildNodeByAttribute(m.documentElement, "Name", "EmailAddress");
            var i = FMCGetAttribute(n, "Value");
            var t = FMCGetChildNodeByAttribute(m.documentElement, "Name", "FirstName");
            var h = FMCGetAttribute(t, "Value");
            var x = FMCGetChildNodeByAttribute(m.documentElement, "Name", "LastName");
            var s = FMCGetAttribute(x, "Value");
            var w = FMCGetChildNodeByAttribute(m.documentElement, "Name", "Country");
            var v = FMCGetAttribute(w, "Value");
            var u = FMCGetChildNodeByAttribute(m.documentElement, "Name", "PostalCode");
            var o = FMCGetAttribute(u, "Value");
            var k = FMCGetChildNodeByAttribute(m.documentElement, "Name", "Gender");
            var q = FMCGetAttribute(k, "Value");
            var l = "";
            d("StartActivateUser", "MadCap.WebHelp.FeedbackController.Shared.StartActivateUserOnComplete", [
                ["Username", j],
                ["EmailAddress", i],
                ["FirstName", h],
                ["LastName", s],
                ["Country", v],
                ["Zip", o],
                ["Gender", q],
                ["UILanguageOrder", l]
            ])
        };
        this.StartActivateUser2 = function(k, h, j, l) {
            var i = MadCap.Utilities.Xhr.GetOuterXml(k);
            this.StartActivateUser2OnComplete = function(n, m) {
                if (h != null) {
                    if (l != null) {
                        h.call(l, m, j)
                    } else {
                        h(m, j)
                    }
                }
                b(n);
                this.StartActivateUser2OnComplete = null
            };
            d("StartActivateUser2", "MadCap.WebHelp.FeedbackController.Shared.StartActivateUser2OnComplete", [
                ["Xml", i]
            ])
        };
        this.UpdateUserProfile = function(k, l, h, j, m) {
            var i = MadCap.Utilities.Xhr.GetOuterXml(l);
            this.UpdateUserProfileOnComplete = function(o, n) {
                if (h != null) {
                    if (m != null) {
                        h.call(m, n, j)
                    } else {
                        h(n, j)
                    }
                }
                b(o);
                this.UpdateUserProfileOnComplete = null
            };
            d("UpdateUserProfile", "MadCap.WebHelp.FeedbackController.Shared.UpdateUserProfileOnComplete", [
                ["Guid", k],
                ["Xml", i]
            ])
        };
        this.GetUserProfile = function(j, h, i, k) {
            this.GetUserProfileOnComplete = function(m, l) {
                if (h != null) {
                    if (k != null) {
                        h.call(k, l, i)
                    } else {
                        h(l, i)
                    }
                }
                b(m);
                this.GetUserProfileOnComplete = null
            };
            d("GetUserProfile", "MadCap.WebHelp.FeedbackController.Shared.GetUserProfileOnComplete", [
                ["Guid", j]
            ])
        };
        this.CheckUserStatus = function(j, h, i) {
            this.CheckUserStatusOnComplete = function(l, k) {
                if (h != null) {
                    h(k, i)
                }
                b(l);
                this.CheckUserStatusOnComplete = null
            };
            d("CheckUserStatus", "MadCap.WebHelp.FeedbackController.Shared.CheckUserStatusOnComplete", [
                ["PendingGuid", j]
            ])
        };
        this.GetSynonymsFile = function(i, k, h, j) {
            this.GetSynonymsFileOnComplete = function(m, l) {
                if (h != null) {
                    h(l, j)
                }
                b(m)
            };
            d("GetSynonymsFile", "MadCap.WebHelp.FeedbackController.Shared.GetSynonymsFileOnComplete", [
                ["ProjectID", i],
                ["UpdatedSince", k]
            ])
        };
        this.GetVersion = function(h, i, j) {
            this.GetVersionOnComplete = function(l, k) {
                if (k == null) {
                    f.Version = 1
                } else {
                    if (f.Version == -1 && k > 4) {
                        f.FeedbackServer = c(f.Server, "Feedback/");
                        f.PulseServer = f.Server;
                        f.PulseEnabled = true
                    }
                    f.FeedbackActive = true;
                    f.Version = k
                }
                if (h != null) {
                    if (j != null) {
                        h.call(j, f.Version, i)
                    } else {
                        h(f.Version, i)
                    }
                }
                if (l != null) {
                    b(l)
                }
                this.GetVersionOnComplete = null
            };
            if (f.Version == -1) {
                d("GetVersion", "MadCap.WebHelp.FeedbackController.Shared.GetVersionOnComplete")
            } else {
                this.GetVersionOnComplete(null, f.Version)
            }
        };
        this.GetPulseServerActivated = function(i, h, j) {
            this.GetPulseServerActivatedOnComplete = function(l, k) {
                if (i != null) {
                    if (j != null) {
                        i.call(j, k, h)
                    } else {
                        i(k, h)
                    }
                }
                if (l != null) {
                    b(l)
                }
                this.GetPulseServerActivatedOnComplete = null
            };
            d("GetPulseServerActivated", "MadCap.WebHelp.FeedbackController.Shared.GetPulseServerActivatedOnComplete")
        };
        this.GetPulseStreamID = function(i, j, h, k) {
            this.GetPulseStreamIDOnComplete = function(m, l) {
                if (j != null) {
                    if (k != null) {
                        j.call(k, l, h)
                    } else {
                        j(l, h)
                    }
                }
                if (m != null) {
                    b(m)
                }
                this.GetPulseStreamIDOnComplete = null
            };
            d("GetPulseStreamID", "MadCap.WebHelp.FeedbackController.Shared.GetPulseStreamIDOnComplete", [
                ["TopicID", i]
            ])
        };
        this.GetTopicPathByStreamID = function(j, i, h, k) {
            this.GetTopicPathByStreamIDOnComplete = function(l, m) {
                if (i != null) {
                    if (k != null) {
                        i.call(k, m, h)
                    } else {
                        i(m, h)
                    }
                }
                if (l != null) {
                    b(l)
                }
                this.GetTopicPathByStreamIDOnComplete = null
            };
            d("GetTopicPathByStreamID", "MadCap.WebHelp.FeedbackController.Shared.GetTopicPathByStreamIDOnComplete", [
                ["StreamID", j]
            ])
        };
        this.GetTopicPathByPageID = function(h, j, i, k) {
            this.GetTopicPathByPageIDOnComplete = function(l, m) {
                if (j != null) {
                    if (k != null) {
                        j.call(k, m, i)
                    } else {
                        j(m, i)
                    }
                }
                if (l != null) {
                    b(l)
                }
                this.GetTopicPathByPageIDOnComplete = null
            };
            d("GetTopicPathByPageID", "MadCap.WebHelp.FeedbackController.Shared.GetTopicPathByPageIDOnComplete", [
                ["PageID", h]
            ])
        };
        this.GetPulseSearchResults = function(j, l, i, h) {
            var k = $.Deferred();
            this.GetPulseSearchResultsOnComplete = function(n, m) {
                k.resolve(m);
                if (n != null) {
                    b(n)
                }
                this.GetPulseSearchResultsOnComplete = null
            };
            d("GetPulseSearchResults", "MadCap.WebHelp.FeedbackController.Shared.GetPulseSearchResultsOnComplete", [
                ["ProjectID", j],
                ["SearchQuery", l],
                ["PageSize", i],
                ["PageIndex", h]
            ]);
            return k.promise()
        }
    };
    MadCap.WebHelp.LoadFeedbackController = MadCap.Utilities.Memoize(function(b) {
        return new MadCap.WebHelp.FeedbackController(b)
    });
    MadCap.WebHelp.MockFeedbackController = function() {
        this.GetVersion = function(b, c, d) {
            this.FeedbackActive = true;
            this.Version = 3;
            if (b != null) {
                if (d != null) {
                    b.call(d, this.Version, c)
                } else {
                    b(this.Version, c)
                }
            }
        };
        this.GetAverageRating = function(d, b, c) {
            if (b != null) {
                b(50, 10, c)
            }
        };
        this.SubmitRating = function(d, e, f, b, c) {
            if (b != null) {
                b(c)
            }
        };
        this.GetUserGuid = function() {
            return null
        }
    };
    MadCap.WebHelp.MockFeedbackController.prototype = new MadCap.WebHelp.FeedbackController(null);
    MadCap.CreateNamespace("Feedback");
    MadCap.Feedback.LoginDialog = function(c, b) {
        this._FeedbackController = c;
        this._TimeoutID = -1;
        this._Mode = b;
        this._UserGuid = null;
        this._El = null
    };
    var a = MadCap.Feedback.LoginDialog;
    a.prototype._Init = function() {
        var c = this;
        this._El = $(".login-dialog");
        $(".login-dialog-buttons .submit-button").click(function(d) {
            c.Submit()
        });
        $(".login-dialog-buttons .cancel-button").click(function(d) {
            c.Hide(false)
        });
        if (this._Mode == "edit") {
            this._UserGuid = this._FeedbackController.GetUserGuid();
            this._FeedbackController.GetUserProfile(this._UserGuid, function(f, d) {
                var e = MadCap.Utilities.Xhr.LoadXmlString(f);
                $(e.documentElement).children("Item").each(function(h, i) {
                    var k = $(this);
                    var g = k.attr("Name");
                    var j = k.attr("Value");
                    var m = $(".login-dialog input[name='" + g + "']");
                    if (m.attr("type") == "checkbox") {
                        var l = MadCap.String.ToBool(j, false);
                        m.prop("checked", l)
                    } else {
                        m.val(j)
                    }
                })
            }, null, this)
        } else {
            if (this._Mode == "pulse") {
                if (c._El.length == 0) {
                    $("body").append('<div class="login-dialog pulse" />');
                    c._El = $(".login-dialog")
                }
                var b = $("#pulse-login-frame");
                if (b.length == 0) {
                    c._El.addClass("pulse");
                    c._El.empty();
                    c._El.append('<iframe id="pulse-login-frame" name="pulse-login-html5" style="visibility:hidden;" onload="this.style.visibility=\'visible\';"></iframe>');
                    c._El.append('<button class="close-dialog"></button>');
                    $(".close-dialog", c._El).click(function(d) {
                        c.Hide(true)
                    });
                    $("#pulse-login-frame").attr("src", c._FeedbackController.PulseServer + "Login")
                }
            }
        }
    };
    a.prototype._Cleanup = function() {
        $(".login-dialog-buttons .submit-button").off("click");
        $(".login-dialog-buttons .cancel-button").off("click");
        $(".submit-button").attr("disabled", null);
        $(".status-message-box").hide();
        $(".profile-item-wrapper.error").removeClass("error");
        window.clearTimeout(this._TimeoutID)
    };
    a.prototype.Show = function() {
        this._Init();
        var b = MadCap.TextEffects.AddBackgroundTint("light");
        $(b).animate({
            opacity: 0.5
        }, 200);
        this._El.fadeIn(200);
        $("body").css("height", "100%");
        $("body").css("overflow", "hidden")
    };
    a.prototype.Hide = function(b) {
        this._Cleanup();
        MadCap.TextEffects.RemoveBackgroundTint();
        if (b) {
            this._El.fadeOut()
        } else {
            this._El.hide()
        }
        $("body").css("height", "");
        $("body").css("overflow", "");
        $(this).trigger("closed")
    };
    a.prototype.Submit = function() {
        $(".status-message-box").hide();
        $(".profile-item-wrapper.error").removeClass("error");
        if (this._CheckErrors()) {
            this._SetStatusMessage("required-fields-missing-message", "error");
            return
        }
        var c = this._LoginItemsToXml();
        var b = this;
        if (this._Mode == "new") {
            this._FeedbackController.StartActivateUser2(c, function(d) {
                b._CheckUserStatus(d)
            });
            this._SetStatusMessage("verification-email-sent-message")
        } else {
            if (this._Mode == "edit") {
                this._FeedbackController.UpdateUserProfile(this._UserGuid, c, function(d) {
                    if (d == "00000000-0000-0000-0000-000000000000") {
                        b.Hide(true)
                    } else {
                        b._CheckUserStatus(d);
                        b._SetStatusMessage("verification-email-sent-message")
                    }
                })
            }
        }
        $(".submit-button").attr("disabled", "disabled")
    };
    a.prototype._CheckUserStatus = function(c) {
        var b = this;
        this._FeedbackController.CheckUserStatus(c, function(d) {
            if (d == "Pending") {
                b._TimeoutID = setTimeout(function() {
                    b._CheckUserStatus(c)
                }, 5000)
            } else {
                MadCap.Utilities.Store.setItem("LiveHelpUserGuid", d);
                b.Hide(true)
            }
        })
    };
    a.prototype._CheckErrors = function() {
        var e = false;
        var d = $(".login-dialog .profile-item-wrapper input, .login-dialog .profile-item-wrapper select");
        for (var c = 0, f = d.length; c < f; c++) {
            var b = d[c];
            var j = $(b);
            var g = j.val();
            var h = MadCap.String.ToBool(MadCap.Dom.Dataset(b, "required"), false);
            if (h && MadCap.String.IsNullOrEmpty(g)) {
                j.closest(".profile-item-wrapper").addClass("error");
                e = true
            }
        }
        return e
    };
    a.prototype._LoginItemsToXml = function() {
        var m = MadCap.Utilities.Xhr.CreateXmlDocument("FeedbackUserProfile");
        var h = m.documentElement;
        var b = $(".login-dialog .profile-item-wrapper input");
        for (var e = 0, d = b.length; e < d; e++) {
            var j = b[e];
            var g = $(j);
            var c = g.attr("name");
            var f = g.attr("type");
            var k = f == "checkbox" ? j.checked : g.val();
            var l = m.createElement("Item");
            l.setAttribute("Name", c);
            l.setAttribute("Value", k.toString());
            h.appendChild(l)
        }
        return m
    };
    a.prototype._SetStatusMessage = function(b, c) {
        var d = $(".status-message-box");
        if (c == "error") {
            d.addClass("error")
        } else {
            d.removeClass("error")
        }
        $(".message").hide();
        $("." + b).show();
        d.fadeIn()
    };
    MadCap.FeedbackException = function(c, b, d) {
        MadCap.Exception.call(this, c, b);
        this.Data = d
    };
    MadCap.FeedbackException.prototype = new MadCap.Exception();
    MadCap.FeedbackException.prototype.constructor = MadCap.FeedbackException;
    MadCap.FeedbackException.prototype.base = MadCap.Exception.prototype
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
MadCap.WebHelp = MadCap.CreateNamespace("WebHelp");
MadCap.WebHelp.HelpSystem = function(o, s, j, e, m) {
    var h = this;
    var v = o;
    var D = new MadCap.Utilities.Url(j).ToFolder().ToFolder().FullPath;
    var a = null;
    var B = new Array();
    var w = e;
    var i = m;
    var g = null;
    var A = [];
    var p = new MadCap.Utilities.Dictionary();
    var J = null;
    var n = new MadCap.Utilities.Dictionary();
    var C = false;
    var G = new MadCap.WebHelp.AliasFile(D + "Data/Alias.xml", this);
    var f = new MadCap.WebHelp.TocFile(this, MadCap.WebHelp.TocFile.TocType.Toc);
    var d = null;
    var E = new MadCap.WebHelp.TocFile(this, MadCap.WebHelp.TocFile.TocType.BrowseSequence);
    var z = new MadCap.Utilities.Dictionary();
    this.TargetType = null;
    this.DefaultStartTopic = null;
    this.InPreviewMode = null;
    this.LiveHelpOutputId = null;
    this.LiveHelpServer = null;
    this.LiveHelpEnabled = false;
    this.IsWebHelpPlus = false;
    this.ContentFolder = null;
    this.UseCustomTopicFileExtension = false;
    this.CustomTopicFileExtension = null;
    this.IsMultilingual = false;
    this.GlossaryUrl = null;
    this.SearchFilterSetUrl = null;
    this.SyncTOC = null;
    this.IndexPartialWordSearch = true;
    this.GlossaryPartialWordSearch = true;
    this.DefaultSkin = null;
    this.IsAutoMerged = false;
    this.LanguageUrl = null;
    this.BreakpointsUrl = null;
    this.PreventExternalUrls = false;
    this.IsResponsive = false;
    this.SearchUrl = null;
    this.PulsePage = null;
    this.ScriptsFolderPath = null;
    this.LanguageCode = null;
    this.LanguageName = null;
    (function() {})();
    this.Load = function(K) {
        MadCap.Utilities.Xhr.Load(j, true, function(Y) {
            var R = 0;

            function N() {
                R++;
                if (R == B.length) {
                    K()
                }
            }

            function Z(ac, aa) {
                if (B.length > 0) {
                    for (var ab = 0; ab < B.length; ab++) {
                        B[ab].Load(ac)
                    }
                } else {
                    aa()
                }
            }
            C = Y != null;
            if (!C) {
                K();
                return
            }
            this.LanguageCode = Y.documentElement.getAttribute("xml:lang");
            this.LanguageName = Y.documentElement.getAttribute("LanguageName");
            this.TargetType = Y.documentElement.getAttribute("TargetType");
            this.DefaultStartTopic = Y.documentElement.getAttribute("DefaultUrl");
            this.InPreviewMode = MadCap.Dom.GetAttributeBool(Y.documentElement, "InPreviewMode", false);
            this.LiveHelpOutputId = Y.documentElement.getAttribute("LiveHelpOutputId");
            this.LiveHelpServer = Y.documentElement.getAttribute("LiveHelpServer");
            this.LiveHelpEnabled = this.LiveHelpOutputId != null;
            this.MoveContentToRoot = MadCap.Dom.GetAttributeBool(Y.documentElement, "MoveOutputContentToRoot", false);
            this.ReplaceReservedCharacters = MadCap.Dom.GetAttributeBool(Y.documentElement, "ReplaceReservedCharacters", false);
            this.MakeFileLowerCase = MadCap.Dom.GetAttributeBool(Y.documentElement, "MakeFileLowerCase", false);
            this.PreventExternalUrls = MadCap.Dom.GetAttributeBool(Y.documentElement, "PreventExternalUrls", false);
            this.IsResponsive = MadCap.Dom.GetAttributeBool(Y.documentElement, "EnableResponsiveOutput", false);
            this.IncludeGlossarySearchResults = MadCap.Dom.GetAttributeBool(Y.documentElement, "IncludeGlossarySearchResults", true);
            this.ResultsPerPage = MadCap.Dom.GetAttributeInt(Y.documentElement, "ResultsPerPage", 20);
            this.SearchEngine = MadCap.Dom.GetAttribute(Y.documentElement, "SearchEngine");
            var P = MadCap.Dom.GetAttributeBool(Y.documentElement, "ServerEnabled", false);
            this.IsWebHelpPlus = (this.TargetType == "WebHelpPlus" || P) && MadCap.String.StartsWith(document.location.protocol, "http", false);
            var L = "";
            if (!this.MoveContentToRoot) {
                L = "Content/"
            }
            if (this.MakeFileLowerCase) {
                L = L.toLowerCase()
            }
            this.ContentFolder = L;
            this.UseCustomTopicFileExtension = MadCap.Dom.GetAttributeBool(Y.documentElement, "UseCustomTopicFileExtension", false);
            this.CustomTopicFileExtension = MadCap.Dom.GetAttribute(Y.documentElement, "CustomTopicFileExtension");
            this.IsMultilingual = MadCap.Dom.GetAttributeBool(Y.documentElement, "Multilingual", false);
            this.GlossaryUrl = c(Y, "Glossary");
            this.TocUrl = c(Y, "Toc");
            this.SearchUrl = c(Y, "SearchUrl");
            this.PulsePage = c(Y, "PulsePage");
            this.BrowseSequencesUrl = c(Y, "BrowseSequence");
            this.IndexUrl = c(Y, "Index");
            this.SearchFilterSetUrl = c(Y, "SearchFilterSet");
            this.LanguageUrl = D + "Data/Language.js";
            this.BreakpointsUrl = D + "Data/Breakpoints.js";
            this.ScriptsFolderPath = Y.documentElement.getAttribute("PathToScriptsFolder");
            this.HasBrowseSequences = Y.documentElement.getAttribute("BrowseSequence") != null;
            this.HasToc = Y.documentElement.getAttribute("Toc") != null;
            this.TopNavTocPath = Y.documentElement.getAttribute("TopNavTocPath") == "true";
            l.call(this, Y);
            this.DefaultSkin = this.GetSkin($(Y.documentElement).attr("SkinID"));
            this.SyncTOC = this.DefaultSkin != null && MadCap.String.ToBool(this.DefaultSkin.AutoSyncTOC, false);
            this.IndexPartialWordSearch = this.DefaultSkin == null || MadCap.String.ToBool(this.DefaultSkin.IndexPartialWordSearch, true);
            this.GlossaryPartialWordSearch = this.DefaultSkin == null || MadCap.String.ToBool(this.DefaultSkin.GlossaryPartialWordSearch, true);
            this.DisplayCommunitySearchResults = this.DefaultSkin == null || MadCap.String.ToBool(this.DefaultSkin.DisplayCommunitySearchResults, true);
            this.CommunitySearchResultsCount = 3;
            if (this.DefaultSkin != null) {
                this.CommunitySearchResultsCount = MadCap.String.ToInt(this.DefaultSkin.CommunitySearchResultsCount, 3)
            }
            var S = Y.getElementsByTagName("Subsystems");
            if (S.length > 0 && S[0].getElementsByTagName("Url").length > 0) {
                var X = Y.getElementsByTagName("Subsystems")[0].getElementsByTagName("Url");
                for (var Q = 0; Q < X.length; Q++) {
                    var U = X[Q];
                    if (!U) {
                        continue
                    }
                    var M = U.getAttribute("Source");
                    var O = M.substring(0, M.lastIndexOf("/") + 1);
                    var W = U.getAttribute("TocPath");
                    var T = U.getAttribute("BrowseSequencePath");
                    var V = new MadCap.WebHelp.HelpSystem(this, D + O, D + O + "Data/HelpSystem.xml", W, T);
                    B.push(V)
                }
            }
            this.LoadBreakpoints(function() {
                h.LoadLanguage(function() {
                    if (!h.IsAutoMerged && h.IsWebHelpPlus) {
                        MadCap.Utilities.Xhr.CallWebService(h.GetPath() + "Service/Service.asmx/GetSubsystems", true, function(ab, aa) {
                            if (ab) {
                                $.each(ab.documentElement.childNodes, function(ac, ad) {
                                    if (ad.nodeName == "Subsystems") {
                                        $.each(ad.childNodes, function(ah, ai) {
                                            if (ai.nodeName == "Url") {
                                                var ag = ai.getAttribute("Source");
                                                var ae = ag.substring(0, ag.lastIndexOf("/") + 1);
                                                if (ae) {
                                                    var af = new MadCap.WebHelp.HelpSystem(h, D + ae, D + ae + "Data/HelpSystem.xml", null, null);
                                                    af.IsAutoMerged = true;
                                                    B.push(af)
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                            Z(N, K)
                        })
                    } else {
                        Z(N, K)
                    }
                })
            })
        }, null, this)
    };
    this.GetExists = function() {
        return C
    };
    this.GetMasterHelpsystem = function() {
        var K = this;
        for (var L = K.GetParentSubsystem(); L != null; L = L.GetParentSubsystem()) {
            K = L
        }
        return K
    };
    this.GetParentSubsystem = function() {
        return v
    };
    this.GetPath = function() {
        return D
    };
    this.GetCurrentTopicPath = function() {
        return MadCap.Utilities.Url.GetDocumentUrl().ToRelative(MadCap.Utilities.Url.GetAbsolutePath(D)).FullPath
    };
    this.GetAbsolutePath = function() {
        if (a == null) {
            var K = new MadCap.Utilities.Url(D);
            a = K.IsAbsolute ? K.FullPath : new MadCap.Utilities.Url(document.location.href).Path
        }
        return a
    };
    this.GetContentPath = function() {
        return D + this.ContentFolder
    };
    this.GetSkin = function(K) {
        return z.GetItem(K)
    };
    this.GetSkinByName = function(K) {
        var N = this.GetSkins();
        for (var L = 0; L < N.length; L++) {
            var M = N[L];
            if (M.Name == K) {
                return M
            }
        }
        return null
    };
    this.GetCurrentSkin = function() {
        var L = MadCap.Utilities.Url.GetDocumentUrl();
        var K = L.QueryMap.GetItem("skinName") || L.HashMap.GetItem("skinName");
        if (K) {
            var O = this.GetSkin(K);
            if (!O) {
                O = this.GetSkinByName(K)
            }
            return O
        }
        var N = L.QueryMap.GetItem("cshid");
        if (N) {
            var M = G.LookupID(N);
            if (M.Skin) {
                var O = this.GetSkin(M.Skin);
                if (!O) {
                    O = this.GetSkinByName(M.Skin)
                }
                return O
            }
        }
        return this.DefaultSkin
    };
    this.GetTocPath = function(K) {
        return K == "toc" ? w : i
    };
    this.GetFullTocPath = function(K, M) {
        var N = this.GetHelpSystem(M);
        if (N == null) {
            return null
        }
        var L = new Object();
        L.tocPath = this.GetTocPath(K);
        N.ComputeTocPath(K, L);
        return L.tocPath
    };
    this.GetTopicPath = function(K) {
        var Q = this.GetPath();
        var N = !this.IsRoot;
        var P = this.GetMasterHelpsystem();
        if (N && !masterHelpsystem.MoveContentToRoot) {
            Q = "../" + Q
        }
        var O = (new MadCap.Utilities.Url(document.location.href)).ToPath();
        var M = O.CombinePath(Q + "Data/").CombinePath(K);
        var L = M.ToRelative(O);
        if (MadCap.Utilities.HasRuntimeFileType("TriPane") && !N && !P.MoveContentToRoot) {
            L = L.ToRelative(P.ContentFolder)
        }
        return L
    };
    this.GetPatchedPath = function(K) {
        if (this.ReplaceReservedCharacters) {
            K = MadCap.Utilities.Url.ReplaceReservedCharacters(K, "_")
        }
        if (this.MakeFileLowerCase) {
            K = K.toLowerCase()
        }
        if (this.UseCustomTopicFileExtension) {
            K = new MadCap.Utilities.Url(K).ToExtension(this.CustomTopicFileExtension).FullPath
        }
        return K
    };
    this.GetAbsoluteTopicPath = function(L) {
        var K = new MadCap.Utilities.Url(L);
        var M = (new MadCap.Utilities.Url(document.location.href)).ToPlainPath();
        return M.CombinePath(this.GetTopicPath("../" + K.FullPath).FullPath)
    };
    this.ComputeTocPath = function(K, L) {
        if (v) {
            var M = this.GetTocPath(K);
            if (!MadCap.String.IsNullOrEmpty(M)) {
                L.tocPath = L.tocPath ? M + "|" + L.tocPath : M
            }
            v.ComputeTocPath(K, L)
        }
    };
    this.GetHelpSystem = function(L) {
        var M = null;
        for (var K = 0; K < B.length; K++) {
            M = B[K].GetHelpSystem(L);
            if (M != null) {
                return M
            }
        }
        if (MadCap.String.StartsWith(L, D, false)) {
            return this
        }
        return null
    };
    this.GetSubsystem = function(K) {
        return B[K]
    };
    this.GetMergedAliasIDs = function(K) {
        G.Load(function() {
            function Q(S) {
                for (var R = 0, T = S.length; R < T; R++) {
                    P[P.length] = S[R]
                }
                N++;
                if (N == O + 1) {
                    K(P)
                }
            }
            var P = new Array();
            var O = B.length;
            var N = 0;
            var M = G.GetIDs();
            Q(M);
            for (var L = 0; L < O; L++) {
                B[L].GetMergedAliasIDs(Q)
            }
        })
    };
    this.GetMergedAliasNames = function(K) {
        G.Load(function() {
            function P(S) {
                for (var R = 0, T = S.length; R < T; R++) {
                    L[L.length] = S[R]
                }
                N++;
                if (N == O + 1) {
                    K(L)
                }
            }
            var L = new Array();
            var O = B.length;
            var N = 0;
            var Q = G.GetNames();
            P(Q);
            for (var M = 0, O = B.length; M < O; M++) {
                B[M].GetMergedAliasNames(P)
            }
        })
    };
    this.LookupCSHID = function(L, K) {
        G.Load(function() {
            function M(S) {
                if (R) {
                    return
                }
                O++;
                if (S.Found) {
                    R = true;
                    K(S);
                    return
                }
                if (O == P) {
                    K(Q)
                }
            }
            var Q = G.LookupID(L);
            if (Q.Found) {
                Q.Topic = h.GetPath() + Q.Topic;
                K(Q);
                return
            }
            if (B.length == 0) {
                K(Q);
                return
            }
            var R = false;
            var O = 0;
            for (var N = 0, P = B.length; N < P; N++) {
                B[N].LookupCSHID(L, M)
            }
        })
    };
    this.GetTocFile = function() {
        return f
    };
    this.GetBrowseSequenceFile = function() {
        return E
    };
    this.IsMerged = function() {
        return (B.length > 0)
    };
    this.IsRoot = function() {
        return v == null
    };
    this.IsTabletLayout = function(L) {
        if (this.IsResponsive && this.Breakpoints) {
            var K = this.Breakpoints.mediums.Tablet;
            var M = this.Breakpoints.prop;
            if (M == "max-width") {
                if (!L) {
                    L = window.innerWidth
                }
                return L <= K
            } else {
                return window.matchMedia("(" + M + ": " + K + "px)").matches
            }
        }
        return false
    };
    this.LoadLanguage = function(M, K) {
        var L = this;
        require([this.LanguageUrl], function(N) {
            L.Language = N;
            M.call(K, N)
        })
    };
    this.LoadBreakpoints = function(M, K) {
        if (this.IsResponsive && this.IsRoot()) {
            var L = this;
            require([this.BreakpointsUrl], function(N) {
                L.Breakpoints = N;
                M.call(K, N)
            })
        } else {
            M.call(K, null)
        }
    };
    this.LoadConcepts = function() {
        var K = $.Deferred();
        require([D + "Data/Concepts.js"], function(L) {
            J = L;
            K.resolve(J)
        });
        return K.promise()
    };
    this.LoadAllConcepts = function(K) {
        function P() {
            M++;
            if (M == N + 1) {
                K()
            }
        }
        var M = 0;
        var N = B.length;
        this.LoadConcepts().then(P);
        for (var L = 0; L < N; L++) {
            var O = B[L];
            if (!O.GetExists()) {
                P();
                continue
            }
            O.LoadAllConcepts(P)
        }
    };
    this.GetConceptsLinks = function(L) {
        var R = $.Deferred();
        var Q = [];
        if (this.IsWebHelpPlus) {
            function K(Z, W) {
                var U = Z.documentElement.getElementsByTagName("Url");
                var T = U.length;
                for (var X = 0; X < T; X++) {
                    var Y = U[X];
                    var aa = Y.getAttribute("Title");
                    var V = Y.getAttribute("Source");
                    V = D + ((V.charAt(0) == "/") ? V.substring(1, V.length) : V);
                    Q[Q.length] = {
                        Title: aa,
                        Link: V
                    }
                }
                R.resolve(Q)
            }
            MadCap.Utilities.Xhr.CallWebService(D + "Service/Service.asmx/GetTopicsForConcepts?Concepts=" + L, true, K)
        } else {
            function O(T) {
                Q = Q.Union(T)
            }
            L = L.replace("\\;", "%%%%%");
            if (L == "") {
                R.resolve(Q)
            } else {
                var N = L.split(";");
                var S = [];
                S.push(this.GetConceptsLinksLocal(N).then(O));
                for (var P = 0; P < B.length; P++) {
                    var M = B[P];
                    if (M.GetExists()) {
                        S.push(M.GetConceptsLinks(L).then(O))
                    }
                }
                $.when.apply(this, S).done(function() {
                    R.resolve(Q)
                })
            }
        }
        return R.promise()
    };
    this.GetConceptsLinksLocal = function(P) {
        var L = [];
        var O = [];
        for (var M = 0; M < P.length; M++) {
            var N = P[M];
            N = N.replace("%%%%%", ";");
            O.push(this.GetConceptLinks(N).then(function(Q) {
                L = L.concat(Q)
            }))
        }
        var K = $.Deferred();
        $.when.apply(this, O).done(function() {
            K.resolve(L)
        });
        return K.promise()
    };
    this.LoadTopicChunk = function(L) {
        var K = $.Deferred();
        MadCap.Utilities.Require([D + "Data/SearchTopic_Chunk" + L + ".js"], function(M) {
            K.resolve(M)
        });
        return K.promise()
    };
    this.GetSearchChunkIds = function(L) {
        var K = $.Deferred();
        MadCap.Utilities.Require([D + "Data/Search.js"], function(O) {
            var M = O.t;
            var P = [];
            for (var N = 0; N < L.length; N++) {
                P.push(MadCap.Utilities.GetChunkId(M, L[N], function(R, Q) {
                    if (R < Q) {
                        return -1
                    } else {
                        if (R === Q) {
                            return 0
                        } else {
                            return 1
                        }
                    }
                }))
            }
            K.resolve(P)
        });
        return K.promise()
    };
    this.GetConceptLinks = function(M) {
        var L = $.Deferred();
        var K = this;
        this.LoadConcepts().done(function() {
            var N = [];
            var O = J[M];
            if (!O) {
                L.resolve(N)
            } else {
                K.GetSearchChunkIds(O).then(function(S) {
                    var R = [];
                    for (var Q = 0; Q < S.length; Q++) {
                        var P = S[Q];
                        R.push(K.LoadTopicChunk(P).then(function(V) {
                            for (var U = 0; U < O.length; U++) {
                                var T = V[O[U]];
                                if (T) {
                                    T.Url = K.GetTopicPath(T.u);
                                    N.push(T)
                                }
                            }
                        }))
                    }
                    $.when.apply(this, R).done(function() {
                        L.resolve(N)
                    })
                })
            }
        });
        return L.promise()
    };
    this.LoadToc = MadCap.Utilities.Memoize(function(L) {
        var K = $.Deferred();
        var N = L[0];
        var M = L[1];
        this.GetToc(N, M, function(O) {
            K.resolve(O)
        });
        return K.promise()
    });
    this.GetToc = function(O, L, K) {
        var M = this;
        var N = this[O + "Url"];
        if (L) {
            N = I(L)
        }
        require([N], function(T) {
            if (typeof T == "undefined" || (M[O] && T.chunks)) {
                K(T);
                return
            }
            M[O] = T;
            T.type = O;
            T.helpSystem = M;
            T.chunks = [];
            T.entries = [];
            T.nodes = {};
            var Q = new MadCap.Utilities.Url(N).ToFolder();
            for (var W = 0; W < T.numchunks; W++) {
                T.chunks[W] = {
                    path: Q.AddFile(T.prefix + W + ".js").FullPath,
                    loaded: false
                }
            }
            var S = T.tree;
            var X = {};
            T.automerge = T.tree;
            while (S != null) {
                S.toc = T;
                S.childrenLoaded = false;
                T.nodes[S.i] = S;
                if (typeof S.m !== "undefined") {
                    X[S.m] = S
                }
                if (typeof S.a !== "undefined") {
                    T.automerge = S
                }
                if (typeof S.n !== "undefined") {
                    for (var V = 0; V < S.n.length; V++) {
                        S.n[V].parent = S;
                        if (V < S.n.length - 1) {
                            S.n[V].next = S.n[V + 1]
                        }
                        if (V > 0) {
                            S.n[V].previous = S.n[V - 1]
                        }
                    }
                }
                S = r(S)
            }
            var R = [];
            var U = false;
            for (var V = 0; V < B.length; V++) {
                var P = B[V];
                if (P.GetExists()) {
                    if (!P.IsAutoMerged) {
                        P.MergeNode = X[V]
                    } else {
                        U = true
                    }
                    if (P.IsAutoMerged || typeof P.MergeNode !== "undefined") {
                        R.push(P)
                    }
                } else {
                    x(X[V])
                }
            }
            if (!U && T.automerge.a == "replace") {
                x(T.automerge)
            }
            if (R.length == 0) {
                K(T);
                return
            }
            MadCap.Utilities.AsyncForeach(R, function(Y, Z) {
                y(T, Y, Z)
            }, function() {
                K(T)
            })
        })
    };

    function x(O) {
        var M = O.parent;
        var N = O.previous;
        var L = O.next;
        if (N) {
            N.next = L;
            O.previous = null
        }
        if (L) {
            L.previous = N;
            O.next = null
        }
        if (M) {
            var K = O.parent.n.indexOf(O);
            M.n.splice(K, 1);
            O.parent = null
        }
    }

    function r(L) {
        var K = null;
        if (typeof L.n != "undefined") {
            K = L.n[0]
        } else {
            if (typeof L.next != "undefined") {
                K = L.next
            } else {
                K = L;
                while (typeof K.parent != "undefined") {
                    if (typeof K.parent.next != "undefined") {
                        K = K.parent.next;
                        break
                    } else {
                        K = K.parent
                    }
                }
                if (typeof K.parent == "undefined") {
                    K = null
                }
            }
        }
        return K
    }

    function q(L) {
        var K = null;
        if (typeof L.previous != "undefined") {
            K = L.previous;
            while (typeof K.n !== "undefined" && K.n.length > 0) {
                K = K.n[K.n.length - 1]
            }
        } else {
            if (typeof L.parent != "undefined") {
                K = L.parent
            }
        }
        return K
    }

    function H(R, Q) {
        var O = "";
        var N = -1;
        var M = null;
        if (R.n && R.n.length > 0) {
            O = R.toc.entries[R.i].title;
            if (Q) {
                O = encodeURIComponent(O)
            }
            N = 0
        } else {
            N = R.parent.n.indexOf(R) + 1
        }
        if (O.length > 0) {
            O += "|"
        }
        O += ("_____" + N);
        for (var K = R.parent; K && typeof K.i !== "undefined"; K = K.parent) {
            if (O == null) {
                O = ""
            }
            if (O.length > 0) {
                O = "|" + O
            }
            var P = K.toc.entries[K.i];
            if (P) {
                var L = P.title;
                if (Q) {
                    L = encodeURIComponent(L)
                }
                O = L + O
            }
        }
        return O
    }

    function y(L, M, K) {
        M.GetToc(L.type, null, function(Q) {
            if (typeof Q == "undefined") {
                K();
                return
            }
            var P = M.IsAutoMerged ? L.automerge : M.MergeNode;
            var X = Q.tree;
            if (X.n !== undefined && P !== undefined) {
                var O = P.r == 1 || (M.IsAutoMerged && P.a == "replace");
                var V = O || (M.IsAutoMerged && (P.a == "before-head" || P.a == "after-head"));
                var R = O || (M.IsAutoMerged && (P.a == "before-head" || P.a == "after-tail"));
                var W = R ? P.parent : P;
                if (typeof W.n == "undefined") {
                    W.n = []
                }
                var S = R ? W.n.indexOf(P) + (V ? 0 : 1) : V ? 0 : W.n.length;
                var N = X.n.length;
                for (var T = 0; T < N; T++) {
                    X.n[T].parent = W;
                    W.n.splice(S + T, 0, X.n[T])
                }
                if (O) {
                    W.n.splice(S + N, 1)
                }
                if (S > 0) {
                    W.n[S].previous = W.n[S - 1];
                    W.n[S - 1].next = W.n[S]
                }
                var U = S + N - (O ? 1 : 0) - 1;
                if (U >= 0 && U + 1 < W.n.length) {
                    W.n[U].next = W.n[U + 1];
                    W.n[U + 1].previous = W.n[U]
                }
                if (M.IsAutoMerged) {
                    L.automerge = W.n[S + N - 1];
                    L.automerge.a = "after-tail"
                }
            }
            K()
        })
    }
    this.LoadTocChunk = function(M, L) {
        var K = $.Deferred();
        require([M.chunks[L].path], function(N) {
            if (!M.chunks[L].loaded) {
                for (var P in N) {
                    for (var O = 0; O < N[P].i.length; O++) {
                        M.entries[N[P].i[O]] = {
                            link: P,
                            title: N[P].t[O],
                            bookmark: N[P].b[O]
                        }
                    }
                }
                M.chunks[L].loaded = true
            }
            return K.resolve(N)
        });
        return K.promise()
    };
    this.GetTocEntryHref = function(aa, S, W, R) {
        var M = null;
        var Q = aa.toc;
        var V = Q.entries[aa.i];
        if (V) {
            var Z = V.link + V.bookmark;
            if (typeof aa.m == "undefined" && Z != "___") {
                var L = null;
                var U = new MadCap.Utilities.Url(Z);
                var K = Q.helpSystem;
                var T = K.GetPath();
                var Y = K.GetMasterHelpsystem().GetContentPath();
                var P = typeof aa.f != "undefined";
                if (!U.IsAbsolute) {
                    if (!MadCap.String.IsNullOrEmpty(T)) {
                        U = new MadCap.Utilities.Url(T).CombinePath(Z);
                        L = U.ToRelative(Y)
                    } else {
                        U = U.ToRelative("/" + Y);
                        L = U
                    }
                } else {
                    L = U
                }
                if (P || !W) {
                    if (L.IsAbsolute) {
                        M = L.FullPath
                    } else {
                        M = Y + L.FullPath
                    }
                } else {
                    if (MadCap.Utilities.HasRuntimeFileType("TriPane")) {
                        M = "#" + L.FullPath
                    } else {
                        M = U.FullPath
                    }
                }
            }
        }
        if (M != null && S && R) {
            var O = window.name == "topic" && !MadCap.Utilities.HasRuntimeFileType("Default");
            var X = H(aa, true);
            if (MadCap.Utilities.HasRuntimeFileType("TriPane")) {
                M += encodeURIComponent("?" + S + "Path=" + X)
            } else {
                var N = new MadCap.Utilities.Url(M);
                if (O) {
                    M = N.PlainPath + encodeURIComponent("?" + S + "Path=" + X) + N.Fragment
                } else {
                    M = N.PlainPath + "?" + (S + "Path=" + X) + N.Fragment
                }
            }
        }
        return M
    };
    this.GetTocData = function(K) {
        var O = null,
            R = null,
            N = null;
        var S = MadCap.Utilities.HasRuntimeFileType("TriPane");
        if (S && !MadCap.String.IsNullOrEmpty(K.Fragment) && K.Fragment.length > 1 || !S) {
            var P = (S && !(K.QueryMap.GetItem("TocPath") || K.QueryMap.GetItem("BrowseSequencesPath")) && !MadCap.String.IsNullOrEmpty(K.Fragment)) ? new MadCap.Utilities.Url(K.Fragment) : K;
            R = P.QueryMap.GetItem("TocPath");
            if (R != null) {
                O = "Toc"
            } else {
                N = P.QueryMap.GetItem("BrowseSequencesPath");
                if (N != null) {
                    O = "BrowseSequences"
                }
            }
            if (K.HashMap.GetItem("cshid") == null) {
                var M = K.Query.indexOf("?");
                var L = K.Query.lastIndexOf("?");
                var Q = "";
                if (M != L) {
                    Q = K.Query.substr(M, L)
                }
                if (S) {
                    K = new MadCap.Utilities.Url(K.Fragment.substr(1))
                }
                if (!MadCap.String.IsNullOrEmpty(Q)) {
                    K.Query = Q
                }
            }
        } else {
            K = new MadCap.Utilities.Url(this.DefaultStartTopic).ToRelative(this.GetContentPath())
        }
        return {
            TocType: O,
            TocPath: R,
            BrowseSequencesPath: N,
            Href: K
        }
    };
    this.FindTocNode = function(N, L, M, K) {
        h.FindNode("Toc", N, L, M, K)
    };
    this.FindBrowseSequenceNode = function(M, K, L) {
        h.FindNode("BrowseSequences", M, K, L)
    };
    this.FindNode = function(L, N, M, O, K) {
        h.LoadToc([L, K]).then(function(U) {
            var Q = new MadCap.Utilities.Url(h.GetMasterHelpsystem().GetContentPath());
            var R = M;
            var T = 0;
            var P;
            if (!M.IsAbsolute) {
                var R = !MadCap.String.IsNullOrEmpty(Q.FullPath) ? Q.CombinePath(M) : M;
                R = R.ToRelative(h.GetPath());
                R = new MadCap.Utilities.Url("/" + R.FullPath)
            }
            for (var S = 1; S < U.chunkstart.length; S++) {
                if (U.chunkstart[S] <= decodeURIComponent(R.PlainPath)) {
                    T++
                }
            }
            h.LoadTocChunk(U, T).then(function(V) {
                var Y = V[decodeURIComponent(R.PlainPath)];
                if (typeof Y !== "undefined") {
                    var X = [];
                    if (!P) {
                        P = U.nodes[Y.i[0]]
                    }
                    if (N) {
                        for (var W = 0; W < Y.i.length; W++) {
                            if (H(U.nodes[Y.i[W]], false) == N) {
                                X.push(Y.i[W])
                            }
                        }
                    } else {
                        for (var W = 0; W < Y.i.length; W++) {
                            if (Y.b[W].toLowerCase() == decodeURIComponent(R.Fragment).toLowerCase()) {
                                X.push(Y.i[W])
                            }
                        }
                    }
                    if (X.length) {
                        O(U.nodes[X.pop()]);
                        return
                    }
                }
                if (B.length > 0) {
                    MadCap.Utilities.AsyncForeach(B, function(Z, aa) {
                        Z.FindNode(L, N, M, function(ab) {
                            if (typeof ab !== "undefined") {
                                O(ab);
                                return
                            }
                            aa()
                        })
                    }, function() {
                        O(P)
                    })
                } else {
                    O(P)
                }
            })
        })
    };
    this.NodeDepth = function(K) {
        var L = 1;
        while (K.parent && K.c !== undefined) {
            L++;
            K = K.parent
        }
        return L
    };
    this.LoadGlossary = function(M, K) {
        if (typeof this.Glossary != "undefined") {
            M.call(K, this.Glossary);
            return
        }
        var L = this;
        this.GetGlossary(function(N) {
            if (N && N.terms) {
                N.termMap = Object.create(null);
                for (var P = 0; P < N.terms.length; P++) {
                    var O = N.terms[P];
                    N.termMap[O.t.toLowerCase()] = O
                }
            }
            L.Glossary = N;
            M.call(K, N)
        })
    };
    this.GetGlossary = function(K) {
        var L = this;
        require([this.GlossaryUrl], function(M) {
            function O() {
                Q++;
                if (Q == R) {
                    K(M)
                }
            }
            if (typeof M == "undefined") {
                K(M);
                return
            }
            var Q = 0;
            var R = 0;
            M.chunks = [];
            var P = new MadCap.Utilities.Url(h.GlossaryUrl).ToFolder();
            for (var T = 0; T < M.numchunks; T++) {
                M.chunks.push({
                    helpSystem: L,
                    path: P.AddFile(M.prefix + T + ".js").FullPath
                })
            }
            for (var N = 0; N < B.length; N++) {
                var S = B[N];
                if (!S.GetExists()) {
                    continue
                }
                R++
            }
            if (R == 0) {
                K(M);
                return
            }
            for (var N = 0; N < B.length; N++) {
                var S = B[N];
                if (!S.GetExists()) {
                    continue
                }
                k(M, S, O)
            }
        })
    };
    this.SearchGlossary = function(M) {
        var L = $.Deferred();
        var K = this;
        this.LoadGlossary(function(N) {
            var Q = false;
            if (N && N.termMap) {
                var P = N.termMap[M.toLowerCase()];
                Q = typeof P != "undefined";
                if (Q) {
                    var O = N.chunks[P.c];
                    require([O.path], function(T) {
                        var S = {
                            term: P.t,
                            definition: T[P.t].d,
                            link: T[P.t].l
                        };
                        if (S.link) {
                            var U = O.helpSystem;
                            var R = (new MadCap.Utilities.Url("../")).CombinePath(S.link).FullPath;
                            S.link = U.GetTopicPath(R).FullPath;
                            U.SearchDB.LoadTopicByUrl(R).done(function(W, V) {
                                if (V) {
                                    S.abstractText = V.a
                                }
                                L.resolve(S)
                            })
                        } else {
                            L.resolve(S)
                        }
                    })
                }
            }
            if (!Q) {
                L.resolve()
            }
        }, this);
        return L.promise()
    };
    this.LoadIndex = function(M, K) {
        if (typeof this.Index !== "undefined") {
            M.call(K, this.Index);
            return
        }
        var L = this;
        this.GetIndex(function(N) {
            L.Index = N;
            M.call(K, N)
        })
    };
    this.GetIndex = function(K) {
        var L = this;
        require([this.IndexUrl], function(N) {
            function M() {
                Q++;
                if (Q == R) {
                    K(N)
                }
            }
            if (typeof N == "undefined") {
                K(N);
                return
            }
            var Q = 0;
            var R = 0;
            N.chunks = [];
            var P = new MadCap.Utilities.Url(h.IndexUrl).ToFolder();
            for (var T = 0; T < N.numchunks; T++) {
                N.chunks.push({
                    helpSystem: L,
                    path: P.AddFile(N.prefix + T + ".js").FullPath
                })
            }
            for (var O = 0; O < B.length; O++) {
                var S = B[O];
                if (!S.GetExists()) {
                    continue
                }
                R++
            }
            if (R == 0) {
                K(N);
                return
            }
            for (var O = 0; O < B.length; O++) {
                var S = B[O];
                if (!S.GetExists()) {
                    continue
                }
                b(N, S, M)
            }
        })
    };
    this.LoadRootIndexEntry = function(K, L) {
        if (K.loaded) {
            if (L) {
                L(K)
            }
            return
        }
        this.LoadIndex(function(M) {
            var N = typeof K.c == "number" ? [K.c] : K.c;
            MadCap.Utilities.AsyncForeach(N, function(Q, P) {
                var O = M.chunks[Q];
                require([O.path], function(S) {
                    var R = S[K.t];
                    h.SetIndexEntryHelpSystem(R, O.helpSystem);
                    h.MergeIndexEntries(K, R);
                    P()
                })
            }, function() {
                h.LoadIndexEntry(K);
                if (L) {
                    L(K)
                }
            })
        })
    };
    this.SetIndexEntryHelpSystem = function(K, L) {
        if (K.l) {
            $.each(K.l, function(M, N) {
                N.helpSystem = L
            })
        }
        if (K.e) {
            $.each(K.e, function(M, N) {
                h.SetIndexEntryHelpSystem(N, L)
            })
        }
    };
    this.LoadIndexEntry = function(L) {
        if (L.l) {
            var K = [];
            $.each(L.l, function(N, M) {
                var O = {
                    Title: M.t,
                    Link: M.helpSystem.GetTopicPath(".." + M.u).FullPath
                };
                K[K.length] = O
            });
            L.linkList = h.SortLinkList(K)
        }
        if (L.e) {
            $.each(L.e, function(M, N) {
                h.LoadIndexEntry(N)
            })
        }
        L.loaded = true
    };
    this.MergeIndexEntries = function(L, K) {
        if (K.l) {
            if (typeof L.l == "undefined") {
                L.l = K.l
            } else {
                L.l = L.l.concat(K.l)
            }
        }
        if (K.r) {
            if (typeof L.r == "undefined") {
                L.r = K.r
            } else {
                if (L.r == "SeeAlso" || K.r == "SeeAlso") {
                    L.r = "SeeAlso"
                }
            }
            if (typeof L.f == "undefined") {
                L.f = K.f
            } else {
                var N = L.f.split(";");
                var M = K.f.split(";");
                $.each(M, function(P, O) {
                    if ($.inArray(N, O)) {
                        N.push(O)
                    }
                });
                N.sort(function(R, P) {
                    var Q = R.toLowerCase();
                    var O = P.toLowerCase();
                    return Q < O ? -1 : Q > O ? 1 : 0
                });
                L.f = N.join("; ")
            }
        }
        if (K.e) {
            if (typeof L.e == "undefined") {
                L.e = {}
            }
            $.each(K.e, function(O, P) {
                if (typeof L.e[O] !== "undefined") {
                    h.MergeIndexEntries(L.e[O], P)
                } else {
                    L.e[O] = P
                }
            })
        }
    };
    this.FindIndexEntry = function(L, K) {
        h.LoadIndex(function(M) {
            if (!M.entries) {
                M.entries = {};
                $.each(M.terms, function(Q, R) {
                    M.entries[R.t] = R
                })
            }
            var O = L.split(":");
            var P = O.length;
            var N = M.entries[O[0]];
            if (N) {
                h.LoadRootIndexEntry(N, function(R) {
                    var S = R;
                    for (var Q = 1; Q < P; Q++) {
                        S = S.e[O[Q]];
                        if (!S) {
                            break
                        }
                    }
                    if (K) {
                        K(R, S)
                    }
                })
            } else {
                if (K) {
                    K()
                }
            }
        })
    };
    this.SortLinkList = function(K) {
        K.sort(function(M, L) {
            var O = M.Title.toLowerCase();
            var N = L.Title.toLowerCase();
            return O < N ? -1 : O > N ? 1 : 0
        });
        return K
    };
    this.GetSearchDBs = function(K) {
        var M = new Array();
        var L = this;
        require([D + "Data/Search.js"], function(R) {
            function O(T) {
                if (T != null) {
                    for (var S = 0; S < T.length; S++) {
                        M[M.length] = T[S]
                    }
                }
                P++;
                if (P == Q) {
                    K(M)
                }
            }
            var P = 0;
            var Q = B.length;
            var N = new MadCap.WebHelp.Search.SearchDB(L);
            L.SearchDB = N;
            M[M.length] = N;
            N.Load(R, function() {
                var S = R.pm;
                if (S || Q == 0) {
                    K(M)
                } else {
                    for (var T = 0; T < Q; T++) {
                        var U = B[T];
                        if (!U.GetExists()) {
                            O(null);
                            continue
                        }
                        U.GetSearchDBs(O)
                    }
                }
            })
        })
    };
    this.GetConcepts = function() {
        return J
    };
    this.GetSearchFilters = function() {
        return g.map
    };
    this.ParseSearchFilterDoc = function(Q) {
        filterMap = Object.create(null);
        if (Q != null) {
            var P = Q.getElementsByTagName("SearchFilter");
            for (var M = 0; M < P.length; M++) {
                var N = P[M];
                var L = N.getAttribute("Name");
                var K = N.getAttribute("Order");
                var O = N.getAttribute("Concepts");
                if (!O) {
                    continue
                }
                filterMap[L] = {
                    c: O,
                    o: K,
                    group: 0
                }
            }
        }
        return filterMap
    };
    this.LoadSearchFiltersLocal = function() {
        var K = $.Deferred();
        require([this.SearchFilterSetUrl], function(M) {
            var L = null;
            if (M) {
                L = {
                    map: M,
                    count: 1
                }
            }
            K.resolve(L)
        });
        return K.promise()
    };
    this.LoadSearchFilters = function() {
        var M = $.Deferred();
        if (!this.IsWebHelpPlus) {
            function L(W) {
                if (W) {
                    if (!K) {
                        K = W;
                        for (var T in W.map) {
                            W.map[T].group = 0
                        }
                    } else {
                        for (var T in W.map) {
                            if (!K.map[T]) {
                                K.map[T] = W.map[T];
                                K.map[T].group += K.count
                            } else {
                                var V = K.map[T];
                                var U = W.map[T];
                                var S = V.c.split(";");
                                var R = U.c.split(";");
                                V.c = S.Union(R).join(";");
                                if (MadCap.String.IsNullOrEmpty(V.cm)) {
                                    V.cm = U.cm
                                }
                            }
                        }
                        K.count += W.count
                    }
                }
            }
            var K;
            var P = [];
            P.push(this.LoadSearchFiltersLocal().then(L));
            for (var O = 0; O < B.length; O++) {
                var Q = B[O];
                if (Q.GetExists()) {
                    P.push(Q.LoadSearchFilters().then(L))
                }
            }
            $.when.apply(this, P).done(function() {
                g = K;
                M.resolve(K)
            })
        } else {
            var N = this;
            MadCap.Utilities.Xhr.CallWebService(D + "Service/Service.asmx/GetSearchFilters", true, function(S, R) {
                var T = N.ParseSearchFilterDoc(S);
                M.resolve({
                    map: T
                })
            })
        }
        return M.promise()
    };
    this.AdvanceTopic = function(K, P, O, Q, L, M) {
        var N = null;
        h.FindNode(K, O, L, function(S) {
            if (S) {
                function R(U, T) {
                    U = T == "next" ? r(U) : q(U);
                    if (U && typeof U.i !== "undefined") {
                        h.LoadTocChunk(U.toc, U.c).then(function(V) {
                            var X = U.toc.entries[U.i];
                            var W = h.GetTocEntryHref(U, K, true, Q);
                            if (W) {
                                if (MadCap.String.StartsWith(W, "#")) {
                                    W = W.substring(1)
                                }
                                M(W)
                            } else {
                                R(U, T)
                            }
                        })
                    }
                }
                R(S, P)
            }
        })
    };
    this.SetBrowseSequencePath = function(L, K) {
        var M = $(".current-topic-index-button");
        if (L != null) {
            this.FindBrowseSequenceNode(L, K, function(N) {
                if (N && N.parent) {
                    M.removeClass("disabled");
                    $(".sequence-index").text(N.parent.n.indexOf(N) + 1);
                    $(".sequence-total").text(N.parent.n.length)
                } else {
                    M.addClass("disabled")
                }
            })
        } else {
            M.addClass("disabled")
        }
    };
    this.GetSkins = function() {
        var K = [];
        z.ForEach(function(L, M) {
            K.push(M)
        });
        return K
    };

    function c(M, K) {
        var L = M.documentElement.getAttribute(K);
        return I(L)
    }

    function I(L) {
        if (L == null) {
            return null
        }
        var K = new MadCap.Utilities.Url(D);
        if (!K.IsAbsolute) {
            return D + L
        }
        return K.AddFile(L).ToRelative(document.location.href).FullPath
    }

    function l(Z) {
        var aa = $("CatapultSkin", Z.documentElement);
        for (var V = 0, R = aa.length; V < R; V++) {
            var W = aa[V];
            var S = $(W);
            var P = S.attr("SkinID");
            var Y = {};
            for (var U = 0, O = W.attributes.length; U < O; U++) {
                var X = W.attributes[U];
                Y[X.name] = X.value
            }
            var Q = S.children();
            for (var U = 0, O = Q.length; U < O; U++) {
                var K = Q[U];
                var M = K.nodeName;
                var N = {};
                Y[M] = N;
                for (var T = 0, L = K.attributes.length; T < L; T++) {
                    var X = K.attributes[T];
                    N[X.name] = X.value
                }
            }
            z.Add(P, Y)
        }
    }

    function u(M, N) {
        if (M.nodeName.toLowerCase() == "madcap:glossarychunkref") {
            var P = $(M);
            var K = P.attr("src");
            if (!MadCap.String.IsNullOrEmpty(K)) {
                var L = new MadCap.Utilities.Url(N).CombinePath("../../Data/").CombinePath(K);
                P.attr("src", "../" + L.FullPath)
            }
        } else {
            var O = M.getElementsByTagName("a")[0];
            var K = $(O).attr("href");
            if (!MadCap.String.IsNullOrEmpty(K)) {
                var L = new MadCap.Utilities.Url(N).CombinePath("../../Content/").CombinePath(K);
                $(O).attr("href", "../" + L.FullPath)
            }
        }
    }

    function F(O) {
        for (var M = 0; M < O.childNodes.length; M++) {
            var K = O.childNodes[M];
            if (K.nodeName == "Entries") {
                for (var L = 0; L < K.childNodes.length; L++) {
                    F(K.childNodes[L])
                }
            } else {
                if (K.nodeName == "Links") {
                    for (var L = 0; L < K.childNodes.length; L++) {
                        if (K.childNodes[L].nodeType == 1) {
                            var N = MadCap.Dom.GetAttribute(K.childNodes[L], "Link");
                            N = D + ((N.charAt(0) == "/") ? N.substring(1, N.length) : N);
                            K.childNodes[L].setAttribute("Link", N)
                        }
                    }
                }
            }
        }
    }

    function t(L, K) {
        if (!K) {
            return
        }
        for (var M = 0; M < K.length; M++) {
            L[L.length] = K[M]
        }
    }

    function k(L, M, K) {
        M.GetGlossary(function(R) {
            if (typeof R == "undefined") {
                K();
                return
            }
            L.chunks = L.chunks.concat(R.chunks);
            for (var Q = 0, O = 0; Q < L.terms.length && O < R.terms.length;) {
                var P = L.terms[Q];
                var N = R.terms[O];
                var U = P.t;
                var S = N.t;
                if (U.toLowerCase() == S.toLowerCase()) {
                    Q++;
                    O++
                } else {
                    if (U.toLowerCase() > S.toLowerCase()) {
                        N.c += L.numchunks;
                        L.terms.splice(Q, 0, N);
                        O++
                    } else {
                        Q++
                    }
                }
            }
            for (; O < R.terms.length; O++) {
                var T = R.terms[O];
                T.c += L.numchunks;
                L.terms.push(T)
            }
            L.numchunks = L.chunks.length;
            K()
        })
    }

    function b(M, L, K) {
        L.GetIndex(function(S) {
            if (typeof S == "undefined") {
                K();
                return
            }
            M.chunks = M.chunks.concat(S.chunks);
            for (var Q = 0, P = 0; Q < M.terms.length && P < S.terms.length;) {
                var U = M.terms[Q];
                var T = S.terms[P];
                var O = U.s || U.t;
                var N = T.s || T.t;
                if (O == N && U.t == T.t) {
                    if (typeof U.c == "number") {
                        U.c = [U.c]
                    }
                    var R = T.c;
                    if (typeof T.c == "number") {
                        R = [T.c]
                    }
                    $.each(R, function(X, W) {
                        U.c.push(W + M.numchunks)
                    });
                    U.$ = (U.$ === 1 && T.$ === 1) ? 1 : 0;
                    Q++;
                    P++
                } else {
                    if (O.toLowerCase() > N.toLowerCase() || (O.toLowerCase() == N.toLowerCase() && U.t.toLowerCase() > T.t.toLowerCase())) {
                        T.c += M.numchunks;
                        M.terms.splice(Q, 0, T);
                        P++
                    } else {
                        Q++
                    }
                }
            }
            for (; P < S.terms.length; P++) {
                var V = S.terms[P];
                V.c += M.numchunks;
                M.terms.push(V)
            }
            M.numchunks = M.chunks.length;
            K()
        })
    }
};
(function() {
    MadCap.WebHelp.HelpSystem.LoadHelpSystem = MadCap.Utilities.Memoize(function(b) {
        var a = $.Deferred();
        var c = new MadCap.WebHelp.HelpSystem(null, null, b, null, null);
        c.Load(function() {
            a.resolve(c)
        });
        return a.promise()
    })
})();
MadCap.WebHelp.TocFile = function(r, l) {
    var b = this;
    var h = r;
    var e = l;
    var c = false;
    var i = null;
    var n = new Array();
    var j = null;
    var o = null;
    var a = new Array();
    (function() {})();
    this.Init = function(t) {
        if (c) {
            if (t != null) {
                t()
            }
            return
        }
        if (t != null) {
            n.push(t)
        }
        var v = null;
        if (l == MadCap.WebHelp.TocFile.TocType.Toc) {
            v = "Toc.xml"
        } else {
            if (l == MadCap.WebHelp.TocFile.TocType.BrowseSequence) {
                v = "BrowseSequences.xml"
            }
        }
        this.LoadToc(h.GetPath() + "Data/" + v, u);

        function u(w) {
            c = true;
            i = w.documentElement;
            g()
        }
    };
    this.LoadToc = function(u, t) {
        if (e == MadCap.WebHelp.TocFile.TocType.Toc && h.IsWebHelpPlus) {
            MadCap.Utilities.Xhr.CallWebService(h.GetPath() + "Service/Service.asmx/GetToc", true, w, null)
        } else {
            if (e == MadCap.WebHelp.TocFile.TocType.BrowseSequence && h.IsWebHelpPlus) {
                MadCap.Utilities.Xhr.CallWebService(h.GetPath() + "Service/Service.asmx/GetBrowseSequences", true, w, null)
            } else {
                var v = (u.indexOf("/") == -1) ? h.GetPath() + "Data/" + u : u;
                MadCap.Utilities.Xhr.Load(v, false, w, null, null)
            }
        }

        function w(y, x) {
            if (!y || !y.documentElement) {
                if (t != null) {
                    t(y)
                }
                return
            }
            if (t != null) {
                t(y)
            }
        }
    };
    this.LoadChunk = function(u, v, t) {
        var w = (v.indexOf("/") == -1) ? h.GetPath() + "Data/" + v : v;
        MadCap.Utilities.Xhr.Load(v, true, x, null, null);

        function x(E, z) {
            if (!E || !E.documentElement) {
                if (t != null) {
                    t(u)
                }
                return
            }
            u.removeAttribute("Chunk");
            var y = E.documentElement;
            for (var B = 0, D = y.childNodes.length; B < D; B++) {
                var A = y.childNodes[B];
                if (A.nodeType != 1) {
                    continue
                }
                var C = null;
                if (typeof(E.importNode) == "function") {
                    C = E.importNode(A, true)
                } else {
                    C = A.cloneNode(true)
                }
                u.appendChild(C)
            }
            if (t != null) {
                t(u)
            }
        }
    };
    this.LoadMerge = function(y, t) {
        var x = MadCap.Dom.GetAttributeInt(y, "MergeHint", -1);
        if (x == -1) {
            t(y, false, null, null);
            return
        }
        y.removeAttribute("MergeHint");
        var A = k(y);
        var u = A.GetSubsystem(x);
        var v = MadCap.Dom.GetAttributeBool(y, "ReplaceMergeNode", false);
        if (!v) {
            y.setAttribute("ownerHelpSystemIndex", a.length)
        }
        a[a.length] = u;
        var z = u.GetPath() + "Data/" + (e == MadCap.WebHelp.TocFile.TocType.Toc ? "Toc.xml" : "BrowseSequences.xml");
        var B = MadCap.Utilities.Xhr.Load(z, true, w);

        function w(N, K) {
            if (!N || !N.documentElement) {
                if (t != null) {
                    t(y, false, null, null)
                }
                return
            }
            var G = N.documentElement;
            var J = null;
            var H = true;
            var D = null;
            var E = null;
            var L = y.ownerDocument;
            for (var I = 0, F = G.childNodes.length; I < F; I++) {
                var C = G.childNodes[I];
                if (C.nodeType != 1) {
                    continue
                }
                var M = null;
                if (typeof(L.importNode) == "function") {
                    M = L.importNode(C, true)
                } else {
                    M = C.cloneNode(true)
                }
                if (v) {
                    M.setAttribute("ownerHelpSystemIndex", a.length - 1);
                    if (H) {
                        H = false;
                        y.parentNode.replaceChild(M, y);
                        D = M;
                        E = D
                    } else {
                        J.parentNode.insertBefore(M, J.nextSibling);
                        E = M
                    }
                    J = M
                } else {
                    y.appendChild(M)
                }
            }
            if (t != null) {
                t(y, v, D, E)
            }
        }
    };
    this.AdvanceTopic = function(x, w, u, v) {
        this.GetTocNode(w, u, t);

        function t(y) {
            if (y == null) {
                v(null);
                return
            }
            var z = null;
            q(x, y, A);

            function A(E) {
                var B = null;
                if (E != null) {
                    B = MadCap.Dom.GetAttribute(E, "Link");
                    B = B.substring("/".length);
                    var H = new MadCap.Utilities.Url(B);
                    var G = null;
                    if (e == MadCap.WebHelp.TocFile.TocType.Toc) {
                        G = "TocPath"
                    } else {
                        if (e == MadCap.WebHelp.TocFile.TocType.BrowseSequence) {
                            G = "BrowseSequencePath"
                        }
                    }
                    var D = m(E, false);
                    var C = H.ToQuery(G + "=" + encodeURIComponent(D));
                    B = C.FullPath;
                    var F = k(E);
                    B = F.GetPath() + B;
                    v(B)
                } else {
                    v(B)
                }
            }
        }
    };
    this.GetRootNode = function(u) {
        this.Init(t);

        function t() {
            u(i)
        }
    };
    this.GetTocNode = function(v, t, x) {
        this.Init(w);

        function w() {
            j = v;
            o = t;
            var F = (v == "") ? new Array(0) : v.split("|");
            var B = -1;
            if (F.length > 0) {
                var z = F[F.length - 1];
                if (MadCap.String.StartsWith(z, "_____")) {
                    B = parseInt(z.substring("_____".length));
                    F.splice(F.length - 1, 1)
                }
            }
            var H = i;
            for (var D = 0, A = F.length; D < A; D++) {
                if (y(H)) {
                    return
                }
                if (u(H)) {
                    return
                }
                H = d(H, decodeURIComponent(F[D]))
            }
            if (H == null) {
                x(null);
                return
            }
            if (y(H)) {
                return
            }
            if (u(H)) {
                return
            }
            if (B >= 0) {
                if (B == 0) {
                    C = H
                } else {
                    C = $(H).children("TocEntry")[B - 1]
                }
            } else {
                var E = k(H);
                var G = t.ToRelative(new MadCap.Utilities.Url(E.GetPath()));
                var C = s(H, G.FullPath.toLowerCase(), true);
                if (!C) {
                    C = s(H, G.PlainPath.toLowerCase(), false)
                }
            }
            j = null;
            o = null;
            x(C)
        }

        function y(z) {
            var A = MadCap.Dom.GetAttribute(z, "Chunk");
            if (A != null) {
                b.LoadChunk(z, A, function(B) {
                    b.GetTocNode(j, o, x)
                });
                return true
            }
            return false
        }

        function u(z) {
            var A = $(z).attr("MergeHint") || -1;
            if (A >= 0) {
                b.LoadMerge(z, function(B) {
                    b.GetTocNode(j, o, x)
                });
                return true
            }
            return false
        }
    };
    this.GetEntrySequenceIndex = function(u, t, w) {
        this.GetTocNode(u, t, v);

        function v(y) {
            var x = -1;
            if (y != null) {
                x = f(y)
            }
            w(x)
        }
    };
    this.GetIndexTotalForEntry = function(u, t, w) {
        this.GetTocNode(u, t, v);

        function v(y) {
            var z = -1;
            if (y != null) {
                var x = y;
                while (x.parentNode != i) {
                    x = x.parentNode
                }
                z = MadCap.Dom.GetAttributeInt(x, "DescendantCount", -1)
            }
            w(z)
        }
    };

    function g() {
        for (var t = 0, u = n.length; t < u; t++) {
            n[t]()
        }
    }

    function d(u, w) {
        var t = null;
        for (var v = 0; v < u.childNodes.length; v++) {
            if (u.childNodes[v].nodeName == "TocEntry" && MadCap.Dom.GetAttribute(u.childNodes[v], "Title") == w) {
                t = u.childNodes[v];
                break
            }
        }
        return t
    }

    function s(v, t, x) {
        var y = null;
        var B = MadCap.Dom.GetAttribute(v, "Link");
        if (B != null) {
            B = B.substring("/".length);
            B = B.replace(/%20/g, " ");
            B = B.toLowerCase()
        }
        if (B == t) {
            y = v
        } else {
            for (var w = 0; w < v.childNodes.length; w++) {
                var z = v.childNodes[w];
                if (z.nodeType != 1) {
                    continue
                }
                var A = MadCap.Dom.GetAttribute(z, "Link");
                if (A == null) {
                    continue
                }
                A = A.substring("/".length);
                A = A.replace(/%20/g, " ");
                A = A.toLowerCase();
                if (!x) {
                    var C = A.indexOf("#");
                    if (C != -1) {
                        A = A.substring(0, C)
                    }
                    var u = A.indexOf("?");
                    if (u != -1) {
                        A = A.substring(0, u)
                    }
                }
                if (A == t) {
                    y = z;
                    break
                }
            }
        }
        return y
    }

    function q(w, t, x) {
        if (w == "previous") {
            v(t)
        } else {
            if (w == "next") {
                z(t)
            }
        }

        function A(F) {
            var B = null;
            if (F != null) {
                var E = MadCap.Dom.GetAttribute(F, "Link");
                if (E == null) {
                    q(w, F, x);
                    return
                }
                var C = new MadCap.Utilities.Url(E);
                var D = C.Extension.toLowerCase();
                var G = h.GetMasterHelpsystem();
                if (G.UseCustomTopicFileExtension) {
                    if (D != G.CustomTopicFileExtension) {
                        q(w, F, x);
                        return
                    }
                } else {
                    if (D != "htm" && D != "html") {
                        q(w, F, x);
                        return
                    }
                }
                B = F
            }
            x(B)
        }

        function v(E) {
            function F(H) {
                var G = p(H, "TocEntry");
                if (G == null) {
                    D = H
                } else {
                    D = G;
                    if (y(G, F)) {
                        return
                    }
                    if (u(G, C)) {
                        return
                    }
                }
                A(D)
            }

            function C(H, I, J, G) {
                if (I) {
                    F(G)
                } else {
                    F(H)
                }
            }
            var D = null;
            for (var B = E.previousSibling; B != null; B = B.previousSibling) {
                if (B.nodeName == "TocEntry") {
                    D = B;
                    break
                }
            }
            if (D != null) {
                if (y(D, F)) {
                    return
                }
                if (u(D, C)) {
                    return
                }
                F(D);
                return
            } else {
                if (E.parentNode.nodeType == 1) {
                    D = E.parentNode
                }
            }
            A(D)
        }

        function z(D) {
            function E(H) {
                var G = $(H).children("TocEntry")[0];
                for (var F = H; F != null && G == null; F = F.parentNode) {
                    G = $(F).next("TocEntry")[0]
                }
                A(G)
            }

            function C(G, H, I, F) {
                if (H) {
                    A(I);
                    return
                }
                E(G)
            }
            var B = null;
            if (y(D, E)) {
                return
            }
            if (u(D, C)) {
                return
            }
            E(D)
        }

        function y(C, B) {
            var D = MadCap.Dom.GetAttribute(C, "Chunk");
            if (D != null) {
                b.LoadChunk(C, D, B);
                return true
            }
            return false
        }

        function u(C, B) {
            var D = $(C).attr("MergeHint") || -1;
            if (D >= 0) {
                b.LoadMerge(C, B);
                return true
            }
            return false
        }
    }

    function p(t, w) {
        var v = $(t).children(w + ":last")[0];
        if (v != null) {
            var u = p(v, w);
            if (u != null) {
                return u
            }
            return v
        }
        return null
    }

    function k(u) {
        var w = null;
        var t = u;
        while (true) {
            if (t == t.ownerDocument.documentElement) {
                w = h;
                break
            }
            var v = MadCap.Dom.GetAttributeInt(t, "ownerHelpSystemIndex", -1);
            if (v >= 0) {
                w = a[v];
                break
            }
            t = t.parentNode
        }
        return w
    }

    function m(u) {
        var x = "";
        var w = -1;
        var v = $(u).children("TocEntry")[0];
        if (v != null) {
            x = encodeURIComponent(MadCap.Dom.GetAttribute(u, "Title"));
            w = 0
        } else {
            w = $(u).index() + 1
        }
        if (x.length > 0) {
            x += "|"
        }
        x += ("_____" + w);
        for (var t = u.parentNode; t != null && t.parentNode.nodeType == 1; t = t.parentNode) {
            if (x == null) {
                x = ""
            }
            if (x.length > 0) {
                x = "|" + x
            }
            x = encodeURIComponent(MadCap.Dom.GetAttribute(t, "Title")) + x
        }
        return x
    }

    function f(w) {
        if (w.parentNode == w.ownerDocument.documentElement) {
            return 0
        }
        var v = 0;
        var z = MadCap.Dom.GetAttribute(w, "Link");
        if (z != null) {
            v++
        }
        for (var t = w.previousSibling; t != null; t = t.previousSibling) {
            if (t.nodeType != 1) {
                continue
            }
            var y = MadCap.Dom.GetAttributeInt(t, "DescendantCount", 0);
            v += y;
            var z = MadCap.Dom.GetAttribute(t, "Link");
            if (z != null) {
                var u = new MadCap.Utilities.Url(z);
                var x = u.Extension.toLowerCase();
                if (x == "htm" || x == "html") {
                    v++
                }
            }
        }
        return v + f(w.parentNode)
    }
};
MadCap.WebHelp.TocFile.TocType = {
    Toc: 0,
    BrowseSequence: 1
};
MadCap.WebHelp.AliasFile = function(h, a, e) {
    var d = null;
    var f = a;
    var i = null;
    var g = null;
    (function() {})();
    this.Load = function(j) {
        MadCap.Utilities.Xhr.Load(h, true, function k(l) {
            if (l) {
                d = l.documentElement
            }
            j(d);
        })
    };
    this.GetIDs = function() {
        var j = new Array();
        c();
        g.ForEach(function(k, l) {
            j[j.length] = k;
            return true
        });
        return j
    };
    this.GetNames = function() {
        var j = new Array();
        c();
        i.ForEach(function(k, l) {
            j[j.length] = k;
            return true
        });
        return j
    };
    this.LookupID = function(o) {
        var l = false;
        var j = null;
        var m = null;
        if (o) {
            if (typeof(o) == "string" && o.indexOf(".") != -1) {
                var k = o.indexOf("|");
                if (k != -1) {
                    j = o.substring(0, k);
                    m = o.substring(k + 1)
                } else {
                    j = o
                }
                l = true
            } else {
                var n = b(o);
                console.log(n);
                if (n != null) {
                    l = true;
                    j = n.Topic;
                    m = n.Skin
                }
            }
        } else {
            l = true
        }

        if (j) {
            j = f.ContentFolder + j
        }

        return {
            Found: l,
            Topic: j,
            Skin: m
        }
    };

    function b(k) {
        var j = null;
        c();
        if (i != null) {
            if (typeof(k) == "string") {
                j = i.GetItem(k);
                if (j == null) {
                    j = g.GetItem(k)
                }
            } else {
                if (typeof(k) == "number") {
                    j = g.GetItem(k.toString())
                }
            }
        }
        return j
    }

    function c() {
        if (i == null) {
            if (d) {
                i = new MadCap.Utilities.Dictionary(true);
                g = new MadCap.Utilities.Dictionary();
                var p = d.getElementsByTagName("Map");
                for (var m = 0; m < p.length; m++) {
                    var k = p[m].getAttribute("Link");
                    var o = p[m].getAttribute("Skin");
                    var l = {
                        Topic: k,
                        Skin: o
                    };
                    var j = p[m].getAttribute("Name");
                    if (j != null) {
                        i.Add(j, l)
                    }
                    var n = p[m].getAttribute("ResolvedId");
                    if (n != null) {
                        g.Add(n, l)
                    }
                }
            }
        }
    }
};
MadCap.WebHelp.IndexEntry = function(g, f) {
    var e = MadCap.Dom.GetChildNodeByTagName(g, "Links", 0).childNodes;
    var d = e.length;
    var b = 0;
    this.Term = MadCap.Dom.GetAttribute(g, "Term");
    this.IndexLinks = new Array();
    this.Level = f;
    this.GeneratedReferenceType = MadCap.Dom.GetAttribute(g, "GeneratedReferenceType");
    for (var c = 0; c < d; c++) {
        var a = e[c];
        if (a.nodeType != 1) {
            continue
        }
        this.IndexLinks[b] = new MadCap.WebHelp.IndexLink(a);
        b++
    }
};
MadCap.WebHelp.IndexLink = function(a) {
    this.Title = MadCap.Dom.GetAttribute(a, "Title");
    this.Link = MadCap.Dom.GetAttribute(a, "Link")
};
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function() {
    MadCap.WebHelp = MadCap.CreateNamespace("WebHelp");
    var b = window.external && window.external.attached && window.external.attached();
    var c = MadCap.Utilities.HasRuntimeFileType("TriPane");
    MadCap.WebHelp.TocPane = function(e, h, g, d) {
        var f = this;
        this._Init = false;
        this._RuntimeFileType = e;
        this._RootUl = g;
        this._CanSync = d;
        this._HelpSystem = h;
        this._TocFile = this._RuntimeFileType == "Toc" ? this._HelpSystem.GetTocFile() : this._HelpSystem.GetBrowseSequenceFile();
        this._LoadedNodes = [];
        this._NodesWithChildrenLoaded = [];
        this._TocType = null;
        this._TocPath = null;
        this._TocHref = null;
        MadCap.Utilities.CrossFrame.AddMessageHandler(this.OnMessage, this);
        this._Initializing = false;
        this._InitOnCompleteFuncs = new Array();
        this.TreeNode_Expand = function(r) {
            var s = r.target;
            var w = f._IsOffCanvasMenu ? $("ul.menu[data-drilldown], ul.menu[data-accordion-menu]") : null;
            var x = $(s).closest("li")[0];
            if (x == null) {
                return
            }
            var u = $(x);
            var n = u.hasClass(f._TreeNodeLeafClass);
            var m = f._LoadedNodes[u.attr("data-mc-id")];
            var v = f._HelpSystem.GetCurrentSkin();
            if (f._IsTopNavMenu && f._HelpSystem.NodeDepth(m) > f._MaxDepth) {
                return
            }
            if (!n) {
                u.toggleClass(f._TreeNodeExpandedClass).toggleClass(f._TreeNodeCollapsedClass)
            }
            var j = u.find("> div img");
            var t = j.attr("data-mc-alt2");
            var q = j.attr("alt");
            if (t != "") {
                j.attr("alt", t);
                j.attr("data-mc-alt2", q)
            }
            if (f._IncludeIndicator) {
                var y = u.find("> div a");
                if (y[0] != null) {
                    var i = y.attr("href");
                    if (!MadCap.String.IsNullOrEmpty(i)) {
                        f._SelectNode(x)
                    }
                    if (y[0] != s) {
                        var p = y.attr("target");
                        if (!MadCap.String.IsNullOrEmpty(i)) {
                            if (p != null) {
                                window.open(i, p)
                            } else {
                                document.location.href = i
                            }
                        }
                    }
                }
            }
            if (typeof m.n == "undefined" || m.n.length == 0) {
                m.childrenLoaded = true;
                f._NodesWithChildrenLoaded.push(m)
            }
            if (f._NodesWithChildrenLoaded.indexOf(m) === -1) {
                var l = $("a", u).first();
                var o = $("<ul/>");
                var k = $(f._RootUl).attr("data-mc-css-sub-menu") || "tree inner";
                o.addClass(k);
                if (b) {
                    o.attr("data-mc-style", "Navigation Panel Item")
                }
                if (f._IsOffCanvasMenu && v.WebHelpOptions && v.WebHelpOptions.OffCanvasMenuStyle == "Accordion") {
                    o.css("display", "none")
                }
                f.LoadTocChildren(m, o, function() {
                    u.append(o);
                    if (f._DeferExpandEvent) {
                        setTimeout(function() {
                            if (v.WebHelpOptions && v.WebHelpOptions.OffCanvasMenuStyle == "Accordion") {
                                Foundation.Nest.Feather(u.children(".is-accordion-submenu"), "accordion");
                                w.foundation("down", u.children(".is-accordion-submenu"))
                            } else {
                                Foundation.Nest.Feather(w, "drilldown");
                                w.foundation("_show", u)
                            }
                        }, 100)
                    }
                });
                if (f._DeferExpandEvent) {
                    r.stopImmediatePropagation();
                    return false
                }
            }
            if (n) {
                if (!c) {
                    MadCap.Utilities.Url.OnNavigateTopic.call(s, r)
                }
            } else {
                if (f._IsOffCanvasMenu && v.WebHelpOptions) {
                    if (v.WebHelpOptions.OffCanvasMenuStyle && v.WebHelpOptions.OffCanvasMenuStyle == "Accordion") {
                        w.foundation("toggle", u.children(".is-accordion-submenu"))
                    } else {
                        w.foundation("_show", u)
                    }
                    return false
                } else {
                    return true
                }
            }
        };
        this.TopNavigationMenuItem_MouseEnter = function(l) {
            var o = $(l.currentTarget).closest("li");
            var n = o.children("ul").first();
            if (n.length) {
                var k = n.width();
                var j = $("html").attr("dir") == "rtl";
                var m = j ? o.offset().left : $(window).width() - o.offset().left - o.width();
                var i = j ? "openRight" : "openLeft";
                n.toggleClass(i, k > m)
            }
        }
    };
    var a = MadCap.WebHelp.TocPane;
    a.prototype.OnMessage = function(j, g, i) {
        var h = {
            Handled: false,
            FireResponse: true
        };
        if (j == "sync-toc") {
            var d = g[0];
            var f = g[1];
            var e = new MadCap.Utilities.Url(g[2]);
            if (this._CanSync && (d == null || d == this._RuntimeFileType)) {
                this.SyncTOC(f, e);
                h.Handled = true
            }
        }
        return h
    };
    a.prototype.Init = function(d) {
        if (this._Init) {
            if (d != null) {
                d()
            }
            return
        }
        if (d != null) {
            this._InitOnCompleteFuncs.push(d)
        }
        if (this._Initializing) {
            return
        }
        this._Initializing = true;
        var f = $(this._RootUl);
        this._IsOffCanvasMenu = f.hasClass("off-canvas-list");
        this._IsTopNavMenu = MadCap.Dom.GetAttributeBool(this._RootUl, "data-mc-top-nav-menu", false);
        this._IsSideMenu = MadCap.Dom.GetAttributeBool(this._RootUl, "data-mc-side-menu", false);
        if (this._IsTopNavMenu) {
            this._TreeNodeHasChildrenClass = f.attr("data-mc-css-tree-node-has-children") || "has-children"
        } else {
            this._TreeNodeClass = f.attr("data-mc-css-tree-node") || "tree-node";
            this._TreeNodeCollapsedClass = f.attr("data-mc-css-tree-node-collapsed") || "tree-node-collapsed";
            this._TreeNodeExpandedClass = f.attr("data-mc-css-tree-node-expanded") || "tree-node-expanded";
            this._TreeNodeLeafClass = f.attr("data-mc-css-tree-node-leaf") || "tree-node-leaf";
            this._TreeNodeSelectedClass = f.attr("data-mc-css-tree-node-leaf") || "tree-node-selected"
        }
        this._SubMenuClass = f.attr("data-mc-css-sub-menu") || "tree inner";
        this._IncludeBack = MadCap.Dom.GetAttributeBool(this._RootUl, "data-mc-include-back", false);
        this._IncludeParentLink = MadCap.Dom.GetAttributeBool(this._RootUl, "data-mc-include-parent-link", false);
        this._IncludeIcon = MadCap.Dom.GetAttributeBool(this._RootUl, "data-mc-include-icon", true);
        this._IncludeIndicator = MadCap.Dom.GetAttributeBool(this._RootUl, "data-mc-include-indicator", true);
        this._DeferExpandEvent = MadCap.Dom.GetAttributeBool(this._RootUl, "data-mc-defer-expand-event", false);
        this._ExpandEvent = f.attr("data-mc-expand-event") || (this._IsSideMenu ? null : "click");
        this._BackLink = f.attr("data-mc-back-link") || "Back";
        this._MaxDepth = parseInt(f.attr("data-mc-max-depth")) || 1;
        this._IncludeParent = MadCap.Dom.GetAttributeBool(this._RootUl, "data-mc-include-parent", false);
        this._IncludeSiblings = MadCap.Dom.GetAttributeBool(this._RootUl, "data-mc-include-siblings", false);
        this._IncludeChildren = MadCap.Dom.GetAttributeBool(this._RootUl, "data-mc-include-children", false);
        this._IsContextSensitive = MadCap.Dom.GetAttributeBool(this._RootUl, "data-mc-is-context-sensitive", false);
        this._LinkedToc = f.attr("data-mc-linked-toc");
        var e = this;
        f.attr("data-mc-chunk", "Data/" + this._RuntimeFileType + ".xml");
        this.CreateToc(this._RootUl, function() {
            e._Init = true;
            for (var g = 0; g < e._InitOnCompleteFuncs.length; g++) {
                e._InitOnCompleteFuncs[g]()
            }
        })
    };
    a.prototype.CreateToc = function(f, d) {
        var g = true;
        if (this._RuntimeFileType == "Toc") {
            g = this._HelpSystem.HasToc
        } else {
            g = this._HelpSystem.HasBrowseSequences
        }
        if (!g) {
            if (d != null) {
                d()
            }
            return
        }
        var e = this;
        e._HelpSystem.LoadToc([this._RuntimeFileType, this._LinkedToc]).then(function(l) {
            var h = $(f);
            var k = [];
            for (var j = 0; j < l.chunks.length; j++) {
                if (!l.chunks[j].loaded) {
                    k.push(e._HelpSystem.LoadTocChunk(l, j))
                }
            }
            if (b) {
                h.attr("data-mc-style", "Navigation Panel Item")
            }
            $.when.apply(this, k).done(function() {
                if (e._IsTopNavMenu || e._IsOffCanvasMenu || c) {
                    e.LoadTocChildren(l.tree, h, function() {
                        h.children("li.placeholder").remove();
                        this._Init = true;
                        if (d != null) {
                            d()
                        }
                    })
                } else {
                    if (e._TocType) {
                        e._HelpSystem.FindNode(e._TocType, e._TocPath, e._TocHref, function(i) {
                            e.TocNodeMenuCallback(i, h, l)
                        }, e._LinkedToc)
                    } else {
                        e._HelpSystem.FindTocNode(null, e._TocHref, function(i) {
                            e.TocNodeMenuCallback(i, h, l)
                        }, e._LinkedToc)
                    }
                }
            })
        })
    };
    a.prototype.TocNodeMenuCallback = function(e, d, f) {
        if (this._IsContextSensitive) {
            if (e) {
                this.LoadTocMenu(e, d, this._MaxDepth)
            } else {
                $(d).remove()
            }
        } else {
            this.LoadTocMenuFromRoot(f.tree, e, d, this._MaxDepth)
        }
    };
    a.prototype.LoadTocChildren = function(j, g, e) {
        var f = typeof j.n !== "undefined" ? j.n.length : 0;
        var l = 0;
        var n = this;
        if (f == 0) {
            j.childrenLoaded = true;
            this._NodesWithChildrenLoaded.push(j)
        }
        if (this._NodesWithChildrenLoaded.indexOf(j) !== -1) {
            if (e) {
                e()
            }
            return
        }
        if (j.parent) {
            if (this._IncludeBack) {
                var m = $('<li class="js-drilldown-back"/>');
                m.addClass(this._TreeNodeClass);
                var h = $('<a href="#" />');
                h.text(this._BackLink);
                h.on(this._ExpandEvent, function(q) {
                    var p = q.target;
                    var o = m.parent("ul");
                    var i = $("ul.menu[data-drilldown]");
                    i.foundation("_back", o);
                    q.preventDefault()
                });
                m.append(h);
                g.append(m)
            }
            if (this._IncludeParentLink && this._HelpSystem.GetTocEntryHref(j) != null) {
                var m = $("<li/>");
                m.addClass(this._TreeNodeClass);
                m.addClass(this._TreeNodeLeafClass);
                g.append(m);
                this.LoadTocNode(j, m, null)
            }
        }
        for (var k = 0; k < f; k++) {
            var d = j.n[k];
            var m = $("<li/>");
            m.addClass(this._TreeNodeClass);
            m.addClass(this._TreeNodeCollapsedClass);
            if (this._IsTopNavMenu && g.hasClass(this._SubMenuClass)) {
                m.mouseenter(this.TopNavigationMenuItem_MouseEnter)
            }
            g.append(m);
            this.LoadTocNode(d, m, function() {
                l++;
                if (l == f) {
                    j.childrenLoaded = true;
                    n._NodesWithChildrenLoaded.push(j);
                    if (e != null) {
                        e()
                    }
                }
            })
        }
    };
    a.prototype.LoadTocMenuFromRoot = function(f, d, j, k) {
        if (f.n && k != 0) {
            k--;
            for (var h = 0; h < f.n.length; h++) {
                var g = f.n[h];
                var l = $("<li/>");
                j.append(l);
                var e = this;
                this.LoadTocNode(g, l, function(i) {
                    var n = i.el;
                    if (i == d) {
                        e.SetTocMenuItemSelected(n)
                    }
                    if (i.n) {
                        var m = $("<ul/>");
                        m.attr("class", "sub-menu");
                        n.append(m);
                        n.attr("class", "has-children");
                        e.LoadTocMenuFromRoot(i, d, m, k)
                    }
                })
            }
        }
    };
    a.prototype.LoadTocMenu = function(f, e, g) {
        if (this._IncludeParent && f.parent.c !== undefined) {
            var h = $("<li/>");
            e.append(h);
            var d = this;
            this.LoadTocNode(f.parent, h, function() {
                var i = $("<ul/>");
                h.append(i);
                h.attr("class", "has-children");
                i.attr("class", "sub-menu");
                if (d._IncludeSiblings) {
                    d.LoadTocMenuSiblings(f, i, g)
                } else {
                    d.LoadTocSelectedMenu(f, i, g)
                }
            })
        } else {
            if (this._IncludeSiblings) {
                this.LoadTocMenuSiblings(f, e, g)
            } else {
                this.LoadTocSelectedMenu(f, e, g)
            }
        }
    };
    a.prototype.LoadTocSelectedMenu = function(f, e, g) {
        var h = $("<li/>");
        e.append(h);
        var d = this;
        this.LoadTocNode(f, h, function() {
            d.SetTocMenuItemSelected(h);
            d.AddTocMenuChildren(f, h, g)
        })
    };
    a.prototype.LoadTocMenuSiblings = function(h, g, j) {
        for (var f = 0; f < h.parent.n.length; f++) {
            var e = h.parent.n[f];
            var k = $("<li/>");
            g.append(k);
            var d = this;
            this.LoadTocNode(e, k, function(i) {
                if (i == h) {
                    var l = h.el;
                    d.SetTocMenuItemSelected(l);
                    d.AddTocMenuChildren(h, l, j)
                }
            })
        }
    };
    a.prototype.SetTocMenuItemSelected = function(d) {
        var e = $(d).find("a");
        e.addClass("selected")
    };
    a.prototype.AddTocMenuChildren = function(f, e, g) {
        if (this._IncludeChildren && f.n) {
            g--;
            var d = $("<ul/>");
            e.append(d);
            e.attr("class", "has-children");
            this.LoadTocMenuChildren(f, d, g);
            d.attr("class", "sub-menu")
        }
    };
    a.prototype.LoadTocMenuChildren = function(h, g, j) {
        for (var f = 0; f < h.n.length; f++) {
            var e = h.n[f];
            var k = $("<li/>");
            g.append(k);
            var d = this;
            this.LoadTocNode(e, k, function(i) {
                if (j != 0) {
                    var l = i.el;
                    d.AddTocMenuChildren(i, l, j)
                }
            })
        }
    };
    a.prototype.LoadTocNode = function(g, f, d) {
        var e = this;
        var h = g.toc;
        this._HelpSystem.LoadTocChunk(h, g.c).then(function(t) {
            var u = h.entries[g.i];
            var m = typeof g.f != "undefined";
            var k = typeof g.n == "undefined" || g.n.length == 0;
            var q = g.n !== undefined && g.n.length > 0;
            var p = e._CanSync && !m ? e._RuntimeFileType : null;
            var n = e._HelpSystem.TopNavTocPath || c;
            var j = e._HelpSystem.GetTocEntryHref(g, p, e._CanSync, n);
            var l = $("<a/>");
            if (m) {
                l.attr("target", g.f)
            }
            if (j != null) {
                l.attr("href", j)
            } else {
                l.attr("href", "javascript:void(0);")
            }
            l.text(u.title);
            if (typeof g.s != "undefined") {
                f.addClass(g.s)
            }
            if (k) {
                f.removeClass(e._TreeNodeCollapsedClass);
                f.addClass(e._TreeNodeLeafClass)
            }
            if (q && (e._IsTopNavMenu && e._HelpSystem.NodeDepth(g) <= e._MaxDepth)) {
                f.addClass(e._TreeNodeHasChildrenClass)
            }
            if (e._IncludeIcon) {
                var v = "default";
                var o = e._HelpSystem.Language;
                for (className in o) {
                    if (f.hasClass(className)) {
                        v = className;
                        break
                    }
                }
                var i = $("<img/>");
                i.attr("src", "Skins/Default/Stylesheets/Images/transparent.gif");
                i.addClass("toc-icon");
                if (e._IncludeIndicator && typeof g.w !== "undefined" && g.w == 1) {
                    i.attr("alt", o[v]["MarkAsNewIconAlternateText"])
                } else {
                    if (f.hasClass(e._TreeNodeLeafClass)) {
                        i.attr("alt", o[v]["TopicIconAlternateText"])
                    } else {
                        i.attr("alt", o[v]["ClosedBookIconAlternateText"]);
                        i.attr("data-mc-alt2", o[v]["OpenBookIconAlternateText"])
                    }
                }
                if (i.prop("src") != "") {
                    l.prepend(i)
                }
            }
            if (e._IncludeIndicator) {
                var s = $("<div/>");
                if (typeof g.w !== "undefined" && g.w == 1) {
                    s.append("<span class='new-indicator'></span>")
                }
                var r = $('<span class="label" />');
                r.append(l);
                s.append(r);
                l = s
            }
            if (!e._IsContextSensitive) {
                l.on(e._ExpandEvent, e.TreeNode_Expand)
            }
            g.el = f;
            f.append(l);
            f.attr("data-mc-id", e._LoadedNodes.length);
            e._LoadedNodes.push(g);
            if (d != null) {
                d(g)
            }
        })
    };
    a.prototype.SyncTOC = function(f, e) {
        var d = this;
        var g = $("." + this._TreeNodeSelectedClass + " a", this._RootUl);
        if (g.length > 0) {
            var h = g[0];
            if (h.href === document.location.href) {
                return
            }
        }
        this.Init(function() {
            function k(m) {
                if (typeof m !== "undefined" && m != null) {
                    var l = [];
                    var n = m;
                    while (typeof n !== "undefined" && (d._NodesWithChildrenLoaded.indexOf(n) === -1)) {
                        l.unshift(n);
                        n = n.parent
                    }
                    MadCap.Utilities.AsyncForeach(l, function(r, q) {
                        var p = $(r.el);
                        var o = $("<ul/>");
                        o.addClass(d._SubMenuClass);
                        d.LoadTocChildren(r, o, function() {
                            p.append(o);
                            q()
                        })
                    }, function() {
                        var o = m.el[0];
                        d._UnhideNode(o);
                        d._SelectNode(o)
                    })
                }
            }

            function i(l) {
                d._HelpSystem.FindNode(d._RuntimeFileType, f, l, function(n) {
                    if (!n) {
                        if (!MadCap.String.IsNullOrEmpty(l.Fragment) || !MadCap.String.IsNullOrEmpty(l.Query)) {
                            var m = new MadCap.Utilities.Url(l.PlainPath);
                            d._HelpSystem.FindNode(d._RuntimeFileType, f, m, k, d._LinkedToc)
                        }
                    } else {
                        k(n)
                    }
                }, d._LinkedToc)
            }
            var j = e.HashMap.GetItem("cshid");
            if (j != null) {
                d._HelpSystem.LookupCSHID(j, function(m) {
                    var l = m.Found ? new MadCap.Utilities.Url(m.Topic).ToRelative(d._HelpSystem.GetContentPath()) : new MadCap.Utilities.Url(d._HelpSystem.DefaultStartTopic);
                    i(l)
                })
            } else {
                i(e)
            }
        })
    };
    a.prototype._UnhideNode = function(d) {
        var f = MadCap.Dom.GetAncestorNodeByTagName(d, "li", this._RootUl);
        while (f != null) {
            var e = $(f);
            e.removeClass(this._TreeNodeCollapsedClass);
            e.addClass(this._TreeNodeExpandedClass);
            f = MadCap.Dom.GetAncestorNodeByTagName(f, "li", this._RootUl)
        }
    };
    a.prototype.NavigateTopic = function(g) {
        var h = $("." + this._TreeNodeSelectedClass, this._RootUl)[0];
        if (h == null) {
            h = $("." + this._TreeNodeClass, this._RootUl)[0]
        }
        if (this.NeedsCreateToc(h)) {
            var f = this;
            this.CreateToc(h, function() {
                f.NavigateTopic(g)
            });
            return
        }
        var d = g == "previous" ? this._GetPrevious(h) : this._GetNext(h);
        if (d == null) {
            return
        }
        this._SelectNode(d);
        var e = $("> div a", d)[0];
        if (e != null) {
            document.location.href = $(e).attr("href")
        }
        this._UnhideNode(d)
    };
    a.prototype._SelectNode = function(e) {
        var d = $(e);
        $("." + this._TreeNodeSelectedClass, this._RootUl).removeClass(this._TreeNodeSelectedClass);
        d.addClass(this._TreeNodeSelectedClass);
        d.scrollintoview()
    };
    a.prototype._GetNext = function(f) {
        var e = $(f);
        var g = "." + this._TreeNodeClass;
        if (e.find(g).length > 0) {
            return e.find(g)[0]
        }
        if (e.next(g).length > 0) {
            return e.next(g)[0]
        }
        var d = e;
        while (true) {
            var h = $(d.parent().closest(g, this._RootUl));
            if (h.length == 0) {
                break
            }
            if (h.next(g).length > 0) {
                return h.next(g)[0]
            }
            d = h
        }
        return null
    };
    a.prototype._GetPrevious = function(f) {
        var e = $(f);
        var g = "." + this._TreeNodeClass;
        var d = e.prev(g);
        if (d.length == 0) {
            if (e.parent().closest(g, this._RootUl).length > 0) {
                return e.parent().closest(g, this._RootUl)[0]
            } else {
                return null
            }
        }
        if (d.find(g).length > 0) {
            return d.find(g).last()[0]
        }
        return d[0]
    }
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function() {
    MadCap.WebHelp = MadCap.CreateNamespace("WebHelp");
    var a = window.external && window.external.attached && window.external.attached();
    MadCap.WebHelp.Breadcrumbs = function(e, g, d, c) {
        var f = this;
        this._Init = false;
        this._RuntimeFileType = e;
        this._Root = d;
        this._CanSync = c;
        this._HelpSystem = g;
        this._TocFile = this._RuntimeFileType == "Toc" ? this._HelpSystem.GetTocFile() : this._HelpSystem.GetBrowseSequenceFile();
        this._TocType = null;
        this._TocPath = null;
        this._TocHref = null
    };
    var b = MadCap.WebHelp.Breadcrumbs;
    b.prototype.Init = function() {
        var d = $(this._Root);
        this._MaxLevel = d.attr("data-mc-breadcrumbs-count") || "3";
        this._Divider = d.attr("data-mc-breadcrumbs-divider") || " > ";
        this._LinkClass = "MCBreadcrumbsLink";
        this._SelfClass = "MCBreadcrumbsSelf";
        this._DividerClass = "MCBreadcrumbsDivider";
        var c = this;
        d.attr("data-mc-chunk", "Data/" + this._RuntimeFileType + ".xml");
        this.CreateToc(this._Root, function() {
            c._Init = true
        })
    };
    b.prototype.CreateToc = function(d, c) {
        var f = true;
        if (this._RuntimeFileType == "Toc") {
            f = this._HelpSystem.HasToc
        } else {
            f = this._HelpSystem.HasBrowseSequences
        }
        if (!f) {
            if (c != null) {
                c()
            }
            return
        }
        var e = this;
        e._HelpSystem.LoadToc([this._RuntimeFileType, null]).then(function(k) {
            var j = $(d);
            var h = [];
            for (var g = 0; g < k.chunks.length; g++) {
                if (!k.chunks[g].loaded) {
                    h.push(e._HelpSystem.LoadTocChunk(k, g))
                }
            }
            $.when.apply(this, h).done(function() {
                if (e._TocType) {
                    e._HelpSystem.FindNode(e._TocType, e._TocPath, e._TocHref, function(i) {
                        if (i) {
                            e.LoadTocBreadcrumbs(i, j);
                            if (c != null) {
                                c()
                            }
                        }
                    })
                } else {
                    e._HelpSystem.FindTocNode(null, e._TocHref, function(i) {
                        if (i) {
                            e.LoadTocBreadcrumbs(i, j);
                            if (c != null) {
                                c()
                            }
                        }
                    })
                }
            })
        })
    };
    b.prototype.LoadTocBreadcrumbs = function(j, f) {
        var q = [];
        var c = j.parent;
        var g = this._HelpSystem.NodeDepth(j);
        q.push(j);
        g -= 2;
        if (c) {
            for (var o = g; o >= 0; o--) {
                if ((this._MaxLevel < g && o <= this._MaxLevel) || this._MaxLevel >= g) {
                    q.unshift(c)
                }
                if (!c.parent) {
                    break
                }
                c = c.parent
            }
        }
        for (var m = 0; m < q.length; m++) {
            var s = q[m];
            if (s.i !== undefined) {
                var n = s.toc.entries[s.i];
                if (n) {
                    if (s == j) {
                        var e = $("<span/>");
                        e.text(n.title);
                        e.addClass(this._SelfClass);
                        f.append(e)
                    } else {
                        if (s.n) {
                            var h = $("<a/>");
                            var p = $("<span/>");
                            var l = this._HelpSystem.TopNavTocPath;
                            var d = this._HelpSystem.GetTocEntryHref(s, "Toc", false, l);
                            if (d) {
                                h.attr("href", d);
                                h.text(n.title);
                                h.addClass(this._LinkClass);
                                f.append(h)
                            } else {
                                var r = $("<span/>");
                                r.text(n.title);
                                r.addClass(this._SelfClass);
                                f.append(r)
                            }
                            p.text(this._Divider);
                            p.addClass(this._DividerClass);
                            f.append(p)
                        }
                    }
                }
            }
        }
    }
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function() {
    MadCap.WebHelp = MadCap.CreateNamespace("WebHelp");
    var b = window.external && window.external.attached && window.external.attached();
    MadCap.WebHelp.MiniToc = function(d, f, c) {
        var e = this;
        this._Init = false;
        this._RuntimeFileType = d;
        this._Root = c;
        this._HelpSystem = f;
        this._TocFile = this._RuntimeFileType == "Toc" ? this._HelpSystem.GetTocFile() : this._HelpSystem.GetBrowseSequenceFile();
        this._TocType = null;
        this._TocPath = null;
        this._TocHref = null
    };
    var a = MadCap.WebHelp.MiniToc;
    a.prototype.Init = function() {
        var d = $(this._Root);
        this._Depth = d.attr("data-mc-depth") || "3";
        this._LinkClass = "MiniTOC";
        var c = this;
        d.attr("data-mc-chunk", "Data/" + this._RuntimeFileType + ".xml");
        this.CreateToc(this._Root, function() {
            c._Init = true
        })
    };
    a.prototype.CreateToc = function(d, c) {
        var f = true;
        if (this._RuntimeFileType == "Toc") {
            f = this._HelpSystem.HasToc
        } else {
            f = this._HelpSystem.HasBrowseSequences
        }
        if (!f) {
            if (c != null) {
                c()
            }
            return
        }
        var e = this;
        e._HelpSystem.LoadToc([this._RuntimeFileType, null]).then(function(k) {
            var j = $(d);
            var h = [];
            for (var g = 0; g < k.chunks.length; g++) {
                if (!k.chunks[g].loaded) {
                    h.push(e._HelpSystem.LoadTocChunk(k, g))
                }
            }
            $.when.apply(this, h).done(function() {
                if (e._TocType) {
                    e._HelpSystem.FindNode(e._TocType, e._TocPath, e._TocHref, function(i) {
                        if (i) {
                            e.LoadTocMiniTocChildren(i, j, 1);
                            if (c != null) {
                                c()
                            }
                        }
                    })
                } else {
                    e._HelpSystem.FindTocNode(null, e._TocHref, function(i) {
                        if (i) {
                            e.LoadTocMiniTocChildren(i, j, 1);
                            if (c != null) {
                                c()
                            }
                        }
                    })
                }
            })
        })
    };
    a.prototype.LoadTocMiniTocChildren = function(f, e, g) {
        if (g <= this._Depth) {
            if (f.n) {
                for (var d = 0; d < f.n.length; d++) {
                    var c = f.n[d];
                    this.LoadTocMiniToc(c, e, g)
                }
            }
        }
    };
    a.prototype.LoadTocMiniToc = function(h, e, d) {
        if (h.i !== undefined) {
            var j = h.toc.entries[h.i];
            var f = this._LinkClass + d;
            var k = $("<p/>");
            var g = $("<a/>");
            var i = this._HelpSystem.TopNavTocPath;
            var c = this._HelpSystem.GetTocEntryHref(h, "Toc", false, i);
            g.addClass(f);
            g.attr("href", c);
            g.text(j.title);
            k.append(g);
            k.addClass(f + "_0");
            e.append(k)
        }
        d++;
        this.LoadTocMiniTocChildren(h, e, d)
    }
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function() {
    if (!MadCap.Utilities.HasRuntimeFileType("TriPane")) {
        return
    }
    MadCap.WebHelp = MadCap.CreateNamespace("WebHelp");
    MadCap.WebHelp.IndexPane = function(c) {
        var b = this;
        this._Init = false;
        this._ContainerEl = null;
        this._HelpSystem = c;
        this._EntryHeight = -1;
        this._IndexEntryCount = 0;
        this._IndexEntries = Object.create(null);
        this._IndexDivs = new Array();
        this._XmlDoc = null;
        this._Chunks = null;
        this._AlphaMap = new MadCap.Utilities.Dictionary();
        this._LiCached = null;
        this._SeePrefix = null;
        this._SeeAlsoPrefix = null;
        this.GetPath = function(d, e) {
            return MadCap.String.IsNullOrEmpty(d) ? new MadCap.Utilities.Url(e).ToRelative("/Content/").FullPath : "../" + new MadCap.Utilities.Url(d + e).FullPath
        };
        this.LoadRootEntry = function(e, d) {
            var g = $(e);
            var f = g.data("entry");
            b._HelpSystem.LoadRootIndexEntry(f, function(i) {
                if (i.e && !i.childrenLoaded) {
                    var h = $("<ul/>");
                    h.addClass("tree inner");
                    b.LoadEntries(h, i.e);
                    g.append(h)
                }
                i.childrenLoaded = true;
                g.data("entry", i);
                if (d) {
                    d(i, g)
                }
            })
        };
        this.LoadEntries = function(g, d) {
            var f = this;
            if (!$.isArray(d)) {
                var e = [];
                $.each(d, function(h, i) {
                    if (!i.t) {
                        i.t = h
                    }
                    e.push(i)
                });
                e.sort(function(i, h) {
                    var k = (i.s || i.t).toLowerCase();
                    var j = (h.s || h.t).toLowerCase();
                    return MadCap.String.LocaleCompare(k, j, b._HelpSystem.LanguageCode)
                });
                d = e
            }
            $.each(d, function(q, v) {
                var r = $("<li/>");
                r.addClass("IndexEntry tree-node tree-node-collapsed");
                var l = v.t;
                var o = v.r == "See";
                var h = v.r == "SeeAlso";
                var j = $("<div/>");
                j.addClass("IndexTerm");
                var t = $("<span/>").addClass("label");
                j.append(t);
                var u = true;
                if (o) {
                    l = f._SeePrefix + ": " + v.f;
                    j.addClass("see");
                    v.seeAlsoLinks = [v.f]
                } else {
                    if (h) {
                        l = f._SeeAlsoPrefix + ": ";
                        v.seeAlsoLinks = [];
                        seeAlsoLinks = v.f.split("; ");
                        if (seeAlsoLinks.length > 1) {
                            var k = $("<a/>").text(l);
                            t.append(k);
                            for (var n = 0; n < seeAlsoLinks.length; n++) {
                                var s = seeAlsoLinks[n];
                                var p = $("<a/>").addClass("seeAlsoLink").text(s);
                                t.append(p);
                                v.seeAlsoLinks.push(s);
                                if (n < seeAlsoLinks.length - 1) {
                                    t.append("; ")
                                }
                            }
                            u = false
                        } else {
                            l += v.f;
                            v.seeAlsoLinks.push(v.f)
                        }
                        j.addClass("see-also")
                    }
                }
                if (u) {
                    var k = $("<a/>").text(l);
                    t.append(k)
                }
                r.append(j);
                v.isRoot = typeof v.$ !== "undefined";
                if (v.e) {
                    var m = $("<ul/>");
                    m.addClass("tree inner");
                    f.LoadEntries(m, v.e);
                    r.append(m)
                } else {
                    if (v.$ === 1 || !v.isRoot) {
                        r.removeClass("tree-node-collapsed");
                        r.addClass("tree-node-leaf")
                    }
                }
                g.append(r);
                v.el = r[0];
                r.data("entry", v);
                if (!o && !h) {
                    if (typeof f._IndexEntries[l] == "undefined") {
                        f._IndexEntries[l] = [v]
                    } else {
                        f._IndexEntries[l].push(v)
                    }
                }
            })
        };
        this.FindEntry = function(e, d) {
            b._HelpSystem.FindIndexEntry(e, function(f, g) {
                if (!g) {
                    return
                }
                b.LoadRootEntry(f.el, function() {
                    if (d) {
                        d(g)
                    }
                })
            })
        };
        this.SelectEntry = function(i, m, j, k, n) {
            $(".tree-node-selected", b._ContainerEl).removeClass("tree-node-selected");
            j.addClass("tree-node-selected");
            if (!m) {
                $("body").removeClass("active");
                return
            }
            MadCap.TextEffects.RemoveLinkListTrees();
            var l = i.pageY - k.offset().top;
            var d = i.pageX - k.offset().left;
            var f = !this._HelpSystem.IsTabletLayout() || !this._HelpSystem.IsResponsive;
            if (m.r && !n) {
                var h = $(".seeAlsoLink", j).index(i.target);
                var g = m.seeAlsoLinks[0];
                if (h >= 0) {
                    g = m.seeAlsoLinks[h]
                }
                g = g.replace(", ", ":");
                this.FindEntry(g, function(e) {
                    j = $(e.el);
                    $container = f ? $(b._ContainerEl).parent() : $("#navigation");
                    b._UnhideNode(j[0]);
                    b.SelectEntry(i, e, j, k, true);
                    $container.animate({
                        scrollTop: $container.scrollTop() + j.offset().top - $container.offset().top
                    })
                });
                return
            } else {
                if (m.linkList && m.linkList.length > 1 && !n) {
                    if (f) {
                        MadCap.TextEffects.CreateLinkListPopup(m.linkList, b._ContainerEl, l, d, k, "#")
                    } else {
                        MadCap.TextEffects.CreateLinkListTree(m.linkList, j, k, "#", function(o) {
                            b.TreeNode_Click(o);
                            MadCap.TextEffects.Item_Click.call($(o.currentTarget), [o])
                        })
                    }
                    MadCap.Utilities.PreventDefault(i);
                    i.stopPropagation()
                } else {
                    if (m.linkList && m.linkList.length == 1) {
                        $("body").removeClass("active");
                        document.location.href = "#" + m.linkList[0].Link
                    }
                }
            }
            if (j.hasClass("tree-node-expanded") && !n) {
                j.removeClass("tree-node-expanded");
                j.addClass("tree-node-collapsed")
            } else {
                if (j.hasClass("tree-node-collapsed")) {
                    j.removeClass("tree-node-collapsed");
                    j.addClass("tree-node-expanded")
                }
            }
        };
        this.TreeNode_Click = function(h) {
            var d = MadCap.Dom.GetAncestorNodeByTagName(h.target, "li");
            if (d == null) {
                return
            }
            if ($(h.target).closest(".link-list-popup").length > 0) {
                return
            }
            var g = $(this);
            var i = $(d);
            MadCap.Utilities.PreventDefault(h);
            var f = i.data("entry");
            if (!i.hasClass("IndexEntryLink") && (!f || f.isRoot)) {
                b.LoadRootEntry(d, function(e, j) {
                    b.SelectEntry(h, e, j, g)
                })
            } else {
                b.SelectEntry(h, f, i, g)
            }
        };
        this.Search = function() {
            var d = this.value.toLowerCase();
            b._Terms.each(function() {
                var e = $(this);
                var f = e.parent().parent();
                var g = b._HelpSystem.IndexPartialWordSearch ? e.text().toLowerCase().indexOf(d) != -1 : MadCap.String.StartsWith(e.text(), d, false);
                f.css("display", g ? "block" : "none");
                if (b._HelpSystem.IndexPartialWordSearch) {
                    e.removeHighlight("highlightIndex");
                    if (g) {
                        e.highlight(d, "highlightIndex")
                    }
                }
            })
        }
    };
    var a = MadCap.WebHelp.IndexPane;
    a.prototype.Init = function(e, b) {
        if (this._Init) {
            if (b != null) {
                b()
            }
            return
        }
        var d = this;
        d._ContainerEl = e;
        var c = $(this._ContainerEl.parentNode);
        this._SeePrefix = c.attr("data-see-prefix") || "See";
        this._SeeAlsoPrefix = c.attr("data-see-also-prefix") || "See Also";
        d._HelpSystem.LoadIndex(function(h, g) {
            var f = $("<ul/>");
            f.addClass("tree");
            d.LoadEntries(f, h.terms);
            var j = $(d._ContainerEl);
            j.click(d.TreeNode_Click);
            j.append(f);
            var i = $("#search-index");
            i.bind("keyup", d.Search);
            $("#responsive-search-index").bind("keyup", d.Search);
            d._Terms = $(".IndexEntry a", this._ContainerEl);
            d._Init = true;
            if (b != null) {
                b()
            }
        }, null)
    };
    a.prototype._UnhideNode = function(c) {
        var b = MadCap.Dom.GetAncestorNodeByTagName(c, "li", this._ContainerEl);
        while (b != null) {
            var d = $(b);
            d.removeClass("tree-node-collapsed");
            d.addClass("tree-node-expanded");
            b = MadCap.Dom.GetAncestorNodeByTagName(b, "li", this._ContainerEl)
        }
    }
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function() {
    if (!MadCap.Utilities.HasRuntimeFileType("TriPane")) {
        return
    }
    MadCap.WebHelp = MadCap.CreateNamespace("WebHelp");
    MadCap.WebHelp.GlossaryPane = function(c) {
        var b = this;
        this._Init = false;
        this._ContainerEl = null;
        this._HelpSystem = c;
        MadCap.Utilities.CrossFrame.AddMessageHandler(this.OnMessage, this);
        this.TreeNode_Click = function(j) {
            var d = MadCap.Dom.GetAncestorNodeByTagName(j.target, "li");
            if (d == null) {
                return
            }
            var l = $(d);
            var i = $("a", l);
            var h = i.text();
            var k = l.attr("data-chunk");
            var f = b._HelpSystem.Glossary.chunks[k].path;
            var g = new MadCap.Utilities.Url(f).ToFolder().ToFolder();
            MadCap.Utilities.PreventDefault(j);
            require([f], function(n) {
                var o = n[h];
                $(".tree-node-selected", b._ContainerEl).removeClass("tree-node-selected");
                l.addClass("tree-node-selected");
                var e = $(".GlossaryPageTerm", d);
                if (!MadCap.String.IsNullOrEmpty(o.d) && !e.hasClass("MCDropDownHead")) {
                    e.addClass("MCDropDownHead MCDropDownHotSpot");
                    var s = $("<div/>");
                    s.addClass("GlossaryPageDefinition MCDropDownBody");
                    s.append(o.d);
                    l.addClass("MCDropDown");
                    l.append(e);
                    l.append(s);
                    var p = new MadCap.TextEffects.DropDownControl(l[0]);
                    p.Init(false);
                    p.Open(true)
                }
                if (!MadCap.String.IsNullOrEmpty(o.l)) {
                    var m = i.attr("href");
                    if (MadCap.String.IsNullOrEmpty(m)) {
                        var q = g.CombinePath(o.l).ToRelative(b._HelpSystem.GetContentPath()).FullPath;
                        m = encodeURI(q);
                        i.attr("href", m)
                    }
                    document.location.href = "#" + m
                } else {
                    if (l.hasClass("tree-node-expanded")) {
                        l.removeClass("tree-node-expanded");
                        l.addClass("tree-node-collapsed")
                    } else {
                        if (l.hasClass("tree-node-collapsed")) {
                            l.removeClass("tree-node-collapsed");
                            l.addClass("tree-node-expanded");
                            if ($("li", l.parent()).last()[0] == l[0]) {
                                var r = $(b._ContainerEl);
                                r.animate({
                                    scrollTop: r[0].scrollHeight
                                }, 500)
                            }
                        }
                    }
                }
            })
        };
        this.Search = function() {
            var d = this.value.toLowerCase();
            b._Terms.each(function() {
                var e = $(this);
                var f = e.parent().parent();
                var g = b._HelpSystem.GlossaryPartialWordSearch ? e.text().toLowerCase().indexOf(d) != -1 : MadCap.String.StartsWith(e.text(), d, false);
                f.css("display", g ? "block" : "none");
                if (b._HelpSystem.GlossaryPartialWordSearch) {
                    e.removeHighlight("highlightGlossary");
                    if (g) {
                        e.highlight(d, "highlightGlossary")
                    }
                }
            })
        }
    };
    var a = MadCap.WebHelp.GlossaryPane;
    a.prototype.OnMessage = function(e, b, d) {
        var c = {
            Handled: false,
            FireResponse: true
        };
        return c
    };
    a.prototype.Init = function(d, b) {
        if (this._Init) {
            if (b != null) {
                b()
            }
            return
        }
        var c = this;
        c._ContainerEl = d;
        c._HelpSystem.LoadGlossary(function(f, l) {
            var h = $("<ul/>");
            h.addClass("tree");
            var k = f.terms.sort(function(p, i) {
                return MadCap.String.LocaleCompare(p.s || p.t, i.s || i.t, c._HelpSystem.LanguageCode)
            });
            for (var g = 0; g < k.length; g++) {
                var n = k[g];
                var m = $("<li/>");
                m.addClass("GlossaryPageEntry tree-node tree-node-collapsed");
                m.attr("data-chunk", n.c);
                var e = $("<div/>");
                e.addClass("GlossaryPageTerm");
                e.append('<span class="label"><a>' + n.t + "</a></span>");
                m.append(e);
                h.append(m)
            }
            var o = $(c._ContainerEl);
            o.click(c.TreeNode_Click);
            o.append(h);
            var j = $("#search-glossary");
            j.bind("keyup", c.Search);
            $("#responsive-search-glossary").bind("keyup", c.Search);
            c._Terms = $(".GlossaryPageTerm a", c._ContainerEl);
            c._Init = true;
            if (b != null) {
                b()
            }
        }, null)
    };
    a.prototype._SelectNode = function(b) {
        $(".tree-node-selected", this._ContainerEl).removeClass("tree-node-selected");
        $(b).addClass("tree-node-selected")
    }
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function() {
    var a = MadCap.CreateNamespace("WebHelp.Search");
    a.Tokenizer = function() {
        var g = "";
        var h = -1;
        var f = new Array();
        this.Tokenize = function(l) {
            var k = null;
            g = l;
            h = -1;
            for (var j = 0; k = i(); j++) {
                f[j] = k
            }
            return f
        };

        function c() {
            return g.charAt(h + 1)
        }

        function e() {
            h++
        }

        function d() {
            var j = "";
            for (;;) {
                var k = c();
                if (!k) {
                    break
                }
                if (k == '"') {
                    e();
                    break
                } else {
                    e();
                    j += k
                }
            }
            return (j == "") ? null : j
        }

        function i() {
            var n = c();
            var k = null;
            var j = "";
            if (!n) {
                k = null
            } else {
                if (a.IsWhiteSpace(n)) {
                    for (n = c(); a.IsWhiteSpace(n); n = c()) {
                        e();
                        j += n
                    }
                    k = new a.Token(j, a.Token.WhiteSpace)
                } else {
                    if (n == "(") {
                        e();
                        k = new a.Token(n, a.Token.LeftParen)
                    } else {
                        if (n == ")") {
                            e();
                            k = new a.Token(n, a.Token.RightParen)
                        } else {
                            if (n == "^" || n == "!") {
                                e();
                                k = new a.Token(n, a.Token.Not)
                            } else {
                                if (n == "+" || n == "&") {
                                    e();
                                    k = new a.Token(n, a.Token.And)
                                } else {
                                    if (n == "|") {
                                        e();
                                        k = new a.Token(n, a.Token.Or)
                                    } else {
                                        if (n == '"') {
                                            e();
                                            var m = d();
                                            k = new a.Token(m, (m == null) ? a.Token.Error : a.Token.Phrase)
                                        } else {
                                            if (a.IsTermSeparator(n)) {
                                                e();
                                                k = new a.Token(n, a.Token.TermSeparator)
                                            } else {
                                                for (n = c(); a.IsNameChar(n); n = c()) {
                                                    e();
                                                    j += n
                                                }
                                                if (j == "and" || j == "AND") {
                                                    k = new a.Token(j, a.Token.And)
                                                } else {
                                                    if (j == "or" || j == "OR") {
                                                        k = new a.Token(j, a.Token.Or)
                                                    } else {
                                                        if (j == "not" || j == "NOT") {
                                                            k = new a.Token(j, a.Token.Not)
                                                        } else {
                                                            var l = a.Token.Word;
                                                            if (MadCap.WebHelp.SearchPane.SearchDBs[0].SearchType == "NGram") {
                                                                l = a.Token.Phrase
                                                            }
                                                            k = new a.Token(j, l)
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return k
        }
    };
    a.Token = function(c, e) {
        var d = c;
        var f = e;
        this.GetTokenText = function() {
            return d
        };
        this.GetType = function() {
            return f
        }
    };
    var b = a.Token;
    b.Eof = 0;
    b.Error = 1;
    b.WhiteSpace = 2;
    b.Phrase = 3;
    b.Word = 4;
    b.RightParen = 5;
    b.LeftParen = 6;
    b.Not = 7;
    b.And = 8;
    b.Or = 9;
    b.ImplicitAnd = 10;
    b.TermSeparator = 11;
    a.Parser = function(g) {
        var i = this;
        var k = g;
        var d = -1;
        var h = new a.Tokenizer();
        var c = h.Tokenize(k);
        this.ParseExpression = function() {
            var n = j();
            f();
            if (e() == a.Token.Eof) {
                return n
            } else {
                if (e() == a.Token.And || e() == a.Token.Or || e() == a.Token.Not) {
                    l();
                    var m = new a.Node(c[d], n, this.ParseExpression());
                    return m
                } else {
                    if (e() == a.Token.Word || e() == a.Token.Phrase || e() == a.Token.Not || e() == a.Token.LeftParen) {
                        var m = new a.Node(new a.Token(n.GetToken().GetTokenText() + " " + c[d + 1].GetTokenText(), a.Token.ImplicitAnd), n, this.ParseExpression());
                        return m
                    } else {
                        if (e() == a.Token.RightParen) {
                            return n
                        }
                    }
                }
            }
            throw gInvalidTokenLabel
        };

        function l() {
            d++
        }

        function j() {
            f();
            if (e() == a.Token.Word) {
                l();
                return new a.Node(c[d], null, null)
            } else {
                if (e() == a.Token.Phrase) {
                    l();
                    return new a.Node(c[d], null, null)
                } else {
                    if (e() == a.Token.LeftParen) {
                        l();
                        var m = c[d];
                        var n = new a.Node(m, i.ParseExpression(), null);
                        if (e() != a.Token.RightParen) {
                            throw "Missing right paren ')'."
                        }
                        l();
                        return n
                    }
                }
            }
            throw gInvalidTokenLabel
        }

        function e() {
            if (c[d + 1] == null) {
                return a.Token.Eof
            } else {
                return c[d + 1].GetType()
            }
        }

        function f() {
            for (; e() == a.Token.WhiteSpace || e() == a.Token.TermSeparator;) {
                l()
            }
        }
    };
    a.Node = function(e, f, d) {
        var c = e;
        var h = f;
        var g = d;
        this.Evaluate = function(k, i) {
            var j = this;
            var l = c.GetType();
            if (l == a.Token.Word || l == a.Token.Phrase) {
                this.EvaluatePhrase(k).then(i)
            } else {
                if (l == a.Token.And || l == a.Token.ImplicitAnd || l == a.Token.Or || l == a.Token.Not) {
                    h.Evaluate(k, function(m) {
                        g.Evaluate(k, function(n) {
                            if (c.GetType() == a.Token.And || c.GetType() == a.Token.ImplicitAnd) {
                                i(a.IntersectResults(m, n))
                            } else {
                                if (c.GetType() == a.Token.Or) {
                                    i(a.UnionResults(m, n))
                                } else {
                                    if (c.GetType() == a.Token.Not) {
                                        i(a.SubtractResults(m, n))
                                    }
                                }
                            }
                        })
                    })
                } else {
                    if (l == a.Token.LeftParen) {
                        if (h) {
                            h.Evaluate(k, i)
                        } else {
                            i(null)
                        }
                    } else {
                        i(null)
                    }
                }
            }
        };
        this.EvaluatePhrase = function(n) {
            var q = this;
            var r = $.Deferred();
            var i = c.GetTokenText();
            var k = c.GetType() == a.Token.Phrase;
            var p = [];
            var o = Object.create(null);
            o.results = Object.create(null);
            o.terms = [];
            o.ignore = MadCap.Utilities.StopWords.indexOf(i) > -1;
            if (!o.ignore) {
                o.terms.push(i);
                for (var m = 0; m < MadCap.WebHelp.SearchPane.SearchDBs.length; m++) {
                    var l = MadCap.WebHelp.SearchPane.SearchDBs[m];
                    p.push(l.LookupPhrase(i, k, n).then(function(j, s) {
                        if (s) {
                            dbIndex = MadCap.WebHelp.SearchPane.SearchDBs.indexOf(j);
                            o.results[dbIndex] = {
                                data: s
                            }
                        }
                    }))
                }
            }
            $.when.apply(this, p).done(function() {
                r.resolve(o)
            });
            return r.promise()
        };
        this.GetToken = function() {
            return c
        }
    };
    a.LoadResultData = function(h) {
        var k = [];
        var i = 0;
        var d = h.results;
        for (var f in d) {
            var e = MadCap.WebHelp.SearchPane.SearchDBs[f];
            var g = d[f];
            k.push(e.LoadTopics(g).then(function(m) {
                i += m.count
            }))
        }
        var l = MadCap.WebHelp.SearchPane.SearchDBs[0].RelevanceWeight;
        var j = $.Deferred();
        var c = [];
        $.when.apply(this, k).done(function() {
            for (var r in d) {
                var n = MadCap.WebHelp.SearchPane.SearchDBs[r];
                var p = d[r];
                for (var o in p.data) {
                    var t = p.data[o];
                    var q = n.HelpSystem.GetTopicPath(t.u).FullPath;
                    var m = t.i * p.count / i;
                    var s = MadCap.Utilities.CalculateScore(t.r, m, l);
                    c.push(new a.SearchResult(s, t.t, q, t.a))
                }
            }
            j.resolve(c, h.terms)
        });
        return j.promise()
    };
    a.IsNameChar = function(d) {
        if (!d) {
            return false
        } else {
            if (d == '"') {
                return false
            } else {
                if (d == "+") {
                    return false
                } else {
                    if (d == "^") {
                        return false
                    } else {
                        if (d == "|") {
                            return false
                        } else {
                            if (d == "&") {
                                return false
                            } else {
                                if (a.IsWhiteSpace(d)) {
                                    return false
                                } else {
                                    if (a.IsTermSeparator(d)) {
                                        return false
                                    } else {
                                        return true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    a.IsWhiteSpace = function(d) {
        if (!d) {
            return false
        } else {
            if (d == " ") {
                return true
            } else {
                if (d.charCodeAt(0) == 12288) {
                    return true
                } else {
                    return false
                }
            }
        }
    };
    a.IsTermSeparator = function(d) {
        return (MadCap.String.IsPunctuation(d) && d != "'" && d != "_") || d == ">" || d == "<" || d == "="
    };
    a.SplitPhrase = function(f) {
        var e = null;
        var c = MadCap.WebHelp.SearchPane.SearchDBs[0];
        if (c.SearchType == "NGram") {
            e = new Array(Math.max(0, f.length - (c.NGramSize + 1)));
            for (var d = 0; d < f.length - c.NGramSize + 1; d++) {
                e[d] = f.substring(d, d + c.NGramSize)
            }
        } else {
            e = MadCap.String.Split(f, function(g) {
                return a.IsWhiteSpace(g) || a.IsTermSeparator(g)
            })
        }
        return e
    };
    a.FilterResults = function(e, d, j, c) {
        if ((e.ignore && d.ignore) || d.ignore) {
            return e
        } else {
            if (e.ignore) {
                return d
            }
        }
        var i = Object.create(null);
        i.results = Object.create(null);
        var k = i.results;
        for (var h in e.results) {
            k[h] = Object.create(null);
            k[h].data = Object.create(null);
            var g = e.results[h].data;
            var f = d.results[h];
            if (f) {
                f = f.data
            }
            j(g, f, k[h].data)
        }
        i.terms = c(e.terms, d.terms);
        return i
    };
    a.UnionResults = function(d, c) {
        return a.FilterResults(d, c, function(f, j, e) {
            for (var h in f) {
                e[h] = f[h]
            }
            if (j) {
                for (var h in j) {
                    var i = f[h];
                    var g = j[h];
                    if (i) {
                        e[h] = {
                            r: MadCap.Utilities.CombineRelevancy(i.r, g.r)
                        }
                    } else {
                        e[h] = g
                    }
                }
            }
        }, function(f, e) {
            return f.Union(e)
        })
    };
    a.IntersectResults = function(d, c) {
        return a.FilterResults(d, c, function(f, i, e) {
            if (i) {
                for (var h in f) {
                    var g = i[h];
                    if (g) {
                        e[h] = {
                            r: MadCap.Utilities.CombineRelevancy(f[h].r, g.r)
                        }
                    }
                }
            }
        }, function(f, e) {
            return f.Union(e)
        })
    };
    a.SubtractResults = function(d, c) {
        if (d.ignore || c.ignore) {
            return d
        }
        return a.FilterResults(d, c, function(f, i, e) {
            if (i) {
                for (var h in f) {
                    var g = i[h];
                    if (!g) {
                        e[h] = f[h]
                    }
                }
            }
        }, function(f, e) {
            return f
        })
    }
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function() {
    MadCap.WebHelp = MadCap.CreateNamespace("WebHelp");
    MadCap.WebHelp.SearchPane = function(f, e) {
        this._Init = false;
        this._Container = e;
        this._HelpSystem = f;
        this._FeedbackController = null;
        this._Parser = null;
        this._Filters = null;
        this._Set = null;
        this._FilteredSet = null;
        this._Highlight = "";
        this._DownloadedSynonymXmlDocRootNode = null
    };
    var c = MadCap.WebHelp.SearchPane;
    c.SearchDBs = new Array();
    c.prototype.Init = function(e) {
        if (this._Init) {
            if (e) {
                e.call(this)
            }
            return
        }
        var h = this;
        if (this._HelpSystem.LiveHelpEnabled) {
            this._FeedbackController = MadCap.WebHelp.LoadFeedbackController(this._HelpSystem.LiveHelpServer);
            this._FeedbackController.Init(function() {
                if (h._FeedbackController.FeedbackActive) {
                    h._FeedbackController.GetSynonymsFile(h._HelpSystem.LiveHelpOutputId, null, function(k, i) {
                        var j = MadCap.Utilities.Xhr.LoadXmlString(k);
                        if (j != null) {
                            h._DownloadedSynonymXmlDocRootNode = j.documentElement
                        }
                        g()
                    }, null)
                } else {
                    g()
                }
            })
        } else {
            g()
        }

        function g() {
            if (!h._HelpSystem.IsWebHelpPlus) {
                h._HelpSystem.GetSearchDBs(f)
            } else {
                f(null)
            }
        }

        function f(i) {
            c.SearchDBs = i;
            h._Filters = new b.Filters(h._HelpSystem);
            h._Filters.Load(function() {
                h._Init = true;
                if (e) {
                    e.call(h)
                }
            })
        }
    };
    c.prototype.Search = function(g, f) {
        if (MadCap.String.IsNullOrEmpty(MadCap.String.Trim(g))) {
            return
        }
        this._Container.addClass("loading");
        var e = $.Deferred();
        this.Init(function() {
            var j = {};
            var h = [];
            if (f.searchContent) {
                var i = f.content ? f.content.filterName : null;
                var k = !this._HelpSystem.IsWebHelpPlus ? this.DoSearch(g, i) : this.DoSearchWebHelpPlus(g, i);
                h.push(k.then(function(m, n) {
                    j.content = m;
                    j.includedTerms = n
                }))
            }
            if (f.searchGlossary) {
                h.push(this._HelpSystem.SearchGlossary(g).then(function(m) {
                    j.glossary = m
                }))
            }
            if (f.searchCommunity) {
                if (this._FeedbackController && this._FeedbackController.PulseActive) {
                    var l = this._FeedbackController.GetPulseSearchResults(this._HelpSystem.LiveHelpOutputId, g, f.community.pageSize, f.community.pageIndex);
                    h.push(l.then(function(m) {
                        j.community = m
                    }))
                }
            }
            $.when.apply(this, h).done($.proxy(function() {
                this._Container.removeClass("loading");
                e.resolve(j)
            }, this))
        });
        return e.promise()
    };
    c.prototype.DoSearch = function(k, i) {
        var g = $.Deferred();
        this._Parser = new b.Parser(k);
        var f = null;
        try {
            f = this._Parser.ParseExpression()
        } catch (j) {
            alert("Ensure that the search string is properly formatted.");
            f = null
        }
        if (!f) {
            return g.resolve()
        }
        var e = c.SearchDBs[0];
        if (this._DownloadedSynonymXmlDocRootNode != null && e.DownloadedSynonymFile == null) {
            e.DownloadedSynonymFile = new b.SynonymFile(this._DownloadedSynonymXmlDocRootNode, e.Stemmer)
        }
        var h = this;
        f.Evaluate(i, function(l) {
            b.LoadResultData(l).then(function(m, n) {
                h._Set = m;
                if (h._Set) {
                    h._Set.sort(function(p, o) {
                        return o.Score - p.Score
                    })
                }
                MadCap.Utilities.ClearRequireCache();
                g.resolve(h._Set, n)
            })
        });
        return g.promise()
    };
    c.prototype.DoSearchWebHelpPlus = function(m, k) {
        var h = this;
        var g = $.Deferred();

        function f(A, v) {
            var y = [];
            if (A) {
                var p = A.getElementsByTagName("Result");
                var s = p.length;
                var u = new MadCap.Utilities.Url(document.location.pathname);
                if (!h._HelpSystem.SearchUrl) {
                    if (!MadCap.String.EndsWith(document.location.pathname, "/")) {
                        u = u.ToFolder()
                    }
                    u = u.CombinePath(h._HelpSystem.ContentFolder)
                }
                for (var q = 0; q < s; q++) {
                    var z = p[q];
                    var o = MadCap.Dom.GetAttributeInt(z, "Rank", -1);
                    var x = z.getAttribute("Title");
                    var w = z.getAttribute("Link");
                    var t = new MadCap.Utilities.Url(w).ToRelative(u);
                    var n = z.getAttribute("AbstractText");
                    if (MadCap.String.IsNullOrEmpty(x)) {
                        x = z.getAttribute("Filename")
                    }
                    var r = new b.SearchResult(o, x, t.FullPath, unescape(n));
                    y.push(r)
                }
            }
            g.resolve(y)
        }
        MadCap.Utilities.Xhr.CallWebService(h._HelpSystem.GetPath() + "Service/Service.asmx/GetSearchResults?SearchString=" + encodeURIComponent(m) + "&FilterName=" + encodeURIComponent(k), true, f, null);
        var l = m.split(" ");
        var e = true;
        this._Highlight = "?Highlight=";
        for (var j = 0; j < l.length; j++) {
            if (!e) {
                this._Highlight += "||"
            } else {
                e = false
            }
            this._Highlight += l[j]
        }
        return g.promise()
    };
    var b = MadCap.CreateNamespace("WebHelp.Search");
    MadCap.WebHelp.Search.SearchDB = function(e) {
        this.RelevanceWeight = 0;
        this.TopicChunkMap = null;
        this.UrlChunkMap = null;
        this.StemChunkMap = null;
        this.PhraseChunkMap = null;
        this.HelpSystem = e;
        this.SearchType = null;
        this.NGramSize = 0;
        this.Stemmer = null;
        this.SynonymFile = null;
        this.DownloadedSynonymFile = null;
        this.LoadChunkCompleteFuncs = new MadCap.Utilities.Dictionary()
    };
    var a = b.SearchDB;
    a.prototype.Load = function(g, e) {
        var f = this;
        this.LoadStemmer(this.HelpSystem.LanguageName, function() {
            MadCap.Utilities.Xhr.Load(f.HelpSystem.GetPath() + "Data/Synonyms.xml", true, function(h) {
                if (h != null) {
                    f.SynonymFile = new b.SynonymFile(h.documentElement, f.Stemmer)
                }
                f._LoadSearchDB(g, e)
            }, null, this)
        })
    };
    a.prototype.LoadStemmer = function(j, e) {
        var f = ["danish", "dutch", "english", "finnish", "french", "german", "hungarian", "italian", "norwegian", "portuguese", "romanian", "russian", "spanish"];
        var i = null;
        this.Stemmer = {
            stemWord: function(k) {
                if (k != null) {
                    k = k.toLowerCase()
                }
                if (i != null) {
                    k = i.stemWord(k)
                }
                return k
            }
        };
        if (j != null && f.indexOf(j.toLowerCase()) != -1) {
            var h = "stemmer-" + j.toLowerCase() + ".amd.min.js";
            var g = MadCap.Utilities.HasRuntimeFileType("SkinPreview") ? "../WebHelp2/Scripts/Stemmers/" : this.HelpSystem.GetPath() + this.HelpSystem.ScriptsFolderPath;
            require([g + h], function(k) {
                i = new k[j + "Stemmer"];
                e()
            })
        } else {
            e()
        }
    };
    a.prototype.GetTermPhrases = function(h, f, i) {
        var o = this;
        var k = new MadCap.Utilities.Dictionary();
        var g = this.Stemmer.stemWord(h);
        var l = new MadCap.Utilities.Dictionary();
        k.Add(g, true);
        if (!f) {
            if (this.SynonymFile != null) {
                this.SynonymFile.AddSynonymStems(h, g, k)
            }
            if (this.DownloadedSynonymFile != null) {
                this.DownloadedSynonymFile.AddSynonymStems(h, g, k)
            }
        }
        var e = Object.create(null);
        var j = [];
        k.ForEach(function(r, s) {
            if (o.SearchType == "NGram") {
                for (var q = 0; q < r.length - o.NGramSize + 1; q++) {
                    var p = r.substring(q, q + o.NGramSize);
                    j.push(p)
                }
            } else {
                j.push(r)
            }
        });
        var n = [];
        $.each(j, function(p, q) {
            n.push(o.LoadStem(q).then(function(s) {
                for (var r in s) {
                    if (!f || r == h.toLowerCase()) {
                        var t = s[r];
                        if (i) {
                            t = i.Intersect(t)
                        }
                        l.Add(r, t)
                    }
                }
            }))
        });
        var m = $.Deferred();
        $.when.apply(this, n).done(function() {
            m.resolve(h, l)
        });
        return m.promise()
    };
    a.prototype.LookupPhrase = function(m, k, e) {
        var o = this;
        var w = $.Deferred();
        var f = b.SplitPhrase(m);
        var h = null;
        var n = [];
        var l = new MadCap.Utilities.Dictionary();
        if (m) {
            m = m.trim()
        }
        if (!m || MadCap.Utilities.StopWords.indexOf(m) > -1) {
            w.resolve(o, null);
            return w.promise()
        }
        var j;
        if (e) {
            j = [];
            var r = this.HelpSystem.GetMasterHelpsystem().GetSearchFilters();
            if (r) {
                var u = r[e];
                if (u) {
                    var g = u.c;
                    var v = g.split(";");
                    var t = this.HelpSystem.GetConcepts();
                    for (var q = 0; q < v.length; q++) {
                        var s = v[q];
                        j = j.Union(t[s])
                    }
                }
            }
        }
        for (var q = 0; q < f.length; q++) {
            var p = f[q];
            n.push(this.GetTermPhrases(p, k, j).then(function(i, x) {
                l.Add(i, x)
            }))
        }
        $.when.apply(o, n).done(function() {
            var A;
            l.ForEach(function(C, B) {
                var D = [];
                B.ForEach(function(E, F) {
                    D = D.Union(F)
                });
                if (!A) {
                    A = D
                } else {
                    A = A.Intersect(D)
                }
            });
            var x = Object.create(null);
            var z = [];
            l.ForEach(function(C, B) {
                x[C] = Object.create(null);
                B.ForEach(function(D, F) {
                    var E = F.Intersect(A);
                    $.each(E, function(G, H) {
                        z.push(o.LoadPhrase(D, H).then(function(I, K) {
                            var J = x[C][I];
                            if (K) {
                                if (!J) {
                                    x[C][I] = K
                                } else {
                                    J.r = MadCap.Utilities.CombineRelevancy(J.r, K.r);
                                    $.extend(true, J.w, K.w)
                                }
                            }
                        }))
                    })
                })
            });
            var y = Object.create(null);
            var i = Object.create(null);
            $.when.apply(this, z).done(function() {
                $.each(A, function(G, J) {
                    var L = 0;
                    if (!k) {
                        L = x[f[0]][J].r
                    } else {
                        var K = x[f[0]][J].w;
                        for (var C in K) {
                            var D = K[C];
                            for (var I = 1; I < f.length; I++) {
                                var H = parseInt(C);
                                var F = f[I];
                                var E = x[F][J].w;
                                var B = E[H + I];
                                if (B) {
                                    D = Math.max(D, B)
                                } else {
                                    D = 0;
                                    break
                                }
                            }
                            L = MadCap.Utilities.CombineRelevancy(L, D)
                        }
                    }
                    if (L > 0) {
                        i[J] = {
                            r: L
                        }
                    }
                });
                w.resolve(o, i)
            })
        });
        return w.promise()
    };
    a.prototype.LoadTopics = function(h) {
        var e = [];
        var i = h.data;
        for (var g in i) {
            e.push(this.LoadTopic(g).then(function(j, k) {
                $.extend(i[j], k)
            }))
        }
        h.count = e.length;
        var f = $.Deferred();
        $.when.apply(this, e).done(function() {
            f.resolve(h)
        });
        return f.promise()
    };
    a.prototype._LoadSearchDB = function(f, e) {
        this.TopicChunkMap = f.t;
        this.UrlChunkMap = f.u;
        this.StemChunkMap = f.s;
        this.PhraseChunkMap = f.p;
        this.RelevanceWeight = f.r;
        this.SearchType = f.st;
        this.NGramSize = f.n;
        if (e) {
            e()
        }
    };
    a.prototype.LookupPhraseChunkId = function(e, j) {
        var f = this.PhraseChunkMap.length;
        for (var g = 0; g < f; g++) {
            var h = this.PhraseChunkMap[g][0];
            var k = MadCap.String.Compare(e, h);
            if (k == 0) {
                if (j < this.PhraseChunkMap[g][1]) {
                    return g - 1
                } else {
                    if (j == this.PhraseChunkMap[g][1]) {
                        return g
                    }
                }
            } else {
                if (k == -1) {
                    return g - 1
                }
            }
        }
        return f - 1
    };
    a.prototype.LoadTopic = function(g) {
        var f = $.Deferred();
        var e = MadCap.Utilities.GetChunkId(this.TopicChunkMap, g, function(i, h) {
            if (i < h) {
                return -1
            } else {
                if (i == h) {
                    return 0
                } else {
                    return 1
                }
            }
        });
        if (e == -1) {
            f.resolve()
        } else {
            MadCap.Utilities.Require([this.HelpSystem.GetPath() + "Data/SearchTopic_Chunk" + e + ".js"], function(h) {
                f.resolve(g, h[g])
            })
        }
        return f.promise()
    };
    a.prototype.LoadUrl = function(g) {
        var f = $.Deferred();
        var e = MadCap.Utilities.GetChunkId(this.UrlChunkMap, g, function(i, h) {
            return MadCap.String.Compare(i, h)
        });
        if (e == -1) {
            f.resolve()
        } else {
            MadCap.Utilities.Require([this.HelpSystem.GetPath() + "Data/SearchUrl_Chunk" + e + ".js"], function(h) {
                f.resolve(g, h[g])
            })
        }
        return f.promise()
    };
    a.prototype.LoadTopicByUrl = function(f) {
        var e = this;
        return this.LoadUrl(f).then(function(g, h) {
            return e.LoadTopic(h)
        })
    };
    a.prototype.LoadStem = function(j) {
        var g = this;
        var f = $.Deferred();
        var i = MadCap.Utilities.GetChunkIds(this.StemChunkMap, j, function(l, k) {
            return MadCap.String.Compare(l, k)
        });
        if (i.length === 0) {
            f.resolve()
        } else {
            var h = [];
            var e = Object.create(null);
            $.each(i, function(l, k) {
                h.push(g.LoadStemChunk(k).then(function(m) {
                    $.extend(e, m[j])
                }))
            });
            $.when.apply(this, h).done(function() {
                f.resolve(e)
            }, this)
        }
        return f.promise()
    };
    a.prototype.LoadStemChunk = function(f) {
        var e = $.Deferred();
        MadCap.Utilities.Require([this.HelpSystem.GetPath() + "Data/SearchStem_Chunk" + f + ".js"], function(g) {
            e.resolve(g)
        });
        return e.promise()
    };
    a.prototype.LoadPhrase = function(e, h) {
        var g = $.Deferred();
        var f = this.LookupPhraseChunkId(e, h);
        MadCap.Utilities.Require([this.HelpSystem.GetPath() + "Data/SearchPhrase_Chunk" + f + ".js"], function(j) {
            var i;
            if (j[e]) {
                i = j[e][h]
            }
            g.resolve(h, i)
        });
        return g.promise()
    };
    b.SearchQuery = function(g, f, e) {
        function h(n, p) {
            var j = MadCap.Utilities.HasRuntimeFileType("TriPane");
            var m = false;
            for (var l = 0; l < p.length; l++) {
                var k = p[l][0];
                var o = p[l][1];
                if (!MadCap.String.IsNullOrEmpty(o)) {
                    n += (!m && j ? "?" : "&") + k + "=" + o;
                    m = true
                }
            }
            return n
        }
        this.Query = g;
        this.Filter = f;
        this.PageIndex = e;
        this.ToString = function() {
            return h(this.Query, [
                [b.SearchQuery._filter, this.Filter],
                [b.SearchQuery._pageIndex, this.PageIndex]
            ])
        }
    };
    b.SearchQuery._query = "q";
    b.SearchQuery._filter = "f";
    b.SearchQuery._pageIndex = "p";
    b.SearchQuery.Parse = function(i) {
        var g = new MadCap.Utilities.Url(i);
        var h = g.PlainPath;
        if (MadCap.String.IsNullOrEmpty(h)) {
            h = g.QueryMap.GetItem(b.SearchQuery._query)
        }
        if (!MadCap.String.IsNullOrEmpty(h)) {
            h = decodeURIComponent(h)
        }
        var f = g.QueryMap.GetItem(b.SearchQuery._filter);
        if (f) {
            f = decodeURIComponent(f)
        }
        var e = g.QueryMap.GetItem(b.SearchQuery._pageIndex);
        if (e != null) {
            e = parseInt(e)
        }
        return new b.SearchQuery(h, f, e)
    };
    b.SearchResult = function(h, g, f, e) {
        this.Score = h;
        this.Title = g;
        this.Link = f;
        this.AbstractText = e
    };
    b.Filters = function(f) {
        var e = f;
        this.Load = function(g) {
            e.LoadSearchFilters().then(function() {
                e.LoadAllConcepts(function() {
                    g()
                })
            }, null, null)
        }
    };
    b.SynonymFile = function(e, f) {
        this.Stemmer = f;
        this.WordToStem = new MadCap.Utilities.Dictionary(true);
        this.Directionals = new MadCap.Utilities.Dictionary(true);
        this.DirectionalStems = new MadCap.Utilities.Dictionary(true);
        this.Groups = new MadCap.Utilities.Dictionary(true);
        this.GroupStems = new MadCap.Utilities.Dictionary(true);
        this.GroupStemSources = new MadCap.Utilities.Dictionary(true);
        this.LoadSynonymFile(e)
    };
    var d = b.SynonymFile;
    d.prototype.LoadSynonymFile = function(E) {
        var D = MadCap.Dom.GetChildNodeByTagName(E, "Groups", 0);
        var l = MadCap.Dom.GetChildNodeByTagName(E, "Directional", 0);
        if (l != null) {
            var o = l.childNodes.length;
            for (var A = 0; A < o; A++) {
                var n = l.childNodes[A];
                if (n.nodeName == "DirectionalSynonym") {
                    var y = MadCap.Dom.GetAttribute(n, "From");
                    var m = MadCap.Dom.GetAttribute(n, "To");
                    var r = MadCap.Dom.GetAttributeBool(n, "Stem", false);
                    var g = MadCap.Dom.GetAttribute(n, "FromStem");
                    var p = MadCap.Dom.GetAttribute(n, "ToStem");
                    if (r) {
                        if (g == null) {
                            g = this.Stemmer.stemWord(y)
                        }
                    }
                    if (p == null) {
                        p = this.Stemmer.stemWord(m)
                    }
                    if (y != null && m != null) {
                        if (r) {
                            this.DirectionalStems.Add(g, p);
                            this.WordToStem.Add(y, g);
                            this.WordToStem.Add(m, p)
                        } else {
                            this.Directionals.Add(y, p);
                            this.WordToStem.Add(m, p)
                        }
                    }
                }
            }
        }
        if (D != null) {
            var o = D.childNodes.length;
            for (var A = 0; A < o; A++) {
                var n = D.childNodes[A];
                if (n.nodeName == "SynonymGroup") {
                    var v = new Array();
                    var w = new Array();
                    var r = MadCap.Dom.GetAttributeBool(n, "Stem", false);
                    var t = n.childNodes.length;
                    for (var z = 0; z < t; z++) {
                        var C = n.childNodes[z];
                        if (C.nodeType != 1) {
                            continue
                        }
                        v.push(C.firstChild.nodeValue)
                    }
                    for (var z = 0; z < t; z++) {
                        var C = n.childNodes[z];
                        if (C.nodeType != 1) {
                            continue
                        }
                        var F = MadCap.Dom.GetAttribute(C, "Stem");
                        if (F == null) {
                            F = this.Stemmer.stemWord(C.firstChild.nodeValue)
                        }
                        this.WordToStem.Add(C.firstChild.nodeValue, F);
                        w.push(F)
                    }
                    var u = v.length;
                    for (var z = 0; z < u; z++) {
                        var B = v[z];
                        var f = w[z];
                        for (var x = 0; x < u; x++) {
                            var e = v[x];
                            if (r) {
                                var s = this.GroupStemSources.GetItem(B);
                                if (s == null) {
                                    s = new MadCap.Utilities.Dictionary();
                                    this.GroupStemSources.Add(B, s)
                                }
                                s.Add(e, f)
                            } else {
                                var s = this.GroupStemSources.GetItem(B);
                                if (s == null) {
                                    s = new MadCap.Utilities.Dictionary();
                                    this.Groups.Add(B, s)
                                }
                                s.Add(e, f)
                            }
                        }
                    }
                    var q = w.length;
                    for (var z = 0; z < q; z++) {
                        var f = w[z];
                        for (var x = 0; x < q; x++) {
                            var h = w[x];
                            var s = this.GroupStems.GetItem(f);
                            if (s == null) {
                                s = new MadCap.Utilities.Dictionary();
                                this.GroupStems.Add(f, s)
                            }
                            s.Add(h, f)
                        }
                    }
                }
            }
        }
    };
    d.prototype.AddSynonymStems = function(e, i, g) {
        var f = this.Directionals.GetItem(e);
        if (f != null) {
            g.AddUnique(f)
        }
        f = this.DirectionalStems.GetItem(i);
        if (f != null) {
            g.AddUnique(f)
        }
        var h = this.Groups.GetItem(e);
        if (h != null) {
            h.ForEach(function(j, k) {
                g.AddUnique(j);
                return true
            })
        }
        h = this.GroupStems.GetItem(i);
        if (h != null) {
            h.ForEach(function(j, k) {
                g.AddUnique(j);
                return true
            })
        }
    }
})();
/*
 * Copyright MadCap Software
 * http://www.madcapsoftware.com/
 * Unlicensed use is strictly prohibited
 *
 * v13.2.6355.27565
 */
(function() {
    if (!MadCap.Utilities.HasRuntimeFileType("Topic")) {
        return
    }
    MadCap.CreateNamespace("Topic");
    var j = MadCap.Topic;
    var z = MadCap.TextEffects;
    var A = MadCap.Utilities.HasRuntimeFileType("TriPane");
    j.Expand = function(O) {
        var P = new z.ExpandingControl(O.parentNode);
        P.Toggle()
    };
    j.DropDown = function(O) {
        var P = new z.DropDownControl(O.parentNode.parentNode);
        P.Toggle()
    };
    j.Toggle = function(O) {
        var P = new z.TogglerControl(O);
        P.Toggle()
    };
    j.ThumbPopup_Click = function(O) {
        var P = j.ShowThumbnailPopup(O, this, "click");
        if (O.preventDefault) {
            O.preventDefault()
        }
    };
    j.ThumbPopup_Hover = function(O) {
        var P = j.ShowThumbnailPopup(O, this, "mouseleave")
    };
    j.ShowThumbnailPopup = function(aq, ar, am) {
        var al = 10;
        var ag = 1;
        var ac = 10;
        var S = $(ar).children("img")[0];
        var af = parseInt(MadCap.Dom.Dataset(S, "mcWidth"));
        var Z = parseInt(MadCap.Dom.Dataset(S, "mcHeight"));
        var O = Z / af;
        var ao = document.documentElement.clientWidth - ((al + ag + ac) * 2);
        var ak = document.documentElement.clientHeight - ((al + ag + ac) * 2);
        if (Z > ak) {
            Z = ak;
            af = Z / O
        }
        if (af > ao) {
            af = ao;
            Z = af * O
        }
        var U = new MadCap.Utilities.Url(document.location.href);
        var ap = $(S).offset().top;
        var au = $(S).offset().left;
        var ax = MadCap.Dom.GetAttribute(ar, "href");
        var aj = MadCap.Dom.GetAttribute(ar, "data-mc-popup-alt");
        var ae = Z + ((ag + ac) * 2);
        var ab = af + ((ag + ac) * 2);
        var aa = (ap + (S.offsetHeight / 2)) - (ae / 2);
        var W = (au + (S.offsetWidth / 2)) - (ab / 2);
        var V = MadCap.Dom.GetScrollPosition();
        var ah = V.Y;
        var Q = ah + document.documentElement.clientHeight;
        var at = V.X;
        var P = at + document.documentElement.clientWidth;
        var X = ah + al;
        var ai = at + al;
        var Y = Q - al;
        var R = P - al;
        if (aa < X) {
            aa = X
        }
        if (W < ai) {
            W = ai
        }
        if (aa + ae > Y) {
            aa = Y - ae
        }
        if (W + ab > R) {
            W = R - ab
        }
        if ($(".title-bar.sticky.is-stuck")) {
            if (aa < $(".title-bar.sticky.is-stuck").innerHeight()) {
                aa += $(".title-bar.sticky.is-stuck").innerHeight() - aa + al
            }
        }
        var T = $("<div></div>");
        T.addClass("MCPopupContainer");
        var an = document.createElement("img");
        $(an).addClass("MCPopupFullImage");
        an.setAttribute("src", ax);
        an.setAttribute("alt", aj);
        an.setAttribute("tabindex", "0");
        T.bind(am, function() {
            MadCap.DEBUG.Log.AddLine(am);
            T.animate({
                top: aw,
                left: ad
            }, 200, function() {
                T.remove()
            });
            $(an).animate({
                width: S.offsetWidth,
                height: S.offsetHeight
            }, 200);
            $(av).animate({
                opacity: 0
            }, 200, function() {
                MadCap.TextEffects.RemoveBackgroundTint()
            })
        });
        T.bind("keydown", function(ay) {
            var ay = ay || window.event;
            if (ay.keyCode != 27 && ay.keyCode != 13) {
                return
            }
            T.remove();
            MadCap.TextEffects.RemoveBackgroundTint()
        });
        T.append(an);
        document.body.appendChild(T[0]);
        var aw = ap - (ag + ac);
        var ad = au - (ag + ac);
        if (MadCap.IsIBooks()) {
            $idealContainer = $(ar).parentsUntil("body").last();
            af = $idealContainer[0].offsetWidth * 0.9;
            Z = af * O;
            W = $idealContainer.offset().left;
            T.css({
                top: aw,
                left: ad
            }).animate({
                top: aa,
                left: W,
                width: af,
                height: Z
            }, 200)
        } else {
            T.css({
                top: aw,
                left: ad,
                zIndex: "1"
            }).animate({
                top: aa,
                left: W
            }, 200)
        }
        $(an).css({
            width: S.offsetWidth,
            height: S.offsetHeight
        }).animate({
            width: af,
            height: Z
        }, 200);
        var av = MadCap.TextEffects.AddBackgroundTint(null, document.body);
        $(av).animate({
            opacity: 0.5
        }, 200);
        an.focus()
    };
    j.HelpControl_Click = function(P) {
        var O = this;
        j.GetHelpControlLinks(this, function(W) {
            var R = new MadCap.Utilities.Url(document.location.href);
            for (var S = W.length - 1; S >= 0; S--) {
                var Q = W[S];
                Q.Title = "t" in Q ? Q.t : "Title" in Q ? Q.Title : null;
                var T = "Url" in Q ? Q.Url : "Link" in Q ? Q.Link : null;
                if (T != null && typeof T != "string") {
                    if (T.FullPath == R.FullPath) {
                        W.Remove(S)
                    }
                    T = T.ToRelative(R);
                    Q.Link = T.FullPath
                }
            }
            if (!$(O).hasClass("MCHelpControl-Related")) {
                W.sort(function(Y, X) {
                    return Y.Title.localeCompare(X.Title)
                })
            }
            var U = new MadCap.Utilities.Dictionary();
            for (var S = W.length - 1; S >= 0; S--) {
                var V = W[S];
                var T = V.Link;
                if (U.GetItem(T)) {
                    W.Remove(S);
                    continue
                }
                U.Add(V.Link, true)
            }
            z.CreateLinkListPopup(W, document.body, P.pageY, P.pageX, O)
        }, null);
        P.preventDefault();
        P.stopPropagation()
    };
    j.GetHelpControlLinks = function(U, Y) {
        var X = new Array();
        var Q = $(U);
        if (p && !p.InPreviewMode) {
            if (N()) {
                var T = Q.attr("data-mc-keywords");
                if (T != null) {
                    if (T == "") {
                        Y(X)
                    }
                    var W = T.split(";");
                    MadCap.Utilities.AsyncForeach(W, function(Z, aa) {
                        p.FindIndexEntry(Z, function(ab, ac) {
                            if (ac != null && ac.linkList) {
                                X = X.concat(ac.linkList)
                            }
                            aa()
                        })
                    }, function() {
                        Y(p.SortLinkList(X))
                    });
                    return
                } else {
                    var S = Q.attr("data-mc-concepts");
                    if (S != null) {
                        p.GetConceptsLinks(S).then(Y);
                        return
                    }
                }
            }
        }
        var P = Q.attr("data-mc-topics");
        if (P != null) {
            topicPairs = P.split("||");
            if (topicPairs == "") {
                Y(X)
            }
            for (var V = 0, R = topicPairs.length; V < R; V++) {
                var O = topicPairs[V].split("|");
                X[X.length] = {
                    Title: O[0],
                    Link: O[1]
                }
            }
        }
        Y(X)
    };
    j.Hyperlink_Onclick = function(S) {
        var R = $(this);
        if (R.hasClass("MCTopicPopup") || R.hasClass("MCPopupThumbnailLink") || R.hasClass("MCHelpControl") || R.hasClass("reply-comment-button")) {
            return
        }
        var O = MadCap.Dom.GetAttribute(this, "href");
        if (O == null || MadCap.String.StartsWith(O, "http:") || MadCap.String.StartsWith(O, "https:")) {
            return
        }
        var Q = MadCap.Dom.GetAttribute(this, "target");
        if (Q != null) {
            return
        }
        if (N()) {
            var P = new MadCap.Utilities.Url(document.location.href);
            if (MadCap.String.StartsWith(O, "#")) {
                P = new MadCap.Utilities.Url(P.PlainPath + O)
            } else {
                if (MadCap.String.Contains(O, "javascript")) {
                    return
                } else {
                    P = P.ToFolder().CombinePath(O)
                }
            }
            MadCap.Utilities.CrossFrame.PostMessageRequest(parent, "navigate-topic", [P.FullPath], null);
            S.preventDefault()
        } else {
            MadCap.Utilities.Url.OnNavigateTopic.call(R, S)
        }
    };
    j.ScrollToBookmark = function(R) {
        R = R.replace(/([ #;?%&,.+*~\':"!^$[\]()=>|\/@])/g, "\\$1");
        var O = $("#" + R);
        if (O.length == 0) {
            O = $("[name = '" + R + "']")
        }
        if (O.length > 0) {
            q(O[0], false);
            var Q = O.offset().top;
            if ($(".title-bar.sticky").length > 0) {
                var P = $(".title-bar.sticky").innerHeight();
                $("html, body").animate({
                    scrollTop: Q - P
                }, 0)
            } else {
                $("html, body").animate({
                    scrollTop: Q
                })
            }
        }
    };
    $(function(O) {
        MadCap.Utilities.LoadHandlers.MadCapTopic = j.Init;
        s(O)
    });

    function C(O) {
        M()
    }

    function M() {
        var O = $(".feedback-comments-wrapper");
        if (p && p.IsResponsive && parent != window) {
            O.addClass("feedback-embedded");
            MadCap.Utilities.CrossFrame.PostMessageRequest(parent, "get-parent-window-width", null, function(Q) {
                var P = parseInt(Q[0]);
                if (p.IsTabletLayout(P)) {
                    if (!O.hasClass("responsive")) {
                        O.addClass("responsive")
                    }
                } else {
                    if (O.hasClass("responsive")) {
                        O.removeClass("responsive")
                    }
                }
            })
        } else {
            if (O.hasClass("responsive")) {
                O.removeClass("responsive")
            }
        }
    }

    function s(O) {
        $(window).resize(C);
        $(window).hashchange(g);
        j.Init(document)
    }
    j.Init = function(Q) {
        $("input, textarea", Q).placeholder();
        if (N() || B()) {
            $(".MCWebHelpFramesetLink", Q).hide()
        }
        $(Q).on("click", "a, area", MadCap.Topic.Hyperlink_Onclick);
        $(".MCPopupThumbnailPopup", Q).click(MadCap.Topic.ThumbPopup_Click);
        $(".MCPopupThumbnailHover", Q).mouseover(MadCap.Topic.ThumbPopup_Hover);
        $("a.MCHelpControl", Q).click(MadCap.Topic.HelpControl_Click);
        $(".print-button", Q).click(function(X) {
            window.print()
        });
        $(".expand-all-button", Q).click(function(Y) {
            var X = $(this);
            if (X.hasClass("expand-all-button")) {
                MadCap.TextEffects.TextEffectControl.ExpandAll("open")
            } else {
                if (X.hasClass("collapse-all-button")) {
                    MadCap.TextEffects.TextEffectControl.ExpandAll("close")
                }
            }
            MadCap.Utilities.ToggleButtonState(this)
        });
        $(".remove-highlight-button", Q).click(function(X) {
            H()
        });
        $(".previous-topic-button", Q).click(function(X) {
            MadCap.Utilities.CrossFrame.PostMessageRequest(parent, "navigate-previous")
        });
        $(".next-topic-button", Q).click(function(X) {
            MadCap.Utilities.CrossFrame.PostMessageRequest(parent, "navigate-next")
        });
        if (MadCap.String.Contains(navigator.userAgent, "iphone", false)) {
            window.scrollTo(0, 1)
        }
        if (MadCap.IsIOS() && A) {
            var P = $("<div id='ios-wrapper'></div>").appendTo(document.body);
            var U = P[0];
            for (var T = document.body.childNodes.length - 2; T >= 0; T--) {
                var R = document.body.childNodes[T];
                U.insertBefore(R, U.firstChild)
            }
        }
        d();
        var W = parent;
        if (B()) {
            W = parent.parent
        }
        var S = $(document.documentElement).attr("data-mc-path-to-help-system");
        var V = "Data/HelpSystem.xml";
        if (S) {
            V = S + V
        }
        var O = new MadCap.Utilities.Url(V);
        MadCap.WebHelp.HelpSystem.LoadHelpSystem(O.FullPath).done(function(X) {
            p = X;
            x()
        })
    };

    function h() {
        var P = $("ul[data-mc-toc]");
        var O;
        if (!A) {
            O = e()
        }
        P.each(function() {
            var Q = this;
            var R = new MadCap.WebHelp.TocPane("Toc", p, this, true);
            R._TocType = O.TocType;
            R._TocPath = O.TocType == "Toc" ? O.TocPath : O.BrowseSequencesPath;
            R._TocHref = O.Href;
            R.Init(function() {
                if (MadCap.Dom.GetAttributeBool(Q, "data-mc-top-nav-menu", false)) {
                    $(window).trigger("resize")
                }
            })
        })
    }

    function F() {
        var P = $("div.breadcrumbs[data-mc-toc]");
        var O;
        if (!A) {
            O = e()
        }
        P.each(function() {
            var Q = new MadCap.WebHelp.Breadcrumbs("Toc", p, this, true);
            Q._TocType = O.TocType;
            Q._TocPath = O.TocType == "Toc" ? O.TocPath : O.BrowseSequencesPath;
            Q._TocHref = O.Href;
            Q.Init()
        })
    }

    function r() {
        var P = $("div.miniToc[data-mc-toc]");
        var O;
        if (!A) {
            O = e()
        }
        P.each(function() {
            var Q = new MadCap.WebHelp.MiniToc("Toc", p, this);
            Q._TocType = O.TocType;
            Q._TocPath = O.TocType == "Toc" ? O.TocPath : O.BrowseSequencesPath;
            Q._TocHref = O.Href;
            Q.Init()
        })
    }

    function e() {
        var O = p.GetMasterHelpsystem().GetContentPath();
        var R = new MadCap.Utilities.Url(document.location.href);
        var Q = R.ToFolder().CombinePath(O);
        var P = R.ToRelative(Q);
        return p.GetTocData(new MadCap.Utilities.Url(P.FullPath))
    }

    function x() {
        var P = MadCap.Utilities.Url.CurrentHash();
        if (P.length > 0) {
            var O = new MadCap.Utilities.Url(P.substring(1));
            J(O.ToNoQuery().FullPath);
            if (!$("html").hasClass("pulseTopic")) {
                $(window).trigger("hashchange")
            }
        }
        m();
        h();
        F();
        r();
        if (p && p.LiveHelpEnabled) {
            f = MadCap.WebHelp.LoadFeedbackController(p.LiveHelpServer);
            f.Init(function() {
                if (f.FeedbackActive) {
                    MadCap.Utilities.CrossFrame.PostMessageRequest(parent, "get-csh-id", null, function(Q) {
                        var R = Q != null ? Q[0] : null;
                        if (l != null) {
                            $(document.documentElement).addClass("has-topic");
                            f.LogTopic(l, R, function() {
                                var S = $(".feedback-comments-wrapper");
                                if (!B() && !b() && !c()) {
                                    if (!f.PulseEnabled) {
                                        S.removeClass("hidden");
                                        a = $("#new-comment-form").attr("data-comment-length-exceeded-message") || "The maximum comment length was exceeded by {n} characters.";
                                        f.GetAnonymousEnabled(p.LiveHelpOutputId, function(U) {
                                            y = U;
                                            if (U) {
                                                $(document.documentElement).addClass("feedback-anonymous-enabled")
                                            }
                                        });
                                        var T = MadCap.Utilities.Store.getItem("LiveHelpUsername");
                                        $(".username").val(T);
                                        $(".comment-submit").click(G);
                                        $(".feedback-comments-wrapper .comments").on("click", ".reply-comment-button", K);
                                        t()
                                    } else {
                                        if (f.PulseActive) {
                                            k(function(U) {
                                                if (U) {
                                                    var V = f.PulseServer + U;
                                                    L(V)
                                                } else {
                                                    f.GetPulseStreamID(l, function(W) {
                                                        if (W == "00000000-0000-0000-0000-000000000000") {
                                                            return
                                                        }
                                                        var X = f.PulseServer + "streams/" + W + "/activities?frame=stream";
                                                        L(X)
                                                    })
                                                }
                                            })
                                        }
                                    }
                                }
                            })
                        }
                    })
                }
            });
            M()
        }
    }

    function g(P) {
        var O = new MadCap.Utilities.Url(document.location.href);
        if (!MadCap.String.IsNullOrEmpty(O.Fragment)) {
            var Q = O.Fragment.substring(1);
            Q = MadCap.Utilities.Url.StripInvalidCharacters(Q);
            j.ScrollToBookmark(Q)
        }
    }

    function J(O) {
        O = MadCap.Utilities.Url.StripInvalidCharacters(O);
        var P = $("[name='" + O + "']");
        if (P.length > 0) {
            q(P[0], false)
        }
    }

    function N() {
        return window.name == "topic" && !MadCap.Utilities.HasRuntimeFileType("Default")
    }

    function B() {
        return window.name == "MCPopup" && !MadCap.Utilities.HasRuntimeFileType("Default")
    }

    function b() {
        return $("html").hasClass("templateTopic")
    }

    function c() {
        var O = $(document.documentElement).attr("data-mc-community-features");
        return O && O.toLowerCase() == "disabled"
    }

    function m() {
        MadCap.Utilities.CrossFrame.PostMessageRequest(parent, "get-href", null, function(R) {
            if (R) {
                var P = new MadCap.Utilities.Url(R[0]);
                var O = new MadCap.Utilities.Url(P.Fragment.substring(1));
                var Q = P.QueryMap.GetItem("BrowseSequencesPath");
                p.SetBrowseSequencePath(Q, O)
            }
        })
    }

    function G(R) {
        var O = $(this).closest(".comment-form-wrapper");
        var Q = null;
        var V = O.children(".username-field").val();
        var P = O.children(".subject-field").val();
        var U = O.find(".body-field").val();
        var S = null;
        var T = O.parent();
        if (T.hasClass("comment")) {
            S = T.attr("data-mc-comment-id")
        }
        o(V, P, U, S)
    }

    function o(T, P, S, R) {
        if (y) {
            MadCap.Utilities.Store.setItem("LiveHelpUsername", T);
            try {
                f.AddComment(l, null, T, P, S, R, t)
            } catch (O) {
                var Q = a.replace(/{n}/g, O.Data.ExceedAmount);
                alert(Q)
            }
        } else {
            MadCap.Utilities.CrossFrame.PostMessageRequest(parent, "login-user", null, function(X) {
                var W = X[0];
                if (W != null) {
                    try {
                        f.AddComment(l, W, T, P, S, R, t)
                    } catch (U) {
                        var V = a.replace(/{n}/g, U.Data.ExceedAmount);
                        alert(V)
                    }
                }
            })
        }
    }

    function K(P) {
        P.preventDefault();
        var Q = $(this).closest(".comment");
        if (Q.children(".comment-form-wrapper")[0] != null) {
            return
        }
        var O = $("#new-comment-form").clone();
        O.attr("id", null);
        O.children(".comment-submit").click(G);
        Q.children(".buttons").after(O);
        O.hide().slideDown()
    }

    function t() {
        MadCap.Utilities.CrossFrame.PostMessageRequest(parent, "get-user-guid", null, function(P) {
            var O = P[0];
            f.GetTopicComments(l, O, null, function(Q) {
                var S = MadCap.Utilities.Xhr.LoadXmlString(Q);
                var R = $(".comments");
                R.children().not(".mc-template").remove();
                D(S.documentElement, R)
            })
        })
    }

    function D(Z, W) {
        var Y = $(Z).children("Comment");
        var O = $(".comments .comment.mc-template");
        for (var V = 0, R = Y.length; V < R; V++) {
            var aa = $(Y[V]);
            var U = aa.attr("User");
            var X = aa.attr("DateUTC") || aa.attr("Date");
            var S = aa.attr("Subject");
            var Q = aa.attr("CommentID");
            var P = aa.children("Body").text();
            var T = O.clone();
            T.removeClass("mc-template");
            T.attr("data-mc-comment-id", Q);
            $(".username", T).text(U);
            $(".timestamp", T).text(X);
            $(".subject", T).text(S);
            $(".body", T).text(P);
            $(W).append(T);
            D(aa.children("Comments")[0], T)
        }
    }

    function k(O) {
        MadCap.Utilities.CrossFrame.PostMessageRequest(parent, "get-href", null, function(S) {
            var P = null;
            if (S) {
                var R = new MadCap.Utilities.Url(decodeURIComponent(S[0]));
                var Q = new MadCap.Utilities.Url(R.Fragment.substring(1));
                P = R.QueryMap.GetItem("PulsePath")
            }
            O(P)
        })
    }

    function L(Q) {
        var O = $(".feedback-comments-wrapper");
        O.empty();
        var P = $("<iframe name='topiccomments-html5' class='pulse-frame pulse-loading' title='Topic Comments' frameborder='0'></iframe>");
        P.appendTo(O);
        if (!($.browser.msie && parseInt($.browser.version, 10) === 7)) {
            P.attr("onload", "this.className='pulse-frame';")
        }
        P.attr("src", Q);
        if (!u) {
            O.removeClass("hidden")
        }
    }

    function H() {
        for (var O = 1; O <= 10; O++) {
            $("body").removeHighlight("SearchHighlight" + O)
        }
    }

    function d() {
        function O(P) {
            if (typeof P.nextElementSibling == "undefined") {
                return P.nextSibling == null || P.nextSibling.nodeType == 1 ? P.nextSibling : O(P.nextSibling)
            } else {
                return P.nextElementSibling
            }
        }
        MadCap.Utilities.CrossFrame.PostMessageRequest(parent, "get-href", null, function(X) {
            if (X) {
                var Q = new MadCap.Utilities.Url(X[0]);
                var T = Q.QueryMap.GetItem("Highlight");
                if (MadCap.String.IsNullOrEmpty(T)) {
                    return
                }
                var U = T.match(/"[^"]*"/g);
                if (U != null) {
                    for (var V = 0; V < U.length; V++) {
                        T = T.replace(U[V], "")
                    }
                }
                var Y = T.replace('"', "").split(" ");
                for (var W = 0; W < Y.length; W++) {
                    if (Y[W] == "") {
                        Y.splice(Y[W], 1);
                        W--
                    }
                }
                if (U != null) {
                    for (var V = 0; V < U.length; V++) {
                        Y.push(U[V].replace(/"/g, ""))
                    }
                }
                for (var W = 0; W < Y.length; W++) {
                    if ($.inArray(Y[W].toLowerCase(), MadCap.Utilities.StopWords) != -1) {
                        Y.splice(W, 1);
                        W--
                    }
                }
                for (var Z = 0; Z < Y.length; Z++) {
                    var R = Array("*[class*='MCExpandingBody']", "*[class*='MCDropDownHotSpot']", "*[data-mc-target-name]");
                    for (var ab = 0; ab < R.length; ab++) {
                        var P = $(R[ab]);
                        for (var S = 0; S < P.length; S++) {
                            var aa = O(P[S].parentElement);
                            if ((P[S].textContent != null && P[S].textContent.toLowerCase().indexOf(Y[Z].toLowerCase()) >= 0) || (aa != null && aa.textContent != null && aa.textContent.toLowerCase().indexOf(Y[Z].toLowerCase()) >= 0)) {
                                q(ab != 2 ? P[S] : P[S].firstChild)
                            }
                        }
                    }
                    $("body").highlight(Y[Z], "SearchHighlight SearchHighlight" + (Z + 1))
                }
            }
        })
    }

    function i(R, P, O, Q) {
        if (R == "") {
            return
        }
        I(document.body, R, P, O, Q);
        if (E && E.offsetTop > document.documentElement.clientHeight) {
            document.documentElement.scrollTop = E.offsetTop
        }
    }

    function w(R) {
        for (var Q = R.childNodes.length - 1; Q >= 1; Q--) {
            var O = R.childNodes[Q];
            var P = O.previousSibling;
            if (O.nodeType == 3 && P.nodeType == 3) {
                P.nodeValue = P.nodeValue + O.nodeValue;
                R.removeChild(O)
            }
        }
        for (var Q = 0; Q < R.childNodes.length; Q++) {
            w(R.childNodes[Q])
        }
    }

    function I(aa, R, S, Y, X) {
        var ad = null;
        if (X == "NGram") {
            ad = new RegExp(R, "g" + (Y ? "" : "i"))
        } else {
            var P = R.replace(/([*^$+?.()[\]{}|\\])/g, "\\$1");
            ad = new RegExp("(^|\\s|[.,;!#$/:?'\"()[\\]{}|=+*_\\-\\\\])" + P + "($|\\s|[.,;!#$/:?'\"()[\\]{}|=+*_\\-\\\\])", "g" + (Y ? "" : "i"))
        }
        for (var V = aa.childNodes.length - 1; V >= 0; V--) {
            var Q = aa.childNodes[V];
            I(Q, R, S, Y, X);
            if (Q.nodeType != 3 || Q.parentNode.nodeName == "SCRIPT") {
                continue
            }
            var U = Q;
            var ac = U.nodeValue;
            for (var W = ad.exec(ac); W != null; W = ad.exec(ac)) {
                var Z = W.index + (X == "NGram" ? 0 : W[1].length);
                var O = Z + R.length;
                var ab = document.createElement("span");
                ab.className = "highlight";
                ab.style.fontWeight = "bold";
                ab.style.backgroundColor = S.split(",")[0];
                ab.style.color = S.split(",")[1];
                var T = document.createElement("span");
                T.className = "SearchHighlight" + (v + 1);
                T.appendChild(document.createTextNode(ac.substring(Z, O)));
                ab.appendChild(T);
                U.nodeValue = ac.substring(0, Z);
                U.parentNode.insertBefore(ab, U.nextSibling);
                U.parentNode.insertBefore(document.createTextNode(ac.substring(O, ac.length)), ab.nextSibling);
                U = U.nextSibling.nextSibling;
                ac = U.nodeValue;
                if (E == null || ab.offsetTop < E.offsetTop) {
                    E = ab
                }
                q(ab)
            }
        }
    }

    function q(Q, O) {
        if (typeof O == "undefined") {
            O = true
        }
        var W = false;
        for (var V = Q.parentNode; V.nodeName != "BODY"; V = V.parentNode) {
            var Z = $(V);
            if (Z.hasClass("MCExpanding")) {
                var T = z.TextEffectControl.FindControl(Z[0]);
                if (T == null) {
                    T = new MadCap.Topic.ExpandingControl(V)
                }
                T.Open(O);
                W = true
            } else {
                if (Z.hasClass("MCDropDown")) {
                    var T = z.TextEffectControl.FindControl(Z[0]);
                    if (T == null) {
                        T = new MadCap.Topic.DropDownControl(V)
                    }
                    T.Open(O);
                    W = true
                } else {
                    var U = $(V).attr("data-mc-target-name");
                    if (U != null) {
                        var Y = MadCap.Dom.GetElementsByClassName("MCToggler", null, document.body);
                        for (var S = 0, P = Y.length; S < P; S++) {
                            var X = $(Y[S]).attr("data-mc-targets").split(";");
                            var aa = false;
                            for (var R = 0; R < X.length; R++) {
                                if (X[R] == U) {
                                    aa = true;
                                    break
                                }
                            }
                            if (!aa) {
                                continue
                            }
                            var T = z.TextEffectControl.FindControl(Y[S]);
                            if (T == null) {
                                T = new MadCap.Topic.TogglerControl(Y[S])
                            }
                            T.Open(O);
                            W = true;
                            break
                        }
                    }
                }
            }
        }
        return W
    }
    MadCap.Utilities.CrossFrame.AddMessageHandler(function(U, Q, T) {
        var S = {
            Handled: false,
            FireResponse: true
        };
        if (U == "print") {
            window.focus();
            window.print();
            S.Handled = true
        } else {
            if (U == "expand-all") {
                MadCap.TextEffects.TextEffectControl.ExpandAll("open");
                S.Handled = true
            } else {
                if (U == "collapse-all") {
                    MadCap.TextEffects.TextEffectControl.ExpandAll("close");
                    S.Handled = true
                } else {
                    if (U == "get-topic-id") {
                        T[T.length] = l;
                        S.Handled = true
                    } else {
                        if (U == "get-topic-url") {
                            T[T.length] = document.location.href;
                            S.Handled = true
                        } else {
                            if (U == "remove-highlight") {
                                H();
                                S.Handled = true
                            } else {
                                if (U == "get-bs-path") {
                                    var P = new MadCap.Utilities.Url(document.location.href);
                                    var R = P.QueryMap.GetItem("BrowseSequencePath");
                                    if (R == null) {
                                        R = MadCap.Dom.Dataset(document.documentElement, "mcBrowseSequencePath")
                                    }
                                    T[T.length] = R;
                                    T[T.length] = P.FullPath;
                                    S.Handled = true
                                } else {
                                    if (U == "reload-pulse") {
                                        MadCap.Utilities.CrossFrame.PostMessageRequest(frames["topiccomments-html5"], "reload");
                                        S.Handled = true
                                    } else {
                                        if (U == "logout-complete") {
                                            MadCap.Utilities.CrossFrame.PostMessageRequest(parent, "logout-complete");
                                            S.Handled = true
                                        } else {
                                            if (U == "set-pulse-login-id") {
                                                if (f != null) {
                                                    f.PulseUserGuid = Q[0]
                                                }
                                                MadCap.Utilities.CrossFrame.PostMessageRequest(parent, "set-pulse-login-id", Q);
                                                S.Handled = true
                                            } else {
                                                if (U == "resize-pulse") {
                                                    var O = $(".pulse-frame");
                                                    O.attr("scrolling", "no");
                                                    O.css("overflow", "hidden");
                                                    O.height(Q[1]);
                                                    S.Handled = true
                                                } else {
                                                    if (U == "show-comments") {
                                                        u = false;
                                                        S.Handled = true
                                                    } else {
                                                        if (U == "hide-comments") {
                                                            u = true;
                                                            S.Handled = true
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return S
    }, null);
    var n = new Array("#ffff66,#000000", "#a0ffff,#000000", "#99ff99,#000000", "#ff9999,#000000", "#ff66ff,#000000", "#880000,#ffffff", "#00aa00,#ffffff", "#886800,#ffffff", "#004699,#ffffff", "#990099,#ffffff");
    var v = 0;
    var E = null;
    var p = null;
    var f = null;
    var u = true;
    var y = false;
    var l = MadCap.Dom.Dataset(document.documentElement, "mcLiveHelp");
    var a = null
})();

var PopOverHelpers = {
    list: new Array(),
    contentList: null,
    helpSystemPath: 'Data/HelpSystem.xml',
    aliasPath: 'Data/Alias.xml',
    init: function (root) {
        if(root != undefined){
            PopOverHelpers.helpSystemPath = root+'/'+'Data/HelpSystem.xml';
            PopOverHelpers.aliasPath = root+'/'+'Data/Alias.xml';
        }
        var a0 = $(document.documentElement).attr("data-mc-path-to-help-system");
        var aY = PopOverHelpers.helpSystemPath;
        if (a0) {
            aY = a0 + aY
        }
        if (MadCap.WebHelp && MadCap.WebHelp.HelpSystem) {
            MadCap.WebHelp.HelpSystem.LoadHelpSystem(aY).done(function(a6) {
                PopOverHelpers.setList(a6);
            })
        }
    },
    setList:function(a6){
        var TT = new MadCap.WebHelp.AliasFile(PopOverHelpers.aliasPath,a6);
        TT.Load(function(d){
            if (d){
                var p = d.getElementsByTagName("Map");
                var pl = p.length;
                for (var m = 0; m < pl; m++) {
                    var id = p[m].getAttribute("ResolvedId");
                    var name = p[m].getAttribute("Name");
                    var location = p[m].getAttribute("Link");
                    PopOverHelpers.list[id] = {
                        name : p[m].getAttribute("Name"),
                        location : a6.ContentFolder + p[m].getAttribute("Link"),
                    };
                }
            }
        });
    },
    getPath:function(id){
        console.log(id);
        return PopOverHelpers.list[id];
    }
}
