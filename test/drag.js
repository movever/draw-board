require.config({
    baseUrl: '../',
    paths: {
        jquery: 'lab/jquery',
        mouse: 'src/mouse'
    }
});
require(['jquery', '../src/drag.js'], function($, drag) {
    var log = function(msg) {
        var $log = $('#log');
        $log.append('<div>'+msg+'</div>');
        $log.scrollTop($log.get(0).scrollHeight);
    };
    drag('#mycanvas', {
        dragstart: function(start) {
            log('start:' + start.left + ' ' + start.top);
        },
        dragging: function(start, cur) {
            log('dragging:' + cur.left + ' ' + cur.top);
        },
        dragend: function(start, cur) {
            log('dragend:' + cur.left + ' ' + cur.top);
        },
        dragpause: function(cur) {
            log('dragpause:' + cur.left + ' ' + cur.top);
        },
        dragcontinue: function(cur) {
            log('dragcontinue:' + cur.left + ' ' + cur.top);
        }
    });
});