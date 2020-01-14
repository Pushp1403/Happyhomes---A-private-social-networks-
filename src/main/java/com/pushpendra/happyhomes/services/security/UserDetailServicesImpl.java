package com.pushpendra.happyhomes.services.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pushpendra.happyhomes.data.security.UserDetailServiceDao;
import com.pushpendra.happyhomes.data.society.SocietyDetailServicesDao;
import com.pushpendra.happyhomes.helper.security.Signup;
import com.pushpendra.happyhomes.helper.security.UserAuthentication;
import com.pushpendra.happyhomes.helper.user.UserDetailsHelper;
import com.pushpendra.happyhomes.model.security.UserAuthenticationDetail;
import com.pushpendra.happyhomes.model.society.Society;
import com.pushpendra.happyhomes.model.user.UserPersonalDetail;

@Service
public class UserDetailServicesImpl implements UserDetailServices {
	
	
	@Autowired
	private UserDetailServiceDao userDetailServiceDao;
	
	@Autowired
	private UserDetailsHelper userdetailsHelper;
	
	@Autowired
	private SocietyDetailServicesDao  societyDetailServices;
	
	@Override
	public UserAuthenticationDetail findUserByUserId(String userName) {
		return userDetailServiceDao.findUserByUserName(userName);
	}

	@Override
	public UserAuthenticationDetail saveUserAuthenticationDetails(UserAuthentication user) {
		UserAuthenticationDetail userAuthenticationDetail = userdetailsHelper.getUserAuthenticationData(user);
		return userDetailServiceDao.saveUserAuthenticationDetails(userAuthenticationDetail);
	}

	@Override
	public UserPersonalDetail saveUserPersonalDetails(Signup signup) {
		Society society = societyDetailServices.getSocietyBySocietyName(signup.getSociety().getSocietyName());
		UserPersonalDetail userPersonalDetail = userdetailsHelper.getUserPersonalDetails(signup,society);
		return userDetailServiceDao.saveUserPersonalDetails(userPersonalDetail);
	}

	@Override
	public void getUserDetails(UserAuthentication user) {
		UserPersonalDetail personalDetail = userDetailServiceDao.getUserPersonalDetails(user);
		userdetailsHelper.getUserPersonalAndSocietyDetails(personalDetail.getSociety(),personalDetail,user);
	}

}
