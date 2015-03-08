/**
 * Created by macfly on 7/03/2015.
 */
angular.module('main', [
    'ui.router',
    'pascalprecht.translate',
    'module.constants',
    'module.welcome',
    'templates-main'
])

    .config(function($stateProvider,$urlRouterProvider,$translateProvider){

        //default redirect to welcome page
        $urlRouterProvider.otherwise('/welcome');

        $translateProvider.useStaticFilesLoader({
            prefix: '../assets/i18n/locale-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en_US');
    })

    .controller('MainController', function (APP_VERSION) {
        var mainController = this;
        mainController.appVersion = APP_VERSION;
    })

;
