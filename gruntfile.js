module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ["./build"],
        requirejs: {
            options: {
                name: 'draw-board',
                out: "build/draw-board.js",
                mainConfigFile: "rconfig.js",
                exclude: ['jquery', 'excanvas', 'html2canvas', 'underscore'],
                uglify: {
                    beautify: true
                },
                onBuildWrite: function(name, path, contents) {
                    grunt.log.writeln(name);
                    contents = contents
                        .replace( /\s*return\s+[^\}]+(\}\);[^\w\}]*)$/, "$1" )
                        // Multiple exports
                        .replace( /\s*exports\.\w+\s*=\s*\w+;/g, "" );
                    return contents;
                }
            },
            build: {}/*,
            min: {
                options: {
                    out: 'build/draw-board.min.js',
                    uglify: {
                        beautify: false
                    }
                }
            }*/
        },
        uglify: {
            options: {},
            dist: {
                files: {
                    'build/draw-board.min.js': 'src/*.js'
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