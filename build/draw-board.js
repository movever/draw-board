define("mouse", [ "require", "exports", "module" ], function(e, t, n) {
    var r = function(e) {
        var t, n;
        t = 0, n = 0;
        for (;;) {
            t += e.offsetLeft, n += e.offsetTop;
            if (!(e = e.offsetParent)) break;
        }
        return {
            x: t,
            y: n
        };
    }, i = function(e, t) {
        var n = r(e);
        return {
            left: t.pageX - n.x,
            top: t.pageY - n.y
        };
    };
}), define("drag", [ "jquery", "mouse" ], function(e, t) {
    var n = function(n, r) {
        var i = e(n), s = r.dragging || e.noop, o = r.dragend || e.noop, u = r.dragcontinue || e.noop, a = r.dragpause || e.noop, f = r.dragstart || e.noop;
        i.each(function() {
            var n = e.proxy(function(e) {
                return t(this, e);
            }, this), r = e(this), i = {
                down: !1
            };
            r.mousedown(function(e) {
                if (i.down == 1) return !1;
                i.down = !0, i.downOffset = n(e), f.call(this, i.downOffset);
            }), r.mouseup(function(e) {
                i.down = !1, i.move == 1 && (o.call(this, i.downOffset, n(e)), i.move = !1);
            }), r.mouseout(function(e) {
                if (!i.down) return;
                a.call(this, n(e)), i.out = !0;
            });
            var l = function(e) {
                if (!i.down) return;
                i.out === !0 && u.call(this, n(e)), i.out = !1, i.move = !0, s.call(this, i.downOffset, n(e));
            };
            r.mousemove(l);
        });
    };
}), define("arrow", [], function() {
    return function(e, t, n) {
        var r = function(e, t, n) {
            e.save(), e.beginPath(), e.moveTo(t.left, t.top), e.lineTo(n.left, n.top), e.fillStyle = e.strokeStyle;
            var r = Math.atan((n.top - t.top) / (n.left - t.left)), i = Math.PI / 2 + r;
            n.left < t.left && (i -= Math.PI), e.translate(n.left, n.top), e.rotate(i);
            var s = 30 / 180 * Math.PI / 2, o = 15 * Math.tan(s);
            e.moveTo(0, 0), e.lineTo(o, 15), e.lineTo(-o, 15), e.stroke(), e.fill(), e.restore();
        };
        return {
            start: function(e) {},
            ing: function(e, n) {
                t.clearRect(0, 0, t.canvas.width, t.canvas.height), r(t, e, n);
            },
            end: function(i, s) {
                t.clearRect(0, 0, t.canvas.width, t.canvas.height);
                var o = n.color, u = function() {
                    e.strokeStyle = o, r(e, i, s);
                };
                u(), n.stack.push(u), n.rstack = [];
            }
        };
    };
}), define("util", [], function() {
    var e = function(e, t) {
        var n = t.left - e.left, r = t.top - e.top;
        return Math.sqrt(Math.pow(n, 2) + Math.pow(r, 2));
    };
    return {
        len: e
    };
}), define("round", [ "util" ], function(e) {
    var t = e.len;
    return function(e, n, r) {
        var i = e.canvas, s = n.canvas;
        return {
            ing: function(e, r) {
                n.clearRect(0, 0, s.width, s.height), n.beginPath(), n.arc(e.left + (r.left - e.left) / 2, e.top + (r.top - e.top) / 2, t(e, r) / 2, 0, 2 * Math.PI), n.stroke();
            },
            end: function(i, o) {
                n.clearRect(0, 0, s.width, s.height);
                var u = e.strokeStyle, a = e.lineWidth, f = function() {
                    e.save(), e.lineWidth = a, e.strokeStyle = u, e.beginPath(), e.arc(i.left + (o.left - i.left) / 2, i.top + (o.top - i.top) / 2, t(i, o) / 2, 0, 2 * Math.PI), e.stroke(), e.restore();
                };
                f(), r.stack.push(f), r.rstack = [];
            }
        };
    };
}), define("line", [], function() {
    return function(e, t, n) {
        var r = e.canvas, i = t.canvas;
        return {
            ing: function(e, n) {
                t.clearRect(0, 0, i.width, i.height), t.beginPath(), t.moveTo(e.left, e.top), t.lineTo(n.left, n.top), t.stroke();
            },
            end: function(r, s) {
                t.clearRect(0, 0, i.width, i.height);
                var o = e.strokeStyle, u = e.lineWidth, a = function() {
                    e.save(), e.strokeStyle = o, e.lineWidth = u, e.beginPath(), e.moveTo(r.left, r.top), e.lineTo(s.left, s.top), e.stroke(), e.restore();
                };
                a(), n.stack.push(a), n.rstack = [];
            }
        };
    };
}), define("curve", [], function() {
    return function(e, t, n) {
        var r = e.canvas, i = t.canvas, s = [];
        return {
            start: function(e) {
                t.beginPath(), t.lineJoin = "round", t.moveTo(e.left, e.top), s.push(e);
            },
            ing: function(e, n) {
                t.clearRect(0, 0, i.width, i.height), t.lineTo(n.left, n.top), s.push(n), t.stroke();
            },
            end: function() {
                t.clearRect(0, 0, i.width, i.height);
                var r = s.slice(0), o = e.strokeStyle, u = e.lineWidth, a = function() {
                    e.save(), e.strokeStyle = o, e.lineWidth = u, e.beginPath(), $.each(r, function(t, n) {
                        t === 0 ? e.moveTo(n.left, n.top) : e.lineTo(n.left, n.top);
                    }), e.stroke(), e.restore();
                };
                a(), n.stack.push(a), n.rstack = [], s = [];
            }
        };
    };
}), define("ease", [], function() {
    return function(e, t, n) {
        var r = e.canvas, i = t.canvas, s = [];
        return {
            ing: function(n, r) {
                function o() {
                    t.clearRect(0, 0, i.width, i.height), t.beginPath(), t.arc(Math.floor(r.left), Math.floor(r.top), 10, 0, 2 * Math.PI), t.stroke();
                }
                o = _.throttle(o, 140), o();
                var u = function() {
                    e.globalCompositeOperation = "destination-out", e.beginPath(), e.arc(Math.floor(r.left), Math.floor(r.top), 10, 0, 2 * Math.PI, !0), e.closePath(), e.fill(), e.globalCompositeOperation = "source-over";
                };
                u(), s.push(u);
            },
            end: function(e, t) {
                n.ctx2.clearRect(0, 0, n.canvas2.width, n.canvas2.height);
                var r = s.slice(0);
                n.stack.push(function() {
                    $.each(r, function() {
                        this();
                    });
                }), n.rstack = [], n.easeFn = [];
            }
        };
    };
}), define("draw-board", [ "require", "drag", "mouse", "arrow", "arrow", "round", "line", "curve", "ease", "util", "html2canvas" ], function(e) {
    var t = e("drag"), n = e("mouse"), r = e("arrow"), i = e("arrow"), s = e("round"), o = e("line"), u = e("curve"), a = e("ease"), f = e("util"), l = e("html2canvas"), c = function() {
        return !1;
    }, h = function(e) {
        var f = this;
        this.option = e || {}, this.type = e.type || "rect", this.lineWidth = e.lineWidth || 1, this.color = e.color || "rgb(0, 0, 0)", this.stack = [], this.rstack = [];
        var l = this.canvas1 = document.createElement("canvas"), c = this.$canvas1 = $(l), h = this.canvas2 = document.createElement("canvas"), p = this.$canvas2 = $(h), d = c.add(p), v = $("<div></div>").append(c, p);
        v.css({
            width: e.width,
            height: e.height,
            position: "relative"
        }), l.width = h.width = e.width, l.height = h.height = e.height, d.css({
            position: "absolute",
            left: 0,
            top: 0
        }), v.appendTo(e.parent), window.G_vmlCanvasManager && ($("#btn_eraser").hide(), l = window.G_vmlCanvasManager.initElement(l), h = window.G_vmlCanvasManager.initElement(h));
        var m = this.ctx1 = l.getContext("2d"), g = this.ctx2 = h.getContext("2d"), e = e || {
            clearBt: null,
            saveBt: null
        };
        m.save(), g.strokeStyle = this.color, m.strokeStyle = this.color, g.lineWidth = this.lineWidth, m.lineWidth = this.lineWidth;
        var y = {};
        $(h).mousemove(function(e) {
            y = n($(h).get(0), e);
        });
        var b = {};
        b.rect = i(m, g, f), b.round = s(m, g, f), b.line = o(m, g, f), b.ease = a(m, g, f), b.curve = u(m, g, f), m.canvas = l, g.canvas = h, b.arrow = r(m, g, f), t(h, {
            dragstart: function(e) {
                f.refuseSelection(), (b[f.type].start || $.noop)(e);
            },
            dragcontinue: function(e) {
                f.refuseSelection(), (b[f.type]["continue"] || $.noop)(e);
            },
            dragpause: function(e) {
                f.allowSelection(), (b[f.type].pause || $.noop)(e);
            },
            dragging: function(e, t) {
                b[f.type].ing(e, t);
            },
            dragend: function(e, t) {
                b[f.type].end(e, t), f.allowSelection();
            }
        });
    };
    h.prototype = {
        back: function() {
            this.ctx1.clearRect(0, 0, this.canvas1.width, this.canvas1.height);
            var e = this.stack.pop();
            e && this.rstack.push(e), this.drawStack();
        },
        forward: function() {
            this.ctx1.clearRect(0, 0, this.canvas1.width, this.canvas1.height);
            var e = this.rstack.pop();
            e && this.stack.push(e), this.drawStack();
        },
        drawStack: function() {
            $.each(this.stack, function() {
                this && this();
            });
        },
        setColor: function(e) {
            this.color = this.ctx1.strokeStyle = this.ctx2.strokeStyle = e;
        },
        setLineWidth: function(e) {
            this.lineWidth = this.ctx1.lineWidth = this.ctx2.lineWidth = e;
        },
        refuseSelection: function() {
            $("body").attr("unselectable", "on").css({
                "-webkit-user-select": "none",
                "-moz-user-select": "none",
                "-ms-user-select": "none",
                "-o-user-select": "none",
                "user-select": "none"
            }).bind("selectstart", c), this.clearSelection();
        },
        allowSelection: function() {
            $("body").attr("unselectable", "off").css({
                "-webkit-user-select": "auto",
                "-moz-user-select": "auto",
                "-ms-user-select": "auto",
                "-o-user-select": "auto",
                "user-select": "auto"
            }).unbind("selectstart", c);
        },
        clearSelection: function() {
            document.selection ? document.selection.empty() : window.getSelection && window.getSelection().removeAllRanges();
        },
        clear: function() {
            var e = this, t = this.canvas2, n = function() {
                e.ctx1.clearRect(0, 0, t.width, t.height), e.rstack = [];
            };
            n(), this.stack.push(n);
        },
        save: function(e) {
            if (!window.getComputedStyle) {
                alert("您的浏览器不支持");
                return;
            }
            var t;
            html2canvas($(e)[0] || $(this.option.parent)[0], {
                onrendered: function(e) {
                    var t = e.toDataURL("image/jpeg"), n = window.open();
                    $(n.document.body).append('<img src="' + t + '" />'), n.document.title = "保存绘图";
                }
            });
        }
    };
});;