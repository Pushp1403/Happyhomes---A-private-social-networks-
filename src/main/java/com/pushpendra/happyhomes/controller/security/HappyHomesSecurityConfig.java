package com.pushpendra.happyhomes.controller.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;

@EnableWebSecurity
@Configuration
@ComponentScan(basePackages = "com.pushpendra.happyhomes")
public class HappyHomesSecurityConfig extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
				.antMatchers("/static/**", "/signup", "/aboutUs", "/assets/**","/partials/**",
							"/getBySocietyName", "/getAllCities","/getAllStates", "/registerNewSociety",
							"/registerUser", "/checkUserEmailAddress","/authenticate")
				.permitAll()
				.anyRequest()
				.authenticated()
			.and()
				.addFilterAfter(new HappyHomesCSRFFilter(), CsrfFilter.class)
				.csrf()
				.csrfTokenRepository(csrfTokenRepository())
			.and()
				.formLogin()
				.loginPage("/login")
				.permitAll()
				.defaultSuccessUrl("/home")
			.and()
				.logout()
				.deleteCookies("JSESSIONID")
				.deleteCookies("XSRF-TOKEN")
				.invalidateHttpSession(true)
				.logoutUrl("/logout")
				.permitAll()
			.and()
				.sessionManagement()
				.invalidSessionUrl("/invalidSession")
				.maximumSessions(3)
				.expiredUrl("/sessionExpired")
				.maxSessionsPreventsLogin(true);
	}

	@Autowired
	public void configureGlobal(UserDetailsService userDetailService,
			AuthenticationManagerBuilder auth,
			BCryptPasswordEncoder passwordEncoder) throws Exception {
		passwordEncoder = passwordEncoder();
		auth.userDetailsService(userDetailService)
				.passwordEncoder(passwordEncoder).and().eraseCredentials(true);

	}

	public CsrfTokenRepository csrfTokenRepository() {
		HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
		repository.setHeaderName("X-XSRF-TOKEN");
		return repository;

	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
