package com.pushpendra.happyhomes.data.security;

import org.springframework.stereotype.Repository;

import com.pushpendra.happyhomes.helper.security.UserAuthentication;
import com.pushpendra.happyhomes.model.security.UserAuthenticationDetail;
import com.pushpendra.happyhomes.model.user.UserPersonalDetail;

@Repository
public interface UserDetailServiceDao {
	UserAuthenticationDetail findUserByUserName(String userName);

	public UserAuthenticationDetail saveUserAuthenticationDetails(
			UserAuthenticationDetail userAuthenticationDetail);

	public UserPersonalDetail saveUserPersonalDetails(UserPersonalDetail userPersonalDetail);

	public UserPersonalDetail getUserPersonalDetails(UserAuthentication user);
}
