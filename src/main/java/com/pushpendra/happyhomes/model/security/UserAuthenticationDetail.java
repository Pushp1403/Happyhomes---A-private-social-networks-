package com.pushpendra.happyhomes.model.security;

import java.io.Serializable;

import javax.persistence.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.pushpendra.happyhomes.model.Events.EventDetail;
import com.pushpendra.happyhomes.model.Messaging.Chat;
import com.pushpendra.happyhomes.model.NoticesBills.IndividualBill;
import com.pushpendra.happyhomes.model.SocietyPosts.PostComment;
import com.pushpendra.happyhomes.model.SocietyPosts.PostSociety;
import com.pushpendra.happyhomes.model.user.UserPersonalDetail;

import java.util.Collection;
import java.util.Date;
import java.util.List;


/**
 * The persistent class for the user_authentication_details database table.
 * 
 */
@Entity
@Table(name="user_authentication_details")
@NamedQuery(name="UserAuthenticationDetail.findAll", query="SELECT u FROM UserAuthenticationDetail u")
public class UserAuthenticationDetail implements Serializable,UserDetails {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="USER_NAME", unique=true, nullable=false, length=100)
	private String userName;

	@Column(nullable=false)
	private byte accountNonExpired;

	@Column(nullable=false)
	private byte accountNonLocked;

	@Temporal(TemporalType.DATE)
	@Column(name="created_date")
	private Date createdDate;

	@Column(length=255)
	private String createdby;

	@Column(nullable=false)
	private byte credentialsNonExpired;

	@Column(name="failed_login_attempts")
	private int failedLoginAttempts;

	@Column(length=255)
	private String password;

	@Column(name="updated_by", length=255)
	private String updatedBy;

	@Temporal(TemporalType.DATE)
	@Column(name="updated_date")
	private Date updatedDate;

	@Column(name="user_address_verified", length=255)
	private String userAddressVerified;

	@Column(name="user_email_verified", length=255)
	private String userEmailVerified;

	//bi-directional many-to-one association to PostSociety
	@OneToMany(mappedBy="userAuthenticationDetail")
	private List<PostSociety> postSocieties;

	//bi-directional one-to-one association to PostComment
	@OneToOne(mappedBy="userAuthenticationDetail", fetch=FetchType.LAZY)
	private PostComment postComment;
	
	/*@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "USER_NAME")
	private UserPersonalDetail personalDetails;*/

	//bi-directional one-to-one association to EventDetail
	@OneToOne(mappedBy="userAuthenticationDetail", fetch=FetchType.LAZY)
	private EventDetail eventDetail;

	//bi-directional many-to-one association to Chat
	@OneToMany(mappedBy="fromUser")
	private List<Chat> chats1;

	//bi-directional many-to-one association to Chat
	@OneToMany(mappedBy="toUser")
	private List<Chat> chats2;

	//bi-directional many-to-one association to IndividualBill
	@OneToMany(mappedBy="billedUser")
	private List<IndividualBill> individualBills;

	public UserAuthenticationDetail() {
	}

	/*public UserPersonalDetail getPersonalDetails() {
		return personalDetails;
	}

	public void setPersonalDetails(UserPersonalDetail personalDetails) {
		this.personalDetails = personalDetails;
	}*/

	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public byte getAccountNonExpired() {
		return this.accountNonExpired;
	}

	public void setAccountNonExpired(byte accountNonExpired) {
		this.accountNonExpired = accountNonExpired;
	}

	public byte getAccountNonLocked() {
		return this.accountNonLocked;
	}

	public void setAccountNonLocked(byte accountNonLocked) {
		this.accountNonLocked = accountNonLocked;
	}

	public Date getCreatedDate() {
		return this.createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getCreatedby() {
		return this.createdby;
	}

	public void setCreatedby(String createdby) {
		this.createdby = createdby;
	}

	public byte getCredentialsNonExpired() {
		return this.credentialsNonExpired;
	}

	public void setCredentialsNonExpired(byte credentialsNonExpired) {
		this.credentialsNonExpired = credentialsNonExpired;
	}

	public int getFailedLoginAttempts() {
		return this.failedLoginAttempts;
	}

	public void setFailedLoginAttempts(int failedLoginAttempts) {
		this.failedLoginAttempts = failedLoginAttempts;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
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

	public String getUserAddressVerified() {
		return this.userAddressVerified;
	}

	public void setUserAddressVerified(String userAddressVerified) {
		this.userAddressVerified = userAddressVerified;
	}

	public String getUserEmailVerified() {
		return this.userEmailVerified;
	}

	public void setUserEmailVerified(String userEmailVerified) {
		this.userEmailVerified = userEmailVerified;
	}

	public List<PostSociety> getPostSocieties() {
		return this.postSocieties;
	}

	public void setPostSocieties(List<PostSociety> postSocieties) {
		this.postSocieties = postSocieties;
	}

	public PostSociety addPostSociety(PostSociety postSociety) {
		getPostSocieties().add(postSociety);
		postSociety.setUserAuthenticationDetail(this);

		return postSociety;
	}

	public PostSociety removePostSociety(PostSociety postSociety) {
		getPostSocieties().remove(postSociety);
		postSociety.setUserAuthenticationDetail(null);

		return postSociety;
	}

	public PostComment getPostComment() {
		return this.postComment;
	}

	public void setPostComment(PostComment postComment) {
		this.postComment = postComment;
	}

	public EventDetail getEventDetail() {
		return this.eventDetail;
	}

	public void setEventDetail(EventDetail eventDetail) {
		this.eventDetail = eventDetail;
	}

	public List<Chat> getChats1() {
		return this.chats1;
	}

	public void setChats1(List<Chat> chats1) {
		this.chats1 = chats1;
	}

	public Chat addChats1(Chat chats1) {
		getChats1().add(chats1);
		chats1.setUserAuthenticationDetail1(this);

		return chats1;
	}

	public Chat removeChats1(Chat chats1) {
		getChats1().remove(chats1);
		chats1.setUserAuthenticationDetail1(null);

		return chats1;
	}

	public List<Chat> getChats2() {
		return this.chats2;
	}

	public void setChats2(List<Chat> chats2) {
		this.chats2 = chats2;
	}

	public Chat addChats2(Chat chats2) {
		getChats2().add(chats2);
		chats2.setUserAuthenticationDetail2(this);

		return chats2;
	}

	public Chat removeChats2(Chat chats2) {
		getChats2().remove(chats2);
		chats2.setUserAuthenticationDetail2(null);

		return chats2;
	}

	public List<IndividualBill> getIndividualBills() {
		return this.individualBills;
	}

	public void setIndividualBills(List<IndividualBill> individualBills) {
		this.individualBills = individualBills;
	}

	@Override
	@Transient
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@Transient
	public String getUsername() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@Transient
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	@Transient
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	@Transient
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	@Transient
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}


}