angular.module('module.welcome').factory('welcomeVmService',function () {
	
	var welcomeVm = null;
	
	function WelcomeVm(){
		this.title = 'Welcome Page';
	}
	
	return {
		
		initialize:function (vm) {
			welcomeVm = vm;
			angular.extend(welcomeVm,new WelcomeVm());
		}
		
	};
	
});