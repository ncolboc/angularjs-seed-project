/**
 * Created by nco on 6/03/2015.
 */
module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-ng-annotate');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Task configuration will be written here
        clean: {
            build:'build'
        },
        concat:{
            js:{
                src:[],
                dest:'build/app.js'
            }
        }
    });

    // Loading of tasks and registering tasks will be written here
    grunt.registerTask('package',['clean:build'])
};