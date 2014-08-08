;(function () {
    //两点间的距离
    var len = function(start, end){
            var w = end.left-start.left
            var h = end.top-start.top;
            return Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
        },
        ident = function () {
            return false;
        };

    /**
     * 为canvas添加绘图功能
     * @param canvas1和canvas2是两个重叠的canvas标签 canvas2在canvas1上面
     * 对于ie，不支持canvas，canvas1和canvas2是excanvas初始化的canvas对象
     */
    var DrawPanel = function(option) {
        var that = this;
        this.type = option.type || 'rect';
        this.lineWidth = option.lineWidth || 1;
        this.color = option.color || 'rgb(0, 0, 0)'
        this.stack = []; this.rstack = [];
        var canvas1 = this.canvas1 = document.createElement('canvas'), $canvas1 = this.$canvas1 = $(canvas1),
            canvas2 = this.canvas2 = document.createElement('canvas'), $canvas2 = this.$canvas2 = $(canvas2),
            $canvases = $canvas1.add($canvas2),
            $con = $('<div></div>').append($canvas1, $canvas2);
        $con.css({ width: option.width, height: option.height, position: 'relative' });
        canvas1.width = canvas2.width = option.width;
        canvas1.height = canvas2.height = option.height;
        $canvases.css({ position: 'absolute', left: 0, top: 0 });
        $con.appendTo(option.parent);
        
        if(window.G_vmlCanvasManager){
            $("#btn_eraser").hide();
            canvas1=window.G_vmlCanvasManager.initElement(canvas1);
            canvas2=window.G_vmlCanvasManager.initElement(canvas2);
        }

        var ctx1 = this.ctx1 = canvas1.getContext('2d');
        var ctx2 = this.ctx2 = canvas2.getContext('2d');
        var option = option || {
            clearBt: null, //清除按钮
            saveBt : null //保存按钮
        };
        ctx1.save();
        ctx2.strokeStyle = this.color;
        ctx1.strokeStyle = this.color;
        ctx2.lineWidth = this.lineWidth;
        ctx1.lineWidth = this.lineWidth;
        
        if (option.clearBt) {
            $(option.clearBt).click(function () {
                var draw = function () {
                    ctx1.clearRect(0, 0, canvas2.width, canvas2.height);
                    this.rstack = [];
                }
                draw();
                this.stack.push(draw);
            });
        }
        if (option.saveBt) {
            $(option.saveBt).click(function () {
                if (!window.getComputedStyle) { alert('您的浏览器不支持'); return; }
                var data;
                html2canvas($('#container').get(0), {
                    onrendered: function (canvas) {
                        var data = canvas.toDataURL('image/jpeg');
                        var w = window.open();
                        $(w.document.body).append('<img src="'+data+'" />');
                        w.document.title = '保存绘图';
                    }
                });
            });
        }
        var mouse = {};
        $(canvas2).mousemove(function(e){
            mouse = getMouseOffset($(canvas2).get(0), e);
        });
        var draw = {};
        draw.rect = {
            ing: function (start, end) {
                ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                ctx2.strokeRect(start.left, start.top, end.left - start.left, end.top - start.top);
            },
            end: function (start, end) {
                ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                var color = ctx1.strokeStyle;
                var lineWidth = ctx1.lineWidth;
                var draw = function () {
                    ctx1.save();
                    ctx1.lineWidth = lineWidth;
                    ctx1.strokeStyle = color;
                    ctx1.strokeRect(start.left, start.top, end.left - start.left, end.top - start.top);
                    ctx1.restore();
                }
                draw();
                that.stack.push(draw);
                that.rstack = [];
            }
        };
        draw.round = {
            ing: function (start, end) {
                ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                ctx2.beginPath();
                ctx2.arc( start.left + (end.left-start.left)/2, start.top + (end.top-start.top)/2, len(start, end)/2, 0, 2*Math.PI );
                ctx2.stroke();
            },
            end: function (start, end) {
                ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                var color = ctx1.strokeStyle;
                var lineWidth = ctx1.lineWidth;
                var draw = function () {
                    ctx1.save();
                    ctx1.lineWidth = lineWidth;
                    ctx1.strokeStyle = color;
                    ctx1.beginPath();
                    ctx1.arc( start.left + (end.left-start.left)/2, start.top + (end.top-start.top)/2, len(start, end)/2, 0, 2*Math.PI );
                    ctx1.stroke();
                    ctx1.restore();
                }
                draw();
                that.stack.push(draw);
                that.rstack = [];
            }
        };
        draw.line = {
            ing: function (start, end) {
                ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                ctx2.beginPath();
                ctx2.moveTo(start.left, start.top);
                ctx2.lineTo(end.left, end.top);
                ctx2.stroke();
            },
            end: function (start, end) {
                ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                var color = ctx1.strokeStyle;
                var lineWidth = ctx1.lineWidth;
                var draw = function () {
                    ctx1.save();
                    ctx1.strokeStyle = color;
                    ctx1.lineWidth = lineWidth;
                    ctx1.beginPath();
                    ctx1.moveTo(start.left, start.top);
                    ctx1.lineTo(end.left, end.top);
                    ctx1.stroke();
                    ctx1.restore();
                }
                draw();
                that.stack.push(draw);
                that.rstack = [];
            }
        };

        var easeFn = [];
        draw.ease = {
            ing: function (start, end) {
                function c2(){
                    ctx2.clearRect(0,0,canvas2.width,canvas2.height);
                    ctx2.beginPath();
                    ctx2.arc(Math.floor(end.left), Math.floor(end.top), 10, 0, 2*Math.PI);
                    ctx2.stroke();
                }
                c2 = _.throttle(c2, 140);
                c2();
                var draw = function () {
                    ctx1.globalCompositeOperation = "destination-out";  //鼠标覆盖区域不显示
                    ctx1.beginPath();
                    ctx1.arc(Math.floor(end.left), Math.floor(end.top), 10, 0, 2*Math.PI, true);
                    ctx1.closePath();
                    ctx1.fill();
                    ctx1.globalCompositeOperation = "source-over";
                }
                draw();
                easeFn.push(draw);
            },
            end: function (start, end) {
                that.ctx2.clearRect(0,0,that.canvas2.width,that.canvas2.height);
                var stackFn = easeFn.slice(0);
                that.stack.push(function () {
                    $.each(stackFn, function () {
                        this();
                    });
                });
                that.rstack = [];
                that.easeFn = [];
            }
        };
        var points = [];
        draw.curve = {
            start: function (position) {
                ctx2.beginPath();
                ctx2.lineJoin = 'round';
                ctx2.moveTo(position.left, position.top);
                points.push(position);
            },
            ing: function (start, end) {
                ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                ctx2.lineTo(end.left, end.top);
                points.push(end);
                ctx2.stroke();
            },
            end: function () {
                ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                //回退或前进功能中重绘时会重新读取该数组，而points是动态变化的，所以拷贝一份出来
                var stackPoints = points.slice(0);
                var color = ctx1.strokeStyle;
                var lineWidth = ctx1.lineWidth;
                var draw = function () {
                    ctx1.save();
                    ctx1.strokeStyle = color;
                    ctx1.lineWidth = lineWidth;
                    ctx1.beginPath();
                    $.each(stackPoints, function(i, p){
                        if (i===0) {
                            ctx1.moveTo(p.left, p.top);
                        } else {
                            ctx1.lineTo(p.left, p.top);
                        }
                    });
                    ctx1.stroke();
                    ctx1.restore();
                }
                draw();
                that.stack.push(draw);
                that.rstack = [];
                points = [];
            }
        };
        ctx1.canvas = canvas1;
        ctx2.canvas = canvas2;
        draw.arrow = window.shape_arrow(ctx1, ctx2, that);
        $(canvas2).drag({
            dragstart: function (position) {
                that.refuseSelection();
                (draw[that.type].start || $.noop)(position);
            },
            dragcontinue: function (position) {
                that.refuseSelection();
                (draw[that.type].continue || $.noop)(position);
            },
            dragpause: function (position) {
                that.allowSelection();
                (draw[that.type].pause || $.noop)(position);
            },
            dragging: function (start, end) {
                draw[that.type].ing(start, end);
            },
            dragend: function (start, end) {
                draw[that.type].end(start, end);
                that.allowSelection();
            }
        });
    };
    DrawPanel.prototype = {
        //撤消
        back: function () {
            this.ctx1.clearRect(0, 0, this.canvas1.width, this.canvas1.height);
            var pop = this.stack.pop();
            if (pop) {
                this.rstack.push(pop);
            }
            this.drawStack();
        },
        //重做
        forward: function () {
            this.ctx1.clearRect(0, 0, this.canvas1.width, this.canvas1.height);
            var pop = this.rstack.pop();
            if (pop) {
                this.stack.push(pop);
            }
            this.drawStack();
        },
        //重绘
        drawStack: function () {
            $.each(this.stack, function () {
                this && this();
            });
        },
        setColor: function (color) {
            this.color = this.ctx1.strokeStyle = this.ctx2.strokeStyle = color;
        },
        setLineWidth: function (lineWidth) {
            this.lineWidth = this.ctx1.lineWidth = this.ctx2.lineWidth = lineWidth;
        },
        refuseSelection: function () {
            $('body').attr('unselectable','on').css({
                '-webkit-user-select': 'none', /* Chrome all / Safari all */
                '-moz-user-select': 'none',     /* Firefox all */
                '-ms-user-select': 'none',      /* IE 10+ */
                /* No support for these yet, use at own risk */
                '-o-user-select': 'none',
                'user-select': 'none'         
            }).bind('selectstart', ident);
            this.clearSelection();
        },
        allowSelection: function () {
            $('body').attr('unselectable', 'off').css({
                '-webkit-user-select': 'auto', /* Chrome all / Safari all */
                '-moz-user-select': 'auto',     /* Firefox all */
                '-ms-user-select': 'auto',      /* IE 10+ */
                /* No support for these yet, use at own risk */
                '-o-user-select': 'auto',
                'user-select': 'auto'         
            }).unbind('selectstart', ident);
        },
        clearSelection: function () {
            if (document.selection) {
                document.selection.empty();
            } else if (window.getSelection) {
                window.getSelection().removeAllRanges();
            }
        }
    }
    window.DrawPanel = DrawPanel;
} ());