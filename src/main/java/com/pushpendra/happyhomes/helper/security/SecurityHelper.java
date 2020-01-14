package com.pushpendra.happyhomes.helper.security;

import com.pushpendra.happyhomes.utilities.HappyHomesConstants;

public class SecurityHelper {

	public void checkUserNameAndPassword(UserAuthentication user) {
		String[] suspeciousWords = HappyHomesConstants.SUSPICIOUS_WORDS.split(",");
		for(String word : suspeciousWords){
			if (user.getUserName().contains(word)
					|| user.getPassword().contains(word)) {
				user.setInvalidUsernamePassword(true);
				user.setErrorMessage(HappyHomesConstants.INVALID_USER_NAME_PASSWORD);
				return;
			}
		}
	}

}
