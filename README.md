draw-board
==========

一个简单的绘图板，用来在网页中进行简单的绘图功能，兼容ie；

###功能
矩形、圆形、直线、曲线、橡皮擦、箭头、前进、后退、保存

###说明
1. 依赖jquery
`<script src="lab/jquery.js"></script>`
2. 如果需要兼容ie，需要引入cecanvas.js
`<script src="lab/excanvas.js"></script>`
3. 如果需要保存绘图功能，需要引入html2canvas.js
`<script src="lab/html2canvas.js"></script>`
4. 引入draw-borad.js
`<script src="build/draw-board.js"></script>`
5. 使用
<pre>
var drawBoard = new DrawBoard({
    width: $parent.width(),
    height: $parent.height(),
    parent: $parent
});
</pre>

###todo

整理、优化现有功能

考虑绘图区域大小变化

文档说明

插件
