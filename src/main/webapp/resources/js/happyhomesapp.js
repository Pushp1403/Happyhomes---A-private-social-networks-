/*var happyHomesApp = angular.module('HappyHomes', ['ngRoute','ui.bootstrap']);

happyHomesApp.config(['$routeProvider','$httpProvider', function($routeProvider, $httpProvider) {
	$routeProvider.when('/login', {
		controller : 'loginController',
		templateUrl : '/HappyHomes/partials/loginpannel'
	}).when('/aboutUs', {
		controller : 'aboutUsController',
		templateUrl : "/HappyHomes/partials/aboutUs"
	}).when('/services', {
		controller : "servicesController",
		templateUrl : "/HappyHomes/partials/services"
	}).when('/signup', {
		controller : "signupController",
		templateUrl : "/HappyHomes/partials/signup"
	}).when('/userPersonalDetails', {
		controller : "signupController",
		templateUrl : "/HappyHomes/partials/userPersonalDetails"
	}).when('/registerNewSociety', {
		controller : "societyRegistrationController",
		templateUrl : "/HappyHomes/partials/registerNewSociety"
	}).when('/home', {
		controller : "homePageController",
		templateUrl : "/HappyHomes/partials/secure/home"
	}).otherwise({
		redirectTo : '/login'
	});
	
	 $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
}]);
*/

var happyHomesApp = angular.module('HappyHomes', ['mwl.calendar','ui.router','ui.bootstrap','ngStorage']) ;

happyHomesApp.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/login");
	
	$stateProvider.state('login',{
		url : '/login',
		templateUrl: '/HappyHomes/partials/loginpannel',
		controller: 'loginController'
	}).state('registerUser',{
		url: '/signup',
		templateUrl: "/HappyHomes/partials/signup",
		controller: 'signupController'
	}).state('registerSociety',{
		url : '/registerNewSociety',
		controller :'societyRegistrationController',
		templateUrl: "/HappyHomes/partials/registerNewSociety"
	}).state('home',{
		url : '/home',
		controller: 'homePageController',
		templateUrl: '/HappyHomes/partials/secure/home'
	}).state('home.newsfeeds',{
		url : '/newsFeeds',
		controller: 'homePageController',
		templateUrl: '/HappyHomes/partials/secure/home.newsfeeds'
	}).state('home.inbox',{
		url : '/inbox',
		controller: 'homePageController',
		templateUrl: '/HappyHomes/partials/secure/home.inbox'
	}).state('home.events',{
		url : '/events',
		controller: 'eventsController',
		templateUrl: '/HappyHomes/partials/secure/home.events'
	}).state('userPersonalDetails',{
		url:'/userPersonalDetails',
		controller: 'signupController',
		templateUrl: '/HappyHomes/partials/userPersonalDetails'
	})
}])