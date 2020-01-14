package com.pushpendra.happyhomes.controller.security;

import java.sql.Timestamp;
import java.util.Calendar;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pushpendra.happyhomes.helper.security.SecurityHelper;
import com.pushpendra.happyhomes.helper.security.ServerLogs;
import com.pushpendra.happyhomes.helper.security.Signup;
import com.pushpendra.happyhomes.helper.security.UserAuthentication;
import com.pushpendra.happyhomes.model.security.UserAuthenticationDetail;
import com.pushpendra.happyhomes.model.user.UserPersonalDetail;
import com.pushpendra.happyhomes.services.security.UserDetailServices;
import com.pushpendra.happyhomes.utilities.HappyHomesBeanFactory;
import com.pushpendra.happyhomes.utilities.HappyHomesConstants;

@Controller
public class UserdetailsController implements UserDetailsService,AuthenticationProvider {
	
	@Autowired
	private UserDetailServices userDetailServices;
	
	@Autowired
	private SecurityHelper securityhelper;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private HappyHomesBeanFactory beanFactory;
	
	
	
	@Override
	public UserDetails loadUserByUsername(String userName)
			throws UsernameNotFoundException {
		UserAuthenticationDetail userdetails = null;
		try {
			userdetails = userDetailServices.findUserByUserId(userName);
		} catch (UsernameNotFoundException e) {
			e.printStackTrace();
		}
		return userdetails;
	}
	
	@RequestMapping(value = "/login")
	public String login(HttpServletRequest request, HttpServletResponse responce){
		ServerLogs logs = beanFactory.getServerLogs();
		Calendar calender = Calendar.getInstance();
		logs.setUrl(request.getRequestURI());
		logs.setHostAddress(request.getRemoteAddr());
		logs.setAccessTime(new Timestamp(calender.getTimeInMillis()));
		
		return HappyHomesConstants.LOGIN;
	}
	
	@RequestMapping(value = "/home")
	public String homeRouteProvider(HttpServletRequest req, HttpServletResponse responce){
		String[] returnTemplate = req.getRequestURI().split(HappyHomesConstants.FORWARD_SLASH);
		return returnTemplate[2]+HappyHomesConstants.FORWARD_SLASH+returnTemplate[3];
	}
	
	@RequestMapping(value = "/partials/secure/**")
	public String angularSecureRouteProvider(HttpServletRequest req, HttpServletResponse responce){
		String[] returnTemplate = req.getRequestURI().split(HappyHomesConstants.FORWARD_SLASH);
		return returnTemplate[2]+HappyHomesConstants.FORWARD_SLASH+returnTemplate[3]+HappyHomesConstants.FORWARD_SLASH+returnTemplate[4];
	}
	
	@RequestMapping(value = "/partials/**")
	public String angularRouteProvider(HttpServletRequest req, HttpServletResponse responce){
		String[] returnTemplate = req.getRequestURI().split(HappyHomesConstants.FORWARD_SLASH);
		return returnTemplate[2]+HappyHomesConstants.FORWARD_SLASH+returnTemplate[3];
	}
	
	@RequestMapping(value = "/authenticate")
	@ResponseBody
	public UserAuthentication authenticateUser(@RequestBody UserAuthentication user,HttpServletRequest request){
		user.setInvalidUsernamePassword(false);
		securityhelper.checkUserNameAndPassword(user);
		if(!user.isInvalidUsernamePassword()){
			UserDetails userdetail = this.loadUserByUsername(user.getUserName().trim());
			if(null != userdetail){
				try {
					if(userdetail.isAccountNonLocked() && userdetail.isCredentialsNonExpired()){
						if(passwordEncoder.matches(user.getPassword(), userdetail.getPassword())){
							user.setAuthenticated(true);
							UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassword());
							token.setDetails(new WebAuthenticationDetails(request));
					        Authentication authentication = this.authenticate(token);
							userDetailServices.getUserDetails(user);
						}else {
							user.setAuthenticated(false);
							user.setInvalidUsernamePassword(true);
							user.setErrorMessage(HappyHomesConstants.INVALID_USER_NAME_PASSWORD);
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
				
			}else {
				user.setAuthenticated(false);
				user.setInvalidUsernamePassword(true);
				user.setErrorMessage(HappyHomesConstants.UNREGISTERED_USER);
			}
		}
		return user;
	}
	
	@ResponseBody
	@RequestMapping(value = "/registerUser")
	public Signup registerUser(@RequestBody Signup signup){
		signup.getUser().setInvalidUsernamePassword(false);
		UserAuthenticationDetail userAuthenticationDetail = null;
		UserPersonalDetail userPersonalDetail = null;
		securityhelper.checkUserNameAndPassword(signup.getUser());
		try {
			if(!signup.getUser().isInvalidUsernamePassword()){
				userAuthenticationDetail = userDetailServices.saveUserAuthenticationDetails(signup.getUser());
				userPersonalDetail = userDetailServices.saveUserPersonalDetails(signup);
			}else{
				signup.getUser().setUserRegistered(false);
				signup.getUser().setInvalidUsernamePassword(true);
				signup.getUser().setErrorMessage(HappyHomesConstants.INVALID_USER_NAME_PASSWORD);
			}
		} catch (Exception e) {
			userAuthenticationDetail = null;
			userPersonalDetail = null;
			signup.getUser().setUserRegistered(false);
			e.printStackTrace();
		}
		
		if(null != userAuthenticationDetail && null != userPersonalDetail){
				signup.getUser().setUserRegistered(true);
		}
		
		return signup;
		
	}
	
	@ResponseBody
	@RequestMapping(value="/checkUserEmailAddress")
	public Signup checkUserEmailAddress(@RequestBody Signup  signup){
		signup.getUser().setInvalidUsernamePassword(false);
		UserDetails userDetails = this.loadUserByUsername(signup.getUser().getUserName());
		if(null == userDetails){
			signup.getUser().setUserAlreadyRegistered(false);
			return signup;
		}else{
			signup.getUser().setInvalidUsernamePassword(true);
			signup.getUser().setUserAlreadyRegistered(true);
			signup.getUser().setErrorMessage(HappyHomesConstants.USER_ALREADY_REGISTERED);
			return signup;
		}
	}

	@Override
	public Authentication authenticate(Authentication authentication)
			throws AuthenticationException {
        SecurityContextHolder.getContext().setAuthentication(authentication);
		return authentication;
	}

	@Override
	public boolean supports(Class<?> authentication) {
		// TODO Auto-generated method stub
		return false;
	}

}
