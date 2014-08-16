define(function(require, exports, module) {
    var elementOffset = function(elem) {
        var x, y;
        x = 0;
        y = 0;
        while (true) {
            x += elem.offsetLeft;
            y += elem.offsetTop;
            if (!(elem = elem.offsetParent)) {
                break;
            }
        }
        return {
            x: x,
            y: y
        };
    };
    //event是jquery中的event对象 原生event有兼容问题
    var getOffset = function(elem, event) {
        var offset = elementOffset(elem);
        return {
            left: event.pageX - offset.x,
            top: event.pageY - offset.y
        };
    };
    return getOffset;
});