/**
 * Created by macfly on 6/03/2015.
 */
angular.module('module.welcome')

    .config(function ($stateProvider) {

        $stateProvider.state('welcome',{
            url:'/welcome',
            templateUrl:'../app/modules/welcome/welcome.tpl.html',
            controller:'WelcomePageController as wpController'
        });

    })

    .controller('WelcomePageController',function (welcomeVmService,$scope) {
        var wpController = this;
        welcomeVmService.initialize(wpController);
        
        $scope.$on("$destroy", function() {
            
        });
        
    })

;
