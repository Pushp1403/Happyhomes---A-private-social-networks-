function loginController($scope, $window, $state, $rootScope, $timeout,
		happyHomesConstants, happyHomeService,localStorage,sessionStorage) {
	init();
	function init() {
				$scope.userName = happyHomesConstants.Labels_Login_pannel.userName,
				$scope.password = happyHomesConstants.Labels_Login_pannel.password,
				$scope.signIn = happyHomesConstants.Labels_Login_pannel.signIn,
				$scope.signUp = happyHomesConstants.Labels_Login_pannel.signUp,
				$scope.rememberMe = happyHomesConstants.Labels_Login_pannel.rememberMe,
				$scope.notRegistered = happyHomesConstants.Labels_Login_pannel.notRegistered,
				$scope.reset = happyHomesConstants.Labels_Login_pannel.reset,
				localStorage.$reset();
				$scope.user = {
					userName : "",
					password : "",
					errorMessage : "",
					invalidUsernamePassword : false
				}
	}
	$scope.login = function() {
		happyHomeService.authenticate($scope.user,
				happyHomesConstants.Happy_Homes_Url.authenticate,
				authenticationSuccess, authenticationFailure);
	}

	function authenticationSuccess(data, status, headers, config) {
		if (data.authenticated) {
			$state.go('home.newsfeeds');
			localStorage.authenticated = true;
			localStorage.userName = data.Email;
			localStorage.societyId = data.societyId;
			localStorage.firstName = data.firstName;
			localStorage.lastName = data.lastName;
			
		}else{
			$scope.user = data;
		}
	}
	function authenticationFailure(data, status, headers, config) {

	}
}
function signupController($scope, $rootScope,$state, $window, $timeout, happyHomesConstants,happyHomeService,localStorage,sessionStorage) {
	init();
	function init() {
				$scope.signUpMessage1 = happyHomesConstants.Labels_signup.signUpMessage1,
				$scope.signUpMessage2 = happyHomesConstants.Labels_signup.signUpMessage2,
				$scope.confirmAddress = happyHomesConstants.Labels_signup.confirmAddress,
				$scope.tellUsAboutYou = happyHomesConstants.Labels_signup.tellUsAboutYou,
				$scope.little = happyHomesConstants.Labels_signup.little,
				$scope.agree = happyHomesConstants.Labels_signup.privacyMessages.agree,
				$scope.byClicking = happyHomesConstants.Labels_signup.privacyMessages.byClicking,
				$scope.terms = happyHomesConstants.Labels_signup.privacyMessages.terms,
				$scope.terms2 = happyHomesConstants.Labels_signup.privacyMessages.terms2,
				$scope.openCalender = function($event) {
					$scope.status = true;
				};
		

					  $scope.signup = {
							society : {
								societyId : '',
								wingBlock :'',
								apartmentNumber : ''
							},
							user : {
								email : "",
								gender : 'M'
							}
					  }
		 
		happyHomeService.getStates(
				happyHomesConstants.Happy_Homes_Url.getAllStates, returnStates);
	}
	function returnStates(data, status, headers, config) {
		$scope.states = data;
	}

	$scope.getAllCities = function() {
		data = $scope.signup.user.societyState.stateId;
		happyHomeService.getCities(
				happyHomesConstants.Happy_Homes_Url.getAllCities, data,
				returnCities);
	}
	function returnCities(data, status, headers, config) {
		$scope.cities = data;
	}

	$scope.isSocietyCityStateSelected = function() {
		if ($scope.signup.user.societyState && $scope.signup.user.societyCity) {
			return false;
		} else {
			return true;
		}
	}
	$scope.socityWithAddress = function() {
		return happyHomeService.getSocietyDetails($scope.signup,
				happyHomesConstants.Happy_Homes_Url.fetchSocietyDetails);
	}
	$scope.confirmAddress = function() {
		happyHomeService.setUserData($scope.signup);
		$rootScope.wingBlock = $scope.signup.society.wingBlock;
		$rootScope.userName = $scope.signup.user.userName;
		$rootScope.apartmentNo = $scope.signup.society.apartmentNumber;
		$rootScope.city = $scope.signup.user.societyCity;
		$rootScope.state = $scope.signup.user.societyState;
		$rootScope.societyName = $scope.signup.society.societyName;
		happyHomeService.checkUserEmailAddress($scope.signup,
				happyHomesConstants.Happy_Homes_Url.checkUserEmailAddress,
				verifyUserEmailAddress);
	}

	function verifyUserEmailAddress(data, status, headers, config) {
		if (data.user.userAlreadyRegistered == false) {
			$state.go(happyHomesConstants.Happy_home_template_url.userPersonalDetails);
		}else{
			$scope.signup = data;
		}
	}

	$scope.registerUser = function() {
		if ($scope.signup.user.password == $scope.signup.user.confirmPassword) {
			var userData = happyHomeService.getUserData();
			$scope.signup.society.wingBlock = $rootScope.wingBlock;
			$scope.signup.user.userName = $rootScope.userName;
			$scope.signup.society.apartmentNumber = $rootScope.apartmentNo;
			$scope.signup.user.societyCity = $rootScope.city ;
			$scope.signup.user.societyState = $rootScope.state;
			$scope.signup.society.societyName = $rootScope.societyName;
			happyHomeService.registerUser($scope.signup,
					happyHomesConstants.Happy_Homes_Url.registerUser,
					userRegistrationSuccessHandler);
		} else {
			$scope.signup.user.invalidUsernamePassword = true;
			$scope.signup.user.errorMessage = happyHomesConstants.Labels_signup.passwordMisMatch;
		}
	}

	function userRegistrationSuccessHandler(data, status, headers, config) {
		if (data.user.userRegistered == true) {
			$rootScope.authenticated = true;
			$state.go(happyHomesConstants.Happy_home_template_url.login);
		} else {
			$scope.signup.user.invalidUsernamePassword = true;
			$scope.signup.user.errorMessage = happyHomesConstants.Labels_signup.generalError;
		}
	}
}

