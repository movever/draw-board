require(["lab/jquery.js", "lab/_.js", "draw-board.js"], function($, _, DrawBoard) {
    var panel = new DrawBoard({
        width: $('.con1').width(),
        height: $('.con1').height(),
        parent: '.con1',
        type: 'arrow',
        lineWidth: $('.handler1 .lineWidth').val(),
        color: 'red'
    });
    var panel2 = new DrawBoard({
        width: $('.con2').width(),
        height: $('.con2').height(),
        parent: '.con2',
        type: 'rect',
        color: 'red'
    });
    $('.handler1 a:not(.back,.forward), .handler2 a').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('.handler1 a.rect').click(function () { panel.type = 'rect'; });
    $('.handler1 a.round').click(function () { panel.type = 'round'; });
    $('.handler1 a.line').click(function () { panel.type = 'line'; });
    $('.handler1 a.curve').click(function () { panel.type = 'curve'; });
    $('.handler1 a.arrow').click(function () { panel.type = 'arrow'; });
    $('.handler1 a.ease').click(function () { panel.type = 'ease'; });
    $('.handler1 a.back').click(function () { panel.back(); });
    $('.handler1 a.forward').click(function () { panel.forward(); });
    $('.handler1 .lineWidth').change(function () { panel.setLineWidth($(this).val()); });
    $('.handler1 span').click(function () {
        panel.setColor($(this).css('background-color'));
        $(this).addClass('active').siblings('span').removeClass('active');
    });


    $('.handler2 a.rect').click(function () { panel2.type = 'rect'; });
    $('.handler2 a.round').click(function () { panel2.type = 'round'; });
    $('.handler2 a.line').click(function () { panel2.type = 'line'; });
    $('.handler2 a.curve').click(function () { panel2.type = 'curve'; });
    $('.handler2 a.ease').click(function () { panel2.type = 'ease'; });
});








