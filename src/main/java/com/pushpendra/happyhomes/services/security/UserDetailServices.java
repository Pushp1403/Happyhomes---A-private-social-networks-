package com.pushpendra.happyhomes.services.security;

import org.springframework.stereotype.Service;

import com.pushpendra.happyhomes.helper.security.Signup;
import com.pushpendra.happyhomes.helper.security.UserAuthentication;
import com.pushpendra.happyhomes.model.security.UserAuthenticationDetail;
import com.pushpendra.happyhomes.model.user.UserPersonalDetail;

@Service
public interface UserDetailServices {
	
	UserAuthenticationDetail findUserByUserId(String userName);

	public UserAuthenticationDetail saveUserAuthenticationDetails(UserAuthentication user);

	public UserPersonalDetail saveUserPersonalDetails(Signup signup);

	public void getUserDetails(UserAuthentication user);
}
