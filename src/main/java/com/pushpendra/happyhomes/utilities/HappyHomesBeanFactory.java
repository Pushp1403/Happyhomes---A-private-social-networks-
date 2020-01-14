package com.pushpendra.happyhomes.utilities;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.pushpendra.happyhomes.helper.SocietyPosts.SocietyPostHelper;
import com.pushpendra.happyhomes.helper.security.SecurityHelper;
import com.pushpendra.happyhomes.helper.security.ServerLogs;
import com.pushpendra.happyhomes.helper.security.Signup;
import com.pushpendra.happyhomes.helper.security.UserAuthentication;
import com.pushpendra.happyhomes.helper.society.LocationBO;
import com.pushpendra.happyhomes.helper.society.SocietyBO;
import com.pushpendra.happyhomes.helper.society.SocietyHelper;
import com.pushpendra.happyhomes.helper.user.UserDetailsHelper;

@Configuration
public class HappyHomesBeanFactory {
	
	@Bean
	public SecurityHelper securityHelper(){
		return new SecurityHelper();
	}
	
	@Bean
	public UserAuthentication getUserAuthentication(){
		return new UserAuthentication();
	}
	
	@Bean
	public ServerLogs getServerLogs(){
		return new ServerLogs();
	}
	
	@Bean
	public SocietyBO getSocietyBo(){
		return new SocietyBO();
	}
	
	@Bean
	public Signup getSignup(){
		return new Signup();
	}
	
	@Bean
	public LocationBO getLocationBo(){
		return new LocationBO();
	}
	
	@Bean
	public SocietyHelper getSocietyHelper(){
		return new SocietyHelper();
	}
	
	@Bean
	public UserDetailsHelper getUserDetailsHelper(){
		return new UserDetailsHelper();
	}
	
	@Bean
	public SocietyPostHelper getSocietyPostHelper(){
		return new SocietyPostHelper();
	}
}
