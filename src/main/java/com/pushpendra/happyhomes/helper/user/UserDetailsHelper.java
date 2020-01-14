package com.pushpendra.happyhomes.helper.user;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.pushpendra.happyhomes.helper.security.Signup;
import com.pushpendra.happyhomes.helper.security.UserAuthentication;
import com.pushpendra.happyhomes.model.security.UserAuthenticationDetail;
import com.pushpendra.happyhomes.model.society.Society;
import com.pushpendra.happyhomes.model.user.UserPersonalDetail;
import com.pushpendra.happyhomes.utilities.HappyHomesConstants;

public class UserDetailsHelper {
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	public UserAuthenticationDetail getUserAuthenticationData(
			UserAuthentication user) {
		UserAuthenticationDetail authenticationDetail = new UserAuthenticationDetail();
		authenticationDetail.setUserName(user.getUserName());
		authenticationDetail.setPassword(passwordEncoder.encode(user.getPassword()));
		//authenticationDetail.setAccountNonExpired(true);
		//authenticationDetail.setAccountNonLocked(true);
		authenticationDetail.setUserName(user.getUserName());
		authenticationDetail.setCreatedby(user.getUserName());
		authenticationDetail.setCreatedDate(new java.util.Date());
		//authenticationDetail.setCredentialsNonExpired(true);
		authenticationDetail.setFailedLoginAttempts(0);
		authenticationDetail.setUserAddressVerified(HappyHomesConstants.CHARACTER_NO);
		authenticationDetail.setUserEmailVerified(HappyHomesConstants.CHARACTER_NO);
		return authenticationDetail;
	}

	public UserPersonalDetail getUserPersonalDetails(Signup signup, Society society) {
		UserPersonalDetail personalDetail = new UserPersonalDetail();
		personalDetail.setUserNativePlace(null);
		personalDetail.setUserName(signup.getUser().getUserName());
		personalDetail.setDateOfBirth(signup.getUser().getDateOfBirth());
		personalDetail.setApartmentId(signup.getSociety().getApartmentNumber());
		personalDetail.setCreatedBy(signup.getUser().getUserName());
		personalDetail.setCreatedDate(new Date());
		personalDetail.setEmailSharingAllowed(HappyHomesConstants.CHARACTE_YES);
		personalDetail.setNumberSharingAllowed(HappyHomesConstants.CHARACTE_YES);
		personalDetail.setUserContactNumberVerified(HappyHomesConstants.CHARACTER_NO);
		personalDetail.setUserGender(signup.getUser().getGender());
		personalDetail.setDateOfBirth(signup.getUser().getDateOfBirth());
		personalDetail.setFirstName(signup.getUser().getFirstName());
		personalDetail.setLastName(signup.getUser().getLastName());
		personalDetail.setSociety(society);
		return personalDetail;
	}

	public void getUserPersonalAndSocietyDetails(Society society,
			UserPersonalDetail personalDetail, UserAuthentication user) {
		user.setEmail(personalDetail.getUserName());
		user.setFirstName(personalDetail.getFirstName());
		user.setLastName(personalDetail.getLastName());
		user.setApartmentNumber(personalDetail.getApartmentId());
		user.setSocietyId(society.getSocietyId());
	}

}
