package com.pushpendra.happyhomes.helper.security;

import java.sql.Date;

import com.pushpendra.happyhomes.helper.society.LocationBO;

public class UserAuthentication {
	private String userName;
	private String password;
	private String rememberMe;
	private boolean invalidUsernamePassword;
	private String errorMessage;
	private boolean isAuthenticated;
	private String redirectUrl;
	private String email;
	private Date dateOfBirth;
	private String gender;
	private String firstName;
	private String lastName;
	private String wingBlock;
	private int apartmentNumber;
	private LocationBO societyCity;
	private LocationBO societyState;
	private boolean isUserRegistered;
	private boolean userAlreadyRegistered;
	private int societyId;
	
	public int getSocietyId() {
		return societyId;
	}
	public void setSocietyId(int societyId) {
		this.societyId = societyId;
	}
	public boolean isUserAlreadyRegistered() {
		return userAlreadyRegistered;
	}
	public void setUserAlreadyRegistered(boolean userAlreadyRegistered) {
		this.userAlreadyRegistered = userAlreadyRegistered;
	}
	public boolean isUserRegistered() {
		return isUserRegistered;
	}
	public void setUserRegistered(boolean isUserRegistered) {
		this.isUserRegistered = isUserRegistered;
	}
	public LocationBO getSocietyCity() {
		return societyCity;
	}
	public void setSocietyCity(LocationBO societyCity) {
		this.societyCity = societyCity;
	}
	public LocationBO getSocietyState() {
		return societyState;
	}
	public void setSocietyState(LocationBO societyState) {
		this.societyState = societyState;
	}
	public String getWingBlock() {
		return wingBlock;
	}
	public void setWingBlock(String wingBlock) {
		this.wingBlock = wingBlock;
	}
	public int getApartmentNumber() {
		return apartmentNumber;
	}
	public void setApartmentNumber(int apartmentNumber) {
		this.apartmentNumber = apartmentNumber;
	}
	public Date getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getRedirectUrl() {
		return redirectUrl;
	}
	public void setRedirectUrl(String redirectUrl) {
		this.redirectUrl = redirectUrl;
	}
	public boolean isAuthenticated() {
		return isAuthenticated;
	}
	public void setAuthenticated(boolean isAuthenticated) {
		this.isAuthenticated = isAuthenticated;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRememberMe() {
		return rememberMe;
	}
	public void setRememberMe(String rememberMe) {
		this.rememberMe = rememberMe;
	}
	public boolean isInvalidUsernamePassword() {
		return invalidUsernamePassword;
	}
	public void setInvalidUsernamePassword(boolean invalidUsernamePassword) {
		this.invalidUsernamePassword = invalidUsernamePassword;
	}
	public String getErrorMessage() {
		return errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	
}
