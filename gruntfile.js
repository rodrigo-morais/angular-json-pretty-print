module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
          all: ['component/**/*.js', 'tests/unit/**/*.js']
        },
        concat: {
            app: {
                src: ['component/angular-json-pretty-print.js', 'component/**/*.js'],
                dest: 'dist/angular-json-pretty-print.js',
            }
        },
        uglify: {
          my_target: {
            options: {
              mangle: true,
              compress: true
            },
            files: {
              'dist/angular-json-pretty-print.min.js': ['dist/angular-json-pretty-print.js']
            }
          }
        },
        copy: {
          main: {
            cwd: './',
            src: 'component/templates/jsonPrettyPrint.html',
            dest: 'dist/templates/',
            expand: true,
            flatten: true,
            filter: 'isFile'
          },
        },
        karma: {
          unit: {
            configFile: 'tests/karma.config.js',
            background: true,
            singleRun: false,
            files: [
              { src: ['test/unit/**/*.js'], served: true }
            ]
          }
        },
        watch: {
            files: ['component/angular-json-pretty-print.js', 'component/**/*.js',
                    'component/**/*.html'],
            tasks: ['karma:unit:run', 'jshint', 'concat', 'uglify', 'copy']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', 'watch');
    grunt.registerTask('all', ['concat']);
};