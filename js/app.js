var myApp = angular.module('myApp', ['ngRoute', 'firebase'])
            .constant('FIREBASE_URL', 'https://angtumdata77.firebaseio.com/');

myApp.run(['$rootScope', '$location', function($rootScope, $location){
           $rootScope.$on('$routeChangeError', function(event, next, previous, error){
                 if(error == 'AUTH_REQUIRED'){
                     $rootScope.message = "Sorry, Please Login to access that page";
                     $location.path('#/login');
                 } //AUTH_REQUIRED
           }); //userInfo
}]);


myApp.config(['$routeProvider', function($routeProvider){


	$routeProvider.
	              when('/login',{
	              	templateUrl: "views/login.html",
	              	controller: 'RegistrationController'
	              }).
	              when('/register',{
	              	templateUrl: "views/register.html",
	              	controller: 'RegistrationController'
	              }).
	              when('/checkins/:uId/:mId',{
	              	templateUrl: "views/checkins.html",
	              	controller: 'CheckInsController'
	              }).
	              when('/checkins/:uId/:mId/checkinsList',{
	              	templateUrl: "views/checkinlist.html",
	              	controller: 'CheckInsController'
	              }).
	              when('/meetings',{
	              	templateUrl: "views/meetings.html",
	              	controller: 'MeetingsController',
	              	resolve: {
	              		currentAuth: function(Authentication){
	              			return Authentication.requireAuth();
	              		} //currentAuth
	              	} //resolve
	              })
	              .otherwise({redirectTo: '/login'});
}]);

/*myApp.controller('appController', ['$scope', function($scope){
    $scope.message = "Welcome to my App";
}]);*/