package com.pushpendra.happyhomes.model.Group;

import java.io.Serializable;

import javax.persistence.*;

import com.pushpendra.happyhomes.model.security.UserAuthenticationDetail;

import java.util.Date;


/**
 * The persistent class for the group_admin database table.
 * 
 */
@Entity
@Table(name="group_admin")
@NamedQuery(name="GroupAdmin.findAll", query="SELECT g FROM GroupAdmin g")
public class GroupAdmin implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="GROUP_ADMIN_ID", unique=true, nullable=false)
	private int groupAdminId;

	@Column(name="ACTIVE_SWITCH")
	private int activeSwitch;

	@Column(name="ADDED_BY", length=50)
	private String addedBy;

	@Temporal(TemporalType.DATE)
	@Column(name="ADDED_DATE")
	private Date addedDate;

	@Column(name="UPDATED_BY", length=50)
	private String updatedBy;

	@Temporal(TemporalType.DATE)
	@Column(name="UPDATED_DATE")
	private Date updatedDate;

	//bi-directional many-to-one association to Group
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="GROUP_ID")
	private Group group;

	//uni-directional one-to-one association to UserAuthenticationDetail
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="ADMIN_ID")
	private UserAuthenticationDetail userAuthenticationDetail;

	public GroupAdmin() {
	}

	public int getGroupAdminId() {
		return this.groupAdminId;
	}

	public void setGroupAdminId(int groupAdminId) {
		this.groupAdminId = groupAdminId;
	}

	public int getActiveSwitch() {
		return this.activeSwitch;
	}

	public void setActiveSwitch(int activeSwitch) {
		this.activeSwitch = activeSwitch;
	}

	public String getAddedBy() {
		return this.addedBy;
	}

	public void setAddedBy(String addedBy) {
		this.addedBy = addedBy;
	}

	public Date getAddedDate() {
		return this.addedDate;
	}

	public void setAddedDate(Date addedDate) {
		this.addedDate = addedDate;
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

	public Group getGroup() {
		return this.group;
	}

	public void setGroup(Group group) {
		this.group = group;
	}

	public UserAuthenticationDetail getUserAuthenticationDetail() {
		return this.userAuthenticationDetail;
	}

	public void setUserAuthenticationDetail(UserAuthenticationDetail userAuthenticationDetail) {
		this.userAuthenticationDetail = userAuthenticationDetail;
	}

}