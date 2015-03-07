/**
 * Created by nco on 6/03/2015.
 */
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-ng-annotate');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /*
         grunt-contrib-clean task
         */
        clean: {
            build: 'build'
        },

        /*
         grunt-bowercopy task
         */
        bowercopy: {
            options: {
                destPrefix: 'build\\vendor'
            },
            js: {
                src: [
                    'jquery:main',
                    'angular:main',
                    'angular-animate:main',
                    'ui-router:main',
                    'underscore:main',
                    'bootstrap/dist/js/bootstrap.js'
                ],
                dest: '\\'
            },
            css: {
                options: {
                    destPrefix: 'build\\style'
                },
                src: ['bootstrap/dist/css/bootstrap.css', 'fontawesome/css/font-awesome.css'],
                dest: '\\'
            }
        },

        /*
         grunt-contrib-concat task
         */
        concat: {
            js: {
                src: ['app/**/*.js'],
                dest: 'build/app.js'
            }
        },

        /*
         grunt-contrib-copy task
         */
        copy: {
            app_index: {
                src: 'app/index.html',
                dest: 'build/index.html'
            },
            app_css:{
                src:'app/css/*.css',
                dest:'build/style/',
                flatten: true,
                expand:true
            }
        },

        /*
         grunt-contrib-connect task
         */
        html2js:{
            main: {
                src: ['app/**/*.tpl.html'],
                dest: 'build/app.tpls.js'
            }
        },

        /*
         grunt-ng-annotate task
         */
        ngAnnotate: {
            main: {
                files: [
                    {
                        expand:true,
                        src: ['build/*.js'],
                        dest: ''
                    }
                ]
            }
        },

        /*
         grunt-contrib-watch task
         */
        watch: {
            files: ['app/**/*'],
            tasks: ['package'],
            options: {
                interrupt: true,
                debounceDelay: 250
            }
        },

        /*
         grunt-contrib-connect task
         */
        connect:{
            server:{
                options: {
                    base:'build',
                    hostname: 'localhost',
                    port: 8111
                }
            }
        }
    });

    grunt.registerTask('serve', [
        'package',
        'connect:server',
        'watch'
    ]),

    // Loading of tasks and registering tasks will be written here
    grunt.registerTask('package', [

        //1) delete build directory
        'clean:build',
        //2) copy javascript libraries from bower repo
        'bowercopy:js',
        //3) copy css files from bower repo
        'bowercopy:css',
        //4) copy app css files
        'copy:app_css',
        //5) concat all js files into app.js
        'concat:js',
        //6) convert template html to angular module
        'html2js:main',
        //7) apply annotation to js files
        'ngAnnotate:main',
        //8) copy index.html
        'copy:app_index'
    ]);
};