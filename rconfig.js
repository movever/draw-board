({
    baseUrl: "./",
        name: 'draw-board',
    out: 'draw-board.js',
    paths: {
    jquery: "lab/jquery",
        underscore: "lab/_",
        excanvas: "lab/excanvas",
        html2canvas: "lab/html2canvas",

        mouse: "src/mouse",
        drag: "src/drag",
        "draw-board": "src/draw-board",
        ease: "src/ease",
        line: "src/line",
        rect: "src/rect",
        util: "src/util",
        round: "src/round",
        arrow: 'src/arrow',
        curve: 'src/curve'
},
    exclude: ["jquery", "underscore", "excanvas", "html2canvas"],
        optimize: "uglify"
})