function societyRegistrationController($scope, $window, $state, $rootScope, $timeout,
 		happyHomesConstants, happyHomeService,localStorage,sessionStorage) {
	init();

	function init() {
		happyHomeService.getStates(
				happyHomesConstants.Happy_Homes_Url.getAllStates, returnStates);
		$scope.openCalender = function($event) {
			$scope.status = true;
		}
	}
	$scope.getAllCities = function() {
		data = $scope.society.societyState.stateId;
		happyHomeService.getCities(
				happyHomesConstants.Happy_Homes_Url.getAllCities, data,
				returnCities);
	}
	function returnStates(data, status, headers, config) {
		$scope.states = data;
	}

	function returnCities(data, status, headers, config) {
		$scope.cities = data;
	}

	$scope.registerSociety = function() {
		happyHomeService.registerNewSociety(
				happyHomesConstants.Happy_Homes_Url.registerSociety,
				$scope.society, societyRegistrationSuccessHandler);
	}
	function societyRegistrationSuccessHandler(data, status, headers, config) {
		if (data.societyRegistered) {
			$state.go("signup");
		}
	}
}

function navigationController($scope, $window, $state, $rootScope, $timeout,
 		happyHomesConstants, happyHomeService,localStorage,sessionStorage){
	$scope.isAuthenticated = function(){
		if(localStorage.authenticated){
			return true;
		}
		return false;
	};
}

function homePageController($scope, $window, $state, $rootScope, $timeout,
 		happyHomesConstants, happyHomeService,localStorage,sessionStorage){
	init();
	function init(){
		var society = {
				societyId : localStorage.societyId
		};
		$scope.firstName = localStorage.firstName;
		$scope.lastName = localStorage.lastName;
		happyHomeService.getSocietyPosts(happyHomesConstants.Happy_Homes_Url.getSocietyPosts,society,handleSocietyPosts);
	}
	
	function handleSocietyPosts(data, status, headers, config){
		$scope.societyPostList = data;
	}
	
	$scope.updateStatus = function(){
		var societyPost = {
				post:{
					postData : $scope.societyPost.post.postData,
					societyId : localStorage.societyId,
					userName : localStorage.userName
				}
			}
		happyHomeService.updateStatus(happyHomesConstants.Happy_Homes_Url.updateStatus,societyPost);
		$scope.societyPostList.push(societyPost);
	}
	
	$scope.addPostComment = function(post,val){
		var comment = {
				userName : localStorage.userName,
				userFirstName : post.post.userFirstName,
				userLastName : post.post.userLastName,
				commentData : val.newComment
		}
		post.commentList.push(comment);
	}
}

