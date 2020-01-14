package com.pushpendra.happyhomes.model.user;

import java.io.Serializable;

import javax.persistence.*;

import com.pushpendra.happyhomes.model.society.Society;

import java.util.Date;


/**
 * The persistent class for the user_personal_details database table.
 * 
 */
@Entity
@Table(name="user_personal_details")
@NamedQuery(name="UserPersonalDetail.findAll", query="SELECT u FROM UserPersonalDetail u")
public class UserPersonalDetail implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="USER_ID", unique=true, nullable=false)
	private int userId;

	@Temporal(TemporalType.DATE)
	@Column(name="AGREEMENT_END_DATE")
	private Date agreementEndDate;

	@Temporal(TemporalType.DATE)
	@Column(name="AGREEMENT_START_DATE")
	private Date agreementStartDate;

	@Column(name="APARTMENT_ID")
	private int apartmentId;

	@Column(name="FIRST_NAME", length=100)
	private String firstName;
	
	@Column(name="LAST_NAME", length=100)
	private String lastName;
	
	@Column(name="APARTMENT_NAME", length=100)
	private String apartmentName;

	@Column(name="CREATED_BY", length=100)
	private String createdBy;

	@Temporal(TemporalType.DATE)
	@Column(name="CREATED_DATE")
	private Date createdDate;

	@Column(name="CURRENT_COMPANY", length=100)
	private String currentCompany;

	@Temporal(TemporalType.DATE)
	@Column(name="DATE_OF_BIRTH")
	private Date dateOfBirth;

	@Column(name="EMAIL_SHARING_ALLOWED", length=1)
	private String emailSharingAllowed;

	@Column(name="JOB_DESCRIPTION", length=100)
	private String jobDescription;

	@Column(length=1)
	private String married;

	@Column(name="NUMBER_SHARING_ALLOWED", length=1)
	private String numberSharingAllowed;

	@Column(name="OWNER_AT_CURRENT_ADDRESS", length=1)
	private String ownerAtCurrentAddress;

	@Column(length=100)
	private String religion;

	@Temporal(TemporalType.DATE)
	@Column(name="STAYING_FROM")
	private Date stayingFrom;

	@Column(name="UPDATED_BY", length=100)
	private String updatedBy;

	@Temporal(TemporalType.DATE)
	@Column(name="UPDATED_DATE")
	private Date updatedDate;

	@Column(name="USER_ALTERNATE_EMAIL", length=100)
	private String userAlternateEmail;

	@Column(name="USER_CONTACT_NUMBER")
	private int userContactNumber;

	@Column(name="USER_CONTACT_NUMBER_VERIFIED", length=1)
	private String userContactNumberVerified;

	@Column(name="USER_GENDER", length=10)
	private String userGender;

	@Column(name="USER_HEAD_OF_HOUSEHOLD", length=1)
	private String userHeadOfHousehold;

	@Column(name="USER_HOBBIES", length=500)
	private String userHobbies;

	@Temporal(TemporalType.DATE)
	@Column(name="USER_LAST_LOGIN")
	private Date userLastLogin;

	@Column(name="USER_NAME", length=50)
	private String userName;

	@Column(name="USER_NATIVE_PLACE", length=100)
	private String userNativePlace;

	@Column(name="USER_PROFILE_PIC", length=100)
	private String userProfilePic;

	/*@Column(name="USER_SOCIETY_ID", length=200)
	private int userSocietyId;*/
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "USER_SOCIETY_ID")
	private Society society;

	//uni-directional one-to-one association to Occupation
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="OCCUPATION_ID")
	private Occupation occupation;

	public UserPersonalDetail() {
	}

	public Society getSociety() {
		return society;
	}

	public void setSociety(Society society) {
		this.society = society;
	}

	public int getUserId() {
		return this.userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public Date getAgreementEndDate() {
		return this.agreementEndDate;
	}

	public void setAgreementEndDate(Date agreementEndDate) {
		this.agreementEndDate = agreementEndDate;
	}

	public Date getAgreementStartDate() {
		return this.agreementStartDate;
	}

	public void setAgreementStartDate(Date agreementStartDate) {
		this.agreementStartDate = agreementStartDate;
	}

	public int getApartmentId() {
		return this.apartmentId;
	}

	public void setApartmentId(int apartmentId) {
		this.apartmentId = apartmentId;
	}

	public String getApartmentName() {
		return this.apartmentName;
	}

	public void setApartmentName(String apartmentName) {
		this.apartmentName = apartmentName;
	}

	public String getCreatedBy() {
		return this.createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDate() {
		return this.createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getCurrentCompany() {
		return this.currentCompany;
	}

	public void setCurrentCompany(String currentCompany) {
		this.currentCompany = currentCompany;
	}

	public Date getDateOfBirth() {
		return this.dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getEmailSharingAllowed() {
		return this.emailSharingAllowed;
	}

	public void setEmailSharingAllowed(String emailSharingAllowed) {
		this.emailSharingAllowed = emailSharingAllowed;
	}

	public String getJobDescription() {
		return this.jobDescription;
	}

	public void setJobDescription(String jobDescription) {
		this.jobDescription = jobDescription;
	}

	public String getMarried() {
		return this.married;
	}

	public void setMarried(String married) {
		this.married = married;
	}

	public String getNumberSharingAllowed() {
		return this.numberSharingAllowed;
	}

	public void setNumberSharingAllowed(String numberSharingAllowed) {
		this.numberSharingAllowed = numberSharingAllowed;
	}

	public String getOwnerAtCurrentAddress() {
		return this.ownerAtCurrentAddress;
	}

	public void setOwnerAtCurrentAddress(String ownerAtCurrentAddress) {
		this.ownerAtCurrentAddress = ownerAtCurrentAddress;
	}

	public String getReligion() {
		return this.religion;
	}

	public void setReligion(String religion) {
		this.religion = religion;
	}

	public Date getStayingFrom() {
		return this.stayingFrom;
	}

	public void setStayingFrom(Date stayingFrom) {
		this.stayingFrom = stayingFrom;
	}

	public String getUpdatedBy() {
		return this.updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDate() {
		return this.updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public String getUserAlternateEmail() {
		return this.userAlternateEmail;
	}

	public void setUserAlternateEmail(String userAlternateEmail) {
		this.userAlternateEmail = userAlternateEmail;
	}

	public int getUserContactNumber() {
		return this.userContactNumber;
	}

	public void setUserContactNumber(int userContactNumber) {
		this.userContactNumber = userContactNumber;
	}

	public String getUserContactNumberVerified() {
		return this.userContactNumberVerified;
	}

	public void setUserContactNumberVerified(String userContactNumberVerified) {
		this.userContactNumberVerified = userContactNumberVerified;
	}

	public String getUserGender() {
		return this.userGender;
	}

	public void setUserGender(String userGender) {
		this.userGender = userGender;
	}

	public String getUserHeadOfHousehold() {
		return this.userHeadOfHousehold;
	}

	public void setUserHeadOfHousehold(String userHeadOfHousehold) {
		this.userHeadOfHousehold = userHeadOfHousehold;
	}

	public String getUserHobbies() {
		return this.userHobbies;
	}

	public void setUserHobbies(String userHobbies) {
		this.userHobbies = userHobbies;
	}

	public Date getUserLastLogin() {
		return this.userLastLogin;
	}

	public void setUserLastLogin(Date userLastLogin) {
		this.userLastLogin = userLastLogin;
	}

	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserNativePlace() {
		return this.userNativePlace;
	}

	public void setUserNativePlace(String userNativePlace) {
		this.userNativePlace = userNativePlace;
	}

	public String getUserProfilePic() {
		return this.userProfilePic;
	}

	public void setUserProfilePic(String userProfilePic) {
		this.userProfilePic = userProfilePic;
	}

	/*public int getUserSocietyId() {
		return this.userSocietyId;
	}

	public void setUserSocietyId(int userSocietyId) {
		this.userSocietyId = userSocietyId;
	}*/

	public Occupation getOccupation() {
		return this.occupation;
	}

	public void setOccupation(Occupation occupation) {
		this.occupation = occupation;
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
	
	

}