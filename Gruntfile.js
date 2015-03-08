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
    grunt.loadNpmTasks('grunt-font-awesome-vars');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        globalConfig:{
          pkg_folder:'build',
          app_src:'app'
        },

        /*
         grunt-contrib-clean task
         */
        clean: {
            package: '<%= globalConfig.pkg_folder %>'
        },

        /*
         grunt-bowercopy task
         */
        bowercopy: {
            options: {
                destPrefix: '<%= globalConfig.pkg_folder %>\\vendor'
            },
            js: {
                src: [
                    'jquery:main',
                    'angular:main',
                    'angular-animate:main',
                    'ui-router:main',
                    'underscore:main',
                    'moment:main',
                    'angular-strap:main',
                    'bootstrap/dist/js/bootstrap.js'
                ],
                dest: '\\'
            },
            css: {
                options: {
                    destPrefix: '<%= globalConfig.pkg_folder %>\\style'
                },
                src: ['bootstrap/dist/css/bootstrap.css'],
                dest: '\\'
            },
            font:{
                options: {
                    destPrefix: '<%= globalConfig.pkg_folder %>\\assets\\fonts\\font-awesome'
                },
                src: ['fontawesome/fonts/*'],
                dest: '\\'
            }
        },

        /*
         grunt-font-awesome-vars task
         */
        fontAwesomeVars: {
            main: {
                variablesLessPath: 'lib/fontawesome/less/variables.less',
                fontPath: '../assets/fonts/font-awesome'        //NOTE: this must be relative to FINAL, compiled .css file - NOT the variables.less file! For example, this would be the correct path if the compiled css file is main.css which is in 'src/build' and the font awesome font is in 'src/bower_components/font-awesome/fonts' - since to get from main.css to the fonts directory, you first go back a directory then go into bower_components > font-awesome > fonts.
            }
        },

        /*
         grunt-contrib-less task
         */
        less:{
            build: {
                files: [
                    {'<%= globalConfig.pkg_folder %>/style/font-awesome.css': ['lib/fontawesome/less/font-awesome.less']}
                ],
                options: {
                    compile: true,
                    strictMath: true,
                    strictUnits: true
                }
            }
        },

        /*
         grunt-contrib-concat task
         */
        concat: {
            js: {
                src: ['<%= globalConfig.app_src %>/**/*.js'],
                dest: '<%= globalConfig.pkg_folder %>/app.js'
            }
        },

        /*
         grunt-contrib-copy task
         */
        copy: {
            app_index: {
                src: '<%= globalConfig.app_src %>/index.html',
                dest: '<%= globalConfig.pkg_folder %>/index.html'
            },
            app_css:{
                src:'<%= globalConfig.app_src %>/css/*.css',
                dest:'<%= globalConfig.pkg_folder %>/style/',
                flatten: true,
                expand:true
            }
        },

        /*
         grunt-contrib-connect task
         */
        html2js:{
            main: {
                src: ['<%= globalConfig.app_src %>/**/*.tpl.html'],
                dest: '<%= globalConfig.pkg_folder %>/app.tpls.js'
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
                        src: ['<%= globalConfig.pkg_folder %>/*.js'],
                        dest: ''
                    }
                ]
            }
        },

        /*
         grunt-contrib-watch task
         */
        watch: {
            files: ['<%= globalConfig.app_src %>/**/*','Gruntfile.js'],
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
                    base:'<%= globalConfig.pkg_folder %>',
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

        //1) delete <%= globalConfig.pkg_folder %> directory
        'clean:package',
        //2) copy javascript libraries from bower repo
        'bowercopy:js',
        //3) copy css files from bower repo
        'bowercopy:css',
        //4) copy css files from bower repo
        'bowercopy:font',
        //5) replace font-path in fontawesome file variables.less
        'fontAwesomeVars:main',
        //6) apply less process
        'less:build',
        //7) copy app css files
        'copy:app_css',
        //8) concat all js files into app.js
        'concat:js',
        //9) convert template html to angular module
        'html2js:main',
        //10) apply annotation to js files
        'ngAnnotate:main',
        //11) copy index.html
        'copy:app_index'
    ]);
};