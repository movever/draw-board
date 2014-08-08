window.shape_arrow = function(ctx1, ctx2) {
    //画一个等腰三角形
    var triangle = function(ctx, left, top, h, angle, rotate) {

    }
    return {
        start: function (position) {

            ctx2.beginPath()
        },
        ing: function (start, end) {
            ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height)
            ctx2.save()
            ctx2.beginPath()
            ctx2.moveTo(start.left, start.top)
            ctx2.lineTo(end.left, end.top)
            ctx2.fillStyle = ctx2.strokeStyle

            var atan = Math.atan((end.top - start.top)/(end.left - start.left));
            var rotate = Math.PI/2 + atan
            if (end.left < start.left) {
                rotate =  rotate - Math.PI
            }

            ctx2.translate(end.left, end.top)
            ctx2.rotate(rotate)

            var angle = 30/180*Math.PI/2
            var width = 15 * Math.tan(angle)
            ctx2.moveTo(0, 0)
            ctx2.lineTo(width, 15)
            ctx2.lineTo(-width, 15)

            ctx2.stroke()
            ctx2.fill()
            ctx2.restore()
        },
        end: function () {

        }
    }
}