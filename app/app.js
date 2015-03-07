/**
 * Created by macfly on 7/03/2015.
 */
angular.module('main', [
    'ui.router',
    'module.welcome',
    'templates-main'
])

    .config(function($stateProvider,$urlRouterProvider){

        //default redirect to welcome page
        $urlRouterProvider.otherwise('/welcome');

    })

;
