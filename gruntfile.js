module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
          all: ['component/**/*.js', 'tests/unit/**/*.js']
        },
        ngtemplates:  {
            options: {
                module: 'JsonPrettyPrint'
            },
            app:  {
                src:      'component/templates/**.html',
                dest:     'component/templates/templates.js'
            }
        },
        concat: {
            app: {
                src: [  'component/angular-json-pretty-print.js',
                        '<%= ngtemplates.app.dest %>',
                        'component/**/*.js'
                    ],
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
          css: {
            cwd: './',
            src: 'component/assets/*',
            dest: 'dist/assets/',
            expand: true,
            flatten: true,
            filter: 'isFile'
          },
          fontawesomeFonts: {
            cwd: './',
            src: 'vendor/fontawesome/fonts/*',
            dest: 'dist/fonts/',
            expand: true,
            flatten: true,
            filter: 'isFile'
          },
          fontawesomeCss: {
            cwd: './',
            src: 'vendor/fontawesome/css/*',
            dest: 'dist/assets/',
            expand: true,
            flatten: true,
            filter: 'isFile'
          },
          dummy: {
            cwd: './dist/',
            src: '**',
            dest: 'tests/dummy/vendor/angular-json-pretty-print',
            expand: true
          }
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
            files: [
                'component/angular-json-pretty-print.js',
                'component/controllers/**/*.js',
                'component/directives/**/*.js',
                'component/**/*.html',
                'component/assets/**/*.css',
                'tests/unit/**/*.js'
            ],
            tasks: [
                'jshint',
                'ngtemplates',
                'concat',
                'karma:unit:run',
                'uglify',
                'copy:main',
                'copy:css',
                'copy:fontawesomeFonts',
                'copy:fontawesomeCss',
                'copy:dummy'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.registerTask('default', 'watch');
    grunt.registerTask('all', ['concat']);
    grunt.registerTask('ci',
        [
            'jshint',
            'ngtemplates',
            'concat',
            'uglify',
            'copy:main',
            'copy:css',
            'copy:fontawesomeFonts',
            'copy:fontawesomeCss',
            'copy:dummy'
        ]
    );
};