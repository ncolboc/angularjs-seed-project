/**
 * Created by macfly on 7/03/2015.
 */
angular.module('main', [
    'ui.router',
    'module.constants',
    'module.welcome',
    'templates-main'
])

    .config(function($stateProvider,$urlRouterProvider){

        //default redirect to welcome page
        $urlRouterProvider.otherwise('/welcome');
    })

    .controller('MainController', function (APP_NAME) {
        var mainController = this;
        mainController.appName = APP_NAME;
    })

;
