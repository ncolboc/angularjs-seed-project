/**
 * Created by macfly on 7/03/2015.
 */
angular.module('mainModule', [
    'ui.router',
    'module.welcome'
])

    .config(function($stateProvider,$urlRouterProvider){

        //default redirect to welcome page
        $urlRouterProvider.otherwise('/welcome');

    })

;
