var rdefineEnd = /\}\);[^}\w]*$/;
var files = ['src/start', 'src/mouse.js', 'src/drag.js', 'src/util.js',
    'src/line.js', 'src/curve.js', 'src/round.js', 'src/rect.js', 'src/ease.js', 'src/arrow.js',
    'src/draw-board.js',
    'src/end'];
grunt.log.writeln(process.cwd());
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

    var loadTasks = function() {
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-requirejs');
        grunt.loadNpmTasks('grunt-contrib-clean');
    }
    try {
        loadTask();
    }catch(e){
        process.chdir('../../');
        loadTasks();
        process.chdir(cwd);
    }
}