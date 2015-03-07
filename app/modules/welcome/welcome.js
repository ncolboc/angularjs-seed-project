/**
 * Created by macfly on 6/03/2015.
 */
angular.module('module.welcome', [

])

    .config(function ($stateProvider) {

        $stateProvider.state('welcome',{
            url:'/welcome',
            templateUrl:'modules/welcome/welcome.tpl.html',
            controller:'WelcomePageController as wpController'
        })

    })

    .controller(function () {
        var wpController = this;

        wpController.title = 'Welcome Page';
    })

;
