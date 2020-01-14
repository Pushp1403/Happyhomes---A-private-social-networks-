package com.pushpendra.happyhomes.helper.security;

import org.springframework.beans.factory.annotation.Autowired;

import com.pushpendra.happyhomes.helper.society.SocietyBO;

public class Signup {
	private SocietyBO society;
	private UserAuthentication user;
	
	public SocietyBO getSociety() {
		return society;
	}
	@Autowired
	public void setSociety(SocietyBO society) {
		this.society = society;
	}
	public UserAuthentication getUser() {
		return user;
	}
	
	@Autowired
	public void setUser(UserAuthentication user) {
		this.user = user;
	}
}
