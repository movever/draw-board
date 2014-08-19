var rdefineEnd = /\}\);[^}\w]*$/;
var files = ['src/start', 'src/mouse.js', 'src/drag.js', 'src/util.js',
    'src/line.js', 'src/curve.js', 'src/round.js', 'src/rect.js', 'src/ease.js', 'src/arrow.js',
    'src/draw-board.js',
    'src/end'];
module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ["./build"],
        concat: {
            options: {
                separator: '\r\n'
            },
            dist: {
                src: files,
                dest: 'build/draw-board.js'
            }
        },
        uglify: {
            options: {},
            dist: {
                files: {
                    'build/draw-board.min.js': 'build/draw-board.js'
                }
            }
        }
    });

    var cwd = process.cwd();
    process.chdir('../../');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    process.chdir(cwd);
}