package com.pushpendra.happyhomes.model.Group;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;
import java.util.List;


/**
 * The persistent class for the groups database table.
 * 
 */
@Entity
@Table(name="groups")
@NamedQuery(name="Group.findAll", query="SELECT g FROM Group g")
public class Group implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="GROUP_ID", unique=true, nullable=false)
	private int groupId;

	@Column(name="ACTIVE_SWITCH")
	private int activeSwitch;

	@Column(name="CREATED_BY", length=100)
	private String createdBy;

	@Temporal(TemporalType.DATE)
	@Column(name="CREATED_DATE")
	private Date createdDate;

	@Column(name="GROUP_DESCRIPTION", length=1000)
	private String groupDescription;

	@Column(name="GROUP_NAME", length=100)
	private String groupName;

	@Column(name="UPDATED_BY", length=100)
	private String updatedBy;

	@Temporal(TemporalType.DATE)
	@Column(name="UPDATED_DATE")
	private Date updatedDate;

	//bi-directional many-to-one association to GroupAdmin
	@OneToMany(mappedBy="group")
	private List<GroupAdmin> groupAdmins;

	//bi-directional many-to-one association to GroupPost
	@OneToMany(mappedBy="group")
	private List<GroupPost> groupPosts;

	public Group() {
	}

	public int getGroupId() {
		return this.groupId;
	}

	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}

	public int getActiveSwitch() {
		return this.activeSwitch;
	}

	public void setActiveSwitch(int activeSwitch) {
		this.activeSwitch = activeSwitch;
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

	public String getGroupDescription() {
		return this.groupDescription;
	}

	public void setGroupDescription(String groupDescription) {
		this.groupDescription = groupDescription;
	}

	public String getGroupName() {
		return this.groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
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

	public List<GroupAdmin> getGroupAdmins() {
		return this.groupAdmins;
	}

	public void setGroupAdmins(List<GroupAdmin> groupAdmins) {
		this.groupAdmins = groupAdmins;
	}

	public GroupAdmin addGroupAdmin(GroupAdmin groupAdmin) {
		getGroupAdmins().add(groupAdmin);
		groupAdmin.setGroup(this);

		return groupAdmin;
	}

	public GroupAdmin removeGroupAdmin(GroupAdmin groupAdmin) {
		getGroupAdmins().remove(groupAdmin);
		groupAdmin.setGroup(null);

		return groupAdmin;
	}

	public List<GroupPost> getGroupPosts() {
		return this.groupPosts;
	}

	public void setGroupPosts(List<GroupPost> groupPosts) {
		this.groupPosts = groupPosts;
	}

	public GroupPost addGroupPost(GroupPost groupPost) {
		getGroupPosts().add(groupPost);
		groupPost.setGroup(this);

		return groupPost;
	}

	public GroupPost removeGroupPost(GroupPost groupPost) {
		getGroupPosts().remove(groupPost);
		groupPost.setGroup(null);

		return groupPost;
	}

}