function eventsController($scope, $window, $state, $rootScope, $timeout,
 		happyHomesConstants, happyHomeService,localStorage,sessionStorage){
	init();
	function init(){
		$scope.calendarView = 'month';
		$scope.calendarDay = new Date();
		$scope.events = [
		                 {
		                   title: 'My event title',
		                   type: 'info',
		                   startsAt: new Date(2013,5,1,1),
		                   endsAt: new Date(2014,8,26,15),
		                   editable: false,
		                   deletable: false,
		                   draggable: true, 
		                   resizable: true,
		                   incrementsBadgeTotal: true
		                 }
		               ];
	}
	
}

		happyHomesApp.controller("signupController", ["$scope", "$rootScope",
				"$state", "$window", "$timeout", "HAPPY_HOME_CONSTANTS",
				"happyHomeService", "$localStorage", "$sessionStorage",
				signupController]),
				
		happyHomesApp.controller("loginController", ["$scope", "$window",
				"$state", "$rootScope", "$timeout", "HAPPY_HOME_CONSTANTS",
				"happyHomeService", "$localStorage", "$sessionStorage",
				loginController]),
				
		happyHomesApp.controller("societyRegistrationController", ["$scope",
				"$window", "$state", "$rootScope", "$timeout",
				"HAPPY_HOME_CONSTANTS", "happyHomeService", "$localStorage",
				"$sessionStorage", societyRegistrationController]),
				
		happyHomesApp.controller("homePageController", ["$scope", "$window",
				"$state", "$rootScope", "$timeout", "HAPPY_HOME_CONSTANTS",
				"happyHomeService", "$localStorage", "$sessionStorage",
				homePageController]),
				
		happyHomesApp.controller("navigationController", ["$scope", "$window",
				"$state", "$rootScope", "$timeout", "HAPPY_HOME_CONSTANTS",
				"happyHomeService", "$localStorage", "$sessionStorage",
				navigationController]),
				
		happyHomesApp.controller("eventsController", ["$scope", "$window",
				"$state", "$rootScope", "$timeout", "HAPPY_HOME_CONSTANTS",
				"happyHomeService", "$localStorage", "$sessionStorage",
				eventsController]),


happyHomesApp.directive("emailValidate", [function() {
	return {
		require : "ngModel",
		link : function(a, b, c, d) {
			b.on("blur", function(c) {
				a.$apply(function() {
					b.val()
							&& (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
									.test(b.val()) ? d.$setValidity(
									"emailValid", !0) : d.$setValidity(
									"emailValid", !1))
				})
			}), b.on("focus", function(b) {
				a.$apply(function() {
					d.$setValidity("emailValid", !0)
				})
			})
		}
	}
}]),

happyHomesApp.directive('addComment', function () {
    return function ($scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                $scope.$apply(function (){
                    $scope.$eval(attrs.addComment);
                });

                event.preventDefault();
            }
        });
    };
});

happyHomesApp.constant("HAPPY_HOME_CONSTANTS", {
	Labels_Login_pannel : {
		userName : "User Name",
		password : "Password",
		signIn : "sign In",
		rememberMe : "Remember Me",
		notRegistered : "Not Registered ?",
		signUp : "Register Here",
		reset : "Reset"
	},
	Happy_Homes_Url : {
		authenticate : "/HappyHomes/authenticate",
		fetchSocietyDetails : "/HappyHomes/getBySocietyName",
		checkUserEmailAddress : "/HappyHomes/checkUserEmailAddress",
		getAllCities : "/HappyHomes/getAllCities",
		getAllStates : "/HappyHomes/getAllStates",
		registerSociety : "/HappyHomes/registerNewSociety",
		registerUser : "/HappyHomes/registerUser",
		getSocietyPosts : "/HappyHomes/getSocietyPosts",
		updateStatus : "/HappyHomes/updateStatus"
	},
	Labels_signup : {
		signUpMessage1 : "Please Sign up",
		signUpMessage2 : "it's free and always will be.",
		confirmAddress : "Confirm Address",
		register : "Register",
		tellUsAboutYou : "Tell us about you",
		little : "Just a little...",
		passwordMisMatch : "Password Mismatch.",
		generalError : "Some error occured.Please contact help desk.",
		privacyMessages : {
			agree : "agree",
			byClicking : "By Clicking ",
			register : "Register ",
			youAgree : "you agree to the ",
			terms : "Terms and Conditions ",
			terms2 : "set out by this site, including our Cookie Use."
		}
	},
	Happy_home_template_url : {
		userPersonalDetails : "userPersonalDetails",
		homePage : "/secure/home",
		login : "login"
	}
})