happyHomesApp.service("happyHomeService", ["$http", function(happyHomeApplication){
	var userData = {
			state : '',
			city : '',
			society : '',
			wingBlock:'',
			apartmentNumber:'',
			emailId:''
	}
	
	this.authenticate = function(user,path, authenticationSuccess,authenticationFailure){
		var credentials = {
				userName :user.userName,
				password :  user.password
		}
		//user.credentials = credentials;
		//alert(user.credentials.userName + ":" + user.credentials.password);
		var headers = user ? {authorization : "Basic "
	        + btoa(credentials.userName + ":" + credentials.password),
	        "content-type" : "application/x-www-form-urlencoded"
	    } : {};
	    
	    /*var req = {
	    		 method: 'POST',
	    		 url: path,
	    		 headers: headers
	    		}*/
	    happyHomeApplication.post(path, user, headers).success(authenticationSuccess).error(authenticationFailure);
		
	  //  happyHomeApplication.post(path, user, {headers : headers}).success(authenticationSuccess).error(authenticationFailure);
	}
	this.getSocietyDetails =function getSocietyDetails(signup,path){
				return	happyHomeApplication.post(path, signup).then(function(resp){
				return resp.data;
			})
	}
	
	this.registerUser = function(signUp,path, registrationSuccessHandler){
		happyHomeApplication.post(path, signUp).success(registrationSuccessHandler);
	}
	
	this.getCities = function(path,data,callback){
		var config = {
				stateId : data.toString()
		}
		return happyHomeApplication.post(path, config).success(callback);
	}
	
	this.getStates = function(path,returnStates){
		return happyHomeApplication.get(path).success(returnStates);
	}
	
	this.registerNewSociety = function(path, data, callback){
		return happyHomeApplication.post(path, data).success(callback);
	}
	
	this.checkUserEmailAddress = function(data,path,successHandler){
		happyHomeApplication.post(path, data).success(successHandler);
	}
	
	this.setUserData = function(signup){
		//userData.society = signup.society.societyName;
		userData.wingBlock = signup.society.wingBlock;
		userData.emailId = signup.user.userName;
		userData.apartmentNumber = signup.society.apartmentNumber;
	}
	
	this.getUserData = function(){
		return userData;
	}
	
	this.getSocietyPosts = function(path,data,handleSocietyPosts){
		happyHomeApplication.post(path, data).success(handleSocietyPosts);
	}
	
	this.updateStatus = function(path,data){
		happyHomeApplication.post(path,data);
	}
}]);
