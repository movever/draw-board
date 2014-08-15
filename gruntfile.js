
module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';\n\r'
            },
            dist: {
                src: ['src/*.js'],
                dest: 'build/draw-board.js'
            }
        },
        uglify: {
            options: {},
            dist: {
                files: {
                    'build/draw-board.min.js': 'src/*.js'
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    mainConfigFile: "rconfig.js",
                    out: "build/draw-board.js"
                }
            }
        }
    });
    var cwd = process.cwd();
    process.chdir('../../');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    process.chdir(cwd);
    grunt.registerTask('default', ['concat', 'uglify', 'requirejs']);
}