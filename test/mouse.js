require.config({
    batUrl: "./",
    paths: {
        jquery: "../lab/jquery"
    }
});
require(["jquery", "../src/mouse"], function($, mouse) {
    $('#mycanvas').mousemove(function(e) {
        var op = mouse(this, e);
        $('input').val(op.left + ':' + op.top);
    });
});